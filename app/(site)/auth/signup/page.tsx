"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState<"student" | "hoster">("student");
  const [formData, setFormData] = useState({
    fullName: "",
    organisation: "",
    description: "",
    email: "",
    password: "",
    phone: "",
    rollNumber: "",
    department: "",
    year: "",
    instagram: "",
  });

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
      const endpoint = role === "student" ? "/api/student/signup" : "/api/hoster/signup";

      const payload = role === "student"
        ? {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            rollNumber: formData.rollNumber,
            department: formData.department,
            year: Number(formData.year),
            role,
          }
        : {
            organisation: formData.organisation,
            description: formData.description,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            instagram: formData.instagram,
            role,
          };

      const res = await axios.post(endpoint, payload);

      if (res.data.success) {
        setSubmitted(true);
        setLoading(false);
        setTimeout(() => {
          router.push("/auth/signin");
        }, 1000);
      } else {
        setLoading(false);
        setError(res.data.message || "Signup failed");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Sign Up</h2>

      <div className="flex gap-6 mb-4 text-black">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={() => setRole("student")}
          />
          Student
        </label>
        <label className="flex items-center gap-2">
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Shared Fields */}
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
          required
        />

        {/* Student-specific */}
        {role === "student" && (
          <>
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
              required
            />
            <input
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
              required
            />
            <input
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
              required
            />
            <input
              name="year"
              placeholder="Year (e.g. 3)"
              type="number"
              value={formData.year}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
              required
            />
          </>
        )}

        {/* Hoster-specific */}
        {role === "hoster" && (
          <>
            <input
              name="organisation"
              placeholder="Organisation"
              value={formData.organisation}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
              required
            />
            <input
              name="instagram"
              placeholder="Instagram Handle"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
              required
            />
            <input
              name="description"
              placeholder="Short Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 rounded placeholder:text-black text-black"
            />
          </>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-60"
          type="submit"
          disabled={loading || submitted}
        >
          {submitted ? "Submitted ✅" : loading ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
