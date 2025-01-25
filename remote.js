// Cek apakah elemen body sudah tersedia
document.addEventListener("DOMContentLoaded", () => {
  // Buat elemen overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  overlay.style.color = "white";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.fontSize = "20px";
  overlay.style.zIndex = "9999";
  overlay.innerHTML = "<b>Maaf, aplikasi sedang diperbaiki!</b>";

  // Tambahkan overlay ke body
  document.body.appendChild(overlay);
});