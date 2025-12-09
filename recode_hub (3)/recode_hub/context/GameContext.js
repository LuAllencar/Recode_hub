// context/GameContext.js
import React, { createContext, useState } from 'react';
import { devices as initialDevices, deviceCategories as initialCategories } from '../data/Devices';

export const GameContext = createContext({
  devices: [],
  setDevices: () => {},
  deviceCategories: [],
});

export function GameProvider({ children }) {
  // Inicializa dispositivos garantindo estrutura esperada
  const [devices, setDevices] = useState(
    (Array.isArray(initialDevices) ? initialDevices : []).map(device => ({
      ...device,
      // regra inicial: desbloqueia níveis 1 e 2 por exemplo
      unlocked: typeof device.unlocked === 'boolean' ? device.unlocked : device.level <= 2,
    }))
  );

  const [deviceCategories] = useState(Array.isArray(initialCategories) ? initialCategories : []);

  return (
    <GameContext.Provider value={{ devices, setDevices, deviceCategories }}>
      {children}
    </GameContext.Provider>
  );
}
