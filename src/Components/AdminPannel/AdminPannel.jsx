import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AdminUsersPage = () => {
  const APIURL = import.meta.env.VITE_API_KEY;
  const [Data, setData] = useState([]);
  const [BackupData, SetBackupData] = useState([]);
  const [SingleUser, SetSingleUser] = useState({});
  const [DeleteDilog, setDeleteDilog] = useState(false);
  const [UpdateDilog, setUpdateDilog] = useState(false);
  const [CreateDilog,SetCreateDilog] = useState(false);
  const [SearchData, SetSearchData] = useState("");

  const Username = useRef();
  const Password = useRef();
  const Email = useRef();
  const Confirm = useRef();

  useEffect(() => {
    const GetData = async () => {
      const UsersData = await axios.get(`${APIURL}/Data/UsersData`);
      setData(UsersData.data);
    };
    GetData();
  }, []);

  const GetSingleUser = (id) => {
    const FindSingleUser = Data.find((User) => User._id === id);
    SetSingleUser(FindSingleUser);
    setDeleteDilog(true);
  };

  const GetUser = (id) => {
    const FindSingleUser = Data.find((User) => User._id === id);
    SetSingleUser(FindSingleUser);
    setUpdateDilog(true);
  };

  const DeleteOperation = async () => {
    const Id = SingleUser._id;
    const DeleteUser = await axios.post(`${APIURL}/Operation/Delete`, { Id });
    if (DeleteUser.data === "removed") {
      const UpdatedData = Data.filter((item) => item._id !== Id);
      setData(UpdatedData);
      setDeleteDilog(false);
    }
  };

  const UpdateOperation = async (e, Username, Password, Email) => {
    e.preventDefault();
    const id = SingleUser._id;
    const UpdateUser = await axios.post(`${APIURL}/Operation/Update`, {
      id,
      Username,
      Password,
      Email,
    });
    if (UpdateUser.data === "updated") {
      const UpdatedUser = { ...SingleUser, Username, Password, Email };
      setData((prevData) =>
        prevData.map((user) =>
          user._id === id ? { ...user, Username, Password, Email } : user
        )
      );
      SetSingleUser(UpdatedUser);
      setUpdateDilog(false);
    }
  };

  const FindUser = () => {
    if (!SearchData) return setData(Data); // If no search term, reset data
    const filteredUsers = Data.filter(
      (user) =>
        user.Username.toLowerCase().includes(SearchData.toLowerCase()) ||
        user.Email.toLowerCase().includes(SearchData.toLowerCase())
    );
    SetBackupData(Data);
    setData(filteredUsers);
    console.log(BackupData);
  };

  const ResetSearch = async () => {
    const UsersData = await axios.get(`${APIURL}/Data/UsersData`);
    setData(UsersData.data);
    SetSearchData("");
  };

  const CreateUser = async (e) => {
    e.preventDefault()
    const username = Username.current.value;
    const email = Email.current.value;
    const password = Password.current.value;
    const confirm = Confirm.current.value;

    if (password == confirm) {
      if (
        username != "" &&
        email != "" &&
        password != "" &&
        confirm != ""
      ) {
        if (username.length <= 5) {
          toast.warn("Username Is Too Sort", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
          });
        } else if (username.length >= 13) {
          toast.warn("Username Is Too Long", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
          });
        } else {
          const data = await axios.post(`${APIURL}/Authentication/Signup`, {
            username,
            email,
            password,
          });
          if (data.data == "created") {

            const UpdatedData = await axios.get(`${APIURL}/Data/UsersData`);
            setData(UpdatedData.data);

            toast.success("User is created", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Zoom,
            });
            SetCreateDilog(false)
          }
        }
      }
    }
  };

  return (
    <>
      <Dialog open={CreateDilog} onClose={()=>SetCreateDilog(false)}>
        <DialogContent className="p-6">
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                ref={Username}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                ref={Email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                ref={Password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                ref={Confirm}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                onClick={()=> SetCreateDilog(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => CreateUser(e)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={UpdateDilog} onClose={() => setUpdateDilog(false)}>
        <DialogContent className="bg-white rounded-lg shadow-xl max-w-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Update User
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={SingleUser.Username || ""}
                onChange={(e) =>
                  SetSingleUser({ ...SingleUser, Username: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={SingleUser.Email || ""}
                onChange={(e) =>
                  SetSingleUser({ ...SingleUser, Email: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={SingleUser.Password || ""}
                onChange={(e) =>
                  SetSingleUser({ ...SingleUser, Password: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                onClick={(e) =>
                  UpdateOperation(
                    e,
                    SingleUser.Username,
                    SingleUser.Password,
                    SingleUser.Email
                  )
                }
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setUpdateDilog(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Close
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={DeleteDilog} onClose={() => setDeleteDilog(false)}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Are you sure you want to delete {SingleUser.Username}?
          </h1>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => DeleteOperation()}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteDilog(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
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

          <div className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={SearchData}
              onChange={(e) => SetSearchData(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
              onClick={() => FindUser()}
            >
              Search
            </button>

            <button
              className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
              onClick={() => ResetSearch()}
            >
              Reset
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-purple-400 to-blue-600 text-white break-all whitespace-pre-wrap">
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
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 break-all whitespace-pre-wrap"
                >
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {item.Username}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {item.Email}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {item.Password}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    <button
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-md"
                      onClick={() => GetUser(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md"
                      onClick={() => GetSingleUser(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

            <button className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md shadow-lg"
            onClick={()=>SetCreateDilog(true)}>
              Add User
            </button>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </div>
    </>
  );
};

export default AdminUsersPage;
