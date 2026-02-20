import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ComentariosModal({ open, onClose, demanda = {}, onSalvar }) {
  const [novoComentario, setNovoComentario] = useState("");
  const [tipo, setTipo] = useState("comentario");
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    if (!novoComentario.trim()) return;

    setSalvando(true);
    const comentariosAtualizados = [
      ...(demanda.comentarios || []),
      {
        texto: novoComentario,
        data: new Date().toISOString(),
        tipo: tipo
      }
    ];

    await onSalvar(comentariosAtualizados);
    setNovoComentario("");
    setSalvando(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comentários e Ocorrências
          </DialogTitle>
        </DialogHeader>

        {/* Lista de comentários existentes */}
        <div className="space-y-3 mb-6">
          {demanda.comentarios && demanda.comentarios.length > 0 ? (
            demanda.comentarios.map((comentario, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  comentario.tipo === 'ocorrencia'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-2 mb-1">
                  {comentario.tipo === 'ocorrencia' ? (
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  ) : (
                    <MessageSquare className="w-4 h-4 text-gray-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {comentario.tipo === 'ocorrencia' ? 'Ocorrência' : 'Comentário'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(comentario.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{comentario.texto}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              Nenhum comentário ou ocorrência registrada ainda.
            </p>
          )}
        </div>

        {/* Novo comentário */}
        <div className="space-y-4 border-t pt-4">
          <div>
            <Label className="text-sm font-medium mb-2">Tipo</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={tipo === 'comentario' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTipo('comentario')}
                className="flex-1"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Comentário
              </Button>
              <Button
                type="button"
                variant={tipo === 'ocorrencia' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTipo('ocorrencia')}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Ocorrência
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="comentario" className="text-sm font-medium mb-2">
              {tipo === 'ocorrencia' ? 'Descreva a ocorrência' : 'Seu comentário'}
            </Label>
            <Textarea
              id="comentario"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder={
                tipo === 'ocorrencia'
                  ? 'Descreva detalhadamente o que aconteceu...'
                  : 'Adicione observações sobre o atendimento...'
              }
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSalvar}
              disabled={!novoComentario.trim() || salvando}
              className="flex-1"
            >
              {salvando ? 'Salvando...' : 'Adicionar'}
            </Button>
            <Button onClick={onClose} variant="outline">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}