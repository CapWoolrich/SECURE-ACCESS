import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { OperatorPortalNavbar } from './OperatorPortalNavbar';
import { useOperatorSession } from '../../hooks/useOperatorSession';

interface OperatorPortalLayoutProps {
  children: ReactNode;
}

export const OperatorPortalLayout = ({ children }: OperatorPortalLayoutProps) => {
  const { isAuthenticated } = useOperatorSession();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={`/portal/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return (
    <div className="app-shell">
      <OperatorPortalNavbar />
      <main className="app-main">{children}</main>
    </div>
  );
};
