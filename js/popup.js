const incomeOptions = ["Allowance", "Salary", "Bonus", "Other"];
const expenseOptions = [
    "Food",
    "Fashion",
    "Medicines",
    "Groceries",
    "EMI",
    "Entertainment",
    "Education",
    "Transport",
    "Culture",
    "Household",
    "Beauty",
    "Gift",
];
const transferOptions = [
    "Bank Transfer",
    "Wallet Transfer",
    "Savings Transfer",
];

let netIncome = 0;
let netExpense = 0;
let netTransfer = 0;
let netCashFlow = 0;

let transactions = localStorage.getItem("transaction")
    ? JSON.parse(localStorage.getItem("transaction"))
    : [];

const categoryDropdown = document.getElementById("categoryDropdown");
const transaction = document.getElementById("addedData");
const cashFlowColor = document.getElementById("cashFlow-color");

// CashFlow
function cashFlowUpdate() {
    netCashFlow = netIncome - netExpense - netTransfer;
    updateUI();
}

function updateUI() {
    if (netCashFlow > 0) {
        cashFlowColor.style.backgroundColor = "rgba(124, 252, 0, 0.5)";
    } else if (netCashFlow < 0) {
        cashFlowColor.style.backgroundColor = "rgba(255, 49, 49, 0.5)";
        netCashFlow = Math.abs(netCashFlow);
    } else {
        cashFlowColor.style.backgroundColor = "rgb(255, 255, 255)";
    }
    document.getElementById("netIncome").textContent = `${netCashFlow}`;
}

// Dropdown
function populateDropdown(options) {
    categoryDropdown.innerHTML = "";
    let opti = document.createElement("option");
    opti.disabled = true;
    opti.selected = true;
    opti.innerText = "Choose Category";
    categoryDropdown.appendChild(opti);

    options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.innerText = option;
        categoryDropdown.appendChild(opt);
    });
}

// Button Updates
function updateButtons(index) {
    for (let i of document.getElementsByClassName("cf-btn")) i.innerText = "";
    document.getElementsByClassName("cf-btn")[index].innerText = " ✓";
}

// CashFlow => Dropdown
document.getElementById("incomeBtn").addEventListener("click", () => {
    updateButtons(0);
    populateDropdown(incomeOptions);
});

document.getElementById("expenseBtn").addEventListener("click", () => {
    updateButtons(1);
    populateDropdown(expenseOptions);
});

document.getElementById("transferBtn").addEventListener("click", () => {
    updateButtons(2);
    populateDropdown(transferOptions);
});

// Save Data
document.getElementById("saveButton").addEventListener("click", () => {
    const category = categoryDropdown.value;
    const amount = document.getElementById("cashflow-amount").value;

    if (category != "Choose Category" && amount > 0) {
        const id = new Date().getTime();
        const amountValue = parseFloat(amount);
        const dataEntry = { id, category, amount: amountValue };
        transactions.push(dataEntry);

        if (incomeOptions.includes(category)) {
            netIncome += amountValue;
        } else if (expenseOptions.includes(category)) {
            netExpense += amountValue;
        } else if (transferOptions.includes(category)) {
            netTransfer += amountValue;
        }

        cashFlowUpdate();
        appendTransactionToUI(dataEntry);
        updateLocalStorage();

        document.getElementById("cashflow-amount").value = "";
    } else {
        if (category == "Choose Category") {
            alert("Choose type of Cashflow with buttons given");
        }
    }
});

// Append Transaction
function appendTransactionToUI({ id, category, amount }) {
    const dataEntry = document.createElement("div");
    dataEntry.classList.add("cashflow-entry");
    dataEntry.setAttribute("data-id", id);

    if (incomeOptions.includes(category)) {
        dataEntry.classList.add("income");
    } else if (expenseOptions.includes(category)) {
        dataEntry.classList.add("expense");
    } else if (transferOptions.includes(category)) {
        dataEntry.classList.add("transfer");
    }

    dataEntry.innerHTML = `
        <span>${category}</span>
        <span class="cashflow-amount">₹${amount}</span>
        <span class="deleteData" data-id="${id}" style="border: none; background-color: transparent;">
            <ion-icon name="trash-sharp" style="color: red; font-size: 16px;"></ion-icon>
        </span>
    `;

    transaction.innerHTML = "";
    transaction.appendChild(dataEntry);

    dataEntry.querySelector(".deleteData").addEventListener("click", () => {
        deleteTransaction(id);
    });
}

// Delete
function deleteTransaction(id) {
    const entryIndex = transactions.findIndex(
        (transaction) => transaction.id === id
    );
    if (entryIndex === -1) return;

    const entry = transactions[entryIndex];

    if (incomeOptions.includes(entry.category)) {
        netIncome -= entry.amount;
    } else if (expenseOptions.includes(entry.category)) {
        netExpense -= entry.amount;
    } else if (transferOptions.includes(entry.category)) {
        netTransfer -= entry.amount;
    }

    transactions.splice(entryIndex, 1);
    document.querySelector(`[data-id="${id}"]`).remove();
    cashFlowUpdate();
    updateLocalStorage();
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem("transaction", JSON.stringify(transactions));
}

// Load Transactions on Page Load
function loadTransactions() {
    transactions.forEach((transaction) => appendTransactionToUI(transaction));
    cashFlowUpdate();
}

window.onload = () => {
    loadTransactions();
};
