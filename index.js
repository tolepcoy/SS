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

// ADMIN UPDATE LEVEL
async function adminLogin(uid) {
    try {
        // Ambil data dari koleksi SS
        const ssDoc = await firestore.collection('SS').doc(uid).get();
        if (!ssDoc.exists) {
            console.log('User tidak ditemukan di koleksi SS');
            return;
        }
        const ssData = ssDoc.data();
        const level = ssData.level;
        const levelIcon = ssData.levelIcon;

        // Ambil data dari koleksi CGlobal untuk dokumen role
        const roleDoc = await firestore.collection('CGlobal').doc('role').get();
        if (!roleDoc.exists) {
            console.log('Dokumen role tidak ditemukan di koleksi CGlobal');
            return;
        }
        const roleData = roleDoc.data();

        // Validasi apakah level dan levelIcon konsisten
        if (level !== levelIcon) {
            await firestore.collection('SS').doc(uid).update({
                levelIcon: level
            });
            console.log(`Updated levelIcon ke ${level}`);
        }

        // Update role dengan value dari field yang sesuai di CGlobal
        const roleField = roleData[String(level)]; // Mengambil nilai berdasarkan level
        if (roleField) {
            await firestore.collection('SS').doc(uid).update({
                role: roleField
            });
            console.log(`Updated role ke ${roleField}`);
        } else {
            console.log(`Field ${level} tidak ditemukan di role`);
        }
    } catch (error) {
        console.error('Error saat login admin:', error);
    }
}

/* ADMIN DOR
firebase.auth().onAuthStateChanged((TCUser) => {
  if (TCUser) {
    console.log("Auth state changed:", TCUser);

    if (!TCUser.emailVerified) {
      showAlert('Anda belum memverifikasi email!');
    }

    firestore.collection("SS").doc(TCUser.uid).get()
      .then((TCDoc) => {
        if (TCDoc.exists && TCDoc.data().isAdmin) {
          

          
          console.log("TCDoc data:", TCDoc.data());

          // Updater untuk admin
          TCUpdateAllUsersForAdmin();
        }
      })
      .catch((error) => {
        console.error("Error mengambil data admin:", error);
      });
  }
});

// Fungsi untuk update seluruh data user jika admin login
function TCUpdateAllUsersForAdmin() {
  firestore.collection('SS').get()
    .then((TCQuerySnapshot) => {
      TCQuerySnapshot.forEach((TCDoc) => {
        const TCUserData = TCDoc.data();
        const TCUserId = TCDoc.id;
        const TCLevel = TCUserData.level;

        // Dapatkan role yang benar sesuai level
        const TCRoleText = TCGetRoleText(TCLevel);
        const TCLevelIcon = TCLevel;

        // Update data user di Firestore, pastikan role sesuai level
        firestore.collection('SS').doc(TCUserId).update({
          role: TCRoleText,
          levelIcon: TCLevelIcon
        }).then(() => {
          console.log(`User ${TCUserId} updated successfully!`);
        }).catch((TCError) => {
          console.error("Error updating user: ", TCError);
        });
      });
    })
    .catch((TCError) => {
      console.error("Error fetching user data: ", TCError);
    });
}

// Fungsi untuk menentukan role berdasarkan level
function TCGetRoleText(TCLevel) {
  switch (TCLevel) {
    case 1: return '<span id="Minion1">Minion</span>';
    case 2: return '<span id="Baron2">Baron</span>';
    case 3: return '<span id="Knight3">Knight</span>';
    case 4: return '<span id="Guardian4">Guardian</span>';
    case 5: return '<span id="Commander5">Commander';
    case 6: return '<span id="Champion6">Champion</span>';
    case 7: return '<span id="Prince7">Prince</span>';
    case 8: return '<span id="Lord8">Lord</span>';
    case 9: return '<span id="CelestialLord9">Celestial Lord</span>';
    case 10: return '<span id="GrandLord10">Grand Lord</span>';
    case 11: return '<span id="Conqueror11">Conqueror</span>';
    case 12: return '<span id="Supreme12">Supreme</span>';
    case 13: return '<span id="EternalSupreme13">Eternal Supreme</span>';
    case 14: return '<span id="King14">King</span>';
    case 15: return '<span id="AbsoluteKing15">Absolute King</span>';
    case 16: return '<span id="LegendaryKing16">Legendary King</span>';
    case 17: return '<span id="KingOfGlory17">King Of Glory</span>';
    case 18: return '<span id="KingOfTheKings18">King Of The Kings</span>';
    case 19: return '<span id="Emperor19">Emperor</span>';
    case 20: return '<span id="ImmortalEmperor20">IMMORTAL EMPEROR</span>';
    case 21: return '<span id="GOD21">GOD</span>';
    default: return 'Unknown';
  }
}
*/

/*!   bersihkanChatboxLama();  */
/* Fungsi membersihkan chat lama
function bersihkanChatboxLama() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 1 * 60 * 1000); // 5mmt
  
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
} */

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
    const userRef = firestore.collection('SS').doc(user.uid);

    userRef.onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data();
        updateProfile(data, 'User'); 
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
  document.getElementById('nama').innerHTML = data.nama;
  document.getElementById('avatar').src = data.avatar;
  document.getElementById('OLstate').innerHTML = data.OLstate;
  document.getElementById('level').innerHTML = data.level;
  document.getElementById('role').innerHTML = data.role;
document.getElementById('levelIcon').src = `level/${data.levelIcon}.png`;
  document.getElementById('detail').innerHTML = data.detail;
  document.getElementById('lokasi').innerHTML = data.lokasi;
  document.getElementById('umur').innerHTML = data.umur;
  document.getElementById('gender').src = `icon/${data.gender}.png`;
  document.getElementById('rate').innerHTML = data.rate;
  document.getElementById('bergabung').innerHTML = data.bergabung;
  document.getElementById('verimail').innerHTML = data.verimail;
  document.getElementById('email').innerHTML = data.email;

  console.log(`Profil berhasil diperbarui untuk ${kategori}`);
}
});

// PRIVASI UPDATE
// Fungsi untuk menampilkan profil user setelah login privasi
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userRefPrivasi = firestore.collection('PRIVASI').doc(user.uid);

    userRefPrivasi.onSnapshot(doc => {
      if (doc.exists) {
        const dataPrivasi = doc.data();
        updateProfilePrivasi(dataPrivasi, 'User'); 
      } else {
        console.log("Data user tidak ditemukan di koleksi PRIVASI.");
      }
    }, error => console.error("Error listening to user data:", error));
  } else {
    console.log("User not logged in");
  }
});

// Fungsi untuk memperbarui UI profil
function updateProfilePrivasi(dataPrivasi, kategori) {
  document.getElementById('email').innerHTML = dataPrivasi.email;
  document.getElementById('verimail').innerHTML = dataPrivasi.verimail;

  console.log(`Profil berhasil diperbarui untuk ${kategori}`);
}

// CUSTOM ALERT
function showAlert(message) {
  const alertBox2 = document.createElement('div');
  alertBox2.classList.add('custom-alert');
  alertBox2.innerHTML = `
<div class="alert-box">
<span class="alert-message">${message}</span>
<button class="alert-ok">OK</button>
</div>`;
    document.body.appendChild(alertBox2);
    alertBox2.style.display = 'flex';
    alertBox2.querySelector('.alert-ok').addEventListener('click', () => {
      alertBox2.style.display = 'none';
      document.body.removeChild(alertBox2);
});}
// END CUSTOM ALERT

// EDIT NAMA
const namaEl = document.getElementById('nama');
const editNamaBtn = document.getElementById('edit-nama');

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
            let newNama = namaInput.value.trim();
            
// sanitasi start
function sanitizeInput(input) {
  const docXSS = new DOMParser().parseFromString(input, 'text/html');
  return docXSS.body.textContent || "";
} // sanitasi end

            // Validasi nama
            if (!/^[a-zA-Z\s]{3,15}$/.test(newNama)) {
              showAlert("Nama hanya boleh huruf dan spasi, 3 - 15 karakter.");
              return;
            }
            
// sanitasi start
newNama = sanitizeInput(newNama);
// sanitasi end

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
          showAlert("Silakan pilih gambar terlebih dahulu.");
          return;
        }

        // Validasi format file
        if (selectedAvatarFile.type !== 'image/jpeg') {
          showAlert("Hanya file gambar JPEG yang diperbolehkan.");
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
            showAlert("Gagal upload gambar, coba lagi.");
          }
        } catch (avatarError) {
          console.error("Gagal upload gambar:", avatarError);
          showAlert("Terjadi kesalahan, coba lagi.");
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
  firebase.auth().onAuthStateChanged((user) => {
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
        // Ubah deklarasi dari `const` ke `let` agar dapat diubah
        let newDetail = detailTextarea.value.trim();

        // Fungsi sanitasi
        function sinitizeInput(input) {
          const docZSS = new DOMParser().parseFromString(input, 'text/html');
          return docZSS.body.textContent || "";
        }

        // Validasi isi biodata
        if (newDetail.length > 50) {
          showAlert("Biodata maksimal 50 karakter.");
          return;
        }

        // Sanitasi input
        newDetail = sinitizeInput(newDetail);

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
          showAlert("Gagal menyimpan biodata baru, coba lagi.");
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
          showAlert("Terjadi kesalahan, coba lagi.");
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
          showAlert("Terjadi kesalahan, coba lagi.");
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
let currentUser;

// Fungsi untuk handle klik tombol edit gender
editGenderBtn.addEventListener('click', () => {
  editGenderBtn.style.display = 'none';

  // Menunggu user login terlebih dahulu
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = user; // Simpan data user yang login
      // Ambil data user dari Firestore
      const genderFirestoreRef = firestore.collection('SS').doc(user.uid);

      genderFirestoreRef.get().then(doc => {
        if (doc.exists) {
          const userData = doc.data();

          // Cek nilai gender
          if (userData.gender !== "cewok") {
            showAlert("Gender tidak bisa diubah lagi setelah Anda mengaturnya.");
            editGenderBtn.style.display = 'block'; // Tampilkan kembali tombol edit
            return; // Stop proses edit
          }
        }

        // Jika gender masih "cewok", lanjut tampilkan dropdown untuk edit
        tampilkanDropdownEdit();
      }).catch(error => {
        console.error("Gagal mendapatkan data user:", error);
        showAlert("Terjadi kesalahan, coba lagi.");
      });
    } else {
      console.log("User not logged in");
    }
  });
});

// Fungsi untuk menampilkan dropdown edit gender
function tampilkanDropdownEdit() {
  const genderSelect = document.createElement('select');
  genderSelect.id = 'gender-select';

  // Daftar pilihan gender dengan URL gambar
  const genderOptions = [
    { text: 'Laki-laki', value: 'cowok' },
    { text: 'Perempuan', value: 'cewek' }
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
    const selectedGender = genderSelect.value; // Ambil nilai gender yang dipilih

    // Update gender di Firestore
    try {
      const genderFirestoreRef = firestore.collection('SS').doc(currentUser.uid);
      await genderFirestoreRef.update({ gender: selectedGender });

      // Update tampilan gender di halaman
      genderEl.innerHTML = `<img src="icon/${selectedGender}.png" alt="Gender Icon" />`;

      // Tampilkan kembali tombol edit
      editGenderBtn.style.display = 'block';

      // Hapus elemen select dan tombol save setelah selesai
      genderSelect.remove();
      cancelGenderBtn.remove();
      saveGenderBtn.remove();
    } catch (error) {
      console.error("Gagal update gender:", error);
      showAlert("Terjadi kesalahan, coba lagi.");
    }
  });
}

// zoom avatar
document.querySelectorAll('.avatar').forEach(function(avatar) {
  avatar.addEventListener('click', function() {
    this.classList.toggle('zoom');
  });
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
          const userDoc = db.collection('PRIVASI').doc(user.uid);  // Ambil dokumen berdasarkan UID user

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
                    showAlert('Email verifikasi berhasil dikirim. Cek inbox email!');
                  })
                  .catch(error => {
                    console.error('Gagal kirim email verifikasi:', error);
                    showAlert('Gagal mengirim email verifikasi.');
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
          showAlert("Link verifikasi telah dikirim ke email baru. Silakan cek email Anda.");
          document.getElementById("email-input-wrapper").style.display = "none";

          // Update email baru di Firestore
          const userRefz = firebase.firestore().collection("PRIVASI").doc(userUpdate.uid);
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
          showAlert("Gagal mengirim email verifikasi: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Error reauthenticate:", error);
      showAlert("Gagal reauthenticate: " + error.message);
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
    showAlert("Silakan masukkan email baru dan password!");
    return;
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailBaru)) {
    showAlert("Masukkan email yang valid!");
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
          showAlert("Password berhasil diperbarui.");
          document.getElementById("password-input-wrapper").style.display = "none";

          // Update password di Firestore
          const userRefP = firebase.firestore().collection("PRIVASI").doc(userUpdateP.uid);
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
          showAlert("Gagal mengubah password: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Error reauthenticate:", error);
      showAlert("Gagal reauthenticate: " + error.message);
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
    showAlert("Silakan masukkan password lama dan password baru!");
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
    showAlert('Input harus berupa angka dengan panjang minimal 3 dan maksimal 8 digit.');
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
      showAlert('Request berhasil dikirim!');
      // Hapus class .active
      r2ButtonEl.classList.remove('active');
      reqRateDivEl.classList.remove('active');
    })
    .catch((error) => {
      console.error('Terjadi kesalahan saat Request Rate:', error);
    });
  } else {
    showAlert('User tidak terautentikasi.');
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
        statusOl.innerHTML = '<span style="color:#0f0">Online <b style="font-size:30px; vertical-align:middle;">&bull;</b></span>';
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
      statusOl2.innerHTML = 'Offline';
      statusOl2.style.color = '#999';
    }
  });

// USER LIST
const containerCewek = document.querySelector('.userCewek');
const containerCowok = document.querySelector('.userCowok');

// Fungsi untuk generate profile user secara dinamis
function generateUserProfile(user, container) {
  const userDiv = document.createElement('div');
  userDiv.classList.add('ic-user');
  userDiv.id = user.id;

  userDiv.innerHTML = `
    <img id="avatarUser" src="${user.avatar}" alt="Avatar">
    <div class="icUserWrapper">
      <span id="namaUser" class="namaUser">${user.nama}</span>
      <span class="smallest">Lv. &nbsp;<span id="levelUser">${user.level}</span>&nbsp;&nbsp;
      <img id="levelIconUser" src="level/${user.levelIcon}.png" alt="Level Icon"></span>
    </div>
  `;

  // Menambahkan event listener untuk klik
  userDiv.addEventListener('click', () => {

// tendang panel
document.querySelectorAll('.icon').forEach(icon => {
 icon.classList.remove('ahuy');
})

document.querySelectorAll('.sidePanel').forEach(dor => {
 dor.style.transform = 'translateX(-105%)';
})

// tambah class active
const nyelipPanel = document.getElementById('profile-lain');
  nyelipPanel.classList.add('active');

    // Ketika diklik, ambil detail user dari Firestore
    getUserDetails(user.id);
  });

  container.appendChild(userDiv);
}

// Fungsi untuk mengambil data user dari Firestore dan menampilkannya di elemen tertentu
function getUserDetails(userId) {
  firestore.collection('SS').doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
        const userDetails = doc.data();
        
        // Update tampilan elemen spesifik di profile-lain
        const namaLain = document.getElementById('nama-lain');
if (namaLain) {
namaLain.innerHTML = userDetails.nama;
}

const avatarLain = document.getElementById('avatar-lain');
if (avatarLain) {
avatarLain.src = userDetails.avatar;
}

const levelLain = document.getElementById('level-lain');
if (levelLain) {
levelLain.innerHTML = userDetails.level;
}

const levelIconLain = document.getElementById('levelIcon-lain');
if (levelIconLain) {
levelIconLain.src = `level/${userDetails.levelIcon}.png`;
}

 const roleLain = document.getElementById('role-lain');
if (roleLain) {
roleLain.innerHTML = userDetails.role;
}

const detailLain = document.getElementById('detail-lain');
if (detailLain) {
detailLain.innerHTML = userDetails.detail;
}

const lokasiLain = document.getElementById('lokasi-lain');
if (lokasiLain) {
lokasiLain.innerHTML = userDetails.lokasi;
}

const umurLain = document.getElementById('umur-lain');
if (umurLain) {
umurLain.innerHTML = userDetails.umur;
}

const genderLain = document.getElementById('gender-lain');
if (genderLain) {
genderLain.src = `icon/${userDetails.gender}.png`;
}

const rateLain = document.getElementById('rate-lain');
if (rateLain) {
rateLain.innerHTML = userDetails.rate;
}

const bergabungLain = document.getElementById('bergabung-lain');
if (bergabungLain) {
bergabungLain.innerHTML = userDetails.bergabung;
}

const OLstateLain = document.getElementById('OLstate-lain');
if (OLstateLain) {
OLstateLain.innerHTML = userDetails.OLstate;
}
      } else {
        console.log('User tidak ditemukan');
      }
    })
    .catch((error) => {
      console.error("Error getting user details: ", error);
    });
}

// Fungsi untuk update profile user
function updateUserProfile(user) {
  const userDiv = document.getElementById(user.id);

  // Kalau elemen user belum ada, bikin baru
  if (!userDiv) {
    const container = user.gender === "cewek" ? containerCewek : containerCowok;
    generateUserProfile(user, container);
    return;
  }

  // Update data user di elemen yang ada
  userDiv.querySelector('#avatarUser').src = user.avatar;
  userDiv.querySelector('#namaUser').textContent = user.nama;
  userDiv.querySelector('#levelUser').textContent = user.level;
  userDiv.querySelector('#levelIconUser').src = `level/${user.levelIcon}.png`;
}

// Real-time listener dari Firestore
firestore.collection('SS').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const userData = change.doc.data();
    const userWoy = {
      id: change.doc.id,
      nama: userData.nama,
      level: userData.level,
      avatar: userData.avatar,
      levelIcon: userData.levelIcon,
      gender: userData.gender,
    };

    if (change.type === "added" || change.type === "modified") {
      updateUserProfile(userWoy);
    } else if (change.type === "removed") {
      const userDiv = document.getElementById(userWoy.id);
      if (userDiv) userDiv.remove();
    }
  });
});

// Side profil lain nyelip
let nyelip = document.getElementById('profile-lain');
document.getElementById('tutup-nyelip').addEventListener('click', function() {
  nyelip.classList.remove('active');
});

document.querySelectorAll('.icon').forEach(item => {
  item.addEventListener('click', () => {
    
  const tendangNyelip = document.getElementById('profile-lain');
    if (tendangNyelip) {
      tendangNyelip.classList.remove('active');
    }
  });
});

// Ambil referensi ke koleksi
const Mantap = firebase.firestore();

function updateAllUsers() {
  Mantap.collection('SS').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        const Waduh = doc.data();
        const SamaSaja = doc.id;

        // Ambil data level dari firestore
        const level = Waduh.level;

        // Tentukan role dan levelIcon berdasarkan level
        const levelIcon = level;
        const role = getRoleText(level);

        // Update data ke firestore
        Mantap.collection('SS').doc(SamaSaja).update({
          levelIcon: levelIcon,
          role: role
        }).then(() => {
          console.log(`User ${SamaSaja} data successfully updated!`);
        }).catch((error) => {
          console.error(`Error updating user ${SamaSaja}: `, error);
        });
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
}

function getRoleText(level) {
  switch (level) {
    case 1: return '<span id="Minion1">Minion</span>';
    case 2: return '<span id="Baron2">Baron</span>';
    case 3: return '<span id="Knight3">Knight</span>';
    case 4: return '<span id="Guardian4">Guardian</span>';
    case 5: return '<span id="Commander5">Commander';
    case 6: return '<span id="Champion6">Champion</span>';
    case 7: return '<span id="Prince7">Prince</span>';
    case 8: return '<span id="Lord8">Lord</span>';
    case 9: return '<span id="CelestialLord9">Celestial Lord</span>';
    case 10: return '<span id="GrandLord10">Grand Lord</span>';
    case 11: return '<span id="Conqueror11">Conqueror</span>';
    case 12: return '<span id="Supreme12">Supreme</span>';
    case 13: return '<span id="EternalSupreme13">Eternal Supreme</span>';
    case 14: return '<span id="King14">King</span>';
    case 15: return '<span id="AbsoluteKing15">Absolute King</span>';
    case 16: return '<span id="LegendaryKing16">Legendary King</span>';
    case 17: return '<span id="KingOfGlory17">King Of Glory</span>';
    case 18: return '<span id="KingOfTheKings18">King Of The Kings</span>';
    case 19: return '<span id="Emperor19">Emperor</span>';
    case 20: return '<span id="ImmortalEmperor20">IMMORTAL EMPEROR</span>';
    case 21: return '<span id="GOD21">GOD</span>';
    default: return 'Unknown';
  }
}
// mengupdate seluruh user
updateAllUsers();

// ADMIN SIRU
// Cek login user
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User terdeteksi login:", user.uid);

    // Cek apakah user adalah admin
    const adminRef = firestore.collection("SS").doc(user.uid);
    adminRef.get().then((doc) => {
      if (doc.exists) {
        const isAdmin = doc.data().isAdmin;

        if (isAdmin === true) {
          console.log("Tolep Coy adalah admin");

          // Listener untuk dokumen CGlobal/Cbox
          firestore.collection("CGlobal").doc("Cbox").onSnapshot((doc) => {
            if (doc.exists) {
              const data = doc.data();
              document.getElementById("Halo").innerHTML = data.Halo;
            } else {
              console.error("Dokumen Cbox tidak ditemukan!");
            }
          });
        } else {
          console.log("User ini bukan admin!");
        }
      } else {
        console.error("Dokumen user tidak ditemukan!");
      }
    }).catch((error) => {
      console.error("Error memeriksa admin:", error);
    });
  } else {
    console.log("Tidak ada user yang login");
  }
});