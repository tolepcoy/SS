// FIREBASE CONFIGURATION
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

// CEK STATUS LOGIN SAAT PERTAMA LOAD
const RegChecker = document.getElementById('registerButton');
const LogChecker = document.getElementById('loginButton');
const EmChecker = document.getElementById('email');
const PassChecker = document.getElementById('password');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    RegChecker.style.pointerEvents = 'none';
    LogChecker.style.pointerEvents = 'none';
    EmChecker.disabled = true;
    PassChecker.disabled = true;
    console.log('User sudah login:', user);
  } else {
    window.location.replace('https://tolepcoy.github.io/SS/index.html');
  }
});
// -- cek load login end

// FUNGSI REGISTER
const registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', () => {
  const emailRegister = document.getElementById('email').value;
  const passwordRegister = document.getElementById('password').value;

// CUSTOM ALERT REGISTER
  function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.innerHTML = `
      <div class="alert-box">
        <span class="alert-message">${message}</span>
        <button class="alert-ok">OK</button>
      </div>
    `;

    document.body.appendChild(alertBox);
    alertBox.style.display = 'flex';

    alertBox.querySelector('.alert-ok').addEventListener('click', () => {
      alertBox.style.display = 'none';
      document.body.removeChild(alertBox);
    });
  }
// END ALERT CUSTOM REGISTER

  if (emailRegister && passwordRegister) {
    // Register User
    auth.createUserWithEmailAndPassword(emailRegister, passwordRegister)
      .then((userCredential) => {
        const userRegister = userCredential.user;

        // Simpan data ke koleksi SS
        const userSSRef = firestore.collection('SS').doc(userRegister.uid);
        userSSRef.set({
          nama: 'User Baru',
          avatar: 'icon/default_avatar.png',
          LVL: 'Lv. ',
          level: 1,
          online: false,
          role: 1,
          levelIcon: 1,
          detail: 'Bio',
          lokasi: 'Palembang',
          umur: null,
          gender: 'cewok',
          requestRate: 'belum request',
          email: userRegister.email,
          member: 'memberNotAcc',
          rate: '&nbsp;No Rating',
          bergabung: new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' }),
        }).then(() => {
          console.log('User data berhasil disimpan ke koleksi SS.');
        }).catch((error) => {
          console.error('Error saving user data to Firestore:', error);
        });

        // Simpan data ke koleksi PRIVASI
        const privasiRef = firestore.collection('PRIVASI').doc(userRegister.uid);
        privasiRef.set({
          disabled: true,
          email: userRegister.email,
          verimail: 'Verifikasi Email',
        }).then(() => {
          showAlert('Registrasi berhasil! Menunggu persetujuan Tolep Coy');
          console.log('User privasi berhasil disimpan ke koleksi PRIVASI.');
        }).catch((error) => {
          console.error('Error saving privasi data to Firestore:', error);
          showAlert('Gagal menyimpan data privasi!');
        });
      })
      .catch((error) => {
        console.error('Error saat registrasi:', error);
        showAlert('Registrasi gagal!');
      });
  } else {
    showAlert('Isi dulu mang!');
  }
});

// FUNGSI LOGIN
const loginButton = document.getElementById('loginButton');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// CUSTOM ALERT LOGIN
function showAlertZ(message) {
  const alertBoxZ = document.createElement('div');
  alertBoxZ.classList.add('custom-alert');
  alertBoxZ.innerHTML = `
    <div class="alert-box">
      <span class="alert-message">${message}</span>
      <button class="alert-ok">OK</button>
    </div>
  `;

  // Tambahkan alert ke body
  document.body.appendChild(alertBoxZ);

  // Menampilkan alert
  alertBoxZ.style.display = 'flex';

  // Close alert saat tombol OK diklik
  alertBoxZ.querySelector('.alert-ok').addEventListener('click', () => {
    alertBoxZ.style.display = 'none';
    document.body.removeChild(alertBoxZ);
  });
}
// CUSTOM ALERT Z END

// Fungsi untuk login
loginButton.addEventListener('click', () => {
  const emailLogin = emailInput.value;
  const passwordLogin = passwordInput.value;

  if (emailLogin && passwordLogin) {
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Login berhasil:', user);

        // Cek status disabled dari koleksi PRIVASI
        const userPrivasiRef = firestore.collection('PRIVASI').doc(user.uid);
        userPrivasiRef.get()
          .then(doc => {
            if (doc.exists) {
              const userData = doc.data();
              if (userData.disabled && userData.disabled === true) {

                showAlertZ('Akun Anda belum aktif, tidak dapat login.');
                firebase.auth().signOut();
              } else {
                showAlertZ('Login berhasil');
                window.location.href = "./index.html";
              }
            }
          })
          .catch(error => {
            console.error("Error getting user data:", error);
            showAlertZ('Terjadi kesalahan saat memeriksa status akun.');
          });
      })
      .catch(error => {
        console.error('Login gagal:', error);
        showAlertZ('Login gagal! Periksa email atau password Anda.');
      });
  } else {
    showAlertZ('Isi email dan password dulu!');
  }
});