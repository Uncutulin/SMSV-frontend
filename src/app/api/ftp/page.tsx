
import { listFiles, FileEntry } from '@/lib/files';
import Link from 'next/link';
import path from 'path';

const FTP_ROOT = process.env.FTP_ROOT || process.cwd();

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function FtpPage({ searchParams }: PageProps) {
  const currentPath = typeof searchParams.path === 'string' ? searchParams.path : '';
  const files = await listFiles(FTP_ROOT, currentPath);

  const parentPath = currentPath ? path.dirname(currentPath) : '';

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Explorador de Archivos</h1>
      <div className="mb-4">
        <Link href="/api/ftp" className="text-blue-500 hover:underline">Raíz</Link>
        {currentPath && (
          <>
            {' / '}
            <Link href={`/api/ftp?path=${parentPath}`} className="text-blue-500 hover:underline">
              Volver
            </Link>
          </>
        )}
      </div>
      <ul className="list-none p-0">
        {files.map((file) => (
          <li key={file.name} className="flex items-center p-2 hover:bg-gray-100 rounded">
            <span className="mr-2">{file.isDirectory ? '📁' : '📄'}</span>
            {file.isDirectory ? (
              <Link href={`/api/ftp?path=${path.join(currentPath, file.name)}`} className="text-blue-700 hover:underline">
                {file.name}
              </Link>
            ) : (
              <a href={`/api/ftp-files?path=${encodeURIComponent(path.join(currentPath, file.name))}`} download className="text-gray-800 hover:underline">
                {file.name}
              </a>
            )}
          </li>
        ))}
      </ul>
      {files.length === 0 && <p className="text-gray-500">La carpeta está vacía o no existe.</p>}
    </div>
  );
}
