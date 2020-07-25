$(document).ready(function(){

});

function uploadBerkasTahap1(){
  if(fwcTahap1.getDocument()!=null && inputCheck("#uploadBerkas-tahap1")){
    // Jika file yang di upload sudah benar
    var projectName = $('#uploadBerkas-tahap1').val();
    uploadBerkasFWCAPI(1, projectName, fwcTahap1.getDocument());
  }
  else{
    // Jika tidak ada file yang diupload
    M.toast({
      html: "Silahkan lengkapi semua data",
      displayLength: 2000
    });
  }
}

function uploadBerkasTahap2(){
  if(fwcTahap2.getDocument()!=null && inputCheck("#uploadBerkas-tahap2")){
    // Jika file yang di upload sudah benar
    var projectName = $('#uploadBerkas-tahap2').val();
    uploadBerkasFWCAPI(2, projectName, fwcTahap2.getDocument());
  }
  else{
    // Jika tidak ada file yang diupload
    M.toast({
      html: "Silahkan lengkapi semua data",
      displayLength: 2000
    });
  }
}
