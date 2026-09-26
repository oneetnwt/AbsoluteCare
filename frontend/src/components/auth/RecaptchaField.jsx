import ReCAPTCHA from "react-google-recaptcha";
import { CircleAlert } from "lucide-react";

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();

function RecaptchaField({
  error,
  onChange,
  onExpired,
  onErrored,
  recaptchaRef,
}) {
  return (
    <div className={`recaptcha ${error ? "recaptcha-error" : ""}`}>
      {recaptchaSiteKey ? (
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={recaptchaSiteKey}
          onChange={onChange}
          onExpired={onExpired}
          onErrored={onErrored}
        />
      ) : (
        <div className="recaptcha-config-error">
          <CircleAlert size={16} aria-hidden="true" />
          reCAPTCHA is not configured.
        </div>
      )}
      {error === "recaptcha" && (
        <span className="field-error" role="alert">
          Verify reCAPTCHA before continuing.
        </span>
      )}
      {error === "recaptcha-expired" && (
        <span className="field-error" role="alert">
          Your verification expired. Please try again.
        </span>
      )}
    </div>
  );
}

export default RecaptchaField;
