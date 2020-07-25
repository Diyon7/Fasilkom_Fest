function informasiLomba(value, forDashboard = true){
  APIManager.fetchEvent()
                .then(function(response) {
                    var statusCode = response.status_code;
                    var message = response.message;
                    var data = response.data;
                    if (statusCode == 1) {
                      csoTime.setValue(data[0].detail[0].date_time_start);
                      fwcTime.setValue(data[0].detail[1].date_time_start);
                      fpcTime.setValue(data[0].detail[3].date_time_start);
                      fscTime.setValue(data[0].detail[2].date_time_start);
                      participantcso.setPeserta(data[0].detail[0].count_peserta);
                      participantcso.setTim(data[0].detail[0].count_team);
                      participantfwc.setPeserta(data[0].detail[1].count_peserta);
                      participantfwc.setTim(data[0].detail[1].count_team);

                      setCountDown(acara[value], forDashboard);
                      if(forDashboard){
                        setTimeout(function(){
                          $('.counter').counterUp({
                            delay: 1,
                            time: 500
                          });
                        }, 1000);
                      }
                      // hideLoader(); sudah ditaroh didalam fungsi setCountDown() agar countdown dapat dimulai secara optimal
                    }
                    else{
                      swal({
                        type: 'error',
                        title: 'Gagal!',
                        text: message,
                        allowOutsideClick: false,
                      }).then((result)=>{
                        if(result.value){
                          location.reload();
                        }
                        else{
                          location.reload();
                        }
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
                    else{
                      location.reload();
                    }
                  });
                });
}
