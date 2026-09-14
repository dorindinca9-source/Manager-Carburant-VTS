import { Capacitor, registerPlugin } from '@capacitor/core';

const WhatsAppShare = registerPlugin('WhatsAppShare');

function bytesToBase64(bytes) {
  let binary = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, Math.min(i + CHUNK, bytes.length)));
  }
  return btoa(binary);
}

async function fileToPayload(file) {
  const buf = await file.arrayBuffer();
  return {
    name: file.name || 'document',
    mime: file.type || 'application/octet-stream',
    data: bytesToBase64(new Uint8Array(buf))
  };
}

window.NativeWhatsAppShare = {
  isNative() {
    return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
  },

  async shareFiles(files, title = '', text = '') {
    if (!this.isNative()) throw new Error('Partajarea nativă este disponibilă doar în APK Android.');
    if (!Array.isArray(files) || files.length === 0) throw new Error('Nu există fișiere pentru trimitere.');

    const payloadFiles = [];
    for (const file of files) payloadFiles.push(await fileToPayload(file));

    return WhatsAppShare.share({
      title: String(title || ''),
      text: String(text || ''),
      files: payloadFiles
    });
  }
};
