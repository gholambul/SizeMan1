import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

/**
 * Entry route. Redirects to Onboarding on first visit,
 * or straight into mode selection for returning users.
 */
const Index: React.FC = () => {
  const { hasOnboarded } = useApp();
  return <Navigate to={hasOnboarded ? '/mode' : '/onboarding'} replace />;
};

export default Index;