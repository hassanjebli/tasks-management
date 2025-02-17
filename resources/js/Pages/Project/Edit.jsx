import React, { useEffect, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Edit = ({ project }) => {
  const { data, setData, post, errors, reset, processing } = useForm({
    image: null,
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    _method: "PUT",
  });

  const [previewImage, setPreviewImage] = useState(project.image_path || null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setData("image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (
        typeof previewImage === "string" &&
        !previewImage.includes(project.image_path)
      ) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage, project.image_path]);

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("projects.update", project.id), {
      forceFormData: true,
    });
  };

  const handleReset = () => {
    reset();
    setPreviewImage(project.image_path || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Rest of your component remains the same...
  return (
    <AuthenticatedLayout>
      <Head title="Edit Project" />
      <form
        onSubmit={onSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Image Upload */}
        <div>
          <InputLabel htmlFor="image" value="Project Image" />
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-emerald-200 border-dashed rounded-2xl cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition-colors overflow-hidden relative group"
            >
              {(previewImage || project.image_path) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering file input when clicking remove
                    handleRemoveImage();
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm z-10"
                  aria-label="Remove image"
                >
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              {previewImage ? (
                <img
                  src={
                    typeof previewImage === "string"
                      ? previewImage
                      : URL.createObjectURL(previewImage)
                  }
                  alt="Preview"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              ) : project.image_path ? (
                <div className="relative w-full h-full">
                  <img
                    src={project.image_path}
                    alt="Current Project"
                    className="w-full h-full object-cover rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 rounded-lg transition-opacity duration-300 group-hover:opacity-0" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 text-emerald-500 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-emerald-600">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
              )}

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                id="image"
              />
            </label>
          </div>
          <InputError message={errors.image} className="mt-2" />
        </div>

        {/* Project Name */}
        <div>
          <InputLabel htmlFor="name" value="Project Name" />
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

        {/* Status & Due Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <InputLabel htmlFor="status" value="Status" />
            <select
              id="status"
              name="status"
              value={data.status}
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none appearance-none bg-emerald-50 mt-1"
              onChange={(e) => setData("status", e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <InputError message={errors.status} className="mt-2" />
          </div>

          {/* Due Date */}
          <div>
            <InputLabel htmlFor="due_date" value="Due Date" />
            <input
              id="due_date"
              type="date"
              name="due_date"
              value={data.due_date}
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-emerald-50 mt-1"
              onChange={(e) => setData("due_date", e.target.value)}
            />
            <InputError message={errors.due_date} className="mt-2" />
          </div>
        </div>

        {/* Description */}
        <div>
          <InputLabel htmlFor="description" value="Description" />
          <textarea
            id="description"
            name="description"
            rows="4"
            value={data.description}
            className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none mt-1"
            placeholder="Describe the project..."
            onChange={(e) => setData("description", e.target.value)}
          />
          <InputError message={errors.description} className="mt-2" />
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
              "Update Project"
            )}
          </button>
        </div>
      </form>
    </AuthenticatedLayout>
  );
};

export default Edit;
