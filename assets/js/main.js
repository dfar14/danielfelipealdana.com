(function () {
    var THEME_KEY = "theme";

    function updateThemeToggle(isDark) {
        var toggle = document.querySelector("[data-theme-toggle]");
        if (!toggle) {
            return;
        }

        toggle.textContent = isDark ? "\u2600" : "\u263E";
        toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    }

    function setTheme(theme) {
        var isDark = theme === "dark";
        document.body.classList.toggle("dark", isDark);
        updateThemeToggle(isDark);
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    }

    function initTheme() {
        var savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
        }

        updateThemeToggle(document.body.classList.contains("dark"));

        var toggle = document.querySelector("[data-theme-toggle]");
        if (!toggle) {
            return;
        }

        toggle.addEventListener("click", function () {
            var nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
            setTheme(nextTheme);
        });
    }

    document.addEventListener("DOMContentLoaded", initTheme);
})();
