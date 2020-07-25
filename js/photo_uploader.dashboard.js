var defaultDrag;

$(document).ready(function(){
  defaultDrag = $('#image-preview-bayar').attr('src');
});

function showImageBayar(){
  var size = this.files[0].size;
  if(this.files && this.files[0]){
    var obj = new FileReader();
    obj.onload = function(data){
      if(imageCheck(data.target.result,size)){
        buktiPembayaran.setImage(data.target.result); // menyimpan base64 gambar ke class
        $("#image-preview-bayar").attr('src',data.target.result);
      }
      else{
        buktiPembayaran.setImage(null);
        M.toast({
          html: "Sesuaikan file dengan format yang sudah ditentukan",
          displayLength: 2000
        });
        $("#image-preview-bayar").attr('src',defaultDrag);
        $("#upload-pembayaran")[0].reset();
      }
    }
    obj.readAsDataURL(this.files[0]);
  }
}

function showImageAnggota1(){
  var size = this.files[0].size;
  if(this.files && this.files[0]){
    var obj = new FileReader();
    obj.onload = function(data){
      if(imageCheck(data.target.result,size)){
        uploadAnggota1.setImage(data.target.result); // menyimpan base64 gambar ke class
        $("#image-preview-anggota1").attr('src',data.target.result);
      }
      else{
        uploadAnggota1.setImage(null);
        M.toast({
          html: "Sesuaikan file dengan format yang sudah ditentukan",
          displayLength: 2000
        });
        $("#image-preview-anggota1").attr('src',defaultDrag);
        $("#file-name-anggota1").val("");
      }
    }
    obj.readAsDataURL(this.files[0]);
  }
}

function showImageAnggota2(){
  var size = this.files[0].size;
  if(this.files && this.files[0]){
    var obj = new FileReader();
    obj.onload = function(data){
      if(imageCheck(data.target.result,size)){
        uploadAnggota2.setImage(data.target.result); // menyimpan base64 gambar ke class
        $("#image-preview-anggota2").attr('src',data.target.result);
      }
      else{
        uploadAnggota2.setImage(null);
        M.toast({
          html: "Sesuaikan file dengan format yang sudah ditentukan",
          displayLength: 2000
        });
        $("#image-preview-anggota2").attr('src',defaultDrag);
        $("#file-name-anggota2").val("");
      }
    }
    obj.readAsDataURL(this.files[0]);
  }
}

function fwcTahap1Save(){
  var size = this.files[0].size;
  if(this.files && this.files[0]){
    var obj = new FileReader();
    obj.onload = function(data){
      if(fwcTahap1Check(data.target.result,size)){
        fwcTahap1.setDocument(data.target.result); // menyimpan base64 document ke class
      }
      else{
        fwcTahap1.setDocument(null);
        M.toast({
          html: "Sesuaikan file dengan format yang sudah ditentukan",
          displayLength: 2000
        });
        $("#file-name-fwc-tahap1").val("");
      }
    }
    obj.readAsDataURL(this.files[0]);
  }
}

function fwcTahap2Save(){
  var size = this.files[0].size;
  if(this.files && this.files[0]){
    var obj = new FileReader();
    obj.onload = function(data){
      if(fwcTahap2Check(data.target.result,size)){
        fwcTahap2.setDocument(data.target.result); // menyimpan base64 document ke class
      }
      else{
        fwcTahap2.setDocument(null);
        M.toast({
          html: "Sesuaikan file dengan format yang sudah ditentukan",
          displayLength: 2000
        });
        $("#file-name-fwc-tahap2").val("");
      }
    }
    obj.readAsDataURL(this.files[0]);
  }
}

function imageCheck(value, size){
  var limitSize = 1048576; // 1 MB
  var image64 = "data:image/jpeg;base64";
  if(value.includes(image64) && size<=limitSize){
    return true;
  }
  else{
    return false;
  }
}

function fwcTahap1Check(value, size){
  var limitSize = 10485760; // 10 MB
  var image64 = "data:application/x-zip-compressed;base64";
  if(value.includes(image64) && size<=limitSize){
    return true;
  }
  else{
    return false;
  }
}

function fwcTahap2Check(value, size){
  var limitSize = 1048576; // 10 MB
  var image64 = "data:application/x-zip-compressed;base64";
  if(value.includes(image64) && size<=limitSize){
    return true;
  }
  else{
    return false;
  }
}

function imageIsNotNull(value){
  if(value!=null){
    return true;
  }
  else{
    return false;
  }
}
