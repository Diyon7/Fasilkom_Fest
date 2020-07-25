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
      <h1>MANAGEMENT CSO - SETTING POINT</h1>
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
      <div id="setting-content"></div>
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
  document.getElementById("competition").classList.add('active');

  setLoader();

  fetchPoint();

  function fetchPoint(){
    APIManager.fetchPoint(token)
      .then(function (response) {
        hideLoader();

        var statusCode = response.status_code;
        var message = response.message;
        checkStatusCode(statusCode);
        if(statusCode == 1){
          hideAlert('#alert');
          var data = response.data;
          var arrSubmit = [];

          var content = '<div class="row">';
          content += '<div class="col-xs-12">';
          content += '<div class="box">';
          content += '<div class="box-header"><h3 class="box-title">Setting Point</h3></div>';
          content +=  '<div class="box-body">';
          for(var a=0; a<data.length ;a++){
            var objSubmit = {};
            objSubmit.id = data[a].id;
            objSubmit.content = data[a].content;
            arrSubmit.push(objSubmit);

            content += '<label>'+data[a].name+'</label><input onchange="changeRequestSubmit('+data[a].id+')" class="form-control" type="number" id="'+data[a].id+'" value="'+data[a].content+'"><hr>';
          }
          content += '<input type="hidden" id="submit-input" class="form-control" value='+JSON.stringify(arrSubmit)+'></input>';
          content += '<button type="button" class="form-control btn btn-success" onclick="updatePoint()">Simpan</button>';

          content += '</div>';
          content += '</div>';
          content += '</div>';
          content += '</div>';
          document.getElementById('setting-content').innerHTML = content;
        }else{
          showAlert(message,'#alert','danger');
          document.getElementById('setting-content').innerHTML = '';
        }
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }

  function updatePoint(){
    var requestInput = $('#submit-input').val();
    setLoader();

    APIManager.updatePoint(token, requestInput)
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

  function changeRequestSubmit(id){
    var getValueChange = $('#'+id).val();
    var requestInput = $('#submit-input').val();
    var parseRequest = JSON.parse(requestInput);

    for(var a=0;a<parseRequest.length;a++){
      if(parseRequest[a].id == id){
        parseRequest[a].content = getValueChange;
      }
    }
    $('#submit-input').val(JSON.stringify(parseRequest));    
  }
</script>
</body>
</html>