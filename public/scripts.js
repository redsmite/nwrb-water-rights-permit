// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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

// Login function
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    try {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, username, password);
        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Error logging in:", error);
        messageElement.textContent = "Error logging in. Please check your username and password.";
    }
}

// Expose the login function to the global scope
window.login = login;
