
console.log('main.js loaded at:', new Date().toISOString());

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');

    // Helper: Debounce for input performance
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Dark/Light Mode Toggle
    try {
        console.log('Searching for .mode-toggle...');
        const modeToggle = document.querySelector('.mode-toggle');
        if (modeToggle) {
            console.log('Mode toggle found, initializing...');
            const savedMode = localStorage.getItem('theme') || 'light';
            console.log('Saved theme:', savedMode);
            document.body.classList.add($,{savedMode}-mode);
            const modeIcon = modeToggle.querySelector('.mode-icon');
            if (modeIcon) {
                modeIcon.textContent = savedMode === 'light' ? '🌙' : '☀';
                console.log('Mode icon set to:', modeIcon.textContent);
            } else {
                console.error('Mode icon (.mode-icon) not found inside .mode-toggle');
            }
            modeToggle.setAttribute('aria-label', savedMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');

            modeToggle.addEventListener('click', () => {
                console.log('Mode toggle clicked at:', new Date().toISOString());
                const isDarkMode = document.body.classList.contains('dark-mode');
                document.body.classList.toggle('dark-mode', !isDarkMode);
                document.body.classList.toggle('light-mode', isDarkMode);

                const newMode = isDarkMode ? 'light' : 'dark';
                try {
                    localStorage.setItem('theme', newMode);
                    console.log('Theme saved to localStorage:', newMode);
                } catch (e) {
                    console.error('Failed to save theme to localStorage:', e);
                }
                if (modeIcon) {
                    modeIcon.textContent = newMode === 'light' ? '🌙' : '☀';
                }
                modeToggle.setAttribute('aria-label', newMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
                console.log('Switched to:', newMode);
                console.log('Body classes:', document.body.className);
            });

            modeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log('Mode toggle activated via keyboard');
                    modeToggle.click();
                }
            });
        } else {
            console.error('Mode toggle (.mode-toggle) not found in DOM');
        }
    } catch (e) {
        console.error('Error in Dark/Light Mode logic:', e);
    }

    // Doctors: Search and filter
    try {
        console.log('Searching for doctor search elements...');
        const doctorSearch = document.querySelector('.search-input');
        const specialtySelect = document.querySelector('.filter-select[aria-label="Filter by specialty"]');
        const locationSelect = document.querySelector('.filter-select[aria-label="Filter by location"]');
        const languageSelect = document.querySelector('.filter-select[aria-label="Filter by language"]');
        const doctorCards = document.querySelectorAll('.doctor-card');
        const searchButton = document.querySelector('.search-filter button');
        const noResults = document.getElementById('no-results');

        console.log('Doctor search elements:', {
            doctorSearch: !!doctorSearch,
            specialtySelect: !!specialtySelect,
            locationSelect: !!locationSelect,
            languageSelect: !!languageSelect,
            doctorCards: doctorCards.length,
            searchButton: !!searchButton,
            noResults: !!noResults
        });

        if (doctorSearch && specialtySelect && locationSelect && languageSelect && doctorCards.length) {
            console.log('Doctor search initialized:', { doctorCards: doctorCards.length });

            const filterDoctors = debounce(() => {
                const searchTerm = doctorSearch.value.trim().toLowerCase();
                const specialty = specialtySelect.value.toLowerCase();
                const location = locationSelect.value.toLowerCase();
                const language = languageSelect.value.toLowerCase();

                let visibleCount = 0;

                console.log('Filtering with:', { searchTerm, specialty, location, language });

                doctorCards.forEach(card => {
                    const name = card.dataset.name?.toLowerCase() || '';
                    const specialtyText = card.dataset.specialty?.toLowerCase() || '';
                    const locationText = card.dataset.location?.toLowerCase() || '';
                    const languageText = card.dataset.language?.toLowerCase() || '';

                    const matchesSearch = !searchTerm || name.includes(searchTerm) || specialtyText.includes(searchTerm);
                    const matchesSpecialty = !specialty || specialtyText === specialty;
                    const matchesLocation = !location || locationText === location;
                    const matchesLanguage = !language || languageText.split(' ').includes(language);

                    const isVisible = matchesSearch && matchesSpecialty && matchesLocation && matchesLanguage;
                    card.style.display = isVisible ? '' : 'none';
                    if (isVisible) visibleCount++;

                    console.log('Card:', { name, isVisible, matchesSearch, matchesSpecialty, matchesLocation, matchesLanguage });
                });

                if (noResults) {
                    noResults.classList.toggle('show', visibleCount === 0);
                    noResults.setAttribute('aria-hidden', visibleCount > 0 ? 'true' : 'false');
                }
                console.log('Visible doctors:', visibleCount);
            }, 200);

            doctorSearch.addEventListener('input', () => {
                console.log('Search input:', doctorSearch.value);
                filterDoctors();
            });
            specialtySelect.addEventListener('change', () => {
                console.log('Specialty changed:', specialtySelect.value);
                filterDoctors();
            });
            locationSelect.addEventListener('change', () => {
                console.log('Location changed:', locationSelect.value);
                filterDoctors();
            });
            languageSelect.addEventListener('change', () => {
                console.log('Language changed:', languageSelect.value);
                filterDoctors();
            });
            searchButton.addEventListener('click', () => {
                console.log('Search button clicked');
                filterDoctors();
            });

            doctorSearch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    console.log('Enter pressed in search');
                    filterDoctors();
                }
            });

            // Initial filter to ensure correct display
            filterDoctors();
        } else {
            console.error('Doctor search elements missing:', {
                doctorSearch: !!doctorSearch,
                specialtySelect: !!specialtySelect,
                locationSelect: !!locationSelect,
                languageSelect: !!languageSelect,
                doctorCards: doctorCards.length,
                searchButton: !!searchButton,
                noResults: !!noResults
            });
        }
    } catch (e) {
        console.error('Error in Doctor Search logic:', e);
    }
});