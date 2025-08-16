import React, { createContext, useContext } from 'react';

const ThemeDataContext = createContext();

export const ThemeDataProvider = ThemeDataContext.Provider;

export function useThemeData() {
  return useContext(ThemeDataContext);
}