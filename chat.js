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

// Fungsi upload ke Imgur
// Fungsi upload ke Imgur dengan token
async function uploadToImgur(file) {
  const accessToken = "6e72b748a0d7becd6751810b6c1557de073ccb0e"; // Ganti dengan token ente
  const url = "https://api.imgur.com/3/image";
  
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}` // Menggunakan Bearer token
      },
      body: formData
    });

    const dataFile = await response.json();
    if (dataFile.success) {
      return dataFile.data.link;
    } else {
      throw new Error("Gagal upload gambar ke Imgur");
    }
  } catch (error) {
    console.error("Error saat upload ke Imgur:", error);
    return null;
  }
}

// Fungsi untuk simpan data user ke Firestore
function saveUserProfile(profileData) {
  const user = auth.currentUser;
  
// Fungsi untuk custom alert
function showAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.classList.add('custom-alert');
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
/* end alert global */
  
  if (user) {
    const userRef2 = firestore.collection('userSS').doc(user.uid);
    userRef2.set(profileData, { merge: true }) 
      .then(() => showAlert("Berhasil disimpan."))
      .catch(err => console.error("Gagal menyimpan data:", err));
  } else {
    showAlert("Anda belum login.");
  }
}

// Fungsi untuk handle save profile dengan Firebase
document.getElementById('save-button').addEventListener('click', async () => {
  const name = document.getElementById('user-nama').value.trim();
  const avatar = document.getElementById('user-avatar').files[0];
  const location = document.getElementById('user-lokasi').value.trim();
  const age = document.getElementById('user-umur').value.trim();
  const gender = document.getElementById('user-gender').value;
  
// Fungsi untuk custom alert
function showAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.classList.add('custom-alert');
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
/* end alert global */

  // Validasi Nama: Max 15 karakter, hanya huruf dan spasi
  if (!/^[a-zA-Z\s]{1,15}$/.test(name)) {
    return showAlert("Nama hanya boleh huruf dan spasi, maksimal 15 karakter.");
  }

  // Validasi Lokasi: Max 20 karakter termasuk spasi
  if (location.length > 20) {
    return showAlert("Lokasi maksimal 20 karakter.");
  }

  // Validasi Umur: Rentang 16–60 tahun
  if (!/^\d{2}$/.test(age) || age < 16 || age > 60) {
    return showAlert("Usia tidak valid!");
  }

  // Validasi Avatar: Hanya file .jpg
  if (avatar && !avatar.type.includes('image/jpeg')) {
    return showAlert("Avatar harus file .jpg.");
  }

  let avatarUrl = "icon/default_avatar.jpg";

  if (avatar) {
    avatarUrl = await uploadToImgur(avatar);
  }

  // Tambahkan data default
  const defaultProfileData = {
    status: "User",
    detail: "Bio",
    rate: "N/A",
    bergabung: new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' }) 
  };

  saveUserProfile({
    ...defaultProfileData, // Tambahkan field default
    nama: name,
    avatar: avatarUrl,
    lokasi: location,
    umur: parseInt(age, 10),
    gender
  });
});

// zoom avatar
document.getElementById('avatar').addEventListener('click', function() {
  this.classList.toggle('zoom');
});});
