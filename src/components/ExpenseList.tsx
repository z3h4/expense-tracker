import type { Expense } from "../types/expenses";

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;

  return (
    /* scope="col" is an HTML attribute used on table header elements (th)
        to tell screen readers and assistive technologies that the header
        applies to all cells in that entire vertical column. 
    */
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Category</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr>
            <td>{expense.description}</td>
            <td>${expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(expense.id)}
                aria-label={`Delete ${expense.description}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
