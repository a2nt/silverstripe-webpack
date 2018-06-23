import Events from '../../_events';
import Routie from "routie";

$(window).on(`${Events.AJAX} ${Events.LOADED}`, () => {
    Routie({
        'navigation': function() {
            $('#NavbarCollapse').addClass('in');
        },
        'carousel:id:num': function(id, num) {
            $(`#Carousel${  id}`).carousel(num);
        },
    });
});