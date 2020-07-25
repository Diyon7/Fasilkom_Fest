<!-- jQuery 3 -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- iCheck -->
<script src="plugins/iCheck/icheck.min.js"></script>
<!-- DataTables -->
<script src="bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<!-- SlimScroll -->
<script src="bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>
<!-- CK Editor -->
<script src="bower_components/ckeditor/ckeditor.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>

<script src="custom/js/photo_uploader.js"></script>
<script src="custom/js/fileinput.js"></script>
<script src="../_controller/baseURL.js"></script>
<script src="../_controller/globalFunction.js"></script>
<script src="../_controller/globalVariable.js"></script>
<script src="../_controller/APIManager.js"></script>

<script type="text/javascript">
	// console.log(location.pathname);
	var adminData = getCookieUser('admin');
	if(adminData != ''){
		var parseAdmin = JSON.parse(adminData);
		var token = parseAdmin.token;
		document.getElementById("admin-name").innerHTML = parseAdmin.email;
		document.getElementById("admin-name-side-profile").innerHTML = parseAdmin.email;
	}else{
		if(window.location.href != baseFrontEndAdmin+'login.php'){
			// alert(window.location.href+' != '+baseFrontEndAdmin+'login.php');
			logout();
		}
	}

	$(document).ready(function () {
	    //Disable full page
	    $('body').bind('cut copy paste', function (e) {
	        e.preventDefault();
	    });
	});

	function showAlert(text,divalert,alertColor){
		var content = '<div class="box-body">';
		content += '<div class="alert alert-'+alertColor+' alert-dismissible" id="alert-class">';
    	content += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
    	content += '<h4><i class="icon fa fa-info"></i> Alert!</h4>';
    	content += text;
  		content += '</div>';
		content += '</div>';
		
		$(divalert).html(content);
		$(divalert).css("display","block");
	}

	function hideAlert(divalert){
		$(divalert).css("display","none");
	}

	function checkStatusCode(statusCode){
		if(statusCode == 500){
			window.location.href = '500.php';
		}else if(statusCode <= -299 && statusCode >= -399){
			logout();
		}
		return statusCode;
	}

	function validateForm(arrStatement){
		var status = 'success';
		for(var a=0;a<arrStatement.length;a++){
			if(arrStatement[a] == 'email' && $('#email').val().length == 0){
				status = 'Email harus diisi';
			}else if(arrStatement[a] == 'password' && $('#password').val().length == 0){
				status = 'Password harus diisi';
			}else if(arrStatement[a] == 'subject' && $('#subject').val().length == 0){
				status = 'Subject harus diisi';
			}else if(arrStatement[a] == 'contentmail' && CKEDITOR.instances.contentmail.getData().length == 0){
				status = 'Content harus diisi';
			}
		}
		return status;
	}

	function redirectUrl(url){
		$.get(url).done(function () {
	        window.location.href = url;
	    }).fail(function () {
	    	window.location.href = '404.php';
	    });
	}

	function getCookieUser(){
		var takeCookie=getCookie("admin");
		return takeCookie;
	}

	function logout(){
		document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.href = 'login.php';
	}

	function addClassModalView(className, modalId){
		document.getElementById(modalId).className = '';

		document.getElementById(modalId).classList.add('modal');
		document.getElementById(modalId).classList.add('fade');
		document.getElementById(modalId).classList.add(className);
	}

	function prepareChangePassword(){
	    addClassModalView('modal-success','modal-view-custom-change-password');
		document.getElementById("title-modal-custom-change-password").innerHTML = 'Change Password';

		var content = "<input type = 'password' class = 'form-control' id = 'old-password' placeholder = 'Masukkan password lama Anda ...' /> <hr>";
		content +=  "<input type = 'password' class = 'form-control' id = 'new-password' placeholder = 'Masukkan password baru Anda ...' /><hr>";
		content +=  "<input type = 'password' class = 'form-control' id = 're-type-new-password' placeholder = 'Masukkan ulang password baru Anda ...' />";
	    document.getElementById("content-modal-custom-change-password").innerHTML = content;
	}

	function changePassword(){
		var oldPassword = $('#old-password').val();
		var newPassword = $('#new-password').val();
		var reTypeNewPassword = $('#re-type-new-password').val();
		
		var validate = true;
		if(oldPassword.length == 0 || newPassword.length == 0 || reTypeNewPassword.length == 0){
			alert('Pastikan semua data diisi');
			validate = false;
		}else if(newPassword != reTypeNewPassword){
			alert('Password baru dan ketik ulang password baru tidak sama, mohon input ulang');
			validate = false;
		}

		if(validate){
			setLoader();
			APIManager.changePassword(token, oldPassword, newPassword)
		        .then(function (response) {
		          hideLoader();

		          var statusCode = response.status_code;
		          var message = response.message;
		          checkStatusCode(statusCode);
		          alert(message);
		        })
		        .catch(function (error) {
		          checkStatusCode(500);
		        });
		}
	}

	function setLoader(){
		var loader = '<div id="loading"><img id="loading-image" src="custom/images/spinner.gif" alt="Loading..." /></div>';
		document.getElementById('loading-screen').innerHTML = loader;
	}

	function hideLoader(){
		document.getElementById('loading-screen').innerHTML = '';
	}
</script>