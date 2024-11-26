"use client"
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Table from '@/components/common/Table';
import PageForm from '@/components/pages/PageForm';
import { pageService } from '@/services/pageService';

interface Page {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | undefined>(undefined);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const data = await pageService.getAll();
      setPages(data);
      setError(null);
    } catch {
      setError('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: Page) => {
    setSelectedPage(page);
    setShowForm(true);
  };

  const handleDelete = async (page: Page) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await pageService.delete(page.id);
        await loadPages();
      } catch {
        setError('Failed to delete page');
      }
    }
  };

  const handleAddNew = () => {
    setSelectedPage(undefined);
    setShowForm(true);
  };

  const columns = [
    {
      header: 'Title',
      accessor: 'title' as keyof Page,
      render: (page: Page) => (
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-900">
            {page.title}
          </div>
        </div>
      )
    },
    {
      header: 'Last Updated',
      accessor: 'updated_at' as keyof Page,
      render: (page: Page) => (
        <div className="text-sm text-gray-500">
          {new Date(page.updated_at).toLocaleDateString()}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'id' as keyof Page,
      render: () => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Published
        </span>
      )
    }
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">Pages</h3>
            <p className="mt-2 text-sm text-gray-500">
              Manage your website pages and content
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            New Page
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">
                {error}
              </div>
            </div>
          </div>
        )}

        <Table
          columns={columns}
          data={pages}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <PageForm
                  page={selectedPage}
                  onClose={() => setShowForm(false)}
                  onSuccess={() => {
                    setShowForm(false);
                    loadPages();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
