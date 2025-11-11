
import fs from 'fs/promises';
import path from 'path';

export interface FileEntry {
  name: string;
  isDirectory: boolean;
}

export async function listFiles(baseDir: string, currentPath: string = ''): Promise<FileEntry[]> {
  const targetPath = path.join(baseDir, currentPath);
  try {
    const entries = await fs.readdir(targetPath, { withFileTypes: true });
    return entries.map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
    }));
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}
