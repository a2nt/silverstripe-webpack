<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\CMS\Controllers\ModelAsController;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Director;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Config\Configurable;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Dev\Debug;
use SilverStripe\GraphQL\Controller;
use SilverStripe\GraphQL\Schema\DataObject\Plugin\QueryFilter\QueryFilter;
use SilverStripe\GraphQL\Schema\Exception\SchemaBuilderException;
use SilverStripe\GraphQL\Schema\Field\ModelQuery;
use SilverStripe\GraphQL\Schema\Interfaces\ModelQueryPlugin;
use SilverStripe\GraphQL\Schema\Schema;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataList;
use SilverStripe\ORM\FieldType\DBHTMLText;
use SilverStripe\View\ArrayData;
use SilverStripe\View\SSViewer;

if (!interface_exists(ModelQueryPlugin::class)) {
    return;
}

class URLLinkablePlugin implements ModelQueryPlugin
{
    use Configurable;
    use Injectable;

    public const IDENTIFIER = 'getByURL';

    /**
     * @var string
     * @config
     */
    private static $single_field_name = 'url';

    /**
     * @var string
     * @config
     */
    private static $list_field_name = 'urls';

    /**
     * @var array
     */
    private static $resolver = [__CLASS__, 'applyURLFilter'];

    /**
     * @return string
     */
    public function getIdentifier(): string
    {
        return self::IDENTIFIER;
    }

    /**
     * @param ModelQuery $query
     * @param Schema $schema
     * @param array $config
     */
    public function apply(ModelQuery $query, Schema $schema, array $config = []): void
    {
        $class = $query->getModel()->getSourceClass();
        // Only site trees have the get_by_link capability
        if ($class !== SiteTree::class && !is_subclass_of($class, SiteTree::class)) {
            return;
        }
        $singleFieldName = $this->config()->get('single_field_name');
        $listFieldName = $this->config()->get('list_field_name');
        $fieldName = $query->isList() ? $listFieldName : $singleFieldName;
        $type = $query->isList() ? '[String]' : 'String';
        $query->addArg($fieldName, $type);
        $query->addResolverAfterware(
            $config['resolver'] ?? static::config()->get('resolver')
        );
    }

    /**
     * @param array $context
     * @return callable
     */
    public static function applyURLFilter($obj, array $args, array $context, ResolveInfo $info)
    {
        $url = self::getURL($args);
        if (!$url) {
            return $obj;
        }

        $controller = self::getURLController($url);

        $obj = $controller->data();
        $obj->GraphQLContent = self::RenderTemplate($obj, $controller);

        $result = ArrayList::create();
        $result->push($obj);

        return $result;
    }

    protected static function getURL($args)
    {
        $singleFieldName = static::config()->get('single_field_name');
        $listFieldName = static::config()->get('list_field_name');

        $filterLink = $args['filter'][$singleFieldName] ?? ($args['filter'][$listFieldName] ?? null);
        $argLink = $args[$singleFieldName] ?? ($args[$listFieldName] ?? null);

        $linkData = $filterLink ?: $argLink;
        if (!$linkData) {
            return false;
        }

        $url = $linkData['eq'];
        if ($url === '/') {
            return '/home';
        }

        return $url;
    }

    protected static function getURLController($url)
    {
        $curr = Controller::curr();
        $req = clone $curr->getRequest();

        $req->setUrl($url);
        $req->match('$URLSegment//$Action/$ID/$OtherID', true);

        $controller = ModelAsController::create();
        $controller->setRequest($req);

        // ContentController
        $result = $controller->getNestedController();
        $result->setRequest($req);

        /** @var SiteTree $child */
        $action = $req->param('Action');

        if ($action) {
            $child = self::findChild($action, $result);
            if ($child) {
                $result = $child;
            }
        }

        return $result;
    }

    // look recursively for a child page with URLSegment
    protected static function findChild($action, $controller)
    {
        $req = $controller->getRequest();

        $child = SiteTree::get()->filter([
            'ParentID' => $controller->ID,
            'URLSegment' => $action,
        ])->first();

        if ($child) {
            $req->shiftAllParams();
            $req->shift();

            $controller = ModelAsController::controller_for($child);
            $controller->setRequest($req);
            $action = $req->param('Action');

            if ($action) {
                return self::findChild($action, $controller);
            }
        }

        return $controller;
    }

    // AJAX/GraphQL helper
    protected static function RenderTemplate($page, $ctl)
    {
        $object = $page;
        $req = $ctl->getRequest();
        $actionParam = $req->param('Action');

        Director::set_current_page($object);

        $match = self::findAction($ctl, $req);
        $req->match($match['rule'], true);
        $action = $match['action'];

        $action = ($action === 'handleAction') ? $actionParam : $action;

        $action = $action && $ctl->hasAction($action) ? $action : 'index';


        // find templates
        $tpl = 'Page';
        $tpls = SSViewer::get_templates_by_class($object->ClassName, '', \Page::class);

        foreach ($tpls as $tpl) {
            if (is_array($tpl)) {
                continue;
            }

            $a_tpl = explode('\\', $tpl);
            $last_name = array_pop($a_tpl);
            $a_tpl[] = 'Layout';
            $a_tpl[] = $last_name;
            $a_tpl = implode('\\', $a_tpl);

            if (SSViewer::hasTemplate($a_tpl)) {
                $tpl = $a_tpl;
                break;
            }
        }
        //

        $tpl = is_array($tpl) ? 'Page' : $tpl;
        $tpl = ($tpl !== 'Page') ? $tpl : 'Layout/Page';

        // a little dirty way to make forms working
        //Controller::curr()->config()->set('url_segment', $object->AbsoluteLink());
        //$ctl->doInit();

        $mResult = $ctl->$action($req);
        if (is_array($mResult) || is_a($mResult, ArrayData::class)) {
            $ctl->customise($mResult);
        }


        $layout = $ctl->renderWith([$tpl.'_'.$action, $tpl]);

        return $ctl
            ->customise(['Layout' => $layout])
            ->renderWith('GraphQLPage');
    }

    protected static function findAction($controller, $request)
    {
        $handlerClass = $controller::class;

        // We stop after RequestHandler; in other words, at ViewableData
        while ($handlerClass && $handlerClass != ViewableData::class) {
            $urlHandlers = Config::inst()->get($handlerClass, 'url_handlers', Config::UNINHERITED);

            if ($urlHandlers) {
                foreach ($urlHandlers as $rule => $action) {
                    if (isset($_REQUEST['debug_request'])) {
                        $class = static::class;
                        $remaining = $request->remaining();
                        Debug::message("Testing '{$rule}' with '{$remaining}' on {$class}");
                    }

                    if ($request->match($rule, true)) {
                        if (isset($_REQUEST['debug_request'])) {
                            $class = static::class;
                            $latestParams = var_export($request->latestParams(), true);
                            Debug::message(
                                "Rule '{$rule}' matched to action '{$action}' on {$class}. " . "Latest request params: {$latestParams}"
                            );
                        }

                        return [
                            'rule' => $rule,
                            'action' => $action,
                        ];
                    }
                }
            }

            $handlerClass = get_parent_class($handlerClass ?? '');
        }
        return null;
    }
}
