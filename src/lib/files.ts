
import fs from 'fs/promises';
import path from 'path';

export interface FileEntry {
  name: string;
  isDirectory: boolean;
}

export async function listFiles(baseDir: string, currentPath: string = ''): Promise<FileEntry[]> {
  // Resolve the full path
  const safeBaseDir = path.resolve(baseDir);
  const targetPath = path.resolve(safeBaseDir, currentPath);

  // Security Check: Ensure targetPath is within safeBaseDir
  if (!targetPath.startsWith(safeBaseDir)) {
    console.error('Security Alert: Path traversal attempt blocked:', targetPath);
    throw new Error('Access denied: Invalid path.');
  }

  try {
    const entries = await fs.readdir(targetPath, { withFileTypes: true });
    return entries.map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
    }));
  } catch (error) {
    console.error('Error reading directory:', error);
    // Return empty array or rethrow depending on desired behavior, but don't leak system error details
    return [];
  }
}
