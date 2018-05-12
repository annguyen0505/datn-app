// Import the Firebase modules that you need in your app.
import "./../../../node_modules/firebase/storage/index";

const uuidv1 = require("uuid/v1");

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

const instance = firebase.initializeApp(config);
const ref = instance.storage().ref();


export const uploadImage = (file, onSuccess, onError) => {
    const imagesRef = ref.child("images");
    const fileName = `${uuidv1()}-${file.name}`;
    const metadata = {
        contentType: file.type
    };

    return imagesRef.child(fileName).put(file, metadata).then(onSuccess).catch(onError);
};

export const deleteImage = (imageRef, onSuccess, onError) => {
    const fileRef = ref.child(imageRef);
    return fileRef.delete().then(onSuccess).catch(onError);
};
// export default firebase.initializeApp(config);
