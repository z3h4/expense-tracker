import { CATEGORY_OPTIONS } from "../constants/categoryOptions";
import { Select } from "./Select";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <div>
      <Select
        placeholder="All Categories"
        options={CATEGORY_OPTIONS}
        onChange={onSelectCategory}
      />
    </div>
  );
};

export default ExpenseFilter;

/*
Use onChange={onSelectCategory} instead of onChange={(value) => onSelectCategory(value)}. It is simplified and it also keeps memo effective 
if the parent wraps onSelectCategory in useCallback, since an inline arrow creates a new function every render and defeats memo.
*/
