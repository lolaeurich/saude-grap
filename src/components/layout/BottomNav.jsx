import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ClipboardList, Wallet, User } from "lucide-react";
import { useJornada } from '@/lib/JornadaContext';

const navItemsProfissional = [
  { name: "Demandas", icon: Home, page: "DemandasDisponiveis" },
  { name: "Minhas", icon: ClipboardList, page: "MinhasDemandas" },
  { name: "Financeiro", icon: Wallet, page: "Financeiro" },
  { name: "Perfil", icon: User, page: "Perfil" }
];

const navItemsConvenio = [
  { name: "Demandas", icon: Home, page: "DemandasPublicadas" },
  { name: "Criar", icon: ClipboardList, page: "CriarDemanda" },
  { name: "Relatórios", icon: Wallet, page: "RelatoriosConvenio" },
  { name: "Perfil", icon: User, page: "PerfilConvenio" }
];

export default function BottomNav({ currentPage }) {
  const { jornada } = useJornada();

  // Se não tiver jornada, não mostra BottomNav
  if (!jornada) {
    return null;
  }

  const navItems = jornada === 'profissional' ? navItemsProfissional : navItemsConvenio;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-6 py-3 z-50">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          const Icon = item.icon;

          return (
            <Link
              key={item.page}
              to={`/${item.page}`}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? "text-violet-600 scale-110" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive ? "bg-violet-50" : ""}`}>
                <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-[2]"}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "opacity-100" : "opacity-0"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}