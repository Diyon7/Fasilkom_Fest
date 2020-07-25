var defaultDrag;

$(document).ready(function(){
  defaultDrag = $('#image-preview').attr('src');
});

function showImage(){
  var size = this.files[0].size;
  if(this.files && this.files[0]){
    var obj = new FileReader();
    obj.onload = function(data){
      if(imageCheck(data.target.result,size)){
        identitasUpload.setImage(data.target.result);
        $("#image-preview").attr('src',data.target.result);
      }
      else{
        identitasUpload.setImage(null);
        M.toast({
          html: "Sesuaikan file dengan format yang sudah ditentukan",
          displayLength: 2000
        });
        $("#image-preview").attr('src',defaultDrag);
        $("#identitas-upload")[0].reset();
      }
    }
    obj.readAsDataURL(this.files[0]);
  }
}

function imageCheck(value, size){
  var limitSize = 1048576;
  var image64 = "data:image/jpeg;base64";
  if(value.includes(image64) && size<=limitSize){
    return true;
  }
  else{
    return false;
  }
}
