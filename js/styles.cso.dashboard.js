$(document).ready(function(){
  redirectChecking(); // Check is iseet or not
  checkStatus(); // Show all status (siap lomba, pembayaran dll)
  showDataTeam();
  fasilkomFestLoader("ff-theme", "teal", "cso1"); // Set loader theme
  fetchStatus(); // Get new update data

  // Framework function
  $('.sidenav').sidenav();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  $('.modal').modal();
  $('.materialboxed').materialbox();

  // My styles
  $('#info-tim').addClass('active');

  var themeColor = "#009688";
  var themeColorClass = "teal";

  $('html').attr('style','--rico-theme: '+themeColor);
  $('#footer-love').addClass(themeColorClass+'-text');
});


function checkStatus(){
  var data = getCookie("data");
  data = JSON.parse(data);
  var pembayaran = data.valid_bayar;
  var pembayaran_string = data.valid_bayar_string;
  var dataAnggota = data.valid_register_data;
  var dataAnggota_string = data.valid_register_data_string;
  var onoff = data.valid_on_off;
  var content;
  if(pembayaran == 1){
    content = "data-pembayaran";
    pembayaran_string +=  '. Silahkan melakukan pembayaran, '+
                          'kemudian upload bukti pembayarannya '+
                          '<a class="grey-text text-lighten-2" onclick="changeContent(\''+content+'\')">disini.</a>';
  }
  if(dataAnggota == 1){
    content = "data-anggota";
    dataAnggota_string += '. Silahkan lengkapi data anggota '+
                          '<a class="grey-text text-lighten-2" onclick="changeContent(\''+content+'\')">disini.</a>';
    if(data.note_register_data != ""){
      dataAnggota_string += '<br><div class="card grey-text text-darken-3">'+
                            '<div class="card-content">'+
                            'Pesan Admin: '+data.note_register_data+
                            '</div>'+
                            '</div>';
    }
  }
  var logo = [];
  logo[1] = "fa-times-circle";
  logo[2] = "fa-exclamation-circle";
  logo[3] = "fa-check-circle";
  var color = [];
  color[1] = "red";
  color[2] = "yellow grey-text text-darken-3";
  color[3] = "green";
  // Pembayaran check
  $("#check-pembayaran").addClass(color[pembayaran]);
  $("#check-pembayaran .fa").addClass(logo[pembayaran]);
  $("#check-pembayaran #desc").html(pembayaran_string);
  // Data anggota check
  $("#check-data-anggota").addClass(color[dataAnggota]);
  $("#check-data-anggota .fa").addClass(logo[dataAnggota]);
  $("#check-data-anggota #desc").html(dataAnggota_string);
  // Siap lomba
  var siapLomba = [];
  siapLomba[0] = "Silahkan lengkapi beberapa persyaratan diatas dan tunggu verifikasi dari Admin.";
  siapLomba[1] = "Semua persyaratan sudah dilengkapi dan sudah terverifikasi. Tim anda sudah siap berlomba";
  var siapkah;
  if(pembayaran == 3 && dataAnggota == 3 && onoff > 1){
    siapkah = 1;
  }
  else{
    siapkah = 0;
  }
  $("#check-siap-lomba").text(siapLomba[siapkah]);
}

function showDataTeamCheck(hanyaKetua = false){
  var data = getCookie("data");
  data = JSON.parse(data);
  data.detail_member = data.detail_member[0];
  var n = $("#banyak-anggota").val();
  n -= 1;
  var innerAnggota = "";
  var innerKetua =  '<tr>'+
                    '<th>Nama Tim</th>'+
                    '<td id="show-namatim2"></td>'+
                    '</tr>'+
                    '<tr>'+
                    '<th>Ketua Tim</th>'+
                    '<td id="show-namaketua"></td>'+
                    '</tr>';
  var anggota = [];
  if(hanyaKetua){
      innerAnggota += '<tr>'+
                      '<th>Anggota</th>'+
                      '<td><font class="teal-text text-lighten-2" style="font-size: 12px">*tidak ada anggota yang ditambahkan</font></td>'+
                      '</tr>';
  }
  else{
    for(var i = 1; i<=n; i++){
      anggota[i] = $("#nama-anggota-"+i).val();
      innerAnggota += '<tr>'+
                      '<th>Anggota '+i+'</th>'+
                      '<td>'+anggota[i]+'</td>'+
                      '</tr>';
    }
  }
  $("#check-data-tim").html(innerKetua + innerAnggota);
  $("#show-namatim2").text(data.name);
  $("#show-namaketua").text(data.detail_member.full_name);
}

function showDataTeam(){
  var data = getCookie("data");
  data = JSON.parse(data);
  var gender = genderCheck(data.detail_member[0].gender);
  var onoff = data.valid_on_off;
  var dataAnggota = data.valid_register_data;
  if(onoff == 1){
    var onoff_string = data.valid_on_off_string+" (Menunggu konfirmasi Admin)";
  }
  else if(onoff == 2){
    var onoff_string = data.valid_on_off_string+" (Lokasi : Gd Giri Santika UPN VETERAN JATIM)";
  }
  else{
    var onoff_string = data.valid_on_off_string;
  }
  $("#show-namatim").text(data.name);
  $("#show-bayar").text(data.competition_team.price_to_compete);
  $("#show-lomba").text(data.competition_team.competition_name);

  // Show info for informasi tim
  $("#info-show-namatim").text(data.name);
  $("#info-show-onoff").text(onoff_string);
  $("#info-show-ketua-nama").text(data.detail_member[0].full_name);
  $("#info-show-ketua-sekolah").text(data.school_name);
  $("#info-show-ketua-email").text(data.email);
  $("#info-show-ketua-telp").text(data.detail_member[0].handphone);
  $("#info-show-ketua-line").text(data.detail_member[0].line);
  $("#info-show-ketua-gender").text(gender);

  // Show info for sidenav mobile
  $("#sidenav-show-name").text(data.name);
  $("#sidenav-show-email").text(data.email);

  if (dataAnggota == 3){
    var infoAnggota = "";
    for(var i = 1; !(i >= data.detail_member.length); i++){
      infoAnggota +=  '<table class="striped grey-text text-darken-2">'+
                      '<tr>'+
                      '<th class="center">DATA ANGGOTA '+i+'</th>'+
                      '</tr>'+
                      '</table>'+
                      '<table>'+
                      '<tr>'+
                      '<th>Nama</th>'+
                      '<td id="info-show-anggota'+i+'-nama"></td>'+
                      '</tr>'+
                      '<tr>'+
                      '<th>Telepon</th>'+
                      '<td id="info-show-anggota'+i+'-telp"></td>'+
                      '</tr>'+
                      '<tr>'+
                      '<th>ID Line</th>'+
                      '<td id="info-show-anggota'+i+'-line"></td>'+
                      '</tr>'+
                      '<tr>'+
                      '<th>Gender</th>'+
                      '<td id="info-show-anggota'+i+'-gender"></td>'+
                      '</tr>'+
                      '</table><br>';
    }
  }
  $("#info-show-anggota").html(infoAnggota);
  // Inner info anggota
  for(var i = 1; !(i >= data.detail_member.length); i++){
    $("#info-show-anggota"+i+"-nama").text(data.detail_member[i].full_name);
    $("#info-show-anggota"+i+"-telp").text(data.detail_member[i].handphone);
    $("#info-show-anggota"+i+"-line").text(data.detail_member[i].line);
    $("#info-show-anggota"+i+"-gender").text(genderCheck(data.detail_member[i].gender));
  }
}

function genderCheck(value){
  if(value == "L"){
    return "Laki-Laki";
  }
  else if(value == "P"){
    return "Perempuan";
  }
}

// Function to change content
function changeContent(value, animation = "slideInDown"){
  var data = getCookie("data");
  data = JSON.parse(data);
  var pembayaran = data.valid_bayar;
  var anggota = data.valid_register_data;
  var penyisihan = data.valid_tahap1;
  value = "#"+value;
  // Remove class
  $('.dashboard-content.active').removeClass('active');
  $('.dashboard-content.active').removeClass('animated');
  $('.dashboard-content.active').removeClass(animation);
  if(pembayaran > 1 && value == "#data-pembayaran" || anggota > 1 && value == "#data-anggota" || penyisihan > 1 && value == "#penyisihan-cso"){
    value += "-lengkap";
  }
  // Add animation when changed
  $(value).addClass('animated');
  $(value).addClass(animation);
  $(value).addClass('active');
}

// Function to clear all form input
function clearForm(value){
  $(value)[0].reset();
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

function everyIsTrue(input){
  return input == true;
}

function innerInputAnggota(){
  var n = $("#banyak-anggota").val();
  n -= 1;
  var innerInput = "";
  var innerButton = '<a class="waves-effect btn teal animated zoomIn" onclick="validateDataAnggota()">&nbsp;NEXT&nbsp;</a>';
  var innerInfo = '<div class="card secondary teal white-text animated fadeInDown">'+
                  '<div class="card-content">'+
                  '<p>'+
                  'Silahkan lengkapi data anggota tim dibawah dengan data asli '+
                  'dan upload Kartu Pelajar / Surat Pengganti Kartu Pelajar anggota '+
                  'tim sesuai dengan data yang diisi.'+
                  '</p>'+
                  '</div>'+
                  '</div>'+
                  '<div class="grey-text text-darken-2 animated fadeInDown"><p>Ketentuan file:</p>'+
                  '<p> - Format file diunggah dalam ekstensi <font class="teal-text">*.jpg / *.jpeg</font></p>'+
                  '<p> - Ukuran file maksimum <font class="teal-text">1 MB</font></p>'+
                  '<p> - Identitas dapat dibaca dengan jelas</p></div>'+
                  '<br><br>';
  for(var i = 1; i<=n; i++){
    innerInput += '<p class="animated fadeInDown title grey-text text-darken-2">Anggota '+i+'</p>'+
                  '<div class="divider teal animated zoomIn"></div>'+
                  '<br>'+
                  '<div class="row animated fadeInDown">'+
                  '<div class="input-field col s12">'+
                  '<input id="nama-anggota-'+i+'" type="text" class="validate" style="text-align: left">'+
                  '<label for="nama-anggota-'+i+'">Nama Lengkap</label>'+
                  '</div>'+
                  '</div>'+
                  '<div class="row animated fadeInDown">'+
                  '<div class="input-field col s6">'+
                  '<input id="telp-anggota-'+i+'" type="number" class="validate no-spinners" style="text-align: left">'+
                  '<label for="telp-anggota-'+i+'">No. Telepon</label>'+
                  '</div>'+
                  '<div class="input-field col s6">'+
                  '<input id="line-anggota-'+i+'" type="text" class="validate" style="text-align: left">'+
                  '<label for="line-anggota-'+i+'">ID Line</label>'+
                  '</div>'+
                  '</div>'+
                  '<div class="row animated fadeInDown gender-anggota">'+
                  '<p class="title grey-text">Gender</p>'+
                  '<br><p>'+
                  '<label>'+
                  '<input name="gender-anggota-'+i+'" value="L" type="radio" checked/>'+
                  '<span>Laki-Laki</span>'+
                  '</label>'+
                  '</p>'+
                  '<br><p>'+
                  '<label>'+
                  '<input name="gender-anggota-'+i+'" value="P" type="radio"/>'+
                  '<span>Perempuan</span>'+
                  '</label>'+
                  '</p>'+
                  '</div>'+
                  '<div class="ff-row file-field input-field">'+
                  '<img src="img/drag/drag-photo-cso.png" id="image-preview-anggota'+i+'" class="file-field input-field" accept="image/*">'+
                  '<br><br>'+
                  '<div class="btn teal">'+
                  '<span>FILE</span>'+
                  '<input type="file" onchange="showImageAnggota'+i+'.call(this)" accept="image/jpeg">'+
                  '</div>'+
                  '<div class="file-path-wrapper">'+
                  '<input class="file-path validate" type="text" id="file-name-anggota'+i+'" disabled=>'+
                  '</div>'+
                  '</div><br><br>';
  }
  if(n>=1){
    innerInput = innerInfo + innerInput;
  }
  $("#inner-anggota").html(innerInput);
  $("#inner-button").html(innerButton);
}
