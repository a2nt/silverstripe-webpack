<?php


namespace Site\GraphQL;


use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use SilverStripe\CMS\Controllers\ModelAsController;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\GraphQL\TypeCreator;
use SilverStripe\GraphQL\Pagination\Connection;
use SilverStripe\View\SSViewer;

class PageTypeCreator extends TypeCreator
{
    public function attributes()
    {
        return [
            'name' => 'page'
        ];
    }

    public function fields()
    {
    	$elementsConnection = Connection::create('Elements')
            ->setConnectionType($this->manager->getType('element'))
            ->setDescription('A list of the page elements')
            ->setSortableFields(['ID', 'Title']);

        return [
        	'_id' => ['type' => Type::nonNull(Type::id()),'resolve' => static function($object) {
        	    return $object->ID;
	        }],
            'ID' => ['type' => Type::nonNull(Type::id())],
            'Title' => ['type' => Type::string()],
	        'Content' => ['type' => Type::string()],
	        'Link' => ['type' => Type::string(), 'resolve' => static function($object) {
        	    return $object->Link();
	        }],
	        'URLSegment' => ['type' => Type::string()],
            'ParentID' => ['type' => Type::id()],
	        'ClassName' => ['type' => Type::string()],
	        'CSSClass' => ['type' => Type::string(), 'resolve' => static function($object) {
        	    return $object->CSSClass();
	        }],
	        'Summary' => ['type' => Type::string(), 'resolve' => static function($object) {
        	    return $object->Summary();
	        }],
	        'HTML' => ['type' => Type::string(), 'resolve' => static function($object) {
        	    // get action from request
		        $action = null;

		        /** @var \Page $object */
		        Director::set_current_page($object);
		        /** @var \PageController $controller */
		        $controller = ModelAsController::controller_for($object);

		        // find templates
		        $tpl = 'Page';
		        $tpls = SSViewer::get_templates_by_class(
		        	$object->ClassName,
			        ($action ? '_'.$action : ''),
			        \Page::class
		        );

				foreach ($tpls as $tpl){
					if(is_array($tpl)){
						continue;
					}

					$a_tpl = explode('\\',$tpl);
					$last_name = array_pop($a_tpl);
					$a_tpl[] = 'Layout';
					$a_tpl[] = $last_name;
					$a_tpl = implode('\\', $a_tpl);

					if(SSViewer::hasTemplate($a_tpl)){
						break;
					}
				}
				//

				$tpl = ($tpl !== 'Page') ? $tpl : 'Layout/Page';

				$action = $action ? $action : 'index';
		        /** @var HTTPRequest $request */
				$controller->setAction($action);

				return $controller->renderWith([$tpl, 'GraphQLPage'])->HTML();
	        }],
	        'Elements' => [
                'type' => $elementsConnection->toType(),
                'args' => $elementsConnection->args(),
                'resolve' => static function($object, array $args, $context, ResolveInfo $info) use ($elementsConnection) {
                    return $elementsConnection->resolveList(
                        $object->ElementalArea()->Elements(),
                        $args,
                        $context
                    );
                }
            ]
        ];
    }
}
