import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, LogOut } from "lucide-react";
import PageHeader from '@/components/layout/PageHeader';
import TopNav from '@/components/layout/TopNav';
import BottomNav from '@/components/layout/BottomNav';
import { useJornada } from '@/lib/JornadaContext';
import { useNavigate } from 'react-router-dom';

const mockUser = {
  full_name: "Gestor de Convênio",
  email: "gestor@convenio.com.br",
  phone: "(11) 3000-0000",
  location: "São Paulo, SP",
  company: "CareNow Convênios",
  joinDate: "Janeiro de 2023",
};

export default function PerfilConvenio() {
  const { resetarJornada } = useJornada();
  const navigate = useNavigate();

  const handleLogout = () => {
    resetarJornada();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="pb-32">
      <TopNav currentPage="PerfilConvenio" />
      <PageHeader title="Meu Perfil" />

      <main className="p-4 md:px-12 lg:px-24 max-w-4xl mx-auto space-y-4">
        {/* Profile Header */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg shadow-md border border-emerald-100">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-20 h-20 mb-3 ring-4 ring-white shadow-lg">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xl font-bold">
                {getInitials(mockUser.full_name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-gray-900">
              {mockUser.full_name}
            </h2>
            <p className="text-xs text-gray-600 font-semibold mt-1">
              {mockUser.company}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Membro desde {mockUser.joinDate}
            </p>
          </div>
        </Card>

        {/* Informações de Contato */}
        <Card className="p-4 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
            Informações de Contato
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-500 font-semibold">E-mail</p>
                <p className="text-xs font-medium text-gray-900 truncate">{mockUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-500 font-semibold">Telefone</p>
                <p className="text-xs font-medium text-gray-900">{mockUser.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-500 font-semibold">Localização</p>
                <p className="text-xs font-medium text-gray-900">{mockUser.location}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Sobre o Convênio */}
        <Card className="p-4 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
            Sobre
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Convênio parceiro da plataforma CareNow. Conectamos pacientes que necessitam de atendimento domiciliar com profissionais de saúde qualificados e verificados.
          </p>
        </Card>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <Button 
            className="w-full h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg text-sm font-bold shadow-md"
          >
            Editar Perfil
          </Button>

          <Button 
            onClick={handleLogout}
            className="w-full h-10 rounded-lg text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 bg-white flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair da Conta
          </Button>
        </div>
      </main>

      <BottomNav currentPage="PerfilConvenio" />
    </div>
  );
}