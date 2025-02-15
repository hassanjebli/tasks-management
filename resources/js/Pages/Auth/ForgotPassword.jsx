// ForgotPassword.jsx
import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
  });

  useEffect(() => {
    return () => {
      reset("email");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-emerald-700 text-center">
          Forgot Password
        </h1>

        <p className="text-emerald-600 text-center mb-6">
          Enter your email to receive a password reset link
        </p>

        {status && (
          <div className="mb-4 text-sm font-medium text-emerald-600">
            {status}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              value={data.email}
              className="w-full mt-1"
              autoComplete="email"
              isFocused={true}
              onChange={(e) => setData("email", e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <PrimaryButton
            className="w-full justify-center"
            disabled={processing}
          >
            {processing ? "Sending Link..." : "Email Password Reset Link"}
          </PrimaryButton>
        </form>
      </div>
    </GuestLayout>
  );
}
