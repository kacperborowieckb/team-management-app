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
import {
  arrayUnion,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
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
export const storage = getStorage();

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
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      uid: userAuth.uid,
      groups: [],
      notifications: [],
      url: '',
    });
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
  await setDoc(groupDocRef, groupData);
  await updateDoc(userDocRef, {
    groups: arrayUnion({ id: groupId, name: groupData.name, admin: true }),
  });
};

export const getReceiver = async (email) => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  let receiver;
  querySnapshot.forEach((doc) => (receiver = doc.data()));
  if (!receiver) throw 'Cannot find a user';
  return receiver.uid;
};

export const addNotification = async (uid, user, groupId, groupName) => {
  const userDocRef = doc(db, 'users', uid);
  await updateDoc(userDocRef, {
    notifications: arrayUnion({
      from: { name: user.displayName, email: user.email },
      groupId,
      groupName,
      new: true,
    }),
  });
};

export const getUserNotifications = async (uid) => {
  const userDocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data().notifications;
  }
  return [];
};

export const setUserNotifications = async (uid, newNotifications) => {
  await runTransaction(db, async (transaction) => {
    transaction.update(doc(db, 'users', uid), { notifications: newNotifications });
  });
};

export const addUserToGroup = async (user, groupId, groupName) => {
  const { displayName, email, uid } = user;
  const userDocRef = doc(db, 'users', uid);
  const groupsDocRef = doc(db, 'groups', groupId);

  await updateDoc(userDocRef, {
    groups: arrayUnion({
      id: groupId,
      name: groupName,
      admin: false,
    }),
  });
  await updateDoc(groupsDocRef, {
    users: arrayUnion({
      admin: false,
      displayName,
      email,
      uid,
    }),
  });
};

export const getGroupUsers = async (groupId) => {
  const groupDocRef = getDocumentRef('groups', groupId);
  const groupSnap = await getDoc(groupDocRef);
  if (groupSnap.exists()) {
    const users = [];
    for (let user of groupSnap.data().users) {
      const url = await getUserProfileUrl(user.uid);
      users.push({ ...user, url });
    }
    return users;
  }
  return [];
};

export const addTask = async (groupId, uid, task) => {
  const tasksDocRef = doc(db, 'tasks', groupId);
  const tasksSnapshot = await getDoc(tasksDocRef);

  if (tasksSnapshot.exists()) {
    await updateDoc(tasksDocRef, {
      [uid]: arrayUnion(task),
    });
  } else {
    await setDoc(tasksDocRef, { [uid]: [task] });
  }
};

export const updateTasks = async (groupId, uid, newTasks) => {
  await runTransaction(db, async (transaction) => {
    transaction.update(doc(db, 'tasks', groupId), { [uid]: newTasks });
  });
};

export const removeUser = async (groupId, uid, newUsers, newGroups) => {
  await runTransaction(db, async (transaction) => {
    transaction.update(doc(db, 'groups', groupId), { users: newUsers });
  });
  await runTransaction(db, async (transaction) => {
    transaction.update(doc(db, 'users', uid), { groups: newGroups });
  });
  await updateDoc(doc(db, 'tasks', groupId), {
    [uid]: deleteField(),
  });
};

export const getUserGroupsFromFirestore = async (uid) => {
  const userDocRef = getDocumentRef('users', uid);
  const userSnap = await getDoc(userDocRef);
  if (userSnap.exists()) {
    return userSnap.data().groups;
  }
  return [];
};

export const deleteGroup = async (groupId, filteredUserGroups) => {
  await deleteDoc(doc(db, 'groups', groupId));
  await deleteDoc(doc(db, 'tasks', groupId));
  await deleteDoc(doc(db, 'events', groupId));
  await deleteDoc(doc(db, 'chat', groupId));
  for (const user of filteredUserGroups) {
    await runTransaction(db, async (transaction) => {
      transaction.update(doc(db, 'users', user.uid), { groups: user.groups });
    });
  }
};

export const updateAdminPermissions = async (groupId, uid, newGroupUsers, newUserGroups) => {
  await runTransaction(db, async (transaction) => {
    transaction.update(doc(db, 'groups', groupId), { users: newGroupUsers });
  });
  await runTransaction(db, async (transaction) => {
    transaction.update(doc(db, 'users', uid), { groups: newUserGroups });
  });
};

export const getEvents = async (groupId) => {
  const eventsDocRef = getDocumentRef('events', groupId);
  const eventsSnap = await getDoc(eventsDocRef);
  if (eventsSnap.exists()) {
    return eventsSnap.data();
  }
  return {};
};

export const updateTaskCollection = async (newEvents, groupId, date) => {
  const eventsDocRef = doc(db, 'events', groupId);
  const eventsSnapshot = await getDoc(eventsDocRef);

  if (eventsSnapshot.exists()) {
    await updateDoc(eventsDocRef, {
      [date]: newEvents,
    });
  } else {
    await setDoc(eventsDocRef, { [date]: newEvents });
  }
};

export const addNewMessageToCollection = async (groupId, newMessages) => {
  const chatRef = doc(db, 'chat', groupId);
  const chatSnapshot = await getDoc(chatRef);
  if (chatSnapshot.exists()) {
    await updateDoc(chatRef, {
      messages: newMessages,
    });
  } else {
    setDoc(chatRef, { messages: newMessages });
  }
};

export const uploadProfilePicture = async (uid, image) => {
  const imageRef = ref(storage, `profile-pictures/${uid}`);
  await uploadBytes(imageRef, image);
  const url = await getDownloadURL(imageRef);
  await runTransaction(db, async (transaction) => {
    transaction.update(doc(db, 'users', uid), { url: url });
  });
  return url;
};

export const getUserProfileUrl = async (uid) => {
  const userSnapshot = await getDoc(doc(db, 'users', uid));
  if (userSnapshot.exists()) {
    return userSnapshot.data().url;
  }
};

export const getUserTasksFromFirestore = async (group, uid) => {
  const groupSnapshot = await getDoc(doc(db, 'tasks', group));
  if (groupSnapshot.exists() && groupSnapshot.data()?.[uid]) {
    return groupSnapshot.data()[uid];
  }
};
