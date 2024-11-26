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
    } catch (err) {
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
      } catch (err) {
        setError('Failed to delete page');
      }
    }
  };

  const handleAddNew = () => {
    setSelectedPage(undefined);
    setShowForm(true);
  };

  const columns = [
    { header: 'Title', accessor: 'title' as keyof Page },
    { 
      header: 'Body', 
      accessor: 'body' as keyof Page,
      render: (page: Page) => (
        <div className="truncate max-w-md">
          {page.body}
        </div>
      )
    },
    { 
      header: 'Created', 
      accessor: 'created_at' as keyof Page,
      render: (page: Page) => new Date(page.created_at).toLocaleDateString()
    }
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DashboardLayout>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pages</h2>
          <button 
            onClick={handleAddNew}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add New Page
          </button>
        </div>
        <Table 
          columns={columns}
          data={pages}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {showForm && (
        <PageForm
          page={selectedPage}
          onClose={() => setShowForm(false)}
          onSuccess={loadPages}
        />
      )}
    </DashboardLayout>
  );
}
