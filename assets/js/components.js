(function () {
    var NAV_LINKS = [
        { href: "index.html", label: "Inicio" },
        { href: "sobre-mi.html", label: "Sobre mí" }
    ];

    var SOCIAL_LINKS = [
        { href: "https://github.com/dfar14", label: "GitHub" },
        { href: "https://www.linkedin.com/in/daniel-felipe-aldana", label: "LinkedIn" }
    ];

    function getCurrentPage() {
        var path = window.location.pathname;
        var file = path.substring(path.lastIndexOf("/") + 1) || "index.html";
        return file;
    }

    function renderHeader() {
        var header = document.querySelector("[data-site-header]");
        if (!header) {
            return;
        }

        var currentPage = getCurrentPage();
        var navLinks = NAV_LINKS.map(function (link) {
            var activeClass = link.href === currentPage ? ' class="active"' : "";
            return '<a href="' + link.href + '"' + activeClass + ">" + link.label + "</a>";
        }).join("\n                    ");

        header.innerHTML = [
            '<div class="inner">',
            '    <a class="site-branding" href="index.html">Daniel Felipe Aldana</a>',
            '    <div class="header-right">',
            '        <nav class="site-nav" aria-label="Principal">',
            "            " + navLinks,
            "        </nav>",
            '        <button class="theme-toggle" type="button" data-theme-toggle title="Cambiar tema" aria-label="Cambiar tema" aria-pressed="false">&#9790;</button>',
            "    </div>",
            "</div>"
        ].join("\n        ");
    }

    function renderFooter() {
        var footer = document.querySelector("[data-site-footer]");
        if (!footer) {
            return;
        }

        var socialLinks = SOCIAL_LINKS.map(function (link) {
            return '<a href="' + link.href + '" target="_blank" rel="noreferrer">' + link.label + "</a>";
        }).join("\n            ");

        footer.innerHTML = [
            '<div class="social-links">',
            "    " + socialLinks,
            "</div>",
            '<p>&copy; ' + new Date().getFullYear() + " Daniel Felipe Aldana</p>"
        ].join("\n        ");
    }

    renderHeader();
    renderFooter();
})();
