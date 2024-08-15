import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCwT9UQ1PNoOgZKrICojbRKLkUAbYE4hCA",
    authDomain: "water-rights-permit.firebaseapp.com",
    projectId: "water-rights-permit",
    storageBucket: "water-rights-permit.appspot.com",
    messagingSenderId: "806641869",
    appId: "1:806641869:web:41776db87d4e959c9b4984"
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

// collection ref
const colRef = collection(db, 'books');

// get collection data
getDocs(colRef)
  .then((snapshot) => {
      let books = [];

      snapshot.docs.forEach((doc) => {
          books.push({
              ...doc.data(),
              id: doc.id
          });
      });
      console.log(books);
  })
  .catch(err => {
      console.log(err.message);
  });

  //adding documents
  const addBookForm = document.querySelector('.add')
  addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
  })

  // deleting documents
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit', (e) =>{
    e.preventDefault()
  })
