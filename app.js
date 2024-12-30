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
// END CUSTOM ALERT REGISTER
      if (email && password) {
        auth.createUserWithEmailAndPassword(email, password)
          .then(userCredential => {
            showAlert('Registrasi berhasil!');
            console.log('Registered with:', userCredential.user);
          })
          .catch(error => {
            showAlert('Error!');
            console.error(error);
          });
      } else {
        showAlert('Isi dulu mang!');
      }
    });

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

        // Redirect ke chat.html setelah login berhasil
        console.log("Menuju ke global chat...");
window.location.replace("https://tolepcoy.github.io/SecretServer/chat.html");
      })
      .catch(error => {
        showAlert('Error!');
        console.error(error);
      });
  } else {
    showAlert('Isi dulu mang!');
  }
});