"use client"
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface DashboardStats {
  total_pages: number;
  total_media: number;
  total_users: number;
  recent_pages: Array<{
    id: number;
    title: string;
    created_at: string;
  }>;
  recent_media: Array<{
    id: number;
    original_name: string;
    created_at: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="border-b border-gray-200 pb-5">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900">Dashboard</h3>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Total Pages</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {stats?.total_pages || 0}
            </dd>
          </div>

          <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Media Files</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {stats?.total_media || 0}
            </dd>
          </div>

          <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Users</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {stats?.total_users || 0}
            </dd>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Pages</h4>
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
              {stats?.recent_pages && stats.recent_pages.length > 0 ? (
                stats.recent_pages.map((page) => (
                  <div key={page.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{page.title}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(page.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-500">No recent pages</div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Media</h4>
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
              {stats?.recent_media && stats.recent_media.length > 0 ? (
                stats.recent_media.map((media) => (
                  <div key={media.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{media.original_name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(media.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-500">No recent media</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
