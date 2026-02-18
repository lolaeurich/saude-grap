import React, { createContext, useContext, useState } from 'react';

const JornadaContext = createContext();

export function JornadaProvider({ children }) {
  const [jornada, setJornada] = useState(null); // null, 'profissional', ou 'convenio'

  const escolherJornada = (tipo) => {
    setJornada(tipo);
    localStorage.setItem('jornada', tipo);
  };

  const resetarJornada = () => {
    setJornada(null);
    localStorage.removeItem('jornada');
  };

  return (
    <JornadaContext.Provider value={{ jornada, escolherJornada, resetarJornada }}>
      {children}
    </JornadaContext.Provider>
  );
}

export function useJornada() {
  const context = useContext(JornadaContext);
  if (!context) {
    throw new Error('useJornada deve ser usado dentro de JornadaProvider');
  }
  return context;
}
