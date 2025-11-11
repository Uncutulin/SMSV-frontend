import { NextRequest, NextResponse } from 'next/server';
import { listFiles } from '@/lib/files';
import path from 'path';

const FTP_ROOT = process.env.FTP_ROOT || 'C:\\Users\\jorge\\Downloads';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const currentPath = searchParams.get('path') || '';

  try {
    const files = await listFiles(FTP_ROOT, currentPath);
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error listing files:', error);
    return new NextResponse('Error listing files', { status: 500 });
  }
}
