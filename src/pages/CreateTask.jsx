import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/firebase";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [dateError, setDateError] = useState("");

  const createTaskHandler = async () => {
    try {
      const userId = localStorage.getItem("id");
      console.log(userId);
      const debRef = collection(db, "task");
      const data = {
        title,
        description: desc,
        date: dueDate,
        collaborators: [],
        userId,
      };
      const res = await addDoc(debRef, data);
      console.log("Task Created Successfully");
    } catch (err) {
      if (err.path === "title") setTitleError(err.message);
      else if (err.path === "desc") setDescError(err.message);
      else if (err.path === "dueDate") setDateError(err.message);
      else setError(err.message);
    }
  };

  const resetFormHandler = () => {
    setTitle("");
    setDesc("");
    setDueDate("");
    setTitleError("");
    setDescError("");
    setDateError("");
  };

  return (
    <div className="flex-[4] h-screen border-l border-gray-600 text-white  overflow-x-hidden overflow-y-scroll hide-scroll p-5">
      <h1 className="text-2xl">Create Task</h1>

      <div className="h-[50%] w-[50%] m-auto flex flex-col items-center justify-center border rounded-md">
        <form className="px-20 mt-5 w-full">
          {error ? <p className="text-red-500 text-center">{error}</p> : ""}
          <div className="my-2">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              placeholder="Title..."
              className="w-full outline-none bg-inherit border-b"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError ? <p className="text-red-500">{titleError}</p> : ""}
          </div>
          <div className="my-2">
            <label htmlFor="desc">Description: </label>
            <input
              type="text"
              id="desc"
              placeholder="Description..."
              className="w-full outline-none bg-inherit border-b"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {descError ? <p className="text-red-500">{descError}</p> : ""}
          </div>
          <div className="my-2">
            <label htmlFor="date">Due Date: </label>
            <input
              type="date"
              id="date"
              placeholder="Enter Due Date..."
              className="w-full outline-none bg-inherit border-b"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            {dateError ? <p className="text-red-500">{dateError}</p> : ""}
          </div>
          <div className="flex justify-end mt-5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={resetFormHandler}
                className="px-5 py-1 border-b border-yellow-500 bg-yellow-500 text-xl text-black hover:bg-inherit transition-all hover:text-white"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={createTaskHandler}
                className="px-5 py-1 border-b border-yellow-500 text-xl hover:bg-yellow-500 transition-all hover:text-black"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
