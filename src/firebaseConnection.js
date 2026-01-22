import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAGNoHwe3Iarm2T8bQpYWESWK6JknM_9ow",
    authDomain: "devstudy-86978.firebaseapp.com",
    projectId: "devstudy-86978",
    storageBucket: "devstudy-86978.firebasestorage.app",
    messagingSenderId: "29191399787",
    appId: "1:29191399787:web:f0413b797199fbc5d2442e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };