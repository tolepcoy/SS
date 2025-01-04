/*! ====  FIREBASE CONFIG  ==== */
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

// Cek status login dan verifikasi email
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Cek jika email belum diverifikasi
    if (!user.emailVerified) {
      alert('Anda belum memverifikasi email!');
    }

    // Cek jika user adalah admin
    firestore.collection("Userss").doc(user.uid).get().then((doc) => {
      if (doc.exists && doc.data().isAdmin) {
        bersihkanChatboxLama();
      }
    });
  }
});

// Fungsi untuk membersihkan chat lama
function bersihkanChatboxLama() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 1000); // 5mmt
  
  const cutoffTimestamp = firebase.firestore.Timestamp.fromDate(cutoff);

  firestore.collection("chatbox")
    .where("timestamp", "<", cutoffTimestamp)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete().catch((error) => console.error("Error deleting document:", error));
      });
      console.log("Dokumen lama berhasil dihapus.");
    })
    .catch((error) => console.error("Error fetching documents:", error));
}

/*! ===== BODY ELEMENT ===== */
// Fungsi untuk menutup side panel
function closePanel(panelId) {
  document.getElementById(panelId).style.transform = "translateX(-100%)";
}

// Fungsi untuk membuka side panel
function openPanel(panelId) {
  document.getElementById(panelId).style.transform = "translateX(0%)";
}

// Fungsi untuk reset class 'ahuy'
function resetAhuy() {
  document.querySelectorAll('.icon').forEach(icon => {
    icon.classList.remove('ahuy');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('userProfile').addEventListener('click', () => {
    resetAhuy();
    openPanel('profile');
    document.getElementById('userProfile').classList.add('ahuy');
  });
  
  document.getElementById('settings').addEventListener('click', () => {
    resetAhuy();
    openPanel('settingsPanel');
    document.getElementById('settings').classList.add('ahuy');
  });

  document.getElementById('secretSide').addEventListener('click', () => {
    resetAhuy();
    openPanel('secretSidePanel');
    document.getElementById('secretSide').classList.add('ahuy');
  });

  document.getElementById('logout').addEventListener('click', () => {
  const dialog = document.getElementById('custom-logout-dialog');
  dialog.style.display = 'flex';

  document.getElementById('confirm-logout').addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        window.location.replace("https://tolepcoy.github.io/SS/login-form.html");
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
/* kustom dialog end */

// Fungsi untuk membuka side panel
function openPanel(panelId) {
  const panels = ['profile', 'settingsPanel', 'secretSidePanel'];
  panels.forEach(panel => {
    document.getElementById(panel).style.transform = panel === panelId ? "translateX(0)" : "translateX(-100%)";
  });
}

// Fungsi untuk menampilkan profil user setelah login
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userRef = firestore.collection('SS').doc(user.uid); // Referensi koleksi SS

    // Pasang snapshot listener untuk data user
    userRef.onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data();
        updateProfile(data, 'User'); // Fungsi untuk update UI
      } else {
        console.log("Data user tidak ditemukan di koleksi SS.");
      }
    }, error => console.error("Error listening to user data:", error));
  } else {
    console.log("User not logged in");
  }
});

// Fungsi untuk memperbarui UI profil
function updateProfile(data, kategori) {
  document.getElementById('nama').innerText = data.nama || 'userSS';
  document.getElementById('avatar').src = data.avatar || 'icon/default_avatar.png';
  document.getElementById('OLstate').innerHTML = data.OLstate || 'Offline';
  document.getElementById('level').src = data.level || 'level/b1.png';
  document.getElementById('detail').innerText = data.detail || 'Bio';
  document.getElementById('lokasi').innerText = data.lokasi || 'Palembang';
  document.getElementById('umur').innerText = data.umur || 'Umur tidak tersedia';
  document.getElementById('gender').src = data.gender || 'icon/defaultgender.png';
  document.getElementById('rate').innerHTML = data.rate || 'No Rating';
  document.getElementById('bergabung').innerHTML = data.bergabung || 'Tidak diketahui';
  document.getElementById('email').innerHTML = data.email || 'Tidak ada email';
  document.getElementById('verimail').innerHTML = data.verimail || 'Belum Verifikasi ✘';
  document.getElementById('facebook').innerHTML = data.facebook || 'Tidak Terhubung ✘';
  
  console.log(`Profil berhasil diperbarui untuk ${kategori}`);
}
});

// EDIT NAMA
const namaEl = document.getElementById('nama');
const editNamaBtn = document.getElementById('edit-nama');
// CUSTOM ALERT
function showAlert(message) {
  const alertBox2 = document.createElement('div');
  alertBox2.classList.add('custom-alert');
  alertBox2.innerHTML = `
<div class="alert-box">
<span class="alert-message">${message}</span>
<button class="alert-ok">OK</button>
</div>`;
    document.body.appendChild(alertBox);
    alertBox.style.display = 'flex';
    alertBox.querySelector('.alert-ok').addEventListener('click', () => {
      alertBox.style.display = 'none';
      document.body.removeChild(alertBox);
});}
// END CUSTOM ALERT

// Fungsi untuk handle klik tombol edit
editNamaBtn.addEventListener('click', () => {
  editNamaBtn.style.display = 'none';

  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userDef = firestore.collection('SS').doc(user.uid);

      // Ambil data terakhir update nama
      userDef.get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const lastUpdate = data.lastNamaUpdate?.toDate() || null;
          const now = new Date();

          if (lastUpdate && (now - lastUpdate) / (1000 * 60 * 60 * 24) < 30) {
            const remainingDays = 30 - Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
            showAlert(`Anda hanya bisa mengubah nama setiap 30 hari. Sisa waktu: ${remainingDays} hari.`);
            editNamaBtn.style.display = 'block';
            return;
          }

          // Simpan value lama
          const currentNama = namaEl.textContent.trim();

          // Ubah h2 menjadi input
          namaEl.innerHTML = `
            <input type="text" id="nama-input" value="${currentNama}" maxlength="15" /><br>
            <button class="edul" id="cancel-nama">Batal</button> 
&nbsp;&nbsp;&nbsp;&nbsp;
            <button class="edul" id="save-nama">Simpan</button>
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
              showAlert("Nama hanya boleh huruf dan spasi, 3 - 15 karakter.");
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
              showAlert("Gagal menyimpan nama baru, coba lagi.");
            }
          });
        } else {
          console.error("Dokumen user tidak ditemukan.");
          showAlert("Terjadi kesalahan, coba lagi.");
          editNamaBtn.style.display = 'block';
        }
      }).catch(error => {
        console.error("Gagal mengambil data user:", error);
        showAlert("Terjadi kesalahan, coba lagi.");
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
  avatarEl.style.display = 'none';

  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Buat elemen input file dan tombol save secara dinamis
      const avatarInputFile = document.createElement('input');
      avatarInputFile.type = 'file';
      avatarInputFile.id = 'avatar-input';
      avatarInputFile.accept = 'image/jpeg';

      const cancelAvatarBtn = document.createElement('button');
      cancelAvatarBtn.id = 'cancel-avatar';
      cancelAvatarBtn.classList.add('edul');
      cancelAvatarBtn.textContent = 'Batal';

      const saveAvatarBtn = document.createElement('button');
      saveAvatarBtn.id = 'save-avatar';
      saveAvatarBtn.classList.add('edul');
      saveAvatarBtn.textContent = 'Simpan';

      // Tambahkan elemen input file dan tombol save dan cancel setelah avatar
      const avatarParentDiv = avatarEl.parentNode;
      avatarParentDiv.appendChild(avatarInputFile);
      avatarParentDiv.appendChild(cancelAvatarBtn);
      avatarParentDiv.appendChild(saveAvatarBtn);
      
      // Handle klik tombol cancel
      cancelAvatarBtn.addEventListener('click', () => {
        editAvatarBtn.style.display = 'block';
        avatarEl.style.display = 'block';
        avatarInputFile.remove();
        saveAvatarBtn.remove();
        cancelAvatarBtn.remove();
     });

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
              'Authorization': 'Bearer 6e72b748a0d7becd6751810b6c1557de073ccb0e' // Imgur
            },
            body: avatarFormData
          });

          const avatarResult = await avatarResponse.json();

          if (avatarResult.success) {
            const avatarImageUrl = avatarResult.data.link; // Dapatkan URL gambar yang di-upload

            // Update avatar di Firestore
            const avatarFirestoreRef = firestore.collection('SS').doc(user.uid);
            await avatarFirestoreRef.update({ avatar: avatarImageUrl });

            // Update tampilan gambar avatar di halaman
            avatarEl.src = avatarImageUrl;

            // Tampilkan kembali tombol edit avatar
            editAvatarBtn.style.display = 'block';
            avatarEl.style.display = 'block';

            // Hapus elemen input dan tombol save setelah selesai
            avatarInputFile.remove();
            saveAvatarBtn.remove();
            cancelAvatarBtn.remove();
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
        <textarea id="detail-textarea" maxlength="50">${currentDetail}</textarea><br>
        <button class="edul" id="cancel-detail">Batal</button> 
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button class="edul" id="save-detail">Simpan</button>
      `;

      // Ambil elemen textarea dan tombol save
      const detailTextarea = document.getElementById('detail-textarea');
      const cancelDetailBtn = document.getElementById('cancel-detail');
      const saveDetailBtn = document.getElementById('save-detail');

      // Fokuskan textarea
      detailTextarea.focus();

      // Handle klik tombol cancel
      cancelDetailBtn.addEventListener('click', () => {
    // Kembalikan tampilan awal
   detailEl.textContent = currentDetail;
   editDetailBtn.style.display = 'block';
   });

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
          const detailRef = firestore.collection('SS').doc(user.uid);
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
      // Buat elemen select dan tombol save dan cancel secara dinamis
      const lokasiSelect = document.createElement('select');
      lokasiSelect.id = 'lokasi-select';

      // Daftar pilihan lokasi utama
      const lokasiOptions = [
        'Alang-Alang Lebar', 'Bukit Kecil', 'Gandus', 'Ilir Barat I', 
        'Ilir Barat II', 'Ilir Timur I', 'Ilir Timur II', 'Ilir Timur III', 
        'Jakabaring', 'Kalidoni', 'Kemuning', 'Kertapati', 'Plaju', 'Sako', 
        'Seberang Ulu I', 'Seberang Ulu II', 'Sematang Borang', 'Sukarami'
      ];

      // Daftar pilihan lokasi spesifik
      const lokasiSpesifik = [
        'Boom Baru', 'Cinde', 'Jakabaring', 'Kalidoni', 'Kenten', 
        'Kertapati', 'Km 12', 'Pasar Kuto', 'Lemabang', 'Mata Merah', 'Perum', 'Plaju', 'Pusri', 'Rusun', 'Sekip', 'Skojo', 'Tangga Buntung', 'Way Hitam'
      ];

      // Tambahkan opsi lokasi utama
      lokasiOptions.forEach(location => {
        const lokasiOption = document.createElement('option');
        lokasiOption.value = location;
        lokasiOption.textContent = location;
        lokasiSelect.appendChild(lokasiOption);
      });

      // Tambahkan garis horizontal (sebagai separator)
      const separator = document.createElement('option');
      separator.disabled = true;
      separator.style.textAlign = 'center';
      separator.textContent = '--- POPULER UMUM ---';
      lokasiSelect.appendChild(separator);

      // Tambahkan opsi lokasi spesifik
      lokasiSpesifik.forEach(location => {
        const spesifikOption = document.createElement('option');
        spesifikOption.value = location;
        spesifikOption.textContent = location;
        lokasiSelect.appendChild(spesifikOption);
      });

     const cancelLokasiBtn = document.createElement('button');
     cancelLokasiBtn.id = 'cancel-lokasi';
     cancelLokasiBtn.classList.add('edul');
     cancelLokasiBtn.textContent = 'Batal';

      const saveLokasiBtn = document.createElement('button');
      saveLokasiBtn.id = 'save-lokasi';
      saveLokasiBtn.classList.add('edul');
      saveLokasiBtn.textContent = 'Simpan';

      // Tambahkan elemen select dan tombol save dan cancel setelah lokasi
      const lokasiParentDiv = lokasiEl.parentNode;
      lokasiParentDiv.appendChild(lokasiSelect);
      lokasiParentDiv.appendChild(cancelLokasiBtn);
      lokasiParentDiv.appendChild(saveLokasiBtn);
      
      // Handle klik tombol cancel
      cancelLokasiBtn.addEventListener('click', () => {
    editLokasiBtn.style.display = 'block';
    lokasiSelect.remove();
    cancelLokasiBtn.remove();
    saveLokasiBtn.remove();
  });

      // Handle klik tombol save
      saveLokasiBtn.addEventListener('click', async () => {
        const selectedLokasi = lokasiSelect.value;

        // Update lokasi di Firestore
        try {
          const lokasiFirestoreRef = firestore.collection('SS').doc(user.uid);
          await lokasiFirestoreRef.update({ lokasi: selectedLokasi });

          // Update tampilan lokasi di halaman
          lokasiEl.textContent = selectedLokasi;
          
          editLokasiBtn.style.display = 'block';

          // Hapus elemen select dan tombol save setelah selesai
          lokasiSelect.remove();
          cancelLokasiBtn.remove();
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

editUmurBtn.addEventListener('click', () => {
  editUmurBtn.style.display = 'none';
  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Buat elemen select dan tombol save dan cancel secara dinamis
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

const cancelUmurBtn = document.createElement('button');
      cancelUmurBtn.id = 'cancel-umur';
      cancelUmurBtn.classList.add('edul');
      cancelUmurBtn.textContent = 'Batal';

      const saveUmurBtn = document.createElement('button');
      saveUmurBtn.id = 'save-umur';
      saveUmurBtn.classList.add('edul');
      saveUmurBtn.textContent = 'Simpan';

      // Tambahkan elemen select dan tombol save dan cancel setelah umur
      const umurParentDiv = umurEl.parentNode;
      umurParentDiv.appendChild(umurSelect);
      umurParentDiv.appendChild(cancelUmurBtn);
      umurParentDiv.appendChild(saveUmurBtn);
      
      // Handle klik tombol cancel
      cancelUmurBtn.addEventListener('click', () => {
    editUmurBtn.style.display = 'block';
    umurSelect.remove();
    cancelUmurBtn.remove();
    saveUmurBtn.remove();
 });

      // Handle klik tombol save
      saveUmurBtn.addEventListener('click', async () => {
        const selectedUmur = umurSelect.value;

        // Update umur di Firestore
        try {
          const umurFirestoreRef = firestore.collection('SS').doc(user.uid);
          await umurFirestoreRef.update({ umur: selectedUmur });

          // Update tampilan umur di halaman
          umurEl.textContent = selectedUmur;
          
          editUmurBtn.style.display = 'block';

          // Hapus elemen select dan tombol save setelah selesai
          umurSelect.remove();
          cancelUmurBtn.remove();
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
      // Buat elemen select dan tombol save dan cancel secara dinamis
      const genderSelect = document.createElement('select');
      genderSelect.id = 'gender-select';

      // Daftar pilihan gender dengan URL gambar
      const genderOptions = [
        { text: 'Laki-laki', value: 'icon/cowok.png' },
        { text: 'Perempuan', value: 'icon/cewek.png' }
      ];

      genderOptions.forEach(gender => {
        const genderOption = document.createElement('option');
        genderOption.value = gender.value;
        genderOption.textContent = gender.text;
        genderSelect.appendChild(genderOption);
      });
      
      const cancelGenderBtn = document.createElement('button');
      cancelGenderBtn.id = 'cancel-gender';
      cancelGenderBtn.classList.add('edul');
      cancelGenderBtn.textContent = 'Batal';

      const saveGenderBtn = document.createElement('button');
      saveGenderBtn.id = 'save-gender';
      saveGenderBtn.classList.add('edul');
      saveGenderBtn.textContent = 'Simpan';

      // Tambahkan elemen select dan tombol save setelah gender
      const genderParentDiv = genderEl.parentNode;
      genderParentDiv.appendChild(genderSelect);
      genderParentDiv.appendChild(cancelGenderBtn);
      genderParentDiv.appendChild(saveGenderBtn);
      
  // Handle klik tombol cancel
      cancelGenderBtn.addEventListener('click', () => {
   editGenderBtn.style.display = 'block';
   genderSelect.remove();
   cancelGenderBtn.remove();
   saveGenderBtn.remove();
 });

      // Handle klik tombol save
      saveGenderBtn.addEventListener('click', async () => {
        const selectedGender = genderSelect.value; // Ambil nilai URL gambar gender yang dipilih

        // Update gender di Firestore
        try {
          const genderFirestoreRef = firestore.collection('SS').doc(user.uid);
          await genderFirestoreRef.update({ gender: selectedGender });

          // Update tampilan gender di halaman
          genderEl.innerHTML = `<img src="${selectedGender}" alt="Gender Icon" />`;

          // Tampilkan kembali tombol edit
          editGenderBtn.style.display = 'block';

          // Hapus elemen select dan tombol save setelah selesai
          genderSelect.remove();
          cancelGenderBtn.remove();
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
firebase.auth().onAuthStateChanged(user => {
  if (user) {

    const uniqueIDEl = document.getElementById('uniqueID');
    uniqueIDEl.textContent = user.uid;
  } else {
    console.log("User belum login");
  }
});

// EMAIL USER
// Menunggu user login
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const email = document.getElementById('email');
    email.textContent = user.email;
  } else {
    console.log("User belum login");
  }
});

// STATUS VERIFIKASI EMAIL
const statusVerifikasiEl = document.getElementById('verimail');

// Fungsi untuk update status verifikasi
function cekStatusVerifikasi() {
  // Pastikan user login
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.reload() // Reload data user untuk memastikan data terbaru
        .then(() => {
          const db = firebase.firestore();  // Ambil instance Firestore
          const userDoc = db.collection('SS').doc(user.uid);  // Ambil dokumen berdasarkan UID user

          if (user.emailVerified) {
            statusVerifikasiEl.textContent = 'Verifikasi √';
            statusVerifikasiEl.style.color = '#0f0';
            statusVerifikasiEl.style.cursor = 'default'; // Tidak clickable jika sudah diverifikasi
            // Update status verifikasi di Firestore
            userDoc.update({
              email: user.email, // Update email
              verimail: 'Verifikasi √' // Update status verifikasi
            })
            .then(() => {
              console.log('Email di verifikasi');
            })
            .catch(error => {
              console.error('Gagal mengupdate status verifikasi di Firestore:', error);
            });
          } else {
            statusVerifikasiEl.textContent = 'Belum Verifikasi ✘';
            statusVerifikasiEl.style.color = '#f55';
            statusVerifikasiEl.style.cursor = 'pointer';
            
            statusVerifikasiEl.onclick = () => {
              const konfirmasi = confirm('Kirim aktifasi ke email?');
              if (konfirmasi) {
                user.sendEmailVerification()
                  .then(() => {
                    alert('Email verifikasi berhasil dikirim. Cek inbox email!');
                  })
                  .catch(error => {
                    console.error('Gagal kirim email verifikasi:', error);
                    alert('Gagal mengirim email verifikasi.');
                  });
              }
            };
            // Update status verifikasi di Firestore
            userDoc.update({
              email: user.email, // Update email
              verimail: 'Belum Verifikasi ✘' // Update status verifikasi
            })
            .then(() => {
              console.log('Status verifikasi di Firestore telah diperbarui');
            })
            .catch(error => {
              console.error('Gagal mengupdate status verifikasi di Firestore:', error);
            });
          }
        })
        .catch(error => {
          console.error('Gagal memuat ulang status user:', error);
        });
    } else {
      statusVerifikasiEl.textContent = 'User belum login';
      statusVerifikasiEl.style.color = 'orange';
      statusVerifikasiEl.style.cursor = 'default';
    }
  });
}

// Panggil fungsi saat halaman selesai dimuat
cekStatusVerifikasi();

// FACEBOOK SYNC
// Mendapatkan elemen Facebook
const facebookEl = document.getElementById('facebook');

// Firebase Facebook Auth Provider
const provider = new firebase.auth.FacebookAuthProvider();

// Fungsi untuk mengecek status Facebook terhubung
function cekStatusFacebook() {
  const fbUser = firebase.auth().currentUser;  // Ganti jadi fbUser
  if (fbUser) {
    // Cek jika akun sudah terhubung dengan Facebook
    if (fbUser.providerData.some((provider) => provider.providerId === 'facebook.com')) {
      facebookEl.textContent = 'Terhubung √';
      facebookEl.style.color = '#0f0';
      facebookEl.style.pointerEvents = 'none'; 
      firebase.firestore().collection('SS').doc(fbUser.uid).update({
        facebook: '<span style="color:#0f0;">Terhubung √</span>',
      });
    } else {
      facebookEl.textContent = 'Hubungkan';
      facebookEl.style.color = 'blue';
      facebookEl.style.pointerEvents = 'auto';
      firebase.firestore().collection('SS').doc(fbUser.uid).update({
        facebook: '<span style="color:#00f;">Hubungkan</span>',
      });
    }
  }
}

// Panggil fungsi cek status saat halaman selesai dimuat
cekStatusFacebook();

// Event listener untuk klik hubungkan Facebook
facebookEl.addEventListener('click', () => {
  const fbUserForRedirect = firebase.auth().currentUser;  // Ganti jadi fbUserForRedirect
  if (fbUserForRedirect) {
    // Jika user sudah login, lakukan autentikasi Facebook dengan redirect
    firebase.auth().signInWithRedirect(provider);
  } else {
    console.log('User tidak terautentikasi');
  }
});

// Menangani hasil redirect setelah login berhasil
firebase.auth().getRedirectResult().then((result) => {
  const redirectedFbUser = result.user;  // Ganti jadi redirectedFbUser
  if (redirectedFbUser) {
    // Facebook berhasil terhubung, perbarui tampilan elemen
    facebookEl.textContent = 'Terhubung √';
    facebookEl.style.color = '#0f0';
    facebookEl.style.pointerEvents = 'none';
    
    // Kirim status ke Firestore
    firebase.firestore().collection('SS').doc(redirectedFbUser.uid).update({
      facebook: 'Terhubung √',
    });

    // Redirect ke halaman chat setelah terhubung
    window.location.replace('chat.html');
  }
}).catch((error) => {
  console.error('Terjadi kesalahan saat menghubungkan Facebook:', error);
});

// UBAH EMAIL
// Fungsi untuk reauthenticate user
const reauthenticate = (currentPassword) => {
  const userAuth = firebase.auth().currentUser;
  const credAuth = firebase.auth.EmailAuthProvider.credential(userAuth.email, currentPassword);
  return userAuth.reauthenticateWithCredential(credAuth);
};

// Fungsi untuk mengirim link verifikasi ke email baru
const sendVerificationLink = (currentPassword, newEmail) => {
  reauthenticate(currentPassword)
    .then(() => {
      const userUpdate = firebase.auth().currentUser;
      // Kirim link verifikasi ke email baru
      userUpdate.verifyBeforeUpdateEmail(newEmail)
        .then(() => {
          alert("Link verifikasi telah dikirim ke email baru. Silakan cek email Anda.");
          document.getElementById("email-input-wrapper").style.display = "none";

          // Update email baru di Firestore
          const userRefz = firebase.firestore().collection("SS").doc(userUpdate.uid);
          userRefz.update({
            email: newEmail
          }).then(() => {
            console.log("Email berhasil diperbarui di Firestore");
          }).catch((error) => {
            console.error("Gagal memperbarui email di Firestore: ", error);
          });
        })
        .catch((error) => {
          console.error("Error mengirim email verifikasi:", error);
          alert("Gagal mengirim email verifikasi: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Error reauthenticate:", error);
      alert("Gagal reauthenticate: " + error.message);
    });
};

// Menambahkan event listener
document.getElementById("ubah-email").addEventListener("click", () => {
  document.getElementById("email-input-wrapper").style.display = "flex";
});

document.getElementById("batal-kirim").addEventListener("click", () => {
  document.getElementById("email-input-wrapper").style.display = "none";
});

document.getElementById("kirim-email").addEventListener("click", () => {
  const emailBaru = document.getElementById("email-baru").value.trim();
  const passUser = document.getElementById("password").value.trim();

  if (!emailBaru || !passUser) {
    alert("Silakan masukkan email baru dan password!");
    return;
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailBaru)) {
    alert("Masukkan email yang valid!");
    return;
  }

  sendVerificationLink(passUser, emailBaru);
});

// UBAH PASSWORD
// Fungsi untuk reauthenticate user
const reauthenticatePassword = (currentPassword) => {
  const userPas2 = firebase.auth().currentUser;
  const credPas2 = firebase.auth.EmailAuthProvider.credential(userPas2.email, currentPassword);
  return userPas2.reauthenticateWithCredential(credPas2);
};

// Fungsi untuk mengubah password ke yang baru
const updatePassword = (currentPassword, newPassword) => {
  reauthenticatePassword(currentPassword)
    .then(() => {
      const userUpdateP = firebase.auth().currentUser;
      // Update password di Firebase Authentication
      userUpdateP.updatePassword(newPassword)
        .then(() => {
          alert("Password berhasil diperbarui.");
          document.getElementById("password-input-wrapper").style.display = "none";

          // Update password di Firestore
          const userRefP = firebase.firestore().collection("SS").doc(userUpdateP.uid);
          userRefP.update({
            password: newPassword
          }).then(() => {
            console.log("Password berhasil diperbarui di Firestore");
          }).catch((error) => {
            console.error("Gagal memperbarui password di Firestore: ", error);
          });
        })
        .catch((error) => {
          console.error("Error mengubah password:", error);
          alert("Gagal mengubah password: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Error reauthenticate:", error);
      alert("Gagal reauthenticate: " + error.message);
    });
};

// Event listener untuk tombol 'Ubah Password'
document.getElementById("ubah-password").addEventListener("click", () => {
  document.getElementById("password-input-wrapper").style.display = "flex";
});

// Event listener untuk tombol 'Batal'
document.getElementById("batalkan").addEventListener("click", () => {
  document.getElementById("password-input-wrapper").style.display = "none";
});

// Event listener untuk tombol 'Ubah' pada form password
document.getElementById("ubah").addEventListener("click", () => {
  const passwordLama = document.getElementById("password-lama").value.trim();
  const passwordBaru = document.getElementById("password-baru").value.trim();

  if (!passwordLama || !passwordBaru) {
    alert("Silakan masukkan password lama dan password baru!");
    return;
  }

  updatePassword(passwordLama, passwordBaru);
});

// REQUEST RATE
// Elemen yang diperlukan
const r2ButtonEl = document.getElementById('r2');
const reqRateDivEl = document.getElementById('reqRate');
const requestRateBtnEl = document.getElementById('request-rate');
const minInputEl = document.getElementById('minInput');
const maxInputEl = document.getElementById('maxInput');

// Menambahkan class .active ke #r2 dan #reqRate
r2ButtonEl.addEventListener('click', () => {
  r2ButtonEl.classList.add('active');
  reqRateDivEl.classList.add('active');
});

// Validasi input angka
function isValidInput(value) {
  const number = parseInt(value);
  return /^\d{3,8}$/.test(value) && !isNaN(number);
}

// Event klik pada #request-rate
requestRateBtnEl.addEventListener('click', () => {
  const minValue = minInputEl.value.trim();
  const maxValue = maxInputEl.value.trim();

  // Validasi input
  if (!isValidInput(minValue) || !isValidInput(maxValue)) {
    alert('Input harus berupa angka dengan panjang minimal 3 dan maksimal 8 digit.');
    return;
  }

  // Format value menjadi "min - max"
  const requestRateValue = `${minValue} - ${maxValue}`;

  // Kirim ke Firestores
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    firebase.firestore().collection('SS').doc(currentUser.uid).update({
      requestRate: requestRateValue,
    })
    .then(() => {
      alert('Request berhasil dikirim!');
      // Hapus class .active
      r2ButtonEl.classList.remove('active');
      reqRateDivEl.classList.remove('active');
    })
    .catch((error) => {
      console.error('Terjadi kesalahan saat Request Rate:', error);
    });
  } else {
    alert('User tidak terautentikasi.');
  }
});

// CloseReq button / cancel
const closeReq = document.getElementById('closeReq');
closeReq.onclick = () => {
  document.getElementById('reqRate').classList.remove('active');
  document.getElementById('r2').classList.remove('active');
};

// ONLINE STATE
  const firestoreOL = firebase.firestore();
  let intervalId = null; // Variabel untuk menyimpan ID interval

  // Fungsi untuk mengupdate status online di Firestore
  function updateOnlineStatus(user) {
    const userRefOL = firestore.collection('SS').doc(user.uid);
    const statusOl = document.getElementById('OLstate');

    userRefOL.update({
      OLstate: 'Online &bull;'
    }, { merge: true })
      .then(() => {
        statusOl.innerHTML = 'Online <b style="font-size:30px; vertical-align:middle;">&bull;</b>';
        statusOl.style.color = '#0f0';
      })
      .catch((error) => {
        console.error('Gagal mengupdate status online:', error);
      });
  }

  // Fungsi untuk mulai interval
  function startOnlineInterval(user) {
    if (intervalId) return; // Jika interval sudah berjalan, jangan buat yang baru

    updateOnlineStatus(user); // Update langsung saat login
    intervalId = setInterval(() => {
      updateOnlineStatus(user); // Update setiap 5 menit
    }, 5 * 60 * 1000);
  }

  // Fungsi untuk menghentikan interval
  function stopOnlineInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Memantau perubahan status login
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('User online:', user.email);
      startOnlineInterval(user);
    } else {
      console.log('User tidak login.');
      stopOnlineInterval();

      // Hapus status di elemen HTML
      const statusOl2 = document.getElementById('OLstate');
      statusOl2.innerHTML = '';
      statusOl2.style.color = '';
    }
  });