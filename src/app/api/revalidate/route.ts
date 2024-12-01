import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body;

    // Uncomment to see the revalidation request
    // console.log('Received revalidation request for path:', path);

    if (!path) {
      console.error('No path provided');
      return NextResponse.json(
        { message: 'Path parameter is required' },
        { status: 400 }
      );
    }

    // Revalidate the specific path
    revalidatePath(path); // Triggers ISR regeneration

    // Uncomment to see the revalidation success message
    // console.log('Successfully revalidated path:', path);

    return NextResponse.json({ 
      revalidated: true,
      message: `Path ${path} revalidated` 
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
