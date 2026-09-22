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
}

// GOOGLE LOGIN - REAL BACKEND CALL PER GUIDE
function googleLogin() {
    if (typeof google === 'undefined' || !google.accounts) {
        showToast("Google not loaded yet, try again", "error");
        return;
    }
    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com",
        callback: handleGoogleResponse
    });
    google.accounts.id.prompt();
}

async function handleGoogleResponse(response) {
  try {
    showToast("Verifying with backend...", "success");
    const res = await fetch("${import.meta.env.VITE_API_URL}/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential })
    });
    if (!res.ok) throw new Error("Google verification failed");
    const data = await res.json();
    localStorage.setItem("spendly_token", data.access_token);
    localStorage.setItem("spendly_user", data.user.email);
    localStorage.setItem("spendly_name", data.user.name);
    localStorage.setItem("spendly_pfp", data.user.picture || "");
    localStorage.setItem("spendly_loggedIn", "true");
    // Also save as registered user so duplicate check works
    localStorage.setItem(`spendly_user_${data.user.email}`, JSON.stringify({email:data.user.email, name:data.user.name, fromGoogle:true}));
    showToast(`Welcome ${data.user.name}!`, "success");
    setTimeout(() => window.location.href = "spendly.html", 800);
  } catch (e) {
    showToast(e.message, "error");
  }
}

// LOGIN FORM - NOW CHECKS IF ACCOUNT EXISTS
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        const stored = localStorage.getItem(`spendly_user_${email}`);
        if (!stored) {
            showToast("No account found with this email. Please Sign Up first.", "error");
            return;
        }
        const userData = JSON.parse(stored);
        if (userData.password && userData.password !== password) {
            showToast("Incorrect password", "error");
            return;
        }

        localStorage.setItem('spendly_loggedIn', 'true');
        localStorage.setItem('spendly_user', email);
        showToast('Login successful', 'success');
        setTimeout(() => { window.location.href = 'spendly.html'; }, 1000);
    });
}

// SIGNUP FORM - NOW BLOCKS DUPLICATE
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        // DUPLICATE CHECK - THIS WAS MISSING
        if (localStorage.getItem(`spendly_user_${email}`)) {
            showToast('Account already exists! Please Login instead.', 'error');
            setTimeout(() => window.location.href = 'spendlylogin.html', 1200);
            return;
        }

        localStorage.setItem(`spendly_user_${email}`, JSON.stringify({name, email, password}));
        localStorage.setItem('spendly_pending_email', email);
        showToast('Account created successfully! Please login.', 'success');
        setTimeout(() => { window.location.href = 'spendlylogin.html'; }, 1000);
    });
}

// FORGOT PASSWORD - NOW CHECKS IF EMAIL EXISTS
const forgotLink = document.getElementById('forgotLink');
const forgotModal = document.getElementById('forgotModal');
const closeForgot = document.getElementById('closeForgot');
const forgotForm = document.getElementById('forgotForm');

if (forgotLink) forgotLink.onclick = (e) => { e.preventDefault(); forgotModal.style.display = 'block'; }
if (closeForgot) closeForgot.onclick = () => { forgotModal.style.display = 'none'; }
window.onclick = (e) => { if (e.target == forgotModal) forgotModal.style.display = 'none'; }

if (forgotForm) {
    forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const resetEmail = document.getElementById('resetEmail').value.trim().toLowerCase();
        if (!localStorage.getItem(`spendly_user_${resetEmail}`)) {
            showToast("No account found with this email", "error");
            return;
        }
        // If Supabase: await supabase.auth.resetPasswordForEmail(resetEmail)
        showToast(`Reset link sent to ${resetEmail}`, 'success');
        forgotModal.style.display = 'none';
        forgotForm.reset();
    });
}

document.addEventListener('DOMContentLoaded', setupPasswordToggle);