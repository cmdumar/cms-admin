"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface MediaFile {
  id: number;
  original_name: string;
  mime_type: string;
  file_path: string;
}

export default function MediaGallery() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/media');
        setFiles(response.data.data);
        console.log('Executed');
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Media Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.map((file) => (
          file.mime_type.startsWith('image/') && (
            <div key={file.id} className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={`http://localhost:8000/media/${file.file_path}`}
                alt={file.original_name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                unoptimized
              />
            </div>
          )
        ))}
      </div>
    </main>
  );
}
