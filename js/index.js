// Utility functions to check leap year and February days
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const noFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

// Calendar initialization
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month_picker = document.querySelector("#month-picker");
let year_picker = document.querySelector("#year");

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector(".calendar-days");
  calendar_days.innerHTML = ""; // Clear previous calendar days
  let days_of_month = [
    31,
    noFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currentDate = new Date();

  // Update calendar header
  month_picker.innerHTML = months[month];
  year_picker.innerHTML = year;

  // Calculate first day of the month
  let first_day = new Date(year, month, 1).getDay();

  // Fill calendar with days (up to 6 rows, 7 days each)
  for (let i = 0; i < 42; i++) {
    // 42 slots (6 weeks of 7 days)
    let day = document.createElement("div");

    // Fill day if within valid month range
    if (i >= first_day && i - first_day < days_of_month[month]) {
      day.innerHTML = `<span>${i - first_day + 1}</span>`;

      // Highlight current date
      if (
        i - first_day + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add("current-date");
      }
    }
    calendar_days.appendChild(day);
  }
};

// Handling next and previous year
document.querySelector("#pre-year").onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector("#next-year").onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

// Handling next and previous month
document.querySelector("#prev-month").onclick = () => {
  currentMonth.value = currentMonth.value > 0 ? currentMonth.value - 1 : 11;
  if (currentMonth.value === 11) --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector("#next-month").onclick = () => {
  currentMonth.value = currentMonth.value < 11 ? currentMonth.value + 1 : 0;
  if (currentMonth.value === 0) ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

// Initial setup
let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

// Sidebar toggle functionality
document.querySelector("#sidebar-btn").onclick = () => {
  const sidebar = document.querySelector(".side-bar");
  sidebar.classList.toggle("collapsed");

  const container = document.querySelector(".container");
  container.classList.toggle("collapsed");
};
