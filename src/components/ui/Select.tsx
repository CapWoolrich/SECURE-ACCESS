import type { SelectHTMLAttributes, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  options: Array<{ value: string; label: string }>;
}

export const Select = ({ label, hint, error, options, className = '', id, ...rest }: SelectProps) => {
  const selectId = id ?? rest.name;
  return (
    <div className="field">
      {label && <label className="field__label" htmlFor={selectId}>{label}</label>}
      <select id={selectId} className={`select ${className}`.trim()} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {hint && !error && <div className="field__hint">{hint}</div>}
      {error && <div className="field__error">{error}</div>}
    </div>
  );
};
