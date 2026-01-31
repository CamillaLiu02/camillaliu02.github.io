'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface TerminalContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lines: Array<{ type: 'command' | 'output' | 'error'; text: string }>;
  addLine: (type: 'command' | 'output' | 'error', text: string) => void;
  clearLines: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

const STORAGE_KEY = 'terminal_state';

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<Array<{ type: 'command' | 'output' | 'error'; text: string }>>([
    { type: 'output', text: '$ Welcome to changliu.dev.' },
    { type: 'output', text: 'Type "help" for commands' },
  ]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { isOpen: savedIsOpen, lines: savedLines } = JSON.parse(saved);
        setIsOpen(savedIsOpen);
        setLines(savedLines);
      }
    } catch (error) {
      console.error('Failed to restore terminal state:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ isOpen, lines }));
      } catch (error) {
        console.error('Failed to save terminal state:', error);
      }
    }
  }, [isOpen, lines, isHydrated]);

  const addLine = useCallback((type: 'command' | 'output' | 'error', text: string) => {
    setLines(prev => [...prev, { type, text }]);
  }, []);

  const clearLines = useCallback(() => {
    setLines([
      { type: 'output' as const, text: '$ Welcome to changliu.dev.' },
      { type: 'output' as const, text: 'Type "help" for commands' },
    ]);
  }, []);

  return (
    <TerminalContext.Provider value={{ isOpen, setIsOpen, lines, addLine, clearLines }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within TerminalProvider');
  }
  return context;
}
