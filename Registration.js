document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("regForm");

    // Validation function
    function showError(input, message) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains("error")) {
            error.innerText = message; // Update existing error message
        } else {
            error = document.createElement("div");
            error.className = "error";
            error.style.color = "red";
            error.style.fontSize = "12px";
            error.style.marginTop = "5px";
            error.innerText = message;
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    }

    function clearError(input) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains("error")) {
            error.remove();
        }
    }

    // Event listeners for real-time validation
    form.querySelectorAll("input, select").forEach((input) => {
        input.addEventListener("input", () => validateField(input)); // Validate on typing
        input.addEventListener("blur", () => validateField(input)); // Validate on leaving field
    });

    function validateField(input) {
        let isValid = true;
        let value = input.value.trim();

        // Mobile Validation (10-digit number)
        if (input.name === "mobile" || input.name === "emergency_mobile") {
            let mobileRegex = /^[6-9]\d{9}$/;
            if (!mobileRegex.test(value)) {
                showError(input, "Enter a valid 10-digit number.");
                isValid = false;
            } else {
                clearError(input);
            }
        }

        // Height Validation (50 cm - 250 cm)
        if (input.name === "height" && (value < 50 || value > 250)) {
            showError(input, "Height must be between 50 cm and 250 cm.");
            isValid = false;
        } else if (input.name === "height") {
            clearError(input);
        }

        // Weight Validation (20 kg - 200 kg)
        if (input.name === "weight" && (value < 20 || value > 200)) {
            showError(input, "Weight must be between 20 kg and 200 kg.");
            isValid = false;
        } else if (input.name === "weight") {
            clearError(input);
        }

        // Date of Birth Validation (Cannot be in the future)
        if (input.id === "dob") {
            let dobDate = new Date(value);
            let today = new Date();
            if (dobDate >= today) {
                showError(input, "Date of Birth cannot be a future date.");
                isValid = false;
            } else {
                clearError(input);
            }
        }

        // Email Validation
        if (input.name === "email") {
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(input, "Enter a valid email.");
                isValid = false;
            } else {
                clearError(input);
            }
        }

        // Password Validation (Min 6 characters)
        if (input.name === "password" && value.length < 6) {
            showError(input, "Password must be at least 6 characters.");
            isValid = false;
        } else if (input.name === "password") {
            clearError(input);
        }

        // Confirm Password Validation
        if (input.name === "confirm_password") {
            let password = document.querySelector('input[name="password"]').value;
            if (value !== password) {
                showError(input, "Passwords do not match.");
                isValid = false;
            } else {
                clearError(input);
            }
        }

        return isValid;
    }

    // Prevent form submission if there are errors
    form.addEventListener("submit", function (event) {
        let isValid = true;
        form.querySelectorAll("input, select").forEach((input) => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
        } else {
            alert("Registration Successful!");
        }
    });
});
