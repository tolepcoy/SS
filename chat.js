// FIREBASE CONFIG
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
const firestore = firebase.firestore();


// Fungsi untuk menutup side panel
function closePanel(panelId) {
  document.getElementById(panelId).style.transform = "translateX(-100%)";
}

document.addEventListener("DOMContentLoaded", () => {
  // Event listeners untuk sidebar icons
  document.getElementById('userProfile').addEventListener('click', () => openPanel('profile'));
  document.getElementById('settings').addEventListener('click', () => openPanel('settingsPanel'));
  document.getElementById('aboutApp').addEventListener('click', () => openPanel('aboutPanel'));

// Logout User dengan Custom Dialog
document.getElementById('logout').addEventListener('click', () => {
  const dialog = document.getElementById('custom-logout-dialog');
  dialog.style.display = 'flex';

  // Tombol konfirmasi logout
  document.getElementById('confirm-logout').addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        window.location.replace("https://tolepcoy.github.io/SecretServer/index.html");
      })
      .catch(error => {
        console.error("Error saat logout:", error);
      });
  });

  // Tombol batal logout
  document.getElementById('cancel-logout').addEventListener('click', () => {
    dialog.style.display = 'none';
  });
});
/* kustom alert end */

// Fungsi untuk membuka side panel
function openPanel(panelId) {
  const panels = ['profile', 'settingsPanel', 'aboutPanel'];
  panels.forEach(panel => {
    document.getElementById(panel).style.transform = panel === panelId ? "translateX(0)" : "translateX(-100%)";
  });
}

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
        document.getElementById('detail').innerText = data.detail;
        document.getElementById('lokasi').innerText = data.lokasi;
        document.getElementById('umur').innerText = data.umur;
        document.getElementById('gender').innerText = data.gender;
        document.getElementById('rate').innerText = data.rate;
        document.getElementById('bergabung').innerText = data.bergabung;
      } else {
        console.log("User data not found in Firestore");
      }
    }).catch(error => console.error("Error fetching user data:", error));
  } else {
    console.log("User not logged in");
  }
});

// EDIT USERNAME
const usernameEl = document.getElementById('username');
const editUsernameBtn = document.getElementById('edit-username');

// Fungsi untuk handle klik tombol edit
editUsernameBtn.addEventListener('click', () => {
  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Simpan value lama
      const currentUsername = usernameEl.textContent.trim();

      // Ubah h2 menjadi input
      usernameEl.innerHTML = `
        <input type="text" id="username-input" value="${currentUsername}" maxlength="15" />
        <button id="save-username">Save</button>
      `;

      // Ambil elemen input dan tombol save
      const usernameInput = document.getElementById('username-input');
      const saveBtn = document.getElementById('save-username');

      // Fokuskan input
      usernameInput.focus();

      // Handle klik tombol save
      saveBtn.addEventListener('click', async () => {
        const newUsername = usernameInput.value.trim();

        // Validasi username
        if (!/^[a-zA-Z\s]{1,15}$/.test(newUsername)) {
          alert("Nama hanya boleh huruf dan spasi, maksimal 15 karakter.");
          return;
        }

        // Simpan ke Firestore
        try {
          const userDef = firestore.collection('userSS').doc(user.uid);
          await userDef.update({ username: newUsername });

          // Kembalikan tampilan awal
          usernameEl.textContent = newUsername;
        } catch (error) {
          console.error("Gagal update username:", error);
          alert("Gagal menyimpan nama baru, coba lagi.");
        }
      });
    } else {
      console.log("User not logged in");
    }
  });
});
});