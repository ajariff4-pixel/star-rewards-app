// Alamat Web App GAS rasmi yang Tuan Pengarah berikan
const URL_GAS = "https://script.google.com/macros/s/AKfycbxiLuv0rbk8_4fPjuY2pp2T7aMBaCPapGnyrzkYQOG68dxJ2c7rybS9OoeNbxw4dpgx/exec";

// Fungsi utama untuk menarik data murid sebaik sahaja aplikasi dibuka
function muatDataMurid() {
  const ruanganStatus = document.getElementById("status-memuatkan"); // Sila pastikan ID ini sama dengan HTML anda
  const senaraiMuridContainer = document.getElementById("senarai-murid");

  // Buat panggilan ke Google Apps Script
  fetch(URL_GAS)
    .then(response => {
      if (!response.ok) {
        throw new Error("Gagal menyambung ke pelayan backend GAS.");
      }
      return response.json();
    })
    .then(data => {
      // Sembunyikan tulisan "Memuatkan data murid..."
      if (ruanganStatus) ruanganStatus.style.display = "none";
      
      // Kosongkan bekas senarai sebelum masukkan data baharu
      if (senaraiMuridContainer) senaraiMuridContainer.innerHTML = "";

      // Paparkan senarai murid dummy (Ahmad Jafni & Siti Nurhaliza) ke skrin
      data.forEach(murid => {
        const kadMurid = document.createElement("div");
        kadMurid.className = "kad-murid"; // Sesuai dengan CSS anda
        kadMurid.innerHTML = `
          <p><strong>Nama:</strong> ${murid.nama}</p>
          <p><strong>Bintang:</strong> ⭐️ <span id="bintang-${murid.id}">${murid.bintang}</span></p>
          <button onclick="tambahBintang(${murid.id})">Tambah Bintang 🚀</button>
        `;
        if (senaraiMuridContainer) senaraiMuridContainer.appendChild(kadMurid);
      });
    })
    .catch(error => {
      console.error("Ralat penuh:", error);
      if (ruanganStatus) {
        ruanganStatus.innerHTML = "<span style='color:red;'>Ralat: Gagal memuatkan data. Sila semak sambungan backend.</span>";
      }
    });
}

// Jalankan fungsi memuatkan data secara automatik apabila halaman web siap dibuka
document.addEventListener("DOMContentLoaded", muatDataMurid);
