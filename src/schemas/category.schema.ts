import * as z from "zod";

export const categoryValues = [
  "groceries",
  "utilities",
  "entertainment",
] as const;

export const categorySchema = z.enum(categoryValues);

/*
- as const (Type Assertion): Tells TypeScript to treat this array as a readonly tuple with literal types, rather than an 
array of generic strings (string[]).
- Without as const: TypeScript infers the type as string[].
- With as const: TypeScript infers the exact tuple type readonly ["groceries", "utilities", "entertainment"].
- Why it matters for Zod: z.enum() requires a non-empty, immutable tuple of strings. Passing an array marked with as const 
satisfies Zod's requirements without type assertion errors.

The real power of this pattern is that you can automatically generate a Type from the Array. This prevents you from having 
to manually update an enum or a type definition every time you add a new category.

Why use this over an enum?

While enum is a built-in feature, many TypeScript developers prefer as const arrays because:

    Iteration: You can easily .map() over categoryValues to render your <option> tags in a dropdown.

    Simplicity: It compiles down to a plain JavaScript array, making it more predictable and easier to work with in standard 
    JS functions.

    Type Safety: It provides the same level of strictness as an enum without the extra boilerplate.
*/

/*
- z.enum(...): Creates a Zod validation schema that permits only the string values present in categoryValues.
*/
