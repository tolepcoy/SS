// Fungsi untuk menutup side panel
function closePanel(panelId) {
  document.getElementById(panelId).style.transform = "translateX(-100%)";
}

// Fungsi untuk membuka side panel
function openPanel(panelId) {
  const panels = ['profile', 'settingsPanel', 'secretSidePanel'];
  panels.forEach(panel => {
    document.getElementById(panel).style.transform = panel === panelId ? "translateX(0)" : "translateX(-100%)";
  });
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

    // Tombol konfirmasi logout
    document.getElementById('confirm-logout').addEventListener('click', () => {
      auth.signOut()
        .then(() => {
          window.location.replace("https://tolepcoy.github.io/SS/index.html");
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
});

/*! =====  FIREBASE CONFIG  ===== */
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
  const cutoff = new Date(now.getTime() - 5 * 60 * 1000); // 5mmt
  
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
