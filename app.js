    // Firebase Configuration
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

      if (email && password) {
        auth.createUserWithEmailAndPassword(email, password)
          .then(userCredential => {
            alert('Registration successful!');
            console.log('Registered with:', userCredential.user);
          })
          .catch(error => {
            alert('Error: ' + error.message);
            console.error(error);
          });
      } else {
        alert('Please fill in both email and password.');
      }
    });

    loginButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        alert('Login successful!');
        console.log('Logged in with:', userCredential.user);

        // Redirect ke chat.html setelah login berhasil
        console.log("Redirecting to chat.html...");
window.location.replace("https://tolepcoy.github.io/SecretServer/chat.html");
      })
      .catch(error => {
        alert('Error: ' + error.message);
        console.error(error);
      });
  } else {
    alert('Please fill in both email and password.');
  }
});
