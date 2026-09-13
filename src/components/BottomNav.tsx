import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera, BarChart3, Settings2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const { t } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { path: '/capture', label: t('nav.capture'), icon: Camera },
    { path: '/results', label: t('nav.results'), icon: BarChart3 },
    { path: '/settings', label: t('nav.settings'), icon: Settings2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="mx-3 mb-3 flex items-center justify-around rounded-2xl border border-border bg-card/90 backdrop-blur-lg shadow-lg py-2 px-2">
        {items.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-xl py-2 px-3 transition-all duration-200 cursor-pointer',
                active
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;