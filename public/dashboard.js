// Import Firebase functions
import { getFirestore, collection, getDocs, query, orderBy, limit, startAfter } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwT9UQ1PNoOgZKrICojbRKLkUAbYE4hCA",
    authDomain: "water-rights-permit.firebaseapp.com",
    projectId: "water-rights-permit",
    storageBucket: "water-rights-permit.appspot.com",
    messagingSenderId: "806641869",
    appId: "1:806641869:web:41776db87d4e959c9b4984"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // If not authenticated, redirect to login page
        window.location.href = "index.html";
    }
});

let lastVisibleDoc = null; // Keep track of the last visible document

// Function to fetch and display 25 rows of data
async function loadTableData() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = ""; // Clear previous table data

    try {
        // Build the query to fetch 25 documents
        let queryRef = query(collection(db, "your-collection-name"), orderBy("Permitno"), limit(25));
        
        // If paginating, start after the last visible document
        if (lastVisibleDoc) {
            queryRef = query(queryRef, startAfter(lastVisibleDoc));
        }
        
        const querySnapshot = await getDocs(queryRef);
        
        // Update the last visible document for pagination
        lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${data.Permitno || ""}</td>
                <td>${data.Permittee || ""}</td>
                <td>${data.latitude || ""}</td>
                <td>${data.longitude || ""}</td>
                <td>${data.paid || ""}</td>
                <td>${data.balance || ""}</td>
                <td><button class="btn btn-warning btn-sm">Edit</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Handle case where no more data is available for pagination
        if (querySnapshot.empty) {
            document.getElementById("nextPageBtn").disabled = true;
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Logout function
function logout() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error logging out:", error);
    });
}

// Function to go to the next page
function nextPage() {
    loadTableData();
}

// Expose the functions to the global scope
window.logout = logout;
window.nextPage = nextPage;

// Load the first page of data on page load
loadTableData();