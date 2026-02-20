import React from 'react';
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, DollarSign, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import StatusBadge from '../demanda/StatusBadge';

export default function DemandaPublicadaCard({ demanda }) {
  const formatarData = (data) => {
    if (!data) return "";
    try {
      return format(new Date(data), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return data;
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-gray-900">{demanda.especialidade}</h3>
            <p className="text-xs text-gray-500">Criada em {formatarData(demanda.created_date)}</p>
          </div>
          <StatusBadge status={demanda.status} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{demanda.cidade} - {demanda.zona}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formatarData(demanda.data_atendimento)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{demanda.horario_inicio} - {demanda.horario_fim}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-bold text-gray-900">R$ {demanda.valor?.toFixed(2)}</span>
          </div>
          
          {demanda.status === 'disponivel' && (
            <div className="flex items-center gap-1 text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full">
              <Users className="w-3 h-3" />
              Aguardando
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}