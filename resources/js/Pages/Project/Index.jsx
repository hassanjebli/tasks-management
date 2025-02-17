import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import FlashMessage from "@/Components/FlashMessage";

const Index = ({ projects, queryParams = null, success }) => {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("projects.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("projects.index"), queryParams);
  };

  const SortIndicator = ({ fieldName }) => {
    if (queryParams.sort_field !== fieldName) {
      return (
        <ArrowUpDown size={16} className="ml-1 inline-block text-gray-400" />
      );
    }
    return queryParams.sort_direction === "asc" ? (
      <ArrowUp size={16} className="ml-1 inline-block text-gray-700" />
    ) : (
      <ArrowDown size={16} className="ml-1 inline-block text-gray-700" />
    );
  };

  const SortableHeader = ({ fieldName, children }) => (
    <th
      onClick={() => sortChanged(fieldName)}
      className="px-6 py-3 text-left font-semibold tracking-wider border-b cursor-pointer hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIndicator fieldName={fieldName} />
      </div>
    </th>
  );

  const [showFlash, setShowFlash] = useState(!!success);

  return (
    <AuthenticatedLayout>
      <Head title="Projects" />
      {showFlash && success && (
        <FlashMessage message={success} onClose={() => setShowFlash(false)} />
      )}
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
        <Link
          href={route("projects.create")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
        >
          <Plus size={18} /> New Project
        </Link>
      </div>
      {/* Table */}
      <div className="overflow-x-auto p-6">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <SortableHeader fieldName="id">ID</SortableHeader>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
                Image
              </th>
              <SortableHeader fieldName="name">Name</SortableHeader>
              <SortableHeader fieldName="status">Status</SortableHeader>
              <SortableHeader fieldName="created_at">
                Create Date
              </SortableHeader>
              <SortableHeader fieldName="due_date">Due Date</SortableHeader>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
                Created By
              </th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
                Actions
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Project Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
                <SelectInput
                  defaultValue={queryParams.status}
                  className="w-full"
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-800 text-sm">
            {projects.data.length > 0 ? (
              projects.data.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-4">{project.id}</td>
                  <td className="px-6 py-4">
                    <img
                      src={project.image_path}
                      alt={project.name}
                      className="w-10 h-10 rounded-md border object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium hover:underline">
                    <Link href={route("projects.show", project.id)}>
                      {project.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize ${
                        project.status === "pending"
                          ? "text-yellow-800 bg-yellow-100"
                          : project.status === "in_progress"
                          ? "text-blue-800 bg-blue-100"
                          : "text-green-800 bg-green-100"
                      }`}
                    >
                      {project.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.due_date
                      ? new Date(project.due_date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {project.createdBy?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={route("projects.edit", project.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        aria-label="Edit project"
                      >
                        <Pencil size={16} />
                      </Link>
                      <Link
                        href={route("projects.destroy", project.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete project"
                      >
                        <Trash2 size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-24 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <FolderOpen size={40} className="text-gray-400 mb-4" />
                    <p className="text-lg font-medium">No projects found</p>
                    <p className="mt-1">
                      It seems empty here. Start by creating a new project.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <Pagination
        data={projects.data}
        links={projects.links}
        meta={projects.meta}
      />
    </AuthenticatedLayout>
  );
};

export default Index;
