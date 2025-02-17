// ConfirmPassword.jsx
import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"));
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-emerald-700 text-center">
          Confirm Password
        </h1>

        <p className="text-emerald-600 text-center mb-6">
          This is a secure area of the application. Please confirm your password
          before continuing.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              value={data.password}
              className="w-full mt-1"
              autoComplete="current-password"
              onChange={(e) => setData("password", e.target.value)}
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          <PrimaryButton
            className="w-full justify-center"
            disabled={processing}
          >
            {processing ? "Processing..." : "Confirm Password"}
          </PrimaryButton>
        </form>
      </div>
    </GuestLayout>
  );
}
