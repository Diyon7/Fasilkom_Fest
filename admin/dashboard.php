<?php
include('_include/head.php');
// include('_include/script.php');
?>

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

        <!--------------------------
        | Your Page Content Here |
        -------------------------->
        <?php
        include('_include/modalView.php');
        ?>

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