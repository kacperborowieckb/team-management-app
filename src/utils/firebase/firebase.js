import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

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

export const signOutCurrentUser = async () => await signOut(auth);

export const createUserDocDisplayName = async (user, displayName) => {
  await setDoc(doc(db, 'users', user.uid), { displayName }, { merge: true });
};

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: null,
        email,
        createdAt,
        groups: [],
      });
    } catch (error) {
      console.log('Error creating the user ', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const updataDisplayName = async (name) => {
  await updateProfile(auth.currentUser, { displayName: name }).catch((err) => console.log(err));
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getDocumentRef = (collection, document) => {
  return doc(db, collection, document);
};

export const createNewGroup = async (groupData, groupId) => {
  const groupDocRef = doc(db, 'groups', groupId);
  const userDocRef = doc(db, 'users', groupData.users[0].uid);
  try {
    await setDoc(groupDocRef, groupData);
    await updateDoc(userDocRef, {
      groups: arrayUnion({ id: groupId, name: groupData.name }),
    });
  } catch (error) {
    console.error(error.message);
  }
};
