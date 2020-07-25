function setCookieJawaban(jawaban){
  setCookie("jawaban-cso",jawaban,30);
}

function getCookieJawabanToSend(){
  var jawaban  = getCookie('jawaban-cso');
  jawaban = jawaban.split(",");
  return jawaban;
}

function getCookieJawaban(){
  var jawaban  = getCookie('jawaban-cso');
  jawaban = jawaban.split(",");
  setChecked(jawaban);
  setListJawaban(jawaban);
}

function setChecked(jawaban){
  for(var i = 0; !(i>jawaban.length-1); i++){
    $('input[name=jawaban-no-'+i+'][value='+jawaban[i]+']').prop('checked', true);
  }
}

function setListJawaban(jawaban){
  for(var i = 0; !(i>jawaban.length-1); i++){
    if(jawaban[i] == 0){
      $('#daftar-jawaban-no-'+i).removeClass('active');
    }
    else{
      $('#daftar-jawaban-no-'+i).addClass('active');
    }
  }
}
