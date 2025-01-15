// CUSTOM ALERT
  function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.innerHTML = `
      <div class="alert-box">
        <span class="alert-message">${message}</span>
        <button class="alert-ok">Iyo</button>
      </div>
    `;

    document.body.appendChild(alertBox);
    alertBox.style.display = 'flex';

    alertBox.querySelector('.alert-ok').addEventListener('click', () => {
      alertBox.style.display = 'none';
      document.body.removeChild(alertBox);
    });
  }
// END ALERT CUSTOM

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

// Check status login
const loadingParent = document.getElementById('loading');
const RegChecker = document.getElementById('registerButton');
const LogChecker = document.getElementById('loginButton');
const EmChecker = document.getElementById('email');
const PassChecker = document.getElementById('password');
const loadingCircle = document.getElementById('loading-circle');

// Awal loading
loadingParent.style.display = 'flex';
loadingCircle.style.display = 'block';
RegChecker.style.pointerEvents = 'none';
LogChecker.style.pointerEvents = 'none';
EmChecker.disabled = true;
PassChecker.disabled = true;

// Fungsi cek user login
window.onload = function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Cek koleksi PRIVASI untuk user yang login
      firestore.collection('PRIVASI').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          if (userData.disabled) {
            // Jika akun disabled
            showAlert('Akun Ente belum aktif, nunggu diaktifke Tolep dulu');
            firebase.auth().signOut().then(() => {
              loadingParent.style.display = 'none';
              loadingCircle.style.display = 'none';
              loadingCircle.style.animation = 'none';
              RegChecker.style.pointerEvents = 'auto';
              LogChecker.style.pointerEvents = 'auto';
              EmChecker.disabled = false;
              PassChecker.disabled = false;
            });
          } else {
            // Jika akun aktif
            window.location.href = 'https://tolepcoy.github.io/SS/index.html';
          }
        } else {
          showAlert('Data Ente idak katek. Hubungi Tolep!.');
          firebase.auth().signOut().then(() => {
            loadingParent.style.display = 'none';
            loadingCircle.style.display = 'none';
            loadingCircle.style.animation = 'none';
            RegChecker.style.pointerEvents = 'auto';
            LogChecker.style.pointerEvents = 'auto';
            EmChecker.disabled = false;
            PassChecker.disabled = false;
          });
        }
      }).catch((error) => {
        console.error('Error mengambil data user:', error);
        showAlert('Erroh nah cubo lagi.');
      });
    } else {
      // Jika user belum login
      loadingParent.style.display = 'none';
      loadingCircle.style.display = 'none';
      loadingCircle.style.animation = 'none';
      RegChecker.style.pointerEvents = 'auto';
      LogChecker.style.pointerEvents = 'auto';
      EmChecker.disabled = false;
      PassChecker.disabled = false;
    }
  });
};

// CACHE
firebase.firestore().enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      console.log('Offline caching gagal karena multi-tab.');
    } else if (err.code == 'unimplemented') {
      console.log('Offline caching tidak didukung di browser ini.');
    }
  });

// FUNGSI REGISTER
const registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', () => {
  const emailRegister = document.getElementById('email').value;
  const passwordRegister = document.getElementById('password').value;

  if (emailRegister && passwordRegister) {
    // Register User
    auth.createUserWithEmailAndPassword(emailRegister, passwordRegister)
      .then((userCredential) => {
        const userRegister = userCredential.user;

        // Simpan data ke koleksi SS
        const userSSRef = firestore.collection('SS').doc(userRegister.uid);
        userSSRef.set({
          nama: '<span style="color:#bbb;">User Baru</span>',
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
          showAlert('Registrasi berhasil! Nunggu disetujui Tolep dulu');
          console.log('User privasi berhasil disimpan ke koleksi PRIVASI.');
        }).catch((error) => {
          console.error('Error saving privasi data to Firestore:', error);
          showAlert('Gagal ngirim data!');
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

// Fungsi untuk login
loginButton.addEventListener('click', () => {
  const emailLogin = emailInput.value;
  const passwordLogin = passwordInput.value;

  if (emailLogin && passwordLogin) {
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
      .then(userCredential => {
 const user = userCredential.user;
 console.log('Login berhasil:', user);

  // Cek status disabled di koleksi PRIVASI
        const userPrivasiRef = firestore.collection('PRIVASI').doc(user.uid);
        userPrivasiRef.get()
          .then(doc => {
            if (doc.exists) {
    const userData = doc.data();
              if (userData.disabled && userData.disabled === true) {

showAlertZ('Akun Ente belum aktif, nunggu diaktifke Tolep Coy dulu.');
   firebase.auth().signOut();
} else {
  showAlert('Login berhasil');
  window.location.href = "https://tolepcoy.github.io/SS/index.html";
   }
  }
})
          .catch(error => {
            console.error("Error getting user data:", error);
    showAlert('Error! status akun dak tau!.');
          });
      })
      .catch(error => {
console.error('Login gagal:', error);
        showAlert('Login gagal! Perikso email atau password Ente.');
      });
  } else {
    showAlert('Isi email samo password dulu!');
  }
});