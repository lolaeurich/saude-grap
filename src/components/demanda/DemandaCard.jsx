import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, DollarSign, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import StatusBadge from './StatusBadge';

const urgenciaConfig = {
  urgente: { label: "Urgente", className: "bg-red-100 text-red-700 border-red-200" },
  media: { label: "Média", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  baixa: { label: "Baixa", className: "bg-green-100 text-green-700 border-green-200" }
};

export default function DemandaCard({ 
  demanda = {}, 
  onAceitar = () => {}, 
  onIgnorar = () => {}, 
  onVerDetalhes = () => {},
  onIniciarAtendimento = () => {},
  showActions = true,
  variant = "disponivel" // disponivel, aceita, em_execucao
}) {
  if (!demanda || !demanda.id) {
    return (
      <Card className="p-4">
        <p className="text-gray-500">Nenhuma demanda disponível</p>
      </Card>
    );
  }
  const urgencia = urgenciaConfig[demanda.urgencia] || urgenciaConfig.media;
  
  const formatarData = (data) => {
    if (!data) return "";
    try {
      return format(new Date(data), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return data;
    }
  };

  const formatarHorario = () => {
    if (demanda.horario_inicio && demanda.horario_fim) {
      return `${demanda.horario_inicio} - ${demanda.horario_fim}`;
    }
    return demanda.horario_inicio || "";
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-0 overflow-hidden active:shadow-xl transition-all duration-300">
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
          <div className="flex flex-col gap-2 items-end flex-shrink-0">
            <Badge variant="outline" className={`${urgencia.className} border-2 font-semibold text-[10px] px-2 py-0.5`}>
              {urgencia.label}
            </Badge>
            {demanda.status && <StatusBadge status={demanda.status} />}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2.5 mb-4">
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
        </div>

        {/* Observações (se variant aceita ou em_execucao) */}
        {(variant === "aceita" || variant === "em_execucao") && demanda.observacoes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Observações:</p>
            <p className="text-sm text-gray-700">{demanda.observacoes}</p>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            {variant === "disponivel" && (
              <>
                <Button 
                  onClick={() => onAceitar?.(demanda)}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 active:from-violet-700 active:to-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-purple-200 h-10 text-sm"
                >
                  Aceitar
                </Button>
                <Button 
                  onClick={() => onIgnorar?.(demanda)}
                  variant="outline"
                  className="flex-1 rounded-xl border-2 font-semibold h-10 text-sm"
                >
                  Ignorar
                </Button>
              </>
            )}
            {variant === "aceita" && (
              <>
                <Button 
                  onClick={() => onVerDetalhes?.(demanda)}
                  variant="outline"
                  className="flex-1 rounded-xl border-2 font-semibold h-10 text-sm"
                >
                  Ver Detalhes
                </Button>
                <Button 
                  onClick={() => onIniciarAtendimento?.(demanda)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 active:from-orange-600 active:to-red-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-200 h-10 text-sm"
                >
                  Iniciar
                </Button>
              </>
            )}
            {variant === "em_execucao" && (
              <Button 
                onClick={() => onVerDetalhes?.(demanda)}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 active:from-violet-700 active:to-purple-700 text-white rounded-xl font-semibold h-10 text-sm"
              >
                Ver Detalhes
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}