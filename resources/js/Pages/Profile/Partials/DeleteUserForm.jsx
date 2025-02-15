// DeleteUserForm.jsx
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";

export default function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    errors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    setData("password", "");
  };

  return (
    <section className={`bg-white rounded-2xl shadow-sm p-8 ${className}`}>
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-100 rounded-xl">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-red-800">Danger Zone</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Once your account is deleted, all of your tasks and data will be
        permanently removed. Please enter your password to confirm you would
        like to permanently delete your account.
      </p>

      <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Are you sure you want to delete your account?
          </h2>

          <div className="mb-6">
            <InputLabel value="Password" />
            <TextInput
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="w-full"
              placeholder="Enter your password to confirm"
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <DangerButton disabled={processing}>
              {processing ? "Deleting..." : "Delete Account"}
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}
