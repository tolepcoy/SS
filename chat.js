// Event listeners untuk sidebar icons
document.getElementById('userProfile').addEventListener('click', () => openPanel('profile'));
document.getElementById('settings').addEventListener('click', () => openPanel('settingsPanel'));
document.getElementById('aboutApp').addEventListener('click', () => openPanel('aboutPanel'));

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

// Fungsi validasi
function validateName(name) {
  return /^[A-Za-z\s]+$/.test(name); // Hanya huruf dan spasi
}
function validateProfileDetails(details) {
  return /^[^0-9]*$/.test(details); // Tidak boleh angka
}
function validateAge(age) {
  return /^(?!0|7|8|9)\d{2}$/.test(age); // Dua digit tanpa 0, 7, 8, 9
}

// Fungsi simpan data lokal
function saveProfile() {
  const name = document.getElementById('profileName').value;
  const details = document.getElementById('profileDetails').value;
  const location = document.getElementById('profileLocation').value;
  const age = document.getElementById('profileAge').value;
  const avatar = document.getElementById('profileAvatarInput').files[0];

  // Validasi
  if (!validateName(name)) return alert('Nama hanya boleh huruf.');
  if (!validateProfileDetails(details)) return alert('Detail tidak boleh angka.');
  if (!location.trim()) return alert('Lokasi tidak boleh kosong.');
  if (!validateAge(age)) return alert('Usia harus dua angka, tidak diawali 0, 7, 8, 9.');

  // Update tampilan
  document.getElementById('profileNameDisplay').innerText = name;
  document.getElementById('profileDetailsDisplay').innerText = details;
  document.getElementById('profileLocationDisplay').innerText = location;
  document.getElementById('profileAgeDisplay').innerText = age;

  if (avatar) {
    const reader = new FileReader();
    reader.onload = e => document.getElementById('profileAvatarDisplay').src = e.target.result;
    reader.readAsDataURL(avatar);
  }

  alert('Profile berhasil disimpan!');
}

document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);

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
const database = firebase.database();
const storage = firebase.storage();

// Simpan data user ke Firebase
function saveUserProfile(profileData) {
  const user = auth.currentUser;
  if (user) {
    const userRef = database.ref('users/' + user.uid);
    userRef.set(profileData)
      .then(() => alert("Data user berhasil disimpan."))
      .catch(err => console.error("Gagal menyimpan data:", err));
  } else {
    alert("User belum login.");
  }
}

// Upload avatar ke Firebase Storage
function uploadAvatar(file) {
  const user = auth.currentUser;
  if (user && file) {
    const storageRef = storage.ref('avatars/' + user.uid);
    return storageRef.put(file).then(snapshot => snapshot.ref.getDownloadURL());
  }
  return Promise.resolve(null);
}

// Fungsi untuk handle save profile dengan Firebase
document.getElementById('saveProfileButton').addEventListener('click', async () => {
  const name = document.getElementById('profileName').value;
  const location = document.getElementById('profileLocation').value;
  const age = document.getElementById('profileAge').value;
  const gender = document.getElementById('profileGenderInput').value;
  const avatarFile = document.getElementById('profileAvatarInput').files[0];

  if (!validateName(name)) return alert("Nama tidak valid.");
  if (!location.trim()) return alert("Lokasi tidak boleh kosong.");
  if (!/^[1-6][0-9]$/.test(age)) return alert("Usia harus 10-69 tahun.");

  let avatarUrl = "default_avatar.png";
  if (avatarFile) {
    avatarUrl = await uploadAvatar(avatarFile);
  }

  saveUserProfile({
    name,
    location,
    age: parseInt(age, 10),
    gender,
    avatar: avatarUrl
  });
});

// Load profil dari Firebase
function loadUserProfile() {
  const user = auth.currentUser;
  if (user) {
    const userRef = database.ref('users/' + user.uid);
    userRef.once('value')
      .then(snapshot => {
        const profile = snapshot.val();
        document.getElementById('profileNameDisplay').innerText = profile.name || "Belum diisi";
        document.getElementById('profileLocationDisplay').innerText = profile.location || "Belum diisi";
        document.getElementById('profileAgeDisplay').innerText = profile.age || "Belum diisi";
        document.getElementById('profileGenderDisplay').innerText = profile.gender || "Belum diisi";
        document.getElementById('profileAvatarDisplay').src = profile.avatar || "default_avatar.png";
      })
      .catch(err => console.error("Gagal mengambil data:", err));
  }
}

// Logout User
document.getElementById('logoutButton').addEventListener('click', () => {
  auth.signOut().then(() => alert("Berhasil logout."));
});

// Trigger load profile saat login
auth.onAuthStateChanged(user => {
  if (user) loadUserProfile();
});
