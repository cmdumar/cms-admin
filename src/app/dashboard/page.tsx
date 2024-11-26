import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="border-b border-gray-200 pb-5">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900">Dashboard</h3>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stats Card */}
          <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Total Pages</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">12</dd>
          </div>

          {/* Stats Card */}
          <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Media Files</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">24</dd>
          </div>

          {/* Stats Card */}
          <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Users</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">3</dd>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h4>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 text-sm text-gray-500">No recent activity</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
