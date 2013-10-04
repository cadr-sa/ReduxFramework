/* global redux_change */
(function($){
    "use strict";
    
    $.group = $.group || {};
	
    $(document).ready(function () {
        //Group functionality
        $.group();
    });
    
    $.group = function(){
        jQuery("#redux-groups-accordion")
        .accordion({
            header: "> div > h3",
            collapsible: true,
            active: false,
            heightStyle: "content",
            icons: {
                "header": "ui-icon-plus", 
                "activeHeader": "ui-icon-minus"
            }
        })
        .sortable({
            axis: "y",
            handle: "h3",
            stop: function (event, ui) {
                // IE doesn't register the blur when sorting
                // so trigger focusout handlers to remove .ui-state-focus
                ui.item.children("h3").triggerHandler("focusout");
                var inputs = jQuery('input.slide-sort');
                inputs.each(function(idx) {
                    jQuery(this).val(idx);
                });
            }
        });
        
        $('.slide-title').keyup(function(event) {
            $(this).parents().eq(3).find('.redux-groups-header').text(event.target.value);
        });
        
        jQuery('.redux-groups-remove').live('click', function () {
            redux_change(jQuery(this));
            jQuery(this).parent().siblings().find('input[type="text"]').val('');
            jQuery(this).parent().siblings().find('input[type="hidden"]').val('');
            jQuery(this).parents().eq(3).slideUp('medium', function () {
                jQuery(this).remove();
            });
        });

        jQuery('.redux-groups-add').click(function () {

            var newSlide = jQuery(this).prev().find('.redux-groups-accordion-group:last').clone(true);
            /*
         *Bugs to fix :
         * 1- still have bug for select field, error :  jQuery(...).find(...).attr(...) is undefined
         * 2- if the id of the field was integer or integer with letter like 17d , it will make issue in sorting
         */
            var slideCount = jQuery(newSlide).find('input[type="text"]').attr("name").match(/\d+/);
            var slideCount1 = slideCount*1 + 1;

            jQuery(newSlide).find('input[type="text"], input[type="hidden"], textarea').each(function(){
                var attr_name = jQuery(this).attr('name');
                var attr_id = jQuery(this).attr('id');
            
                // For some browsers, `attr` is undefined; for others,
                // `attr` is false.  Check for both.
                if (typeof attr_id !== 'undefined' && attr_id !== false) 
                    jQuery(this).attr("id", jQuery(this).attr("id").replace(/\d+/, slideCount1) );
                if (typeof attr_name !== 'undefined' && attr_name !== false) 
                    jQuery(this).attr("name", jQuery(this).attr("name").replace(/\d+/, slideCount1) );

            
                //jQuery(this).attr("name", jQuery(this).attr("name").replace(/\d+/, slideCount1) ).attr("id", jQuery(this).attr("id").replace(/\d+/, slideCount1) );
                jQuery(this).val('');
                if (jQuery(this).hasClass('slide-sort')){
                    jQuery(this).val(slideCount1);
                }
            });

            jQuery(newSlide).find('.screenshot').removeAttr('style');
            jQuery(newSlide).find('.screenshot').addClass('hide');
            jQuery(newSlide).find('.screenshot a').attr('href', '');
            jQuery(newSlide).find('.remove-image').addClass('hide');
            jQuery(newSlide).find('.redux-groups-image').attr('src', '').removeAttr('id');
            jQuery(newSlide).find('h3').text('').append('<span class="redux-groups-header">New Group</span><span class="ui-accordion-header-icon ui-icon ui-icon-plus"></span>');
            jQuery(this).prev().append(newSlide);
        });
    }
})(jQuery);