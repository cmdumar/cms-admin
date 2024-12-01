"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Page {
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/pages');
        setPages(response.data.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Pages</h1>
      <div className="grid gap-6">
        {pages.map((page) => (
          <Link 
            href={`/${page.id}`} 
            key={page.id}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 capitalize">{page.title}</h2>
            <p className="text-gray-600 line-clamp-3">{page.body}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
