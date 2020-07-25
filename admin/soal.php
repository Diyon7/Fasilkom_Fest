<?php
include "config.php";
// include('_include/script.php');
?>

<!DOCTYPE html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Admin FF 2019</title>
  <link href="<?= base_url() ?>/css/sb-admin-2.min.css" rel="stylesheet">
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="bower_components/Ionicons/css/ionicons.min.css">
  <link rel="stylesheet" href="bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
  <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
  <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">
  <link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <link href="custom/css/loader.css" rel="stylesheet">

  <link href="<?= base_url() ?>/css/dataTables.bootstrap4.min.css" rel="stylesheet">
</head>


<body class="hold-transition skin-green sidebar-mini">

  <div id='loading-screen'></div>

  <div class="wrapper">
    <?php
    include('_include/headerNav.php');
    include('_include/sideBarMenu.php');
    ?>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>DASHBOARD</h1>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <h1 class="h3 mb-2 text-gray-800">Tabel Mahasiswa</h1>
          <p class="mb-4">Tabel ini berisi data sample, disini anda dapat menambah data, mengedit dan mendelete data dengan fungsi paling mudah.</p>

          <!-- DataTales Example -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Data Input</h6>
            </div>
            <div class="card-body">
              <form action="" method="post">
                <div class="form-row">
                  <div class="col">
                    <input type="text" name="npm" class="form-control" placeholder="Masukkan NPM" required>
                  </div>
                  <div class="col">
                    <input type="text" name="nama" class="form-control" placeholder="Masukkan Nama" required>
                  </div>
                  <div class="col">
                    <input type="text" name="fakultas" class="form-control" placeholder="Masukkan Fakultas" required>
                  </div>
                  <div class="col">
                    <input type="text" name="jurusan" class="form-control" placeholder="Masukkan Jurusan" required>
                  </div>
                </div>
                <br>
                <input type="submit" name="add" class="btn btn-primary" value="Add Data">
              </form>
            </div>
          </div>

          <!-- DataTales Example -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Npm</th>
                      <th>Nama</th>
                      <th>Fakultas</th>
                      <th>Jurusan</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>No</th>
                      <th>Npm</th>
                      <th>Nama</th>
                      <th>Fakultas</th>
                      <th>Jurusan</th>
                      <th class="text-center"><a href="<?= base_url() ?>/_auth/deleteall.php" class="btn btn-danger">Delete All Data</a></th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <?php
                    $no = 1;
                    $sql_mhs = mysqli_query($con, "SELECT * FROM mahasiswa") or die(mysqli_error($con, ""));
                    if (mysqli_num_rows($sql_mhs) > 0) {
                      while ($data = mysqli_fetch_array($sql_mhs)) { ?>
                        <tr>
                          <td><?= $no++ ?></td>
                          <td><?= $data['Npm'] ?></td>
                          <td><?= $data['Nama'] ?></td>
                          <td><?= $data['Fakultas'] ?></td>
                          <td><?= $data['Jurusan'] ?></td>
                          <td class="text-center">
                            <a href="<?= base_url() ?>/show.php?npm=<?= $data['Npm'] ?>" class="btn btn-success">Show</a>
                            <a href="<?= base_url() ?>/edit.php?npm=<?= $data['Npm'] ?>" class="btn btn-warning">Edit</a>
                            <a href="<?= base_url() ?>/_auth/delete.php?npm=<?= $data['Npm'] ?>" class="btn btn-danger">Delete</a>
                          </td>
                        </tr>
                    <?php };
                    } ?>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
        <!-- /.container-fluid -->
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
    document.getElementById("dashboard").classList.add('active');
  </script>
</body>

</html>