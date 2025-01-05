/* LOADING CIRCLE */
document.addEventListener('DOMContentLoaded', function() {
  // Membuat overlay untuk loading
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'loading-overlay';
  document.body.appendChild(loadingOverlay);

  const loadingCircle = document.createElement('div');
  loadingCircle.classList.add('loading-circle');
  loadingOverlay.appendChild(loadingCircle);

  Object.assign(loadingOverlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '99999',
    opacity: '1',
    transition: 'opacity 1s ease-out',
  });

  // Menambahkan style untuk loading circle
  Object.assign(loadingCircle.style, {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
  });

  // Menambahkan keyframes untuk animasi spin
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);

  // Tampil selama 5 detik
  setTimeout(function() {
    loadingOverlay.style.opacity = '0'; // Efek fade-out
    setTimeout(function() {
      loadingOverlay.style.display = 'none';
    }, 1000);

    // Mengubah opacity #blackout menjadi 1
    const blackout = document.getElementById('blackout');
    if (blackout) {
      blackout.style.opacity = '1';
    }

    // Mengubah opacity body1 menjadi 1
    const body1 = document.querySelector('body1');
    if (body1) {
      body1.style.opacity = '1';
    }
  }, 3000);
});
/* end loading circle */

/* Menu-btn Slide */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const extraBtn = document.getElementById("extra-btn");
  const navbar = document.getElementById("navbar");
  const navbarKanan = document.getElementById("navbar-kanan");
  const icons = document.querySelectorAll(".icon");
  const pages = document.querySelectorAll(".page");

  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");

  if (navbar.classList.contains("active")) {
    menuBtn.innerHTML = "B<br>A<br>C<br>K";
  } else {
    menuBtn.innerHTML = "M<br>E<br>N<br>U";
  }
});

/* observer */
const observer = new MutationObserver(() => {
  if (navbar.classList.contains("active")) {
    menuBtn.innerHTML = "B<br>A<br>C<br>K";
  } else {
    menuBtn.innerHTML = "M<br>E<br>N<br>U";
  }
});

observer.observe(navbar, { attributes: true, attributeFilter: ["class"] });

  extraBtn.addEventListener("click", () => {
    navbarKanan.classList.toggle("active");
  });

  icons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      const target = document.querySelector(icon.dataset.target);

      navbar.classList.remove("active");

      navbarKanan.classList.remove("active");

      pages.forEach(page => page.classList.remove("active"));
      target.classList.add("active");
    });
  });
});

/* CATATAN */
const catBtn = document.getElementById('cat-btn');
const navbarKanan = document.querySelector('.catatan-navbar-kanan');

// Fungsi untuk toggle class 'active'
catBtn.addEventListener('click', function () {
  catBtn.classList.toggle('active');
  navbarKanan.classList.toggle('active');
});

// Home Button
const homeBtn = document.getElementById('home-btn');
const menuBtn3 = document.getElementById('menu-btn');
const navbar1 = document.getElementById("navbar");
const navbar2 = document.getElementById("navbar-kanan");
const pager = document.querySelectorAll('.page');

homeBtn.addEventListener('click', function () {
  
  menuBtn3.classList.toggle('active');
  
  // Ambil elemen dengan id 'home'
  const homePage = document.getElementById('home');

  // Pastikan #home selalu aktif jika klik #home-btn
  if (!homePage.classList.contains('active')) {
    homePage.classList.add('active');
  }

  // Hapus class .active dari elemen lain selain #home
  pager.forEach(function(page) {
    if (page !== homePage) {
      page.classList.remove('active');
      navbar1.classList.remove("active");
      navbar2.classList.remove("active");
    }
  });
});

// Ketika klik elemen lain, pastikan #home kehilangan class .active
pager.forEach(function(page) {
  page.addEventListener('click', function() {
    const homePage = document.getElementById('home');
    if (page !== homePage) {
      homePage.classList.remove('active');
    }
  });
});

/* LILIN HOME */
const home = document.getElementById('home');
const mukadimah = document.getElementById('mukadimah');
const silsilah = document.getElementById('silsilah');
const asmaulhusna = document.getElementById('asmaulhusna');
const istighfar = document.getElementById('istighfar');
const sholawat = document.getElementById('sholawat');
const tawasul = document.getElementById('tawasul');
const doahijab = document.getElementById('doahijab');
const doaladuni = document.getElementById('doaladuni');
const nafiisbat = document.getElementById('nafiisbat');
const alfatiha9 = document.getElementById('alfatiha9');
const sultanagung = document.getElementById('sultanagung');
const yasin = document.getElementById('yasin');
const tentang = document.getElementById('tentang');
const menuBtn2 = document.getElementById('menu-btn');

[home, mukadimah, silsilah, asmaulhusna, istighfar, sholawat, tawasul, doahijab, doaladuni, nafiisbat, alfatiha9, sultanagung, yasin, tentang].forEach(button => {
  button.addEventListener('click', function() {
  menuBtn2.classList.toggle('active');
  });
});

// CATATAN
let undoStack = [];

function addToUndoStack(element) {
  undoStack.push(element);
}

// New judul
document.getElementById('judul').addEventListener('click', function() {
  var judul = document.createElement('div');
  judul.contentEditable = true;
  
  judul.style.fontWeight = 'bold';
  judul.style.textAlign = 'center';
  judul.style.fontSize = '20px';
  judul.style.marginTop ="2%";
  judul.style.marginBottom ="2%";

  document.getElementById('editor').appendChild(judul);
  addToUndoStack(judul);
  judul.focus();
});

// New subjudul
document.getElementById('subjudul').addEventListener('click', function() {
  var subjudul = document.createElement('div');
  subjudul.contentEditable = true;
  
  subjudul.style.fontWeight = 'bold';
  subjudul.style.textAlign = 'left';
  subjudul.style.fontSize = '18px';
  subjudul.style.textDecoration = 'underline';
  subjudul.style.textUnderlineOffset = '3px';
  subjudul.style.textUnderlineColor = '#0e0';
  subjudul.style.textDecorationThickness = '1px';
  subjudul.style.fontFamily = 'Tolep Ngewe Tebel';
  subjudul.style.letterSpacing = '1.1';
  subjudul.style.transform = "scaleX(1.3)";
  subjudul.style.transformOrigin = 'left';
  subjudul.style.marginLeft ="2%";
  subjudul.style.marginTop ="2%";
  subjudul.style.marginBottom ="2%";
  
  document.getElementById('editor').appendChild(subjudul);
  addToUndoStack(subjudul);
  subjudul.focus();
});

// New teks
document.getElementById('new-teks').addEventListener('click', function() {
  var newTeks = document.createElement('span');
  newTeks.contentEditable = true; 

  document.getElementById('editor').appendChild(newTeks);
  addToUndoStack(newTeks);
  newTeks.focus();
});

// New HR
document.getElementById('garis-break').addEventListener('click', function() {
  var garisBreak = document.createElement('hr');
  garisBreak.contentEditable = false;
  document.getElementById('editor').appendChild(garisBreak);
  addToUndoStack(garisBreak);
  garisBreak.focus();
});

// New miring
document.getElementById('miring').addEventListener('click', function() {
  var miring = document.createElement('span');
  miring.contentEditable = true; 

  miring.style.fontStyle = 'italic';
  miring.style.color = '#0e0';

  document.getElementById('editor').appendChild(miring);
  addToUndoStack(miring);
  miring.focus();
});

// New ukuran-teks
const editorFsize = document.getElementById('editor');

document.getElementById('ukuran-teks').addEventListener('click', function() {
  editorFsize.classList.toggle('besar');
});


// new add pic
document.getElementById('add-pic').addEventListener('click', function() {
  // Buat elemen input untuk memilih gambar
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png, image/jpeg, image/gif';

  // Ketika gambar dipilih
  input.addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var imgElement = document.createElement('img');
        imgElement.src = e.target.result; // Menggunakan Base64
        imgElement.style.width = "80%";

        // Menambah gambar ke editor setelah konten sebelumnya
        var editor = document.getElementById('editor');
        editor.appendChild(imgElement);
        addToUndoStack(imgElement);
      };
      reader.readAsDataURL(file); // Konversi file ke Base64
    }
  });

  // Trigger click
  input.click();
});


// Implementing the UNDO functionality
document.getElementById('undo').addEventListener('click', function() {
  if (undoStack.length > 0) {
    const lastElement = undoStack.pop(); // Remove last added element from stack
    document.getElementById('editor').removeChild(lastElement); // Remove from editor
  }
});

// END CATATAN

/* C H A T */
$('#feedbackForm').submit(function (e) {
  e.preventDefault();

  // Sembunyikan elemen awal
  $('.status').hide();
  $('#successMessage').hide();

  // AJAX Call
  $.ajax({
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSd8gVHO1l_7pa1NBkgXHCb1h2TOS3zkpfrUk58TYDASkMZO3g/formResponse',
    data: $('#feedbackForm').serialize(),
    type: 'POST',
    dataType: "json",
    statusCode: {
      0: function () {
        // Tampilkan status dan pesan berhasil
        $('.status').fadeIn(800, function () {
          $('#successMessage').fadeIn(800).delay(3000).fadeOut(800, function () {
            $('.status').fadeOut(800);
          });
        });

        $('#feedbackForm')[0].reset(); 
        fetchRecentSubmissions();
      },
      200: function () {
        $('.status').fadeIn(800, function () {
          $('#successMessage').fadeIn(800).delay(3000).fadeOut(800, function () {
            $('.status').fadeOut(800);
          });
        });

        $('#feedbackForm')[0].reset(); 
        fetchRecentSubmissions();
      },
      403: function () {
        alert('Oh my god! error wkwkwk');
      }
    }
  });
});

// placeholder
$('input, textarea').on('focus', function () {
  $(this).data('placeholder', $(this).attr('placeholder')).attr('placeholder', '');
}).on('blur', function () {
  $(this).attr('placeholder', $(this).data('placeholder'));
});

// ambil data dari Google Apps Script
const fetchRecentSubmissions = () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwunKarsPosnP02kLVbXE6mL4wKPdgnYM4sM3zA2Ei5fj-j08hHLJFJujv7U4ZgadjU/exec';
  $.getJSON(scriptURL, function (data) {
  const submissionList = $('#submissionList');
  submissionList.empty();
  data.slice(1).forEach(item => {
    let nama = item.Nama;
  let status = item.Status;
let pesan = item.Pesan;

// ADMINISTRATOR
if (nama.match(/^x0xtc/)) {
nama = 'Administrator';
status = '&nbsp;ADMIN&trade;';
submissionList.append(`
<li>
<hr class="hrL">
<span class="bungkusAdmin"><span id="adminNama">${nama}</span>
<img src="./icon/admin.gif" class="adminIcon">
<span id="adminStatus">${status}</span></span>
<hr class="hrL">
<span id="adminText">${pesan}</span><hr class="hrL"></li><hr>
`); return;
}

// MODERATOR
if (nama.match(/^M0d@r/)) {
nama = 'Moderator';
status = '&nbsp;Moderator';
submissionList.append(`
<li>
<span id="momodNama">${nama}</span>
<img src="./icon/momod.gif" class="momodIcon">
<span id="momodStatus">${status}</span>
<br>
<span id="momodText">${pesan}</span><br></li><hr>
  `); return;
}

// AI BOT
if (nama.match(/^@ai:/)) {
nama = 'BOT';
status = '&nbsp;AI';
submissionList.append(`
<li>
<span id="aiNama">${nama} &nbsp;
<img src="./icon/ai.gif" class="aiIcon">
<span id="aiStatus">${status}</span>
</span>
<span id="aiText">${pesan}</span><br></li><hr>
`); return;
}

// USER REG
if (nama.includes('@+')) {
nama = nama.replace('@+', '');
status = '&nbsp;&nbsp;user';
submissionList.append(`
<li>
<span class="userrequestNama">${nama}</span>
&nbsp;<img src="./icon/subreg.png" class="userrequestIcon">
<span class="userrequestStatus">${status}</span><br>
<span class="userrequestText">${item.Pesan}</span>
<br></li>
`); return;
} 

/* ----- ALL MEMBER ------- */
/* ############################### */
if (handleMemberSubmission(nama, pesan, submissionList)) {
return;
}
/* ############################### */
/* ---- USER BIASA (NORMAL) --- */
    else {
      submissionList.append(`
        <li>
          <span class="userbiasaNama">${nama}</span><br>
          ${item.Pesan}<br>
        </li>
        <hr>
      `);
    }
  });

    scrollToBottom();
  });
};

const scrollToBottom = () => {
  const scrollContainer = document.querySelector('.spreadsheet .pad');
  if (scrollContainer) {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }
};

fetchRecentSubmissions();

/* OFF AUTO REFRESH CHAT */
let autoRefreshInterval;

// Default: Auto-refresh mati/off
function startAutoRefresh() {
    autoRefreshInterval = setInterval(fetchRecentSubmissions, 10000);
}

function stopAutoRefresh() {
    clearInterval(autoRefreshInterval);
}

// Pastikan auto-refresh mati saat load awal
stopAutoRefresh();

// Event listener untuk toggle switch
document.getElementById('toggleAutoRefresh').addEventListener('change', function () {
    if (this.checked) {
        startAutoRefresh(); // Aktifkan auto-refresh jika toggle diaktifkan
    } else {
        stopAutoRefresh(); // Matikan auto-refresh jika toggle dimatikan
    }
});

//GERBANG SUPER SIMPLE ES6
document.getElementById("bukaGerbang").onclick = () => document.getElementById("gerbang").classList.add("buka");

/* Handler Fetch Split Javascript */
function handleMemberSubmission(nama, pesan, submissionList) {
    for (let member of members) {
        if (nama.match(member.key)) {
            submissionList.append(`<li>
<span style="color:${member.warnaNama};" class="memberNama" id="${member.id}">
   ${member.displayName}
                </span>
                &nbsp;<img src="${member.icon}" class="memberIcon">
                <span style="color:${member.warnaStatus};" class="memberStatus">&nbsp;${member.status}</span><br>
                <span style="color:${member.warnaText};" class="memberText">${pesan}</span><br>
            </li><hr>`);
            return true;
        }
    }
    return false;
}

/* Ceting icon btn */
const cetingSec = document.getElementById("iconChat");
const menuBtnC = document.getElementById("menu-btn");
  cetingSec.addEventListener('click', function() {
  menuBtnC.classList.add('active');
});

// close chat
const closeChat = document.getElementById('close-chat');
const menuBtn5 = document.getElementById('menu-btn');


closeChat.addEventListener('click', function () {
  menuBtn5.classList.toggle('active');
});

// icon Catatan klik
const catatanSec = document.getElementById("iconCat");
const menuBtnD = document.getElementById("menu-btn");
  catatanSec.addEventListener('click', function() {
  menuBtnD.classList.add('active');
});

// close-cat
const closeCat = document.getElementById('close-cat');
const menuBtn6 = document.getElementById('menu-btn');


closeCat.addEventListener('click', function () {
  menuBtn6.classList.toggle('active');
  closeCat.classList.toggle('active');
  
  if (closeCat.classList.contains("active")) {
    closeCat.innerHTML = "H I D E";
  } else {
    closeCat.innerHTML = "N A V";
  }
});

// save note
const saveNote = document.getElementById('save-note');
const editorZ = document.getElementById('editor');

saveNote.addEventListener('click', function () {
    const fileName = 'catatan.html'; // Nama file default
    const content = editorZ.innerHTML; // Ambil konten dari #editor

    // Buat file dan download otomatis
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Tidak ada alert atau konfirmasi
});

// load note
const loadNote = document.getElementById('load-note');
const editorX = document.getElementById('editor');

loadNote.addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'text/html'; // Hanya menerima file HTML

    input.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const loadedContent = e.target.result;

                // Menampilkan konten HTML di editor
                editorX.innerHTML = loadedContent;

                // Memeriksa dan mengganti elemen gambar, audio, dan video agar menggunakan base64
                document.querySelectorAll('img, audio, video').forEach((element) => {
                    // Cek apakah elemen memiliki atribut src yang mengandung base64
                    if (element.src && element.src.startsWith('data:')) {
                        // Jika sudah base64, kita biarkan tetap
                    } else if (element.src) {
                        // Kalau src bukan base64, ganti dengan base64 (misal kalau gambar)
                        fetch(element.src)
                            .then(response => response.blob())
                            .then(blob => {
                                const reader = new FileReader();
                                reader.onloadend = function () {
                                    element.src = reader.result; // Set base64 ke src gambar, audio, atau video
                                };
                                reader.readAsDataURL(blob); // Membaca file sebagai base64
                            })
                            .catch(err => console.error('Error loading media:', err));
                    }
                });

                // Tidak ada alert konfirmasi
            };

            reader.readAsText(file); // Membaca file sebagai teks
        } else {
            console.error('Tidak ada file yang dipilih!');
        }
    });

    input.click(); // Trigger input file dialog
});