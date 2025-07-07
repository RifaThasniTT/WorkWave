"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerCompany } from "@/lib/api/company/auth";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../../../public/logo.png";
import Image from "next/image";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [kycFile, setKycFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    kycFile: "",
  });

  const validateFields = () => {
    const newErrors: typeof errors = {
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      kycFile: "",
    };

    if (!companyName.trim()) newErrors.companyName = "Company name is required.";
    else if (!/^[a-zA-Z\s]{3,}$/.test(companyName)) {
      newErrors.companyName = "Only letters and spaces, at least 3 characters";
    }
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Must include a letter, number, and special character";
    }

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!kycFile) newErrors.kycFile = "Business license is required.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", companyName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("kyc", kycFile!);

      await registerCompany(formData);

      toast.success("Registered! Redirecting to OTP verification...");
      router.push(`/company/otp-verification?email=${encodeURIComponent(email)}`);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
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
        <div className="w-full max-w-md bg-white border rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold mb-6">Register Company</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="text-gray-600 text-sm">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#09B9FF]"
              />
              {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#09B9FF]"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-600 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#09B9FF]"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-600 text-sm">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#09B9FF]"
              />
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* KYC Upload */}
            <div>
              <label className="text-gray-600 text-sm">Upload Business License</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setKycFile(e.target.files?.[0] || null)}
                className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#09B9FF]"
              />
              {errors.kycFile && <p className="text-sm text-red-500 mt-1">{errors.kycFile}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#09B9FF] hover:bg-[#5BCDFA] text-white py-2 rounded-md transition duration-200 disabled:opacity-60"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have a company?{" "}
            <Link href="/company/login" className="text-[#09B9FF] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
