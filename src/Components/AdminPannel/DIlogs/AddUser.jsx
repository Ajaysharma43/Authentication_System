import React, { useRef } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { toast } from "react-toastify";

const AddUserDialog = ({ isOpen, onClose, onCreate }) => {
  const Username = useRef();
  const Email = useRef();
  const Password = useRef();
  const Confirm = useRef();

  const handleCreateUser = (e) => {
    e.preventDefault();
    const username = Username.current.value;
    const email = Email.current.value;
    const password = Password.current.value;
    const confirm = Confirm.current.value;

    if (password !== confirm) {
      toast.warn("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        theme: "colored",
      });
      return;
    }

    if (!username || !email || !password) {
      toast.warn("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        theme: "colored",
      });
      return;
    }

    if (username.length < 6 || username.length > 12) {
      toast.warn("Username must be between 6 and 12 characters", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        theme: "colored",
      });
      return;
    }

    onCreate({ username, email, password });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="p-6">
        <form className="space-y-4" onSubmit={handleCreateUser}>
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
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
