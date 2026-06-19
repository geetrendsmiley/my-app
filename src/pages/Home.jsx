import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full p-8 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Welcome — Home</h1>
        <p className="mb-6">Quick links to the app pages:</p>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="text-blue-600">
              Dashboard (Overview)
            </Link>
          </li>
          <li>
            <Link to="/user/profile" className="text-blue-600">
              User Profile
            </Link>
          </li>
          <li>
            <Link to="/client/projects" className="text-blue-600">
              Client Projects
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="text-blue-600">
              Admin Users
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
