//register page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".register-form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const age = document.getElementById("age");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const genderRadios = document.getElementsByName("gender");
  const clearBtn = document.getElementById("clearData");

  const inputs = [username, email, phone, age, password, confirmPassword];
  // Toggle password visibility
const togglePasswordBtn = document.getElementById("togglePassword");
togglePasswordBtn.addEventListener("click", function () {
  const isVisible = password.type === "text";

  password.type = isVisible ? "password" : "text";
  confirmPassword.type = isVisible ? "password" : "text";

  togglePasswordBtn.textContent = isVisible ? "SHOW" : "HIDE";
});

  function showError(input, message) {
    const formGroup = input.parentElement;
    let small = formGroup.querySelector("small");

    input.classList.add("error");

    if (!small) {
      small = document.createElement("small");
      formGroup.appendChild(small);
    }

    small.innerText = message;
    small.style.color = "red";
    small.style.fontSize = "0.85em";
  }

  function clearError(input) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector("small");
    input.classList.remove("error");
    if (small) {
      small.innerText = "";
    }
  }

  function isEmailValid(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function validateField(input) {
    const value = input.value.trim();

    if (input === username) {
      if (value === "") {
        showError(input, "Username is required");
      } else {
        clearError(input);
      }
    }

    if (input === email) {
      if (!isEmailValid(value)) {
        showError(input, "Enter a valid email address");
      } else {
        clearError(input);
      }
    }

    if (input === phone) {
      if (!/^\d+$/.test(value)) {
        showError(input, "Phone must contain only numbers");
      } else {
        clearError(input);
      }
    }

    if (input === age) {
  if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
    showError(input, "Enter a valid positive age");
  } else if (parseInt(value) > 120) {
    showError(input, "Age cannot be more than 120");
  } else {
    clearError(input);
  }
}

    if (input === password) {
      if (value.length < 6) {
        showError(input, "Password must be at least 6 characters");
      } else {
        clearError(input);
      }
    }

    if (input === confirmPassword) {
      if (value !== password.value) {
        showError(input, "Passwords do not match");
      } else {
        clearError(input);
      }
    }
  }

  // Add real-time validation
  inputs.forEach(input => {
    input.addEventListener("input", () => validateField(input));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    inputs.forEach(input => {
      validateField(input);
      if (input.classList.contains("error")) {
        isValid = false;
      }
    });

    // Gender validation
    let genderSelected = [...genderRadios].some(r => r.checked);
    if (!genderSelected) {
      alert("Please select your gender.");
      isValid = false;
    }

    if (isValid) {
      const formData = {
        username: username.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        age: age.value.trim(),
        gender: [...genderRadios].find(r => r.checked).value,
        password: password.value
      };

      localStorage.setItem("patientData", JSON.stringify(formData));
      alert("Registration successful!");
    }
  });

  // Load saved data
  const savedData = JSON.parse(localStorage.getItem("patientData"));
  if (savedData) {
    username.value = savedData.username;
    email.value = savedData.email;
    phone.value = savedData.phone;
    age.value = savedData.age;
    password.value = savedData.password;
    confirmPassword.value = savedData.password;
    for (let radio of genderRadios) {
      if (radio.value === savedData.gender) {
        radio.checked = true;
      }
    }
  }

  // Clear data
  clearBtn?.addEventListener("click", function () {
    localStorage.removeItem("patientData");
    form.reset();
    alert("Form data cleared.");
  });
});

//appointment page
const nameInput = document.getElementById('patient-name');
  const phoneInput = document.getElementById('patient-phone');
  const form = document.querySelector('form');

  // Create an error message element below the phone input
  let phoneErrorMsg = document.createElement('div');
  phoneErrorMsg.style.color = 'red';
  phoneErrorMsg.style.fontSize = '0.9rem';
  phoneErrorMsg.style.marginTop = '5px';
  phoneInput.parentNode.appendChild(phoneErrorMsg);

  // Validate phone input on each input event
  phoneInput.addEventListener('input', () => {
    const value = phoneInput.value;
    // Remove non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    if (value !== digitsOnly) {
      phoneErrorMsg.textContent = 'Phone number must contain digits only!';
      phoneInput.value = digitsOnly;
    } else {
      phoneErrorMsg.textContent = '';
    }
  });
  
nameInput.addEventListener('input', () => {
  // allow only e or a and space
  const lettersOnly = nameInput.value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, '');
  if (nameInput.value !== lettersOnly) {
    nameInput.value = lettersOnly;
  }
});


  // On page load, fill form with saved data if any
  window.addEventListener('load', () => {
    const savedData = JSON.parse(localStorage.getItem('appointmentData'));
    if (savedData) {
      form['appointment-type'].value = savedData.appointmentType || '';
      form['patient-name'].value = savedData.patientName || '';
      form['patient-phone'].value = savedData.patientPhone || '';
      form['doctor'].value = savedData.doctor || '';
      form['appointment-date'].value = savedData.appointmentDate || '';
      form['appointment-time'].value = savedData.appointmentTime || '';
      form['notes'].value = savedData.notes || '';
    }
  });

  // On form submit, save data to localStorage
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check if phone number is entered
    if (!phoneInput.value) {
      phoneErrorMsg.textContent = 'Please enter a valid phone number';
      phoneInput.focus();
      return;
    }

    const appointmentData = {
      appointmentType: form['appointment-type'].value,
      patientName: form['patient-name'].value,
      patientPhone: phoneInput.value,
      doctor: form['doctor'].value,
      appointmentDate: form['appointment-date'].value,
      appointmentTime: form['appointment-time'].value,
      notes: form['notes'].value
    };

    localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    alert('Appointment booked successfully and data saved.');
  });

  // Function to clear saved data and reset the form
  function clearAppointmentData() {
    localStorage.removeItem('appointmentData');
    form.reset();
    phoneErrorMsg.textContent = '';
  }


 