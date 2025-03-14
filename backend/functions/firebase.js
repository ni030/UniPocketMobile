const admin = require("firebase-admin");
// Initialize Firebase Admin SDK
admin.initializeApp(); // No need for serviceAccount.json in Firebase Functions
// Firestore instance
const db = admin.firestore();
// Export Firestore instance
module.exports = db;
