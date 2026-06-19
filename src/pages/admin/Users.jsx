import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { apiService } from "../../service/apiService";
import { Shield, UserCheck } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await apiService.admin.getAllUsers();
        setUsers(data || []);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function refreshUsers() {
    try {
      const data = await apiService.admin.getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  async function updateRole(userId, newRole) {
    try {
      await apiService.admin.updateUserRole(userId, newRole);
      refreshUsers(); // Refresh list
    } catch (error) {
      alert("Error updating role: " + error.message);
    }
  }

  return (
    <Layout title="User Management" userRole="admin">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Shield size={20} className="text-blue-600" />
            All Users
          </h2>
        </div>

        {loading ? (
          <p className="p-6">Loading users...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {u.full_name || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : u.role === "client"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    `}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <UserCheck size={14} /> Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => updateRole(u.id, e.target.value)}
                      className="text-sm border rounded-lg px-3 py-1"
                    >
                      <option value="user">User</option>
                      <option value="client">Client</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
