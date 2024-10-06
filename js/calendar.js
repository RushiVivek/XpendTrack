let monthChanger = 0;
// let clickedDay = null;
// let events = localStorage.getItem("events")
//   ? JSON.parse(localStorage.getItem("events"))
//   : [];

const calendar = document.getElementById("calendar");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursaday",
  "Friday",
  "Saturday",
];

// Load Calendar
function loadCalendar() {
  const dt = new Date();

  if (monthChanger !== 0) {
    dt.setMonth(new Date().getMonth() + monthChanger);
  }

  // Today
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  //Firstday and Num days of month
  const firstDayofMonth = new Date(year, month, 1);
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayofMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  // Days before start
  const paddingDays = weekDays.indexOf(dateString.split(", ")[0]);

  // Clear before load
  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + numDaysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      if (i - paddingDays === day && monthChanger === 0) {
        daySquare.style.backgroundColor = "rgba(204,255,153, 0.5)";
      }

      daySquare.addEventListener("click", () =>
        openDate(`${month + 1}/${i - paddingDays}/${year}`)
      );
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

// Month Changer
function changeMonth() {
  document.getElementById("nextMonth").addEventListener("click", () => {
    monthChanger++;
    loadCalendar();
  });

  document.getElementById("prevMonth").addEventListener("click", () => {
    monthChanger--;
    loadCalendar();
  });

  document.getElementById("currMonth").addEventListener("click", () => {
    monthChanger = 0;
    loadCalendar();
  });
}

// Function Calls
changeMonth();
loadCalendar();
