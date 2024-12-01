import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path) {
      return NextResponse.json(
        { message: 'Path parameter is required' },
        { status: 400 }
      );
    }

    // Revalidate the specific path
    revalidatePath(path);

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
