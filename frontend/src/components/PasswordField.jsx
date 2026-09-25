import { useState } from "react";

function PasswordField({ id, label, value, onChange, error, autoComplete }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="grid gap-[7px]">
      <label className="text-[0.88rem] font-bold text-care-ink" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full rounded-lg border border-care-line bg-[#fcfefd] px-3 py-2 pr-[54px] text-care-ink outline-none transition focus:border-care-blue-500 focus:ring-3 focus:ring-[rgba(67,143,189,0.18)] aria-[invalid=true]:border-care-error aria-[invalid=true]:bg-care-error-bg"
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent p-[3px] text-care-blue-700 focus-visible:outline-3 focus-visible:outline-[rgba(67,143,189,0.45)] focus-visible:outline-offset-2"
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
        >
          {visible ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.4 4.2 9.5 6.1a11.7 11.7 0 0 1-3.1 3.6M6.2 6.2C4.4 7.4 3.3 9 2.5 10.5 3.6 12.5 7 17 12 17c1.1 0 2.1-.2 3-.6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="m-0 text-[0.78rem] text-care-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default PasswordField;
