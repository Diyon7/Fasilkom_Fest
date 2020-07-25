$(document).ready(function(){
  /* Framework option */
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  $('.tooltipped').tooltip();
  faqFWC();
  $('.collapsible').collapsible();

  var themeColor = "#ff5722";
  var themeColorClass = "deep-orange";

  $('html').attr('style','--rico-theme: '+themeColor);
  $('#footer-love').addClass(themeColorClass+'-text');

  // Loader countdown
  showLoader();
  fasilkomFestLoader("brown darken-3", "deep-orange", "fwc"); // Set loader theme
  informasiLomba(2);

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
