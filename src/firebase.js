import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyClEGpQxj8GJpWPgdQXlQvHdQjI0mY0qss",
    authDomain: "whatsapp-clone-70c1d.firebaseapp.com",
    projectId: "whatsapp-clone-70c1d",
    storageBucket: "whatsapp-clone-70c1d.appspot.com",
    messagingSenderId: "906665611590",
    appId: "1:906665611590:web:64c87d7684dc2060d19547",
    measurementId: "G-3Z60KYQHBD"
};

const App = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(App);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;