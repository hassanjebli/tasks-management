import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// Stat card component for better reusability
const StatCard = ({ value, label }) => (
  <div className="bg-emerald-50 p-6 rounded-xl">
    <div className="text-2xl font-bold text-emerald-700">{value}</div>
    <div className="text-sm text-emerald-600">{label}</div>
  </div>
);

const statsData = [
  { value: "12", label: "Active Tasks" },
  { value: "3", label: "Projects" },
  { value: "89%", label: "Productivity" },
  { value: "2", label: "Upcoming Meetings" },
];

export default function Dashboard({ auth }) {
  console.log(auth.user);
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Dashboard" />

      {/* Dashboard Content */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-emerald-800">
          Welcome back, {auth.user.name}!
        </h1>
      </div>
    </AuthenticatedLayout>
  );
}
