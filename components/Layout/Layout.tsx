// components/Layout/Layout.tsx

import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-4">
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/">Home</Link>
            </li>
            <li className="mb-2">
              <Link href="/weather">Weather</Link>
            </li>
            <li className="mb-2">
              <Link href="/news">News</Link>
            </li>
            <li className="mb-2">
              <Link href="/finance">Finance</Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100 text-gray-900">
        {children}
      </main>
    </div>
  );
}
