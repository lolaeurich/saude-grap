import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, PlusCircle, BarChart3, User } from 'lucide-react';

export default function BottomNavConvenio({ currentPage }) {
  const navItems = [
    { 
      id: 'DemandasPublicadas', 
      label: 'Demandas', 
      icon: Home, 
      path: 'DemandasPublicadas' 
    },
    { 
      id: 'CriarDemanda', 
      label: 'Nova', 
      icon: PlusCircle, 
      path: 'CriarDemanda' 
    },
    { 
      id: 'RelatoriosConvenio', 
      label: 'Relatórios', 
      icon: BarChart3, 
      path: 'RelatoriosConvenio' 
    },
    { 
      id: 'PerfilConvenio', 
      label: 'Perfil', 
      icon: User, 
      path: 'PerfilConvenio' 
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Link 
              key={item.id} 
              to={createPageUrl(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-violet-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}