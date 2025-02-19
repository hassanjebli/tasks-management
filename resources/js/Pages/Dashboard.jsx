import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ChartPie, Clock, ListChecks, ArrowRight } from "lucide-react";

export default function Dashboard({
  auth,
  myCompletedTasks,
  totalCompletedTasks,
  myInProgressTasks,
  totalInProgressTasks,
  myPendingTasks,
  totalPendingTasks,
  activeTasks,
}) {
  const statusStyles = {
    pending: "text-yellow-800 bg-yellow-100",
    in_progress: "text-blue-800 bg-blue-100",
    completed: "text-green-800 bg-green-100",
  };

  const priorityStyles = {
    low: "text-green-600 bg-green-50",
    medium: "text-amber-600 bg-amber-50",
    high: "text-rose-600 bg-rose-50",
  };

  const StatCard = ({ icon: Icon, title, myValue, totalValue, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-50">
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-3xl font-bold text-${color}-600 mb-2`}>
            <span className="text-emerald-800">{myValue}</span>
            <span className="mx-1 text-gray-400">/</span>
            <span className="text-gray-600">{totalValue}</span>
          </div>
          <div className="text-sm font-medium text-gray-500">{title}</div>
        </div>
        <div className={`bg-${color}-100 p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      {/* Dashboard Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">
            Welcome back, {auth.user.name}!
          </h1>
          <p className="text-sm text-emerald-600 mt-1">
            Here's your daily performance overview
          </p>
        </div>
        <Link
          href={route("tasks.index")}
          className="flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
        >
          View All Tasks
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={ListChecks}
          title="Tasks in Progress"
          myValue={myInProgressTasks}
          totalValue={totalInProgressTasks}
          color="blue"
        />
        <StatCard
          icon={Clock}
          title="Pending Tasks"
          myValue={myPendingTasks}
          totalValue={totalPendingTasks}
          color="yellow"
        />
        <StatCard
          icon={ChartPie}
          title="Completed Tasks"
          myValue={myCompletedTasks}
          totalValue={totalCompletedTasks}
          color="green"
        />
      </div>
      {/* Active Tasks Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-50">
        <div className="px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-emerald-900">
            Active Tasks
          </h3>
          <span className="text-sm text-emerald-600">
            Last Updated: {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                {[
                  "Task Name",
                  "Due Date",
                  "Status",
                  "Priority",
                  "Project",
                  "Assignee",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-emerald-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-100">
              {activeTasks.data.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <ListChecks className="w-12 h-12 text-emerald-200 mb-4" />
                      No active tasks found. Enjoy your day!
                    </div>
                  </td>
                </tr>
              ) : (
                activeTasks.data.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-emerald-50 transition-colors cursor-pointer"
                    onClick={() =>
                      (window.location.href = route("tasks.show", task.id))
                    }
                  >
                    <td className="px-6 py-4 text-sm font-medium text-emerald-900">
                      {task.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(task.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[task.status]
                        }`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                          priorityStyles[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {task.project?.name || (
                        <span className="text-gray-400">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {task.assignedUser?.name || (
                        <span className="text-rose-500">Unassigned</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
