// Login.jsx
import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-emerald-600">
          {status}
        </div>
      )}

      <div className="space-y-6">
      <div className="text-center">
                <h1 className="text-3xl font-bold text-emerald-700 mb-2">Welcome Back</h1>
                <p className="text-emerald-600">Sign in to continue to your workspace</p>
            </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              value={data.email}
              className="w-full mt-1"
              autoComplete="username"
              isFocused={true}
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
              autoComplete="current-password"
              onChange={(e) => setData("password", e.target.value)}
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
              <span className="ml-2 text-sm text-emerald-600">Remember me</span>
            </label>

            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                Forgot password?
              </Link>
            )}
          </div>

          <PrimaryButton
            className="w-full justify-center"
            disabled={processing}
          >
            {processing ? "Signing In..." : "Sign In"}
          </PrimaryButton>

          <div className="text-center text-sm text-emerald-600">
            Not registered?{" "}
            <Link
              href={route("register")}
              className="font-semibold hover:text-emerald-700"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
