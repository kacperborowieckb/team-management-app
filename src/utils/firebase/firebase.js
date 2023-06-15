import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDkv22CKnc3yf4KkNGqJXM4qVaDTsn9iFk',
  authDomain: 'team-management-app-f3ac6.firebaseapp.com',
  projectId: 'team-management-app-f3ac6',
  storageBucket: 'team-management-app-f3ac6.appspot.com',
  messagingSenderId: '341401734722',
  appId: '1:341401734722:web:09d0de4c5fb6bca224e7db',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const db = getFirestore();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signOutUser = async () => await signOut(auth);

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating the user ', error.message);
    }
  }

  return userDocRef;
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
