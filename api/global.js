function loginAPI(email, password){
  var dashboardPage;
  swal.queue([{
    type: 'question',
    title: 'Login?',
    text: 'Anda yakin ingin login?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return APIManager.loginTeam(email, password)
                    .then(function(response) {
                        var statusCode = response.status_code;
                        var message = response.message;
                        var data = response.data;
                        if (statusCode == 1) {
                          // Jika berhasil
                          dashboardPage = dashboard[data.competition_team.competition_id];
                          setCookie("data",JSON.stringify(data),30);
                          swal.insertQueueStep({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Anda berhasil login',
                            footer: '<a href="'+dashboardPage+'">Lanjutkan</a>',
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
// showConfirmButton: false,

function registerAPI(email, password, name, schoolName, competitionId, fullName, handphone, line, gender, imageStudentCard, hanya_ketua){
  var loginPage = login[competitionId];
  swal.queue([{
    type: 'question',
    title: 'Register?',
    text: 'Anda yakin ingin mendaftar?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return APIManager.register(email, password, name, schoolName, competitionId, fullName, handphone, line, gender, imageStudentCard, hanya_ketua)
                    .then(function(response) {
                        var statusCode = response.status_code;
                        var message = response.message;
                        var data = response.data;
                        if (statusCode == 1) {
                          // Jika berhasil
                          swal.insertQueueStep({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Anda berhasil mendaftar',
                            footer: '<a href="'+loginPage+'">Ke halaman login</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                          $("#loginForm")[0].reset();
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

function forgotPassword(){
  swal.queue([{
    title: 'Masukkan email ketua tim yang sudah terdaftar',
    input: 'email',
    inputClass: 'browser-default',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: (email) => {
      return APIManager.forgotPasswordTeam(email)
                    .then(function(response) {
                        var statusCode = response.status_code;
                        var message = response.message;
                        var data = response.data;
                        if (statusCode == 1) {
                          // Jika berhasil
                          swal.insertQueueStep({
                            type: 'success',
                            title: 'Berhasil!',
                            text: message,
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
