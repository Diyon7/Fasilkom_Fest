<?php
  if(isset($_COOKIE['admin'])){
    header('Location: dashboard.php');
  }else{
    header('Location: login.php');
  }
?>