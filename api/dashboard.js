/* Validasi sebelum mengirim ke API */

function logout(){
  swal({
    type: 'question',
    title: 'Logout?',
    text: 'Anda yakin ingin logout?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
  }).then((result)=>{
    if(result.value){
      deleteCookie("data");
      swal({
        type: 'success',
        title: 'Berhasil!',
        text: 'Anda berhasil logout',
        allowOutsideClick: false,
      }).then((result)=>{
        if(result.value){
          redirectChecking();
        }
      })
    }
    else{
      swal({
        type: 'error',
        title: 'Batal!',
        text: 'Anda membatalkan logout',
        allowOutsideClick: false,
      });
    }
  });
}

function gantiPass(){
  var input = [];
  input[0] = inputCheck("#password");
  input[1] = inputCheck("#password-new");
  input[2] = inputCheck("#password-new-confirm");
  input[3] = checkboxCheck("#check-gantiPass");
  var allIstrue = input.every(everyIsTrue);
  if(allIstrue){
    // Jika data lengkap
    var password = $("#password-new").val();
    var password2 = $("#password-new-confirm").val();
    if(password.length >= 8){
      // Jika password kuat
      if(password == password2){
        // Jika password dan confirm nya sama dan jika semua data sudah terisi dengan benar
        var passwordLama = $("#password").val();
        var passwordBaru = password;
        gantiPassAPI(passwordLama, passwordBaru);
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
      html: "Silahkan lengkapi semua data",
      displayLength: 2000
    });
  }
}

function uploadPembayaran(){
  var note = $("#note-bayar").val();
  if(buktiPembayaran.getImage()!=null){
    // Jika file yang di upload sudah benar
    if(note == ""){
      note = "-";
    }
    uploadPembayaranAPI(note);
  }
  else{
    // Jika tidak ada file yang diupload
    M.toast({
      html: "Silahkan lengkapi semua data",
      displayLength: 2000
    });
  }
}

function validateDataAnggota(){
  var nama = [];
  var telp = [];
  var line = [];
  var gender = [];
  var n = $("#banyak-anggota").val();
  n -= 1;
  if(n>=1){
    // validasi input kosong
    var input = [];
    var a = 0;
    for(var i = 1; i<=n; i++){
      input[a] = inputCheck("#nama-anggota-"+i);
      a++;
      input[a] = inputCheck("#telp-anggota-"+i);
      a++;
      input[a] = inputCheck("#line-anggota-"+i);
      a++;
      // Check image
      var obj = "uploadAnggota"+i;
      input[a] = imageIsNotNull(eval(obj).getImage());
      a++;
    }
    var allIstrue = input.every(everyIsTrue);
    if(allIstrue){
      // Jika data lengkap
      // Pindah layout ke check
      showDataTeamCheck();
      changeContent("data-anggota-view", "fadeIn");
    }
    else{
      // Jika data tidak lengkap
      M.toast({
        html: "Cek kembali inputan anda",
        displayLength: 2000
      });
    }
  }
  else{
    // Jika anggota == 0
    showDataTeamCheck(true); // True jika hanya ketua
    changeContent("data-anggota-view", "fadeIn");
  }
}

function dataAnggota(){
  var n = $("#banyak-anggota").val();
  n -= 1;
  var inputIndexModel;
  var input = [];
  for(var i = 0; i<n; i++){
    var a = i+1;
    var obj = "uploadAnggota"+a;
    inputIndexModel = {
      "full_name": $("#nama-anggota-"+a).val(),
      "handphone": $("#telp-anggota-"+a).val(),
      "line": $("#line-anggota-"+a).val(),
      "gender": $("input[name=gender-anggota-"+a+"]:checked").attr("value"),
      "image_student_card": eval(obj).getImage(),
    },
    input[i] = inputIndexModel;
  }
  dataAnggotaAPI(input);
}


/* API Manager
/* Disini adalah fungsi untuk mengatur style saat API diakses, seperti loader dll
/* Untuk pengaksesan API bisa diakses di controller */

function gantiPassAPI(passwordLama, passwordBaru){
  var loginPage;
  var data = getCookie("data");
  data = JSON.parse(data);
  var token = data.token;
  loginPage = login[data.competition_team.competition_id];
  swal.queue([{
    type: 'question',
    title: 'Ganti Password?',
    text: 'Anda yakin ingin ganti password?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return APIManager.changePassword(token, passwordLama, passwordBaru)
                    .then(function(response) {
                        var statusCode = response.status_code;
                        var message = response.message;
                        var data = response.data;
                        if (statusCode == 1) {
                          // Jika berhasil
                          swal.insertQueueStep({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Password berhasil diganti',
                            footer: '<a href="" onclick="location.reload()">Refresh halaman</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else if(statusCode <= -299 && statusCode >= -399){
                          deleteCookie("data");
                          swal.insertQueueStep({
                            type: 'error',
                            title: 'Oops!',
                            text: message,
                            footer: '<a href="'+loginPage+'">Login ulang</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else{
                          // Jika tidak berhasil
                          swal.insertQueueStep({
                            type: 'error',
                            title: 'Gagal!',
                            text: message,
                            allowOutsideClick: false,
                          });
                        }
                    })
                    .catch(function(error) {
                      // Jika koneksi error
                      swal.insertQueueStep({
                        type: 'question',
                        title: 'Koneksi?',
                        text: 'Cek koneksi anda',
                        allowOutsideClick: false,
                      });
                    });
    }
  }]);
}

function uploadPembayaranAPI(note){
  var image = buktiPembayaran.getImage();
  var data = getCookie("data");
  data = JSON.parse(data);
  var token = data.token;
  var competitionTeamId = data.competition_team.id;
  var loginPage = login[data.competition_team.competition_id];
  swal.queue([{
    type: 'question',
    title: 'Upload Bukti Pembayaran?',
    text: 'Apakah anda ingin mengupload bukti pembayaran?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return APIManager.addBuktiPembayaran(token, competitionTeamId, note, image)
                    .then(function(response) {
                        var statusCode = response.status_code;
                        var message = response.message;
                        if (statusCode == 1) {
                          // Jika berhasil
                          swal.insertQueueStep({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Berasil mengupload bukti pembayaran',
                            footer: '<a href="" onclick="location.reload()">Refresh halaman</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else if(statusCode <= -299 && statusCode >= -399){
                          deleteCookie("data");
                          swal.insertQueueStep({
                            type: 'error',
                            title: 'Oops!',
                            text: message,
                            footer: '<a href="'+loginPage+'">Login ulang</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else{
                          // Jika tidak berhasil
                          swal.insertQueueStep({
                            type: 'error',
                            title: 'Gagal!',
                            text: message,
                            allowOutsideClick: false,
                          });
                        }
                    })
                    .catch(function(error) {
                      // Jika koneksi error

                      swal.insertQueueStep({
                        type: 'question',
                        title: 'Koneksi?',
                        text: 'Cek koneksi anda',
                        allowOutsideClick: false,
                      });
                    });
    }
  }]);
}

function dataAnggotaAPI(input){
  var arrDataMember = JSON.stringify(input);
  var data = getCookie("data");
  data = JSON.parse(data);
  var token = data.token;
  var loginPage = login[data.competition_team.competition_id];
  swal.queue([{
    type: 'question',
    title: 'Tambahkan Anggota?',
    text: 'Apakah anda ingin menambahkan anggota?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return APIManager.addMember(token, arrDataMember)
                    .then(function(response) {
                        var statusCode = response.status_code;
                        var message = response.message;
                        if (statusCode == 1) {
                          // Jika berhasil
                          swal.insertQueueStep({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Anggota berhasil ditambahkan',
                            footer: '<a href="" onclick="location.reload()">Refresh halaman</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else if(statusCode <= -299 && statusCode >= -399){
                          deleteCookie("data");
                          swal.insertQueueStep({
                            type: 'error',
                            title: 'Oops!',
                            text: message,
                            footer: '<a href="'+loginPage+'">Login ulang</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else{
                          // Jika tidak berhasil
                          swal.insertQueueStep({
                            type: 'error',
                            title: 'Gagal!',
                            text: message,
                            allowOutsideClick: false,
                          });
                        }
                    })
                    .catch(function(error) {
                      // Jika koneksi error

                      swal.insertQueueStep({
                        type: 'question',
                        title: 'Koneksi?',
                        text: 'Cek koneksi anda',
                        allowOutsideClick: false,
                      });
                    });
    }
  }]);
}

function fetchStatus(){
  var data = getCookie("data");
  data = JSON.parse(data);
  var token = data.token;
  var loginPage = login[data.competition_team.competition_id];
  showLoader();
  APIManager.fetchMember(token)
                .then(function(response) {
                    var statusCode = response.status_code;
                    var message = response.message;
                    var data = response.data;
                    if (statusCode == 1) {
                      setCookie("data",JSON.stringify(data),30);
                      var acara = data.competition_team.competition_id;
                      informasiLomba(acara, true);
                    }
                    else if(statusCode <= -299 && statusCode >= -399){
                      deleteCookie("data");
                      swal({
                        type: 'error',
                        title: 'Oops!',
                        text: message,
                        footer: '<a href="'+loginPage+'">Login ulang</a>',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                      });
                    }
                    else{
                      deleteCookie("data");
                      swal({
                        type: 'error',
                        title: 'Oops!',
                        text: message,
                        footer: '<a href="'+loginPage+'">Login ulang</a>',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                      });
                    }
                })
                .catch(function(error) {
                  swal({
                    type: 'question',
                    title: 'Koneksi?',
                    text: 'Cek koneksi anda',
                    allowOutsideClick: false,
                  }).then((result)=>{
                    if(result.value){
                      location.reload();
                    }
                  });
                });
}

function uploadBerkasFWCAPI(tahap, projectName, projectBase64){
  var loginPage;
  var data = getCookie("data");
  data = JSON.parse(data);
  var token = data.token;
  loginPage = login[data.competition_team.competition_id];
  swal.queue([{
    type: 'question',
    title: 'Upload Berkas?',
    text: 'Anda yakin berkas tahap '+tahap+' sudah benar?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return APIManager.uploadZipTeam(token, tahap, projectName, projectBase64)
                    .then(function(response) {
                        var statusCode = response.status_code;
                        var message = response.message;
                        if (statusCode == 1) {
                          // Jika berhasil
                          swal.insertQueueStep({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Upload berkas berhasil',
                            footer: '<a href="" onclick="location.reload()">Refresh halaman</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else if(statusCode <= -299 && statusCode >= -399){
                          deleteCookie("data");
                          swal.insertQueueStep({
                            type: 'error',
                            title: 'Oops!',
                            text: message,
                            footer: '<a href="'+loginPage+'">Login ulang</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else{
                          // Jika tidak berhasil
                          swal.insertQueueStep({
                            type: 'error',
                            title: 'Gagal!',
                            text: message,
                            allowOutsideClick: false,
                          });
                        }
                    })
                    .catch(function(error) {
                      // Jika koneksi error
                      swal.insertQueueStep({
                        type: 'question',
                        title: 'Koneksi?',
                        text: 'Cek koneksi anda',
                        allowOutsideClick: false,
                      });
                    });
    }
  }]);
}
