import { useState } from "react";
import "./App.css";
import ExpenseFilter from "./components/ExpenseFilter";
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
  const [selectedCategory, setSelectedCategory] = useState("");

  const visibleExpenses = selectedCategory
    ? expenses.filter(
        (e) =>
          e.category ===
          selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
      )
    : expenses;

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <>
      <ExpenseForm />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ExpenseList expenses={visibleExpenses} onDelete={removeExpense} />
    </>
  );
}

export default App;
