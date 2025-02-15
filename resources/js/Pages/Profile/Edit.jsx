// Edit.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function Edit({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      auth={auth}
      header={
        <h1 className="text-2xl font-semibold text-emerald-800">
          Account Settings
        </h1>
      }
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <UpdateProfileInformationForm user={auth.user} />
            <UpdatePasswordForm />
            <DeleteUserForm />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

const StatCard = ({ label, value, icon, color = "text-emerald-800" }) => (
  <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-4">
    <span className={`text-2xl ${color}`}>{icon}</span>
    <div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-emerald-600">{label}</div>
    </div>
  </div>
);
