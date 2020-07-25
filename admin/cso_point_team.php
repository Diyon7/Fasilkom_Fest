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
      <h1>MANAGEMENT CSO - POINT TEAM</h1>
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
      <div id="cso-table"></div>
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

  function fetchData(){
    setLoader();
    APIManager.fetchPointTeam(token)
      .then(function (response) {
        hideLoader();

        var statusCode = response.status_code;
        var message = response.message;
        var data = response.data;
        checkStatusCode(statusCode);
        
        if (statusCode == 1) {
          // hideAlert('#alert');
          var content = '<div class="row">';
          content += '<div class="col-xs-12">';
          content += '<div class="box">';
          content += '<div class="box-header">';
          content += '<h3 class="box-title">Data Point Team</h3>';
          content += '</div>';
          content +=  '<div class="box-body">';
          content += '<table id="cso-data" class="table table-bordered table-striped">';
          content += '<thead>';
          content += '<tr>'
          content += '<th>ID</th>';
          content += '<th>Email</th>';
          content += '<th>Nama Team</th>';
          content += '<th>Asal Sekolah</th>';
          content += '<th>Benar</th>';
          content += '<th>Salah</th>';
          content += '<th>Tidak Dijawab</th>';
          content += '<th>Poin</th>';
          content += '<th>Status</th>';
          content += '<th>Pengumpulan</th>';
          content += '<th>Action</th>';
          content += '</tr>';
          content += '</thead>';
          content += '<tbody>';

          for(var a=0; a<data.length;a++){
            content += '<tr>';
            content += '<td>'+data[a].id+'</td>';
            content += '<td>'+data[a].email+'</td>';
            content += '<td>'+data[a].name+'</td>';
            content += '<td>'+data[a].school_name+'</td>';
            content += '<td>'+data[a].right_answer+'</td>';
            content += '<td>'+data[a].wrong_answer+'</td>';
            content += '<td>'+data[a].no_answer+'</td>';
            content += '<td>'+data[a].point+'</td>';
            content += '<td>'+data[a].qualified_final_string+'</td>';
            content += '<td>'+data[a].submit+'</td>';
            var action = '';
            if(data[a].qualified_final == '2'){
              action += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-success" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',4,\'qualified_final\')">Go To Final</button>';
              action += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-danger" onclick="addClassModalView(\'modal-danger\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',1,\'qualified_final\')">Diskualifikasi</button>';
            // }else if(data[a].qualified_final == '3'){
            //   action += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-warning" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',2,\'qualified_final\')">Back To Tahap 1</button>';
            }
            content += '<td>'+action+'</td>';
            content += '</tr>';
          }

          content += '</tbody>';
          content += '<tfoot>';
          content += '<tr>'
          content += '<th>ID</th>';
          content += '<th>Email</th>';
          content += '<th>Nama Team</th>';
          content += '<th>Asal Sekolah</th>';
          content += '<th>Benar</th>';
          content += '<th>Salah</th>';
          content += '<th>Tidak Dijawab</th>';
          content += '<th>Poin</th>';
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

          document.getElementById("cso-table").innerHTML = content;

          $(function () {
            $('#cso-data').DataTable({
              'paging'      : true,
              'lengthChange': true,
              'searching'   : true,
              'ordering'    : false,
              'info'        : true,
              'autoWidth'   : true,
              'stateSave'   : true
            })
          });
        }else{
          showAlert(message,'#alert','danger');
          document.getElementById("cso-table").innerHTML = '';
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