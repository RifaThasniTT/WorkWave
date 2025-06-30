"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/logo.png";
import { verifyOtp, resendOtp } from "@/lib/api/user/auth";
import { toast } from "sonner";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(59);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    try {
      console.log('asd');
      setLoading(true);
      const data = { email: email as string, otp };
      await verifyOtp(data);
      toast.success("OTP verified successfully. Redirecting to login...");
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch (err: any) {
      console.log(err)
      toast.error(err?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      setError("");
      setMessage("");
      await resendOtp({ email });
      toast.success("OTP resent to your email.");
      setSeconds(59);
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <Image src={Logo} alt="WorkWave" height={50} width={180} />
        <nav className="hidden md:flex space-x-8 text-sm font-light text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/jobs">Find Jobs</Link>
        </nav>
      </header>

      {/* OTP Box */}
      <main className="w-full flex justify-center items-center flex-1">
        <div className="w-full max-w-md bg-white border rounded-xl shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">OTP VERIFICATION</h2>
          <p className="text-sm text-gray-600 mb-8">
            We have sent an OTP to your email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <input
              type="text"
              placeholder="Enter Your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
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
                <span className="text-gray-400 cursor-not-allowed">
                  Resend OTP
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#09B9FF] hover:bg-[#5BCDFA] text-white py-2 rounded-md transition duration-200"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p className="text-[11px] text-gray-500 mt-6">
            By creating an account, you agree with our{" "}
            <Link href="#" className="text-[#09B9FF] underline">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#09B9FF] underline">
              Privacy Statement
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
