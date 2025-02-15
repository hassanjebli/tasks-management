// Register.jsx
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("register"));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <div className="">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-700">
            Get Started
          </h1>
          <p className="text-emerald-600">Create your professional account</p>
        </div>

        <form onSubmit={submit} className="space-y-1">
          <div>
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              value={data.name}
              className="w-full mt-1"
              autoComplete="name"
              isFocused={true}
              onChange={(e) => setData("name", e.target.value)}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

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
            {processing ? "Registering..." : "Register"}
          </PrimaryButton>

          <div className="text-center text-sm text-emerald-600">
            Already registered?{" "}
            <Link
              href={route("login")}
              className="font-semibold hover:text-emerald-700"
            >
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
