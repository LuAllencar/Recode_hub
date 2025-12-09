export const colors = {
  // Background (Fundos)
  background: {
    primary: '#0a0a0f',      // Preto profundo
    secondary: '#141420',     // Cinza escuro
    card: 'rgba(20, 20, 30, 0.6)', // Card com transparência
  },

  // Cores de destaque (Neon)
  accent: {
    green: '#00ff88',         // Verde tech (principal)
    purple: '#7b2cbf',        // Roxo neon
    blue: '#00ccff',          // Azul ciano
    pink: '#ff006e',          // Rosa neon (alertas)
  },

  // Gradientes (para efeitos especiais)
  gradient: {
    primary: ['#00ff88', '#00ccff'],           // Verde → Azul
    secondary: ['#7b2cbf', '#ff006e'],         // Roxo → Rosa
    tech: ['#00ff88', '#00ccff', '#7b2cbf'],   // Arco-íris tech
  },

  // Textos
  text: {
    primary: '#e0e0e0',       // Branco suave
    secondary: '#a0a0a0',     // Cinza médio
    tertiary: '#6a6a6a',      // Cinza escuro
    inverse: '#0a0a0f',       // Preto (para fundos claros)
  },

  // Estados (sucesso, erro, etc)
  status: {
    success: '#00ff88',       // Verde
    warning: '#ffaa00',       // Laranja
    error: '#ff006e',         // Rosa/vermelho
    info: '#00ccff',          // Azul
  },

  // Borders e divisores
  border: {
    light: 'rgba(255, 255, 255, 0.1)',   // Branco transparente
    medium: 'rgba(255, 255, 255, 0.2)',
    neon: '#00ff88',                      // Verde neon
  },
};

// Exporta também as cores individualmente (atalho)
export const bg = colors.background;
export const accent = colors.accent;
export const text = colors.text;
export const border = colors.border;