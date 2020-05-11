var navMain = document.querySelector('.page-header__main-nav');
var navToggle = document.querySelector('.page-header__toggle');
var navClose = document.querySelector('.page-header__close');
var headerFavor = document.querySelector('.page-header__favorites');


navMain.classList.remove('page-header__main-nav--open');

navToggle.addEventListener('click', function() {
  navMain.classList.add('page-header__main-nav--open');
  navToggle.classList.add('page-header__toggle--hidden');
  headerFavor.classList.add('page-header__favorites--menu');
});

navClose.addEventListener('click', function() {
  navMain.classList.remove('page-header__main-nav--open');
  navToggle.classList.remove('page-header__toggle--hidden');
  headerFavor.classList.remove('page-header__favorites--menu');
});
