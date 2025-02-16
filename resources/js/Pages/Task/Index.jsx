import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import { Plus, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

import TasksTable from "./TasksTable";

const Index = ({ tasks, queryParams = null }) => {

  return (
    <AuthenticatedLayout>
      <Head title="tasks" />
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
        <Link
          href={route("tasks.create")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
        >
          <Plus size={18} /> New task
        </Link>
      </div>
      <TasksTable tasks={tasks} queryParams={queryParams} hideProjectColumn={true}/>
    </AuthenticatedLayout>
  );
};

export default Index;
