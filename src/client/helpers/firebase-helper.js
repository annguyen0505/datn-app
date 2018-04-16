// Import the Firebase modules that you need in your app.
import "./../../../node_modules/firebase/storage/index";


const firebase = require("firebase");

// Initalize and export Firebase.
const config = {
    apiKey: "AIzaSyBtqLkPVqasCWS5fCAubCbJQdmCGFp6CoQ",
    authDomain: "datn-827e8.firebaseapp.com",
    databaseURL: "https://datn-827e8.firebaseio.com",
    projectId: "datn-827e8",
    storageBucket: "datn-827e8.appspot.com",
    messagingSenderId: "2199135556"
};
export default firebase.initializeApp(config);
