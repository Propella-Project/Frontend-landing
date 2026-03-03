import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RocketLogo } from "@/App";
import { verifyEmail, resendCode } from "@/lib/api";

interface VerificationPageProps {
  email: string;
  onVerified: () => void;
}

export function VerificationPage({ email, onVerified }: VerificationPageProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

 const handleChange = (index: number, value: string) => {
   // Allow only a single digit
   if (value && !/^\d$/.test(value)) return;

   const newCode = [...code];
   newCode[index] = value; // No need for toUpperCase()
   setCode(newCode);
   setError("");

   if (value && index < 5) {
     inputRefs.current[index + 1]?.focus();
   }
 };
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

const handlePaste = (e: React.ClipboardEvent) => {
  e.preventDefault();
  const pasted = e.clipboardData
    .getData("text")
    .replace(/\D/g, "") // remove non-digits
    .slice(0, 6);

  const newCode = pasted.split("").concat(Array(6 - pasted.length).fill(""));
  setCode(newCode);

  const lastFilledIndex = newCode.findIndex((c) => !c);
  const focusIndex = lastFilledIndex === -1 ? 5 : Math.max(0, lastFilledIndex);
  inputRefs.current[focusIndex]?.focus();
};

  const handleVerify = async () => {
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const result = await verifyEmail({
        email: email,
        code: fullCode,
      });

      if (result.success) {
        toast.success("Email verified successfully!");
        onVerified();
      } else {
        setError(
          result.error || "Invalid verification code. Please try again.",
        );
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      const result = await resendCode(email);

      if (result.success) {
        toast.success("New verification code sent!");
      } else {
        toast.error(result.error || "Failed to resend code");
      }
    } catch (err) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">Back to home</span>
        </button>

        {/* Card */}
        <div className="bg-[#1A1625] rounded-2xl border border-white/10 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <RocketLogo className="w-16 h-16" aria-label="Rocket Logo" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            We've sent a 6-digit verification code to{" "}
            <span className="text-white font-medium">{email}</span>
          </p>

          {/* Code Inputs - Fixed with proper labeling */}
          <div
            className="flex justify-center gap-2 mb-6"
            role="group"
            aria-labelledby="verification-code-label"
          >
            <span id="verification-code-label" className="sr-only">
              Enter 6-digit verification code
            </span>
            {code.map((digit, index) => (
              <div key={index} className="relative">
                <label htmlFor={`code-${index}`} className="sr-only">
                  Digit {index + 1} of verification code
                </label>
                <input
                  id={`code-${index}`}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-bold bg-[#0F0C15] border-2 border-white/10 rounded-xl focus:border-[#8B5CF6] focus:outline-none transition-colors uppercase"
                  aria-label={`Digit ${index + 1}`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "code-error" : undefined}
                  autoComplete="one-time-code"
                />
              </div>
            ))}
          </div>

          {/* Error message with proper ARIA attributes */}
          {error && (
            <motion.p
              id="code-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#EF4444] text-sm text-center mb-4"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </motion.p>
          )}

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={isVerifying || code.join("").length !== 6}
            className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:from-[#7C3AED] hover:to-[#8B5CF6] text-white font-semibold rounded-xl disabled:opacity-50"
            aria-label="Verify email code"
          >
            {isVerifying ? (
              <>
                <Loader2
                  className="w-4 h-4 mr-2 animate-spin"
                  aria-hidden="true"
                />
                <span>Verifying...</span>
              </>
            ) : (
              "Verify Email"
            )}
          </Button>

          {/* Resend Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-sm text-[#8B5CF6] hover:text-[#A78BFA] transition-colors disabled:opacity-50"
              aria-label="Resend verification code"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          </div>

          {/* Demo Hint */}
          {import.meta.env.DEV && (
            <div className="mt-6 p-4 bg-[#0F0C15] rounded-xl">
              <p className="text-xs text-gray-500 text-center">
                <span className="text-[#CCFF00]">Demo:</span> Check your browser
                console or resend to see the code
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
