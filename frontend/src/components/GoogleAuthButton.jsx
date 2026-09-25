function GoogleAuthButton() {
  return (
    <button
      className="flex min-h-[50px] items-center justify-center gap-2.5 rounded-lg border border-care-line bg-white font-bold text-care-ink transition hover:border-care-blue-500 hover:bg-[#f8fcfe] disabled:cursor-wait disabled:opacity-65"
      type="button"
      onClick={() => {}}
    >
      <svg className="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"
        />
        <path
          fill="#34A853"
          d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
        />
        <path
          fill="#FBBC05"
          d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.1-1.09.31-1.59V7.88H3.3A9.5 9.5 0 0 0 2.5 12c0 1.48.35 2.88.8 4.12l3.24-2.53Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38Z"
        />
      </svg>
      Continue with Google
    </button>
  );
}

export default GoogleAuthButton;
