
### 'src\pages\index.tsx'
기본 구조

### 'src\components\Body\Body.tsx'

### 'src\core\store\useChattingStore.tsx'
이건 'src\components\Input\Input.tsx'에서
    const { pushUserMessage, fixWelcomeMessage, genWelcomMessage, updateAssistantMessage, setError } = useChattingActions();
'useChattingActions'이 발동되면 
--> 'src\components\Body\Message\Message.tsx'


### 'src\components\Body\Message\Message.tsx'




## 사용한 라이브러리

### Next.js
```
npm install next

```
### Zustand
```
npm install zustand

```
### next-PWA
```
npm install next-pwa
```

npm install next-auth

npm install styled-components

npm install firebase


### google-spreadsheet
https://theoephraim.github.io/node-google-spreadsheet/#/
https://www.npmjs.com/package/google-spreadsheet 
https://developers.google.com/sheets/api/reference/rest?hl=ko
https://www.youtube.com/watch?v=MiPpQzW_ya0
https://wickedmagica.tistory.com/286
```
npm i google-spreadsheet --save
npm install google-auth-library
```