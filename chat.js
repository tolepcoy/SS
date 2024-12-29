// Event listeners untuk sidebar icons
document.getElementById('userProfile').addEventListener('click', () => openPanel('profile'));
document.getElementById('settings').addEventListener('click', () => openPanel('settingsPanel'));
document.getElementById('aboutApp').addEventListener('click', () => openPanel('aboutPanel'));
// Fungsi logout yang sudah benar
document.getElementById('logout').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        alert("You have been logged out");
        console.log("Redirecting to index.html...");
        window.location.replace("https://tolepcoy.github.io/SecretServer/index.html");
    }).catch((error) => {
        console.error("Error logging out: ", error);
    });
});

// Fungsi untuk membuka side panel
function openPanel(panelId) {
  const panels = ['profile', 'settingsPanel', 'aboutPanel'];
  panels.forEach(panel => {
    document.getElementById(panel).style.transform = panel === panelId ? "translateX(0)" : "translateX(-100%)";
  });
}

// Fungsi untuk menutup side panel
function closePanel(panelId) {
  document.getElementById(panelId).style.transform = "translateX(-100%)";
}

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAxhhXU90GluSwrjaoqxmP23bgfHR18ez4",
  authDomain: "secretserver-chat.firebaseapp.com",
  projectId: "secretserver-chat",
  storageBucket: "secretserver-chat.appspot.com",
  messagingSenderId: "105772354036",
  appId: "1:105772354036:web:b3962f9ec0260be47491a1",
  measurementId: "G-2FY0BDMFWD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore(); // Hanya Firestore yang digunakan


// Logout User
document.getElementById('logout').addEventListener('click', () => {
  auth.signOut().then(() => alert("Berhasil logout."));
});

// Fungsi untuk menampilkan profil user setelah login
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userRef = firestore.collection('userSS').doc(user.uid);
    userRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        // Update elemen HTML dengan data user yang diambil dari Firestore
        document.getElementById('username').innerText = data.nama;
        document.getElementById('avatar').src = data.avatar;
        document.getElementById('status').innerText = data.status;
        document.getElementById('lokasi').innerText = data.lokasi;
        document.getElementById('umur').innerText = data.umur;
        document.getElementById('gender').innerText = data.gender;
        document.getElementById('rate').innerText = data.umur;
        document.getElementById('bergabung').innerText = data.bergabung;
      } else {
        console.log("User data not found in Firestore");
      }
    }).catch(error => console.error("Error fetching user data:", error));
  } else {
    console.log("User not logged in");
  }
});

// zoom avatar
document.getElementById('avatar').addEventListener('click', function() {
  this.classList.toggle('zoom');
});