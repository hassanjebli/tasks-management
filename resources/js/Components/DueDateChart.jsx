import React from "react";
import { Head, Link } from "@inertiajs/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ChartPie, Clock, ListChecks, ArrowRight } from "lucide-react";

// Add this new component for the due date chart
const DueDateChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-50">
        <div className="text-center text-gray-500 py-8">
          No due date data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-50 h-80">
      <h3 className="text-lg font-semibold text-emerald-900 mb-4">
        Tasks by Due Date
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis
            dataKey="due_date"
            tickFormatter={(date) => format(new Date(date), 'MMM dd')}
            stroke="#059669"
          />
          <YAxis stroke="#059669" />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #d1fae5',
              borderRadius: '8px'
            }}
            formatter={(value) => [value, 'Tasks']}
            labelFormatter={(label) => `Due: ${format(new Date(label), 'PPP')}`}
          />
          <Bar
            dataKey="count"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            name="Tasks"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function Dashboard({
  auth,
  myCompletedTasks,
  totalCompletedTasks,
  myInProgressTasks,
  totalInProgressTasks,
  myPendingTasks,
  totalPendingTasks,
  activeTasks,
  dueDateStats, // Add this new prop
}) {
  // ... keep existing statusStyles, priorityStyles, and StatCard component ...

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      
      {/* Dashboard Header */}
      <div className="mb-8 flex items-center justify-between">
        {/* ... existing header content ... */}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* ... existing stat cards ... */}
      </div>

      {/* New Due Date Chart */}
      <div className="mb-8">
        <DueDateChart data={dueDateStats} />
      </div>

      {/* Active Tasks Panel */}
      {/* ... existing table implementation ... */}
    </AuthenticatedLayout>
  );
}