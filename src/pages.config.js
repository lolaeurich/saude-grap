/**
 * pages.config.js - Page routing configuration
 * 
 * Suporta duas jornadas: profissional e convenio
 */
import DemandasDisponiveis from './pages/DemandasDisponiveis';
import DetalhesDemanda from './pages/DetalhesDemanda';
import Financeiro from './pages/Financeiro';
import MinhasDemandas from './pages/MinhasDemandas';
import Perfil from './pages/Perfil';
import CriarDemanda from './pages/CriarDemanda';
import DemandasPublicadas from './pages/DemandasPublicadas';
import RelatoriosConvenio from './pages/RelatoriosConvenio';
import PerfilConvenio from './pages/PerfilConvenio';
import LandingPage from './pages/LandingPage';

// Páginas da Jornada do Profissional
export const PAGES_PROFISSIONAL = {
    "DemandasDisponiveis": DemandasDisponiveis,
    "DetalhesDemanda": DetalhesDemanda,
    "Financeiro": Financeiro,
    "MinhasDemandas": MinhasDemandas,
    "Perfil": Perfil,
};

// Páginas da Jornada do Convênio
export const PAGES_CONVENIO = {
    "DemandasPublicadas": DemandasPublicadas,
    "RelatoriosConvenio": RelatoriosConvenio,
    "PerfilConvenio": PerfilConvenio,
    "CriarDemanda": CriarDemanda,
};

// Todas as páginas
export const PAGES = {
    ...PAGES_PROFISSIONAL,
    ...PAGES_CONVENIO,
    "LandingPage": LandingPage,
}

export const pagesConfig = {
    mainPage: "LandingPage",
    Pages: PAGES,
    pagesProfissional: PAGES_PROFISSIONAL,
    pagesConvenio: PAGES_CONVENIO,
};