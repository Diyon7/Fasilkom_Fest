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
      <h1>MANAGEMENT WEBCON - STAGE 2</h1>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">

      <!--------------------------
        | Your Page Content Here |
        -------------------------->
      <?php
        include('_include/modalView.php');
      ?>

      <div class="row">
        <div id="start-stop-competition"></div>
      </div>

      <div id="alert"></div>
      <div id="webcon-table"></div>
    </section>
    <!-- /.content -->
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

  fetchData();

  function updateStartWebCon(flag){
    setLoader();
    APIManager.startStopCompetition(token, flag, 7)
      .then(function (response) {
        hideLoader();

        var statusCode = response.status_code;
        var message = response.message;
        checkStatusCode(statusCode);
        // alert(message);
        fetchData();
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }

  function fetchData(){
    setLoader();
    APIManager.fetchUploadZipTeam(token, 2)
      .then(function (response) {
        hideLoader();

        var statusCode = response.status_code;
        var message = response.message;
        var data = response.data;
        checkStatusCode(statusCode);
        var startStop = '<div class="col-xs-3">';
        if(response.status_tahap_2 == 1){
          //start
          startStop += '<button class="btn btn-success" onclick="updateStartWebCon(2)"><i class="fa fa-play"></i>&nbsp; Start Tahap 2</button>';
        }else{
          //stop
          startStop += '<button class="btn btn-danger" onclick="updateStartWebCon(1)"><i class="fa fa-stop"></i>&nbsp; Stop Tahap 2</button>';
        }
        startStop += '</div>';
        document.getElementById("start-stop-competition").innerHTML = startStop;
        
        if (statusCode == 1) {
          // hideAlert('#alert');
          var content = '<div class="row">';
          content += '<div class="col-xs-12">';
          content += '<div class="box">';
          content += '<div class="box-header">';
          content += '<h3 class="box-title">Data Team</h3>';
          content += '</div>';
          content +=  '<div class="box-body">';
          content += '<table id="webcon-data" class="table table-bordered table-striped">';
          content += '<thead>';
          content += '<tr>'
          content += '<th>ID</th>';
          content += '<th>Team</th>';
          content += '<th>Project</th>';
          content += '<th>Status</th>';
          content += '<th>Pengumpulan</th>';
          content += '<th>Action</th>';
          content += '</tr>';
          content += '</thead>';
          content += '<tbody>';

          for(var a=0; a<data.length;a++){
            var actionButton = '';
            content += '<tr>';
            content += '<td>'+data[a].id+'</td>';
            content += '<td>'+data[a].team_name+' - '+data[a].team_email+'</td>';
            content += '<td><a href = "'+data[a].project_name+'" target = "_blink">Download Project</a></td>';
            content += '<td>'+data[a].team_qualified_final_string+'</td>';
            content += '<td>'+data[a].created_at+'</td>';
            var action = '';
            if(data[a].team_qualified_final == '3'){
              action += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-success" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].team_id+',4,\'qualified_final\')">Go To Final</button>';
              action += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-danger" onclick="addClassModalView(\'modal-danger\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].team_id+',1,\'qualified_final\')">Diskualifikasi</button>';
            }else if(data[a].team_qualified_final == '4'){
              action += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-warning" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].team_id+',3,\'qualified_final\')">Back To Tahap 2</button>';
            }
            content += '<td>'+action+'</td>';
            content += '</tr>';
          }

          content += '</tbody>';
          content += '<tfoot>';
          content += '<tr>'
          content += '<th>ID</th>';
          content += '<th>Team</th>';
          content += '<th>Project</th>';
          content += '<th>Status</th>';
          content += '<th>Pengumpulan</th>';
          content += '<th>Action</th>';
          content += '</tr>';
          content += '</tfoot>';
          content += '</table>';
          content += '</div>';
          content += '</div>';
          content += '</div>';
          content += '</div>';

          document.getElementById("webcon-table").innerHTML = content;

          $(function () {
            $('#webcon-data').DataTable({
              'paging'      : true,
              'lengthChange': true,
              'searching'   : true,
              'ordering'    : true,
              'info'        : true,
              'autoWidth'   : true,
              'stateSave'   : true
            })
          });
        }else{
          showAlert(message,'#alert','danger');
          document.getElementById("webcon-table").innerHTML = '';
        }
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }

  function prepareUpdateStatusTeam(teamId, flag, status){
    var content = 'Anda yakin akan melakukan hal ini ?';
    content += "<input type = 'hidden' id = 'request-update-status-team'/>";
    document.getElementById("content-modal-custom-update-team").innerHTML = content;

    var requestData = {};
    requestData.token = token;
    requestData.route = 'updateStatusQualifiedFinalTeam';
    var objData = {};
    objData.team_id = teamId;
    objData.note = '';
    objData.status_update = flag;
    document.getElementById("title-modal-custom-update-team").innerHTML = 'Update Status Qualified Final';

    requestData.data = objData;
    $('#request-update-status-team').val(JSON.stringify(requestData));
  }

  function updateStatusTeam(){
    var getRequest = $('#request-update-status-team').val();
    var parseRequest = JSON.parse(getRequest);
    var routing = parseRequest.route;

    setLoader();
    APIManager[routing](token, parseRequest.data.team_id, parseRequest.data.status_update)
      .then(function (response) {
        hideLoader();

        var statusCode = response.status_code;
        var message = response.message;
        checkStatusCode(statusCode);
        if (statusCode == 1) {
          showAlert(message,'#alert','success');
          fetchData();
        }else{
          showAlert(message,'#alert','danger');
        }
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }
</script>
</body>
</html>