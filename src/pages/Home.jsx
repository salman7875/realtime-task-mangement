import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import Modal from "../components/Modal";

const data = [
  {
    id: "1",
    title: "Create Transactions Component",
    collaborators: [],
    description:
      "Apollo is a platform for building a unified graph, a communication layer that helps you manage the flow of data between your application clients (such as web and native apps) and your back-end services.",
    uid: "7632893",
    date: "22-12-2023",
  },
  {
    id: "2",
    title: "Learn React Js",
    collaborators: [],
    description:
      "Apollo is a platform for building a unified graph, a communication layer that helps you manage the flow of data between your application clients (such as web and native apps) and your back-end services.",
    uid: "7632893",
    date: "21-12-2023",
  },
  {
    id: "3",
    title: "Deep Dive in React Js",
    collaborators: [],
    description:
      "Apollo is a platform for building a unified graph, a communication layer that helps you manage the flow of data between your application clients (such as web and native apps) and your back-end services.",
    uid: "7632893",
    date: "10-12-2023",
  },
  {
    id: "4",
    title: "Get A Frontend Role",
    collaborators: [],
    description:
      "Apollo is a platform for building a unified graph, a communication layer that helps you manage the flow of data between your application clients (such as web and native apps) and your back-end services.",
    uid: "7632893",
    date: "24-12-2023",
  },
  {
    id: "5",
    title: "Become very good at it!",
    collaborators: [],
    description:
      "Apollo is a platform for building a unified graph, a communication layer that helps you manage the flow of data between your application clients (such as web and native apps) and your back-end services.",
    uid: "7632893",
    date: "31-12-2023",
  },
];

const userData = [
  { id: "1", name: "Salman Ansari", role: "Admin" },
  { id: "2", name: "Shahrukh Khan", role: "Admin" },
  { id: "3", name: "Amir Khan", role: "Admin" },
  { id: "4", name: "Nawazuddin Siddique", role: "Admin" },
];

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const dbRef = collection(db, "task");
        const userId = localStorage.getItem("id");
        console.log(userId);
        const queryByUserId = query(dbRef, where("userId", "==", userId));
        const queryByCollaborators = query(
          dbRef,
          where("collaborators", "array-contains", userId)
        );
        const snapshotByUserId = await getDocs(queryByUserId);
        const snapByCollaborators = await getDocs(queryByCollaborators);
        const resByUserId = snapshotByUserId.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const resByCollaborators = snapByCollaborators.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const merged = [...resByUserId, ...resByCollaborators];
        setTasks(merged);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  const openCollabHandler = async (id) => {
    setIsModalOpen(true);
    setTask(...tasks.filter((task) => task.id === id));
  };

  return (
    <div className="flex-[4] h-screen border-l border-gray-600 text-white  overflow-x-hidden overflow-y-scroll hide-scroll p-5">
      <div>
        <h1 className="text-2xl">Tasks</h1>

        <div className="mt-10">
          <ul className="flex gap-5">
            <li className="cursor-pointer hover:opacity-80 active">Newest</li>
            <li className="cursor-pointer hover:opacity-80">Complete</li>
          </ul>
          <div className="mt-5 grid grid-cols-4 gap-5">
            {tasks.map((task) => (
              <div
                className="w-72 h-80 relative border rounded-md p-2"
                key={task.id}
              >
                <span className="text-lg">{task.title}</span>
                <p className="mt-2 text-sm text-gray-400">{task.description}</p>
                <span className="text-sm text-gray-200 flex justify-end mt-2">
                  - {task.date}
                </span>

                <div className="absolute bottom-2 flex items-center gap-2">
                  <button
                    className="border-b border-yellow-500 px-2 py-1 rounded-sm hover:bg-yellow-500 hover:text-black"
                    onClick={() => openCollabHandler(task.id)}
                  >
                    Add Collaborator
                  </button>
                  <button className=" px-2 py-1 rounded-sm bg-green-600 hover:opacity-85">
                    Edit
                  </button>
                  <button className="px-2 py-1 rounded-sm bg-red-600 hover:opacity-85">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen ? <Modal task={task} setIsModalOpen={setIsModalOpen} /> : ""}
    </div>
  );
};

export default Home;
