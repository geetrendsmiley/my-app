import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { apiService } from "../../service/apiService";
import { useAuth } from "../../hooks/useAuth";
import PaymentButton from "../../components/payment/PaymentButton";
import { FolderOpen, Plus } from "lucide-react";

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiService.clients.getProjects(user.id);
        setProjects(data || []);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) loadProjects();
  }, [user]);

  return (
    <Layout
      title="My Projects"
      userRole={user?.user_metadata?.role || "client"}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={18} /> New Project
        </button>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border">
              <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No projects yet</p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm border p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      project.status === "active"
                        ? "bg-green-100 text-green-700"
                        : project.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }
                  `}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Budget: ${project.budget}
                  </span>
                  <PaymentButton
                    amount={project.budget}
                    description={`Payment for ${project.name}`}
                    onSuccess={(data) => console.log("Payment success:", data)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Layout>
  );
}
