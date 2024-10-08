let monthChanger = 0;
let clickedDay = null;

const calendar = document.getElementById("calendar");
const popupBackground = document.getElementById("popup-remover");
const popupShower = document.getElementById("popup-inputs");
const PopUpX = document.getElementById("closeBtn");

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

// Popup and BAckground
function showPopUp() {
    document.getElementById("popup-inputs").style.display = "flex";
    document.getElementById("incomeBtn").click();
    popupBackground.style.display = "block";
}

function closePopUp() {
    popupShower.style.display = "none";
    popupBackground.style.display = "none";
    clickedDay = null;
    loadCalendar();
}

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
    let varday = firstDayofMonth;
    const numDaysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayofMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    document.getElementById("monthDisplay").innerText = `${dt
        .toLocaleDateString("en-us", {
            month: "long",
        })
        .slice(0, 3)}, ${year}`;

    // Days before start
    const paddingDays = weekDays.indexOf(dateString.split(", ")[0]);

    // Clear before load
    calendar.innerHTML = "";

    for (let i = 1; i <= paddingDays + numDaysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        if (i > paddingDays) {
            daySquare.setAttribute(
                "strdate",
                varday.toDateString().slice(4, 10)
            );
            varday.setDate(varday.getDate() + 1);
            daySquare.innerText = i - paddingDays;

            if (i - paddingDays === day && monthChanger === 0) {
                daySquare.style.backgroundColor = "rgba(204,255,153, 0.5)";
            }

            daySquare.addEventListener("click", () => {
                //For date
                document.getElementById("dateOfDiv").innerText =
                    daySquare.getAttribute("strdate");

                showPopUp();
            });
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

    popupBackground.addEventListener("click", closePopUp);
    PopUpX.addEventListener("click", closePopUp);
}

// Function Calls
changeMonth();
loadCalendar();
