function fetchQuizCSOAPI(){
  var loginPage;
  var data = getCookie("data");
  data = JSON.parse(data);
  var token = data.token;
  loginPage = login[data.competition_team.competition_id];
  APIManager.fetchQuiz(token)
                .then(function(response) {
                    var statusCode = response.status_code;
                    var message = response.message;
                    var data = response.data;
                    var endTime = response.date_time_end;
                    if (statusCode == 1) {
                      var soal = data;
                      penyisihanCSO.setSoal(soal);
                      showSoal(penyisihanCSO.getSoal());
                      showDaftarJawaban();
                      changeSoal(0); // Mengaktifkan soal saat pertama masuk ke layout soal (default: 0)
                      csoEndTime.setValue(endTime); // Ganti jika sudah menerima waktunya
                      setCountDownCSO("csoEnd");
                      changeContent('#ketentuan'); // Mengaktifkan layout soal (default: #ketentuan)
                      getCookieJawaban();
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
                      // Jika tidak berhasil
                      swal({
                        type: 'error',
                        title: 'Gagal!',
                        text: message,
                        footer: '<a href="cso-dashboard">Dashboard</a>',
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

function uploadAnswer(jawaban){
  var data = getCookie("data");
  data = JSON.parse(data);
  var token = data.token;
  var loginPage = login[data.competition_team.competition_id];
  swal.queue([{
    type: 'question',
    title: 'Kirim jawaban?',
    text: 'Apakah anda yakin ingin mengirim jawaban?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return APIManager.uploadAnswerTeam(token, jawaban)
                    .then(function(response) {
                        var statusCode = response.status_code;
                        var message = response.message;
                        if (statusCode == 1) {
                          // Jika berhasil
                          setCookie("jawaban-cso","",-1000);
                          swal.insertQueueStep({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Berhasil mengirim jawaban',
                            footer: '<a href="index">Halaman utama</a>',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                        }
                        else if(statusCode <= -299 && statusCode >= -399){
                          setCookie("data","",-1000);
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
