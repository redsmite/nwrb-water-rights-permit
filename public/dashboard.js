// Import Firebase functions
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
const auth = getAuth(app);

// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // If not authenticated, redirect to login page
        window.location.href = "index.html";
    }
});

// Logout function
function logout() {
    signOut(auth)
        .then(() => {
            // Redirect to login page after logout
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error logging out:", error);
        });
}

// Expose the logout function to the global scope
window.logout = logout;
