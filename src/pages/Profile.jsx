import { Navigate } from "react-router-dom";

export default function Profile() {
  // Redirect to the user-specific profile page used by the app
  return <Navigate to="/user/profile" replace />;
}
