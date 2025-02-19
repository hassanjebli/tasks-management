import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { CalendarDays, UserCircle, Flag, NotebookPen, Folder } from "lucide-react";

const Show = ({ task }) => {
  return (
    <AuthenticatedLayout>
      <Head title={`Task ${task.name}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-50 overflow-hidden">
          {/* Task Header */}
          <div className="p-8 bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h1 className="text-3xl font-bold text-emerald-800 flex items-center gap-3">
                <Flag size={28} className="text-emerald-600" />
                {task.name}
              </h1>
              <div className="flex gap-3">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  task.status === "pending" ? "bg-amber-100 text-amber-700" :
                  task.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                  "bg-emerald-100 text-emerald-700"
                }`}>
                  {task.status.replace("_", " ").toUpperCase()}
                </span>
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  task.priority === "high" ? "bg-red-100 text-red-700" :
                  task.priority === "medium" ? "bg-amber-100 text-amber-700" :
                  "bg-emerald-100 text-emerald-700"
                }`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Task Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Added Image Section */}
              <div className="aspect-video bg-emerald-50 rounded-xl overflow-hidden border border-emerald-100">
                <img
                  src={task.image_path}
                  alt={task.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose max-w-none">
                <h3 className="text-emerald-700 flex items-center gap-2 mb-4">
                  <NotebookPen size={20} />
                  Task Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {task.description}
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
                    <dt className="text-sm text-emerald-500">Created Date</dt>
                    <dd className="font-medium text-emerald-800">
                      {new Date(task.created_at).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-emerald-500">Due Date</dt>
                    <dd className="font-medium text-emerald-800">
                      {new Date(task.due_date).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-emerald-700 flex items-center gap-2 mb-4">
                  <UserCircle size={20} />
                  Assigned To
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                    {task.assignedUser.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800">
                      {task.assignedUser.name}
                    </p>
                    <p className="text-sm text-emerald-600">
                      {task.assignedUser.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-emerald-700 flex items-center gap-2 mb-4">
                  <Folder size={20} />
                  Parent Project
                </h3>
                <Link 
                  href={route('projects.show', task.project.id)}
                  className="group block"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-emerald-800 group-hover:text-emerald-600 transition-colors">
                        {task.project.name}
                      </p>
                      <p className="text-sm text-emerald-600">
                        Due: {new Date(task.project.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      task.project.status === "pending" ? "bg-amber-100 text-amber-700" :
                      task.project.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      {task.project.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;