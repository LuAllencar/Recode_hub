// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Suas credenciais do Firebase (pegar no console)
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "recode-terra-perdida.firebaseapp.com",
  projectId: "recode-terra-perdida",
  storageBucket: "recode-terra-perdida.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);