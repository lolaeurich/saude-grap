import React from 'react';
import { Badge } from "@/components/ui/badge";

const statusConfig = {
  disponivel: { label: "Disponível", className: "bg-blue-100 text-blue-700 border-blue-200" },
  atribuida: { label: "Aceita", className: "bg-purple-100 text-purple-700 border-purple-200" },
  em_execucao: { label: "Em Execução", className: "bg-orange-100 text-orange-700 border-orange-200" },
  finalizada: { label: "Finalizada", className: "bg-green-100 text-green-700 border-green-200" },
  cancelada: { label: "Cancelada", className: "bg-red-100 text-red-700 border-red-200" }
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-700 border-gray-200" };

  return (
    <Badge variant="outline" className={`${config.className} border-2 font-semibold`}>
      {config.label}
    </Badge>
  );
}