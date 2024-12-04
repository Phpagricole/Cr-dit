// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmm3_mIQijkfcqm9Z3TM2dscjgLPpx4x0",
  authDomain: "base-f4f56.firebaseapp.com",
  projectId: "base-f4f56",
  databaseURL: "https://base-f4f56-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "base-f4f56.firebasestorage.app",
  messagingSenderId: "1027578753370",
  appId: "1:1027578753370:web:a016bd5f1f60f9cd860363"
};

console.log('🔄 Initialisation de Firebase...');

// Initialiser Firebase
if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialisé avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de Firebase:', error);
  }
}

// Test de connexion Firestore
const db = firebase.firestore();
db.collection('test').add({
  timestamp: Date.now(),
  test: true
})
.then(() => {
  console.log('✅ Test de connexion Firestore réussi');
})
.catch(error => {
  console.error('❌ Erreur de connexion Firestore:', error);
});