// UpdatePasswordForm.jsx
import React from "react";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function UpdatePasswordForm({ className = "" }) {
  const { data, setData, put, errors, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const submit = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => setData({}),
    });
  };

  const getPasswordStrength = () => {
    if (!data.password) return 0;
    const strength = Math.min(data.password.length * 3, 100);
    return Math.max(strength, 20);
  };

  return (
    <section className={`bg-white rounded-2xl shadow-sm p-8 ${className}`}>
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-100 rounded-xl">
          <svg
            className="w-6 h-6 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-emerald-800">
          Password & Security
        </h3>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <div>
          <InputLabel value="Current Password" />
          <TextInput
            type="password"
            value={data.current_password}
            onChange={(e) => setData("current_password", e.target.value)}
            className="w-full"
          />
          <InputError message={errors.current_password} className="mt-2" />
        </div>

        <div>
          <InputLabel value="New Password" />
          <TextInput
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            className="w-full"
          />
          <div className="mt-2 h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${getPasswordStrength()}%` }}
            />
          </div>
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <InputLabel value="Confirm New Password" />
          <TextInput
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            className="w-full"
          />
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end gap-4">
          {recentlySuccessful && (
            <div className="text-sm text-emerald-600">Password updated!</div>
          )}
          <PrimaryButton disabled={processing}>
            {processing ? "Updating..." : "Change Password"}
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
}
