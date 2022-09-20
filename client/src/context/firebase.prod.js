import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import env from 'react-dotenv';

const config = {
    apiKey:  "AIzaSyBtQL5UmDXKWa9FsPbi4hzzT_dMfeJiODc",
  authDomain: "inventoryms-49e53.firebaseapp.com",
  projectId: "inventoryms-49e53",
  storageBucket: "inventoryms-49e53.appspot.com",
  messagingSenderId: "967414975609",
  appId: "1:967414975609:web:a370bab9f661e39ac298a8"
};
const firebase = Firebase.initializeApp(config);
export {firebase};