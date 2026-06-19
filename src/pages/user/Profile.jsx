import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { apiService } from "../../service/apiService";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      try {
        const data = await apiService.users.getProfile(user.id);
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  return (
    <Layout title="My Profile" userRole={user?.user_metadata?.role || "user"}>
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile?.full_name || ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
