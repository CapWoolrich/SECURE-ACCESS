import type { TextareaHTMLAttributes, ReactNode } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

export const Textarea = ({ label, hint, error, className = '', id, ...rest }: TextareaProps) => {
  const tId = id ?? rest.name;
  return (
    <div className="field">
      {label && <label className="field__label" htmlFor={tId}>{label}</label>}
      <textarea id={tId} className={`textarea ${className}`.trim()} {...rest} />
      {hint && !error && <div className="field__hint">{hint}</div>}
      {error && <div className="field__error">{error}</div>}
    </div>
  );
};
