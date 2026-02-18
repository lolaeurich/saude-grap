import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, MapPin, Calendar, Clock, DollarSign, User } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import StatusBadge from '../demanda/StatusBadge';

export default function DemandaPublicadaCard({ demanda }) {
  const formatarData = (data) => {
    if (!data) return '';
    try {
      return format(new Date(data), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return data;
    }
  };

  const formatarHorario = () => {
    if (!demanda.horario_inicio) return '';
    return `${demanda.horario_inicio}${demanda.horario_fim ? ` - ${demanda.horario_fim}` : ''}`;
  };

  const urgenciaConfig = {
    urgente: { label: "Urgente", className: "bg-red-100 text-red-800 border-red-200" },
    media: { label: "Média", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    baixa: { label: "Baixa", className: "bg-green-100 text-green-800 border-green-200" }
  };

  const urgencia = urgenciaConfig[demanda.urgencia] || urgenciaConfig.media;

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-0 overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-gray-900 truncate">{demanda.especialidade}</p>
              <p className="text-xs text-gray-600 truncate">{demanda.convenio_nome}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end flex-shrink-0">
            <Badge variant="outline" className={`${urgencia.className} border-2 font-semibold text-[10px] px-2 py-0.5`}>
              {urgencia.label}
            </Badge>
            <StatusBadge status={demanda.status} />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2.5 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <span className="font-medium truncate">{demanda.zona} - {demanda.cidade}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="font-medium">{formatarData(demanda.data_atendimento)} às {formatarHorario()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900">R$ {demanda.valor?.toFixed(2).replace('.', ',')}</span>
          </div>

          {/* Profissional atribuído */}
          {demanda.profissional_nome && (
            <div className="flex items-center gap-2 text-xs text-gray-700 pt-2 border-t border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <span className="font-medium">Profissional: {demanda.profissional_nome}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}