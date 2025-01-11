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

// CHAT BOX
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const chatBoxTolep = document.getElementById('chatbox-tolep');
const sendButton = document.getElementById('sendButton');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    messageForm.style.display = 'flex';
    sendButton.disabled = false;

    // Ambil nama user dari database
    firestore.collection('SS').doc(user.uid).get().then((doc) => {
      if (doc.exists) {
        const userName = doc.data().nama;

        // Fungsi Kirim Pesan
        messageForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const message = messageInput.value.trim();
          if (message === '') return;

          firestore.collection('CHATBOX').add({
            nama: userName,
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userId: user.uid,
          });

          messageInput.value = '';
        });

        // Real-time Listener untuk Chatbox
        firestore.collection('CHATBOX')
          .orderBy('timestamp')
          .onSnapshot((snapshot) => {
            chatBox.innerHTML = ''; // Reset isi chatbox publik
            chatBoxTolep.innerHTML = ''; // Reset isi chatbox-tolep (pribadi)

            snapshot.forEach((doc) => {
              const messageData = doc.data();
              const messageHTML = `
                <div id="sender">${messageData.nama}</div>
                <div id="text-chat">${messageData.text}</div>
              `;

              // Tambahkan ke chatbox (publik)
              const messageElement = document.createElement('div');
              messageElement.innerHTML = messageHTML;
              chatBox.appendChild(messageElement);

              // Kalau pesan ente, tambahkan juga ke chatbox-tolep
              if (messageData.userId === user.uid) {
                const userMessageElement = document.createElement('div');
                userMessageElement.innerHTML = messageHTML;
                chatBoxTolep.appendChild(userMessageElement);
              }
            });

            // Scroll otomatis ke bawah
            chatBox.scrollTop = chatBox.scrollHeight;
            chatBoxTolep.scrollTop = chatBoxTolep.scrollHeight;
          });
      }
    }).catch((error) => {
      console.error('Error getting document: ', error);
    });

  } else {
    // User belum login
    messageForm.style.display = 'none';
    sendButton.disabled = true;
    chatBox.innerHTML = `
      <div id="beforeChatLogin" style="text-align:center;font-weight:bold;">
        <h5>Ente belum login!</h5>
        <button id="loginChat">
          <a href="https://tolepcoy.github.io/SS/login-form.html">Login</a>
        </button>
      </div>
    `;
    const loginChatBtn = document.getElementById("loginChat");
    if (loginChatBtn) {
      loginChatBtn.style.background = 'url("icon/bgBtn2.png")';
    }
  }
});