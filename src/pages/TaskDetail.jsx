import { useState } from "react";

const TaskDetail = () => {
  const [task, setTask] = useState({
    id: "2",
    title: "Learn React Js",
    collaborators: [],
    description:
      "Apollo is a platform for building a unified graph, a communication layer that helps you manage the flow of data between your application clients (such as web and native apps) and your back-end services.",
    uid: "7632893",
    date: "21-12-2023",
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const commentHandler = () => {
    try {
      setComments((prev) => [...prev, { id: Math.random(), comment }]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-[4] h-screen border-l border-gray-600 text-white  overflow-x-hidden overflow-y-scroll hide-scroll p-5">
      <h1 className="text-2xl">Detail</h1>
      <div className="mt-5 h-[94.9%] flex items border-t border-gray-600 pt-2">
        <div className="flex-1">
          <p className="text-xl mb-2">{task.title}</p>
          <span className="text-gray-400">{task.description}</span>

          <p className="mt-2">Salman Ansari, Sahjad Khan, Farhan Shaikh</p>
        </div>

        <div className="flex-[2] border-l border-gray-600 px-2 relative">
          <h2 className="text-2xl text-center pb-2 border-b border-gray-600">
            Comments
          </h2>
          <ul className="h-[82%] overflow-y-scroll hide-scroll">
            {/* {comments.map((data) => (
              <li>{data.comment}</li>
            ))} */}
            <li className="bg-gray-600 w-fit px-3 py-1 rounded-2xl my-2">
              <span className="text-sm font-medium text-gray-300">
                Salman Ansari
              </span>
              <p>Are you using Brute Force?</p>
            </li>
          </ul>

          <div className="absolute bottom-2 w-[100%] flex gap-5">
            <input
              type="text"
              placeholder="Comments..."
              className="bg-inherit outline-none border-b w-[80%] p-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="border-b border-yellow-500 hover:bg-yellow-500 px-4 rounded-lg"
              onClick={commentHandler}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
