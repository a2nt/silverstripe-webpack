<?php


namespace Site\Widgets;


use DNADesign\Elemental\Controllers\ElementalAreaController;
use DNADesign\Elemental\Forms\ElementalAreaConfig;
use DNADesign\Elemental\Forms\ElementalAreaField;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\FormField;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldAddExistingAutocompleter;
use SilverStripe\Forms\GridField\GridFieldAddNewButton;
use SilverStripe\Forms\GridField\GridFieldConfig;
use SilverStripe\Forms\GridField\GridFieldConfig_Base;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridFieldDataColumns;
use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridFieldDetailForm;
use SilverStripe\Forms\GridField\GridFieldEditButton;
use SilverStripe\Forms\TabSet;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\Widgets\Model\Widget;
use SilverStripe\Widgets\Model\WidgetArea;
use Symbiote\GridFieldExtensions\GridFieldAddNewMultiClass;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;

class WidgetAreaField extends GridField
{
    /**
     * @var ElementalArea $area
     */
    protected $area;

    /**
     * @var array $type
     */
    protected $types = [];

    /**
     * @var null
     */
    protected $inputType = null;

    protected $modelClassName = Widget::class;

    /**
     * @param string $name
     * @param ElementalArea $area
     * @param string[] $blockTypes
     */
    public function __construct($name, WidgetArea $area, array $blockTypes)
    {
        $this->setTypes($blockTypes);

        $config = GridFieldConfig_Base::create();

        $config->getComponentByType(GridFieldDataColumns::class)->setDisplayFields([
            'Icon' => '',
            'Title' => 'Title',
            'LastEdited' => 'Changed',
        ])->setFieldFormatting([
            'Icon' => static function($v, Widget $item) {
                return '<span style="font-size:2rem">'.$item::config()->get('icon').'</span>';
            }
        ]);

        $config->addComponent(new GridFieldEditButton());
        $config->addComponent(new GridFieldDeleteAction(false));
        $config->addComponent(new GridFieldDetailForm(null, false, false));
        $config->addComponent(new GridFieldSortableRows('Sort'));

        if (!empty($blockTypes)) {
            /** @var GridFieldAddNewMultiClass $adder */
            $adder = Injector::inst()->create(GridFieldAddNewMultiClass::class);
            $adder->setClasses($blockTypes);
            $config->addComponent($adder);
        }

        // By default, no need for a title on the editor. If there is more than one area then use `setTitle` to describe
        parent::__construct($name, '', $area->Widgets(), $config);

        $this->area = $area;
        $this->addExtraClass('element-editor__container no-change-track');
    }

    /**
     * @param array $types
     *
     * @return $this
     */
    public function setTypes($types)
    {
        $this->types = $types;

        return $this;
    }

    /**
     * @return array
     */
    public function getTypes()
    {
        $types = $this->types;

        $this->extend('updateGetTypes', $types);

        return $types;
    }

    /**
     * @return ElementalArea
     */
    public function getArea()
    {
        return $this->area;
    }

    public function saveInto(DataObjectInterface $dataObject)
    {
        parent::saveInto($dataObject);

        $elementData = $this->Value();
        $idPrefixLength = strlen(sprintf(ElementalAreaController::FORM_NAME_TEMPLATE, ''));

        if (!$elementData) {
            return;
        }

        foreach ($elementData as $form => $data) {
            // Extract the ID
            $elementId = (int) substr($form, $idPrefixLength);

            /** @var BaseElement $element */
            $element = $this->getArea()->Widgets()->byID($elementId);

            if (!$element) {
                // Ignore invalid elements
                continue;
            }

            $data = ElementalAreaController::removeNamespacesFromFields($data, $element->ID);

            $element->updateFromFormData($data);
            $element->write();
        }
    }
}
