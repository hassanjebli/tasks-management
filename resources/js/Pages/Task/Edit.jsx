import React, { useEffect, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectInput from "@/Components/SelectInput";

const Edit = ({ task, projects, users }) => {
  const { data, setData, post, errors, reset, processing } = useForm({
    image: null,
    project_id: task.project_id || "",
    name: task.name || "",
    status: task.status || "",
    priority: task.priority || "",
    assigned_user_id: task.assigned_user_id || "",
    description: task.description || "",
    due_date: task.due_date || "",
    _method: "PUT",
  });

  console.log(data);

  const [previewImage, setPreviewImage] = useState(task.image_path || null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
    // Reset the file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("tasks.update", task.id), { forceFormData: true });
  };

  const handleReset = () => {
    reset();
    setPreviewImage(task.image_path || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Task" />
      <form
        onSubmit={onSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Image Upload */}
        {/* Image Upload - Modified */}
        <div>
          <InputLabel htmlFor="image" value="Task Image" />
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image" // Explicitly associate label with input
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-emerald-200 border-dashed rounded-2xl cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition-colors overflow-hidden relative group"
            >
              {(previewImage || task.image_path) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm z-10"
                  aria-label="Remove image"
                >
                  {/* Close button SVG remains same */}
                </button>
              )}

              <div className="relative w-full h-full">
                {(previewImage || task.image_path) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to change image
                    </span>
                  </div>
                )}

                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                ) : task.image_path ? (
                  <img
                    src={task.image_path}
                    alt="Current Task"
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {/* Upload SVG remains same */}
                  </div>
                )}
              </div>

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

        {/* Assigned Project */}
        <div>
          <InputLabel htmlFor="project_id" value="Project" />
          <SelectInput
            id="project_id"
            name="project_id"
            value={data.project_id}
            className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none appearance-none bg-emerald-50 mt-1"
            onChange={(e) => setData("project_id", e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.data.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </SelectInput>
          <InputError message={errors.project_id} className="mt-2" />
        </div>

        {/* Task Name */}
        <div>
          <InputLabel htmlFor="name" value="Task Name" />
          <TextInput
            id="name"
            placeholder="Task Name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            onChange={(e) => setData("name", e.target.value)}
          />
          <InputError message={errors.name} className="mt-2" />
        </div>

        {/* Status & Priority & Assigned User & Due Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <InputLabel htmlFor="status" value="Status" />
            <SelectInput
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
            </SelectInput>
            <InputError message={errors.status} className="mt-2" />
          </div>

          {/* Priority */}
          <div>
            <InputLabel htmlFor="priority" value="Priority" />
            <SelectInput
              id="priority"
              name="priority"
              value={data.priority}
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none appearance-none bg-emerald-50 mt-1"
              onChange={(e) => setData("priority", e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </SelectInput>
            <InputError message={errors.priority} className="mt-2" />
          </div>

          {/* Assigned User */}
          <div>
            <InputLabel htmlFor="assigned_user_id" value="Assigned User" />
            <SelectInput
              id="assigned_user_id"
              name="assigned_user_id"
              value={data.assigned_user_id}
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none appearance-none bg-emerald-50 mt-1"
              onChange={(e) => setData("assigned_user_id", e.target.value)}
            >
              <option value="">Select Assigned User</option>
              {users.data.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </SelectInput>
            <InputError message={errors.assigned_user_id} className="mt-2" />
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
            placeholder="Describe the task..."
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
              "Update Task"
            )}
          </button>
        </div>
      </form>
    </AuthenticatedLayout>
  );
};

export default Edit;
