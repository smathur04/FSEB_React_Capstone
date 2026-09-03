import type { InputHTMLAttributes } from "react";
import { useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessages?: string[];
  attempted?: boolean;
}

export default function Input({
  label,
  errorMessages = [],
  id,
  className = "",
  onFocus,
  onBlur,
  value,
  defaultValue,
  attempted,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const hasError = errorMessages.length > 0;
  const hasValue = Boolean(value ?? defaultValue);

  const state = (attempted && hasError) ? "error" : isFocused ? "focus" : hasValue ? "active" : "default";

  return (
    <div className={`form-group ${state !== "default" ? state : ""}`.trim()}>
      <label className="form-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={`form-input ${state !== "default" ? state : ""} ${className}`.trim()}
        value={value}
        defaultValue={defaultValue}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        {...rest}
      />
      {hasError && attempted &&
        errorMessages.map((msg, i) => (
          <p className="form-error-text" key={i}>
            {msg}
          </p>
        ))}
    </div>
  );
}