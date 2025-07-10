// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// DOM Elements
const authContainer = document.getElementById('auth-container');
const chatContainer = document.getElementById('chat-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const signoutBtn = document.getElementById('signout-btn');
const messagesContainer = document.getElementById('messages-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Toggle between login and signup forms
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Firebase Auth State Listener
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        authContainer.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        loadMessages();
    } else {
        // User is signed out
        authContainer.classList.remove('hidden');
        chatContainer.classList.add('hidden');
        messagesContainer.innerHTML = '';
    }
});

// Login
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            // Login successful
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Sign Up
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Update user profile with display name
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            // Sign up successful
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Sign Out
signoutBtn.addEventListener('click', () => {
    firebase.auth().signOut();
});

// Send Message
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = messageInput.value.trim();
    
    if (messageText === '') return;
    
    const user = firebase.auth().currentUser;
    
    if (user) {
        firebase.firestore().collection('messages').add({
            text: messageText,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: user.uid,
            displayName: user.displayName || 'Anonymous',
            photoURL: user.photoURL || ''
        })
        .then(() => {
            messageInput.value = '';
        })
        .catch((error) => {
            console.error('Error sending message:', error);
        });
    }
});

// Load Messages
function loadMessages() {
    firebase.firestore().collection('messages')
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
            messagesContainer.innerHTML = '';
            
            snapshot.forEach((doc) => {
                const message = doc.data();
                displayMessage(message, doc.id);
            });
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
}

// Display Message
function displayMessage(message, id) {
    const user = firebase.auth().currentUser;
    const isCurrentUser = user && message.uid === user.uid;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isCurrentUser ? 'sent' : 'received');
    
    const messageInfo = document.createElement('div');
    messageInfo.classList.add('message-info');
    
    const senderName = document.createElement('span');
    senderName.textContent = message.displayName;
    
    const timestamp = document.createElement('span');
    if (message.createdAt) {
        timestamp.textContent = new Date(message.createdAt.toDate()).toLocaleTimeString();
    } else {
        timestamp.textContent = 'Just now';
    }
    
    messageInfo.appendChild(senderName);
    messageInfo.appendChild(timestamp);
    
    const messageText = document.createElement('div');
    messageText.textContent = message.text;
    
    messageElement.appendChild(messageInfo);
    messageElement.appendChild(messageText);
    
    messagesContainer.appendChild(messageElement);
}

// Handle Enter key for message input
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        messageForm.dispatchEvent(new Event('submit'));
    }
});

// Initialize - Set up any initial state if needed
function init() {
    // Any initialization code can go here
}

// Start the application
init();