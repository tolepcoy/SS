// CUSTOM ALERT
function showAlert(message) {
  const alertBox2 = document.createElement('div');
  alertBox2.classList.add('custom-alert');
  alertBox2.innerHTML = `
<div class="alert-box">
<span class="alert-message">${message}</span>
<button class="alert-ok">Iyo</button>
</div>`;
    document.body.appendChild(alertBox2);
    alertBox2.style.display = 'flex';
    alertBox2.querySelector('.alert-ok').addEventListener('click', () => {
      alertBox2.style.display = 'none';
      document.body.removeChild(alertBox2);
});}
// END CUSTOM ALERT

// CLEAR TEXTAREA ON TOUCH
const textarea = document.querySelector('textarea');

textarea.addEventListener('focus', () => {
  textarea.setAttribute('placeholder', '');
});

textarea.addEventListener('blur', () => {
  if (textarea.value === '') {
    textarea.setAttribute('placeholder', 'Kirim pesen ke Tolep...');
  }
});
// -- end clear textarea --

// TOGGLE USER ONLINE LIST
document.addEventListener("DOMContentLoaded", function () {
  const lookBtn = document.getElementById("look");
  const userOnline = document.getElementById("user-online");
  const userProf = document.getElementById("prof");

  // Toggle active saat button diklik
  lookBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    userOnline.classList.toggle("active");
    lookBtn.classList.toggle("active");
    userProf.classList.toggle("active");
  });

// Remove active klik di mana aja
  document.addEventListener("click", function () {
    userOnline.classList.remove("active");
    lookBtn.classList.remove("active");
    userProf.classList.remove("active");
  });

  userOnline.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  userProf.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
// -- end toggle user online

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
// -- end inisialisasi firebase

// GABUNG DI DOM CEK STATUS AKUN
document.addEventListener("DOMContentLoaded", function () {

  const wowAh = document.getElementById("wow");
  const loadingParent = document.getElementById('loading');
  const loadingCircle = document.getElementById('loading-circle');

  // Fungsi untuk menangani proses logout dan redirect
  function handleSignOut() {
    firebase.auth().signOut().then(() => {
      setTimeout(() => {
        window.location.href = 'https://tolepcoy.github.io/SS/login-form.html';
      }, 3000); // 3 detik delay
    });
  }

  // Fungsi cek status login
  function checkLoginStatus(user) {
    const userId = user.uid;
    console.log("User sudah login:", user.email);

    // Cek koleksi "PRIVASI"
    firestore.collection('PRIVASI').doc(userId).get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();

        // Jika akun "disabled"
        if (userData.disabled === true) {
          showAlert('Akun Ente belum aktif, nunggu disetujui Tolep dulu');
          wowAh.style.pointerEvents = 'none';
          loadingParent.style.display = 'none';
          loadingCircle.style.display = 'none';
          loadingCircle.style.animation = 'none';
          handleSignOut();
        } else {
          // Jika user ID bukan Ane
          if (userId !== 'c5AbAGemIcfsphDrXu56I8OZyEo1') {
            // Nonaktifkan elemen tertentu
            wowAh.style.pointerEvents = 'auto';
            document.getElementById('delCBC').style.pointerEvents = 'none';
            document.getElementById('headerTolep').style.pointerEvents = 'none';
            document.getElementById('messageFormCBC').style.display = 'none';
            document.getElementById('messageInputCBC').style.display = 'none';
            document.getElementById('sendButtonCBC').style.display = 'none';
          }
        }
      } else {
        console.log('Dokumen PRIVASI tidak ditemukan untuk user ini.');
      }
    }).catch((error) => {
      console.error('Error membaca data PRIVASI:', error);
    });
  }

  // Cek status login saat window load
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      checkLoginStatus(user);
    } else {
      console.log('User belum login!');
      wowAh.style.pointerEvents = 'none';
      loadingParent.style.display = 'flex';
      loadingCircle.style.display = 'block';
      loadingCircle.style.animation = 'spin 1s linear infinite;';
      window.location.href = 'https://tolepcoy.github.io/SS/login-form.html';
    }
  });

});
// END CEK STATUS AKUN LOGIN

// CACHE
firebase.firestore().enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      console.log('Offline caching gagal karena multi-tab.');
    } else if (err.code == 'unimplemented') {
      console.log('Offline caching tidak didukung di browser ini.');
    }
  });

// SHOW PROF USER NAMA
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userRef = firestore.collection('SS').doc(user.uid);

    userRef.onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data();
        updateProfile(data, 'User'); 
      }
    }, error => console.error("Error listening to user data:", error));
  }
});

// Fungsi untuk memperbarui UI profil
function updateProfile(data, kategori) {
  document.getElementById('nama').innerHTML = data.nama;
}
// -- lihat prof end

// CHATBOX & CHATBOX-TOLEP
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const chatBoxTolep = document.getElementById('chatbox-tolep');
const sendButton = document.getElementById('sendButton');


firebase.auth().onAuthStateChanged((user) => {
  if (user) {

    firestore.collection('SS').doc(user.uid).onSnapshot((doc) => {
      if (doc.exists) {
        const userName = doc.data().nama;

        // Fungsi kirim pesan
        messageForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const message = messageInput.value.trim();
          if (message === '') return;

 // Jika UID cocok dengan ente, simpan di CHATBOX-TOLEP
    const collection = user.uid === "c5AbAGemIcfsphDrXu56I8OZyEo1" ? 'CHATBOX-TOLEP' : 'CHATBOX';

firestore.collection(collection).add({
            nama: userName,
            text: message,
            timestamp: new Date(),
            userId: user.uid,
          });

          messageInput.value = '';
        });

 // Listener untuk CHATBOX (publik)
        firestore.collection('CHATBOX')
          .orderBy('timestamp')
          .onSnapshot((snapshot) => {
            chatBox.innerHTML = '';

            snapshot.forEach((doc) => {
              const messageData = doc.data();
              const timestamp = messageData.timestamp 
        ? new Date(messageData.timestamp.toMillis()).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '';
const messageElement = document.createElement('div');

messageElement.innerHTML = `
<div id="sender">
${messageData.nama}
<div id="timetrex">${timestamp}</div>
</div>
<div id="text-chat" style="color: #090;margin-top:-15px;">${messageData.text}</div>
`;
  chatBox.appendChild(messageElement);
});

   chatBox.scrollTop = chatBox.scrollHeight;
});

 // CHATBOX-TOLEP (khusus ente)
 firestore.collection('CHATBOX-TOLEP')
          .orderBy('timestamp')
          .onSnapshot((snapshot) => {
      chatBoxTolep.innerHTML = '';

    snapshot.forEach((doc) => {
  const messageData = doc.data();
  const messageElement = document.createElement('div');

messageElement.innerHTML = `
<div style="color:#9d0" id="text-chat-tolep">${messageData.text}</div>
`;
              chatBoxTolep.appendChild(messageElement);
            });

   chatBoxTolep.scrollTop = chatBoxTolep.scrollHeight;
});
      }
    });

  }
});
// -- end chatbox

// CLEAR CHAT ADMIN
function bersihkanChatboxLama() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  const cutoffTimestamp = firebase.firestore.Timestamp.fromDate(cutoff);

  firestore.collection("CHATBOX")
    .where("timestamp", "<", cutoffTimestamp)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete()
      });
    })
    
    firestore.collection("CHATBOX-TOLEP")
    .where("timestamp", "<", cutoffTimestamp)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete()
      });
    })
}

// Listener untuk cek user login
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firestore.collection('Administrator').doc(user.uid).get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();

 // Cek apakah user adalah admin
        if (userData.isAdmin) {
          bersihkanChatboxLama();
        }
      }
    })
  }
});
// -- end clear chat by admin

// YANG ONLINE
// Fungsi update status online
function updateStatusOnline(uid) {
  firestore.collection('SS').doc(uid).update({
    online: true,
    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
  }).catch((error) => {
    console.error("Error updating status online:", error);
  });
}

// Fungsi mulai timer offline
let offlineTimer;
function startOfflineTimer(uid) {
  clearTimeout(offlineTimer); // Reset timer lama
  offlineTimer = setTimeout(() => {
    firestore.collection('SS').doc(uid).update({
      online: false,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }).catch((error) => {
      console.error("Error setting status offline:", error);
    });
  }, 120000); // 2 menit
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const inputChat = document.getElementById('messageInput');
  const yangOnlineElement = document.getElementById('yang-online');

  // Deteksi aktivitas user
  if (inputChat) {
    inputChat.addEventListener('input', () => {
      const user = firebase.auth().currentUser;
      if (user) {
        updateStatusOnline(user.uid);
        startOfflineTimer(user.uid);
      }
    });
  }

  // Fungsi cek semua user yang online
  function cekStatusSemuaOnline() {
    firestore.collection('SS')
      .where('online', '==', true)
      .onSnapshot((snapshot) => {
        if (yangOnlineElement) {
          let onlineUsers = '';

          snapshot.forEach((doc) => {
            const data = doc.data();
            onlineUsers += `<div style="font-weight:bold;color: #0e0;font-size:12px;"><li>${data.nama}</li></div>`;
          });

// Tampilkan semua user yang online
          yangOnlineElement.innerHTML = onlineUsers || '';
        }
      }, (error) => {
        console.error("Error fetching online users:", error);
      });
  }

  // cek semua user online
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      updateStatusOnline(user.uid);
      startOfflineTimer(user.uid);
      cekStatusSemuaOnline();
    }
  });
});

//TERMINAL
const terminal = document.getElementById("terminal");
const wow = document.getElementById("wow");
const meong = document.getElementById("meong");
const meong2 = document.getElementById("meong2");
const meong3 = document.getElementById("meong3");
const blinkJugo = document.getElementById("blink-jugo");

const commands = [
            { text: "$ Load Tolep server ...", dots: 3, delay: 2, isGold: true },
            { text: "$ Request permission", dots: 4, delay: 2 },
            { text: "$ Get data from tolepserver_ ...", delay: 2 },
            { text: "$ Enable Node.js & Script ... /Done.", delay: 2 },
            { text: "$ Enabling encryption ... /Done.", delay: 2 },
            { text: "$ Getting sign-in ...", delay: 2 },
            { text: "$ Requested!", delay: 2, isGreen: true },
            { text: "$ Get in profile ... /Done.", delay: 2 },
            { text: "$ Encrypting chat ... /Done.", delay: 2 },
            { text: "$ Converting to base64 -REGEX ../Done.", delay: 2 },
            { text: "$ Run Script for chating ... /Done.", delay: 2, isGreen: true },
            { text: "$ Assistant Bot-AI Tolep Coy was checking!", delay: 10, blinkTerminal: true },
            { text: "$ Security locked ..../Done.", delay: 1 },
            { text: "$ Credential keys created .../Done.", delay: 1 },
            { text: "$ Loaded.", delay: 1, isGreen: true },
            { text: "$ Copying to server", dots: 1, delay: 1 },
            { text: "$ Get in to room server ...", delay: 1 },
            { text: "$ Enable JQuery for encrypting ... /Done.", delay: 1, isGold: true },
            { text: "$ Enable cascading style ...", delay: 1 },
            { text: "$ Enable AJAX script .... /Done.", delay: 1, isGold: true },
            { text: "$ Extract encryption to Html ... /Done.", delay: 1 },
            { text: "$ Script ... /Loaded.", delay: 1, isGreen: true },
            { text: "$ Cascading Style Sheet ... /Loaded.", delay: 1, isGreen: true },
            { text: "$ Html ... /Loaded.", delay: 1, isGreen: true },
            { text: "$ Managing file server.", delay: 1 },
            { text: "$ Syncronize external script.", delay: 1 },
            { text: "$ Syncronized!.", delay: 1, isGold: true },
            { text: "$ Getting started ...", delay: 1 },
            { text: "$ Done.", delay: 2, isGreen: true },
            { text: "        ", delay: 1 },
            { text: "        ", delay: 1 },
            { text: "                                                  OK!   ", delay: 1 },
            { text: "$ Run!", delay: 1, isGreen: true }
        ];

let isCommandRunning = false;

function typeEffect({ text, dots = 0, delay = 100, isRed = false, isGreen = false, isGold = false, blinkTerminal = false }, callback) {
    let i = 0;
    const line = document.createElement("div");
    // Deteksi spasi kosong
    if (text.trim() === "") {
        line.innerHTML = "&nbsp;";
        terminal.appendChild(line);
        setTimeout(callback, delay);
        return;
    }

    terminal.appendChild(line);

    function type() {
        if (i < text.length) {
            line.innerHTML += text[i++];
            setTimeout(type, delay);
        } else if (dots > 0) {
            typeDots(dots, callback);
        } else {
            finalize(line, isRed, isGreen, isGold, blinkTerminal, callback);
        }
    }

    function typeDots(dots, callback) {
        let dotCount = 0;
        function addDot() {
            if (dotCount < dots) {
                line.innerHTML += ".";
                dotCount++;
                setTimeout(addDot, delay);
            } else {
                finalize(line, isRed, isGreen, isGold, blinkTerminal, callback);
            }
        }
        addDot();
    }

    function finalize(line, isRed, isGreen, isGold, blinkTerminal, callback) {
        if (isRed) line.classList.add("red");
        if (isGreen) line.classList.add("green");
        if (isGold) line.classList.add("gold");
        if (blinkTerminal) line.classList.add("blinkTerminal");
        if (callback) callback();
    }

    type();
}

function runCommands() {
    let i = 0;

    function nextCommand() {
        if (i < commands.length) {
            typeEffect(commands[i++], nextCommand);
        } else {
            terminal.style.display = "none";
            terminal.style.pointerEvents = "none";
        }
    }
    nextCommand();
}

wow.addEventListener("click", () => {
    if (!isCommandRunning) {
  wow.style.display = 'none';
  wow.style.pointerEvents = 'none';
  meong.style.display = "none";
  meong2.style.display = "none";
  meong3.style.display = "none";
  blinkJugo.style.animation = 'none';
  terminal.style.background = 'black';
        isCommandRunning = true; 
        runCommands(); 
    }
});

// CUSTOM DIALOG LOGOUT
document.getElementById('keluar').addEventListener('click', () => {
  const dialog = document.getElementById('custom-logout-dialog');
  const dialogBlur = document.querySelector(".custom-dialog");
  dialog.style.display = 'flex';
  dialogBlur.style.backdropFilter = 'blur(4px) saturate(200%)';

  document.getElementById('confirm-logout').addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        window.location.href = "https://tolepcoy.github.io/SS/login-form.html";
      })
  });

  // Tombol batal logout
  document.getElementById('cancel-logout').addEventListener('click', () => {
    dialog.style.display = 'none';
    dialogBlur.style.display = 'none';
    dialogBlur.style.backdropFilter = 'none';
  });
});
/* kustom dialog end */

// EDIT NAMA
const namaEl = document.getElementById('nama');
const editNamaBtn = document.getElementById('edit-nama');
const kenoKeluar = document.getElementById('keluar');

// Fungsi untuk handle klik tombol edit
editNamaBtn.addEventListener('click', () => {
  editNamaBtn.style.display = 'none';
  kenoKeluar.style.display = 'none';

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
            showAlert(`Ente cuman biso ngubah namo setiap 30 hari. Siso waktu: ${remainingDays} hari.`);
  editNamaBtn.style.display = 'block';
  kenoKeluar.style.display = 'block';
            return;
          }

          // Simpan value lama
          const currentNama = namaEl.textContent.trim();

// Ubah elemen nama menjadi input
          namaEl.innerHTML = `
            <input type="text" id="nama-input" value="${currentNama}" maxlength="15" /><br>
            <button id="cancel-nama">Batal</button>
            <button id="save-nama">Simpen</button>
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
            kenoKeluar.style.display = 'block';
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
              showAlert("Namo cuman boleh huruf samo spasi, 3 - 15 karakter.");
              return;
            }
            
// sanitasi start
newNama = sanitizeInput(newNama);
// sanitasi end

            // Simpan ke Firestore
try {
    await userDef.update({
        nama: newNama,
        lastNamaUpdate: firebase.firestore.Timestamp.now()
    });

    // Update localStorage
    localStorage.setItem('userName', newNama);

    // Kembalikan tampilan awal
    namaEl.textContent = newNama;
    editNamaBtn.style.display = 'block';
    kenoKeluar.style.display = 'block';
} catch (error) {
    showAlert("Gagal nyimpen namo baru, cubo lagi.");
            }
          });
        } else {
          showAlert("Terjadi kesalahan, coba lagi.");
 editNamaBtn.style.display = 'block';
 kenoKeluar.style.display = 'block';
        }
      }).catch(error => {
        showAlert("Ado yang error!, cubo lagi.");
        editNamaBtn.style.display = 'block';
        kenoKeluar.style.display = 'block';
      });
    }
  });
});
// -- end edit nama

// Load nama lokal storage
document.addEventListener('DOMContentLoaded', () => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        namaEl.textContent = storedName;
    } else {
        namaEl.textContent = 'Guest'; // Default kalo belum ada nama
    }
});

/*! REMOVE CHAT KHUSUS APP ANE */
const removeChatBtn = document.getElementById('headerTolep');

async function removeAllChats() {
  try {
// Hapus di koleksi CHATBOX
    const chatboxSnapshot = await firestore.collection('CHATBOX').get();
    chatboxSnapshot.forEach(async (doc) => {
      await firestore.collection('CHATBOX').doc(doc.id).delete();
    });

// Hapus di koleksi CHATBOX-TOLEP
    const chatboxTolepSnapshot = await firestore.collection('CHATBOX-TOLEP').get();
    chatboxTolepSnapshot.forEach(async (doc) => {
      await firestore.collection('CHATBOX-TOLEP').doc(doc.id).delete();
    });
    
    // Hapus di koleksi CHATBOX-CBC
    const chatboxCBCdel = await firestore.collection('CHATBOX-CBC').get();
    chatboxCBCdel.forEach(async (doc) => {
      await firestore.collection('CHATBOX-CBC').doc(doc.id).delete();
    });

    // Tampilkan pesan sukses
    showAlert("Chat sudah dihapus.");
  } catch(error) {
  showAlert("Ado yang error mang!");
  }
}

// Tambahkan event listener untuk tombol remove-chat
removeChatBtn.addEventListener('click', () => {
  removeAllChats();
});

/*! REMOVE CBC KHUSUS APP ANE 2 */
const delCBC = document.getElementById('delCBC');

async function removeAllChats2() {
  try {
  // Hapus di koleksi CHATBOX-CBC
    const chatboxCBCdel2 = await firestore.collection('CHATBOX-CBC').get();
    chatboxCBCdel2.forEach(async (doc) => {
      await firestore.collection('CHATBOX-CBC').doc(doc.id).delete();
    });

    // Tampilkan pesan sukses
    showAlert("Chat la dihapus.");
  } catch(error) {
  showAlert("Ado yang error mang!");
  }
}

// Tambahkan event listener untuk tombol remove-chat
delCBC.addEventListener('click', () => {
  removeAllChats2();
});

// CLEAR TEXTAREA ON TOUCH MERAH
const textareaMerah = document.querySelector('#messageInputCBC');

textareaMerah.addEventListener('focus', () => {
  textareaMerah.setAttribute('placeholder', '');
});

textareaMerah.addEventListener('blur', () => {
  if (textareaMerah.value === '') {
    textareaMerah.setAttribute('placeholder', 'Isi...');
  }
});

// CHATBOX-CBC
const messageFormCBC = document.getElementById('messageFormCBC');
const messageInputCBC = document.getElementById('messageInputCBC');
const chatBoxCBC = document.getElementById('chatbox-center');

// Regex Match
const regexPatterns = [
  { pattern: /0k3\b/, replace: '<img src="gambar/ok.png">' },
  { pattern: /@bk\b/, replace: '<img src="gambar/besakkelakar.png">' },
  { pattern: /@rx\b/, replace: '<img src="admin/rx.jpg">' },
];

// Firebase Auth Listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
 // Query koleksi SS berdasarkan UID
    firestore.collection('SS').doc(user.uid).onSnapshot((doc) => {
      if (doc.exists) {
   const userName = doc.data().nama;

        // Fungsi kirim pesan
        messageFormCBC.addEventListener('submit', (e) => {
          e.preventDefault();
          let message = messageInputCBC.value.trim();
          if (message === '') return;

          // Cek pesan dengan regex
          let validMessage = false;
          regexPatterns.forEach((regex) => {
            if (regex.pattern.test(message)) {
              message = message.replace(regex.pattern, regex.replace); // Ganti sesuai regex
              validMessage = true;
            }
          });

          if (validMessage) {
    // Tambahkan pesan ke CHATBOX-CBC
            firestore.collection('CHATBOX-CBC').add({
              user: userName,
              message: message,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              userId: user.uid,
            });
       messageInputCBC.value = '';
          }
        });

   // Listener untuk CHATBOX-CBC
 firestore.collection('CHATBOX-CBC')
          .orderBy('timestamp')
          .onSnapshot((snapshot) => {
         chatBoxCBC.innerHTML = '';
    snapshot.forEach((doc) => {
   const messageData = doc.data();
   const timestamp = messageData.timestamp
                ? new Date(messageData.timestamp.toMillis()).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
         })
       : '';
              
      // Buat elemen pesan
 const messageElement = document.createElement('div');
  messageElement.innerHTML = `
                
${messageData.message}<br>
<span style="color:transparent;font-size:1px;">${timestamp}</span>

`;
              chatBoxCBC.appendChild(messageElement);
});

// Scroll to bottom otomatis
            chatBoxCBC.scrollTop = chatBoxCBC.scrollHeight;
          });
      } else {
        console.log('Data user tidak ditemukan di SS!');
      }
    });
  } else {
    console.log('User belum login!');
  }
});

// DORRR!!!!
document.getElementById('DOR').addEventListener('click', function() {
  // Pastikan izin sudah diberikan
  if (Notification.permission === 'granted') {
    // Kirim notifikasi
    new Notification('Mang!', {
      body: 'Mang!',
      icon: 'https://via.placeholder.com/50', // Ganti dengan icon yang diinginkan
    });
  } else {
    // Minta izin jika belum diberikan
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        new Notification('Mang!', {
          body: 'Mang!',
          icon: 'https://via.placeholder.com/50', // Ganti dengan icon yang diinginkan
        });
      } else {
        alert('Izin notifikasi tidak diberikan!');
      }
    });
  }
});