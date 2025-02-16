import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Pagination from "@/Components/Pagination";

const Index = ({ projects }) => {
  return (
    <AuthenticatedLayout>
      <Head title="Projects" />
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
              {[
                "ID",
                "Image",
                "Name",
                "Status",
                "Create Date",
                "Due Date",
                "Created By",
                "Actions",
              ].map((heading, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left font-semibold tracking-wider border-b"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-800 text-sm">
            {projects?.data.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4">{project.id}</td>
                <td className="px-6 py-4">
                  <img
                    src={project.image_path}
                    alt={project.name}
                    className="w-10 h-10 rounded-md border"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{project.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      project.status === "pending"
                        ? "text-yellow-700 bg-yellow-100"
                        : project.status === "in_progress"
                        ? "text-blue-700 bg-blue-100"
                        : "text-green-700 bg-green-100"
                    }`}
                  >
                    {project.status.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-nowrap">{project.created_at}</td>
                <td className="px-6 py-4 text-nowrap">{project.due_date}</td>
                <td className="px-6 py-4">{project.createdBy?.name}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={route("projects.edit", project.id)}
                    className="text-blue-500 hover:text-blue-700 px-2 inline-block"
                  >
                    <Pencil size={16} />
                  </Link>
                  <Link
                    href={route("projects.destroy", project.id)}
                    className="text-red-500 hover:text-red-700 px-2 inline-block"
                  >
                    <Trash2 size={16} />
                  </Link>
                </td>
              </tr>
            ))}
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
