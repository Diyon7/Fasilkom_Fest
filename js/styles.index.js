$(document).ready(function(){
  // Framework option
  $('.parallax').parallax();
  new WOW().init();

  /* Show sponsor --> showSponsor(banyaksponsor) */
  showSponsor(5);

  /* Contextual by rico contextualColor(id/class, color1, color2, color3, color4)*/
  contextualColor(".contextual-color", "teal", "pink", "deep-orange", "red");
  contextualColor(".contextual-color-text", "ff-theme-text", "deep-purple-text text-darken-3", "brown-text text-darken-3", "green-text text-darken-1");
  contextualMetaColor("meta[name=theme-color]", "#009688", "#e91e63", "#ff5722", "#F44336");
});

function showSponsor(sponsor){
  var animDelay = 200;
  var sponsorInner = '';
  for(var i = 1; i<=sponsor; i++){
    var sponsorHtml = '<div class="col l3 m3 s4 wow zoomIn" data-wow-duration="800ms" data-wow-delay="'+animDelay+'ms">'
                      +'<div class="ff-sponsor-logo">'
                      +'<img src="img/sponsor/sponsor'+i+'.png">'
                      +'</div>'
                      +'</div>';
    sponsorInner += sponsorHtml;
    animDelay += 100;
  }
  $('.ff-sponsor-list').html(sponsorInner);
}
