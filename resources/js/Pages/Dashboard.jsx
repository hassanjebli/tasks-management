import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth }) {
  console.log(auth.user);
  return (
    <AuthenticatedLayout>
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
