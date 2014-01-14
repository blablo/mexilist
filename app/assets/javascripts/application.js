// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.pikachoose
//= require jquery.remotipart
//= require masonry.pkgd.min
//= require jquery.validate2


//= require_tree .


$(document).ready(function (){
    $("#pikame").PikaChoose({carousel:true, carouselVertical:true, transition:[0]});
      $('.dropdown-toggle').dropdown();


    var $container = $('#anuncios_container');
    // initialize

    //188

  $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector: '.anuncio',
        columnWidth: '.anuncio'
      });
    });

$('#anuncios_aa').infinitescroll({
 
    navSelector  : ".pagination",            
                   // selector for the paged navigation (it will be hidden)
    nextSelector : "a.next_page",  
    bufferPx     : 1000,
    loadingImg   : "/agax-loader.gif", 
 loading: {
          finishedMsg: 'No more pages to load.',
          img: 'http://i.imgur.com/6RMhx.gif'
  
      },
                   // selector for the NEXT link (to page 2)
    itemSelector : ".anuncio",
          
                   // selector for all items you'll retrieve
}, function( newElements ) {
        // hide new items while they are loading
        var $newElems = $( newElements ).css({ opacity: 0 });
        // ensure that images load before adding to masonry layout
        $newElems.imagesLoaded(function(){
          // show elems now they're ready
          $newElems.animate({ opacity: 1 });
          $container.masonry( 'appended', $newElems, true ); 
        });
      });


$('#anuncio_list').infinitescroll({
 
    navSelector  : ".pagination",            
    nextSelector : "a.next_page",  
    bufferPx     : 1500,
    itemSelector : "li.list-group-item",
    loading: {
	msgText: "<em>Cargando los siguientes anuncios...</em>"
    }
});

    // $('#anuncio_list').AutoPagination({
    //     nextPageSelector: 'a.next_page',
    // 	nextPageBufferPx: 200,
    // 	panelSelector: 'li.list-group-item',
    // 	loaderText: 'Cargando...'
    // });


    $( ".city_states_btn" ).click(function() {
	$( "#city_states" ).toggle();
    });
});

