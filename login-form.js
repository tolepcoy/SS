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

  if (emailRegister && passwordRegister) {
    // Register User
    auth.createUserWithEmailAndPassword(emailRegister, passwordRegister)
      .then((userCredential) => {
        const userRegister = userCredential.user;

        // Simpan data ke koleksi SS
        const userSSRef = firestore.collection('SS').doc(userRegister.uid);
        userSSRef.set({
          nama: 'userSS',
          OLstate: 'Offline',
          avatar: 'icon/default_avatar.png',
          level: '1',
          role: 'Minion',
          levelIcon: '1',
          detail: 'Bio',
          lokasi: 'Palembang',
          umur: 'Belum diatur',
          gender: 'cewok',
          isAdmin: 'false',
          requestRate: 'belum request',
          rate: 'No Rating',
          bergabung: new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' }),
        }).then(() => {
          console.log('User data berhasil disimpan ke koleksi SS.');
        }).catch((error) => {
          console.error('Error saving user data to Firestore:', error);
        });

        // Simpan data ke koleksi PRIVASI
        const privasiRef = firestore.collection('PRIVASI').doc(userRegister.uid);
        privasiRef.set({
          email: userRegister.email,
          password: '-',
          isAdmin: 'false',
          verimail: 'Belum Verifikasi ✘',
        }).then(() => {
          showAlert('Registrasi berhasil!');
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


//FUNGSI LOGIN
const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

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

  if (email && password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        // Redirect ke index.html jika login berhasil
        showAlertZ('Login berhasil!');
        console.log('User logged in:', user.email);

        // Redirect setelah 2 detik (untuk memberi waktu melihat alert)
        setTimeout(() => {
          window.location.replace("https://tolepcoy.github.io/SS/index.html");
        }, 2000);
      })
      .catch(error => {
        console.error('Login Error:', error);
        showAlertZ('Login gagal! Periksa email atau password.');
      });
  } else {
    showAlertZ('Isi email dan password dulu!');
  }
});