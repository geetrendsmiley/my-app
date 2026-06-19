import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { apiService } from "../../service/apiService";
import { useAuth } from "../../hooks/useAuth";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    activeProjects: 0,
    completionRate: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiService.dashboard.getStats(user.id);
        setStats(data || {});
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    }

    if (user) loadStats();
  }, [user]);

  const statCards = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Active Projects",
      value: stats.activeProjects,
      icon: Activity,
      color: "bg-purple-500",
    },
    {
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  return (
    <Layout
      title="Dashboard Overview"
      userRole={user?.user_metadata?.role || "user"}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">New project created</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
