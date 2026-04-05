(function () {
    function renderPosts(posts) {
        var list = document.querySelector("[data-post-list]");
        if (!list) {
            return;
        }

        list.innerHTML = posts.map(function (post, index) {
            var tags = post.labels.map(function (label) {
                return '<span class="tag">' + label + "</span>";
            }).join("");

            return [
                '<article class="post-card card fade-up" style="animation-delay: ' + (index * 0.1).toFixed(1) + 's">',
                '    <div class="post-meta">',
                '        <span class="post-date">' + post.date + "</span>",
                "        " + tags,
                "    </div>",
                "    <h4>" + post.title + "</h4>",
                "    <p>" + post.excerpt + "</p>",
                "</article>"
            ].join("\n");
        }).join("\n");
    }

    function filterPosts(filter) {
        var posts = Array.isArray(window.POSTS) ? window.POSTS : [];
        if (filter === "todos") {
            return posts;
        }

        return posts.filter(function (post) {
            return Array.isArray(post.tags) && post.tags.indexOf(filter) !== -1;
        });
    }

    function updateNoResults(hasResults) {
        var emptyState = document.querySelector(".no-results");
        if (!emptyState) {
            return;
        }

        emptyState.style.display = hasResults ? "none" : "block";
    }

    function setActiveFilter(activeButton) {
        document.querySelectorAll(".filter-btn").forEach(function (button) {
            button.classList.remove("active");
        });

        activeButton.classList.add("active");
    }

    function initFilters() {
        var buttons = document.querySelectorAll(".filter-btn");
        if (!buttons.length) {
            return;
        }

        function applyFilter(filter) {
            var visiblePosts = filterPosts(filter);
            renderPosts(visiblePosts);
            updateNoResults(visiblePosts.length > 0);
        }

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                setActiveFilter(button);
                applyFilter(button.dataset.filter);
            });
        });

        applyFilter("todos");
    }

    document.addEventListener("DOMContentLoaded", initFilters);
})();
