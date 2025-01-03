import React from "react";

const AdminUsersPage = () => {
  const handleEdit = (userName) => {
    alert(`Edit user: ${userName}`);
  };

  const handleDelete = (userName) => {
    alert(`Delete user: ${userName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin Users Page
        </h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Role
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b text-gray-700">John Doe</td>
              <td className="py-2 px-4 border-b text-gray-700">john@example.com</td>
              <td className="py-2 px-4 border-b text-gray-700">Admin</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="mr-2 text-blue-600 hover:underline"
                  onClick={() => handleEdit("John Doe")}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete("John Doe")}
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-gray-700">Jane Smith</td>
              <td className="py-2 px-4 border-b text-gray-700">jane@example.com</td>
              <td className="py-2 px-4 border-b text-gray-700">User</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="mr-2 text-blue-600 hover:underline"
                  onClick={() => handleEdit("Jane Smith")}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete("Jane Smith")}
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-gray-700">Sam Wilson</td>
              <td className="py-2 px-4 border-b text-gray-700">sam@example.com</td>
              <td className="py-2 px-4 border-b text-gray-700">Editor</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="mr-2 text-blue-600 hover:underline"
                  onClick={() => handleEdit("Sam Wilson")}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete("Sam Wilson")}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => alert("Add User")}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default AdminUsersPage;
