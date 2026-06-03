// ==========================================
// CHATBOT MASTER - GOOGLE APPS SCRIPT BACKEND
// Model: gemini-2.5-flash
// ==========================================

const CONFIG = {
  MODEL: "gemini-2.5-flash",
  BUSINESS_NAME: "Nama Bisnis Anda",
  BOT_NAME: "Chat Assistant",
  PHONE: "021-0000-0000",
  WHATSAPP: "0811-0000-0000",
  EMAIL: "hello@example.com",
  LANGUAGE: "id",
  MAX_OUTPUT_TOKENS: 1200,
  TEMPERATURE: 0.2
};

const KNOWLEDGE_BASE = `
[PROFIL BISNIS]
Tulis profil singkat bisnis di sini.
Contoh: PT Contoh Sejahtera adalah perusahaan penyedia layanan teknologi untuk UMKM.

[PRODUK ATAU LAYANAN]
- Layanan 1: Jelaskan manfaat, target pengguna, dan harga jika ada.
- Layanan 2: Jelaskan manfaat, target pengguna, dan harga jika ada.
- Layanan 3: Jelaskan manfaat, target pengguna, dan harga jika ada.

[FAQ]
- Jam operasional: Senin-Jumat 08.00-17.00 WIB.
- Area layanan: Tulis area layanan bisnis.
- Cara order: Tulis cara order atau konsultasi.
- Garansi: Tulis aturan garansi jika ada.

[KONTAK]
- Telepon: 021-0000-0000
- WhatsApp: 0811-0000-0000
- Email: hello@example.com
`;

const SYSTEM_PROMPT_TEMPLATE = `
Anda adalah {BOT_NAME} dari {BUSINESS_NAME}.

TUGAS UTAMA:
Bantu user memahami informasi bisnis, produk, layanan, harga, proses, dan kontak berdasarkan knowledge base.

SUMBER DATA:
{KNOWLEDGE_BASE}

ATURAN JAWABAN:
1. Jawab hanya berdasarkan SUMBER DATA.
2. Jika informasi tidak ada di SUMBER DATA, jawab: "Untuk info detail, silakan hubungi tim kami."
3. Jangan mengarang harga, fitur, promo, alamat, legalitas, atau janji layanan.
4. Jangan membahas politik, agama, SARA, konten dewasa, aktivitas ilegal, atau topik di luar bisnis.
5. Gunakan bahasa Indonesia yang ramah, profesional, singkat, dan jelas.
6. Maksimal 5-8 kalimat, kecuali user meminta rincian panjang.
7. Jika user terlihat ingin membeli, daftar, booking, atau konsultasi, arahkan ke kontak resmi.
8. Jika diminta kontak, berikan: Telepon {PHONE} | WhatsApp {WHATSAPP} | Email {EMAIL}.
9. Akhiri dengan pertanyaan lanjutan yang relevan jika cocok.

FORMAT:
Jawab langsung tanpa menyebut "berdasarkan knowledge base".
`;

function doPost(e) {
  try {
    var body = parseRequestBody(e);
    var action = String(body.action || "chat").trim();

    // Public admin actions: login/logout/change password
    if (action === "admin_login") {
      return handleAdminLogin(body);
    }

    if (action === "admin_login_google") {
      return handleAdminLoginGoogle(body);
    }

    if (action === "admin_logout") {
      return handleAdminLogout(body);
    }

    if (action === "change_admin_password") {
      return handleChangeAdminPassword(body);
    }

    if (action === "set_knowledge") {
      if (!validateAdminRequest(body)) return unauthorizedResponse();
      return handleSetKnowledge(body);
    }

    if (action === "get_knowledge") {
      if (!validateAdminRequest(body)) return unauthorizedResponse();
      return handleGetKnowledge();
    }

    if (action === "reset_knowledge") {
      if (!validateAdminRequest(body)) return unauthorizedResponse();
      return handleResetKnowledge();
    }

    if (action === "upload_file") {
      if (!validateAdminRequest(body)) return unauthorizedResponse();
      return handleUploadFile(body);
    }

    if (action === "list_files") {
      if (!validateAdminRequest(body)) return unauthorizedResponse();
      return handleListFiles();
    }

    if (action === "delete_file") {
      if (!validateAdminRequest(body)) return unauthorizedResponse();
      return handleDeleteFile(body);
    }

    var userMessage = String(body.message || "").trim();

    if (!userMessage) {
      return jsonResponse({
        response: "Silakan tulis pesan terlebih dahulu.",
        source: "validation"
      });
    }

    var reply = callGeminiAPI(userMessage);

    return jsonResponse({
      response: reply,
      source: CONFIG.MODEL
    });
  } catch (err) {
    Logger.log("ERROR: " + err.toString());

    return jsonResponse({
      response: "Maaf, sistem sedang gangguan. Silakan hubungi:\nTelepon: " + CONFIG.PHONE + "\nWhatsApp: " + CONFIG.WHATSAPP + "\nEmail: " + CONFIG.EMAIL,
      source: "error",
      error: err.toString()
    });
  }
}

function handleSetKnowledge(body) {
  var knowledge = String(body.kb_text || "").trim();

  if (!knowledge) {
    return jsonResponse({
      response: "Knowledge base tidak boleh kosong.",
      source: "validation"
    });
  }

  saveKnowledgeBase(knowledge);

  return jsonResponse({
    response: "Knowledge base berhasil diperbarui.",
    source: "admin"
  });
}

function handleGetKnowledge() {
  var knowledge = getKnowledgeBase();
  return jsonResponse({
    response: knowledge,
    source: "admin"
  });
}

function handleResetKnowledge() {
  saveKnowledgeBase(KNOWLEDGE_BASE.trim());
  return jsonResponse({
    response: "Knowledge base dikembalikan ke konten default.",
    source: "admin"
  });
}

function handleListFiles() {
  var folderId = getUploadsFolderId();
  if (!folderId) {
    return jsonResponse({
      response: [],
      source: "admin"
    });
  }

  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var list = [];
  while (files.hasNext()) {
    var file = files.next();
    list.push({
      id: file.getId(),
      name: file.getName(),
      size: file.getSize(),
      date: file.getLastUpdated().toISOString()
    });
  }

  return jsonResponse({
    response: list,
    source: "admin"
  });
}

function handleDeleteFile(body) {
  var fileId = String(body.file_id || "").trim();
  if (!fileId) {
    return jsonResponse({
      response: "ID file tidak ditemukan.",
      source: "validation"
    });
  }

  try {
    var file = DriveApp.getFileById(fileId);
    file.setTrashed(true);
    return jsonResponse({
      response: "File berhasil dihapus.",
      source: "admin"
    });
  } catch (err) {
    Logger.log('handleDeleteFile error: ' + err.toString());
    return jsonResponse({
      response: "Gagal menghapus file.",
      source: "error"
    });
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput(
    "<h1>Chatbot Master Backend</h1>" +
    "<p>Status: <strong>Running</strong></p>" +
    "<p>Business: " + escapeHtml(CONFIG.BUSINESS_NAME) + "</p>" +
    "<p>Model: " + escapeHtml(CONFIG.MODEL) + "</p>" +
    "<p>API Key: " + escapeHtml(checkApiKey()) + "</p>" +
    '<p>Send POST JSON: {"message":"Halo"}</p>'
  );
}

function callGeminiAPI(userMessage) {
  var apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");

  if (!apiKey) {
    throw new Error("API Key tidak ditemukan. Simpan GEMINI_API_KEY di Script Properties.");
  }

  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + CONFIG.MODEL + ":generateContent";
  var systemPrompt = buildSystemPrompt();
  var payload = {
    contents: [{
      role: "user",
      parts: [{
        text: systemPrompt + "\n\nPERTANYAAN USER:\n" + userMessage
      }]
    }],
    generationConfig: {
      temperature: CONFIG.TEMPERATURE,
      maxOutputTokens: CONFIG.MAX_OUTPUT_TOKENS,
      thinkingConfig: {
        thinkingBudget: 0
      }
    }
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-goog-api-key": apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var httpCode = response.getResponseCode();
  var responseText = response.getContentText();

  Logger.log("Gemini HTTP Code: " + httpCode);

  if (httpCode !== 200) {
    Logger.log("Gemini Error Response: " + responseText);
    throw new Error("Gemini API Error " + httpCode + ": " + responseText);
  }

  var result = JSON.parse(responseText);
  var text = extractGeminiText(result);

  if (!text) {
    throw new Error("Respons Gemini kosong atau tidak valid.");
  }

  return text;
}

function buildSystemPrompt() {
  return SYSTEM_PROMPT_TEMPLATE
    .replaceAll("{BOT_NAME}", CONFIG.BOT_NAME)
    .replaceAll("{BUSINESS_NAME}", CONFIG.BUSINESS_NAME)
    .replaceAll("{KNOWLEDGE_BASE}", getKnowledgeBase())
    .replaceAll("{PHONE}", CONFIG.PHONE)
    .replaceAll("{WHATSAPP}", CONFIG.WHATSAPP)
    .replaceAll("{EMAIL}", CONFIG.EMAIL);
}

function getKnowledgeBase() {
  var saved = PropertiesService.getScriptProperties().getProperty("KNOWLEDGE_BASE_TEXT");
  if (saved && String(saved).trim().length > 0) {
    return String(saved).trim();
  }
  return KNOWLEDGE_BASE;
}

function saveKnowledgeBase(text) {
  PropertiesService.getScriptProperties().setProperty("KNOWLEDGE_BASE_TEXT", String(text).trim());
}

function handleUploadFile(body) {
  var filename = String(body.filename || "").trim();
  var fileData = String(body.file_data || "").trim();
  var contentType = String(body.content_type || "application/octet-stream");

  if (!filename || !fileData) {
    return jsonResponse({
      response: "Nama file dan data file harus diberikan.",
      source: "validation"
    });
  }

  var bytes = Utilities.base64Decode(fileData);
  var blob = Utilities.newBlob(bytes, contentType, filename);
  var file = saveUploadedFile(blob, filename);
  var parsedText = parseUploadedFile(file, filename);

  if (parsedText) {
    appendKnowledgeBase("[File: " + filename + "]\n" + parsedText);
  }

  return jsonResponse({
    response: "File '" + filename + "' berhasil diunggah." + (parsedText ? " Isi teks berhasil ditambahkan ke knowledge base." : " Tekstualisasi file belum didukung untuk jenis file ini."),
    source: "admin"
  });
}

function parseUploadedFile(file, filename) {
  var ext = String(filename).split('.').pop().toLowerCase();
  try {
    if (ext === 'txt' || ext === 'md' || ext === 'csv' || ext === 'json') {
      return file.getBlob().getDataAsString();
    }
    if (ext === 'pdf') {
      return parsePdfFile(file, filename);
    }
    if (ext === 'xlsx' || ext === 'xls') {
      return parseSpreadsheetFile(file, filename);
    }
    if (ext === 'docx') {
      return parseDocxFile(file, filename);
    }
    if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
      return parseImageFile(file, filename);
    }
    return null;
  } catch (err) {
    Logger.log('parseUploadedFile error: ' + err.toString());
    return null;
  }
}

function saveUploadedFile(blob, filename) {
  var folder = getUploadsFolder();
  return folder.createFile(blob);
}

function getUploadsFolder() {
  var folderName = 'Chatbot Knowledge Uploads';
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

function getUploadsFolderId() {
  return getUploadsFolder().getId();
}

function parsePdfFile(file, filename) {
  try {
    var resource = {
      title: filename,
      mimeType: MimeType.GOOGLE_DOCS
    };
    var converted = Drive.Files.insert(resource, file.getBlob(), {convert: true, ocr: true, ocrLanguage: 'id'});
    var doc = DocumentApp.openById(converted.id);
    var text = doc.getBody().getText();
    DriveApp.getFileById(converted.id).setTrashed(true);
    return text;
  } catch (err) {
    Logger.log('parsePdfFile error: ' + err.toString());
    return null;
  }
}

function parseSpreadsheetFile(file, filename) {
  try {
    var resource = {
      title: filename,
      mimeType: MimeType.GOOGLE_SHEETS
    };
    var converted = Drive.Files.insert(resource, file.getBlob(), {convert: true});
    var ss = SpreadsheetApp.openById(converted.id);
    var text = [];
    ss.getSheets().forEach(function(sheet) {
      text.push('[Sheet: ' + sheet.getName() + ']');
      var values = sheet.getDataRange().getValues();
      values.forEach(function(row) {
        text.push(row.map(function(cell) {
          return cell === null ? '' : String(cell);
        }).join(' | '));
      });
    });
    DriveApp.getFileById(converted.id).setTrashed(true);
    return text.join('\n');
  } catch (err) {
    Logger.log('parseSpreadsheetFile error: ' + err.toString());
    return null;
  }
}

function parseDocxFile(file, filename) {
  try {
    var resource = {
      title: filename,
      mimeType: MimeType.GOOGLE_DOCS
    };
    var converted = Drive.Files.insert(resource, file.getBlob(), {convert: true});
    var doc = DocumentApp.openById(converted.id);
    var text = doc.getBody().getText();
    DriveApp.getFileById(converted.id).setTrashed(true);
    return text;
  } catch (err) {
    Logger.log('parseDocxFile error: ' + err.toString());
    return null;
  }
}

function parseImageFile(file, filename) {
  try {
    var resource = {
      title: filename,
      mimeType: MimeType.GOOGLE_DOCS
    };
    var converted = Drive.Files.insert(resource, file.getBlob(), {ocr: true, ocrLanguage: 'id'});
    var doc = DocumentApp.openById(converted.id);
    var text = doc.getBody().getText();
    DriveApp.getFileById(converted.id).setTrashed(true);
    return text;
  } catch (err) {
    Logger.log('parseImageFile error: ' + err.toString());
    return null;
  }
}

function appendKnowledgeBase(text) {
  var current = getKnowledgeBase();
  saveKnowledgeBase(truncateKnowledgeBase(current + '\n\n' + text));
}

function truncateKnowledgeBase(text) {
  var maxLength = 25000;
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(text.length - maxLength);
}

function extractGeminiText(result) {
  if (!result.candidates || !result.candidates.length) {
    return "";
  }

  var candidate = result.candidates[0];

  if (!candidate.content || !candidate.content.parts) {
    return "";
  }

  return candidate.content.parts
    .map(function(part) {
      return part.text || "";
    })
    .join("")
    .trim();
}

function parseRequestBody(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  return JSON.parse(e.postData.contents);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function setApiKeyManual(apiKey) {
  if (!apiKey || String(apiKey).trim() === "") {
    throw new Error('API Key harus diberikan. Contoh: setApiKeyManual("AIzaSy...")');
  }

  PropertiesService.getScriptProperties().setProperty("GEMINI_API_KEY", String(apiKey).trim());
  return "API Key berhasil disimpan. Panjang: " + String(apiKey).trim().length + " karakter.";
}

function checkApiKey() {
  var apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");

  if (apiKey) {
    return "Sudah diatur (panjang: " + apiKey.length + " karakter)";
  }

  return "Belum diatur";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --------- Admin authentication helpers ---------
function hashPassword(password) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(password || ''), Utilities.Charset.UTF_8);
  return bytes.map(function(b){ var v = (b < 0) ? b + 256 : b; return (v < 16 ? '0' : '') + v.toString(16); }).join('');
}

function getStoredAdminHash() {
  var props = PropertiesService.getScriptProperties();
  var h = props.getProperty('ADMIN_PASS_HASH');
  if (!h) {
    // set default password 135711
    var defaultHash = hashPassword('135711');
    props.setProperty('ADMIN_PASS_HASH', defaultHash);
    return defaultHash;
  }
  return h;
}

function verifyAdminCredentials(username, password) {
  if (!username || String(username).trim().toLowerCase() !== 'admin') return false;
  var stored = getStoredAdminHash();
  var test = hashPassword(password || '');
  return stored === test;
}

function generateAdminToken() {
  var token = Utilities.getUuid();
  var props = PropertiesService.getScriptProperties();
  props.setProperty('ADMIN_TOKEN', token);
  // expire in 8 hours
  var exp = Date.now() + (8 * 60 * 60 * 1000);
  props.setProperty('ADMIN_TOKEN_EXP', String(exp));
  return token;
}

function validateAdminToken(token) {
  if (!token) return false;
  var props = PropertiesService.getScriptProperties();
  var stored = props.getProperty('ADMIN_TOKEN');
  var exp = Number(props.getProperty('ADMIN_TOKEN_EXP') || 0);
  if (!stored || stored !== token) return false;
  if (Date.now() > exp) {
    // expired, clear
    props.deleteProperty('ADMIN_TOKEN');
    props.deleteProperty('ADMIN_TOKEN_EXP');
    return false;
  }
  return true;
}

function clearAdminToken() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty('ADMIN_TOKEN');
  props.deleteProperty('ADMIN_TOKEN_EXP');
}

function setAdminPassword(newPassword) {
  if (!newPassword) throw new Error('Password baru kosong');
  var props = PropertiesService.getScriptProperties();
  props.setProperty('ADMIN_PASS_HASH', hashPassword(newPassword));
}

function validateAdminRequest(body) {
  var token = String(body.admin_token || '').trim();
  return validateAdminToken(token);
}

function unauthorizedResponse() {
  return jsonResponse({ response: 'Unauthorized. Login required.', source: 'auth' });
}

function handleAdminLogin(body) {
  var username = String(body.username || '').trim();
  var password = String(body.password || '').trim();
  if (verifyAdminCredentials(username, password)) {
    var token = generateAdminToken();
    return jsonResponse({ response: 'OK', source: 'auth', token: token, expires: PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN_EXP') });
  }
  return jsonResponse({ response: 'Invalid username or password.', source: 'auth' });
}

function handleAdminLogout(body) {
  var token = String(body.admin_token || '').trim();
  if (validateAdminToken(token)) {
    clearAdminToken();
    return jsonResponse({ response: 'Logged out', source: 'auth' });
  }
  return unauthorizedResponse();
}

function handleChangeAdminPassword(body) {
  var token = String(body.admin_token || '').trim();
  var newPass = String(body.new_password || '').trim();
  if (!validateAdminToken(token)) return unauthorizedResponse();
  try {
    setAdminPassword(newPass);
    // rotate token after password change
    clearAdminToken();
    return jsonResponse({ response: 'Password berhasil diubah. Silakan login ulang.', source: 'auth' });
  } catch (err) {
    return jsonResponse({ response: 'Gagal mengubah password.', source: 'error' });
  }
}

function getAdminGoogleClientId() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_GOOGLE_CLIENT_ID') || '';
}

function getAdminAllowedEmails() {
  var raw = PropertiesService.getScriptProperties().getProperty('ADMIN_ALLOWED_EMAILS') || '';
  if (!raw) return null; // null means allow any
  return raw.split(',').map(function(s){ return String(s).trim().toLowerCase(); }).filter(function(s){ return s.length > 0; });
}

function setAdminAllowedEmails(emailsList) {
  if (!emailsList) {
    PropertiesService.getScriptProperties().deleteProperty('ADMIN_ALLOWED_EMAILS');
    return 'ADMIN_ALLOWED_EMAILS dihapus (semua akun Google diterima).';
  }
  PropertiesService.getScriptProperties().setProperty('ADMIN_ALLOWED_EMAILS', String(emailsList).trim());
  return 'ADMIN_ALLOWED_EMAILS diatur: ' + String(emailsList).trim();
}

function handleAdminLoginGoogle(body) {
  var idToken = String(body.id_token || '').trim();
  if (!idToken) return jsonResponse({ response: 'ID token tidak ditemukan.', source: 'auth' });

  try {
    var url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken);
    var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) {
      return jsonResponse({ response: 'ID token tidak valid.', source: 'auth' });
    }
    var info = JSON.parse(res.getContentText());
    var email = String(info.email || '').toLowerCase();
    var aud = String(info.aud || '');

    var clientId = getAdminGoogleClientId();
    if (clientId && aud !== clientId) {
      return jsonResponse({ response: 'Token aud tidak cocok. Periksa ADMIN_GOOGLE_CLIENT_ID.', source: 'auth' });
    }

    var allowed = getAdminAllowedEmails();
    if (Array.isArray(allowed)) {
      if (allowed.indexOf(email) === -1) {
        return jsonResponse({ response: 'Akun Google tidak diizinkan.', source: 'auth' });
      }
    }

    // success: generate admin token
    var token = generateAdminToken();
    return jsonResponse({ response: 'OK', source: 'auth', token: token, email: email, expires: PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN_EXP') });
  } catch (err) {
    Logger.log('handleAdminLoginGoogle error: ' + err.toString());
    return jsonResponse({ response: 'Gagal memverifikasi Google ID token.', source: 'auth' });
  }
}

