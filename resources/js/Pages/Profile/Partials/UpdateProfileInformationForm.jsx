// UpdateProfileInformationForm.jsx
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function UpdateProfileInformationForm({ user, className = "" }) {
  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      avatar: null,
    });

  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"), {
      preserveScroll: true,
    });
  };

  return (
    <section>
      <Head title="Profile Information" />

      <div className="flex items-center gap-6 mb-8">
        <div className="relative group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase() ||
                "U"}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-emerald-800">{user.name}</h2>
          <p className="text-emerald-600">
            Task Manager since {new Date(user.created_at).getFullYear()}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputLabel value="Full Name" />
            <TextInput
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="w-full"
              placeholder="John Doe"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div>
            <InputLabel value="Email Address" />
            <TextInput
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="w-full"
              placeholder="john@taskflow.com"
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          {recentlySuccessful && (
            <div className="text-sm text-emerald-600">Profile updated!</div>
          )}
          <PrimaryButton disabled={processing}>
            {processing ? "Saving..." : "Update Profile"}
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
}
