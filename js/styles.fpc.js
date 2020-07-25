$(document).ready(function(){
  /* Framework option */
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  $('.tooltipped').tooltip();
  faqFPC();
  $('.collapsible').collapsible();

  var themeColor = "#3f51b5";
  var themeColorClass = "indigo";

  $('html').attr('style','--rico-theme: '+themeColor);
  $('#footer-love').addClass(themeColorClass+'-text');

  // Loader countdown
  showLoader();
  fasilkomFestLoader("grey darken-4", "indigo", "fpc"); // Set loader theme
  informasiLomba(3);

});

function scrollToElement(dest, withNavbar = false){
  var navbarHeight = $('.ff-navbar').height();
  var value = $(dest).offset().top;
  if(withNavbar){
    var value = $(dest).offset().top - navbarHeight + 1;
  }
  $('html , body').animate(
    {
      scrollTop: value
    }, 1024
  );
}
