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

  // Logout User
  document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => {
      alert("Anda telah logout.");
      window.location.replace("https://tolepcoy.github.io/SecretServer/index.html");
    }).catch(error => {
      console.error("Error saat logout:", error);
    });
  });

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

// zoom avatar
document.getElementById('avatar').addEventListener('click', function() {
  this.classList.toggle('zoom');
});});

// Fungsi untuk simpan data user ke Firestore
function saveUserProfile(profileData) {
  const user = auth.currentUser;
  if (user) {
    const userRef = firestore.collection('userSS').doc(user.uid);
    userRef.set(profileData, { merge: true }) // Hanya overwrite field yang diedit
      .then(() => alert("Data user berhasil disimpan."))
      .catch(err => console.error("Gagal menyimpan data:", err));
  } else {
    alert("User belum login.");
  }
}

// Fungsi untuk handle save profile dengan Firebase
document.getElementById('save-button').addEventListener('click', async () => {
  const name = document.getElementById('user-nama').value.trim();
  const location = document.getElementById('user-lokasi').value.trim();
  const age = document.getElementById('user-umur').value.trim();
  const gender = document.getElementById('user-gender').value;
  const avatar = document.getElementById('user-avatar').files[0];

  // Validasi Nama: Max 15 karakter, hanya huruf dan spasi
  if (!/^[a-zA-Z\s]{1,15}$/.test(name)) {
    return alert("Nama hanya boleh huruf dan spasi, maksimal 15 karakter.");
  }

  // Validasi Lokasi: Max 20 karakter termasuk spasi
  if (location.length > 20) {
    return alert("Lokasi maksimal 20 karakter.");
  }

  // Validasi Umur: Rentang 16–60 tahun
  if (!/^\d{2}$/.test(age) || age < 16 || age > 60) {
    return alert("Usia harus angka antara 16–60 tahun.");
  }

  // Validasi Avatar: Hanya file .jpg
  if (avatar && !avatar.type.includes('image/jpeg')) {
    return alert("Avatar harus file .jpg.");
  }

  let avatarUrl = "icon/default_avatar.jpg";
  if (avatar) {
    avatarUrl = await uploadAvatar(avatar); // Pastikan fungsi uploadAvatar ada dan bekerja
  }

  saveUserProfile({
    nama: name, // Sesuai dengan nama field di Firestore
    lokasi: location,
    umur: parseInt(age, 10),
    gender,
    avatar: avatarUrl
  });
});

// Fungsi untuk upload avatar ke Firebase Storage
async function uploadAvatar(file) {
  try {
    const storageRef = firebase.storage().ref();
    const avatarRef = storageRef.child(`avatars/${auth.currentUser.uid}.jpg`);
    await avatarRef.put(file);
    return await avatarRef.getDownloadURL();
  } catch (err) {
    console.error("Gagal upload avatar:", err);
    return "icon/default_avatar.jpg"; // Kembali ke default jika gagal upload
  }
}

// New User Register send data
auth.createUserWithEmailAndPassword(email, password)
  .then(async (userCredential) => {
    const userReg = userCredential.user;

    // Generate nama unik
    const randomStr = Math.random().toString(36).substring(2, 6); // 4 karakter random
    const uniqueName = `user${randomStr}`;

    // Data default
    const defaultProfile = {
      nama: uniqueName,
      avatar: "icon/default_avatar.jpg",
      status: "User",
      detail: "Bio",
      lokasi: "%",
      umur: "%",
      gender: "%",
      rate: "N/A",
      bergabung: new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' }) // Format: "Desember 2024"
    };

    // Simpan data default ke Firestore
    return firestore.collection('userSS').doc(user.uid).set(defaultProfile);
  })
  .then(() => {
    alert("User berhasil register dan profil dibuat.");
  })
  .catch((error) => {
    console.error("Gagal register user:", error);
  });