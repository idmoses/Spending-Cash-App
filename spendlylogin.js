// TOAST
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// SHOW/HIDE PASSWORD
function setupPasswordToggle() {
    const toggle = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    if (toggle && password) {
        toggle.onclick = function () {
            const type = password.type === 'password' ? 'text' : 'password';
            password.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        }
    }
};

const API_URL = "https://expense-tracker-afoz.onrender.com";

// ---------- GOOGLE LOGIN ----------
function googleLogin() {
    if (typeof google === 'undefined' || !google.accounts) {
        showToast("Google not loaded yet, try again", "error");
        return;
    }
    google.accounts.id.initialize({
        client_id: "580362013753-49letv4r4ffp5nupqiajur9g3f94tkpi.apps.googleusercontent.com",
        callback: handleGoogleResponse
    });
    google.accounts.id.prompt();
}

async function handleGoogleResponse(response) {
    try {
        showToast("Verifying with backend...", "success");
        const res = await fetch(`${API_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: response.credential })
        });
        const data = await res.json().catch(() => ({}));
        console.log("Google login response:", res.status, data);
        if (!res.ok) throw new Error(data.detail ? JSON.stringify(data.detail) : "Google verification failed");
        saveSession(data);
        showToast(`Welcome ${data.user.name}!`, "success");
        setTimeout(() => window.location.href = "dashboard.html", 800);
    } catch (e) {
        console.error("Google login error:", e);
        showToast(e.message, "error");
    }
}

function saveSession(data) {
    localStorage.setItem("spendly_token", data.access_token);
    if (data.user) {
        localStorage.setItem("spendly_user", data.user.email);
        localStorage.setItem("spendly_name", data.user.name);
        localStorage.setItem("spendly_pfp", data.user.picture || "");
    }
    localStorage.setItem("spendly_loggedIn", "true");
}

// ---------- LOGIN FORM ----------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        try {
            const formBody = new URLSearchParams();
            formBody.append("username", email);
            formBody.append("password", password);

            const res = await fetch(`${API_URL}/auth/token`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formBody
            });
            const data = await res.json().catch(() => ({}));
            console.log("Login response:", res.status, data);
            if (!res.ok) throw new Error(data.detail ? JSON.stringify(data.detail) : "Login failed");

            saveSession(data);
            showToast('Login successful', 'success');
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
        } catch (err) {
            console.error("Login error:", err);
            showToast(err.message, "error");
        }
    });
}

// ---------- SIGNUP FORM ----------
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        console.log("Submitting signup:", { fullname, email, password: password ? "[filled]" : "[EMPTY]" });

        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, email, password })
            });
            const data = await res.json().catch(() => ({}));
            console.log("Signup response:", res.status, data);
            if (!res.ok) throw new Error(data.detail ? JSON.stringify(data.detail) : "Signup failed");

            showToast('Account created successfully! Please login.', 'success');
            setTimeout(() => { window.location.href = 'login.html'; }, 1000);
        } catch (err) {
            console.error("Signup error:", err);
            showToast(err.message, "error");
        }
    });
}


// ---------- FORGOT PASSWORD ----------
const forgotLink = document.getElementById('forgotLink');
const forgotModal = document.getElementById('forgotModal');
const closeForgot = document.getElementById('closeForgot');
const forgotForm = document.getElementById('forgotForm');

if (forgotLink) forgotLink.onclick = (e) => { e.preventDefault(); forgotModal.style.display = 'block'; }
if (closeForgot) closeForgot.onclick = () => { forgotModal.style.display = 'none'; }
window.onclick = (e) => { if (e.target == forgotModal) forgotModal.style.display = 'none'; }

if (forgotForm) {
    forgotForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const resetEmail = document.getElementById('resetEmail').value.trim().toLowerCase();

        try {
            const res = await fetch(`${API_URL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail })
            });
            const data = await res.json().catch(() => ({}));
            console.log("Forgot password response:", res.status, data);
            if (!res.ok) throw new Error(data.detail ? JSON.stringify(data.detail) : "No account found with this email");

            showToast(`Reset link sent to ${resetEmail}`, 'success');
            forgotModal.style.display = 'none';
            forgotForm.reset();
        } catch (err) {
            console.error("Forgot password error:", err);
            showToast(err.message, "error");
        }
    });
}

document.addEventListener('DOMContentLoaded', setupPasswordToggle);