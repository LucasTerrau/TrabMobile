import {  initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD5wl44kgtgPRY7r6RMR2jlekunx90WPuU",
  authDomain: "pathfinderbackstory.firebaseapp.com",
  projectId: "pathfinderbackstory",
  storageBucket: "pathfinderbackstory.firebasestorage.app",
  messagingSenderId: "742864242516",
  appId: "1:742864242516:web:76a6eb9b261eda36282ac1",
  measurementId: "G-VKF7PX2WZ2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
