$(document).ready(function(){
  /* Framework option */
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  $('.tooltipped').tooltip();
  faqFSC();
  $('.collapsible').collapsible();

  var themeColor = "#e91e63";
  var themeColorClass = "pink";

  $('html').attr('style','--rico-theme: '+themeColor);
  $('#footer-love').addClass(themeColorClass+'-text');

  // Loader countdown
  showLoader();
  fasilkomFestLoader("deep-purple darken-3", "pink", "fsc1"); // Set loader theme
  informasiLomba(4);

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
