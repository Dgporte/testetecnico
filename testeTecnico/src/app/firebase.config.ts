import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCUmYI4OygEaKcnvEqbB54PExiQzgOCm2g',
  authDomain: 'testetecnico-8392e.firebaseapp.com',
  projectId: 'testetecnico-8392e',
  storageBucket: 'testetecnico-8392e.firebasestorage.app',
  messagingSenderId: '654901677494',
  appId: '1:654901677494:web:94bb24d1d56c934c660517',
  measurementId: 'G-9VPXM4Y5SY',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
