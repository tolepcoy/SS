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
        document.getElementById('nama').innerText = data.nama;
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
});

// EDIT NAMA
const namaEl = document.getElementById('nama');
const editNamaBtn = document.getElementById('edit-nama');

// Fungsi untuk handle klik tombol edit
editNamaBtn.addEventListener('click', () => {
  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Simpan value lama
      const currentNama = namaEl.textContent.trim();

      // Ubah h2 menjadi input
      namaEl.innerHTML = `
        <input type="text" id="nama-input" value="${currentNama}" maxlength="15" />
        <button class="edul" id="save-nama">Save</button>
      `;

      // Ambil elemen input dan tombol save
      const namaInput = document.getElementById('nama-input');
      const saveBtnNama = document.getElementById('save-nama');

      // Fokuskan input
      namaInput.focus();

      // Handle klik tombol save
      saveBtnNama.addEventListener('click', async () => {
        const newNama = namaInput.value.trim();

        // Validasi nama
        if (!/^[a-zA-Z\s]{1,15}$/.test(newNama)) {
          alert("Nama hanya boleh huruf dan spasi, maksimal 15 karakter.");
          return;
        }

        // Simpan ke Firestore
        try {
          const userDef = firestore.collection('userSS').doc(user.uid);
          await userDef.update({ nama: newNama }); // Update field "nama"

          // Kembalikan tampilan awal
          namaEl.textContent = newNama;
        } catch (error) {
          console.error("Gagal update nama:", error);
          alert("Gagal menyimpan nama baru, coba lagi.");
        }
      });
    } else {
      console.log("User not logged in");
    }
  });
});

// EDIT AVATAR
const avatarEl = document.getElementById('avatar');
const editAvatarBtn = document.getElementById('edit-avatar');

// Fungsi untuk handle klik tombol edit avatar
editAvatarBtn.addEventListener('click', () => {
  // Cek apakah elemen input dan tombol Save sudah ada
  if (document.getElementById('avatar-input') || document.getElementById('save-avatar')) {
    return; // Jangan buat elemen baru jika sudah ada
  }

  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Buat elemen input file dan tombol save secara dinamis
      const avatarInputFile = document.createElement('input');
      avatarInputFile.type = 'file';
      avatarInputFile.id = 'avatar-input';
      avatarInputFile.accept = 'image/jpeg';

      const saveAvatarBtn = document.createElement('button');
  saveAvatarBtn.id = 'save-avatar';
  saveAvatarBtn.classList.add('edul');
  saveAvatarBtn.textContent = 'Save';

      // Tambahkan elemen input file dan tombol save setelah avatar
      const avatarParentDiv = avatarEl.parentNode;
      avatarParentDiv.appendChild(avatarInputFile);
      avatarParentDiv.appendChild(saveAvatarBtn);

      // Handle klik tombol save
      saveAvatarBtn.addEventListener('click', async () => {
        const selectedAvatarFile = avatarInputFile.files[0]; // Ambil file yang dipilih

        if (!selectedAvatarFile) {
          alert("Silakan pilih gambar terlebih dahulu.");
          return;
        }

        // Validasi format file
        if (selectedAvatarFile.type !== 'image/jpeg') {
          alert("Hanya file gambar JPEG yang diperbolehkan.");
          return;
        }

        // Upload gambar ke Imgur
        const avatarFormData = new FormData();
        avatarFormData.append('image', selectedAvatarFile);

        try {
          const avatarResponse = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer 6e72b748a0d7becd6751810b6c1557de073ccb0e' // Ganti dengan token Imgur milikmu
            },
            body: avatarFormData
          });

          const avatarResult = await avatarResponse.json();

          if (avatarResult.success) {
            const avatarImageUrl = avatarResult.data.link; // Dapatkan URL gambar yang di-upload

            // Update avatar di Firestore
            const avatarFirestoreRef = firestore.collection('userSS').doc(user.uid);
            await avatarFirestoreRef.update({ avatar: avatarImageUrl });

            // Update tampilan gambar avatar di halaman
            avatarEl.src = avatarImageUrl;

            // Hapus elemen input dan tombol save setelah selesai
            avatarInputFile.remove();
            saveAvatarBtn.remove();
          } else {
            alert("Gagal upload gambar, coba lagi.");
          }
        } catch (avatarError) {
          console.error("Gagal upload gambar:", avatarError);
          alert("Terjadi kesalahan, coba lagi.");
        }
      });
    } else {
      console.log("User not logged in");
    }
  });
});

// EDIT DETAIL
const detailEl = document.getElementById('detail');
const editDetailBtn = document.getElementById('edit-detail');

// Fungsi untuk handle klik tombol edit detail
editDetailBtn.addEventListener('click', () => {
  // Sembunyikan tombol edit-detail
  editDetailBtn.style.display = 'none';

  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Simpan value lama
      const currentDetail = detailEl.textContent.trim();

      // Ubah div menjadi textarea dan tambahkan tombol save
      detailEl.innerHTML = `
        <textarea id="detail-textarea" maxlength="200">${currentDetail}</textarea>
        <button class="edul" id="save-detail">Save</button>
      `;

      // Ambil elemen textarea dan tombol save
      const detailTextarea = document.getElementById('detail-textarea');
      const saveDetailBtn = document.getElementById('save-detail');

      // Fokuskan textarea
      detailTextarea.focus();

      // Handle klik tombol save
      saveDetailBtn.addEventListener('click', async () => {
        const newDetail = detailTextarea.value.trim();

        // Validasi isi biodata
        if (newDetail.length > 200) {
          alert("Biodata maksimal 200 karakter.");
          return;
        }

        // Simpan ke Firestore
        try {
          const detailRef = firestore.collection('userSS').doc(user.uid);
          await detailRef.update({ detail: newDetail });

          // Kembalikan tampilan awal
          detailEl.textContent = newDetail;

          // Tampilkan kembali tombol edit-detail
          editDetailBtn.style.display = 'block';
        } catch (error) {
          console.error("Gagal update biodata:", error);
          alert("Gagal menyimpan biodata baru, coba lagi.");
        }
      });
    } else {
      console.log("User not logged in");
    }
  });
});

// EDIT LOKASI
const lokasiEl = document.getElementById('lokasi');
const editLokasiBtn = document.getElementById('edit-lokasi');

// Fungsi untuk handle klik tombol edit lokasi
editLokasiBtn.addEventListener('click', () => {
  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Buat elemen select dan tombol save secara dinamis
      const lokasiSelect = document.createElement('select');
      lokasiSelect.id = 'lokasi-select';

      // Daftar pilihan lokasi
      const lokasiOptions = ['Perum', 'Skojo', 'Kertapati', 'Boom Baru', 'Plaju', 'Jakabaring'];

      lokasiOptions.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        lokasiSelect.appendChild(option);
      });

      const saveLokasiBtn = document.createElement('button');
      saveLokasiBtn.id = 'save-lokasi';
      saveLokasiBtn.classList.add('edul');
      saveLokasiBtn.textContent = 'Save';

      // Tambahkan elemen select dan tombol save setelah lokasi
      const lokasiParentDiv = lokasiEl.parentNode;
      lokasiParentDiv.appendChild(lokasiSelect);
      lokasiParentDiv.appendChild(saveLokasiBtn);

      // Handle klik tombol save
      saveLokasiBtn.addEventListener('click', async () => {
        const selectedLokasi = lokasiSelect.value; // Ambil nilai lokasi yang dipilih

        // Update lokasi di Firestore
        try {
          const lokasiFirestoreRef = firestore.collection('userSS').doc(user.uid);
          await lokasiFirestoreRef.update({ lokasi: selectedLokasi });

          // Update tampilan lokasi di halaman
          lokasiEl.textContent = selectedLokasi;

          // Hapus elemen select dan tombol save setelah selesai
          lokasiSelect.remove();
          saveLokasiBtn.remove();
        } catch (error) {
          console.error("Gagal update lokasi:", error);
          alert("Terjadi kesalahan, coba lagi.");
        }
      });
    } else {
      console.log("User not logged in");
    }
  });
});

// EDIT UMUR
const umurEl = document.getElementById('umur');
const editUmurBtn = document.getElementById('edit-umur');

// Fungsi untuk handle klik tombol edit umur
editUmurBtn.addEventListener('click', () => {
  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Buat elemen select dan tombol save secara dinamis
      const umurSelect = document.createElement('select');
      umurSelect.id = 'umur-select';

      // Daftar pilihan umur dari 16 sampai 60
      const umurOptions = [];
      for (let i = 16; i <= 60; i++) {
        umurOptions.push(i);
      }

      umurOptions.forEach(age => {
        const option = document.createElement('option');
        option.value = age;
        option.textContent = age;
        umurSelect.appendChild(option);
      });

      const saveUmurBtn = document.createElement('button');
      saveUmurBtn.id = 'save-umur';
      saveUmurBtn.classList.add('edul');
      saveUmurBtn.textContent = 'Save';

      // Tambahkan elemen select dan tombol save setelah umur
      const umurParentDiv = umurEl.parentNode;
      umurParentDiv.appendChild(umurSelect);
      umurParentDiv.appendChild(saveUmurBtn);

      // Handle klik tombol save
      saveUmurBtn.addEventListener('click', async () => {
        const selectedUmur = umurSelect.value; // Ambil nilai umur yang dipilih

        // Update umur di Firestore
        try {
          const umurFirestoreRef = firestore.collection('userSS').doc(user.uid);
          await umurFirestoreRef.update({ umur: selectedUmur });

          // Update tampilan umur di halaman
          umurEl.textContent = selectedUmur;

          // Hapus elemen select dan tombol save setelah selesai
          umurSelect.remove();
          saveUmurBtn.remove();
        } catch (error) {
          console.error("Gagal update umur:", error);
          alert("Terjadi kesalahan, coba lagi.");
        }
      });
    } else {
      console.log("User not logged in");
    }
  });
});

// EDIT GENDER
const genderEl = document.getElementById('gender');
const editGenderBtn = document.getElementById('edit-gender');

// Fungsi untuk handle klik tombol edit gender
editGenderBtn.addEventListener('click', () => {
  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Buat elemen select dan tombol save secara dinamis
      const genderSelect = document.createElement('select');
      genderSelect.id = 'gender-select';

      // Daftar pilihan gender
      const genderOptions = [
        { text: 'Laki-laki', value: '♂' },
        { text: 'Perempuan', value: '<span id="cewek">♀</span>' }
      ];

      genderOptions.forEach(gender => {
        const genderOption = document.createElement('option'); // Ganti nama variabel
        genderOption.value = gender.value;
        genderOption.textContent = gender.text;
        genderSelect.appendChild(genderOption);
      });

      const saveGenderBtn = document.createElement('button');
      saveGenderBtn.id = 'save-gender';
      saveGenderBtn.classList.add('edul');
      saveGenderBtn.textContent = 'Save';

      // Tambahkan elemen select dan tombol save setelah gender
      const genderParentDiv = genderEl.parentNode;
      genderParentDiv.appendChild(genderSelect);
      genderParentDiv.appendChild(saveGenderBtn);

      // Handle klik tombol save
      saveGenderBtn.addEventListener('click', async () => {
        const selectedGender = genderSelect.value; // Ambil nilai gender yang dipilih

        // Update gender di Firestore
        try {
          const genderFirestoreRef = firestore.collection('userSS').doc(user.uid);
          await genderFirestoreRef.update({ gender: selectedGender });

          // Update tampilan gender di halaman
          genderEl.textContent = selectedGender;

          // Hapus elemen select dan tombol save setelah selesai
          genderSelect.remove();
          saveGenderBtn.remove();
        } catch (error) {
          console.error("Gagal update gender:", error);
          alert("Terjadi kesalahan, coba lagi.");
        }
      });
    } else {
      console.log("User not logged in");
    }
  });
});