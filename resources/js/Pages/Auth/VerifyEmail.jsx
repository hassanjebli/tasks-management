// VerifyEmail.jsx
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />

      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold text-emerald-700">
          Verify Your Email
        </h1>

        <p className="text-emerald-600">
          {status === "verification-link-sent"
            ? "A new verification link has been sent to your email address."
            : "A verification link has been sent to your email address."}
        </p>

        <div className="flex items-center justify-center mt-4">
          <PrimaryButton onClick={submit} disabled={processing}>
            {processing ? "Sending..." : "Resend Verification Email"}
          </PrimaryButton>
        </div>
      </div>
    </GuestLayout>
  );
}
