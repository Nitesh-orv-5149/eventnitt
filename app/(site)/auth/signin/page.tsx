"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState<"student" | "hoster">("student");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const endpoint = role === "student" ? "/api/student/signin" : "/api/hoster/signin";
      const res = await axios.post(endpoint, formData);
  
      if (res.data.success) {
        const session = res.data.session;
        localStorage.setItem("session", JSON.stringify(session));
        setSubmitted(true);
        setLoading(false);
  
        // ⏭️ Role-based redirect
        setTimeout(() => {
          if (session.user.role === "hoster") {
            router.push("/hoster/dashboard");
          } else {
            router.push("/profile");
          }
        }, 1000);
      } else {
        setLoading(false);
        setError(res.data.message || "Signin failed");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };  

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role selection */}
        <div className="flex gap-4 mb-2 text-black">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            Student
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="hoster"
              checked={role === "hoster"}
              onChange={() => setRole("hoster")}
            />
            Hoster
          </label>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-60"
            disabled={loading || submitted}
        >
            {submitted ? "Signed In ✅" : loading ? "Submitting..." : "Sign In"}
        </button>

      </form>

      <div className="flex justify-center items-center mt-4">
        <h3 className="text-sm text-gray-900">
          New here? <Link href="/auth/signup" className="underline">Sign up</Link>
        </h3>
      </div>
    </div>
  );
}
