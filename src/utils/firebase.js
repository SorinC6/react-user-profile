import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsI4GHrnxoFH4m_R-8tigbzD6JmyokhI8",
  authDomain: "profile-b2911.firebaseapp.com",
  databaseURL: "https://profile-b2911.firebaseio.com",
  projectId: "profile-b2911",
  storageBucket: "profile-b2911.appspot.com",
  messagingSenderId: "813000370595",
  appId: "1:813000370595:web:e89c0455d5add157081216"
};
// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  async register(email, password, username) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: username
    });
  }
 
}

export default new Firebase();
