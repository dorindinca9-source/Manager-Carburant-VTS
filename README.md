# Manager Carburant VTS — APK Android

## Build pe GitHub
1. Creează un repository nou pe GitHub.
2. Încarcă TOATE fișierele și folderele din acest ZIP în rădăcina repository-ului.
3. Deschide **Actions** → **Build Android APK** → **Run workflow**.
4. După finalizare: **Artifacts** → **Manager-Carburant-VTS-APK** → descarcă APK-ul.

## Exporturi WhatsApp în APK
APK-ul folosește un plugin Android nativ propriu și deschide direct WhatsApp:
- ALIMENTĂRI MAȘINI: toate fișierele XLSX, simultan
- FACTURA: PDF
- CENTRALIZATOR: XLSX
- FOAIE DE PARCURS: PDF
- TRIMITE: PNG

Dacă WhatsApp standard nu este instalat, încearcă WhatsApp Business.
Nu folosește Web Share pentru exporturile din APK.

## Important
Aplicația web originală, ADMIN-ul și licența locală sunt păstrate.
Bibliotecile Excel/PDF sunt incluse local în APK la build; nu depind de CDN după instalare.
