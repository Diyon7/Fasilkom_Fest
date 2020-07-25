var jenisLomba = 2;

$(document).ready(function(){

  var themeColor = "#ff5722";
  var themeColorClass = "deep-orange";
  var themePrimaryClass = "brown";

  // Style option
  $('html').attr('style','--rico-theme: '+themeColor);
  $('#footer-love').addClass(themeColorClass+'-text');

  // Framework option
  $('select').formSelect();
});

// Next register input //
function validateRegister(now,dest){
  if(now==1){
    // Validate step 1
    var input = [];
    input[0] = inputCheck("#register-namatim");
    input[1] = inputCheck("#register-namaketua");
    input[2] = inputCheck("#register-telpketua");
    input[3] = inputCheck("#register-emailketua");
    input[4] = inputCheck("#register-lineketua");
    input[5] = selectCheck("#register-gender");
    input[6] = inputCheck("#register-sekolah");
    input[7] = inputCheck("#register-password");
    input[8] = inputCheck("#register-password2");
    input[9] = selectCheck("#register-anggota");
    var allIstrue = input.every(everyIsTrue);
    if(allIstrue){
      // Jika data lengkap
      var password = $("#register-password").val();
      var password2 = $("#register-password2").val();
      if(password.length >= 8){
        // Jika password kuat
        if(password == password2){
          // Jika password dan confirm nya sama dan jika semua data sudah terisi dengan benar
          registerTo(dest);
        }
        else{
          // Jika password dan confirm nya tidak sama
          M.toast({
            html: "Cek ulang password dan konfirmasi password anda",
            displayLength: 2000
          });
        }
      }
      else{
        // Jika password lemah
        M.toast({
          html: "Password minimal terdiri dari 8 karakter",
          displayLength: 2000
        });
      }
    }
    else{
      // Jika data tidak lengkap
      M.toast({
        html: "Cek kembali inputan anda",
        displayLength: 2000
      });
    }
  }
  else if(now==2){
    // Validate step 2
    if(identitasUpload.getImage()!=null){
      // Jika file yang di upload sudah benar
      registerTo(dest);
    }
    else{
      // Jika tidak ada file yang diupload
      M.toast({
        html: "Silahkan lengkapi semua data",
        displayLength: 2000
      });
    }
    showData();
  }
  else if(now==3){
    // validate step 3
    if(checkboxCheck("#register-finishing")){
      // Simpan dan akses API
      var data = [];
      data[0] = $("#register-namatim").val();
      data[1] = $("#register-namaketua").val();
      data[2] = $("#register-telpketua").val();
      data[3] = $("#register-emailketua").val();
      data[4] = $("#register-lineketua").val();
      data[5] = $("#register-gender").val();
      data[6] = $("#register-sekolah").val();
      data[7] = jenisLomba;
      data[8] = identitasUpload.getImage();
      data[9] = $("#register-password").val();
      data[10] = parseInt($("#register-anggota").val());
      data[10] -= 1;
      if(data[5]==1){
        data[5] = "L";
      }
      else if(data[5]==2){
        data[5] = "P";
      }
      registerAPI(data[3], data[9], data[0], data[6], data[7], data[1], data[2], data[4], data[5], data[8], data[10]);
    }
    else{
      M.toast({
        html: "Silahkan lengkapi semua data",
        displayLength: 2000
      });
    }
  }
  else{
    return false;
  }
}

function registerTo(dest){
  var total = 3;
  var percentage = (dest-1) * 50;
  for(i = 1; !(i>total); i++){
    $(".register-step"+i).css("display","none");
    $(".register-step"+i).addClass("animated");
    $(".register-step"+i).addClass("zoomIn");
  }
  for(i = 1; !(i>dest); i++){
    $(".step-"+i).addClass("active");
  }
  for(i = dest+1; !(i>total); i++){
    $(".step-"+i).removeClass("active");
  }
  $(".register-step"+dest).css("display","block");
  $(".determinate").css("width",percentage+"%");
}

function everyIsTrue(input){
  return input == true;
}

function showData(){
  var data = [];
  data[0] = $("#register-namatim").val();
  data[1] = $("#register-namaketua").val();
  data[2] = $("#register-telpketua").val();
  data[3] = $("#register-emailketua").val();
  data[4] = $("#register-lineketua").val();
  data[5] = $("#register-gender").val();
  data[6] = $("#register-sekolah").val();
  data[7] = jenisLomba;
  data[8] = identitasUpload.getImage();

  if(data[5]==1){
    data[5] = "Laki-Laki";
  }
  else if(data[5]==2){
    data[5] = "Perempuan";
  }
  else{
    data[5] = "";
  }

  if(data[7]==1){
    data[7] = "Computer Science Olympiad";
  }
  else if(data[7]==2){
    data[7] = "Fasilkom Web Contest";
  }
  else{
    data[7] = "";
  }

  $("#lomba").text(data[7]);
  $("#namatim").text(data[0]);
  $("#namaketua").text(data[1]);
  $("#telpketua").text(data[2]);
  $("#emailketua").text(data[3]);
  $("#lineketua").text(data[4]);
  $("#genderketua").text(data[5]);
  $("#asalsekolah").text(data[6]);
  $("#preview-identitas").attr("src",data[8]);
}


// Input text check //
function inputCheck(value){
  if($(value).hasClass('valid')){
    return true;
  }
  else{
    return false;
  }
}

// Input checkbox check //
function checkboxCheck(value){
  if($(value).prop('checked')){
    return true;
  }
  else{
    return false;
  }
}

// Input select check //
function selectCheck(value){
  if($(value).val()==0){
    return false;
  }
  else{
    return true;
  }
}
