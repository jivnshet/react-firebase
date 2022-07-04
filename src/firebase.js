import { initializeApp } from 'firebase/app'
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import {addDoc, collection, getDocs, getFirestore, query, where} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAs3WZlVcDFGA47psPWso_2jjPs6KMQHts",
    authDomain: "react-firebase-1969a.firebaseapp.com",
    projectId: "react-firebase-1969a",
    storageBucket: "react-firebase-1969a.appspot.com",
    messagingSenderId: "144294446768",
    appId: "1:144294446768:web:e7133723738a17ccf85d75",
    measurementId: "G-QESQKM1650"
  };

const app=initializeApp(firebaseConfig); 
const db=getFirestore(app);
const auth=getAuth(app);

const googleProvider=new GoogleAuthProvider();
const logInWithGoogle=async ()=>{
    try {
        const res=await signInWithPopup(auth, googleProvider);
        const user=res.user;
        const q=query(collection(db, 'users'), where('uid', '==', user.uid))
        const docs=await getDocs(q);
        if(docs.docs.length === 0){
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email
            })
        }
    } catch (error) {
        console.error(error)
        alert(error.message)
    }
}

const registerWithEmailAndPassword=async (name, email, password) =>{
    try {
        const res=await createUserWithEmailAndPassword(auth, email, password);
        const user=res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.error(error)
        alert(error.message)
    }
} 

const loginWithEmailAndPassword=async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error)
        alert(error.message)
    }
}

const logout=()=>{
    signOut(auth)
}

export  {
    db,
    auth,
    loginWithEmailAndPassword,
    logInWithGoogle,
    registerWithEmailAndPassword,
    logout,
};