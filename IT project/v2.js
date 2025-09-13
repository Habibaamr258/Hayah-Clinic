document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('prescriptionForm');
  const patientId = document.getElementById('patientId');
  const patientName = document.getElementById('patientName');
  const doctorName = document.getElementById('doctorName');
  const frequency = document.getElementById('frequency');
  const duration = document.getElementById('duration');

  function setError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    errorDiv.textContent = message;
    input.classList.add('input-error');
  }

  function clearError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    errorDiv.textContent = '';
    input.classList.remove('input-error');
  }

  patientId.addEventListener('input', () => {
    const val = patientId.value;
    if (!/^\d*$/.test(val)) {
      setError(patientId, 'Patient ID must be a positive number');
    } else {
      clearError(patientId);
    }
  });

  function validateNameInput(input) {
    const val = input.value;
    if (!/^[a-zA-Z\s]*$/.test(val)) {
      setError(input, 'Only letters and spaces are allowed');
    } else {
      clearError(input);
    }
  }
  patientName.addEventListener('input', () => validateNameInput(patientName));
  doctorName.addEventListener('input', () => validateNameInput(doctorName));

  frequency.addEventListener('input', () => {
    if (!/^\d*$/.test(frequency.value) || Number(frequency.value) <= 0) {
      setError(frequency, 'Frequency must be a positive number');
    } else {
      clearError(frequency);
    }
  });

  duration.addEventListener('input', () => {
    if (!/^\d*$/.test(duration.value) || Number(duration.value) <= 0) {
      setError(duration, 'Duration must be a positive number');
    } else {
      clearError(duration);
    }
  });

  function validateForm() {
    let valid = true;

    if (patientId.value.trim() === '') {
      setError(patientId, 'Patient ID is required');
      valid = false;
    } else if (!/^\d+$/.test(patientId.value.trim())) {
      setError(patientId, 'Patient ID must be a positive number');
      valid = false;
    } else {
      clearError(patientId);
    }

    if (patientName.value.trim() === '') {
      setError(patientName, 'Patient Name is required');
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(patientName.value.trim())) {
      setError(patientName, 'Only letters and spaces are allowed');
      valid = false;
    } else {
      clearError(patientName);
    }

    if (doctorName.value.trim() === '') {
      setError(doctorName, 'Doctor Name is required');
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(doctorName.value.trim())) {
      setError(doctorName, 'Only letters and spaces are allowed');
      valid = false;
    } else {
      clearError(doctorName);
    }

    const date = document.getElementById('date');
    if (date.value === '') {
      setError(date, 'Date is required');
      valid = false;
    } else {
      clearError(date);
    }

    const diagnosis = document.getElementById('diagnosis');
    if (diagnosis.value.trim() === '') {
      setError(diagnosis, 'Diagnosis is required');
      valid = false;
    } else {
      clearError(diagnosis);
    }

    const medication = document.getElementById('medication');
    if (medication.value.trim() === '') {
      setError(medication, 'Medication is required');
      valid = false;
    } else {
      clearError(medication);
    }

    const dosage = document.getElementById('dosage');
    if (dosage.value.trim() === '') {
      setError(dosage, 'Dosage is required');
      valid = false;
    } else {
      clearError(dosage);
    }

    if (frequency.value.trim() === '') {
      setError(frequency, 'Frequency is required');
      valid = false;
    } else if (!/^\d+$/.test(frequency.value.trim()) || Number(frequency.value.trim()) <= 0) {
      setError(frequency, 'Frequency must be a positive number');
      valid = false;
    } else {
      clearError(frequency);
    }

    if (duration.value.trim() === '') {
      setError(duration, 'Duration is required');
      valid = false;
    } else if (!/^\d+$/.test(duration.value.trim()) || Number(duration.value.trim()) <= 0) {
      setError(duration, 'Duration must be a positive number');
      valid = false;
    } else {
      clearError(duration);
    }

    return valid;
  }

  const successMessage = document.createElement('div');
  successMessage.style.color = 'green';
  successMessage.style.marginTop = '10px';
  form.appendChild(successMessage);

  form.addEventListener('submit', e => {
    e.preventDefault();
    successMessage.textContent = '';

    if (!validateForm()) {
      return;
    }

    const prescription = {
      patientId: patientId.value.trim(),
      patientName: patientName.value.trim(),
      doctorName: doctorName.value.trim(),
      date: document.getElementById('date').value,
      diagnosis: document.getElementById('diagnosis').value.trim(),
      medication: document.getElementById('medication').value.trim(),
      dosage: document.getElementById('dosage').value.trim(),
      frequency: frequency.value.trim(),
      duration: duration.value.trim(),
      instructions: document.getElementById('instructions').value.trim(),
    };

    let prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
    prescriptions.push(prescription);
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));

    successMessage.textContent = 'Prescription saved successfully!';
  });
});
