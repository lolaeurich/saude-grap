import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function CriarDemanda() {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    especialidade: 'Clínica Geral',
    localizacao: '',
    data: '',
    valor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Demanda criada com sucesso!');
    setFormData({
      titulo: '',
      descricao: '',
      especialidade: 'Clínica Geral',
      localizacao: '',
      data: '',
      valor: ''
    });
  };

  return (
    <div className="pb-32">
      <TopNav />
      <PageHeader title="Criar Demanda" />
      
      <div className="p-4 md:px-12 lg:px-24 max-w-2xl mx-auto">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="titulo">Título da Demanda</Label>
              <Input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ex: Consulta Clínica Geral"
                required
              />
            </div>

            <div>
              <Label htmlFor="especialidade">Especialidade</Label>
              <select
                id="especialidade"
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option>Clínica Geral</option>
                <option>Cardiologia</option>
                <option>Dermatologia</option>
                <option>Oftalmologia</option>
                <option>Psicologia</option>
                <option>Fisioterapia</option>
              </select>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva a demanda"
                rows="4"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <Label htmlFor="localizacao">Localização</Label>
              <Input
                id="localizacao"
                name="localizacao"
                value={formData.localizacao}
                onChange={handleChange}
                placeholder="Ex: São Paulo - SP"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  name="data"
                  type="date"
                  value={formData.data}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input
                  id="valor"
                  name="valor"
                  type="number"
                  value={formData.valor}
                  onChange={handleChange}
                  placeholder="150,00"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold py-2.5 mt-6">
              <Plus size={16} className="mr-2" />
              Criar Demanda
            </Button>
          </form>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}
