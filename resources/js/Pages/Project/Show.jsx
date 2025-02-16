import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { CalendarDays, UserCircle, Flag, NotebookPen } from "lucide-react";
import TasksTable from "../Task/TasksTable";

const Show = ({ project, tasks, queryParams }) => {
  return (
    <AuthenticatedLayout>
      <Head title={`Project ${project.name}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-50 overflow-hidden">
          {/* Project Header */}
          <div className="p-8 bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-100">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-emerald-800 flex items-center gap-3">
                <NotebookPen size={28} className="text-emerald-600" />
                {project.name}
              </h1>
              <span
                className={`px-4 py-2 text-sm font-medium rounded-full text-nowrap ${
                  project.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : project.status === "in_progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {project.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
          </div>

          {/* Project Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="aspect-video bg-emerald-50 rounded-xl overflow-hidden border border-emerald-100">
                <img
                  src={project.image_path}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose max-w-none">
                <h3 className="text-emerald-700 flex items-center gap-2 mb-4">
                  <Flag size={20} />
                  Project Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-emerald-700 flex items-center gap-2 mb-4">
                  <CalendarDays size={20} />
                  Timeline
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-emerald-500">Start Date</dt>
                    <dd className="font-medium text-emerald-800">
                      {new Date(project.created_at).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-emerald-500">Due Date</dt>
                    <dd className="font-medium text-emerald-800">
                      {new Date(project.due_date).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-emerald-700 flex items-center gap-2 mb-4">
                  <UserCircle size={20} />
                  Project Lead
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                    {project.createdBy.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800">
                      {project.createdBy.name}
                    </p>
                    <p className="text-sm text-emerald-600">
                      {project.createdBy.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TasksTable tasks={tasks} queryParams={queryParams} />
    </AuthenticatedLayout>
  );
};

export default Show;
