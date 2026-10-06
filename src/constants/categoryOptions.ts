import { categoryValues } from "../schemas/category.schema";

export const CATEGORY_OPTIONS = categoryValues.map((value) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value, // JavaScript knows you mean value: value
}));
