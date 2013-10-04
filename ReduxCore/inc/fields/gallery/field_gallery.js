/* global redux_change, wp */
(function($){
    "use strict";
    
    $.gallery = $.gallery || {};
	
    $(document).ready(function () {
        //gallery insert functionality
        $.gallery();
    });

    $.gallery = function(){
        // When the user clicks on the Add/Edit gallery button, we need to display the gallery editing
        $('body').on({
            click: function(event){
                // Make sure the media gallery API exists
                if ( typeof wp === 'undefined' || ! wp.media || ! wp.media.gallery ) return;
                event.preventDefault();

                // Activate the media editor
                var $$ = $(this);

                var current_gallery = $(this).parents('td');
                var val = current_gallery.find('.gallery_values').val();     

                var frame = wp.media.gallery.edit('[gallery ids="' + val + '"]');

                    
                // When the gallery-edit state is updated, copy the attachment ids across
                frame.state('gallery-edit').on( 'update', function( selection ) {
                    
                    //clear screenshot div so we can append new selected images
                    current_gallery.find(".screenshot").html("");
                    
                    var element, preview_html= "", preview_img;
                    var ids = selection.models.map(function(e){
                        element = e.toJSON();
                        preview_img = typeof element.sizes['thumbnail'] != 'undefined'  ? element.sizes['thumbnail'].url : element.url ;
                        preview_html = "<a class='of-uploaded-image' href='"+preview_img+"'><img class='redux-option-image' src='"+preview_img+"' alt='' /></a>";
                        current_gallery.find(".screenshot").append(preview_html);
                        return e.id
                    });
                    current_gallery.find('.gallery_values').val(ids.join(','));
    
                });


                return false;
            }
        }, '.gallery-attachments');
    }
})(jQuery);	