// Event listeners untuk sidebar icons
document.getElementById('userProfile').addEventListener('click', function () {
  openPanel('profile');
});

document.getElementById('settings').addEventListener('click', function () {
  openPanel('settingsPanel');
});

document.getElementById('aboutApp').addEventListener('click', function () {
  openPanel('aboutPanel');
});

// Fungsi untuk membuka side panel
function openPanel(panelId) {
  // Tutup semua panel dulu
  const panels = ['profile', 'settingsPanel', 'aboutPanel'];
  panels.forEach(panel => {
    if (panel !== panelId) {
      document.getElementById(panel).style.transform = "translateX(-100%)"; // Geser keluar
    }
  });

  // Buka panel yang diminta
  document.getElementById(panelId).style.transform = "translateX(0)"; // Geser ke dalam
}

// Fungsi untuk menutup side panel
function closePanel(panelId) {
  document.getElementById(panelId).style.transform = "translateX(-100%)"; // Geser keluar
}

// Fungsi untuk memvalidasi input Nama User
function validateName(name) {
  const regex = /^[A-Za-z]+$/; // Hanya huruf A-Z
  return regex.test(name);
}

// Fungsi untuk memvalidasi input Profile Details (tidak boleh angka)
function validateProfileDetails(details) {
  const regex = /^[^0-9]*$/; // Tidak boleh ada angka
  return regex.test(details);
}

// Fungsi untuk memvalidasi Profile Age (hanya dua angka, tidak boleh diawali 0, 7, 8, 9)
function validateAge(age) {
  const regex = /^(?!0|7|8|9)\d{2}$/; // Hanya dua angka, dan tidak boleh dimulai dengan 0, 7, 8, atau 9
  return regex.test(age);
}

// Fungsi untuk menyimpan data ke profile jika valid
function saveProfile() {
  const name = document.getElementById('profileName').value;
  const details = document.getElementById('profileDetails').value;
  const location = document.getElementById('profileLocation').value;
  const age = document.getElementById('profileAge').value;

  // Validasi Nama
  if (!validateName(name)) {
    alert('Nama hanya boleh mengandung huruf A-Z.');
    return;
  }
  
  const newAvatar = document.getElementById('profileAvatarInput').files[0]; // Mengambil file avatar

  if (newAvatar) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('profileAvatarDisplay').src = event.target.result;
    };
    reader.readAsDataURL(newAvatar); // Membaca gambar sebagai data URL
  }

  // Validasi Profile Details
  if (!validateProfileDetails(details)) {
    alert('Profile Details tidak boleh mengandung angka.');
    return;
  }

  // Validasi Profile Location (tidak boleh kosong)
  if (location.trim() === '') {
    alert('Profile Location tidak boleh kosong.');
    return;
  }

  // Validasi Profile Age
  if (!validateAge(age)) {
    alert('Profile Age harus dua angka, tidak boleh diawali 0, 7, 8, atau 9.');
    return;
  }

  // Jika semua validasi lulus, update tampilan profil
  document.getElementById('profileNameDisplay').innerText = name;
  document.getElementById('profileDetailsDisplay').innerText = details;
  document.getElementById('profileLocationDisplay').innerText = location;
  document.getElementById('profileAgeDisplay').innerText = age;

  alert('Profile berhasil disimpan!');
}

// Menambahkan event listener untuk tombol Save di panel Settings
document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);



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

const database = firebase.database();

function saveUserProfile(profileData) {
  const user = auth.currentUser; // Ambil user yang login
  if (user) {
    const userRef = database.ref('users/' + user.uid); // Lokasi data user
    userRef.set(profileData)
      .then(() => {
        console.log("Data user berhasil disimpan.");
      })
      .catch((error) => {
        console.error("Gagal menyimpan data user:", error);
      });
  } else {
    console.log("User belum login.");
  }
}

document.getElementById("saveProfileButton").addEventListener("click", () => {
  const profileData = {
    name: document.getElementById("profileNameInput").value,
    avatar: "default_avatar.png", // Bisa ente ganti sesuai logika upload
    location: document.getElementById("profileLocationInput").value,
    age: parseInt(document.getElementById("profileAgeInput").value),
    gender: document.getElementById("profileGenderSelect").value,
  };

  // Validasi data sebelum simpan
  if (!profileData.name.match(/^[A-Za-z\s]+$/)) {
    alert("Nama hanya boleh huruf A-Z.");
    return;
  }
  if (!profileData.location) {
    alert("Lokasi tidak boleh kosong.");
    return;
  }
  if (!/^[1-6][0-9]$/.test(profileData.age)) {
    alert("Usia harus 10-69 tahun.");
    return;
  }

  saveUserProfile(profileData);
});

function loadUserProfile() {
  const user = auth.currentUser;
  if (user) {
    const userRef = database.ref('users/' + user.uid);
    userRef.once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          const profileData = snapshot.val();
          document.getElementById("profileNameDisplay").innerText = profileData.name || "Belum diisi";
          document.getElementById("profileLocationDisplay").innerText = profileData.location || "Belum diisi";
          document.getElementById("profileAgeDisplay").innerText = profileData.age || "Belum diisi";
          document.getElementById("profileGenderDisplay").innerText = profileData.gender || "Belum diisi";
          // Tambahin logika avatar kalau perlu
        } else {
          console.log("Data user belum ada.");
        }
      })
      .catch((error) => {
        console.error("Gagal mengambil data user:", error);
      });
  } else {
    console.log("User belum login.");
  }
}

// Panggil loadUserProfile() pas user login
auth.onAuthStateChanged((user) => {
  if (user) {
    loadUserProfile();
  }
});







// Contoh event handler sederhana (nanti kita hubungkan ke Firebase)
document.getElementById('messageForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const message = document.getElementById('messageInput').value;
  if (message.trim() !== '') {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += `<p>${message}</p>`;
    document.getElementById('messageInput').value = ''; // Clear input
  }
});
