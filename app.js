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

  if (email && password) {
    // Register User
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Ambil user ID (UID) yang telah terdaftar
        const user = userCredential.user;

        // Simpan data user ke Firestore setelah berhasil login
        auth.onAuthStateChanged(user => {
          if (user) {
            // Jika sudah login, simpan data ke Firestore
            const userSSRef = firestore.collection('userSS').doc(user.uid);
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
              password: password, // Jangan simpan password asli, enkripsi jika perlu
              facebook: 'Tidak terhubung'
            }).then(() => {
              showAlert('Registrasi berhasil!');
              console.log('User berhasil didaftarkan dan data disimpan ke Firestore.');

              // Redirect ke halaman chat setelah registrasi berhasil
              window.location.replace("https://tolepcoy.github.io/SecretServer/chat.html");
            }).catch(error => {
              console.error('Error saving user data to Firestore:', error);
              showAlert('Gagal registrasi!');
            });
          } else {
            showAlert('Login gagal!');
          }
        });
      })
      .catch(error => {
        showAlert('Error!');
        console.error(error);
      });
  } else {
    showAlert('Isi dulu mang!');
  }
});