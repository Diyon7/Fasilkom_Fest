function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname){
  setCookie("data","",-1000);
  setCookie("jawaban-cso","",-1000);
}

function redirectChecking(condition = false){
  // NextDirect for true (true for login, false for dashboard)
  if(condition){
    if(loginChecking()){
      // Jika cookie ada untuk login ke dashboard
      var data = getCookie("data");
      data = JSON.parse(data);
      var competitionId = data.competition_team.competition_id;
      window.location.replace(dashboard[competitionId]);
    }
  }
  else{
    if(!loginChecking()){
      // Jika cookie tidak ada untuk dashboard
      window.location.replace("index");
    }
    else{
      // Jika salah masuk dashboard
      var data = getCookie("data");
      data = JSON.parse(data);
      var competitionId = data.competition_team.competition_id;
      var loc = baseFrontEnd+dashboard[competitionId];
      if(loc != window.location.href){
        window.location.replace(dashboard[competitionId]);
      }
    }
  }
}

function loginChecking(){
  var cookie = getCookie("data");
  if(cookie != ""){
    // Fungsi response disini (nunggu api nya)
    // if(response == 1){
    //   return true;
    // }
    // else{
    //   return false;
    // }
    return true;
  }
  else{
    return false;
  }
}

class identitasUpload{

  static setImage(base64){
    this.base64 = base64;
  }

  static getImage(){
    return this.base64;
  }

}

class buktiPembayaran{

  static setImage(base64){
    this.base64 = base64;
  }

  static getImage(){
    return this.base64;
  }

}

class uploadAnggota1{

  static setImage(base64){
    this.base64 = base64;
  }

  static getImage(){
    return this.base64;
  }

}

class uploadAnggota2{

  static setImage(base64){
    this.base64 = base64;
  }

  static getImage(){
    return this.base64;
  }

}

class fwcTahap1{

  static setDocument(base64){
    this.base64 = base64;
  }

  static getDocument(){
    return this.base64;
  }

}

class fwcTahap2{

  static setDocument(base64){
    this.base64 = base64;
  }

  static getDocument(){
    return this.base64;
  }

}
