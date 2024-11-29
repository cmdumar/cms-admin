"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Page {
  id: number;
  title: string;
  body: string;
}

export default function Page() {
  const params = useParams();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/pages/${params.id}`);
        setPage(response.data.data);
        setError(null);
      } catch (err) {
        setError('Error fetching page');
        console.error('Error fetching page:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPage();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Page not found'}
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1>Title: {page.title}</h1>
        <div className="mt-4">Body: {page.body}</div>
      </article>
    </main>
  );
}
