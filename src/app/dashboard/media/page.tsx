// src/app/dashboard/media/page.tsx
"use client"
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import MediaUploadForm from '@/components/media/MediaUploadForm';
import { mediaService } from '@/services/mediaService';
import Image from 'next/image';
import AddSlugModal from '@/components/media/AddSlugModal';

interface MediaFile {
  id: number;
  original_name: string;
  mime_type: string;
  file_path: string;
  file_size: number;
  created_at: string;
  slugs: Array<{ id: number; slug: string }>;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showSlugModal, setShowSlugModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="mt-6 flex justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {files.map((file) => (
              <div
                key={file.id}
                className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                {/* Preview */}
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
                {file.mime_type.startsWith('image/') ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={`http://localhost:8000/media/${file.file_path}`}
                      alt={file.original_name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

                {/* File Info */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-900 truncate" title={file.original_name}>
                    {file.original_name}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500">{formatFileSize(file.file_size)}</p>
                  
                  {/* Slugs */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {file.slugs.map(slug => (
                      <span key={slug.id} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {slug.slug}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => {
                      setSelectedFile(file);
                      setShowSlugModal(true);
                    }}
                    className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 mr-1"
                    title="Add Slug"
                  >
                    <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => window.open(`http://localhost:8000/media/${file.file_path}`, '_blank')}
                    className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 mr-1"
                    title="View"
                  >
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(file)}
                    className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50"
                    title="Delete"
                  >
                    <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showUploadForm && (
          <MediaUploadForm
            onClose={() => setShowUploadForm(false)}
            onSuccess={() => {
              loadFiles();
              setShowUploadForm(false);
            }}
          />
        )}

        {showSlugModal && selectedFile && (
          <AddSlugModal
            mediaId={selectedFile.id}
            onClose={() => {
              setShowSlugModal(false);
              setSelectedFile(null);
            }}
            onSuccess={() => {
              loadFiles(); // Refresh the file list
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
