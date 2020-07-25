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
      <h1>MANAGEMENT CSO - QUIZ AND ANSWER</h1>
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
        <div class="col-xs-3">
          <button class="btn btn-success" data-toggle = "modal" data-target = "#modal-view-custom-upload-csv" onclick="addClassModalView('modal-warning','modal-view-custom-upload-csv');prepareUploadCSV();"><i class="fa fa-cloud-upload"></i>&nbsp; Upload CSV</button>
        </div>
        <div class="col-xs-3">
          <button class="btn btn-success" onclick="syncAnswer()"><i class="fa fa-recycle"></i>&nbsp; Sync Answer Team</button>
        </div>
        <div id="start-stop-competition"></div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <font style="color: red;">*Jika ingin menambah quiz baru harus upload ulang CSV (Image yang sudah di set akan terhapus dan harus di update pada button yang sudah disediakan), upload CSV berdasar separator titik koma (;). Tombol upload CSV hanya disediakan sampai H-1 pelaksanaan lomba CSO</font>
        </div>
      </div>

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

  function uploadCSV(){
    var nameFile = $('#csv').val();
    if(nameFile == ''){
      alert('File belum diupload');
    }else{
      var arrQuiz = $('#content-json-csv').val();
      setLoader();
      APIManager.uploadCSVQuiz(token, arrQuiz)
        .then(function (response) {
          hideLoader();

          var statusCode = response.status_code;
          var message = response.message;
          checkStatusCode(statusCode);
          if(statusCode == 1){
            fetchData();
          }
          showAlert(message,'#alert','info');
        })
        .catch(function (error) {
          checkStatusCode(500);
        });
    }
  }

  function prepareUploadCSV(){
    document.getElementById("title-modal-custom-upload-csv").innerHTML = 'Upload CSV';
    var content = 'Aturan Upload CSV :';
    content += '<br>1. Menggunakan separator titik koma, caranya ada <b><a href="https://www.google.co.id/search?q=setting+separator+on+csv&rlz=1C1CHZL_idID719ID719&oq=setting+separator+on+csv&aqs=chrome..69i57.6354j0j7&sourceid=chrome&ie=UTF-8" target="blink">disini</a></b>';
    content += '<br>2. Menggunakan format penulisan file seperti <b><a href="custom/file/format_quiz_cso_ff_2018.csv" target="blink">ini</a></b>';

    content += '<div class="form-group">';
    content += '<input id="content-json-csv" type="hidden" />';
    content += '<input id="csv" type="file" class="file file-loading" accept=".csv" data-allowed-file-extensions="[\'csv\']" data-show-upload="true">';
    content += '</div>';
    document.getElementById("content-modal-custom-upload-csv").innerHTML = content;
    document.getElementById('csv').addEventListener('change', validateCSV, false);
  }

  function syncAnswer(){
    setLoader();
    APIManager.syncAnswerTeam(token)
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

  function updateQuiz(){
    var id = $('#id').val();
    var image = $('#image-preview').attr('src');
    var question = $('#question').val();
    var multiple_choice_1 = $('#multiple_choice_1').val();
    var multiple_choice_2 = $('#multiple_choice_2').val();
    var multiple_choice_3 = $('#multiple_choice_3').val();
    var multiple_choice_4 = $('#multiple_choice_4').val();
    var multiple_choice_5 = $('#multiple_choice_5').val();
    var answer_key = $('input[name=answer_key]:checked').val();

    if(image.length > 0){
      if(image[0] == 'd' && image[1] == 'a' && image[2] == 't' && image[3] == 'a'){

      }else{
        image = '-';
      }
    }

    setLoader();
    APIManager.updateQuiz(token, id, image, question, multiple_choice_1, multiple_choice_2, multiple_choice_3, multiple_choice_4, multiple_choice_5, answer_key)
      .then(function (response) {
        hideLoader();

        var statusCode = response.status_code;
        var message = response.message;
        checkStatusCode(statusCode);
        if(statusCode == 1){
          fetchData();
        }
        alert(message,'#alert','info');
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }

  function prepareUpdateQuiz(id){
    document.getElementById("title-modal-custom-update-quiz").innerHTML = 'Update Quiz';
    APIManager.fetchQuizOne(token, id)
      .then(function (response) {

        var statusCode = response.status_code;
        var message = response.message;
        checkStatusCode(statusCode);
        if(statusCode == 1){
          var data = response.data;
          var content = '<input type="hidden" id="id" value="'+data.id+'"/>';
          content += '<div class="form-group">';
          content += '<label>Pertanyaan : </label>';
          content +=  "<input type = 'text' class = 'form-control' id = 'question' placeholder = 'Masukkan pertanyaan...' value ='"+data.question+"' /><hr>";
          content += '</div>';

          content += '<div class="form-group">';
          content += '<label>Pilihan 1 : </label>';
          content +=  "<input type = 'text' class = 'form-control' id = 'multiple_choice_1' placeholder = 'Masukkan pilihan...' value ='"+data.multiple_choice_1+"' readonly /><hr>";
          content += '</div>';

          content += '<div class="form-group">';
          content += '<label>Pilihan 2 :</label>';
          content +=  "<input type = 'text' class = 'form-control' id = 'multiple_choice_2' placeholder = 'Masukkan pilihan...' value ='"+data.multiple_choice_2+"' readonly /><hr>";
          content += '</div>';

          content += '<div class="form-group">';
          content += '<label>Pilihan 3 : </label>';
          content +=  "<input type = 'text' class = 'form-control' id = 'multiple_choice_3' placeholder = 'Masukkan pilihan...' value ='"+data.multiple_choice_3+"' readonly /><hr>";
          content += '</div>';

          content += '<div class="form-group">';
          content += '<label>Pilihan 4 :</label>';
          content +=  "<input type = 'text' class = 'form-control' id = 'multiple_choice_4' placeholder = 'Masukkan pilihan...' value ='"+data.multiple_choice_4+"' readonly /><hr>";
          content += '</div>';

          content += '<div class="form-group">';
          content += '<label>Pilihan 5 :</label>';
          content +=  "<input type = 'text' class = 'form-control' id = 'multiple_choice_5' placeholder = 'Masukkan pilihan...' value ='"+data.multiple_choice_5+"' readonly /><hr>";
          content += '</div>';

          content += '<div class="form-group">';
          content += '<label>Answer :</label><br>';
          if(data.answer_key == data.multiple_choice_1){
            content += '<input type="radio" id="answer_key" name="answer_key" value="A" checked>Pilihan 1 &nbsp;&nbsp;&nbsp;&nbsp;';
          }else{
            content += '<input type="radio" id="answer_key" name="answer_key" value="A">Pilihan 1 &nbsp;&nbsp;&nbsp;&nbsp;';
          }
          if(data.answer_key == data.multiple_choice_2){
            content += '<input type="radio" id="answer_key" name="answer_key" value="B" checked> Pilihan 2 &nbsp;&nbsp;&nbsp;&nbsp;';
          }else{
            content += '<input type="radio" id="answer_key" name="answer_key" value="B"> Pilihan 2 &nbsp;&nbsp;&nbsp;&nbsp;';
          }
          if(data.answer_key == data.multiple_choice_3){
            content += '<input type="radio" id="answer_key" name="answer_key" value="C" checked> Pilihan 3 &nbsp;&nbsp;&nbsp;&nbsp;';
          }else{
            content += '<input type="radio" id="answer_key" name="answer_key" value="C"> Pilihan 3 &nbsp;&nbsp;&nbsp;&nbsp;';
          }
          if(data.answer_key == data.multiple_choice_4){
            content += '<input type="radio" id="answer_key" name="answer_key" value="D" checked> Pilihan 4 &nbsp;&nbsp;&nbsp;&nbsp;';
          }else{
            content += '<input type="radio" id="answer_key" name="answer_key" value="D"> Pilihan 4 &nbsp;&nbsp;&nbsp;&nbsp;';
          }
          if(data.answer_key == data.multiple_choice_5){
            content += '<input type="radio" id="answer_key" name="answer_key" value="E" checked> Pilihan 5';
          }else{
            content += '<input type="radio" id="answer_key" name="answer_key" value="E"> Pilihan 5';
          }
          content += '</div>';

          content += '<div class="form-group">';
          content += '<label>Image (optional)</label>';
          content += '<br><img src="'+data.image+'" style="max-width: 200px; max-height: 200px;" id="image-preview" class="file-field input-field" accept="image/*">';
          content += '<input id="image" type="file" class="file file-loading" accept="image/jpeg" onchange="showImage.call(this)" data-allowed-file-extensions="[\'jpg\', \'jpeg\']" data-show-upload="true">';
          content += '</div>';

          document.getElementById("content-modal-custom-update-quiz").innerHTML = content;
        }else{
          document.getElementById("content-modal-custom-update-quiz").innerHTML = message;
        }
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }

  function updateStartCso(flag){
    setLoader();
    APIManager.startStopCompetition(token, flag, 5)
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
    APIManager.fetchQuiz(token)
      .then(function (response) {
        hideLoader();

        var statusCode = response.status_code;
        var message = response.message;
        var data = response.data;
        checkStatusCode(statusCode);
        var startStop = '<div class="col-xs-3">';
        if(response.status == 1){
          //start
          startStop += '<button class="btn btn-success" onclick="updateStartCso(2)"><i class="fa fa-play"></i>&nbsp; Start Competition</button>';
        }else{
          //stop
          startStop += '<button class="btn btn-danger" onclick="updateStartCso(1)"><i class="fa fa-stop"></i>&nbsp; Stop Competition</button>';
        }
        startStop += '</div>';
        document.getElementById("start-stop-competition").innerHTML = startStop;
        
        if (statusCode == 1) {
          // hideAlert('#alert');
          var content = '<div class="row">';
          content += '<div class="col-xs-12">';
          content += '<div class="box">';
          content += '<div class="box-header">';
          content += '<h3 class="box-title">Data Quiz</h3>';
          content += '</div>';
          content +=  '<div class="box-body">';
          content += '<table id="cso-data" class="table table-bordered table-striped">';
          content += '<thead>';
          content += '<tr>'
          content += '<th>ID</th>';
          content += '<th>Question</th>';
          content += '<th>Image</th>';
          content += '<th>Choice 1</th>';
          content += '<th>Choice 2</th>';
          content += '<th>Choice 3</th>';
          content += '<th>Choice 4</th>';
          content += '<th>Choice 5</th>';
          content += '<th>Answer</th>';
          content += '<th>Action</th>';
          content += '</tr>';
          content += '</thead>';
          content += '<tbody>';

          for(var a=0; a<data.length;a++){
            content += '<tr>';
            content += '<td>'+data[a].id+'</td>';
            content += '<td>'+data[a].question+'</td>';
            content += '<td><img src="'+data[a].image+'" style="max-width: 200px; max-height: 200px;"/></td>';
            content += '<td>'+data[a].multiple_choice_1+'</td>';
            content += '<td>'+data[a].multiple_choice_2+'</td>';
            content += '<td>'+data[a].multiple_choice_3+'</td>';
            content += '<td>'+data[a].multiple_choice_4+'</td>';
            content += '<td>'+data[a].multiple_choice_5+'</td>';
            content += '<td>'+data[a].answer_key+'</td>';
            content += '<td><button data-toggle = "modal" data-target = "#modal-view-custom-update-quiz" class="btn btn-success" onclick="addClassModalView(\'modal-success\',\'modal-view-custom-update-quiz\');prepareUpdateQuiz('+data[a].id+');"><i class="fa fa-pencil"></i>&nbsp; Update</button></td>';
            content += '</tr>';
          }

          content += '</tbody>';
          content += '<tfoot>';
          content += '<tr>'
          content += '<th>ID</th>';
          content += '<th>Question</th>';
          content += '<th>Image</th>';
          content += '<th>Choice 1</th>';
          content += '<th>Choice 2</th>';
          content += '<th>Choice 3</th>';
          content += '<th>Choice 4</th>';
          content += '<th>Choice 5</th>';
          content += '<th>Answer</th>';
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
              'ordering'    : true,
              'info'        : true,
              'autoWidth'   : true,
              'stateSave'   : true
            })
          });

          if(data.length != 120){
            showAlert('Do not forget to make 120 questions. Now there are '+data.length+' questions','#alert','warning');
          }
        }else{
          showAlert(message,'#alert','danger');
          document.getElementById("cso-table").innerHTML = '';
        }
      })
      .catch(function (error) {
        checkStatusCode(500);
      });
  }

  function validateCSV(evt){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var nameFile = $('#csv').val();
      if(nameFile[nameFile.length - 3] == 'c' && nameFile[nameFile.length - 2] == 's' && nameFile[nameFile.length - 1] == 'v'){
        var files = evt.target.files; // FileList object
        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(files[0]);
        reader.onload = loadHandler;
        reader.onerror = errorHandler;
      }else{
        alert('File tidak sesuai format');
      }
    } else {
      alert('FileReader are not supported in this browser.');
    }
  }

  function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
  }

  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      alert("Cannot read file !");
    }
  }

  function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    if(allTextLines.length != 120){
      alert("Banyak row harus 120, row di dalam excel ini hanya "+allTextLines.length+" row.");
    }else{
      //validation column
      var validColumn = true;
      var err = '';
      for (var i=0; i < allTextLines.length; i++) {
        if(validColumn){
          var data = allTextLines[i].split(';');
          if(data.length != 7){
            validColumn = false;
            err += 'Row '+(i+1)+' hanya mempunyai '+data.length+' kolom \n';
          }
        }

        if(validColumn){
          if(data[6] != 'A' && data[6] != 'B' && data[6] != 'C' && data[6] != 'D' && data[6] != 'E'){
            validColumn = false;
            err += 'Row '+(i+1)+' mempunyai jawaban tidak valid \n';
          }
        }

        if(validColumn){
          for (var j=1; j < 5; j++) {
            for (var k=j+1; k <= 5; k++) {
              if(validColumn){
                if(data[j] == data[k]){
                  validColumn = false;
                  err += 'Row '+(i+1)+' column '+(j+1)+' dan column '+(k+1)+' mempunyai jawaban sama \n';
                }
              }
            }
          }
        }
      }
      if(!validColumn){
        alert(err);
      }else{
        var lines = [];
        for (var i=0; i < allTextLines.length; i++) {
          var data = allTextLines[i].split(';');
          var tarr = {};
          tarr.question = data[0];
          tarr.multiple_choice_1 = data[1];
          tarr.multiple_choice_2 = data[2];
          tarr.multiple_choice_3 = data[3];
          tarr.multiple_choice_4 = data[4];
          tarr.multiple_choice_5 = data[5];
          tarr.answer_key = data[6];
          lines.push(tarr);
        }
        $("#content-json-csv").val(JSON.stringify(lines));
      }
    }
  }
</script>
</body>
</html>