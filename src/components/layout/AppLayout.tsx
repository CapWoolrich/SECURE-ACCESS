import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="app-shell">
    <Navbar />
    <main className="app-main">{children}</main>
  </div>
);
