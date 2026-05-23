import type { ChangeEventHandler, ReactNode } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: ReactNode;
  name?: string;
  id?: string;
}

export const Switch = ({ checked, onChange, label, name, id }: SwitchProps) => (
  <label className="switch" htmlFor={id ?? name}>
    <input
      id={id ?? name}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    <span className="switch__track" aria-hidden="true" />
    {label && <span className="switch__label">{label}</span>}
  </label>
);
