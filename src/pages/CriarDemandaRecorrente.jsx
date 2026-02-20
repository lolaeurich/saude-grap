import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '@/components/layout/PageHeader';
import TopNav from '@/components/layout/TopNav';
import BottomNavConvenio from '@/components/layout/BottomNavConvenio';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Repeat, MapPin, DollarSign, CheckCircle2 } from "lucide-react";

const especialidades = [
  "Fisioterapia Respiratória",
  "Enfermagem Domiciliar",
  "Cuidado Geriátrico",
  "Nutrição Clínica",
  "Terapia Ocupacional",
  "Fisioterapia Geriátrica",
  "Curativo Especializado",
  "Acompanhamento Domiciliar"
];

const diasSemana = [
  { value: "segunda", label: "Segunda" },
  { value: "terca", label: "Terça" },
  { value: "quarta", label: "Quarta" },
  { value: "quinta", label: "Quinta" },
  { value: "sexta", label: "Sexta" },
  { value: "sabado", label: "Sábado" },
  { value: "domingo", label: "Domingo" }
];

export default function CriarDemandaRecorrente() {
  const navigate = useNavigate();
  const [sucesso, setSucesso] = useState(false);
  const [formData, setFormData] = useState({
    convenio_nome: "",
    especialidade: "",
    tipo_recorrencia: "semanal",
    dias_semana: [],
    frequencia_semanal: 3,
    horario_inicio: "",
    horario_fim: "",
    data_inicio: "",
    data_fim_recorrencia: "",
    endereco: "",
    cidade: "",
    zona: "",
    valor: "",
    observacoes: "",
    requisitos: "",
    vinculo_continuo: true
  });

  const criarMutation = useMutation({
    mutationFn: async (data) => {
      // Simula o processamento e criação
      await new Promise(resolve => setTimeout(resolve, 1500));
      return 10; // Retorna número fictício de demandas criadas
    },
    onSuccess: () => {
      setSucesso(true);
      setTimeout(() => {
        navigate(createPageUrl('DemandasPublicadas'));
      }, 2000);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    criarMutation.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleDiaSemana = (dia) => {
    const novosDias = formData.dias_semana.includes(dia)
      ? formData.dias_semana.filter(d => d !== dia)
      : [...formData.dias_semana, dia];
    handleChange('dias_semana', novosDias);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-pink-50">
        <TopNav currentPage="CriarDemanda" />
        <PageHeader title="Demanda Recorrente Criada" showBack backPage="DemandasPublicadas" />
        <div className="flex items-center justify-center p-8">
          <Card className="p-8 max-w-md text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Demandas criadas com sucesso!
            </h2>
            <p className="text-gray-600">
              As demandas recorrentes foram publicadas e estão disponíveis para os profissionais.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-pink-50 pb-32">
      <TopNav currentPage="CriarDemanda" />
      <div className="md:hidden">
        <PageHeader title="Criar Demanda Recorrente" showBack backPage="DemandasPublicadas" />
      </div>

      <main className="px-4 py-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informações Básicas */}
          <Card className="p-5 bg-white rounded-2xl shadow-lg">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-violet-600 to-purple-600 rounded-full"></div>
              Informações Básicas
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="convenio">Nome do Convênio</Label>
                <Input
                  id="convenio"
                  value={formData.convenio_nome}
                  onChange={(e) => handleChange('convenio_nome', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="especialidade">Especialidade</Label>
                <select
                  id="especialidade"
                  value={formData.especialidade}
                  onChange={(e) => handleChange('especialidade', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Selecione...</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Configuração de Recorrência */}
          <Card className="p-5 bg-white rounded-2xl shadow-lg">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Repeat className="w-5 h-5 text-violet-600" />
              Recorrência
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Dias da Semana</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {diasSemana.map(dia => (
                    <label
                      key={dia.value}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition ${
                        formData.dias_semana.includes(dia.value)
                          ? 'border-violet-600 bg-violet-50'
                          : 'border-gray-300 hover:border-violet-300'
                      }`}
                    >
                      <Checkbox
                        checked={formData.dias_semana.includes(dia.value)}
                        onCheckedChange={() => toggleDiaSemana(dia.value)}
                      />
                      <span className="text-sm font-medium">{dia.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data_inicio">Data de Início</Label>
                  <Input
                    id="data_inicio"
                    type="date"
                    value={formData.data_inicio}
                    onChange={(e) => handleChange('data_inicio', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="data_fim">Data de Término</Label>
                  <Input
                    id="data_fim"
                    type="date"
                    value={formData.data_fim_recorrencia}
                    onChange={(e) => handleChange('data_fim_recorrencia', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Checkbox
                  id="vinculo"
                  checked={formData.vinculo_continuo}
                  onCheckedChange={(checked) => handleChange('vinculo_continuo', checked)}
                />
                <Label htmlFor="vinculo" className="cursor-pointer text-sm">
                  Vínculo contínuo (mesmo profissional para todas as demandas)
                </Label>
              </div>
            </div>
          </Card>

          {/* Horário */}
          <Card className="p-5 bg-white rounded-2xl shadow-lg">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-600" />
              Horário
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hora_inicio">Início</Label>
                <Input
                  id="hora_inicio"
                  type="time"
                  value={formData.horario_inicio}
                  onChange={(e) => handleChange('horario_inicio', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="hora_fim">Término</Label>
                <Input
                  id="hora_fim"
                  type="time"
                  value={formData.horario_fim}
                  onChange={(e) => handleChange('horario_fim', e.target.value)}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Local */}
          <Card className="p-5 bg-white rounded-2xl shadow-lg">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-violet-600" />
              Local
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleChange('endereco', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="zona">Zona</Label>
                  <Input
                    id="zona"
                    value={formData.zona}
                    onChange={(e) => handleChange('zona', e.target.value)}
                    placeholder="Ex: Zona Norte"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Valor e Detalhes */}
          <Card className="p-5 bg-white rounded-2xl shadow-lg">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-violet-600" />
              Valor e Detalhes
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="valor">Valor por Atendimento (R$)</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => handleChange('valor', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleChange('observacoes', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="requisitos">Requisitos Especiais</Label>
                <Textarea
                  id="requisitos"
                  value={formData.requisitos}
                  onChange={(e) => handleChange('requisitos', e.target.value)}
                  rows={2}
                  placeholder="Certificações, materiais necessários, etc."
                />
              </div>
            </div>
          </Card>

          {/* Botão */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 safe-bottom">
            <div className="max-w-4xl mx-auto">
              <Button
                type="submit"
                disabled={criarMutation.isPending || formData.dias_semana.length === 0}
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold shadow-lg"
              >
                {criarMutation.isPending ? 'Criando Demandas...' : 'Criar Demandas Recorrentes'}
              </Button>
            </div>
          </div>
        </form>
      </main>

      <BottomNavConvenio currentPage="DemandasPublicadas" />
    </div>
  );
}