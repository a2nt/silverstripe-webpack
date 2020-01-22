<?php


namespace Site\Extensions;


use SilverStripe\Core\Convert;
use SilverStripe\View\HTML;

class EmbedShortcodeProvider extends \SilverStripe\View\Shortcodes\EmbedShortcodeProvider
{
    /**
     * Build video embed tag
     *
     * @param array $arguments
     * @param string $content Raw HTML content
     * @return string
     */
    protected static function videoEmbed($arguments, $content)
    {
        // Ensure outer div has given width (but leave height auto)
        if (!empty($arguments['width'])) {
            $arguments['style'] = 'width:' . (int) $arguments['width'] . 'px';
                //.';height:' . (int) $arguments['height'] . 'px';
        }

        // Convert caption to <p>
        if (!empty($arguments['caption'])) {
            $xmlCaption = Convert::raw2xml($arguments['caption']);
            $content .= "\n<p class=\"caption\">{$xmlCaption}</p>";
        }

        // Convert arguments to data-*argument_name*
        foreach ($arguments as $k => $v) {
            if($k === 'class' || $k === 'style') {
                continue;
            }

            unset($arguments[$k]);
            $arguments['data-'.$k] = $v;
        }

        $arguments['class'] .= ' embed-youtube embed-responsive embed-responsive-16by9';

        $iframe = strpos($content, 'iframe');
        if($iframe >= 0) {
            $content = substr($content, 0, $iframe+6).' class="embed-responsive-item" '.substr($content, $iframe +7);
        }

        return HTML::createTag('div', $arguments, $content);
    }
}
