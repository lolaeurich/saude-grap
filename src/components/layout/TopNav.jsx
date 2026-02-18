import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJornada } from '@/lib/JornadaContext';
import { Home, ClipboardList, Wallet, User, Heart, Bell, X, CheckCircle, AlertCircle, Info, LogOut } from "lucide-react";

const navItemsProfissional = [
  { name: "Demandas", icon: Home, page: "DemandasDisponiveis" },
  { name: "Minhas Demandas", icon: ClipboardList, page: "MinhasDemandas" },
  { name: "Financeiro", icon: Wallet, page: "Financeiro" },
  { name: "Perfil", icon: User, page: "Perfil" }
];

const navItemsConvenio = [
  { name: "Demandas", icon: Home, page: "DemandasPublicadas" },
  { name: "Criar Demanda", icon: ClipboardList, page: "CriarDemanda" },
  { name: "Relatórios", icon: Wallet, page: "RelatoriosConvenio" },
  { name: "Perfil", icon: User, page: "PerfilConvenio" }
];

const mockNotificacoes = [
  { id: 1, titulo: "Demanda Aceita", mensagem: "Sua demanda de Consulta Clínica Geral foi aceita por Dr. Fernando Silva", tipo: "success", data: "Há 5 minutos" },
  { id: 2, titulo: "Pagamento Recebido", mensagem: "Você recebeu R$ 150,00 pela consulta com João Silva", tipo: "success", data: "Há 2 horas" },
  { id: 3, titulo: "Nova Demanda Disponível", mensagem: "Uma nova demanda de Cardiologia surgiu perto de você - R$ 280", tipo: "info", data: "Há 3 horas" },
  { id: 4, titulo: "Atenção", mensagem: "Sua demanda de Avaliação Psicológica vence em 2 horas", tipo: "warning", data: "Há 4 horas" }
];

export default function TopNav({ currentPage }) {
  const [showNotificacoes, setShowNotificacoes] = useState(false);
  const { jornada, resetarJornada } = useJornada();

  // Se não tiver jornada, mostra versão simplificada
  const isLandingPage = !jornada;
  const navItems = jornada === 'profissional' ? navItemsProfissional : (jornada === 'convenio' ? navItemsConvenio : []);

  const getIconNotificacao = (tipo) => {
    switch(tipo) {
      case 'success': return <CheckCircle size={18} className="text-green-600" />;
      case 'warning': return <AlertCircle size={18} className="text-yellow-600" />;
      case 'info': return <Info size={18} className="text-blue-600" />;
      default: return <Bell size={18} className="text-gray-600" />;
    }
  };

  const handleSair = () => {
    resetarJornada();
    window.location.href = '/';
  };

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Health Connect
            </h1>
            <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded-full ml-2">
              {jornada === 'profissional' ? 'Profissional' : 'Convênio'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.page}
                  to={`/${item.page}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                  <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => setShowNotificacoes(!showNotificacoes)}
              className="p-2 rounded-full hover:bg-gray-100 relative transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full border border-white" />
            </button>

            <button
              onClick={handleSair}
              className="p-2 rounded-full hover:bg-red-100 relative transition-colors"
              title="Sair e voltar para seleção de jornada"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>

            {/* Dropdown de Notificações */}
            {showNotificacoes && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 max-h-[500px] overflow-y-auto z-50">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-xl">
                  <h3 className="font-bold text-gray-900">Notificações</h3>
                  <button 
                    onClick={() => setShowNotificacoes(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={18} className="text-gray-600" />
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {mockNotificacoes.map(notif => (
                    <div key={notif.id} className={`p-4 border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      notif.tipo === 'success' ? 'border-l-green-500' :
                      notif.tipo === 'warning' ? 'border-l-yellow-500' :
                      'border-l-blue-500'
                    }`}>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIconNotificacao(notif.tipo)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{notif.titulo}</p>
                          <p className="text-xs text-gray-600 mt-1">{notif.mensagem}</p>
                          <p className="text-xs text-gray-500 mt-2">{notif.data}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 border-t border-gray-200 p-3 text-center rounded-b-xl">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}