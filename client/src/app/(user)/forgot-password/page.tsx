"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/logo.png";
import { verifyOtp, resendOtp, resetPassword } from "@/lib/api/user/auth";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seconds, setSeconds] = useState(59);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    if (step === "otp" && seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds, step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!email.trim()) {
      return setErrors({ email: "Email is required" });
    }

    try {
      setLoading(true);
      await resendOtp({ email });
      toast.success("OTP sent to your email");
      setStep("otp");
      setSeconds(59);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!otp.trim()) {
      return setErrors({ otp: "OTP is required" });
    }

    try {
      setLoading(true);
      await verifyOtp({ email, otp });
      toast.success("OTP verified");
      setStep("reset");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: typeof errors = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordRegex.test(newPassword)) {
        newErrors.newPassword =
          "Password must be at least 6 characters and include one letter, one number, and one special character.";
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await resetPassword({ email, password: newPassword });
      toast.success("Password reset successfully");
      router.replace("/login");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await resendOtp({ email });
      toast.success("OTP resent to your email.");
      setSeconds(59);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4">
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <Image src={Logo} alt="WorkWave" height={50} width={180} />
        <nav className="hidden md:flex space-x-8 text-sm font-light text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/jobs">Find Jobs</Link>
        </nav>
      </header>

      <main className="w-full flex justify-center items-center flex-1">
        <div className="w-full max-w-md bg-white border rounded-xl shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-8">
            {step === "email"
              ? "Forgot Password"
              : step === "otp"
              ? "OTP Verification"
              : "Reset Password"}
          </h2>
          <p className="text-md font-light mb-8">
            {step === "email"
              ? "We'll send an OTP to your email address."
              : step === "otp"
              ? "We have sent an OTP to your email"
              : "Enter a new strong password"}
          </p>

          {/* Step: Email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
              <button
                type="submit"
                className="w-full bg-[#09B9FF] hover:bg-[#5BCDFA] text-white py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step: OTP */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4 text-left">
              <input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
              {errors.otp && (
                <p className="text-red-500 text-xs">{errors.otp}</p>
              )}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="font-mono">
                  {`00:${seconds.toString().padStart(2, "0")}`}
                </span>
                {seconds === 0 ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-blue-500 hover:underline"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-400">Resend OTP</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#09B9FF] hover:bg-[#5BCDFA] text-white py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* Step: Reset Password */}
          {step === "reset" && (
            <form onSubmit={handlePasswordReset} className="space-y-4 text-left">
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs">{errors.newPassword}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#09B9FF] hover:bg-[#5BCDFA] text-white py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
