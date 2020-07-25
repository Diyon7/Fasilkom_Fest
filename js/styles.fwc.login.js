$(document).ready(function(){
  redirectChecking(true);

  var input = document.getElementById("validate-robot-answer");
  input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("ff-oke-robot").click();
    }
  });

  var n1, n2, op, answer;
  var themeColor = "#ff5722";
  var themeColorClass = "deep-orange";
  var themePrimaryClass = "brown"

  // Framework option //
  $('.modal').modal();

  // Style option //
  $('html').attr('style','--rico-theme: '+themeColor);
  $('#footer-love').addClass(themeColorClass+'-text');

  $('#login-robot').click(function(){
    // Get value of question //
    var value = validateRobot();
    n1 = value[0];
    n2 = value[1];
    op = value[2];
    answer = value[3];
    // Set to display //
    $('#validate-robot-question').val(n1+" "+op+" "+n2);
  });

  $('#login-robot-check').click(function(){
    // Get value of question //
    var value = validateRobot();
    n1 = value[0];
    n2 = value[1];
    op = value[2];
    answer = value[3];
    // Set to display //
    $('#validate-robot-question').val(n1+" "+op+" "+n2);
  });

  // Reload robot question //
  $('.reload-robot-question').click(function(){
    // Get value of question //
    var value = validateRobot();
    n1 = value[0];
    n2 = value[1];
    op = value[2];
    answer = value[3];
    // Set to display //
    $('#validate-robot-question').val(n1+" "+op+" "+n2);
  });

  // Action after oke button clicked //
  $('.submit-validate-robot').click(function(){
    // Get user answer //
    var userAnswer = $('#validate-robot-answer').val();
    // Checking answer //
    if(userAnswer == answer){
      $('#login-robot-check').prop('checked', true);
      $('#login-robot').removeClass('modal-trigger');
      $('#login-robot-check').removeClass('modal-trigger');
    }
    else if(userAnswer != answer){
      $('#login-robot-check').prop('checked', false);
      $('#validate-robot-answer').val('');
      M.toast({
        html: "Jawaban anda salah, silahkan coba lagi",
        displayLength: 2000
      });
    }
  });

  // Validate input //
  $('.loginFormSubmit').click(function(){
    // Checking //
    if(inputCheck("#login-email") && inputCheck("#login-password") && checkboxCheck("#login-robot-check")){
      // validate success //
      var email = $('#login-email').val();
      var password = $('#login-password').val();
      loginAPI(email, password);
    }
    else{
      M.toast({
        html: "Silahkan lengkapi semua data",
        displayLength: 2000
      });
    }
  });
});

// Validate //
function validateRobot(){
  var n1 = randomNumber();
  var n2 = randomNumber();
  var op = randomOperation();
  var hasil = 0;
  if(op=="+"){
    hasil = n1 + n2;
  }
  else if(op=="-"){
    hasil = n1 - n2;
  }
  else if(op=="x"){
    hasil = n1 * n2;
  }
  return [n1, n2, op, hasil];
}

// Mathematic operation //
function randomOperation(){
  var possible = " +-x";
  var hasil = possible.charAt(Math.floor(Math.random() * 3) + 1);
  if(hasil == "" || hasil == " "){
    hasil = "+";
  }
  return hasil;
}

function randomNumber(){
  var hasil = Math.floor(Math.random() * 10) + 1;
  return hasil;
}

// Input text check //
function inputCheck(value){
  if($(value).hasClass('valid')){
    return true;
  }
  else{
    return false;
  }
}

// Input checkbox check //
function checkboxCheck(value){
  if($(value).prop('checked')){
    return true;
  }
  else{
    return false;
  }
}
