class fwcTime{

  static setValue(value){
    this.value = new Date(value);
  }

  static getValue(){
    return this.value;
  }

}

class csoTime{

  static setValue(value){
    this.value = new Date(value);
  }

  static getValue(){
    return this.value;
  }

}

class csoEndTime{

  static setValue(value){
    this.value = new Date(value);
  }

  static getValue(){
    return this.value;
  }

}

class fpcTime{

  static setValue(value){
    this.value = new Date(value);
  }

  static getValue(){
    return this.value;
  }

}

class fscTime{

  static setValue(value){
    this.value = new Date(value);
  }

  static getValue(){
    return this.value;
  }

}

class participantcso{

  static setPeserta(value){
    this.peserta = value;
  }

  static setTim(value){
    this.tim = value;
  }

  static getPeserta(){
    return this.peserta;
  }

  static getTim(){
    return this.tim;
  }

}

class participantfwc{

  static setPeserta(value){
    this.peserta = value;
  }

  static setTim(value){
    this.tim = value;
  }

  static getPeserta(){
    return this.peserta;
  }

  static getTim(){
    return this.tim;
  }

}

class participantfpc{

  static setPeserta(value){
    this.peserta = value;
  }

  static setTim(value){
    this.tim = value;
  }

  static getPeserta(){
    return this.peserta;
  }

  static getTim(){
    return this.tim;
  }

}

class participantfsc{

  static setPeserta(value){
    this.peserta = value;
  }

  static setTim(value){
    this.tim = value;
  }

  static getPeserta(){
    return this.peserta;
  }

  static getTim(){
    return this.tim;
  }

}

class penyisihanCSO{

  static setSoal(soal){
    this.soal = soal;
  }

  static getSoal(){
    return this.soal;
  }

}



// fungsi
function getStringDate(value){
  var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var hours = value.getHours()+"";
  var minutes = value.getMinutes()+"";
  if(hours < 10){
    hours = "0"+hours;
  }
  if(minutes < 10){
    minutes = "0"+minutes;
  }
  var result = value.getDate()+" "+month[value.getMonth()]+" "+value.getFullYear()+" | "+hours+":"+minutes;
  return result;
}

function setCountDown(value, forDashboard = false){
  // value yang diterima 'cso', 'fwc', dll
  var obj_team = value+"Time";
  var obj_participant = "participant"+value;
  var waktuLomba = eval(obj_team).getValue();
  var jumlahPeserta = eval(obj_participant).getPeserta();
  var jumlahTim = eval(obj_participant).getTim();

  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  let countDown = waktuLomba.getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerText = Math.floor(distance / (day)),
      document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
      document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
      document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

      // do something later when date is reached
      if (distance < 0) {
       $('#start-penyisihan-cso').show();
       $('#start-penyisihan-cso-countdown').show();
       $('#days').text("0");
       $('#hours').text("0");
       $('#minutes').text("0");
       $('#seconds').text("0");
      }

      var date1 = waktuLomba.getTime();
      var date2 = makeIn.getTime();
      var TimeDiff = Math.abs(date2 - date1);
      var diffDays1 = Math.ceil(TimeDiff / (1000 * 3600 * 24));

      var date2 = now;
      var TimeDiff = Math.abs(date2 - date1);
      var diffDays2 = Math.ceil(TimeDiff / (1000 * 3600 * 24));

      var progress = ( ( diffDays1 - diffDays2 ) / diffDays1 ) * 100;
      if(forDashboard){
        // Atur Date String nya
        var date_string = getStringDate(waktuLomba);
        $("#tanggal-value").text(date_string);
        $("#team-value").text(jumlahTim);
        $("#peserta-value").text(jumlahPeserta);
      }
      else{
        // Atur percentage nya
        $('.filler').css('width',progress+'%');
        $('.percentage').text(Math.floor(progress)+'%');
      }

      if($("#body").css("display") == "none"){
        hideLoader(forDashboard);
      }

    }, second)

}

function setCountDownCSO(value){
  // value yang diterima 'cso', 'fwc', dll
  var obj_team = value+"Time";
  var waktuLomba = eval(obj_team).getValue();

  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  let countDown = waktuLomba.getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerText = Math.floor(distance / (day)),
      document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
      document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
      document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

      // do something later when date is reached

      var date_string = "";

      if (distance < 0) {
        date_string = "Timer sudah berakhir, silahkan segera mengumpulkan jawaban";
        $('#days').text("0");
        $('#hours').text("0");
        $('#minutes').text("0");
        $('#seconds').text("0");
      }
      else{
        date_string = "Disarankan untuk mengirim jawaban 5 menit sebelum timer berakhir";
      }

      $("#tanggal-value").text(date_string);

      var date1 = waktuLomba.getTime();
      var date2 = makeIn.getTime();
      var TimeDiff = Math.abs(date2 - date1);
      var diffDays1 = Math.ceil(TimeDiff / (1000 * 3600 * 24));

      var date2 = now;
      var TimeDiff = Math.abs(date2 - date1);
      var diffDays2 = Math.ceil(TimeDiff / (1000 * 3600 * 24));

      hideLoader(true);

    }, second)

}
