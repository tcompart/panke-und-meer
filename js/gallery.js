/*global Galleria*/
if (Galleria) {
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