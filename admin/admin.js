(function () {
  "use strict";

  const STORAGE_KEY = "demoCashbackNames";
  const AUTH_KEY = "demoAdminAuth";
  const loginSection = document.getElementById("loginSection");
  const adminContent = document.getElementById("adminContent");
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const adminList = document.getElementById("adminList");
  const userCount = document.getElementById("userCount");
  const clearNamesBtn = document.getElementById("clearNames");
  const logoutBtn = document.getElementById("logoutBtn");

  const DEMO_USER = "admin";
  const DEMO_PASSWORD = "demo123";

  function getEntries() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(saved)) return [];

      return saved.map((item) => {
        if (typeof item === "string") {
          return { name: item, card: "0000 0000 0000 0000", expiry: "12/28", cvv: "123" };
        }

        return {
          name: item.name || "Noma'lum",
          card: item.card || "0000 0000 0000 0000",
          expiry: item.expiry || "12/28",
          cvv: item.cvv || "123",
        };
      });
    } catch (error) {
      return [];
    }
  }

  function renderNames() {
    const entries = getEntries();
    userCount.textContent = `${entries.length} ta foydalanuvchi`;
    adminList.innerHTML = "";

    if (!entries.length) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "empty";
      emptyItem.textContent = "Hozircha ma'lumotlar yo'q.";
      adminList.appendChild(emptyItem);
      return;
    }

    entries.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = `${entry.name} — ${entry.card} — ${entry.expiry} — ${entry.cvv}`;
      adminList.appendChild(item);
    });
  }

  function showAdmin() {
    if (loginSection) loginSection.hidden = true;
    if (adminContent) adminContent.hidden = false;
    renderNames();
  }

  function showLogin() {
    if (loginSection) loginSection.hidden = false;
    if (adminContent) adminContent.hidden = true;
    if (usernameInput) usernameInput.focus();
    if (loginError) loginError.style.display = "none";
  }

  if (clearNamesBtn) {
    clearNamesBtn.addEventListener("click", function () {
      localStorage.removeItem(STORAGE_KEY);
      renderNames();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem(AUTH_KEY);
      showLogin();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (username === DEMO_USER && password === DEMO_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, "true");
        loginForm.reset();
        showAdmin();
        return;
      }

      if (loginError) {
        loginError.textContent = "Noto'g'ri login yoki parol.";
        loginError.style.display = "block";
      }
    });
  }

  if (sessionStorage.getItem(AUTH_KEY) === "true") {
    showAdmin();
  } else {
    showLogin();
  }
})();
