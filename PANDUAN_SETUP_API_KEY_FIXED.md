# PANDUAN SETUP API KEY CHATBOT - REVISI

## PERBAIKAN FUNGSI SETUP API KEY

Masalah: Fungsi `setApiKeyManual()` tidak bisa memunculkan popup UI karena Google Apps Script membatasi penggunaan `Browser.inputBox()` dari context tertentu.

**SOLUSI:** Gunakan fungsi `setApiKey()` saja untuk setup API key, atau gunakan `setApiKeyManual()` dengan parameter.

## CARA SETUP API KEY:

### OPTION A: Menggunakan `setApiKey()` (RECOMMENDED)
1. **Buka Google Apps Script Editor:**
   - https://script.google.com/d/1ChtmonaaHTeT6JzG8oVp-fYw9uKYM0yZXfXP57LsjG8t46o9jlhXCHri/edit

2. **Jalankan fungsi `setApiKey()`:**
   - Di sidebar kiri, klik dropdown "Select function"
   - Pilih `setApiKey`
   - Klik tombol **Run** (segitiga hijau)
   - Akan muncul popup untuk memasukkan API Key
   - Masukkan Google Gemini API Key Anda
   - Klik **OK**

3. **Verifikasi:**
   - Pilih fungsi `checkApiKey` dari dropdown
   - Klik **Run**
   - Lihat log untuk memastikan API key sudah tersimpan

### OPTION B: Menggunakan `setApiKeyManual()` dengan Parameter
1. **Buka GAS Editor** seperti di atas
2. **Di console/logger**, ketik:
   ```
   setApiKeyManual("AIzaSy...MASUKKAN_API_KEY_ANDA_DISINI...")
   ```
3. **Ganti** `AIzaSy...MASUKKAN_API_KEY_ANDA_DISINI...` dengan API key Gemini Anda yang sebenarnya
4. **Tekan Enter** untuk menjalankan

### OPTION C: Menggunakan Script Properties Langsung
1. Di GAS Editor, klik **Project Settings** (ikon roda gigi)
2. Scroll ke bagian **Script Properties**
3. Klik **Add script property**
4. Masukkan:
   - Property: `GEMINI_API_KEY`
   - Value: `AIzaSy...API_KEY_ANDA...`
5. Klik **Save script properties**

## CARA MENDAPATKAN GEMINI API KEY:

1. **Buka Google AI Studio:**
   - https://makersuite.google.com/app/apikey
   - Login dengan akun Google

2. **Buat API Key:**
   - Klik **Create API Key**
   - Pilih project yang ada atau buat baru
   - Salin API Key yang ditampilkan

3. **Aktifkan Billing (jika perlu):**
   - Buka Google Cloud Console
   - Pastikan billing aktif untuk proyek tersebut
   - Gemini API memiliki free tier untuk penggunaan terbatas

## TESTING SETELAH SETUP:

1. **Test API Key Status:**
   ```
   checkApiKey()
   ```
   Harus mengembalikan: `API Key sudah diatur (panjang: XX karakter)`

2. **Test Chatbot:**
   - Buka `index.html` di browser
   - Ketik pesan untuk testing

3. **Test API Langsung:**
   ```powershell
   Invoke-RestMethod -Uri "https://script.google.com/macros/s/AKfycbxrqLYBo3SJdyLFs_JYFuzUlJm02AA1-tZqRfZG1qtyDBSWspWoeQ8P9YvhYOyEgFGa/exec" -Method POST -ContentType "text/plain;charset=utf-8" -Body '{"message":"Halo"}'
   ```

## TROUBLESHOOTING:

### Error "Cannot call Browser.inputBox() from this context":
- Gunakan **OPTION B** atau **OPTION C** di atas
- Atau jalankan `setApiKey()` dari dropdown fungsi, bukan dari console

### Error "API Key tidak ditemukan":
- Pastikan sudah menjalankan salah satu metode setup di atas
- Refresh halaman GAS Editor
- Jalankan `checkApiKey()` untuk verifikasi

### Error "Gemini API Error 403/429":
- Cek billing di Google Cloud Console
- Cek quota usage di Google AI Studio
- API key mungkin expired atau tidak valid

## CATATAN PENTING:

1. **JANGAN** hardcode API key di kode
2. **JANGAN** commit API key ke repository
3. **SELALU** gunakan Script Properties untuk menyimpan API key
4. **TEST** dengan `checkApiKey()` setelah setup

## FUNGSI YANG TERSEDIA:

1. `setApiKey()` - Setup via UI popup (harus di-run dari dropdown)
2. `setApiKeyManual(apiKey)` - Setup via parameter (contoh: `setApiKeyManual("AIzaSy...")`)
3. `checkApiKey()` - Cek status API key
4. `doGet()` - Testing endpoint via browser

Chatbot sudah siap digunakan setelah API key diatur!