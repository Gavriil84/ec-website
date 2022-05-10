import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDfUv9EG0hBkakrYSAsqOQjTY-AXpAB9lQ",
    authDomain: "gbw-clothing-db.firebaseapp.com",
    projectId: "gbw-clothing-db",
    storageBucket: "gbw-clothing-db.appspot.com",
    messagingSenderId: "350772213363",
    appId: "1:350772213363:web:e7effd5b4c82a0869f1c06"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}