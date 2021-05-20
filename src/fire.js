import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyAkxBHIw66sIMZU4DVavWxd-cSjbJgASfw",
    authDomain: "login-6c270.firebaseapp.com",
    projectId: "login-6c270",
    storageBucket: "login-6c270.appspot.com",
    messagingSenderId: "313917618208",
    appId: "1:313917618208:web:c3416be88bb7614759a445",
    measurementId: "G-JWNX1Y3B8T"
  };
  const fire =  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default fire; 