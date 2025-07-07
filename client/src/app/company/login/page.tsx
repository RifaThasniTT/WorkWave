"use client";
import Link from "next/link";
// import { FcGoogle } from "react-icons/fc";
import Logo from "../../../../public/logo.png"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { login } from "@/lib/api/company/auth";

export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  }

  const validateFields = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format!";
      valid = false;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter, one number, and one special character!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const result = await login(formData);

      localStorage.setItem("companyAccessToken", result.data.accessToken);
      
      router.replace("/company/dashboard");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <Image src={Logo} alt="WorkWave" height={50} width={180}/>
        <nav className="hidden md:flex space-x-8 text-sm font-light text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/jobs">Find Jobs</Link>
        </nav>
      </header>

      {/* Login Box */}
      <main className="w-full flex justify-center items-center flex-1">
        <div className="w-full max-w-md bg-white border rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-2">Company Login</h2>
          <p className="text-sm text-gray-500 mb-6">Welcome Back! Please Enter Your Company Details</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#09B9FF]"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <label className="text-gray-600 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#09B9FF]"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div className="text-right text-xs text-gray-500">
              <Link href="/forgot-password">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#09B9FF] hover:bg-blue-[#5BCDFA] text-white py-2 rounded-md transition duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider
          <div className="my-4 border-t border-gray-200"></div> */}

          {/* Google Button
          <button className="w-full flex items-center justify-center border rounded-md py-2 text-sm font-medium hover:bg-gray-50 transition">
            <FcGoogle className="mr-2 text-lg" />
            Continue with Google
          </button> */}

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Haven&apos;t registered one yet?{" "}
            <Link href="/company/signup" className="text-blue-500 hover:underline">
              Register Company
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
