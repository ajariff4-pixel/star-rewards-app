/**
 * Fungsi utama untuk memaparkan fail Index.html
 * Dipanggil apabila aplikasi diakses melalui URL.
 * Pastikan nama fail HTML adalah 'Index'.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Membaca data murid dari Google Sheets.
 * Mengembalikan array objek dengan medan id, nama, dan bintang.
 */
function dapatkanDataMurid() {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName('Sheet1');
    if (!sheet) {
      throw new Error("Sheet 'Sheet1' tidak dijumpai.");
    }

    var semuaData = sheet.getDataRange().getValues();
    if (semuaData.length <= 1) {
      return [];
    }

    var hasil = [];
    for (var i = 1; i < semuaData.length; i++) {
      hasil.push({
        id: semuaData[i][0],
        nama: semuaData[i][1],
        bintang: semuaData[i][2]
      });
    }

    return hasil;
  } catch (e) {
    Logger.log('Ralat dalam dapatkanDataMurid: ' + e);
    return [];
  }
}

/**
 * Mengemas kini jumlah bintang dalam sheet untuk baris tertentu.
 * @param {number} row Baris untuk dikemas kini (1 = baris pertama, termasuk header).
 * @param {number} jumlahBaru Jumlah bintang baru untuk ditetapkan.
 */
function kemaskiniBintang(row, jumlahBaru) {
  try {
    if (!row || row < 2) {
      throw new Error('Baris mesti bermula dari 2 atau lebih tinggi.');
    }
    if (jumlahBaru === null || jumlahBaru === undefined || isNaN(jumlahBaru)) {
      throw new Error('Jumlah baru mesti nombor yang sah.');
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName('Sheet1');
    if (!sheet) {
      throw new Error("Sheet 'Sheet1' tidak dijumpai.");
    }

    sheet.getRange(row, 3).setValue(Number(jumlahBaru));

    return {
      berjaya: true,
      mesej: 'Bintang dikemaskini pada baris ' + row + '.',
      row: row,
      bintangBaru: Number(jumlahBaru)
    };
  } catch (e) {
    Logger.log('Ralat dalam kemaskiniBintang: ' + e);
    return {
      berjaya: false,
      mesej: e.message || e.toString()
    };
  }
}
