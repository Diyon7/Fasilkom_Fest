$(document).ready(function(){
  // Redirect checking for penyisihan
  if(!loginChecking()){
    // Jika belum login
    window.location.replace("index");
  }
  // Redirect checking end

  showKetentuan();
  penyisihanCSOLoader();

  var themeColor = "#009688";
  var themeColorClass = "teal";

  $('html').attr('style','--rico-theme: '+themeColor);
  $('#footer-love').addClass(themeColorClass+'-text');

});

function setActiveJawaban(){
  var soal = penyisihanCSO.getSoal().length - 1;
  var saveJawaban = [];
  for(var i = 0; !(i>soal); i++){
    var jawaban = $('input[name=jawaban-no-'+i+']:checked').val();
    if(jawaban == 0){
      $('#daftar-jawaban-no-'+i).removeClass('active');
    }
    else{
      $('#daftar-jawaban-no-'+i).addClass('active');
    }
    saveJawaban.push(jawaban);
  }
  setCookieJawaban(saveJawaban);
}

function showDaftarJawaban(){
  var content = "";
  var jumlahSoal = penyisihanCSO.getSoal().length - 1;
  for(var i = 0; !(i>jumlahSoal); i++){
    var j = i + 1;
    content +=  '<div class="waves-effect col s3 m2 l1 number grey lighten-2" id="daftar-jawaban-no-'+i+'" onclick="changeSoal('+i+')">'+j+
                '</div>';
  }
  $('#daftarJawaban').html(content);
}

function changeSoal(value, animation = "fadeIn"){
  var jumlahSoal = penyisihanCSO.getSoal().length - 1;
  if(value>jumlahSoal){
    var jawaban = getCookieJawabanToSend();
    var arrJawaban = [];
    if(jawaban != null){
      var n = jawaban.length - 1;
      for(var i = 0; !(i>n); i++){
        if(jawaban[i] != 0){
          object = {
            'quiz_cso_id':i+1,
            'answer_key':jawaban[i].toUpperCase()
          };
          arrJawaban.push(object);
        }
      }
      arrJawaban = JSON.stringify(arrJawaban);
    }
    else{
      arrJawaban = "";
    }
    uploadAnswer(arrJawaban);
  }
  else if(value<0){
    changeContent('#ketentuan');
  }
  else{
    // Remove class
    $('.card-soal.active').removeClass('active');
    $('.card-soal.active').removeClass('animated');
    $('.card-soal.active').removeClass(animation);
    // Add animation when changed
    $('#soal-'+value).addClass('animated');
    $('#soal-'+value).addClass(animation);
    $('#soal-'+value).addClass('active');
  }

  showHideTimer($("#ketentuan").hasClass('active'));
}

function changeContent(value, animation = "fadeIn"){
  // Remove class
  $('.penyisihan-content.active').removeClass('active');
  $('.penyisihan-content.active').removeClass('animated');
  $('.penyisihan-content.active').removeClass(animation);
  // Add animation when changed
  $(value).addClass('animated');
  $(value).addClass(animation);
  $(value).addClass('active');
  if($('#soal').hasClass('active')){
    value = "#daftarJawaban";
    $(value).addClass('animated');
    $(value).addClass(animation);
    $(value).addClass('active');
  }

  showHideTimer($("#ketentuan").hasClass('active'));
}

function showHideTimer(value){
  if(value){
    $("#countdown-cso").css('display','none');
  }
  else{
    $("#countdown-cso").css('display','block');
  }
}

function showSoal(soal){
  var content = "";
  var abc = ["a","b","c","d","e","f","g"];
  for(var i = 0; !(i>soal.length-1); i++){
    var variable = Object.keys(soal[i]);
    var hasil = 0;
    var pilihan = "multiple_choice_";
    for(var z = 0; !(z>variable.length-1); z++){
      if(variable[z].includes(pilihan)){
        hasil++;
      }
    }
    var jawabanContent = "";
    for(var z = 0; !(z>hasil-1); z++){
      var y = z + 1;
      var multiple = 'soal['+i+'].'+pilihan+y;
      jawabanContent += '<br><p>'+
                        '<label>'+
                        '<input name="jawaban-no-'+i+'" value='+abc[z]+' type="radio"/>'+
                        '<span>'+eval(multiple)+'</span>'+
                        '</label>'+
                        '</p>';
    }
    jawabanContent +=   '<br><br><p>'+
                        '<label>'+
                        '<input name="jawaban-no-'+i+'" value="0" type="radio" checked/>'+
                        '<span><font class="teal-text text-lighten-2" style="font-size: 12px">*pilih jika jawaban dikosongkan</font></span>'+
                        '</label>'+
                        '</p>';
    var next = i + 1;
    var back = i - 1;
    var next_str = "NEXT";
    var back_str = "BACK";
    if(next > soal.length-1){
      var next_str = "KUMPULKAN";
    }
    if(back < 0){
      var back_str = "KETENTUAN";
    }
    content +='<div class="card-content layout card-soal" id="soal-'+i+'">'+
                  '<div class="nomor-content center">'+
                  '<span class="teal white-text">'+next+'</span>'+
                  '</div>'+
                  '<div class="soal-content">'+soal[i].question+
                  '</div>'+
                  '<div class="jawaban-content" id="jawaban-'+i+'" onchange="setActiveJawaban()">'+jawabanContent+
                  '<br><br>'+
                  '<a class="waves-effect btn ff-theme" onclick="changeSoal('+back+')">&nbsp;'+back_str+'&nbsp;</a> &nbsp;'+
                  '<a class="waves-effect btn teal right" onclick="changeSoal('+next+')">&nbsp;'+next_str+'&nbsp;</a><br>'+
                  '</div>'+
                  '<br>'+
                  '</div>';
  }
  $('#soal').html(content);
}

function showKetentuan(){
  var content =   '<div class="card-content">'+
                  '<div class="center title">KETENTUAN PENYISIHAN CSO</div>'+
                  '</div>'+
                  '<div class="card-content ketentuan-content">'+
                  '<p>Sebelum mengerjakan soal, silahkan baca ketentuan dibawah ini terlebih dahulu. '+
                  'Panitia tidak akan bertanggung jawab jika peserta melanggar ketentuan dibawah'+
                  '</p>'+
                  '<table>'+
                  '<tr>'+
                  '<th style="width: 15%" class="center">1</th>'+
                  '<td>Pastikan JavaScript pada browser anda sudah di aktifkan (enable JavaScript) agar memperlancar proses penyisihan. Untuk '+
                  'tutorialnya anda bisa mencari di <a href="https://google.com" target="_blank">Google</a><br><font class="teal-text text-lighten-2" style="font-size: 12px">(*jika anda melihat pesan ini, berarti JavaScript di browser anda sudah diaktifkan)</font></td>'+
                  '</tr>'+
                  '<tr>'+
                  '<th style="width: 15%" class="center">2</th>'+
                  '<td>Diwajibkan untuk tidak menghapus Cookie saat penyisihan berlangsung, karena akan menghapus seluruh data soal dan jawaban</td>'+
                  '</tr>'+
                  '<tr>'+
                  '<th style="width: 15%" class="center">3</th>'+
                  '<td>Diwajibkan untuk tidak login lagi di perangkat yang berbeda, karena akan menghapus data soal dan jawaban anda pada sesi login akun ini'+
                  '<br>Bagaimana cara mengeceknya? <br><font class="teal-text text-lighten-2" style="font-size: 12px">Anda bisa melakukan refresh browser pada laman ini. Jika notifikasi "Autentifikasi gagal" tidak muncul, berarti akun ini sudah siap melakukan penyisihan</font></td>'+
                  '</tr>'+
                  '<tr>'+
                  '<th style="width: 15%" class="center">4</th>'+
                  '<td>Diwajibkan untuk tidak logout akun sebelum mengirim jawaban terlebih dahulu</td>'+
                  '</tr>'+
                  '<tr>'+
                  '<th style="width: 15%" class="center">5</th>'+
                  '<td>Pastikan koneksi internet yang anda pakai lancar saat penyisihan berlangsung</td>'+
                  '</tr>'+
                  '<tr>'+
                  '<th style="width: 15%" class="center">6</th>'+
                  '<td>Disarankan untuk mengirim jawaban 5 menit sebelum waktu penyisihan berakhir, karena browser juga memerlukan waktu untuk mengirim jawaban. Jika jawaban dikirim melebihi batas waktu, akan ada pengurangan point</td>'+
                  '</tr>'+
                  '<tr>'+
                  '<th style="width: 15%" class="center">7</th>'+
                  '<td>Disarankan untuk mengakses penyisihan menggunakan laptop/pc, untuk memperlancar pengerjaan</td>'+
                  '</tr>'+
                  '<tr>'+
                  '<th style="width: 15%" class="center">8</th>'+
                  '<td>Anda hanya dapat mengirim jawaban sebanyak satu kali. Jadi pastikan jawaban yang anda kirim sudah dicek sebelumnya</td>'+
                  '</tr>'+
                  '</table><br>Anda dapat menekan tombol <b>START</b> dibawah, jika anda sudah siap<br><br>'+
                  '<a class="waves-effect btn teal" onclick="changeContent(\'#soal\')">&nbsp;START&nbsp;</a><br>'+
                  '</div>';
  $('#ketentuan').html(content);
}

function penyisihanCSOLoader(){
  showLoader();
  fasilkomFestLoader("ff-theme", "teal", "cso1"); // Set loader theme
  fetchQuizCSOAPI();
}
