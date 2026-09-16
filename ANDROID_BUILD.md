# Android APK

Este prototipo ja esta preparado como PWA instalavel no Android pelo navegador, usando `manifest.webmanifest` e `sw.js`.

A decisao do projeto continua sendo gerar um APK de teste para instalar manualmente no Android, fora da Play Store, com a opcao de instalar apps de fontes desconhecidas ativada no tablet/celular.

## Requisitos do computador

Para gerar um APK nativo de teste, o computador precisa ter:

- Java JDK 17
- Android Studio com Android SDK
- Variavel `ANDROID_HOME` ou `ANDROID_SDK_ROOT`

## Gerar APK de teste

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

## Offline no tablet

A base offline do app fica em `offline-store.js` e usa IndexedDB no aparelho:

- respostas, auditorias, devolutivas e fotos entram primeiro no armazenamento local;
- cada item da fila recebe `clientOperationId`;
- quando houver internet, o app envia a fila para `POST /api/sync-queue`;
- o backend usa `clientOperationId` para ignorar duplicidade;
- fotos ficam como arquivos locais no aparelho ate o envio para storage/backend;
- a interface podera mostrar os estados: salvo localmente, sincronizando, sincronizado e erro.

Essa camada ja deixa a estrutura pronta para o APK real. A proxima etapa e ligar cada tela do checklist aos metodos `window.HAE_OFFLINE` e depois compilar/testar em um tablet Android real.

Enquanto o APK nativo nao for compilado, o tablet Android ja consegue testar o visual pelo link publico ou instalar o app pela opcao do navegador "Adicionar a tela inicial".
