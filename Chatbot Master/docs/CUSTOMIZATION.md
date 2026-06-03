# Customization Guide

## Mengganti Brand

Ubah `CONFIG` di `backend/Code.gs`:

```js
BUSINESS_NAME: "Nama Bisnis",
BOT_NAME: "Nama Bot",
PHONE: "Nomor Telepon",
WHATSAPP: "Nomor WhatsApp",
EMAIL: "Email"
```

## Mengganti Pengetahuan Bot

Ubah `KNOWLEDGE_BASE`:

```js
const KNOWLEDGE_BASE = `
[PROFIL BISNIS]
...

[PRODUK]
...

[FAQ]
...
`;
```

Tips:

- Tulis fakta bisnis secara jelas.
- Jangan masukkan data yang belum pasti.
- Untuk harga, tulis range atau aturan jika sering berubah.
- Untuk promo, cantumkan tanggal berlaku.

## Mengganti Gaya Jawaban

Ubah `SYSTEM_PROMPT_TEMPLATE`.

Contoh gaya lebih formal:

```text
Gunakan bahasa formal, sopan, dan ringkas.
```

Contoh gaya sales:

```text
Gunakan gaya konsultatif dan arahkan user ke konsultasi WhatsApp jika terlihat berminat.
```

## Mengganti Tampilan Widget

Saat init:

```js
ChatbotWidget.init({
  primaryColor: "#198754",
  title: "Konsultan Online",
  subtitle: "Siap membantu",
  launcherText: "Bantuan"
});
```

Atau edit `web-widget/chatbot-widget.css`.

