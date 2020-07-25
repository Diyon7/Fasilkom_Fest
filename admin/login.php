<?php
  include('_include/head.php');
  // include('_include/script.php');
?>
<body class="hold-transition login-page" oncontextmenu="return false">

<div id = 'loading-screen'></div>

<div class="login-box">
  <div class="login-logo">
    <b>Admin</b> FF 2019
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>
    <div id="alert"></div>

    <form>
      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="Email" id="email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password" id="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="form-group">
          <button type="button" class="btn btn-primary btn-block btn-flat" onclick="loginAdmin()">Sign In</button>
        </div>
      </div>
    </form>
    Note: Jika admin lupa password, admin dapat menghubungi id line @eszpaesz atau whatsapp 083853002616 (fathur)
  </div>
</div>
<?php
  include('_include/script.php');
?>
<script>
  function loginAdmin(){
    var arrStatement = ['email','password'];
    var validate = validateForm(arrStatement);
    
    if(validate == 'success'){
      setLoader();
      var email = $('#email').val();
      var password = $('#password').val();

      APIManager.loginAdmin(email, password)
          .then(function (response) {
            hideLoader();
            
            var statusCode = response.status_code;
            var message = response.message;
            var data = response.data;
            if (statusCode == 1) {
              //success , save cookienya
              document.cookie="admin="+JSON.stringify(data)+";path=/";
              redirectUrl('dashboard.php');
            }else{
              showAlert(message,'#alert','danger');
            }
          })
          .catch(function (error) {
            checkStatusCode(500);
          });
    }else{
      showAlert(validate,'#alert','warning');
    }
  }
</script>
</body>
</html>
