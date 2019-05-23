"use strict";

import $ from 'jquery';

import MainUI from "../_main";
import Events from '../_events';
import SpinnerUI from './_ui.spinner';

const VideoPreviewUI = (($) => {

    const NAME = 'jsVideoPreviewUI';
    const DATA_KEY = NAME;

    const G = window;
    const D = document;

    class VideoPreviewUI {

        constructor(el) {
            console.log(`Initializing: ${NAME}`);

            const ui = this;
            ui.$_el = $(el);
            ui.innerHTML = ui.$_el[0].innerHTML;

            ui.$_el.data(DATA_KEY, this);
            const href = ui.$_el.attr('href') || ui.$_el.data('href');
            let video;

            if (video = href.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/)) {
                let video_id;

                if (video[1] === 'youtube' || video[1] === 'youtube-nocookie') {
                    video_id = video[4];
                }
                if (video[1] === 'youtu') {
                    video_id = video[3];
                }

                if (video[1] == 'vimeo') {
                    video_id = video[3];
                    ui.$_el.addClass('loading');
                    $.ajax({
                        type: 'GET',
                        url: 'https://vimeo.com/api/v2/video/' + video_id + '.json',
                        jsonp: 'callback',
                        dataType: 'jsonp',
                        success: function(data) {
                            const thumbnail_src = data[0].thumbnail_large;
                            ui.show(thumbnail_src);
                            ui.$_el.removeClass('loading');
                        }
                    });

                    return;
                }

                if (video_id) {
                    ui.show(`//i3.ytimg.com/vi/${video_id}/0.jpg`);
                }
            }
        }

        show(src) {
            const ui = this;
            ui.$_el[0].innerHTML = '';
            ui.$_el.append(`<img src="${src}" alt="Video" />`);
        }

        static dispose() {
            console.log(`Destroying: ${NAME}`);
            ui.$_el[0].innerHTML = ui.innerHTML;
        }

        static _jQueryInterface() {
            return this.each((i, el) => {
                // attach functionality to element
                const $el = $(el);
                let data = $el.data(DATA_KEY);

                if (!data) {
                    data = new VideoPreviewUI(el);
                    $el.data(DATA_KEY, data);
                }
            });
        }
    }

    // jQuery interface
    $.fn[NAME] = VideoPreviewUI._jQueryInterface;
    $.fn[NAME].Constructor = VideoPreviewUI;
    $.fn[NAME].noConflict = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return VideoPreviewUI._jQueryInterface;
    };

    // auto-apply
    $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
        $('[data-video-preview="true"]').jsVideoPreviewUI();
    });

    return VideoPreviewUI;
})($);

export default VideoPreviewUI;
