# Panduan Penggunaan Clasp untuk Chatbot GAS

Ikuti langkah-langkah berikut untuk mengatur dan menggunakan chatbot Anda:

## 1. Jalankan setup.bat untuk memeriksa status clasp Anda
- Buka Command Prompt atau PowerShell
- Navigasi ke folder proyek Anda: `cd d:\Chat Bot Qwen`
- Jalankan file setup: `setup.bat`
- Ini akan memeriksa apakah Anda sudah terhubung dengan akun Google melalui clasp

## 2. Jika Anda belum login ke clasp
- Jalankan perintah berikut di terminal Anda: `clasp login`
- Ikuti instruksi untuk login ke akun Google Anda
- Izinkan akses yang diminta oleh Google

## 3. Jika Anda membuat proyek baru
- Jalankan perintah berikut di terminal: `clasp create --type standalone --title "Chatbot Backend"`
- Ini akan membuat proyek Google Apps Script baru dan menghasilkan script ID

## 4. Jalankan clasp push untuk mengunggah kode Anda ke GAS
- Pastikan Anda berada di direktori proyek Anda
- Jalankan perintah: `clasp push`
- Ini akan mengunggah file Code.gs ke proyek GAS Anda

## 5. Di editor GAS, jalankan fungsi setApiKey dengan kunci API Anda sebagai parameter
- Buka proyek GAS Anda di browser (https://script.google.com/home)
- Di editor, temukan fungsi `setApiKey(apiKey)`
- Di panel sebelah kanan, klik tombol "Run" dan pilih fungsi `setApiKey`
- Sebelum menjalankan, Anda perlu mengatur API key Anda sebagai parameter
- Anda juga bisa menambahkan pemanggilan fungsi ini di bagian atas file Code.gs sementara:
  ```javascript
  // Hapus baris ini setelah API key disimpan
  // setApiKey('YOUR_ACTUAL_API_KEY_HERE');
  ```
- Jalankan fungsi tersebut sekali untuk menyimpan API key Anda secara aman
- Ingat untuk menghapus atau mengomentari baris pemanggilan fungsi setelah digunakan

## 6. Deploy proyek Anda dengan clasp deploy
- Kembali ke terminal Anda
- Jalankan perintah: `clasp deploy`
- Ini akan membuat deployment baru dari skrip Anda
- Catat deployment ID yang dihasilkan

## 7. Salin URL deployment dan perbarui file index.html Anda
- URL deployment akan berupa sesuatu seperti: `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`
- Buka file `index.html` di folder proyek Anda
- Temukan baris berikut dan ganti dengan URL deployment Anda:
  ```javascript
  const GAS_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
  ```
- Simpan file index.html

Setelah menyelesaikan semua langkah, Anda siap menguji chatbot Anda!