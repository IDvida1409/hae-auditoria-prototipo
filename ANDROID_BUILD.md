# Android APK

Este prototipo ja esta preparado como PWA instalavel no Android pelo navegador, usando `manifest.webmanifest` e `sw.js`.

Para gerar um APK nativo de teste, o computador precisa ter:

- Java JDK 17
- Android Studio com Android SDK
- Variavel `ANDROID_HOME` ou `ANDROID_SDK_ROOT`

Depois disso, o caminho recomendado e empacotar a versao web com Capacitor:

```powershell
npm run build:android-web
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npx cap sync android
cd android
.\gradlew assembleDebug
```

O APK de teste sera gerado em:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Enquanto o APK nativo nao for compilado, o tablet Android ja consegue testar o visual pelo link publico ou instalar o app pela opcao do navegador "Adicionar a tela inicial".
