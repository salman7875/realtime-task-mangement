import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, messaging } from "../firebase/firebase";
import { getToken } from "firebase/messaging";

const VAPID_KEY =
  "BIrCVRoE8dFCJQAGdXT0UKRhuvhFl2vauUFOzFitnevBzVxJr2g7LfQ2gZvp7DvVL1ugueniPQro0hJamPEnZM8";

const Modal = ({ task, setIsModalOpen }) => {
  const [users, setUsers] = useState([]);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("hey");
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log("Token gen: ", token);
    } else if (permission === "denied") {
      console.log("Permission denied!");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = localStorage.getItem("id");
        const dbRef = collection(db, "users");
        const querySnapshot = await getDocs(dbRef);
        const response = querySnapshot.docs
          .filter((doc) => doc.id !== userId)
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const addCollabHandler = async (userId) => {
    try {
      const dbRef = doc(db, "task", task.id);
      const querySnapshot = await getDoc(dbRef);

      if (!querySnapshot.exists()) {
        throw new Error("Data Not Found!");
      }
      const { collaborators } = querySnapshot.data();
      const alreadyCollaborated = collaborators.find((data) => data === userId);
      if (alreadyCollaborated) {
        throw new Error("User Already Collaborated!");
      }
      await updateDoc(dbRef, { collaborators: [...collaborators, userId] });
      console.log("Added!");
    } catch (err) {
      console.log(err);
    }
  };

  const removeCollabHandler = async (userId) => {
    try {
      const dbRef = doc(db, "task", task.id);
      const querySnapshot = await getDoc(dbRef);

      if (!querySnapshot.exists()) {
        throw new Error("Data Not Found!");
      }
      const { collaborators } = querySnapshot.data();
      const updatedData = collaborators.filter((data) => data !== userId);
      await updateDoc(dbRef, { collaborators: updatedData });
      console.log("Removed!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute h-[100%] w-[79.5%] mx-auto top-0 flex items-center justify-center">
      <div className="w-[50%] h-[90%] bg-gray-900 opacity-80 rounded-lg px-5 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Users</h1>
          <div
            className="bg-black w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80"
            onClick={() => setIsModalOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <ul className="mt-5">
          {users.map((user) => (
            <li
              className="bg-black p-2 px-5 rounded-3xl flex items-center justify-between mb-2"
              key={user.id}
            >
              <p>{user.name}</p>
              {task.collaborators.find((data) => data === user.id) ? (
                <button
                  className="px-3 py-1 bg-red-500 rounded-3xl text-black font-medium hover:opacity-85"
                  onClick={() => removeCollabHandler(user.id)}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="px-3 py-1 bg-yellow-500 rounded-3xl text-black font-medium hover:opacity-85"
                  onClick={() => addCollabHandler(user.id)}
                >
                  Add
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
