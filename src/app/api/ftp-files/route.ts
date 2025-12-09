import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { stat } from 'fs/promises';

const basePath = path.resolve(process.env.FTP_ROOT || path.join(process.cwd(), 'public', 'uploads'));

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const filePath = searchParams.get('path');

  if (!filePath) {
    return new NextResponse('File path is required', { status: 400 });
  }

  const safeFilePath = path.join(basePath, filePath);

  // Security check to prevent directory traversal
  if (!safeFilePath.startsWith(basePath)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    const stats = await stat(safeFilePath);
    if (stats.isDirectory()) {
      return new NextResponse('Cannot download a directory', { status: 400 });
    }

    const file = await fs.readFile(safeFilePath);
    const headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="${path.basename(safeFilePath)}"`);

    return new NextResponse(file, { headers });
  } catch (error) {
    console.error('Error reading file for download:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}