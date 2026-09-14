import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const android = path.join(root, 'android');
const appSrc = path.join(android, 'app', 'src', 'main');
const pkgDir = path.join(appSrc, 'java', 'ro', 'vts', 'managercarburant');

fs.mkdirSync(pkgDir, { recursive: true });

const pluginTemplate = fs.readFileSync(
  path.join(root, 'scripts', 'WhatsAppSharePlugin.java.txt'),
  'utf8'
);

fs.writeFileSync(
  path.join(pkgDir, 'WhatsAppSharePlugin.java'),
  pluginTemplate
);

const mainActivity = path.join(pkgDir, 'MainActivity.java');

fs.writeFileSync(mainActivity, `package ro.vts.managercarburant;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugin(WhatsAppSharePlugin.class);
    super.onCreate(savedInstanceState);
  }
}
`);

const xmlDir = path.join(appSrc, 'res', 'xml');
fs.mkdirSync(xmlDir, { recursive: true });

fs.writeFileSync(
  path.join(xmlDir, 'file_paths.xml'),
  `<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
  <cache-path name="cache" path="." />
  <files-path name="files" path="." />
</paths>
`
);

const manifestPath = path.join(appSrc, 'AndroidManifest.xml');
let manifest = fs.readFileSync(manifestPath, 'utf8');

if (!manifest.includes('com.whatsapp')) {
  manifest = manifest.replace(
    '<application',
    `<queries>
        <package android:name="com.whatsapp" />
        <package android:name="com.whatsapp.w4b" />
    </queries>

    <application`
  );
}

fs.writeFileSync(manifestPath, manifest);

console.log('Android native WhatsApp patch OK');
