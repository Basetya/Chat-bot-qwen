# Integrasi Ke Mobile App

Mobile app tidak perlu memakai `chatbot-widget.js`. Aplikasi cukup mengirim request HTTP ke endpoint GAS.

## Endpoint

```text
POST https://script.google.com/macros/s/DEPLOYMENT_ID/exec
Content-Type: text/plain;charset=utf-8
```

Body:

```json
{
  "message": "Halo"
}
```

Response:

```json
{
  "response": "Halo, ada yang bisa saya bantu?",
  "source": "gemini-2.5-flash"
}
```

## Contoh JavaScript/React Native

```js
async function sendChat(message) {
  const response = await fetch("https://script.google.com/macros/s/DEPLOYMENT_ID/exec", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  return data.response;
}
```

## Contoh Flutter

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<String> sendChat(String message) async {
  final response = await http.post(
    Uri.parse('https://script.google.com/macros/s/DEPLOYMENT_ID/exec'),
    headers: {'Content-Type': 'text/plain;charset=utf-8'},
    body: jsonEncode({'message': message}),
  );

  final data = jsonDecode(response.body);
  return data['response'] ?? 'Terjadi kesalahan.';
}
```

## Catatan Mobile

- Jangan menyimpan Gemini API key di mobile app.
- Semua panggilan ke Gemini harus lewat backend GAS.
- Simpan riwayat chat di mobile app jika diperlukan.
- Tambahkan loading state saat menunggu respons.

