import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

export default function AvaliacaoModal({ open, onClose, onFinalizar }) {
  const [nota, setNota] = useState(0);
  const [hoverNota, setHoverNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [aspectos, setAspectos] = useState({
    pontualidade: 0,
    qualidade_atendimento: 0,
    comunicacao: 0
  });
  const [finalizando, setFinalizando] = useState(false);

  const handleFinalizar = async () => {
    if (nota === 0) {
      alert("Por favor, selecione uma nota geral");
      return;
    }

    setFinalizando(true);
    const avaliacao = {
      nota,
      comentario,
      aspectos
    };

    await onFinalizar(avaliacao);
  };

  const renderStars = (value, onChange, hoverValue, onHover) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover && onHover(star)}
            onMouseLeave={() => onHover && onHover(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoverValue || value)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const renderSmallStars = (aspectoKey) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setAspectos({ ...aspectos, [aspectoKey]: star })}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-5 h-5 ${
                star <= aspectos[aspectoKey]
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Avaliar Atendimento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Nota Geral */}
          <div className="text-center">
            <Label className="text-base font-semibold mb-3 block">
              Avaliação Geral
            </Label>
            <div className="flex justify-center">
              {renderStars(nota, setNota, hoverNota, setHoverNota)}
            </div>
            {nota > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {nota === 5 ? 'Excelente!' : nota === 4 ? 'Muito Bom!' : nota === 3 ? 'Bom' : nota === 2 ? 'Regular' : 'Precisa Melhorar'}
              </p>
            )}
          </div>

          {/* Aspectos Específicos */}
          <div className="space-y-4 border-t pt-4">
            <Label className="text-sm font-semibold">Aspectos Específicos</Label>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-1">Pontualidade</p>
                {renderSmallStars('pontualidade')}
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-1">Qualidade do Atendimento</p>
                {renderSmallStars('qualidade_atendimento')}
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-1">Comunicação</p>
                {renderSmallStars('comunicacao')}
              </div>
            </div>
          </div>

          {/* Comentário */}
          <div>
            <Label htmlFor="comentario-avaliacao" className="text-sm font-medium mb-2">
              Comentário (opcional)
            </Label>
            <Textarea
              id="comentario-avaliacao"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Compartilhe sua experiência com o atendimento..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleFinalizar}
              disabled={nota === 0 || finalizando}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500"
            >
              {finalizando ? 'Finalizando...' : 'Finalizar Atendimento'}
            </Button>
            <Button onClick={onClose} variant="outline" disabled={finalizando}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}