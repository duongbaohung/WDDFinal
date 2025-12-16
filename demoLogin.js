document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) {
        console.error("Login form not found!");
        return;
    }

    const emailInput = document.getElementById('login_email');
    const passwordInput = document.getElementById('login_password');
    const emailError = document.getElementById('login_email_error');
    const passwordError = document.getElementById('login_password_error');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // Utility function to display an error
    const setError = (errorElement, message) => {
        errorElement.textContent = message;
    };

    const clearError = (errorElement) => {
        errorElement.textContent = '';
    };

    // --- Validation Functions (unchanged) ---

    const validateEmail = () => {
        const email = emailInput.value.trim();
        if (!email) {
            setError(emailError, 'Email is required.');
            return false;
        } else if (!emailPattern.test(email)) {
            setError(emailError, 'Invalid email format.');
            return false;
        }
        clearError(emailError);
        return true;
    };

    const validatePassword = () => {
        const password = passwordInput.value;
        if (!password) {
            setError(passwordError, 'Password is required.');
            return false;
        }
        clearError(passwordError);
        return true;
    };

    // --- Form Submission Handler (UPDATED) ---

    // Replace the DEMO_USER constant and the authentication logic in demoLogin.js:

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    // ... validation checks ...

    if (isEmailValid && isPasswordValid) {
        
        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value;
        
        // --- READ AUTHENTICATION DATA FROM LOCAL STORAGE ---
        const storedEmail = localStorage.getItem('registeredEmail');
        const storedPassword = localStorage.getItem('registeredPassword');
        const storedName = localStorage.getItem('registeredName') || 'Guest Rider'; // Get name

        // --- AUTHENTICATION CHECK ---
        if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
            
            // Success: Store current session data
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', storedName);
            localStorage.setItem('userEmail', enteredEmail);
            
            alert('Login successful! Welcome, ' + storedName + '. Redirecting to index.html...');
            window.location.href = 'index.html';
        } else {
            // Failure: Provide generic error message
            setError(emailError, 'Invalid credentials. Please check your email and password.');
            setError(passwordError, 'Invalid credentials. Please check your email and password.');
            alert('Login failed. Please check your credentials.');
        }
        
    } else {
        alert('Please check the highlighted errors.');
    }
});
});





document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) {
        console.error("Login form not found!");
        return;
    }

    const emailInput = document.getElementById('login_email');
    const passwordInput = document.getElementById('login_password');
    const emailError = document.getElementById('login_email_error');
    const passwordError = document.getElementById('login_password_error');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    // --- 1. SIMULATED USER DATABASE ---
    const DEMO_USER = {
        email: 'test@example.com', // Required login email
        password: 'password123',   // Required login password
        name: 'Guest Rider'        // User's display name
    };

    // Utility functions (keeping yours but making it more concise)
    const setError = (errorElement, message) => {
        errorElement.textContent = message;
    };

    const clearError = (errorElement) => {
        errorElement.textContent = '';
    };

    // --- Validation Functions (unchanged) ---

    const validateEmail = () => {
        const email = emailInput.value.trim();
        if (!email) {
            setError(emailError, 'Email is required.');
            return false;
        } else if (!emailPattern.test(email)) {
            setError(emailError, 'Invalid email format.');
            return false;
        }
        clearError(emailError);
        return true;
    };

    const validatePassword = () => {
        const password = passwordInput.value;
        if (!password) {
            setError(passwordError, 'Password is required.');
            return false;
        }
        // NOTE: No minimum length check for brevity, assuming 'required' is enough here.
        clearError(passwordError);
        return true;
    };

    // --- Form Submission Handler (CRITICAL UPDATE) ---

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            
            const enteredEmail = emailInput.value.trim();
            const enteredPassword = passwordInput.value;

            // --- 2. AUTHENTICATION SIMULATION ---
            if (enteredEmail === DEMO_USER.email && enteredPassword === DEMO_USER.password) {
                
                // --- 3. STORE USER DATA IN LOCAL STORAGE ---
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', DEMO_USER.name);
                localStorage.setItem('userEmail', DEMO_USER.email);
                
                alert('Login successful! Welcome, ' + DEMO_USER.name + '. Redirecting to index.html...');
                
                // REDIRECTION LOGIC
                window.location.href = 'index.html';
            } else {
                // If credentials don't match the demo user
                setError(emailError, 'Invalid credentials. Use test@example.com / password123');
                setError(passwordError, 'Invalid credentials. Use test@example.com / password123');
                alert('Login failed. Please check your credentials.');
            }
            
        } else {
            alert('Please check the highlighted errors.');
        }
    });

    // Optional: Add real-time validation on blur
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
});