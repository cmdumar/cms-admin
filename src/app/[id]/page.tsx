import type { Page, PagesResponse, PageParams } from '@/types/page';

// Generate static paths
export async function generateStaticParams() {
  // Get all page IDs from API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages`);
  const { data: pages }: PagesResponse = await response.json();

  return pages.map((page: Page) => ({
    id: page.id.toString(),
  }));
}

// Set up revalidation for the page
export const revalidate = 60; // revalidate every 60 seconds

export default async function Page({ params }: { params: PageParams }) {
  const resolvedParams = await Promise.resolve(params);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/${resolvedParams.id}`);
    const { data: page } = await response.json();

    return (
      <main className="container mx-auto p-8">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-xl font-semibold">{page.title}</h1>
          <div className="mt-4 text-lg font-normal">{page.body}</div>
        </article>
      </main>
    );
  } catch {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load page
        </div>
      </div>
    );
  }
}
