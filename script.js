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
  const cutoff = new Date(now.getTime() - 24 * 60 * 1000);
  
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
  }, 1800000); // 3 menit
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
        updateStatusOnline(user.uid); // Set online saat ada aktivitas
        startOfflineTimer(user.uid); // Timer untuk set offline
      }
    });
  }

  // Fungsi cek semua user yang online
  function cekStatusSemuaOnline() {
    firestore.collection('SS')
      .where('online', '==', true) // Ambil user yang statusnya online
      .onSnapshot((snapshot) => {
        if (yangOnlineElement) {
          let onlineUsers = '';

          snapshot.forEach((doc) => {
            const data = doc.data();
            onlineUsers += `<div style="font-weight:bold;color: #0e0;font-size:12px;">${data.nama} &nbsp;&#9673;</div>`;
          });

          // Tampilkan semua user yang online
          yangOnlineElement.innerHTML = onlineUsers || '';
        }
      }, (error) => {
        console.error("Error fetching online users:", error);
      });
  }

  // Mulai cek semua user online saat halaman aktif
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      updateStatusOnline(user.uid); // Set online saat user terdeteksi
      startOfflineTimer(user.uid); // Mulai timer offline
      cekStatusSemuaOnline(); // Tampilkan daftar online
    }
  });
});

//TERMINAL
const terminal = document.getElementById("terminal");
const wow = document.getElementById("wow");
const blinkTerminal = document.querySelector(".blinkTerminal");

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
            { text: "$ Administrator Tolep Coy was checking!", delay: 10, blinkTerminal: true },
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
    // Deteksi spasi kosong atau baris kosong
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
            blinkTerminal.style.display = "none";
            blinkTerminal.style.animation = "none";
        }
    }
    nextCommand();
}

wow.addEventListener("click", () => {
    if (!isCommandRunning) {
      wow.style.display = 'none';
      wow.style.pointerEvents = 'none';
      terminal.style.background = 'black';
        isCommandRunning = true; 
        runCommands(); 
    }
});