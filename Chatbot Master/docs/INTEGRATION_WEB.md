# Integrasi Ke Web App

Ada dua cara memakai widget.

## Cara 1: Copy File Widget Ke Proyek Web

Copy:

```text
web-widget/chatbot-widget.css
web-widget/chatbot-widget.js
```

Tambahkan ke HTML:

```html
<link rel="stylesheet" href="./chatbot-widget.css">
<script src="./chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    endpoint: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec",
    title: "Chat Assistant",
    subtitle: "Online",
    brandName: "Nama Bisnis",
    primaryColor: "#0d6efd",
    launcherText: "Chat",
    greeting: "Halo, ada yang bisa saya bantu?"
  });
</script>
```

## Cara 2: Pakai Dari Folder Master Saat Development

Untuk demo lokal:

```html
<link rel="stylesheet" href="../web-widget/chatbot-widget.css">
<script src="../web-widget/chatbot-widget.js"></script>
```

## Opsi Konfigurasi Widget

```js
ChatbotWidget.init({
  endpoint: "URL_GAS_EXEC",
  title: "Chat Assistant",
  subtitle: "Online",
  brandName: "Nama Bisnis",
  primaryColor: "#0d6efd",
  launcherText: "Chat",
  placeholder: "Ketik pesan...",
  sendText: "Kirim",
  greeting: "Halo, ada yang bisa saya bantu?",
  errorMessage: "Maaf, gagal terhubung ke server.",
  typingText: "Mengetik..."
});
```

## Integrasi React/Vue/Next

Untuk framework modern, tetap bisa memakai script ini dengan memuat CSS dan JS di layout utama.

Alternatif lebih rapi:

1. Simpan `chatbot-widget.js` di folder public.
2. Simpan `chatbot-widget.css` di folder public.
3. Load script setelah halaman siap.
4. Panggil `ChatbotWidget.init()` satu kali.

