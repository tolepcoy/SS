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

  // Toggle active saat button diklik
  lookBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Supaya klik button nggak dianggap klik di luar
    userOnline.classList.toggle("active");
    lookBtn.classList.toggle("active");
  });

  // Remove active kalau klik di mana aja
  document.addEventListener("click", function () {
    userOnline.classList.remove("active");
    lookBtn.classList.remove("active");
  });

  // Mencegah close saat klik di dalam user-online
  userOnline.addEventListener("click", function (e) {
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

// Elemen penting
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const chatBoxTolep = document.getElementById('chatbox-tolep');
const blink = document.getElementById('blink');
const lookBtn = document.getElementById('look');
const sendButton = document.getElementById('sendButton');


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    messageForm.style.visibility = 'visible';
    messageForm.style.pointerEvents = 'auto';
    sendButton.disabled = false;
    lookBtn.disabled = false;

    firestore.collection('SS').doc(user.uid).get().then((doc) => {
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
            blink.innerHTML = '_';
            chatBox.innerHTML = '';

            snapshot.forEach((doc) => {
              const messageData = doc.data();
              const timestamp = messageData.timestamp 
        ? new Date(messageData.timestamp.toMillis()).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'Zonk';
              const messageElement = document.createElement('div');

              messageElement.innerHTML = `
<div id="sender">
${messageData.nama}
<div id="timetrex" style="color: #0d0;">${timestamp}</div>
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
            blink.innerHTML = '_';
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
    }).catch((error) => {
      console.error('Error getting document: ', error);
    });

  } else {
    // Kondisi user belum login
    messageForm.style.visibility = 'hidden';
    messageForm.style.pointerEvents = 'none';
    sendButton.disabled = true;
    lookBtn.disabled = false;
    chatBox.innerHTML = `
      <div id="beforeChatLogin" style="text-align:center;font-weight:bold;">
        <h5 style="color:#f55;">Ente belum login!</h5>
        <button id="loginChat" style="color:#0b0">
          <a href="https://tolepcoy.github.io/SS/login-form.html">Login</a>
        </button>
      </div>
    `;
    chatBoxTolep.innerHTML = `
      <span style="color:#f55;">Tolep sedang Offline!</span>
    `;
    blink.innerHTML = `
      <span style="color:#f55;vertical-align: -1px;font-size:10px;">Offline</span>
    `;
  }
});
// -- end chatbox

// CLEAR CHAT ADMIN
function bersihkanChatboxLama() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 1 * 60 * 1000);
  
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
function updateStatusOnline(uid) {
  // Update status ke online
  firestore.collection('SS').doc(uid).update({
    online: true,
    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Event untuk mendeteksi aktivitas user (misalnya saat mengetik di chat)
const inputChat = document.getElementById('input-chat');
inputChat.addEventListener('input', () => {
  const user = firebase.auth().currentUser;
  if (user) {
    updateStatusOnline(user.uid);
  }
});

let offlineTimer;

function startOfflineTimer(uid) {
  // Timer untuk set status offline setelah 1 menit (60000 ms)
  offlineTimer = setTimeout(() => {
    firestore.collection('SS').doc(uid).update({
      online: false,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });
  }, 60000); // 1 menit
}

// Reset timer jika ada aktivitas
inputChat.addEventListener('input', () => {
  const user = firebase.auth().currentUser;
  if (user) {
    clearTimeout(offlineTimer); // Reset timer
    startOfflineTimer(user.uid); // Start timer baru
  }
});

function cekStatusOnline(uid) {
  firestore.collection('SS').doc(uid)
    .onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();

        // Cek status online dan tampilkan nama jika online
        if (data.online) {
          yangOnlineElement.innerHTML = `<div style="font-weight:bold;color: #0e0;">${data.nama} &nbsp;&#9673;</div>`;
        } else {
          yangOnlineElement.innerHTML = '';
        }
      }
    });
}
