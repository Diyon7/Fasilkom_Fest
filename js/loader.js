function fasilkomFestLoader(bg, color, logo){
  logo = '<img src="img/logo/logo-'+logo+'.png">';
  $("#loader-bg").addClass(bg);
  $("#loader-progress").addClass(color);
  $("#loader-progress .indeterminate").addClass(color);
  $("#loader-logo").html(logo);
}

function showLoader(){
  $("#body").css("display","none");
}

function hideLoader(forDashboard){
  $("#body").css("display","block");
  $(".loader-body").addClass("animated fadeOut");
  if(!forDashboard){
    /* Timeline */
  var windowWidth = $(window).width();
  if(windowWidth < 992){
    $(function(){
      jQuery('.timeline').timeline({
        mode: 'horizontal',
        visibleItems: 3,
      });
    });
  }
  else{
    $(function(){
      jQuery('.timeline').timeline({
        mode: 'horizontal',
        visibleItems: 4,
      });
    });
  }
  }
  setTimeout(function(){
    $(".loader-body").css("display","none");
  }, 1000);
}
