// src/app/dashboard/media/page.tsx
"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Table from '@/components/common/Table';
import MediaUploadForm from '@/components/media/MediaUploadForm';
import { mediaService } from '@/services/mediaService';

interface MediaFile {
  id: number;
  original_name: string;
  mime_type: string;
  file_path: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  slugs: Array<{ id: number; slug: string }>;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const [showUploadForm, setShowUploadForm] = useState(false);

  const loadFiles = async () => {
    try {
      const data = await mediaService.getAll();
      setFiles(data);
      setError(null);
    } catch {
      setError('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'FILE NAME',
      accessor: 'original_name' as keyof MediaFile,
    },
    {
      header: 'TYPE',
      accessor: 'mime_type' as keyof MediaFile,
    },
    {
      header: 'SIZE',
      accessor: 'file_size' as keyof MediaFile,
      render: (file: MediaFile) => (
        <span className="text-black">{(file.file_size / 1024).toFixed(2)} KB</span>
      )
    },
    {
      header: 'FILE',
      accessor: 'original_name' as keyof MediaFile,
      render: (file: MediaFile) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {file.mime_type.startsWith('image/') ? (
              <img
                src={`http://localhost:8000/storage/${file.file_path}`}
                alt={file.original_name}
                className="h-10 w-10 object-cover rounded-md"
              />
            ) : (
              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500 text-xs">File</span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{file.original_name}</div>
          </div>
        </div>
      )
    },
    {
      header: 'SLUGS',
      accessor: 'slugs' as keyof MediaFile,
      render: (file: MediaFile) => (
        <div className="flex flex-wrap gap-2">
          {file.slugs.map(slug => (
            <span key={slug.id} className="px-2 py-1 bg-gray-500 rounded-full text-xs">
              {slug.slug}
            </span>
          ))}
        </div>
      )
    }
  ];

  const handleView = (file: MediaFile) => {
    if (file.mime_type.startsWith('image/')) {
      window.open(`http://localhost:8000/storage/${file.file_path}`, '_blank');
    }
  };

  const handleDelete = async (file: MediaFile) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await mediaService.delete(file.id);
        setFiles(files.filter(f => f.id !== file.id));
      } catch {
        setError('Failed to delete file');
      }
    }
  };  

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">Media Library</h3>
            <p className="mt-2 text-sm text-gray-500">
              Manage your media files and their slugs
            </p>
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload File
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
          data={files}
          isLoading={loading}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>
      {showUploadForm && (
        <MediaUploadForm
          onClose={() => setShowUploadForm(false)}
          onSuccess={loadFiles}
        />
      )}
    </DashboardLayout>
  );
}
