function contextualColor(value, color1, color2, color3, color4){
  var today = new Date();
  var jam = today.getHours();
  var colorSet;
  if(jam>=4 && jam<6){
    colorSet = color1;
  }
  else if(jam>=6 && jam<15){
    colorSet = color2;
  }
  else if(jam>=15 && jam<18){
    colorSet = color3;
  }
  else{
    colorSet = color4;
  }
  $(value).addClass(colorSet);
}

function contextualMetaColor(value, color1, color2, color3, color4){
  var today = new Date();
  var jam = today.getHours();
  var colorSet;
  if(jam>=4 && jam<6){
    colorSet = color1;
  }
  else if(jam>=6 && jam<15){
    colorSet = color2;
  }
  else if(jam>=15 && jam<18){
    colorSet = color3;
  }
  else{
    colorSet = color4;
  }
  $(value).attr("content",colorSet);
}
