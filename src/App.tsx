import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import type { Expense } from "./types/expenses";

const INITIAL_EXPENSES: Expense[] = [
  { id: 1, description: "Milk", amount: 5, category: "Groceries" },
  { id: 2, description: "Eggs", amount: 10, category: "Groceries" },
  { id: 3, description: "Electricity", amount: 100, category: "Utilities" },
  { id: 4, description: "Movies", amount: 15, category: "Entertainment" },
  { id: 5, description: "Milk", amount: 5, category: "Groceries" },
];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);

  const removeExpense = (expenseId: Number) => {
    const newExpenses = expenses.filter((ex) => ex.id !== expenseId);
    setExpenses(newExpenses);
  };

  return (
    <>
      <ExpenseForm />
      <ExpenseList expenses={expenses} onDelete={removeExpense} />
    </>
  );
}

export default App;
