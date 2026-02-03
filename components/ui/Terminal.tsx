'use client';

import { useEffect, useState, useRef } from 'react';
import { useTerminal } from './TerminalContext';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  text: string;
}

const pages = {
  home: '/#top',
  me: '/#intro',
  intro: '/#intro',
  about: '/#intro',
  projects: '/#projects',
  works: '/#projects',
  'projects/works': '/#projects',
  projectsworks: '/#projects',
  resume: '/resume',
  contact: '/#contact',
} as const;

export default function Terminal() {
  const { isOpen, setIsOpen, lines, addLine, clearLines } = useTerminal();
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState('');
  const [showGlow, setShowGlow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [canShowInitialToast, setCanShowInitialToast] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [typedText, setTypedText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set current time on mount
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        year: 'numeric',
        timeZone: 'America/Chicago'
      });
      setCurrentTime(time);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Decide if this page load should show the initial toast/typing (once per reload)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentPageId = String(window.performance.timeOrigin);
    const storedPageId = window.sessionStorage.getItem('terminalToastPageId');
    const storedShown = window.sessionStorage.getItem('terminalToastShown') === 'true';

    const alreadyShownThisLoad = storedPageId === currentPageId && storedShown;

    if (!alreadyShownThisLoad) {
      window.sessionStorage.setItem('terminalToastPageId', currentPageId);
      window.sessionStorage.setItem('terminalToastShown', 'true');
      setCanShowInitialToast(true);
    }
  }, []);

  // Show pulse glow only before the terminal is opened, and only on first load of the page
  useEffect(() => {
    if (isOpen) {
      setHasOpenedOnce(true);
      setShowToast(false);
      setShowGlow(false);
      return;
    }

    if (hasOpenedOnce || !canShowInitialToast) {
      setShowToast(false);
      setShowGlow(false);
      return;
    }

    setShowGlow(false); // Don't show glow immediately
    setShowToast(true);
    setTypedText(''); // Reset typing animation
    
    // Start glow after toast finishes typing: 4000ms (toast start) + 1350ms (typing duration) = ~5350ms
    const glowTimer = setTimeout(() => setShowGlow(true), 5350);
    // 3 glows × 2s each = 6s total
    const stopGlowTimer = setTimeout(() => setShowGlow(false), 5350 + 6000);
    
    return () => {
      clearTimeout(glowTimer);
      clearTimeout(stopGlowTimer);
    };
  }, [isOpen, hasOpenedOnce, canShowInitialToast]);

  // Typing animation for toast text - starts after hero text finishes
  useEffect(() => {
    if (!showToast) return;
    
    const fullText = '👋 Open terminal to explore!';
    let currentIndex = 0;
    
    // Delay before starting: 4500ms - 500ms = 4000ms
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      
      return () => clearInterval(typingInterval);
    }, 3500);
    
    return () => clearTimeout(startDelay);
  }, [showToast]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = (input: string) => {
    const trimmed = input.trim().toLowerCase();
    
    if (!trimmed) {
      addLine('command', input);
      return;
    }

    // Add command to history
    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    // Display the command
    addLine('command', input);

    // Process commands
    if (trimmed === 'help') {
      addLine('output', 'Available commands:');
      addLine('output', '  view <page>        - Navigate to section (Home, Me, Projects/Works, Resume, Contact)');
      addLine('output', '  ls                 - List available pages');
      addLine('output', '  clear              - Clear terminal');
      addLine('output', '  help               - Show this help message');
    } else if (trimmed === 'ls') {
      addLine('output', 'Home  Me  Projects/Works  Resume  Contact');
    } else if (trimmed === 'clear') {
      clearLines();
    } else if (trimmed.startsWith('view ')) {
      const page = trimmed.slice(5).trim().toLowerCase();
      const normalizedPage = page.replace(/\s+/g, '').replace(/\/+$/, '');
      const url =
        pages[page as keyof typeof pages] ??
        pages[normalizedPage as keyof typeof pages];
      
      if (url) {
        addLine('output', `Navigating to ${page}...`);
        setTimeout(() => {
          window.location.href = url;
        }, 500);
      } else {
        addLine('error', `Page not found: ${page}. Type "ls" to see available pages.`);
      }
    } else {
      addLine('error', `Command not found: ${trimmed}. Type "help" for available commands.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  return (
    <div className="fixed bottom-16 right-16 z-50 hidden lg:block">
      {/* Toast notification */}
      {showToast && !isOpen && (
        <div className="terminal-toast absolute -top-14 -left-48 whitespace-nowrap">
          <div className="bg-slate-800 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 border border-slate-700">
            <span>{typedText}</span>
            {typedText.length > 0 && (
              <button
                onClick={() => setShowToast(false)}
                className="ml-1 text-slate-400 hover:text-white transition-colors"
                title="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
      
      {!isOpen ? (
        // macOS Terminal icon
        <button
          onClick={() => {
            setIsOpen(true);
            setShowToast(false); // Hide toast when opening terminal
          }}
          className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-300 cursor-pointer group backdrop-blur-[15px] ${showGlow ? 'terminal-icon-glow' : ''}`}
          style={{
            backgroundColor: 'rgba(10, 12, 20, 0.72)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          title="Open Terminal"
        >
          <span className="text-white text-2xl font-light tracking-tight mr-4 -mt-4">&gt;_</span>
        </button>
      ) : (
        // macOS Terminal window
        <div className="bg-slate-950 border border-slate-700 rounded-lg w-screen sm:w-[700px] shadow-2xl flex flex-col overflow-hidden backdrop-blur-md">
          {/* macOS Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-600 px-4 py-2.5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer transition" onClick={() => setIsOpen(false)}></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer transition"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer transition"></div>
              </div>
              <span className="text-slate-300 font-mono text-sm ml-2">
                <span className="text-blue-400">📁</span> human@changliu.dev — bash — 80×24
              </span>
            </div>
          </div>

          {/* Terminal content with integrated input */}
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="font-mono text-sm text-white px-4 py-3 h-96 overflow-y-auto bg-slate-950 cursor-text"
            style={{ lineHeight: '1.2' }}
          >
            {/* Last login */}
            <div className="text-slate-500 mb-1">Last login: {currentTime} on ttys048</div>
            
            {/* Turing quote */}
            <div>
              <span className="text-purple-400">Turing@1950</span>
              <span className="text-purple-400"> ~$ "We can only see a short distance ahead,</span>
            </div>
            <div className="text-purple-400 mb-1">
              <span style={{ visibility: 'hidden' }}>Turing@1950 ~$ "</span>but we can see plenty there that needs to be done."
            </div>
            
            {/* Welcome message if no lines */}
            {lines.length === 0 && (
              <>
                <div className="flex items-baseline">
                  <span className="text-green-400">human@changliu.dev</span>
                  <span className="text-white"> ~ </span>
                  <span className="text-white">$</span>
                  <span className="text-white ml-1">Welcome to changliu.dev.</span>
                </div>
                <div className="text-white mb-1">Type "help" for commands</div>
              </>
            )}
            
            {/* Command history */}
            {lines.map((line, idx) => (
              <div key={idx}>
                {line.type === 'command' ? (
                  <div className="flex items-baseline">
                    <span className="text-green-400">human@changliu.dev</span>
                    <span className="text-white"> ~ </span>
                    <span className="text-white">$</span>
                    <span className="text-white ml-1">{line.text}</span>
                  </div>
                ) : line.type === 'error' ? (
                  <div className="text-red-400">{line.text}</div>
                ) : (
                  <div className="text-white">{line.text}</div>
                )}
              </div>
            ))}
            
            {/* Active input line */}
            <div className="flex items-baseline">
              <span className="text-green-400">human@changliu.dev</span>
              <span className="text-white"> ~ </span>
              <span className="text-white">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 bg-transparent text-white ml-1 outline-none font-mono text-sm caret-white border-0 p-0"
                style={{ minWidth: '10px' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
