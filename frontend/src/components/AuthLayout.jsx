function AuthLayout({ onNavigate, children }) {
  return (
    <div className="grid min-h-svh overflow-hidden md:grid-cols-[minmax(320px,0.92fr)_minmax(440px,1.08fr)]">
      <aside className="relative isolate flex min-h-[280px] flex-col justify-between overflow-hidden bg-care-green-900 p-6 text-[#f5fbf8] before:absolute before:-bottom-[120px] before:-right-[220px] before:z-[-1] before:h-[520px] before:w-[520px] before:rounded-full before:border before:border-[rgba(180,227,207,0.2)] before:content-[''] after:absolute after:-left-[150px] after:top-[30%] after:z-[-1] after:h-[260px] after:w-[260px] after:rounded-full after:border after:border-[rgba(180,227,207,0.2)] after:content-[''] md:min-h-0 md:p-[clamp(32px,5vw,72px)]">
        <button
          className="flex w-fit items-center gap-3 border-0 bg-transparent p-0 font-display text-[1.05rem] font-extrabold tracking-[-0.02em]"
          type="button"
          onClick={() => onNavigate("home")}
          aria-label="Go to AbsoluteCare home"
        >
          <span
            className="grid size-[34px] place-items-center rounded-[10px] bg-[#bce5d3] text-care-green-900"
            aria-hidden="true"
          >
            <svg
              className="size-5 fill-none stroke-current stroke-[2.4]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          AbsoluteCare
        </button>
        <div className="my-auto max-w-[450px] pt-11 md:pt-0">
          <p className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#a6d6c0] md:mb-5">
            Physical therapy, made personal
          </p>
          <h1 className="mb-3 max-w-[440px] font-display text-[2.25rem] font-extrabold leading-[1.04] tracking-[-0.055em] md:mb-[22px] md:text-[clamp(2.3rem,4vw,4.1rem)]">
            Move better. Feel stronger.
          </h1>
          <p className="max-w-[390px] text-[1.04rem] leading-[1.7] text-[#c4ddd3] max-md:hidden">
            One simple place to connect with your care team, manage
            appointments, and keep your recovery moving forward.
          </p>
        </div>
        <p className="text-[0.84rem] text-[#8fb9aa] max-md:hidden">
          Trusted care, thoughtfully coordinated.
        </p>
      </aside>
      <main
        className="flex min-h-[calc(100svh-280px)] items-start justify-center bg-white px-6 py-[38px] md:min-h-0 md:items-center md:px-[clamp(24px,7vw,104px)] md:py-12"
        aria-labelledby="auth-title"
      >
        <div className="w-full max-w-[430px]">{children}</div>
      </main>
    </div>
  );
}

export default AuthLayout;
