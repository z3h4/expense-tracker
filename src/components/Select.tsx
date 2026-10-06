import {
  memo,
  useId,
  type ChangeEvent,
  type ComponentPropsWithRef,
} from "react";

interface SelectOption<T extends string | number> {
  label: string;
  value: T;
}

type NativeSelectProps = Omit<
  ComponentPropsWithRef<"select">,
  "value" | "defaultValue" | "onChange" | "children"
>;

/*
    label: It is optional because label can be on the left side of the select component, or above the select component.
    Here it is on the left side of the select component.

    By extending NativeSelectProps, our custom Props interface inherits all remaining valid HTML props without 
    type conflicts.
 */
interface Props<T extends string | number> extends NativeSelectProps {
  label?: string;
  options: readonly SelectOption<T>[]; // treat the options array as immutable by preventing accidental mutations
  placeholder?: string;
  value?: T | null; // accept `null` ("nothing selected") as well as `undefined`.
  onChange: (value: T) => void;
  error?: string;
  containerClassName?: string;
  hint?: string;
}

const SelectComponent = <T extends string | number>({
  id: externalId,
  label,
  options,
  value,
  placeholder = "Select an option",
  onChange,
  error,
  required,
  hint,
  className,
  containerClassName = "mb-3",
  "aria-describedby": ariaDescribedBy, // so we can MERGE instead of overwrite
  ...rest
}: Props<T>) => {
  const generatedId = useId();
  //    ?? (Nullish Coalescing): This says: "If the parent gave me an ID (externalId), use it. Otherwise, use generatedId."
  const selectId = externalId ?? generatedId;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;

  const describedBy =
    [ariaDescribedBy, hint && hintId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const match = options.find(
      (opt) => String(opt.value) === event.target.value,
    );

    if (match) onChange(match.value);
  };

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      <select
        {...rest}
        id={selectId}
        value={value ?? ""} // `?? ""` still treats 0 as valid, and also handles null/undefined.
        // value={value !== undefined && value !== null ? String(value) : ""}
        // className={`form-select${error ? " is-invalid" : ""} ${className}.`.trim()}
        className={["form-select", error && "is-invalid", className]
          .filter(Boolean)
          .join(" ")}
        onChange={handleChange}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hint && (
        <div id={hintId} className="form-text">
          {hint}
        </div>
      )}

      {error && (
        <p id={errorId} className="invalid-feedback" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export const Select = memo(SelectComponent) as typeof SelectComponent;

export default Select;

/*
    - ComponentPropsWithRef<"select">: Instead of manually declaring every possible HTML prop in your component's interface,
    this React utility type extracts all native HTML attributes and event handlers available on a standard <select> 
    element, along with its React ref.

    Included by default: id, name, disabled, required, onBlur, onFocus, className, style, aria-*, data-*, ref, and many 
    more.

    - Omit<Type, Keys>: Omit is a built-in TypeScript utility that takes an existing interface/type and removes specified 
    property keys from it.

    - ...rest: Collects remaining native properties (like onBlur, name, disabled, ref) into a single object passed 
    directly down to the native <select> element.
*/

/* 
  useId: It is a hook for generating unique IDs that are stable across the server and client.

  Why use it?: 
    In accessibility (A11y), you must link a <label> to an <input> using the htmlFor and id attributes. If you hardcode an 
    ID like id="my-input", and you use that component twice on the same page, you now have duplicate IDs in the DOM. This 
    breaks screen readers and is invalid HTML.
  
  When to use it?
    - Anytime you build a reusable form component (input, select, checkbox).
    - When you need to generate unique IDs for ARIA attributes (like aria-describedby linking to an error message).
*/

/*
    .filter(Boolean): Filters out all falsy values from the array.

    assing Boolean as a callback to .filter() converts each array element to a boolean (true/false) and keeps only the 
    elements that evaluate to true.
*/

/*
    memo: it is a Higher-Order Component (HOC) that tells React to skip re-rendering a component if its props haven't changed.

    Why use it?
    React’s default behavior is: If the parent re-renders, the child re-renders. In a large form, typing in a "Name" field 
    might trigger a state update in the parent. Without memo, every other input (like your Select) would re-render on every 
    single keystroke, which can cause lag.

    When to use it?
    - Performance optimization: When a component is heavy or sits inside a parent that re-renders frequently (like a form).
    - Stable Props: It works best when the props being passed (like options) are stable (usually defined outside the 
    component or memoized with useMemo).

    memo() strips away generic type parameters (<T>). Typing it as typeof SelectComponent forces TypeScript to preserve 
    the exact generic function signature of SelectComponent. This ensures consumers get full type inference for value 
    and onChange callbacks.
 */
