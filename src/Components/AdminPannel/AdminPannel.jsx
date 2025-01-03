import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";

const AdminUsersPage = () => {
  const [Data, setData] = useState([]);
  const [SingleUser,SetSingleUser] = useState({});
  const [DeleteDilog,setDeleteDilog] = useState(false)

  useEffect(() => {
    const GetData = async () => {
      const UsersData = await axios.get("http://localhost:3000/Data/UsersData");
      console.log(UsersData.data);
      setData(UsersData.data);
    };
    GetData();
  }, []);

  const GetSingleUser = (id) => {
    const FindSingleUser = Data.find((User)=>User._id == id)
    console.log(FindSingleUser);
    SetSingleUser(FindSingleUser)
    setDeleteDilog(true)
  }

  return (
    <>
     <Dialog open={DeleteDilog} onClose={() => setDeleteDilog(false)} className="flex justify-center items-center">
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Are you sure you want to delete {SingleUser.Username}?
          </h1>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteDilog(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin Users Page
        </h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-purple-400 to-blue-600 text-white">
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Password
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-700">{item.Username}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{item.Email}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{item.Password}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  <button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-md hover:opacity-75 focus:outline-none mr-2"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-500 to-red-600  focus:ring-red-600 focus:ring-offset-2 text-white px-4 py-2 rounded-md hover:opacity-75 focus:outline-none"
                  onClick={()=>GetSingleUser(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-md shadow-lg hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => console.log("Add User")}
        >
          Add User
        </button>
      </div>
    </div>
    </>
  );
};

export default AdminUsersPage;
