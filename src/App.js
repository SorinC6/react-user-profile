import React, { useState, useEffect } from "react";
import AppRoutes from "./utils/AppRoutes";
import Layout from "./components/~common/Layout";
import firebase from "./utils/firebase";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });

  return (
    <Layout>
      {firebaseInitialized !== false ? (
        <AppRoutes />
      ) : (
        <div className="sweet-loading">
          <ClipLoader size={200} color={"#123abc"} />
        </div>
      )}
    </Layout>
  );
}

export default App;
