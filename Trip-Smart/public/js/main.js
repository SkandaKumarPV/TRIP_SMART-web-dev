// Select the theme toggle button and icon
const themeButton = document.getElementById('theme-toggle-button');
const themeIcon = document.getElementById('theme-icon');

// Define theme classes and icons
const darkThemeClass = 'dark-theme';
const darkThemeIcon = 'ri-moon-line';
const lightThemeIcon = 'ri-sun-line';

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add(darkThemeClass);
  themeIcon.classList.replace(darkThemeIcon, lightThemeIcon);
}

// Toggle dark mode and save preference
if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkThemeClass);

    // Update the icon
    if (document.body.classList.contains(darkThemeClass)) {
      themeIcon.classList.replace(darkThemeIcon, lightThemeIcon);
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.replace(lightThemeIcon, darkThemeIcon);
      localStorage.setItem('theme', 'light');
    }
  });
}
