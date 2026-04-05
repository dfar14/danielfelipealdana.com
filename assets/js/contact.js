(function () {
    var form = document.getElementById("contact-form");
    if (!form) {
        return;
    }

    var nombreInput = document.getElementById("nombre");
    var telefonoInput = document.getElementById("telefono");
    var submitBtn = document.getElementById("submit-btn");
    var formMessage = document.getElementById("form-message");

    function showError(input, errorId, message) {
        input.classList.add("input-error");
        document.getElementById(errorId).textContent = message;
    }

    function clearError(input, errorId) {
        input.classList.remove("input-error");
        document.getElementById(errorId).textContent = "";
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = "form-message " + type;
        formMessage.hidden = false;
    }

    function setLoading(loading) {
        submitBtn.disabled = loading;
        submitBtn.querySelector(".btn-text").hidden = loading;
        submitBtn.querySelector(".btn-loading").hidden = !loading;
    }

    function validate() {
        var valid = true;

        if (!nombreInput.value.trim()) {
            showError(nombreInput, "nombre-error", "El nombre es obligatorio.");
            valid = false;
        } else {
            clearError(nombreInput, "nombre-error");
        }

        if (!telefonoInput.value.trim()) {
            showError(telefonoInput, "telefono-error", "El teléfono es obligatorio.");
            valid = false;
        } else if (!/^[\d\s\-+().]{7,20}$/.test(telefonoInput.value.trim())) {
            showError(telefonoInput, "telefono-error", "Ingresa un número de teléfono válido.");
            valid = false;
        } else {
            clearError(telefonoInput, "telefono-error");
        }

        return valid;
    }

    nombreInput.addEventListener("input", function () {
        clearError(nombreInput, "nombre-error");
        formMessage.hidden = true;
    });

    telefonoInput.addEventListener("input", function () {
        clearError(telefonoInput, "telefono-error");
        formMessage.hidden = true;
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        formMessage.hidden = true;

        if (!validate()) {
            return;
        }

        setLoading(true);

        var data = {
            nombre: nombreInput.value.trim(),
            telefono: telefonoInput.value.trim()
        };

        fetch("/api/contacto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Error del servidor");
                }
                return response.json();
            })
            .then(function () {
                showMessage("¡Datos enviados correctamente!", "success");
                form.reset();
            })
            .catch(function () {
                showMessage("Hubo un error al enviar. Intenta de nuevo.", "error");
            })
            .finally(function () {
                setLoading(false);
            });
    });
})();
