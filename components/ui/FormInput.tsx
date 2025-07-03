import React from 'react';

interface FormInputProps {
  label?: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  as?: 'input' | 'textarea' | 'select';
  options?: string[]; 
  className?: string;
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  as = 'input',
  options = [],
  className = '',
} : FormInputProps) {
  const inputClass = `w-full px-4 py-2 border-2 border-secondary-2 rounded-full placeholder:text-white ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block font-medium text-sm ">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClass}
        />
      ) : as === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClass}
        >
          {options.map(opt => (
            <option className='bg-secondary-2 p-0' key={opt} value={opt}>
              {opt || "all"}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClass}
        />
      )}
    </div>
  );
};
