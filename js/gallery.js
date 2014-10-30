/*global Galleria*/
;!(function($) {
  $(document).ready(function() {
    if (typeof Galleria === 'undefined') {
      var galleryElement = $('#gallery');
      galleryElement.removeClass('galleria');
      galleryElement.children().each(function () {
        var element = $(this);
        console.log("element: ", element);
        element.addClass('thumbnails');
      });
    } else {
      Galleria.loadTheme('js/vendor/galleria-classic-theme/galleria.classic.min.js');
      Galleria.configure({
        imageCrop: false,
        transition: 'fade',
        responsive: true,
        showCounter: false,
        swipe: true
      });
      Galleria.run('.galleria');
    }
  });
})(jQuery);