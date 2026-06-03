# Troubleshooting Chatbot GAS

Jika Anda mengalami masalah dengan chatbot Anda, ikuti langkah-langkah berikut:

## 1. Pastikan Proyek GAS Telah Dibuat dan Dideploy

### Membuat Proyek Baru:
- Buka Command Prompt
- Navigasi ke direktori proyek Anda: `cd d:\Chat Bot Qwen`
- Jalankan: `clasp create --type standalone --title "Chatbot Backend"`

### Mengunggah Kode ke GAS:
- Pastikan Anda sudah login: `clasp login`
- Unggah kode ke GAS: `clasp push`

### Menyimpan API Key:
- Buka proyek GAS Anda di browser: `clasp open`
- Di editor GAS, tambahkan pemanggilan fungsi berikut ke salah satu fungsi sementara:
  ```javascript
  function setupApiKey() {
    setApiKey('YOUR_ACTUAL_API_KEY_HERE'); // Ganti dengan API key Anda
  }
  ```
- Simpan dan jalankan fungsi `setupApiKey` sekali
- Setelah itu, hapus atau komentari pemanggilan fungsi tersebut
- Ini akan menyimpan API key Anda secara aman di properti GAS

### Mendeploy Proyek:
- Di terminal, jalankan: `clasp deploy`
- Catat URL deployment yang ditampilkan (akan seperti: `https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec`)

## 2. Memperbarui File index.html

- Buka file `index.html` di editor teks
- Ganti URL pada baris berikut dengan URL deployment Anda:
  ```javascript
  const GAS_URL = "https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec";
  ```
- Simpan perubahan

## 3. Menguji Aplikasi

- Buka file `index.html` di browser Anda
- Coba kirim pesan ke chatbot
- Jika masih ada masalah, buka Developer Tools (F12) dan lihat tab Console untuk pesan error

## 4. Solusi Umum Masalah

### Jika muncul pesan "Failed to fetch" atau "CORS error":
- Ini biasanya bukan masalah dengan CORS karena kita menggunakan GAS sebagai proxy
- Pastikan URL deployment sudah benar
- Pastikan proyek GAS Anda aktif dan dapat diakses

### Jika muncul pesan "API key salah atau tidak valid":
- Pastikan Anda telah menyimpan API key dengan benar di properti GAS
- Pastikan Anda menggunakan API key yang valid dari penyedia layanan AI

### Jika muncul pesan "Gagal terhubung ke server":
- Cek apakah deployment GAS Anda masih aktif
- Coba buka URL deployment di browser untuk memastikan berfungsi

## 5. Melihat Log Kesalahan

- Di proyek GAS Anda, klik "Executions" di sidebar kiri
- Di sini Anda bisa melihat log eksekusi dan potensi kesalahan
- Ini akan membantu Anda men-debug masalah

Jika Anda masih mengalami masalah, silakan periksa log di Google Apps Script dan beri tahu saya pesan kesalahan spesifik yang Anda lihat.