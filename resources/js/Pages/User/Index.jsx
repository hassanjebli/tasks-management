import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
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
import FlashMessage from "@/Components/FlashMessage";

const Index = ({ users, queryParams = null, success }) => {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("users.index"), queryParams);
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

    router.get(route("users.index"), queryParams);
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

  return (
    <AuthenticatedLayout>
      <Head title="Users" />
      {success && <FlashMessage message={success} />}
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <Link
          href={route("users.create")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
        >
          <Plus size={18} /> New User
        </Link>
      </div>
      {/* Table */}
      <div className="overflow-x-auto p-6">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <SortableHeader fieldName="id">ID</SortableHeader>
              <SortableHeader fieldName="name">Name</SortableHeader>
              <SortableHeader fieldName="email">Email</SortableHeader>
              <SortableHeader fieldName="created_at">
                Create Date
              </SortableHeader>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
                Actions
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="User Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b">
              <TextInput
                  className="w-full"
                  defaultValue={queryParams.email}
                  placeholder="Email"
                  onBlur={(e) => searchFieldChanged("email", e.target.value)}
                  onKeyPress={(e) => onKeyPress("email", e)}
                />
              </th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
              <th className="px-6 py-3 text-left font-semibold tracking-wider border-b"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-800 text-sm">
            {users.data.length > 0 ? (
              users.data.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 font-medium">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={route("users.edit", user.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        aria-label="Edit user"
                      >
                        <Pencil size={16} />
                      </Link>
                      <Link
                        href={route("users.destroy", user.id)}
                        method="delete"
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete user"
                        onClick={() =>
                          confirm("are you sure you want to delete this user ?")
                        }
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
                    <p className="text-lg font-medium">No users found</p>
                    <p className="mt-1">
                      It seems empty here. Start by creating a new user.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <Pagination data={users.data} links={users.links} meta={users.meta} />
    </AuthenticatedLayout>
  );
};

export default Index;
