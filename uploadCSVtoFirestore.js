const fs = require('fs');
const csv = require('csv-parser');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwT9UQ1PNoOgZKrICojbRKLkUAbYE4hCA",
  authDomain: "water-rights-permit.firebaseapp.com",
  projectId: "water-rights-permit",
  storageBucket: "water-rights-permit.appspot.com",
  messagingSenderId: "806641869",
  appId: "1:806641869:web:41776db87d4e959c9b4984"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Path to your CSV file
const filePath = './permittee-permittee-no..csv';

const uploadCSVToFirestore = async () => {
  const data = [];

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ',', mapHeaders: ({ header }) => header.trim() })) // Trim headers
    .on('headers', (headers) => {
      console.log('CSV Headers:', headers);
    })
    .on('data', (row) => {
      console.log('Raw Row Data:', row); // Log raw row data for debugging

      // Map only the necessary fields
      const document = {
        Permitno: row['PERMITNO']?.trim() || null,
        Permittee: row['PERMITTEE']?.trim() || null
      };

      // Log the processed document for debugging
      console.log("Processed Document:", document);

      // Only push non-empty rows to Firestore
      if (document.Permitno && document.Permittee) {
        data.push(document);
      } else {
        console.log("Skipping row with missing values:", document);
      }
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
      console.log(`Total rows to upload: ${data.length}`);

      for (const item of data) {
        try {
          const docRef = await addDoc(collection(db, 'your-collection-name'), item);
          console.log('Document added with ID:', docRef.id);
        } catch (e) {
          console.error("Error adding document:", e);
        }
      }
    })
    .on('error', (err) => {
      console.error("Error reading the file: ", err);
    });
};

uploadCSVToFirestore();
