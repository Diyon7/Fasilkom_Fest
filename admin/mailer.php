<?php
  include('_include/head.php');
  // include('_include/script.php');
?>
<body class="hold-transition skin-green sidebar-mini">

<div id = 'loading-screen'></div>

<div class="wrapper">
  <?php
    include('_include/headerNav.php');
    include('_include/sideBarMenu.php');
  ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>MAIL INFORMATION</h1>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">

      <!--------------------------
        | Your Page Content Here |
        -------------------------->
      <?php
        include('_include/modalView.php');
      ?>
      <div id="alert"></div>
      <div id="team-table"></div>

      <hr>
      <div class="login-box-body">
        <div class="row">
          <div class="form-group">
            <input type="text" id="subject" placeholder="Enter your subject here ..." class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="form-group">
            <div class="col-md-12">
              <div class="box box-info">
                <div class="box-header">
                  <h3 class="box-title">Content</h3>
                  <!-- tools box -->
                  <div class="pull-right box-tools">
                    <button type="button" class="btn btn-info btn-sm" data-widget="collapse" data-toggle="tooltip"
                            title="Collapse">
                      <i class="fa fa-minus"></i></button>
                  </div>
                  <!-- /. tools -->
                </div>
                <!-- /.box-header -->
                <div class="box-body pad">
                  <form id="mail-form">
                        <textarea id="contentmail" name="contentmail" rows="10" cols="80">
                          Enter your content here ...
                        </textarea>
                  </form>
                </div>
              </div>
              <!-- /.box -->
            </div>
            <!-- /.col-->
          </div>
        </div>
        <div class="row">
            <div class="form-group">
              <button type="button" class="btn btn-success btn-block" onclick="sendMail()"><i class="glyphicon glyphicon-send"></i> Send</button>
            </div>
          </div>
      </div>
    </section>
  </div>
  <!-- /.content-wrapper -->
  <?php
    include('_include/footer.php');
  ?>
</div>
<?php
  include('_include/script.php');
?>
<script type="text/javascript">
  document.getElementById("mailer").classList.add('active');

  fetchTeam();

  $(function () {
    CKEDITOR.replace('contentmail')
  })

  function fetchTeam(){
    var filterRegisterData = 0;
    var filterOnlineOffline = 0;
    var filterQualifiedFinal = 0;
    var filterBayar = 0;

    setLoader();

    APIManager.fetchTeam(token, filterRegisterData, filterOnlineOffline, filterQualifiedFinal, filterBayar)
      .then(function (response) {
        hideLoader();

        var statusCode = response.status_code;
        var message = response.message;
        var data = response.data;
        checkStatusCode(statusCode);
        
        if (statusCode == 1) {
          // hideAlert('#alert');
          var content = '<div class="login-box-body">';
          content += '<div class="row">';
          content += '<div class="margin">';
          content += '<h4>Receiver Team</h4>';
          for(var a=0; a<data.length;a++){
            content += '<div class = "col-xs-4">';
            content += '<input type="checkbox" id="team_'+data[a].id+'" value="'+data[a].id+'">'+data[a].email;
            content += '</div>';
          }
          content += '</div>';
          content += '</div>';
          content += '</div>';

          document.getElementById("team-table").innerHTML = content;
        }else{
          showAlert(message,'#alert','danger');
          document.getElementById("team-table").innerHTML = '';
        }
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }

  function sendMail(){
    var subject = $('#subject').val();
    var content = CKEDITOR.instances.contentmail.getData();
    var arrStatement = ['subject','contentmail'];
    var status = validateForm(arrStatement);

    if(status != 'success'){
      showAlert(status,'#alert','warning');
    }else{
      var arrTeamId = [];
      $("input[type=checkbox]").each(function () {
        var self = $(this);
        if (self.is(':checked')) {
            var intVal = parseInt(self.attr("value"));
            arrTeamId.push(intVal);
        }
      });
      
      if(arrTeamId.length == 0){
        showAlert('Penerima belum diisi','#alert','warning');
      }else{
        setLoader();
        APIManager.mailInfo(token, JSON.stringify(arrTeamId), subject, content.trim())
          .then(function (response) {
            hideLoader();

            var statusCode = response.status_code;
            var message = response.message;
            checkStatusCode(statusCode);
            showAlert(message,'#alert','info');
          })
          .catch(function (error) {
            checkStatusCode(500);
          });
      }
    }
  }
</script>
</body>
</html>