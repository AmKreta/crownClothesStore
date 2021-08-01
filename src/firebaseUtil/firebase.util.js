import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBYS0w2teJP0pYw7aa3G7MJyPcyz9Yz-g0",
    authDomain: "crown-d458d.firebaseapp.com",
    projectId: "crown-d458d",
    storageBucket: "crown-d458d.appspot.com",
    messagingSenderId: "845213623421",
    appId: "1:845213623421:web:99c5e1a77ed419c55f7d14",
    measurementId: "G-0XG59T68ES"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });

export const signInWithGoogle = async () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (userAuth) {
        const userRef = firestore.doc(`user/${userAuth.uid}`);
        const snapshot = await userRef.get();
        if (!snapshot.exists) {
            const { displayName, email, photoURL } = userAuth;
            const createdAt = new Date();
            try {
                let data = await userRef.set({
                    displayName,
                    email,
                    photoURL,
                    createdAt,
                    ...additionalData
                });
                console.log(data);
            }
            catch (err) {
                console.log(err.message);
            }
        }
        return userRef;
    }
}

export default firebase;