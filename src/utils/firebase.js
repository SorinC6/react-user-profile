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
  addUserInformation(username, phone, adress, date, image) {
    if (!this.auth.currentUser) {
      return alert("Not authorised");
    }
    return this.db.doc(`user_info/${this.auth.currentUser.uid}`).set({
      information: {
        username,
        phone,
        adress,
        date,
        image
      }
    });
  }

  async updateImage(image) {
    if (!this.auth.currentUser) {
      return alert("Not authorised");
    }

    const information = await this.db
      .doc(`user_info/${this.auth.currentUser.uid}`)
      .get();
    const before = information.get("information");
    console.log(before);
    return this.db
      .collection("user_info")
      .doc(`${this.auth.currentUser.uid}`)
      .update({
        information: {
          image,
          adress: before.adress,
          phone: before.phone,
          username: before.username,
          date: before.date
        }
      });
  }

  async updateInfo(username, adress, phone, date) {
    if (!this.auth.currentUser) {
      return alert("Not authorised");
    }
    username &&
      this.auth.currentUser.updateProfile({
        displayName: username
      });
    const information = await this.db
      .doc(`user_info/${this.auth.currentUser.uid}`)
      .get();
    const before = information.get("information");
    console.log(before);
    return this.db
      .collection("user_info")
      .doc(`${this.auth.currentUser.uid}`)
      .update({
        information: {
          image: before.image,
          adress: adress ? adress : before.adress,
          phone: phone ? phone : before.phone,
          username: username ? username : before.username,
          date: date ? date : before.date
        }
      });
  }

  async updateSecurityQuestions(question1, question2, question3) {
    if (!this.auth.currentUser) {
      return alert("Not authorised");
    }

    const information = await this.db
      .doc(`security_questions/${this.auth.currentUser.uid}`)
      .get();
    const before = information.get("questions");
    return this.db
      .collection("security_questions")
      .doc(`${this.auth.currentUser.uid}`)
      .update({
        questions: {
          question1: question1 ? question1 : before.question1,
          question2: question2 ? question2 : before.question2,
          question3: question3 ? question3 : before.question3
        }
      });
  }

  addScurityQuestions(question1, question2, question3) {
    if (!this.auth.currentUser) {
      return alert("Not authorised");
    }
    return this.db.doc(`security_questions/${this.auth.currentUser.uid}`).set({
      questions: {
        question1,
        question2,
        question3
      }
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUserName() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  isLoggedIn() {
    return this.auth.currentUser ? true : false;
  }

  async getcurrentUserSecurityQuestions() {
    const questions = await this.db
      .doc(`security_questions/${this.auth.currentUser.uid}`)
      .get();
    return questions.get("questions");
  }
  async getUserInfo() {
    const information = await this.db
      .doc(`user_info/${this.auth.currentUser.uid}`)
      .get();
    return information.get("information");
  }
}

export default new Firebase();
