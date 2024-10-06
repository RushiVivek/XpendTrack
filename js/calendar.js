let currentMonth = 0;
let clickedDay = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

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

function load() {
  const dt = new Date();

  if (currentMonth !== 0) {
    dt.setMonth(new Date().getMonth() + currentMonth);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayofMonth = new Date(year, month, 1);
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  //last date of current month == num days

  const dateString = firstDayofMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  // console.log(dateString);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;
  const paddingDays = weekDays.indexOf(dateString.split(", ")[0]);

  calendar.innerHTML = ""; //Wipe before creating

  for (let i = 1; i <= paddingDays + numDaysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      daySquare.addEventListener("click", () => console.log("click"));
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

function changeMonth() {
  document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    load();
  });

  document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    load();
  });
}

changeMonth();
load();
