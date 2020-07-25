var defaultDrag;
function showImage(){
	var e=this.files[0].size;
	if(this.files&&this.files[0]){
		var a=new FileReader;
		a.onload=function(a){
			imageCheck(a.target.result,e)?(identitasUpload.setImage(a.target.result),$("#image-preview").attr("src",a.target.result)):(identitasUpload.setImage(null),
				alert("Sesuaikan file dengan format yang sudah ditentukan"),$("#image-preview").attr("src",defaultDrag),$("#image")[0].reset())},a.readAsDataURL(this.files[0])
	}
}
function imageCheck(e,a){
	return!!(e.includes("data:image/jpeg;base64")&&a<=1048576)
}
$(document).ready(function(){
	defaultDrag=$("#image-preview").attr("src")
});
