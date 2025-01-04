// firebase Configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAxhhXU90GluSwrjaoqxmP23bgfHR18ez4",
      authDomain: "secretserver-chat.firebaseapp.com",
      projectId: "secretserver-chat",
      storageBucket: "secretserver-chat.firebasestorage.app",
      messagingSenderId: "105772354036",
      appId: "1:105772354036:web:b3962f9ec0260be47491a1",
      measurementId: "G-2FY0BDMFWD"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

// Fungsi Register
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // CUSTOM ALERT REGISTER
  function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert'); // Tambahkan class untuk alert
    alertBox.innerHTML = `
      <div class="alert-box">
        <span class="alert-message">${message}</span>
        <button class="alert-ok">OK</button>
      </div>
    `;

    // Tambahkan alert ke body
    document.body.appendChild(alertBox);

    // Menampilkan alert
    alertBox.style.display = 'flex';

    // Close alert saat tombol OK diklik
    alertBox.querySelector('.alert-ok').addEventListener('click', () => {
      alertBox.style.display = 'none';
      document.body.removeChild(alertBox);
    });
  }

  // Validasi input
  if (email && password) {
    // Buat user menggunakan email dan password
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        // Enkripsi password menggunakan CryptoJS sebelum menyimpannya
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'padasuatuhariloremipsump').toString();
        
        // Simpan data pengguna ke Firestore
        const userSSRef = firestore.collection('userSS').doc(user.uid);

        // Pastikan `set()` digunakan untuk membuat dokumen baru atau mengganti dokumen yang ada
        userSSRef.set({
          nama: 'userSS',
          OLstate: 'Offline',
          avatar: 'icon/default_avatar.png',
          level: 'level/b1.png',
          detail: 'Bio',
          lokasi: 'Palembang',
          umur: '-',
          gender: 'icon/defaultgender.png',
          requestRate: 'belum request',
          rate: 'N/A',
          bergabung: new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' }),
          email: user.email,
          verimail: '-',
          password: encryptedPassword, // Menyimpan password yang terenkripsi
          facebook: 'Tidak terhubung'
        })
        .then(() => {
          // Tampilkan alert sukses
          showAlert('Registrasi berhasil!');
          console.log('User registered:', userCredential.user);

          // Redirect ke chat.html setelah registrasi berhasil
          window.location.replace("https://tolepcoy.github.io/SecretServer/chat.html");
        })
        .catch(error => {
          // Jika terjadi error saat menyimpan data ke Firestore
          console.error('Error saving user data to Firestore:', error);
          showAlert('Gagal registrasi!');
        });
      })
      .catch(error => {
        // Menangani error dari proses registrasi
        console.error('Error during registration:', error);
        showAlert('Gagal registrasi! Coba lagi.');
      });
  } else {
    // Menangani jika input email atau password kosong
    showAlert('Isi dulu mang!');
  }
});

// fungsi login
    loginButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

// CUSTOM ALERT LOGIN
function showAlert(message) {
  const alertBox2 = document.createElement('div');
  alertBox2.classList.add('custom-alert');
  alertBox2.innerHTML = `
    <div class="alert-box">
      <span class="alert-message">${message}</span>
      <button class="alert-ok">OK</button>
    </div>
  `;

  // Tambahkan alert ke body
  document.body.appendChild(alertBox2);

  // Menampilkan alert
  alertBox2.style.display = 'flex';

  // Close alert saat tombol OK diklik
  alertBox2.querySelector('.alert-ok').addEventListener('click', () => {
    alertBox2.style.display = 'none';
    document.body.removeChild(alertBox2);
  });
}
// END CUSTOM ALERT LOGIN

  if (email && password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        showAlert('Login berhasil!');
        console.log('Logged in with:', userCredential.user);

        console.log("Menuju ke global chat...");
window.location.replace("https://tolepcoy.github.io/SecretServer/chat.html");
      })
      .catch(error => {
        showAlert('Email atau Password salah!');
        console.error(error);
      });
  } else {
    showAlert('Isi dulu mang!');
  }
});

// EMAIL USER
// Menunggu user login
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const email = document.getElementById('email');
    email.textContent = user.email;
  } else {
    console.log("User belum login");
  }
});

// STATUS VERIFIKASI EMAIL
const statusVerifikasiEl = document.getElementById('verimail');

// Fungsi untuk update status verifikasi
function cekStatusVerifikasi() {
  // Pastikan user login
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.reload() // Reload data user untuk memastikan data terbaru
        .then(() => {
          const db = firebase.firestore();  // Ambil instance Firestore
          const userDoc = db.collection('userSS').doc(user.uid);  // Ambil dokumen berdasarkan UID user

          if (user.emailVerified) {
            statusVerifikasiEl.textContent = 'Verifikasi √';
            statusVerifikasiEl.style.color = '#0f0';
            statusVerifikasiEl.style.cursor = 'default'; // Tidak clickable jika sudah diverifikasi
            // Update status verifikasi di Firestore
            userDoc.update({
              email: user.email, // Update email
              verimail: 'Verifikasi √' // Update status verifikasi
            })
            .then(() => {
              console.log('Status verifikasi di Firestore telah diperbarui');
            })
            .catch(error => {
              console.error('Gagal mengupdate status verifikasi di Firestore:', error);
            });
          } else {
            statusVerifikasiEl.innerHTML = 'Belum Verifikasi ✘';
            statusVerifikasiEl.style.color = '#f55';
            statusVerifikasiEl.style.cursor = 'pointer';
            
            statusVerifikasiEl.onclick = () => {
              const konfirmasi = confirm('Kirim aktifasi ke email?');
              if (konfirmasi) {
                user.sendEmailVerification()
                  .then(() => {
                    alert('Email verifikasi berhasil dikirim. Cek inbox email Ente!');
                  })
                  .catch(error => {
                    console.error('Gagal kirim email verifikasi:', error);
                    alert('Gagal mengirim email verifikasi.');
                  });
              }
            };
            // Update status verifikasi di Firestore
            userDoc.update({
              email: user.email, // Update email
              verimail: 'Belum Verifikasi ✘' // Update status verifikasi
            })
            .then(() => {
              console.log('Status verifikasi di Firestore telah diperbarui');
            })
            .catch(error => {
              console.error('Gagal mengupdate status verifikasi di Firestore:', error);
            });
          }
        })
        .catch(error => {
          console.error('Gagal memuat ulang status user:', error);
        });
    } else {
      statusVerifikasiEl.innerHTML = 'User belum login';
      statusVerifikasiEl.style.color = 'orange';
      statusVerifikasiEl.style.cursor = 'default';
    }
  });
}

// Panggil fungsi saat halaman selesai dimuat
cekStatusVerifikasi();