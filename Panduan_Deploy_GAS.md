# Panduan Deploy Google Apps Script untuk Chatbot

## Langkah-langkah:

### 1. Membuat Proyek Baru di Google Apps Script
1. Buka https://script.google.com/
2. Klik tombol "+" untuk membuat proyek baru
3. Ganti nama file "Code.gs" yang dibuat otomatis dengan kode berikut:

### 2. Salin Kode Berikut ke Google Apps Script:
(Copy kode dari file Code.gs yang ada di folder ini)

### 3. Ganti API Key
1. Di dalam kode, cari baris: `var apiKey = "YOUR_API_KEY_HERE";`
2. Ganti `"YOUR_API_KEY_HERE"` dengan API key Anda
3. Simpan proyek (Ctrl+S)

### 4. Deploy sebagai Web App
1. Klik "Deploy" di kanan atas
2. Pilih "New Deployment"
3. Klik ikon "Web App" di bagian "Select type"
4. Isi form:
   - Description: "Chatbot Backend"
   - Execution API access: "Anyone"
   - Who has access: "Anyone" atau "Anyone with Google account" (tergantung kebutuhan)
5. Klik "Deploy"
6. Anda akan diminta login dan memberikan izin - ikuti instruksi
7. Salin URL yang ditampilkan (akan seperti: https://script.google.com/macros/s/.../exec)

### 5. Perbarui File index.html
1. Buka file index.html di folder ini
2. Ganti nilai konstanta GAS_URL dengan URL deployment Anda:
   ```javascript
   const GAS_URL = "https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec";
   ```
3. Kosongkan atau hapus bagian API_KEY karena sekarang tidak digunakan lagi di sisi klien

### 6. Uji Coba
1. Buka file index.html di browser
2. Pastikan chatbot dapat berkomunikasi dengan GAS Anda

## Catatan Penting:
- Jaga kerahasiaan API key Anda
- Pertimbangkan untuk membatasi akses ke aplikasi GAS Anda
- Monitor penggunaan API untuk menghindari biaya tak terduga