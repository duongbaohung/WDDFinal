let form;

document.addEventListener('DOMContentLoaded', () =>  {
    form = document.getElementById("registrationForm");
    if (!form) {
        console.error("Form with ID 'registrationForm' not found!");
        return;
    }
});

const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,}$/,
    zip: /^\d{5}(-\d{4})?$/,
    card: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
    exp: /^(0[1-9]|1[0-2])\/\d{4}$/,
};

function setError(field, message) {
    const errorE1 = document.getElementById(`${field}_error`);
    if(errorE1) errorE1.textContent = message;
}

function clearError(field) {
    const errorE1 = document.getElementById(`${field}_error`);
    if(errorE1) errorE1.textContent = "";
}

function validateField(id, regex, message) {
    const value = document.getElementById(id).value.trim();
    if (!regex.test(value)) {
        setError(id, message);
        return false;
    }
    clearError(id);
    return true;
    
}

function passwordMatch() {
    const p1 = document.getElementById("password").value.trim();
    const p2 = document.getElementById("verify").value.trim();
    if (p1 !== p2) {
        setError("verify", "Password do not match.");
        return false;
    }
    clearError("verify");
    return true;
    
}

function isExpired(exp) {
    const [month, year] = exp.split("/").map(Number);
    const now = new Date();
    const expiry = new Date(year, month);
    return expiry < now;
}

function resetForm() {
    const fields = ["email", "password", "verify", "zip", "card", "exp"];
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.value = "";
        }
        clearError(field);
        
    })
}

document.getElementById("register").addEventListener("click", () => {
    let valid = true;

    valid &= validateField("email", patterns.email, "Invalid email address.");
    valid &= validateField("password", patterns.password, "At least 6 characters.");
    valid &= validateField("zip", patterns.zip, "Invalid zip address.");
    valid &= validateField("card", patterns.card, "Invalid card format.");
    valid &= validateField("exp", patterns.exp, "Invalid date format (mm/yyyy).");
  
    

    const expValue = document.getElementById("exp").value.trim();
    if (expValue && isExpired(expValue)) {
        setError("exp", "Card has expired.");
        valid = false;
    }

    // Inside the handleRegistration function in demoRegister.js:
    if (valid) {
        // --- Store Registered User Data in Local Storage ---
        localStorage.setItem('registeredEmail', document.getElementById("email").value.trim());
        localStorage.setItem('registeredPassword', document.getElementById("password").value);
        localStorage.setItem('registeredName', 'New Rider'); // Placeholder name for display

        alert("Registration successful! Redirecting to login page.");
        window.location.href = 'demoLogin.html';
    }
});

document.getElementById("reset").addEventListener("click", () => {
    form.reset(); resetForm();
});