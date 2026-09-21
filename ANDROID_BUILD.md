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

Com o projeto Android ja criado, o fluxo curto fica:

```powershell
npm run android:apk
```

O APK de teste sera gerado em:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Atualizacoes automaticas

A partir da versao nativa `1.0.13-teste`, alteracoes compativeis em HTML, CSS e JavaScript sao publicadas como um pacote OTA pelo proprio backend. O aplicativo consulta `/api/mobile-update`, baixa o pacote em segundo plano e o ativa na proxima abertura.

Um novo APK so e necessario para alteracoes nativas, como plugins, camera, permissoes, icone do aplicativo ou requisitos do Android. Se um pacote web falhar ao iniciar, o plugin retorna automaticamente ao bundle incluido no APK.

## Status atual neste computador

A pasta nativa `android/` ja foi criada com Capacitor e o sync dos arquivos web funcionou.

A compilacao do APK ainda para neste erro local:

```text
ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
```

Para concluir o APK neste computador, falta instalar/configurar:

- Java JDK 17 ou superior;
- Android Studio ou Android SDK;
- `JAVA_HOME`;
- `ANDROID_HOME` ou `ANDROID_SDK_ROOT`.

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
