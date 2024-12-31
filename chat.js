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
        document.getElementById('gender').src = data.gender;
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
  editNamaBtn.style.display = 'none';

  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userDef = firestore.collection('userSS').doc(user.uid);

      // Ambil data terakhir update nama
      userDef.get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const lastUpdate = data.lastNamaUpdate?.toDate() || null;
          const now = new Date();

          if (lastUpdate && (now - lastUpdate) / (1000 * 60 * 60 * 24) < 30) {
            const remainingDays = 30 - Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
            alert(`Anda hanya bisa mengubah nama setiap 30 hari. Sisa waktu: ${remainingDays} hari.`);
            editNamaBtn.style.display = 'block';
            return;
          }

          // Simpan value lama
          const currentNama = namaEl.textContent.trim();

          // Ubah h2 menjadi input
          namaEl.innerHTML = `
            <input type="text" id="nama-input" value="${currentNama}" maxlength="15" />
            <button class="edul" id="save-nama">Save</button>
            <button class="edul" id="cancel-nama">Batal</button>
          `;

          // Ambil elemen input dan tombol
          const namaInput = document.getElementById('nama-input');
          const saveBtnNama = document.getElementById('save-nama');
          const cancelBtnNama = document.getElementById('cancel-nama');

          // Fokuskan input
          namaInput.focus();

          // Handle klik tombol batal
          cancelBtnNama.addEventListener('click', () => {
            namaEl.textContent = currentNama;
            editNamaBtn.style.display = 'block';
          });

          // Handle klik tombol save
          saveBtnNama.addEventListener('click', async () => {
            const newNama = namaInput.value.trim();

            // Validasi nama
            if (!/^[a-zA-Z\s]{3,15}$/.test(newNama)) {
              alert("Nama hanya boleh huruf dan spasi, 3 - 15 karakter.");
              return;
            }

            // Simpan ke Firestore
            try {
              await userDef.update({
                nama: newNama,
                lastNamaUpdate: firebase.firestore.Timestamp.now() // Simpan waktu update terakhir
              });

              // Kembalikan tampilan awal
              namaEl.textContent = newNama;
              editNamaBtn.style.display = 'block';
            } catch (error) {
              console.error("Gagal update nama:", error);
              alert("Gagal menyimpan nama baru, coba lagi.");
            }
          });
        } else {
          console.error("Dokumen user tidak ditemukan.");
          alert("Terjadi kesalahan, coba lagi.");
          editNamaBtn.style.display = 'block';
        }
      }).catch(error => {
        console.error("Gagal mengambil data user:", error);
        alert("Terjadi kesalahan, coba lagi.");
        editNamaBtn.style.display = 'block';
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
  // Sembunyikan tombol edit avatar
  editAvatarBtn.style.display = 'none';

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

            // Tampilkan kembali tombol edit avatar
            editAvatarBtn.style.display = 'block';

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
        <textarea id="detail-textarea" maxlength="50">${currentDetail}</textarea>
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
        if (newDetail.length > 50) {
          alert("Biodata maksimal 50 karakter.");
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
  editLokasiBtn.style.display = 'none';
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
          
          editLokasiBtn.style.display = 'block';

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
  editUmurBtn.style.display = 'none';
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
          
          editUmurBtn.style.display = 'block';

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
  editGenderBtn.style.display = 'none';

  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Buat elemen select dan tombol save secara dinamis
      const genderSelect = document.createElement('select');
      genderSelect.id = 'gender-select';

      // Daftar pilihan gender dengan URL gambar
      const genderOptions = [
        { text: 'Laki-laki', value: 'https://tolepcoy.github.io/SecretServer/icon/cowok.png' },
        { text: 'Perempuan', value: 'https://tolepcoy.github.io/SecretServer/icon/cewek.png' }
      ];

      genderOptions.forEach(gender => {
        const genderOption = document.createElement('option');
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
        const selectedGender = genderSelect.value; // Ambil nilai URL gambar gender yang dipilih

        // Update gender di Firestore
        try {
          const genderFirestoreRef = firestore.collection('userSS').doc(user.uid);
          await genderFirestoreRef.update({ gender: selectedGender });

          // Update tampilan gender di halaman
          genderEl.innerHTML = `<img src="${selectedGender}" alt="Gender Icon" />`;

          // Tampilkan kembali tombol edit
          editGenderBtn.style.display = 'block';

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

// zoom avatar
document.getElementById('avatar').addEventListener('click', function() {
  this.classList.toggle('zoom');
});

/*! PANEL SETTING */
// UNIQUE ID
// Menunggu user login
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // Ambil UID dan tampilkan di #uniqueID
    const uniqueIDEl = document.getElementById('uniqueID');
    uniqueIDEl.textContent = user.uid; // Menampilkan UID
  } else {
    console.log("User belum login");
  }
});

// EMAIL USER
// Menunggu user login
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // Ambil Email dan tampilkan di #email
    const email = document.getElementById('email');
    email.textContent = user.email; // Menampilkan Email
  } else {
    console.log("User belum login");
  }
});

// DOM UBAH EMAIL
// Elemen DOM
const ubahEmailBtn = document.getElementById('ubah-email');
const emailInputWrapper = document.getElementById('email-input-wrapper');
const emailSekarangInput = document.getElementById('email-sekarang');
const emailBaruInput = document.getElementById('email-baru');
const passwordInput = document.getElementById('password');
const kirimEmailBtn = document.getElementById('kirim-email');

// Event Listener untuk tombol Ubah Email
ubahEmailBtn.addEventListener('click', () => {
  ubahEmailBtn.style.display = 'none'; // Sembunyikan tombol Ubah Email
  emailInputWrapper.style.display = 'block'; // Tampilkan input dan tombol
});

// Event Listener untuk tombol Kirim
kirimEmailBtn.addEventListener('click', async () => {
  const emailSekarang = emailSekarangInput.value.trim();
  const emailBaru = emailBaruInput.value.trim();
  const password = passwordInput.value.trim();

  // Validasi input
  if (!emailSekarang || !emailBaru || !password) {
    alert('Semua field harus diisi.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailSekarang) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailBaru)) {
    alert('Masukkan email yang valid.');
    return;
  }

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        // Pastikan email sekarang sama dengan email user
        if (user.email !== emailSekarang) {
          alert('Email saat ini tidak cocok.');
          return;
        }

        // Reauthenticate user dengan credential
        const credential = firebase.auth.EmailAuthProvider.credential(emailSekarang, password);
        await user.reauthenticateWithCredential(credential);

        // Ubah email
        await user.updateEmail(emailBaru);
        alert('Email berhasil diubah. Silakan cek inbox untuk verifikasi.');

        // (Opsional) Update Firestore jika perlu
        const userDocRef = firestore.collection('userSS').doc(user.uid);
        await userDocRef.update({ email: emailBaru });

        // Reset tampilan
        emailSekarangInput.value = '';
        emailBaruInput.value = '';
        passwordInput.value = '';
        emailInputWrapper.style.display = 'none';
        ubahEmailBtn.style.display = 'block';
      } catch (error) {
        console.error('Gagal mengubah email:', error);
        alert('Terjadi kesalahan. Pastikan semua data valid.');
      }
    } else {
      console.log('User belum login.');
    }
  });
});