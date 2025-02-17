// ResetPassword.jsx
import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-emerald-700 text-center">
          Reset Password
        </h1>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              value={data.email}
              className="w-full mt-1"
              autoComplete="username"
              onChange={(e) => setData("email", e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              value={data.password}
              className="w-full mt-1"
              autoComplete="new-password"
              onChange={(e) => setData("password", e.target.value)}
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div>
            <InputLabel
              htmlFor="password_confirmation"
              value="Confirm Password"
            />
            <TextInput
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              className="w-full mt-1"
              autoComplete="new-password"
              onChange={(e) => setData("password_confirmation", e.target.value)}
            />
            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <PrimaryButton
            className="w-full justify-center"
            disabled={processing}
          >
            {processing ? "Resetting..." : "Reset Password"}
          </PrimaryButton>
        </form>
      </div>
    </GuestLayout>
  );
}
