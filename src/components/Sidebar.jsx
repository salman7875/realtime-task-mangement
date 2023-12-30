import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const data = [
  { id: 1, icon: "http://www.w3.org/2000/svg", title: "Home", route: "/" },
  {
    id: 2,
    icon: "http://www.w3.org/2000/svg",
    title: "Create Task",
    route: "/create",
  },
  {
    id: 3,
    icon: "http://www.w3.org/2000/svg",
    title: "Notification",
    route: "/",
  },
  { id: 4, icon: "http://www.w3.org/2000/svg", title: "Profile", route: "/" },
];
const Sidebar = () => {
  const [nav, setNav] = useState(data);
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 flex justify-center h-screen text-white overflow-x-hidden overflow-y-scroll hide-scroll">
      <div className="my-5">
        <h1 className="text-2xl mb-10">Task Management</h1>

        <ul className="text-center min-w-44 max-w-60">
          {nav.map((item) => (
            <li
              className={`hover:bg-gray-900 p-4 py-3 rounded-3xl mb-2 ${
                location.pathname === item.route ? "active-sidebar" : ""
              }`}
              key={item.id}
            >
              <Link to={item.route} className="flex items-center gap-3">
                <svg
                  xmlns={item.icon}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <p className="text-xl">{item.title}</p>
              </Link>
            </li>
          ))}
          <div className="hover:bg-gray-900 p-4 py-3 rounded-3xl mb-2">
            <button className="flex items-center gap-3" onClick={logoutHandler}>
              <svg
                xmlns={"http://www.w3.org/2000/svg"}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p>Logout</p>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
