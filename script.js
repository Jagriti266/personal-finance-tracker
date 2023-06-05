let transactions = [];
let balance = 0;
let selectedTransactionIndex = -1;

function addTransaction() {
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (description === "" || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const transaction = {
    description,
    amount
  };

  if (selectedTransactionIndex === -1) {
    transactions.push(transaction);
  } else {
    transactions[selectedTransactionIndex] = transaction;
    selectedTransactionIndex = -1;
  }

  updateTransactionsTable();
  updateBalance();

  descriptionInput.value = "";
  amountInput.value = "";
}

function editTransaction(index) {
  const transaction = transactions[index];
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");

  descriptionInput.value = transaction.description;
  amountInput.value = transaction.amount;

  selectedTransactionIndex = index;
}

function deleteTransaction(index) {
  transactions.splice(index, 1);

  updateTransactionsTable();
  updateBalance();
}

function updateTransactionsTable() {
  const transactionsTable = document.getElementById("transactions");
  transactionsTable.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const row = transactionsTable.insertRow();

    const descriptionCell = row.insertCell();
    descriptionCell.textContent = transaction.description;

    const amountCell = row.insertCell();
    amountCell.textContent = "$" + transaction.amount.toFixed(2);

    const actionCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTransaction(index));
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTransaction(index));
    actionCell.appendChild(deleteButton);
  });
}

function updateBalance() {
  balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
  const balanceElement = document.getElementById("balance");
  balanceElement.textContent = "Current Balance: $" + balance.toFixed(2);
}
