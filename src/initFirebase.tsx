import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
    authDomain: `${process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
    projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
}

function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config)
    }
}

initFirebase();

export { firebase };