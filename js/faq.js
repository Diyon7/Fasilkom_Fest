function faqFWC(){
  var ask = [];
  var ans = [];
  // Pertanyaan
  ask[0] = "Apakah dalam 1 tim harus terdiri dari 2 orang ?";
  ans[0] = "Tidak. 1 tim bisa terdiri dari 1 sampai 2 orang dengan syarat berasal dari sekolah yang sama.";
  ask[1] = "Bagaimana cara mendaftar FWC ?";
  ans[1] = "Pendaftaran dapat dilakukan secara online melalui web FWC, dan dapat dilakukan secara offline langsung ke Fakultas Ilmu Komputer UPN 'Veteran' Jawa Timur. Info lebih lanjut dapat menghubungi Contact dibawah laman ini.";
  ask[2] = "Apa perbedaan 'Daftar sebagai Individu' dan 'Daftar sebagai Tim' pada laman registarsi FWC ?";
  ans[2] = "'Daftar sebagai Individu' untuk tim yang hanya terdiri dari 1 orang. Sedangkan 'Daftar sebagai Tim' untuk tim yang terdiri dari 2 orang, dan input anggota dapat dilakukan di laman Dashboard FWC.";
  ask[3] = "Apakah saya bisa menambah tim saat saya terlanjur memilih opsi 'Daftar sebagai Individu' ?"
  ans[3] = "Tidak bisa.";

  $("#faq-content").html(faqHTMLMaker(ask, ans));
}

function faqCSO(){
  var ask = [];
  var ans = [];
  // Pertanyaan
  ask[0] = "Apakah dalam 1 tim harus terdiri dari 3 orang ?";
  ans[0] = "Tidak. 1 tim bisa terdiri dari 2 sampai 3 orang dengan syarat berasal dari sekolah yang sama.";
  ask[1] = "Berdasarkan apakah penentuan kategori lomba ( online / offline ) ?";
  ans[1] = "Penentuan lokasi lomba didasarkan kepada region, dan kuota tempat. Region yang mendapat kategori offline adalah region Surabaya dan Sidoarjo. Diluar region tersebut kemungkinan besar adalah online";
  ask[2] = "Apakah ada perbedaan penentuan lolos antara online dan offline ?"
  ans[2] = "Ada. Tim offline akan diambil 10 tim terbaik untuk maju ke babak final, sedangkan untuk online akan diambil 5 tim terbaik untuk maju ke babak final.";
  ask[3] = "Apakah tetap diperbolehkan mendaftar 2 lomba sekaligus ?";
  ans[3] = "Tidak. Tetapi secara sistem hal tersebut masih bisa dilakukan. Namun apabila keduanya lolos maka salah satu dari lomba tersebut akan didiskualifikasi.";
  ask[4] = "Bagaimana jika terjadi kesalahan teknis dalam babak penyisihan online ?";
  ans[4] = "Apabila keslahan teknis berasal dari peserta, panitia tidak akan bertanggung jawab. Apabila kesalahan teknis berasal dari sistem, maka panitia akan memberikan dispensasi berupa penambahan waktu.";



  $("#faq-content").html(faqHTMLMaker(ask, ans));
}

function faqFPC(){
  var ask = [];
  var ans = [];
  // Pertanyaan
  ask[0] = "Bagaimana cara mendaftar lomba FPC ?";
  ans[0] = "Pendaftaran dapat dilakukan secara offline dengan mendaftar melalui sekertariat BEM Fasilkom, ataupun melalui narahubung yang tersedia";
  ask[1] = "Apakah peserta diperbolehkan dari luar mahasiswa fasilkom UPN ?";
  ans[1] = "Boleh. 1 tim bisa terdiri dari 1 sampai 2 orang dengan syarat berasal dari UPN 'Veteran' Jatim.";
  ask[2] = "Apa saja syarat dan ketentuan FPC ?"
  ans[2] = "Anda dapat mendownload guidebook dari FPC untuk mengetahui lebih lanjut syarat dan ketentuan perlombaan.";
  ask[3] = "Bahasa pemrograman apa yang digunakan dalam perlombaan FPC ?";
  ans[3] = "Ada beberapa bahasa pemrograman yang dapat digunakan. Untuk lebih lanjut silahkan download guidebook yang telah disediakan.";


  $("#faq-content").html(faqHTMLMaker(ask, ans));
}

function faqFSC(){
  var ask = [];
  var ans = [];
  // Pertanyaan
  ask[0] = "Apakah setiap jurusan di fasilkom wajib mengikuti FSC ?";
  ans[0] = "Iya. setiap jurusan per angkatan ( 15 - 18 ) wajib mengirimkan wakilnya untuk mengikuti FSC sesuai ketentuan cabang lomba.";
  ask[1] = "Apa ada syarat dan ketentuan yang harus dipenuhi dalam mengikuti salah satu cabang FSC ?";
  ans[1] = "Tentu ada. Untuk mengetahui lebih lanjut mengenai syarat dan ketentuan masing-masing cabang lomba, silahkan download guidebook yang telah disediakan.";
  ask[2] = "Apakah ada batasan minimal dan maksimal tim setiap jurusan dan angkatan ?"
  ans[2] = "Ada. Setiap lomba memiliki kuota minimum dan maksimum yang berbeda, untuk lebih jelasnya silahkan download guidebook yang telah disediakan.";
  ask[3] = "Apakah panitia bertanggung jawab terhadap pemain yang cidera berat ?";
  ans[3] = "Panitia hanya sebatas merawat cidera ringan, untuk cidera berat ada kontrak dan perjanjian yang dapat dilihat di guidebook yang telah disediakan.";

  $("#faq-content").html(faqHTMLMaker(ask, ans));
}

function faqHTMLMaker(ask, ans){
  var faqHTML = "";
  for(var i = 0; i<=ask.length-1; i++){
    faqHTML += '<ul class="collapsible">'+
                '<li>'+
                '<div class="collapsible-header">'+ask[i]+'</div>'+
                '<div class="collapsible-body">'+ans[i]+'</div>'+
                '</li>'+
                '</ul>';
  }
  return faqHTML;
}
