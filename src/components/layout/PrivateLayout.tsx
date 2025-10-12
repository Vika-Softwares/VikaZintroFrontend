import { Sidebar } from './Sidebar';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-athens-gray p-6">
        {children}
      </main>
    </div>
  );
}

