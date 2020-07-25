$(document).ready(function(){
  /* Framework option */
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  $('.tooltipped').tooltip();
  $('.tabs').tabs();
  faqCSO();
  $('.collapsible').collapsible();

  var themeColor = "#009688";
  var themeColorClass = "teal";

  $('html').attr('style','--rico-theme: '+themeColor);
  $('#footer-love').addClass(themeColorClass+'-text');

  // Loader countdown
  showLoader();
  fasilkomFestLoader("ff-theme", "teal", "cso1"); // Set loader theme
  informasiLomba(1);

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
