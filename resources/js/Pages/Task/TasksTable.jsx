import Pagination from "@/Components/Pagination";
import React from "react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { Link, router, usePage } from "@inertiajs/react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  FolderOpen,
  Pencil,
  Trash2,
} from "lucide-react";

const TasksTable = ({
  tasks,
  queryParams = null,
  hideProjectColumn = false,
  projectId = null,
}) => {
  queryParams = queryParams || {};
  const currentRoute = usePage().url;
  
  // Determine if we're in project context
  const isProjectContext = projectId !== null || currentRoute.includes('/projects/');
  
  // Extract project ID from URL if not provided but we're in a project route
  if (!projectId && isProjectContext) {
    const urlParts = currentRoute.split('/');
    const projectIndex = urlParts.indexOf('projects');
    if (projectIndex !== -1 && urlParts.length > projectIndex + 1) {
      projectId = urlParts[projectIndex + 1];
    }
  }

  const getRouteForSearch = () => {
    if (isProjectContext && projectId) {
      return route("projects.show", projectId);
    }
    return route("tasks.index");
  };

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(getRouteForSearch(), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
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

    router.get(getRouteForSearch(), queryParams);
  };

  return (
    <>
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
              {!isProjectContext && (
                <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
                  Project Name
                </th>
              )}
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
                  placeholder="Task name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              {!isProjectContext && (
                <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
              )}
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
            {tasks.data.length > 0 ? (
              tasks.data.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">{task.id}</td>
                  <td className="px-6 py-4">
                    <img
                      src={task.image_path}
                      alt={task.name}
                      className="w-10 h-10 rounded-md border object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{task.name}</td>
                  {!isProjectContext && (
                    <td className="px-6 py-4 font-medium">
                      <Link 
                        href={route("projects.show", task.project.id)} 
                        className="text-blue-600 hover:underline"
                      >
                        {task.project.name}
                      </Link>
                    </td>
                  )}
                  <td className="px-6 py-4 text-nowrap">
                    <span
                      className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize ${
                        task.status === "pending"
                          ? "text-yellow-800 bg-yellow-100"
                          : task.status === "in_progress"
                          ? "text-blue-800 bg-blue-100"
                          : "text-green-800 bg-green-100"
                      }`}
                    >
                      {task.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">{task.createdBy?.name || "N/A"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={route("tasks.edit", task.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        aria-label="Edit task"
                      >
                        <Pencil size={16} />
                      </Link>
                      <Link
                        href={route("tasks.destroy", task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete task"
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
                  colSpan={isProjectContext ? "7" : "8"}
                  className="px-6 py-24 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <FolderOpen size={40} className="text-gray-400 mb-4" />
                    <p className="text-lg font-medium">No tasks found</p>
                    <p className="mt-1">
                      It seems empty here. Start by creating a new task.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <Pagination data={tasks.data} links={tasks.links} meta={tasks.meta} />
    </>
  );
};

export default TasksTable;
