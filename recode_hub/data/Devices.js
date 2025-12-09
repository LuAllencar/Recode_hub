import React, { createContext, useState } from 'react';
import { devices as initialDevices, deviceCategories } from '../data/Devices';

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [devices, setDevices] = useState(
    initialDevices.map(device => ({
      ...device,
      unlocked: device.level <= 2, // regra inicial de desbloqueio
    }))
  );

  return (
    <GameContext.Provider
      value={{
        devices,
        setDevices,
        deviceCategories,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
