<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <?php
        include('_include/sideBarProfile.php');
      ?>
      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">Management Menu</li>
        <!-- Optionally, you can add icons to the links -->
        <li id="dashboard"><a href="dashboard.php"><i class="glyphicon glyphicon-home"></i> <span>Dashboard</span></a></li>
        <li id="team"><a href="team.php"><i class="glyphicon glyphicon-user"></i> <span>Team</span></a></li>
        <li id="mailer"><a href="mailer.php"><i class="glyphicon glyphicon-inbox"></i> <span>Mailer</span></a></li>
        <li id="competition" class="treeview">
          <a href="#"><i class="glyphicon glyphicon-flag"></i> <span>Competition</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li class="treeview">
              <a href="#"><i class="glyphicon glyphicon-console"></i><span>Webcon</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li><a href="webcon_stage_1">Tahap 1</a></li>
                <li><a href="webcon_stage_2">Tahap 2</a></li>
              </ul>
            </li>

            <li class="treeview">
              <a href="#"><i class="glyphicon glyphicon-console"></i><span>CSO</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <!-- <ul class="treeview-menu">
                <li class="treeview">
                  <a href="#"><span>Tahap 1</span>
                    <span class="pull-right-container">
                      <i class="fa fa-angle-left pull-right"></i>
                    </span>
                  </a> -->
                  <ul class="treeview-menu">
                    <li><a href="cso_quiz_and_answer.php">Soal &amp; Kunci Jawaban</a></li>
                    <li><a href="cso_point_team.php">Point Team</a></li>
                    <li><a href="cso_setting_point.php">Pengaturan Point</a></li>
                  </ul>
                <!-- </li>
              </ul> -->
            </li>
          </ul>
        </li>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>