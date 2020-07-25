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
      <h1>MANAGEMENT TEAM</h1>
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
      <div class="login-box-body">
        <form>
          <div class="row">
            <div class="col-xs-3">
              <h4>Filter Register</h4>
              <input type="radio" id="filter-register-data" name="filter-register-data" value="0" checked>ALL<br>
              <input type="radio" id="filter-register-data" name="filter-register-data" value="1"> Belum valid<br>
              <input type="radio" id="filter-register-data" name="filter-register-data" value="2"> Menunggu konfirmasi Anda<br>
              <input type="radio" id="filter-register-data" name="filter-register-data" value="3"> Valid
            </div>
            <div class="col-xs-3">
              <h4>Filter Online / Offline</h4>
              <input type="radio" id="filter-online-offline" name="filter-online-offline" value="0" checked>ALL<br>
              <input type="radio" id="filter-online-offline" name="filter-online-offline" value="1"> Menunggu konfirmasi Anda<br>
              <input type="radio" id="filter-online-offline" name="filter-online-offline" value="2"> Offline<br>
              <input type="radio" id="filter-online-offline" name="filter-online-offline" value="3"> Online
            </div>
            <div class="col-xs-3">
              <h4>Filter Tahap Kompetisi</h4>
              <input type="radio" id="filter-qualified-final" name="filter-qualified-final" value="0" checked>ALL<br>
              <input type="radio" id="filter-qualified-final" name="filter-qualified-final" value="1"> Diskualifikasi<br>
              <input type="radio" id="filter-qualified-final" name="filter-qualified-final" value="2"> Tahap 1<br>
              <input type="radio" id="filter-qualified-final" name="filter-qualified-final" value="3"> Tahap 2<br>
              <input type="radio" id="filter-qualified-final" name="filter-qualified-final" value="4"> Final
            </div>
            <div class="col-xs-3">
              <h4>Filter Bayar</h4>
              <input type="radio" id="filter-bayar" name="filter-bayar" value="0" checked>ALL<br>
              <input type="radio" id="filter-bayar" name="filter-bayar" value="1"> Belum bayar<br>
              <input type="radio" id="filter-bayar" name="filter-bayar" value="2"> Menunggu konfirmasi Anda<br>
              <input type="radio" id="filter-bayar" name="filter-bayar" value="3"> Sudah bayar
            </div>
          </div>
          <br>
          <div class="row">
            <div class="form-group">
              <button type="button" class="btn btn-primary btn-block btn-flat" onclick="fetchTeam()"><i class="glyphicon glyphicon-filter"></i>Filter</button>
            </div>
          </div>
        </form>
      </div>

      <div id="team-table"></div>
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
  document.getElementById("team").classList.add('active');

  fetchTeam();

  function fetchTeam(){
    var filterRegisterData = $('input[name=filter-register-data]:checked').val();
    var filterOnlineOffline = $('input[name=filter-online-offline]:checked').val();
    var filterQualifiedFinal = $('input[name=filter-qualified-final]:checked').val();
    // var filterQualifiedFinal = 0;
    var filterBayar = $('input[name=filter-bayar]:checked').val();

    // console.log('register : '+filterRegisterData+', online offline : '+filterOnlineOffline+', qualified final : '+filterQualifiedFinal+', bayar :'+filterBayar);

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
          var content = '<div class="row">';
          content += '<div class="col-xs-12">';
          content += '<div class="box">';
          content += '<div class="box-header">';
          content += '<h3 class="box-title">Data Team</h3>';
          content += '</div>';
          content +=  '<div class="box-body">';
          content += '<table id="team-data" class="table table-bordered table-striped">';
          content += '<thead>';
          content += '<tr>'
          content += '<th>ID</th>';
          content += '<th>Email</th>';
          content += '<th>Asal Sekolah</th>';
          content += '<th>Nama Tim</th>';
          content += '<th>Kompetisi</th>';
          content += '<th>Member</th>';
          content += '<th>Jumlah Transfer</th>';
          content += '<th>Bukti Pembayaran</th>';
          content += '<th>Status</th>';
          content += '<th>Action</th>';
          content += '</tr>';
          content += '</thead>';
          content += '<tbody>';
          // console.log(data.length);
          for(var a=0; a<data.length;a++){
            var actionButton = '';
            content += '<tr>';
            content += '<td>'+data[a].id+'</td>';
            content += '<td>'+data[a].email+'</td>';
            content += '<td>'+data[a].school_name+'</td>';
            content += '<td>'+data[a].name+'</td>';
            content += '<td>'+data[a].competition.name+'</td>';
            content += '<td><button id = "member-data-'+a+'" class = "btn btn-success" onclick = "addClassModalView(\'modal-success\',\'modal-view\'); onClickMember('+a+', \''+data[a].name+'\')" data-toggle = "modal" data-target = "#modal-view">Lihat</button></td>';

            content += "<input type = 'hidden' id = 'input-member-data-"+a+"' value = '"+JSON.stringify(data[a].member)+"'/>";
            content += "<input type = 'hidden' id = 'input-bukti-pembayaran-data-"+a+"' value = '"+JSON.stringify(data[a].bukti_pembayaran)+"'/>";

            content += '<td>'+data[a].competition_team[0].price_to_compete+'</td>';
            content += '<td><button id = "bukti-pembayaran-data-'+a+'" class = "btn btn-success" onclick = "addClassModalView(\'modal-success\',\'modal-view\'); onClickBukti('+a+', \''+data[a].name+'\')" data-toggle = "modal" data-target = "#modal-view">Lihat</button></td>';
            content += '<td><ul><li>'+data[a].valid_bayar_string+'</li><br><li>'+data[a].valid_register_data_string+'</li><br><li>'+data[a].valid_on_off_string+'</li><br><li>'+data[a].qualified_final_string+'</li></ul></td>';
            // content += '<td>'+data[a].valid_bayar_string+'<hr>'+data[a].valid_register_data_string+'<hr>'+data[a].valid_on_off_string+'</td>';

            if(data[a].valid_bayar == 2){
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-success" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',3,\'bayar\')">Approve Bayar</button>';
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-danger" onclick="addClassModalView(\'modal-danger\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',1,\'bayar\')">Reject Bayar</button><br><br>';
            }

            if(data[a].valid_register_data == 2){
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-success" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',3,\'register\')">Approve Registrasi</button>';
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-danger" onclick="addClassModalView(\'modal-danger\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',1,\'register\')">Reject Registrasi</button><hr>';
            }else if(data[a].valid_register_data == 1){
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-danger" onclick="addClassModalView(\'modal-danger\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',1,\'register\')">Reject Registrasi</button><hr>';
            }

            if(data[a].valid_on_off == 1){
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-primary" onclick="addClassModalView(\'modal-primary\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',3,\'on_off\')">Online</button>';
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-warning" onclick="addClassModalView(\'modal-warning\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',2,\'on_off\')">Offline</button><hr>';
            }else if(data[a].valid_on_off == 2){
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-primary" onclick="addClassModalView(\'modal-primary\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',3,\'on_off\')">Online</button><br><br>';
            }else if(data[a].valid_on_off == 3){
              actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-warning" onclick="addClassModalView(\'modal-warning\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',2,\'on_off\')">Offline</button>';
            }

            // if(data[a].qualified_final == 2 || data[a].qualified_final == 3){
            //   if(data[a].qualified_final == 2 && data[a].competition.id == 2){
            //       actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-success" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',3,\'qualified_final\')">Go To Tahap 2</button>';
            //   }else{
            //     actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-success" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',4,\'qualified_final\')">Go To Final</button>';
            //   }
            //   actionButton += '<button data-toggle = "modal" data-target = "#modal-view-custom-update-team" class="btn btn-danger" onclick="addClassModalView(\'modal-danger\',\'modal-view-custom-update-team\'); prepareUpdateStatusTeam('+data[a].id+',1,\'qualified_final\')">Diskualifikasi</button>';
            // }

            content += '<td>'+actionButton+'</td>';
            content += '</tr>';
          }
          content += '</tbody>';
          content += '<tfoot>';
          content += '<tr>'
          content += '<th>ID</th>';
          content += '<th>Email</th>';
          content += '<th>Asal Sekolah</th>';
          content += '<th>Nama Tim</th>';
          content += '<th>Kompetisi</th>';
          content += '<th>Member</th>';
          content += '<th>Jumlah Transfer</th>';
          content += '<th>Bukti Pembayaran</th>';
          content += '<th>Status</th>';
          content += '<th>Action</th>';
          content += '</tr>';
          content += '</tfoot>';
          content += '</table>';
          content += '</div>';
          content += '</div>';
          content += '</div>';
          content += '</div>';

          document.getElementById("team-table").innerHTML = content;

          $(function () {
            $('#team-data').DataTable({
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
          document.getElementById("team-table").innerHTML = '';
        }
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }

  function onClickMember(index, nameTeam){
    var memberData = $('#input-member-data-'+index).val();
    var parseMember = JSON.parse(memberData);
    document.getElementById("title-modal").innerHTML = 'List Member '+nameTeam;

    var contentModal = '';
    for(var a=0; a<parseMember.length;a++){
      contentModal += 'ID     :     '+parseMember[a].id+'<br>';
      contentModal += 'Nama Lengkap     :     '+parseMember[a].full_name+'<br>';
      contentModal += 'Handphone    :     '+parseMember[a].handphone+'<br>';
      contentModal += 'Line     :     '+parseMember[a].line+'<br>';
      contentModal += 'Kartu Pelajar     :    <br><img src = "'+parseMember[a].image_student_card+'" width = "50%"/><br>';
      contentModal += 'Gender     :     '+parseMember[a].gender+'<br>';
      var icon = '<i class="glyphicon glyphicon-remove-sign"></i>';
      if(parseMember[a].ketua_tim == 1){
        icon = '<i class="glyphicon glyphicon-ok-sign"></i>';
      }
      contentModal += 'Ketua Tim    :     '+icon+'<hr>';
    }

    if(parseMember.length == 0){
      contentModal = 'Belum ada member';
    }

    document.getElementById("content-modal").innerHTML = contentModal;  
  }

  function onClickBukti(index, nameTeam){
    var buktiData = $('#input-bukti-pembayaran-data-'+index).val();
    var parseBukti = JSON.parse(buktiData);
    document.getElementById("title-modal").innerHTML = 'Bukti Pembayaran '+nameTeam;

    var contentModal = '<center>';
    for(var a=0; a<parseBukti.length;a++){
      contentModal += '<img src = "'+parseBukti[a].image+'"/> <br>';
      contentModal += parseBukti[a].note+'<hr>';
    }
    contentModal += '</center>';

    if(parseBukti.length == 0){
      contentModal = 'Belum ada bukti';
    }

    document.getElementById("content-modal").innerHTML = contentModal;
  }

  function prepareUpdateStatusTeam(teamId, flag, status){
    var content = 'Anda yakin akan melakukan hal ini ?';
    content += "<input type = 'hidden' id = 'request-update-status-team'/>";
    if(status == 'register' && flag == 1){
      content += '<hr><input type = "text" class = "form-control" placeholder = "Enter your note ..." id="note" onchange="changeNote()"></input>';
      content += '<br><input type = "checkbox" id="delete-team" value = "1">&nbsp; Delete Team</input>';
      content += '<hr>Apabila Anda ingin menghapus data team karena dianggap spam atau data yang diisi merupakan data abal-abal, Anda dapat mencentang check box Delete Team diatas';
    }
    document.getElementById("content-modal-custom-update-team").innerHTML = content;

    var requestData = {};
    requestData.token = token;
    var objData = {};
    objData.team_id = teamId;
    objData.note = '';

    if(status == 'register'){
      requestData.route = 'updateRegisterStatusTeam';
      objData.status_update = flag;
      document.getElementById("title-modal-custom-update-team").innerHTML = 'Update Status Register';
    }else if(status == 'qualified_final'){
      requestData.route = 'updateStatusQualifiedFinalTeam';
      objData.status_update = flag;
      document.getElementById("title-modal-custom-update-team").innerHTML = 'Update Status Qualified Final';
    }else if(status == 'on_off'){
      requestData.route = 'updateStatusOnOffTeam';
      objData.status_update = flag;
      document.getElementById("title-modal-custom-update-team").innerHTML = 'Update Status Offline-Online';
    }else{//bayar
      requestData.route = 'updateStatusBayarTeamByAdmin';
      objData.status_update = flag;
      document.getElementById("title-modal-custom-update-team").innerHTML = 'Update Status Bayar';
    }

    requestData.data = objData;
    $('#request-update-status-team').val(JSON.stringify(requestData));
  }

  function updateStatusTeam(){
    var getRequest = $('#request-update-status-team').val();
    var parseRequest = JSON.parse(getRequest);
    var routing = parseRequest.route;
    var deleteAccount = 0;
    if($('#delete-team:checked').val() == 1){
      deleteAccount = 1;
    }

    if(parseRequest.route == 'updateRegisterStatusTeam' && parseRequest.data.note == '' && parseRequest.data.status_update == 1){
      showAlert('Keterangan reject data harus diisi','#alert','warning');
    }else{
      setLoader();
      APIManager[routing](token, parseRequest.data.team_id, parseRequest.data.status_update,parseRequest.data.note, deleteAccount)
        .then(function (response) {
          hideLoader();

          var statusCode = response.status_code;
          var message = response.message;
          checkStatusCode(statusCode);
          if (statusCode == 1) {
            showAlert(message,'#alert','success');
            fetchTeam();
          }else{
            showAlert(message,'#alert','danger');
          }
        })
        .catch(function (error) {
          checkStatusCode(500);
        });
    }
  }

  function changeNote(){
    var getValue = $('#request-update-status-team').val();
    var parseValue = JSON.parse(getValue);
    parseValue.data.note = $('#note').val();
    $('#request-update-status-team').val(JSON.stringify(parseValue));
    // console.log($('#request-update-status-team').val());
  }
</script>
</body>
</html>