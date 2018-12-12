"use strict";

import $ from 'jquery';

import Events from '../_events';
import SpinnerUI from './_ui.spinner';

import 'croppie/croppie.js';
import 'exif-js/exif.js';

const CroppieUI = (($) => {

    const NAME = 'jsCroppieUI';
    const DATA_KEY = NAME;

    const G = window;
    const D = document;

    const jqteOptions = {
        color: false,
        fsize: false,
        funit: 'em',
        format: false,
        rule: false,
        source: false,
        sub: false,
        sup: false,
    };

    class CroppieUI {

        constructor(element) {
            const ui = this;
            const $el = $(element);

            ui._element = element;
            $el.data(DATA_KEY, this);

            ui.input = $el.find('input[type="file"]');
            //ui.inputData = $('<input type="hidden" class="base64enc" name="' + ui.input.attr('name') + 'base64" />');

            ui.width = ui.input.data('width');
            ui.height = ui.input.data('height');

            $el.append('<div class="cropper-wrap"><div class="cropper-container"></div></div>');
            //$el.append(ui.inputData);

            ui.uploadCrop = $el.find('.cropper-container');

            const ratio = ui.width / (ui.uploadCrop.width() - 32);
            ui.uploadCrop.croppie({
                enableExif: true,
                enforceBoundary: false,
                viewport: {
                    width: ui.width / ratio,
                    height: ui.height / ratio,
                }
            });

            ui.uploadCrop.hide();

            ui.input.on('change', (e) => {
                this.readFile(e.currentTarget);
            });
        }

        readFile(input) {
            const ui = this;
            const $el = $(ui._element);
            const $form = $el.closest('form');

            if (input.files && input.files[0]) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    ui.uploadCrop.addClass('ready');
                    ui.uploadCrop.croppie('bind', {
                        url: e.target.result
                    });

                    ui.uploadCrop.show();
                }

                reader.readAsDataURL(input.files[0]);

                $form.on('submit', (e) => {
                    //$(input).val('');
                    SpinnerUI.show();

                    ui.uploadCrop.croppie('result', {
                        type: 'blob',
                        size: {
                            width: ui.width,
                            height: ui.height
                        },
                        format: 'png'
                    }).then((blob) => {
                        const form = e.currentTarget;
                        const data = new FormData(form);
                        const name = $(input).attr('name');

                        data.delete('BackURL');
                        data.delete(name);
                        data.append(name, blob, name + '-image.png');
                        data.append('ajax', '1');

                        $.ajax({
                            url: $(form).attr('action'),
                            data: data,
                            processData: false,
                            contentType: false,
                            type: $(form).attr('method'),
                            success: function(data) {
                                let IS_JSON = false;
                                try {
                                    IS_JSON = true;
                                    const json = $.parseJSON(data);
                                } catch (e) {
                                    IS_JSON = false;
                                }

                                if (IS_JSON && typeof json === 'object') {
                                    for (let k in json) {
                                        $form.find('select[name="' + k + '"],input[name="' + k + '"],textarea[name="' + k + '"]').setError(true, json[k]);
                                    }

                                    if (typeof json['status'] !== 'undefined' && json['status'] === 'success') {
                                        if (typeof json['link'] !== 'undefined') {
                                            G.location = json['link'];
                                        } else {
                                            G.location.reload(false);
                                        }
                                    }
                                } else {
                                    G.location.reload(false);
                                }

                                SpinnerUI.hide();
                                $(G).trigger(Events.AJAX);
                            }
                        });

                        //ui.inputData.val(data);

                    });

                    e.preventDefault();
                });

            } else {
                console.log('Sorry - your browser doesn\'t support the FileReader API');
            }
        }

        static dispose() {
            console.log(`Destroying: ${NAME}`);
        }

        static _jQueryInterface() {
            return this.each((i, el) => {
                // attach functionality to element
                const $el = $(el);
                let data = $el.data(DATA_KEY);

                if (!data) {
                    data = new CroppieUI(el);
                    $el.data(DATA_KEY, data);
                }
            });
        }
    }

    // jQuery interface
    $.fn[NAME] = CroppieUI._jQueryInterface;
    $.fn[NAME].Constructor = CroppieUI;
    $.fn[NAME].noConflict = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return CroppieUI._jQueryInterface;
    };

    // auto-apply
    $(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
        $('.field.croppie').jsCroppieUI();
    });

    return CroppieUI;
})($);

export default CroppieUI;
