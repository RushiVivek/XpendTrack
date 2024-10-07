let monthChanger = 0;
let clickedDay = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const backDrop = document.getElementById("modalBackDrop");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursaday",
  "Friday",
  "Saturday",
];

function openDate(date) {
  clickedDay = date;
  const [month, day, year] = clickedDay.split("/");
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    "en-us",
    {
      day: "numeric",
      month: "long",
    }
  );
  document.querySelector("#newEventModal h2").innerText = `${formattedDate}`;

  newEventModal.style.display = "block";
  backDrop.style.display = "block";
}

function addCashflowData(type, amount, note) {
  const cashflowDataDiv = document.querySelector(".cashflow-data");

  const entryDiv = document.createElement("div");
  entryDiv.classList.add("cashflow-entry");

  entryDiv.innerHTML = `
    <span>${type}: $${amount} - ${note}</span>
    <button class="deleteEntry" style="float: right;">x</button>
  `;

  // Append the new entry to the data div
  cashflowDataDiv.appendChild(entryDiv);

  entryDiv.querySelector(".deleteEntry").addEventListener("click", function () {
    cashflowDataDiv.removeChild(entryDiv);
  });
}

document.getElementById("saveButton").addEventListener("click", function () {
  const amount = document.getElementById("cashflow-amount").value;
  const note = document.getElementById("cashflow-note").value;

  const selectedType = document.querySelector(
    ".cashflow-type button.selected"
  ).innerText;

  addCashflowData(selectedType, amount, note);

  document.getElementById("cashflow-amount").value = "";
  document.getElementById("cashflow-note").value = "";
});

const cashflowButtons = document.querySelectorAll(".cashflow-type button");
cashflowButtons.forEach((button) => {
  button.addEventListener("click", function () {
    cashflowButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

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
