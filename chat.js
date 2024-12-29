// Event listeners untuk sidebar icons
document.getElementById('userProfile').addEventListener('click', () => openPanel('profile'));
document.getElementById('settings').addEventListener('click', () => openPanel('settingsPanel'));
document.getElementById('aboutApp').addEventListener('click', () => openPanel('aboutPanel'));
document.getElementById('logout').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        alert("You have been logged out");
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
const firestore = firebase.firestore(); // Hanya Firestore yang digunakan

// Simpan data user ke Firebase Firestore
function saveUserProfile(profileData) {
  const user = auth.currentUser;
  if (user) {
    const userRef = firestore.collection('userSS').doc(user.uid);
    userRef.set(profileData)
      .then(() => alert("Data user berhasil disimpan."))
      .catch(err => console.error("Gagal menyimpan data:", err));
  } else {
    alert("User belum login.");
  }
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

  let avatarUrl = "icon/default_avatar.jpg";
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

// Load profil dari Firebase Firestore
function loadUserProfile() {
  const user = auth.currentUser;
  if (user) {
    const userRef = firestore.collection('userSS').doc(user.uid);
    userRef.get()
      .then(snapshot => {
        const profile = snapshot.data();
        document.getElementById('profileNameDisplay').innerText = profile.name || "Belum diisi";
        document.getElementById('profileLocationDisplay').innerText = profile.location || "Belum diisi";
        document.getElementById('profileAgeDisplay').innerText = profile.age || "Belum diisi";
        document.getElementById('profileGenderDisplay').innerText = profile.gender || "Belum diisi";
        document.getElementById('profileAvatarDisplay').src = profile.avatar || "icon/default_avatar.jpg";
      })
      .catch(err => console.error("Gagal mengambil data:", err));
  }
}

document.getElementById('profileAvatarInput').addEventListener('change', function() {
  const fileName = this.files[0] ? this.files[0].name : 'Pilih Avatar';
  document.querySelector('.custom-file-label').textContent = fileName;
});

// Logout User
document.getElementById('logout').addEventListener('click', () => {
  auth.signOut().then(() => alert("Berhasil logout."));
});

// Trigger load profile saat login
auth.onAuthStateChanged(user => {
  if (user) loadUserProfile();
});

function updateUserProfile(newData) {
  const user = auth.currentUser;
  if (user) {
    const userRef = firestore.collection('userSS').doc(user.uid);

    userRef.update(newData)
      .then(() => {
        alert("Profil berhasil diupdate!");
      })
      .catch(err => {
        console.error("Gagal update data:", err);
      });
  } else {
    alert("User belum login.");
  }
}

// Data yang ingin diupdate
const newProfileData = {
  age: 39,  // Contoh umur
  location: "Perum, Sako"  // Contoh lokasi
};

// Panggil fungsi update
updateUserProfile(newProfileData);

document.getElementById('updateProfileButton').addEventListener('click', () => {
  const newAge = document.getElementById('profileAgeInput').value;
  const newLocation = document.getElementById('profileLocationInput').value;

  updateUserProfile({
    age: newAge,
    location: newLocation
  });
});

// DOM Elements untuk chat
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const sendButton = document.getElementById('sendButton');

// User Info (sample static values, bisa dinamis dari Firebase)
const username = 'Bang Tolep';
const userAvatar = 'icon/default_avatar.jpg';

// Function untuk menampilkan pesan
function displayMessage(message, sender, avatar) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('avatar');
    avatarImg.src = avatar;
    messageDiv.appendChild(avatarImg);

    const messageContent = document.createElement('div');
    messageContent.classList.add('messageContent');
    messageContent.innerHTML = `<strong>${sender}</strong><p>${message}</p>`;
    messageDiv.appendChild(messageContent);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Submit message event
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;
    if (message.trim()) {
        // Save message to Firestore
        firestore.collection('chats').add({
            message: message,
            sender: username,
            avatar: userAvatar,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Clear input field
        messageInput.value = '';
    }
});

// Get messages from Firestore
firestore.collection('chats').orderBy('timestamp')
    .onSnapshot((snapshot) => {
        chatBox.innerHTML = ''; // Clear previous messages
        snapshot.forEach((doc) => {
            const data = doc.data();
            displayMessage(data.message, data.sender, data.avatar);
        });
    });
