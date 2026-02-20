import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { JornadaProvider, useJornada } from '@/lib/JornadaContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import CriarDemanda from '@/pages/CriarDemanda';
import CriarDemandaRecorrente from '@/pages/CriarDemandaRecorrente';

const { Pages, pagesProfissional, pagesConvenio } = pagesConfig;

const LayoutWrapper = ({ children, currentPageName }) => {
  return <>{children}</>;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const { jornada } = useJornada();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors gracefully
  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="p-8 bg-white rounded shadow text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Erro de Autenticação</h1>
          <p className="text-gray-600 mb-4">{authError.message || 'Falha ao carregar aplicação'}</p>
        </div>
      </div>
    );
  }

  // Determinar quais páginas usar baseado na jornada
  let pagesToUse = Pages;
  if (jornada === 'profissional') {
    pagesToUse = pagesProfissional;
  } else if (jornada === 'convenio') {
    pagesToUse = pagesConvenio;
  }

  const LandingPageComponent = Pages['LandingPage'];

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName="LandingPage">
          {LandingPageComponent && <LandingPageComponent />}
        </LayoutWrapper>
      } />
      {Object.entries(pagesToUse).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/CriarDemanda" element={
        <LayoutWrapper currentPageName="CriarDemanda">
          <CriarDemanda />
        </LayoutWrapper>
      } />
      <Route path="/CriarDemandaRecorrente" element={
        <LayoutWrapper currentPageName="CriarDemandaRecorrente">
          <CriarDemandaRecorrente />
        </LayoutWrapper>
      } />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <JornadaProvider>
            <NavigationTracker />
            <AuthenticatedApp />
          </JornadaProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
