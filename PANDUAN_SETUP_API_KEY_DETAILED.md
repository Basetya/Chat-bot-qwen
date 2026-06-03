# PANDUAN SETUP API KEY - STEP BY STEP

## JAWABAN PERTANYAAN ANDA:

**TIDAK**, untuk **Metode 1 (setApiKey())**, Anda **TIDAK PERLU** menyimpan API key di Script Properties terlebih dahulu. Fungsi `setApiKey()` akan **OTOMATIS** menyimpan API key ke Script Properties setelah Anda memasukkannya di popup.

## PROSES SETUP LENGKAP:

### METODE 1: Menggunakan `setApiKey()` (RECOMMENDED)
**Langkah-langkah:**

1. **Buka Google Apps Script Editor:**
   - https://script.google.com/d/1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri/edit
   - Login dengan akun Google yang sama dengan yang digunakan untuk membuat proyek

2. **Jalankan fungsi `setApiKey()`:**
   - Di sidebar kiri, ada dropdown "Select function" (di atas editor kode)
   - Klik dropdown tersebut
   - Pilih fungsi `setApiKey`
   - Klik tombol **Run** (ikon segitiga hijau di toolbar)

3. **Masukkan API Key:**
   - Akan muncul **popup** yang bertanya: "Masukkan API Key Gemini Anda:"
   - Masukkan API key Gemini Anda (contoh: `AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz`)
   - Klik **OK**

4. **Fungsi akan otomatis:**
   - Menyimpan API key ke Script Properties dengan nama `GEMINI_API_KEY`
   - Menampilkan popup konfirmasi "Berhasil!"
   - Mencatat log "API Key saved to Script Properties"

5. **Verifikasi:**
   - Pilih fungsi `checkApiKey` dari dropdown
   - Klik **Run**
   - Lihat **Logs** (View → Logs) untuk melihat pesan: "API Key sudah diatur (panjang: XX karakter)"

### METODE 2: Menggunakan `setApiKeyManual()` dengan Parameter
**Langkah-langkah:**

1. **Buka GAS Editor** seperti di atas
2. **Di console/logger** (di bagian bawah editor):
   - Klik tab **Logs** atau **Executions**
   - Klik tombol **Run** untuk membuka fungsi execution
   - Di bagian "Function" pilih `setApiKeyManual`
   - Di kolom parameters, masukkan API key dalam tanda kutip:
     ```
     "AIzaSy...MASUKKAN_API_KEY_ANDA_DISINI..."
     ```
   - Klik **Run Function**

### METODE 3: Manual di Script Properties
**Langkah-langkah:**

1. Di GAS Editor, klik **Project Settings** (ikon roda gigi di sidebar kiri)
2. Scroll ke bagian **Script Properties**
3. Klik **Add script property**
4. Isi form:
   - **Property:** `GEMINI_API_KEY`
   - **Value:** `AIzaSy...API_KEY_ANDA...` (API key Gemini Anda)
5. Klik **Save script properties**

## BAGAIMANA SISTEM BEKERJA:

1. **Saat chatbot menerima pesan:**
   - `doPost()` dipanggil
   - `callGeminiAPI()` mencari API key dari `Script Properties`
   - Jika ditemukan → kirim request ke Gemini API
   - Jika tidak ditemukan → error "API Key tidak ditemukan"

2. **Script Properties adalah penyimpanan aman** di Google Apps Script yang:
   - Tidak terlihat di kode sumber
   - Tidak ter-commit ke repository
   - Hanya bisa diakses oleh pemilik script
   - Aman dari exposure publik

## CARA MENDAPATKAN GEMINI API KEY:

1. **Buka Google AI Studio:** https://makersuite.google.com/app/apikey
2. **Login** dengan akun Google
3. **Create API Key** → pilih project atau buat baru
4. **Salin API Key** yang ditampilkan
5. **Aktifkan billing** di Google Cloud Console jika perlu (ada free tier)

## TESTING SETELAH SETUP:

### 1. Test API Key Status:
```
checkApiKey()
```
Output yang diharapkan: `API Key sudah diatur (panjang: 39 karakter)`

### 2. Test Chatbot Frontend:
- Buka file `index.html` di browser (double-click)
- Ketik pesan seperti "Halo" atau "Berapa modal SPKLU?"
- Jika berhasil, akan mendapat respons dari AI

### 3. Test API Langsung (PowerShell):
```powershell
Invoke-RestMethod -Uri "https://script.google.com/macros/s/AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa/exec" -Method POST -ContentType "text/plain;charset=utf-8" -Body '{"message":"Halo"}'
```

## TROUBLESHOOTING UMUM:

### Jika `setApiKey()` tidak muncul popup:
- Pastikan Anda memilih `setApiKey` dari dropdown, bukan mengetik di console
- Refresh halaman GAS Editor
- Coba gunakan browser Chrome

### Jika error "Cannot call Browser.inputBox() from this context":
- Gunakan **Metode 2** atau **Metode 3** sebagai alternatif

### Jika chatbot masih error setelah setup:
1. Jalankan `checkApiKey()` untuk verifikasi
2. Cek Logs untuk error detail
3. Pastikan API key valid di https://makersuite.google.com/app/apikey

## KESIMPULAN:

**Metode 1 (`setApiKey()`)** adalah cara TERMUDAH karena:
- Tidak perlu membuka Project Settings
- Tidak perlu mengetik di console
- Cukup pilih dari dropdown → Run → masukkan API key → Selesai!

Chatbot Anda sudah **100% siap** setelah API key diatur. Semua koneksi, deployment, dan frontend sudah berfungsi dengan baik.