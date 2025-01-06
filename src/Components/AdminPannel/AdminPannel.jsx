import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";

const AdminUsersPage = () => {
  const [Data, setData] = useState([]);
  const [SingleUser,SetSingleUser] = useState({});
  const [DeleteDilog,setDeleteDilog] = useState(false)
  const [UpdateDilog,setUpdateDilog] = useState(false)

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

  const GetUser = (id) => {
    const FindSingleUser = Data.find((User)=>User._id == id)
    console.log(FindSingleUser);
    SetSingleUser(FindSingleUser)
    setUpdateDilog(true)
  }

  const DeleteOperation = async () => {
    const Id = SingleUser._id;
    const DeleteUser = await axios.post('http://localhost:3000/Operation/Delete',{Id})
    if(DeleteUser.data == 'removed')
    {
        const UpdatedData = Data.filter((item) => item._id !== Id);
        setData(UpdatedData)
        setDeleteDilog(false)
    }
  }

  const UpdateOperation = async(e,Username,Password,Email) => {
    e.preventDefault()
    const id = SingleUser._id;
    const UpdateUser = await axios.post('http://localhost:3000/Operation/Update',{id,Username,Password,Email})
    if(UpdateUser.data == "updated")
    {
        const FindUser = Data.find((User)=>User._id == id)
        console.log(FindUser);
        
        FindUser.Username = Username
        FindUser.Password = Password
        FindUser.Email = Email
        setUpdateDilog(false)
    }
  }

  return (
    <>

<Dialog open={UpdateDilog} onClose={() => setUpdateDilog(false)}>
  <DialogContent className="bg-white rounded-lg shadow-xl max-w-lg p-6">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Update User</h2>
    <form className="space-y-4">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={SingleUser.Username}
          onChange={(e) =>
            SetSingleUser({ ...SingleUser, Username: e.target.value })
          }
          placeholder="Enter your name"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={SingleUser.Email}
          onChange={(e) =>
            SetSingleUser({ ...SingleUser, Email: e.target.value })
          }
          placeholder="Enter your email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="text"
          id="password"
          value={SingleUser.Password}
          onChange={(e) =>
            SetSingleUser({ ...SingleUser, Password: e.target.value })
          }
          placeholder="Enter your password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={(e)=>UpdateOperation(e,SingleUser.Username,SingleUser.Password,SingleUser.Email)}
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => setUpdateDilog(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </form>
  </DialogContent>
</Dialog>


     <Dialog open={DeleteDilog} onClose={() => setDeleteDilog(false)} className="flex justify-center items-center">
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Are you sure you want to delete {SingleUser.Username}?
          </h1>
          <div className="flex justify-end space-x-4">
            <button
            onClick={()=>DeleteOperation()}
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


    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 py-8 px-4 w-full">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin Users Page
        </h2>
        <table className="min-w-full bg-white border border-gray-200 w-full">
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
              <tr key={item._id} className="border-b hover:bg-gray-50 w-full">
                <td className="py-2 px-4 text-sm text-gray-700 w-full">{item.Username}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{item.Email}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{item.Password}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  <button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-md hover:opacity-75 focus:outline-none mr-2"
                  onClick={()=>GetUser(item._id)}
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
        <Link to={'/Signup'}>
        <button
          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-md shadow-lg hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => console.log("Add User")}
        >
          Add User
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default AdminUsersPage;
