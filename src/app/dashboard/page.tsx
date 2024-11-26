import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to CMS Dashboard</h2>
        <p className="text-gray-600">
          Select an option from the sidebar to get started.
        </p>
      </div>
    </DashboardLayout>
  );
}
