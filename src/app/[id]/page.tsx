import type { Page, PageParams } from '@/types/page';

// Set up revalidation for the page
export const revalidate = 60; // revalidate every 60 seconds

async function getPage(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/${id}`, {
      next: { revalidate }
    });

    console.log('Done');

    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }

    return response.json();
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}

export default async function Page({ params }: { params: PageParams }) {
  const resolvedParams = await Promise.resolve(params);

  try {
    const { data: page } = await getPage(resolvedParams.id);

    return (
      <main className="container mx-auto p-8">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-xl font-semibold">{page.title}</h1>
          <div className="mt-4 text-lg font-normal">{page.body}</div>
        </article>
      </main>
    );
  } catch (error) {
    console.error('Error', error);
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load page
        </div>
      </div>
    );
  }
}
