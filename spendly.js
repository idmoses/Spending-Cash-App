function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.className = `toast ${type}`;
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
let transactions = JSON.parse(localStorage.getItem('spendly')) || [
  { desc: "Salary - August", amount: 350000, type: "income", category: "Salary", date: "2026-08-01T09:00" },
  { desc: "Fuel - Total Station", amount: 12000, type: "expense", category: "Transport", date: "2026-08-02T07:45" },
  { desc: "Airtime - MTN", amount: 2000, type: "expense", category: "Bills", date: "2026-08-02T19:20" },
  { desc: "Groceries - Shoprite", amount: 28000, type: "expense", category: "Food", date: "2026-08-03T14:30" },
  { desc: "Uber to Office", amount: 3500, type: "expense", category: "Transport", date: "2026-08-04T08:15" },
  { desc: "Lunch - Chicken Republic", amount: 4500, type: "expense", category: "Food", date: "2026-08-04T13:10" },
  { desc: "NEPA Bill", amount: 15000, type: "expense", category: "Bills", date: "2026-08-05T18:00" },
  { desc: "Suya Night", amount: 6000, type: "expense", category: "Food", date: "2026-08-05T20:30" },
  { desc: "MTN Data - 20GB", amount: 10000, type: "expense", category: "Bills", date: "2026-08-06T10:00" },
  { desc: "Freelance Design", amount: 80000, type: "income", category: "Salary", date: "2026-08-07T11:00" },
  { desc: "Zara Shopping", amount: 42000, type: "expense", category: "Shopping", date: "2026-08-08T16:45" },
  { desc: "Hospital Checkup", amount: 12000, type: "expense", category: "Health", date: "2026-08-09T10:20" },
  { desc: "Pharmacy - Drugs", amount: 3500, type: "expense", category: "Health", date: "2026-08-09T11:30" },
  { desc: "Fuel", amount: 8000, type: "expense", category: "Transport", date: "2026-08-10T07:30" },
  { desc: "Car Wash", amount: 3000, type: "expense", category: "Transport", date: "2026-08-10T17:00" },
  { desc: "Lunch - The Place", amount: 7500, type: "expense", category: "Food", date: "2026-08-11T13:00" },
  { desc: "Bolt Ride", amount: 4000, type: "expense", category: "Transport", date: "2026-08-11T18:15" },
  { desc: "Oyingbo Market - Groceries", amount: 18500, type: "expense", category: "Food", date: "2026-08-12T09:30" },
  { desc: "Netflix Subscription", amount: 6500, type: "expense", category: "Bills", date: "2026-08-13T08:00" },
  { desc: "Shawarma + Drink", amount: 3500, type: "expense", category: "Food", date: "2026-08-13T20:00" },
  { desc: "Gift for Mum", amount: 15000, type: "expense", category: "Shopping", date: "2026-08-14T15:00" },
  { desc: "Fuel", amount: 14000, type: "expense", category: "Transport", date: "2026-08-15T07:10" },
  { desc: "Office Lunch", amount: 5000, type: "expense", category: "Food", date: "2026-08-15T13:20" },
  { desc: "Laundry Service", amount: 6000, type: "expense", category: "Bills", date: "2026-08-16T11:00" },
  { desc: "Airtel Airtime", amount: 3000, type: "expense", category: "Bills", date: "2026-08-16T18:30" },
  { desc: "Danfo & BRT", amount: 2500, type: "expense", category: "Transport", date: "2026-08-17T08:00" },
  { desc: "Supermarket - Spar", amount: 22000, type: "expense", category: "Food", date: "2026-08-18T16:00" },
  { desc: "Bolt to Lekki", amount: 5000, type: "expense", category: "Transport", date: "2026-08-18T19:00" },
  { desc: "Pharmacy - Vitamins", amount: 8000, type: "expense", category: "Health", date: "2026-08-19T09:00" },
  { desc: "Spectranet Data", amount: 5000, type: "expense", category: "Bills", date: "2026-08-19T20:10" },
  { desc: "Lunch", amount: 4000, type: "expense", category: "Food", date: "2026-08-20T13:30" },
  { desc: "Bolt Ride", amount: 6000, type: "expense", category: "Transport", date: "2026-08-20T21:00" },
  { desc: "DSTV Premium", amount: 18500, type: "expense", category: "Bills", date: "2026-08-21T10:00" },
  { desc: "Thrift Clothes", amount: 25000, type: "expense", category: "Shopping", date: "2026-08-22T14:00" },
  { desc: "Dinner - Kilimanjaro", amount: 7000, type: "expense", category: "Food", date: "2026-08-22T20:30" },
  { desc: "Fuel - NNPC", amount: 13000, type: "expense", category: "Transport", date: "2026-08-23T07:30" },
  { desc: "Market Foodstuff", amount: 12000, type: "expense", category: "Food", date: "2026-08-24T10:00" },
  { desc: "Keke Ride", amount: 3500, type: "expense", category: "Transport", date: "2026-08-24T18:00" },
  { desc: "Gym Subscription", amount: 10000, type: "expense", category: "Health", date: "2026-08-25T06:30" },
  { desc: "Smoothie & Parfait", amount: 3000, type: "expense", category: "Food", date: "2026-08-25T16:00" },
  { desc: "Freelance - Logo", amount: 60000, type: "income", category: "Salary", date: "2026-08-26T12:00" },
  { desc: "Jumia - Powerbank", amount: 18000, type: "expense", category: "Shopping", date: "2026-08-27T11:00" },
  { desc: "Fibre Internet", amount: 20000, type: "expense", category: "Bills", date: "2026-08-28T09:00" },
  { desc: "Lunch", amount: 8000, type: "expense", category: "Food", date: "2026-08-28T13:00" },
  { desc: "Transport - Office", amount: 7000, type: "expense", category: "Transport", date: "2026-08-29T08:00" },
  { desc: "Suya & Drinks", amount: 5500, type: "expense", category: "Food", date: "2026-08-29T20:00" },
  { desc: "Weekend Hangout", amount: 15000, type: "expense", category: "Food", date: "2026-08-30T19:00" },
  { desc: "Bolt Home", amount: 8000, type: "expense", category: "Transport", date: "2026-08-30T22:30" },
  { desc: "Month End Bulk Food", amount: 30000, type: "expense", category: "Food", date: "2026-08-31T10:30" },
  { desc: "Salary - September", amount: 380000, type: "income", category: "Salary", date: "2026-09-01T09:00" },
  { desc: "Fuel", amount: 15000, type: "expense", category: "Transport", date: "2026-09-02T07:20" },
  { desc: "Breakfast - Bread & Tea", amount: 6000, type: "expense", category: "Food", date: "2026-09-02T08:30" },
  { desc: "Shoprite Groceries", amount: 25000, type: "expense", category: "Food", date: "2026-09-03T15:00" },
  { desc: "MTN Airtime", amount: 4000, type: "expense", category: "Bills", date: "2026-09-03T19:00" },
  { desc: "Uber to Office", amount: 5000, type: "expense", category: "Transport", date: "2026-09-04T08:10" },
  { desc: "Lunch", amount: 5000, type: "expense", category: "Food", date: "2026-09-04T13:15" },
  { desc: "NEPA Bill", amount: 18000, type: "expense", category: "Bills", date: "2026-09-05T18:30" },
  { desc: "MTN Data 25GB", amount: 10000, type: "expense", category: "Bills", date: "2026-09-05T20:00" },
  { desc: "Shoes - Payless", amount: 35000, type: "expense", category: "Shopping", date: "2026-09-06T14:00" },
  { desc: "Hospital - Checkup", amount: 9000, type: "expense", category: "Health", date: "2026-09-07T10:00" },
  { desc: "Drugs - Malaria", amount: 4000, type: "expense", category: "Health", date: "2026-09-07T11:00" },
  { desc: "Fuel", amount: 12000, type: "expense", category: "Transport", date: "2026-09-08T07:30" },
  { desc: "Food - Amala Joint", amount: 7500, type: "expense", category: "Food", date: "2026-09-08T14:00" },
  { desc: "Freelance - Website", amount: 75000, type: "income", category: "Salary", date: "2026-09-09T11:30" },
  { desc: "Danfo + Keke", amount: 4500, type: "expense", category: "Transport", date: "2026-09-10T08:00" },
  { desc: "Mile 12 Market", amount: 20000, type: "expense", category: "Food", date: "2026-09-10T10:30" },
  { desc: "DSTV Subscription", amount: 18500, type: "expense", category: "Bills", date: "2026-09-11T09:00" },
  { desc: "Lunch", amount: 6000, type: "expense", category: "Food", date: "2026-09-11T13:00" },
  { desc: "Shopping - Zara", amount: 30000, type: "expense", category: "Shopping", date: "2026-09-12T16:00" },
  { desc: "Shawarma", amount: 4000, type: "expense", category: "Food", date: "2026-09-12T20:00" },
  { desc: "Fuel", amount: 10000, type: "expense", category: "Transport", date: "2026-09-13T07:00" },
  { desc: "Car Wash + Polish", amount: 4000, type: "expense", category: "Transport", date: "2026-09-13T17:30" },
  { desc: "Family Groceries", amount: 28000, type: "expense", category: "Food", date: "2026-09-14T11:00" },
  { desc: "Bolt to Church", amount: 6000, type: "expense", category: "Transport", date: "2026-09-14T08:00" },
  { desc: "Breakfast", amount: 3000, type: "expense", category: "Food", date: "2026-09-15T07:30" },
  { desc: "Bolt to Work", amount: 5500, type: "expense", category: "Transport", date: "2026-09-15T08:15" }
];
let budgets = JSON.parse(localStorage.getItem('spendlyBudgets')) || { Food: 80000, Transport: 40000, Bills: 60000, Shopping: 50000, Health: 20000 };
let selectedMonth = localStorage.getItem('spendly_selectedMonth') || "2026-09";
function getTransactionsForMonth(month) { return transactions.filter(t => t.date.startsWith(month)); }
function getTotal(type) { return transactions.filter(t => t.type === type).reduce((a, b) => a + Number(b.amount), 0); }
function getMonthlyTotal(type, month) { return getTransactionsForMonth(month).filter(t => t.type === type).reduce((a, b) => a + Number(b.amount), 0); }
function getBalance() { return (getTotal('income') - getTotal('expense')).toLocaleString(); }
function getMonthlyBalance(month) { return (getMonthlyTotal('income', month) - getMonthlyTotal('expense', month)); }
function formatMonthName(monthStr) { const d = new Date(monthStr + "-01"); return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); }
function getCurrentUserEmail() { return localStorage.getItem('spendly_user') || ''; }
function getProfileKey(email) { return `spendly_profile_${email || getCurrentUserEmail()}`; }
function getStoredProfile() {
  try {
    const key = getProfileKey();
    if (!localStorage.getItem(key)) return {};
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch { return {}; }
}
function getProfilePic() {
  const p = getStoredProfile();
  if (p.avatar && p.avatar.length > 100) return p.avatar;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(p.fullName || 'U')}&background=4f46e5&color=fff&size=128`;
}
function getProfileName() { return getStoredProfile().fullName || ''; }
function getProfileEmail() { return getStoredProfile().email || ''; }
function updateSidebarProfile() {
  const p = getStoredProfile();
  const hasProfile =!!p.fullName;
  const pic = getProfilePic();
  ['sidebarPfp', 'editTriggerPfp', 'profilePicPreview'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = pic;
  });
  const nameEl = document.getElementById('sidebarName');
  const emailEl = document.getElementById('sidebarEmail');
  if (nameEl) nameEl.innerText = hasProfile? p.fullName : 'Your Name';
  if (emailEl) emailEl.innerText = hasProfile? p.email : 'your@email.com';
  const trigName = document.getElementById('triggerNameDisplay');
  const trigEmail = document.getElementById('triggerEmailDisplay');
  if (trigName) trigName.innerText = hasProfile? p.fullName : 'Your Profile';
  if (trigEmail) trigEmail.innerText = hasProfile? p.email : '';
}
function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return `${d.toLocaleDateString('en-NG')} ${d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}`;
}
function updateCurrentDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  const now = new Date();
  el.innerText = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function animateCounters() {
  document.querySelectorAll('.count-up').forEach(el => {
    const target = parseInt(el.getAttribute('data-target')) || 0;
    const isNegative = target < 0;
    const absTarget = Math.abs(target);
    let current = 0;
    const duration = 1200;
    const steps = 45;
    const increment = absTarget / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        current = absTarget;
        clearInterval(timer);
      }
      el.innerText = `${isNegative? '-' : ''}₦${Math.round(current).toLocaleString()}`;
    }, duration / steps);
  });
}
// MAGNETIC ONLY ON CARDS PAGE - NOT ON BUDGETS OR SETTINGS
function initMagneticHover() {
  document.querySelectorAll('.card-ui').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      card.style.transform = `translateY(-8px) perspective(1000px) rotateY(${x/18}deg) rotateX(${-y/18}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(1000px) rotateY(0) rotateX(0) scale(1)';
    });
  });
}
const pages = {
  get dashboard() {
    const cur = selectedMonth;
    const income = getMonthlyTotal('income', cur);
    const expense = getMonthlyTotal('expense', cur);
    const balance = getMonthlyBalance(cur);
    return `
    <div style="padding:0 30px 10px 30px;"><p style="color:var(--muted);font-size:13px;">Showing data for <b>${formatMonthName(cur)}</b> - Change it in Transactions page</p></div>
    <div class="cards">
      <div class="card">
        <h3>Total Balance - ${formatMonthName(cur).split(' ')[0]}</h3>
        <h2 class="count-up" data-target="${balance}">₦0</h2>
        <p style="color:var(--muted);font-size:12px;margin-top:6px">All time: ₦${getBalance()} • ${formatMonthName(cur)}</p>
      </div>
      <div class="card"><h3>Monthly Income</h3><h2 class="green count-up" data-target="${income}">₦0</h2></div>
      <div class="card"><h3>Monthly Expenses</h3><h2 class="red count-up" data-target="${expense}">₦0</h2></div>
    </div>
    <div class="chart-container" style="margin:30px; height:540px; padding:24px; background:var(--card); border-radius:16px;"><h3 style="font-size:18px; margin-bottom:16px;">Income vs Expense This Month</h3><canvas id="barChart" style="width:100%!important; height:460px!important;"></canvas></div>`;
  },
  get transactions() {
    return `<div class="filters"><select id="filterType"><option value="">All Types</option><option value="income">Income</option><option value="expense">Expense</option></select><select id="filterCategory"><option value="">All Categories</option><option>Food</option><option>Transport</option><option>Bills</option><option>Shopping</option><option>Health</option><option>Salary</option></select><input type="month" id="filterMonth" value="${selectedMonth}"><input type="date" id="filterDate"><select id="filterIncExp"><option value="">Income & Expense</option><option value="income">Income Only</option><option value="expense">Expense Only</option></select></div><table class="table"><thead><tr><th>Description</th><th>Category</th><th>Date & Time</th><th>Amount</th></tr></thead><tbody id="transactionTableBody"></tbody></table>`;
  },
  get budgets() {
    const cur = selectedMonth;
    return `<div style="padding:30px"><h3 style="margin-bottom:6px">Monthly Budget Progress - ${formatMonthName(cur)}</h3><p style="color:var(--muted);margin-bottom:20px;font-size:13px">Controlled by Transaction month picker - Currently ${cur}</p>${Object.keys(budgets).map(cat => { let spent = getTransactionsForMonth(cur).filter(t => t.category === cat && t.type === 'expense').reduce((a, b) => a + Number(b.amount), 0); let percent = Math.min((spent / budgets[cat]) * 100, 100); let color = percent > 90? 'var(--danger)' : 'var(--primary)'; return `<div class="card" style="margin-bottom:20px"><div style="display:flex;justify-content:space-between"><h4>${cat}</h4><span style="font-weight:700;color:${percent > 90? 'red' : ''}">${percent.toFixed(0)}%</span></div><p style="color:var(--muted);margin:8px 0">₦${spent.toLocaleString()} / ₦${budgets[cat].toLocaleString()}</p><div class="progress-bar"><div class="progress" style="width:${percent}%;background:${color}"></div></div></div>` }).join('')}</div>`;
  },
  get analytics() {
    return `
    <div style="padding:0 30px 10px 30px;"><p style="color:var(--muted);font-size:13px;">Showing analytics for <b>${formatMonthName(selectedMonth)}</b> - Controlled by Transaction month picker</p></div>
    <div class="chart-grid">
      <div class="chart-container" style="height:400px;"><h3>Spending by Category - ${formatMonthName(selectedMonth).split(' ')[0]}</h3><canvas id="pieChart" style="max-height:320px;"></canvas></div>
      <div class="chart-container" style="height:400px;"><h3>Monthly Trend - Daily</h3><canvas id="trendChart" style="max-height:320px;"></canvas></div>
      <div class="chart-container" style="grid-column: 1 / -1; height:520px; padding:24px;"><h3>Income vs Expense - ${formatMonthName(selectedMonth)} Daily (BIG)</h3><canvas id="smallBarChart" style="width:100%!important; height:430px!important;"></canvas></div>
    </div>`;
  },
  get cards() {
    const cur = selectedMonth;
    const balance = getMonthlyBalance(cur);
    const monthShort = formatMonthName(cur).split(' ')[0];
    return `
    <div style="padding:0 30px 10px 30px;"><p style="color:var(--muted);font-size:13px;">Cards for <b>${formatMonthName(cur)}</b></p></div>
    <div class="card-grid">
      <div class="card-ui virtual-card">
        <div>
          <h4>Virtual Card - ${monthShort}</h4>
          <div class="card-number">**** **** 4829</div>
        </div>
        <div class="card-bottom">
          <div class="card-bottom-left">
            <p>Balance - ${cur}</p>
            <small>All Time: ₦${getBalance()}</small>
          </div>
          <div class="card-amount">₦${balance.toLocaleString()}</div>
        </div>
      </div>
      <div class="card-ui debit-card">
        <div>
          <h4>Debit Card - ${monthShort}</h4>
          <div class="card-number">**** **** 7391</div>
        </div>
        <div class="card-bottom">
          <div class="card-bottom-left">
            <p>Balance</p>
          </div>
          <div class="card-amount">₦${Math.round(balance / 2).toLocaleString()}</div>
        </div>
      </div>
    </div>`;
  },
  get settings() {
    return `<div>
    <div class="edit-profile-card">
      <div class="edit-profile-left">
        <img src="${getProfilePic()}" id="editTriggerPfp">
        <div>
          <h3 id="triggerNameDisplay">${getProfileName() || 'Your Profile'}</h3>
          <p id="triggerEmailDisplay">${getProfileEmail() || ''}</p>
        </div>
      </div>
      <button onclick="openProfileModal()" class="btn-edit-trigger">✏️ Edit Profile</button>
    </div>
    <div class="card" style="margin:24px 30px 0 30px"><h3>Preferences</h3><div class="toggle"><span>Dark Mode</span><label class="switch"><input type="checkbox" id="themeToggle"><span class="slider"></span></label></div><div class="toggle"><span>Push Notifications</span><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div><div class="toggle"><span>Email Reports</span><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div></div>
    <button onclick="logout()" style="margin:24px 30px;background:var(--danger);color:white;border:none;padding:14px 20px;border-radius:12px;cursor:pointer;font-weight:600">Logout</button>
    <button onclick="openClearModal()" style="margin:0 30px 30px;background:var(--muted);color:white;border:none;padding:14px 20px;border-radius:12px;cursor:pointer;font-weight:600">Clear All Data</button>
    <div class="modal" id="profileSettingsModal">
      <div class="modal-content slide-up" style="max-width:600px;">
        <span class="close" onclick="closeProfileModal()">&times;</span>
        <h2>Profile Settings</h2>
        <p class="sub">Update your personal details and account profile.</p>
        <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
          <img src="${getProfilePic()}" id="profilePicPreview" style="width:70px; height:70px; border-radius:50%; object-fit:cover; border:2px solid var(--primary);">
          <div class="upload-btns">
            <label for="pfpUpload" class="btn-upload">Upload New</label>
            <input type="file" id="pfpUpload" accept="image/*" onchange="uploadPfp(event)" hidden>
            <button class="btn-remove" onclick="removePfp()">Remove</button>
          </div>
        </div>
        <p style="font-size:12px;color:var(--muted);margin-top:-10px;margin-bottom:20px">JPG or PNG. Max 2MB.</p>
        <div class="form-grid">
          <div><label>First Name</label><input type="text" id="profileFirstName" placeholder="Enter first name"></div>
          <div><label>Last Name</label><input type="text" id="profileLastName" placeholder="Enter last name"></div>
          <div class="full-width"><label>Email Address</label><input type="email" id="profileEmailField" placeholder="Enter email address"></div>
        </div>
        <button onclick="saveProfile()" class="btn-primary" style="margin-top:16px;">Save Changes</button>
      </div>
    </div>
  </div>`;
  }
};
function loadPage(page) {
  const content = document.getElementById('content');
  content.classList.remove('fade-in');
  void content.offsetWidth;
  content.innerHTML = pages[page];
  content.classList.add('fade-in');
  document.getElementById('pageTitle').innerText = page.charAt(0).toUpperCase() + page.slice(1);
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const active = document.querySelector(`[data-page="${page}"]`);
  if (active) active.classList.add('active');
  updateSidebarProfile();
  updateCurrentDate();
  setTimeout(() => {
    if (page === 'dashboard') { renderBarChart(); animateCounters(); }
    if (page === 'transactions') renderTable();
    if (page === 'analytics') { renderPieChart(); renderTrendChart(); renderSmallBar(); }
    if (page === 'settings') setupThemeToggle();
    initMagneticHover();
  }, 50);
}
function renderTable() {
  const tbody = document.getElementById('transactionTableBody');
  if (!tbody) return;
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const filtered = sorted.filter(t => {
    let typeMatch =!document.getElementById('filterType').value || t.type === document.getElementById('filterType').value;
    let catMatch =!document.getElementById('filterCategory').value || t.category === document.getElementById('filterCategory').value;
    let monthVal = document.getElementById('filterMonth').value;
    let monthMatch =!monthVal || t.date.startsWith(monthVal);
    let dateVal = document.getElementById('filterDate').value;
    let dateMatch =!dateVal || t.date.startsWith(dateVal);
    let incExpVal = document.getElementById('filterIncExp').value;
    let incExpMatch =!incExpVal || t.type === incExpVal;
    return typeMatch && catMatch && monthMatch && dateMatch && incExpMatch;
  });
  tbody.innerHTML = filtered.map(t => `<tr><td>${t.desc}</td><td>${t.category}</td><td>${formatDateTime(t.date)}</td><td class="${t.type === 'income'? 'green' : 'red'}">₦${Number(t.amount).toLocaleString()}</td></tr>`).join('');
  document.getElementById('filterType').onchange = renderTable;
  document.getElementById('filterCategory').onchange = renderTable;
  document.getElementById('filterMonth').onchange = (e) => {
    selectedMonth = e.target.value;
    localStorage.setItem('spendly_selectedMonth', selectedMonth);
    renderTable();
    showToast(`All pages now showing ${formatMonthName(selectedMonth)}`, 'success');
  };
  document.getElementById('filterDate').onchange = renderTable;
  document.getElementById('filterIncExp').onchange = renderTable;
}
function renderBarChart() {
  const ctx = document.getElementById('barChart');
  if (!ctx) return;
  const income = getMonthlyTotal('income', selectedMonth);
  const expense = getMonthlyTotal('expense', selectedMonth);
  if (window.myBarChart) window.myBarChart.destroy();
  window.myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['#10b981', '#ff4d4f'],
        borderRadius: 20,
        borderSkipped: false,
        hoverBackgroundColor: ['#0ea371', '#e04447'],
        barThickness: 210,
        maxBarThickness: 220,
        barPercentage: 0.9,
        categoryPercentage: 0.65
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: v => v.toLocaleString() } },
        x: { grid: { display: false } }
      }
    }
  });
}
function renderPieChart() {
  const ctx = document.getElementById('pieChart');
  if (!ctx) return;
  let cats = {}; getTransactionsForMonth(selectedMonth).filter(t => t.type === 'expense').forEach(t => cats[t.category] = (cats[t.category] || 0) + Number(t.amount));
  if (window.myPieChart) window.myPieChart.destroy();
  window.myPieChart = new Chart(ctx, { type: 'doughnut', data: { labels: Object.keys(cats), datasets: [{ data: Object.values(cats), backgroundColor: ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } } });
}
function renderTrendChart() {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;
  const daysInMonth = new Date(selectedMonth.split('-')[0], selectedMonth.split('-')[1], 0).getDate();
  const maxDay = selectedMonth === "2026-09"? 15 : daysInMonth;
  let daily = {};
  for (let i = 1; i <= maxDay; i++) {
    const day = String(i).padStart(2, '0');
    const key = `${selectedMonth}-${day}`;
    const label = selectedMonth.split('-')[1] === "09"? `Sept ${i}` : `Aug ${i}`;
    daily[label] = getTransactionsForMonth(key).filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount), 0);
  }
  if (window.myTrendChart) window.myTrendChart.destroy();
  window.myTrendChart = new Chart(ctx, { type: 'line', data: { labels: Object.keys(daily), datasets: [{ label: 'Spending', data: Object.values(daily), borderColor: '#4f46e5', backgroundColor: 'rgba(79,70,229,0.15)', tension: 0.4, fill: true, pointRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false } });
}
function renderSmallBar() {
  const ctx = document.getElementById('smallBarChart');
  if (!ctx) return;
  const daysInMonth = new Date(selectedMonth.split('-')[0], selectedMonth.split('-')[1], 0).getDate();
  const maxDay = selectedMonth === "2026-09"? 15 : daysInMonth;
  let labels = []; let incomeArr = []; let expenseArr = [];
  for (let i = 1; i <= maxDay; i++) {
    const day = String(i).padStart(2, '0');
    const key = `${selectedMonth}-${day}`;
    labels.push(`Day ${i}`);
    incomeArr.push(getTransactionsForMonth(key).filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount), 0));
    expenseArr.push(getTransactionsForMonth(key).filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount), 0));
  }
  if (window.mySmallBar) window.mySmallBar.destroy();
  window.mySmallBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        { label: 'Income', data: incomeArr, backgroundColor: '#10b981', borderRadius: 8, barThickness: 16 },
        { label: 'Expense', data: expenseArr, backgroundColor: '#ef4444', borderRadius: 8, barThickness: 16 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true, ticks: { callback: v => '₦' + Number(v).toLocaleString() } }, x: { title: { display: true, text: `${formatMonthName(selectedMonth)} - Days` } } }
    }
  });
}
function setupThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  toggle.checked = localStorage.getItem('theme') === 'dark';
  toggle.onchange = () => {
    document.documentElement.setAttribute('data-theme', toggle.checked? 'dark' : 'light');
    localStorage.setItem('theme', toggle.checked? 'dark' : 'light');
  }
}
function openProfileModal() {
  const modal = document.getElementById('profileSettingsModal');
  if (modal) modal.style.display = 'block';
  const p = getStoredProfile();
  const hasProfile =!!p.fullName;
  const f = document.getElementById('profileFirstName');
  const l = document.getElementById('profileLastName');
  const e = document.getElementById('profileEmailField');
  const pic = document.getElementById('profilePicPreview');
  if (f) { f.value = p.firstName || ''; f.readOnly = hasProfile; f.style.opacity = hasProfile? '0.6' : '1'; f.style.cursor = hasProfile? 'not-allowed' : 'text'; }
  if (l) { l.value = p.lastName || ''; l.readOnly = hasProfile; l.style.opacity = hasProfile? '0.6' : '1'; l.style.cursor = hasProfile? 'not-allowed' : 'text'; }
  if (e) { e.value = p.email || ''; e.readOnly = hasProfile; e.style.opacity = hasProfile? '0.6' : '1'; e.style.cursor = hasProfile? 'not-allowed' : 'text'; }
  if (pic) pic.src = getProfilePic();
}
function closeProfileModal() { const modal = document.getElementById('profileSettingsModal'); if (modal) modal.style.display = 'none'; }
function uploadPfp(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2000000) { showToast('Max 2MB', 'error'); return; }
  const reader = new FileReader();
  reader.onload = () => {
    const preview = document.getElementById('profilePicPreview');
    const trigger = document.getElementById('editTriggerPfp');
    const sidebar = document.getElementById('sidebarPfp');
    if (preview) preview.src = reader.result;
    if (trigger) trigger.src = reader.result;
    if (sidebar) sidebar.src = reader.result;
    showToast('Photo selected - click Save Changes', 'success');
  }
  reader.readAsDataURL(file);
}
function removePfp() {
  const defaultPic = `https://ui-avatars.com/api/?name=U&background=4f46e5&color=fff&size=128`;
  const preview = document.getElementById('profilePicPreview');
  if (preview) preview.src = defaultPic;
  showToast('Photo removed - click Save Changes', 'success');
}
function saveProfile() {
  const p = getStoredProfile();
  const hasProfile =!!p.fullName;
  const picEl = document.getElementById('profilePicPreview');
  if (hasProfile) {
    const updated = {...p, avatar: picEl.src };
    localStorage.setItem(getProfileKey(updated.email), JSON.stringify(updated));
    localStorage.setItem('spendly_pfp', updated.avatar);
    updateSidebarProfile();
    showToast('Photo updated!', 'success');
    setTimeout(() => { closeProfileModal(); loadPage('settings'); }, 600);
    return;
  }
  const first = document.getElementById('profileFirstName').value.trim();
  const last = document.getElementById('profileLastName').value.trim();
  const email = document.getElementById('profileEmailField').value.trim();
  if (!first ||!last ||!email) { showToast('Fill all fields please', 'error'); return; }
  const profileData = { firstName: first, lastName: last, fullName: `${first} ${last}`.trim(), email: email, avatar: picEl.src };
  localStorage.setItem(getProfileKey(email), JSON.stringify(profileData));
  localStorage.setItem('spendly_name', profileData.fullName);
  localStorage.setItem('spendly_user', profileData.email);
  localStorage.setItem('spendly_pfp', profileData.avatar);
  updateSidebarProfile();
  showToast('Profile saved successfully!', 'success');
  setTimeout(() => { closeProfileModal(); loadPage('settings'); }, 600);
}
function openClearModal() { document.getElementById('clearDataModal').style.display = 'block'; }
function closeClearModal() { document.getElementById('clearDataModal').style.display = 'none'; }
function confirmClearData() {
  localStorage.clear();
  showToast('All data cleared', 'success');
  setTimeout(() => { window.location.href = 'spendlylogin.html'; }, 600);
}
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('spendly_loggedIn')!== 'true') { window.location.href = 'spendlylogin.html'; return; }
  updateCurrentDate();
  document.querySelectorAll('.nav-link').forEach(link => {
    link.onclick = (e) => { e.preventDefault(); loadPage(link.dataset.page); }
  });
  document.getElementById('menuBtn').onclick = () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
  }
  document.getElementById('overlay').onclick = () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
  }
  document.getElementById('addTransactionBtn').onclick = () => { document.getElementById('transactionModal').style.display = 'block'; }
  document.getElementById('closeModal').onclick = () => { document.getElementById('transactionModal').style.display = 'none'; }
  document.getElementById('closeClearModal').onclick = closeClearModal;
  document.getElementById('cancelClearBtn').onclick = closeClearModal;
  document.getElementById('confirmClearBtn').onclick = confirmClearData;
  document.getElementById('transactionForm').onsubmit = (e) => {
    e.preventDefault();
    const selectedDate = document.getElementById('date').value;
    const now = new Date();
    const time = now.toTimeString().slice(0, 5);
    const dateTime = `${selectedDate}T${time}`;
    transactions.push({ desc: document.getElementById('desc').value, amount: document.getElementById('amount').value, type: document.getElementById('type').value, category: document.getElementById('category').value, date: dateTime });
    localStorage.setItem('spendly', JSON.stringify(transactions));
    const newMonth = selectedDate.slice(0, 7);
    selectedMonth = newMonth;
    localStorage.setItem('spendly_selectedMonth', newMonth);
    document.getElementById('transactionModal').style.display = 'none';
    document.getElementById('transactionForm').reset();
    loadPage('dashboard');
    showToast('Transaction added successfully', 'success');
  }
  document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  loadPage('dashboard');
});
function logout() { localStorage.removeItem('spendly_loggedIn'); window.location.href = 'spendlylogin.html'; }