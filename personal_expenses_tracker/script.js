const addExpenseBtn = document.getElementById("add-expense");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const typeInput = document.getElementById("expense-type");
const expenseList = document.getElementById("expense-list");

// Load saved expenses
window.onload = () => {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  savedExpenses.forEach(exp => createExpenseElement(exp));
};

// Add new expense
addExpenseBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const amount = amountInput.value.trim();
  const type = typeInput.value;

  if (name === "" || amount === "" || type === "") {
    alert("Please fill all fields!");
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount,
    type
  };

  createExpenseElement(expense);
  saveExpense(expense);

  nameInput.value = "";
  amountInput.value = "";
  typeInput.value = "";
});

// Create expense item
function createExpenseElement(expense) {
  const expenseDiv = document.createElement("div");
  expenseDiv.className = "expense";
  expenseDiv.dataset.id = expense.id;

  expenseDiv.innerHTML = `
    <button onclick="deleteExpense(${expense.id})">Delete</button>
    <h3>${expense.name}</h3>
    <p>Amount: ₹${expense.amount}</p>
    <p>Type: ${expense.type}</p>
  `;

  expenseList.appendChild(expenseDiv);
}

// Delete expense
function deleteExpense(id) {
  const expEl = document.querySelector(`.expense[data-id='${id}']`);
  expEl.remove();

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = expenses.filter(e => e.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Save to localStorage
function saveExpense(expense) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
