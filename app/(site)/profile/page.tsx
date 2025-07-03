"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    

    const { token } = JSON.parse(session);

    fetch("/api/student/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setStudent(data.student);
        else router.push("/auth/signin");
      })
      .catch(() => router.push("/auth/signin"))
      .finally(() => setLoading(false));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("session");
    router.push("/auth/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-1 ">
        <p>Loading...</p>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-1 text-white">
      <header className="px-6 py-4 flex justify-between items-center border-b border-secondary-3">
        <h1 className="text-2xl font-bold text-secondary-3">Student Profile</h1>
        <button
          onClick={handleSignOut}
          className="text-secondary-3 border border-secondary-3 px-4 py-2 rounded hover:bg-secondary-2 transition-all"
        >
          Sign Out
        </button>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-secondary-3">👤 {student.fullName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
            <div>
              <p><span className="font-bold text-secondary-3">Email:</span><br />{student.email}</p>
              <p className="mt-4"><span className="font-bold text-secondary-3">Phone:</span><br />{student.phone}</p>
              <p className="mt-4"><span className="font-bold text-secondary-3">Department:</span><br />{student.department}</p>
              <p className="mt-4"><span className="font-bold text-secondary-3">Year:</span><br />{student.year}</p>
            </div>
            <div>
              <p><span className="font-bold text-secondary-3">Roll No:</span><br />{student.rollNumber}</p>
              <p className="mt-4"><span className="font-bold text-secondary-3">Role:</span><br />{student.role}</p>
              <p className="mt-4"><span className="font-bold text-secondary-3">Registered Events:</span><br />{student.registeredEvents.length}</p>
              <p className="mt-4"><span className="font-bold text-secondary-3">Bookmarked Events:</span><br />{student.bookMarkedEvents.length}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
