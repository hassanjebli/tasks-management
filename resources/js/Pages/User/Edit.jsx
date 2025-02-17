import React, { useEffect, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Edit = ({ user }) => {
  user = user.data;
  const { data, setData, put, errors, reset, processing } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
  });

  
  const onSubmit = (e) => {
    e.preventDefault();

    put(route("users.update", user.id));
  };

  const handleReset = () => {
    reset();
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit User" />
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div>
            <InputLabel htmlFor="name" value="User Name" />
            <TextInput
              id="name"
              type="text"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              onChange={(e) => setData("name", e.target.value)}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          {/* Email Input */}
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              onChange={(e) => setData("email", e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          {/* Password Input */}
          <div>
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              onChange={(e) => setData("password", e.target.value)}
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          {/* Password Confirmation Input */}
          <div>
            <InputLabel
              htmlFor="password_confirmation"
              value="Password confirmation"
            />
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              onChange={(e) => setData("password_confirmation", e.target.value)}
            />
            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors shadow-sm disabled:opacity-70"
            disabled={processing}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`px-6 py-3 text-white font-medium rounded-xl transition-colors shadow-sm ${
              processing
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
            disabled={processing}
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Update User"
            )}
          </button>
        </div>
      </form>
    </AuthenticatedLayout>
  );
};

export default Edit;
