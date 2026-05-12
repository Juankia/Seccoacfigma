'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Accessibility,
  Play,
  Pause,
  Square,
  X,
  Volume2,
  TextSelect,
  FileText,
  Keyboard,
} from 'lucide-react';

type PlaybackState = 'idle' | 'playing' | 'paused';
type StatusMessage = {
  text: string;
  tone: 'info' | 'success' | 'warn';
} | null;

const MIN_RATE = 0.6;
const MAX_RATE = 1.6;
const RATE_STEP = 0.1;
const DEFAULT_RATE = 1;
const STORAGE_KEY = 'coop-voice-assistant';
const MAIN_CONTENT_SELECTORS = ['main', '[role="main"]', '#main', 'article'];

function isBrowserSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function pickSpanishVoice(): SpeechSynthesisVoice | null {
  if (!isBrowserSpeechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;
  return (
    voices.find(v => v.lang?.toLowerCase().startsWith('es')) ||
    voices.find(v => v.default) ||
    voices[0] ||
    null
  );
}

function extractMainContent(): string {
  if (typeof document === 'undefined') return '';

  let root: HTMLElement | null = null;
  for (const selector of MAIN_CONTENT_SELECTORS) {
    root = document.querySelector<HTMLElement>(selector);
    if (root) break;
  }
  if (!root) root = document.body;

  const clone = root.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll(
      'script, style, noscript, nav, footer, [aria-hidden="true"], .voice-assistant-ignore'
    )
    .forEach(node => node.remove());

  const raw = clone.innerText || clone.textContent || '';
  return raw.replace(/\s+/g, ' ').trim();
}

function getSelectedText(): string {
  if (typeof window === 'undefined') return '';
  return (window.getSelection()?.toString() || '').trim();
}

export function VoiceAssistant() {
  const [supported, setSupported] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [playback, setPlayback] = useState<PlaybackState>('idle');
  const [rate, setRate] = useState<number>(DEFAULT_RATE);
  const [status, setStatus] = useState<StatusMessage>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const lastTextRef = useRef<string>('');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = useCallback((text: string, tone: 'info' | 'success' | 'warn' = 'info') => {
    setStatus({ text, tone });
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setStatus(null), 4000);
  }, []);

  const stop = useCallback(() => {
    if (!isBrowserSpeechSupported()) return;
    window.speechSynthesis.cancel();
    setPlayback('idle');
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!isBrowserSpeechSupported()) {
        announce('Tu navegador no soporta el asistente de voz.', 'warn');
        return;
      }
      const clean = text.trim();
      if (!clean) {
        announce('No se encontró texto para leer.', 'warn');
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = voiceRef.current?.lang || 'es-ES';
      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setPlayback('playing');
      utterance.onpause = () => setPlayback('paused');
      utterance.onresume = () => setPlayback('playing');
      utterance.onend = () => setPlayback('idle');
      utterance.onerror = () => {
        setPlayback('idle');
        announce('Ocurrió un error al reproducir la voz.', 'warn');
      };

      utteranceRef.current = utterance;
      lastTextRef.current = clean;
      window.speechSynthesis.speak(utterance);
    },
    [announce, rate]
  );

  const readSelection = useCallback(() => {
    const selected = getSelectedText();
    if (!selected) {
      announce('Selecciona primero un texto en la página.', 'warn');
      return;
    }
    announce('Leyendo el texto seleccionado.', 'info');
    speak(selected);
  }, [announce, speak]);

  const readMain = useCallback(() => {
    const content = extractMainContent();
    if (!content) {
      announce('No se encontró contenido principal para leer.', 'warn');
      return;
    }
    announce('Leyendo el contenido principal de la página.', 'info');
    speak(content);
  }, [announce, speak]);

  const togglePlayPause = useCallback(() => {
    if (!isBrowserSpeechSupported()) return;
    const synth = window.speechSynthesis;

    if (synth.speaking && !synth.paused) {
      synth.pause();
      setPlayback('paused');
      announce('Reproducción pausada.', 'info');
      return;
    }
    if (synth.paused) {
      synth.resume();
      setPlayback('playing');
      announce('Reanudando reproducción.', 'info');
      return;
    }
    const selected = getSelectedText();
    if (selected) {
      announce('Leyendo el texto seleccionado.', 'info');
      speak(selected);
      return;
    }
    readMain();
  }, [announce, readMain, speak]);

  const togglePanel = useCallback(() => {
    setOpen(prev => {
      const next = !prev;
      if (next) announce('Asistente de accesibilidad activado.', 'success');
      return next;
    });
  }, [announce]);

  useEffect(() => {
    if (!isBrowserSpeechSupported()) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      voiceRef.current = pickSpanishVoice();
    };
    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { rate?: number };
        if (typeof parsed.rate === 'number') {
          setRate(Math.min(MAX_RATE, Math.max(MIN_RATE, parsed.rate)));
        }
      }
    } catch {
      // ignore corrupted preferences
    }

    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ rate }));
    } catch {
      // ignore storage errors
    }
  }, [rate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.altKey || e.ctrlKey || e.metaKey) return;
      const key = e.key.toLowerCase();
      if (key === 'a') {
        e.preventDefault();
        togglePanel();
      } else if (key === 'p') {
        e.preventDefault();
        togglePlayPause();
      } else if (key === 's') {
        e.preventDefault();
        stop();
        announce('Reproducción detenida.', 'info');
      } else if (key === 'l') {
        e.preventDefault();
        readSelection();
      } else if (key === 'm') {
        e.preventDefault();
        readMain();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [announce, readMain, readSelection, stop, togglePanel, togglePlayPause]);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  if (!supported) {
    return null;
  }

  return (
    <div
      className="voice-assistant-ignore fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-3"
      role="region"
      aria-label="Asistente de accesibilidad por voz"
    >
      {open && (
        <div
          className="w-[19rem] max-w-[calc(100vw-3rem)] rounded-2xl border border-emerald-100 bg-white shadow-2xl ring-1 ring-black/5"
          role="dialog"
          aria-labelledby="voice-assistant-title"
        >
          <div className="flex items-center justify-between gap-2 rounded-t-2xl bg-emerald-700 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              <h2 id="voice-assistant-title" className="text-sm font-semibold">
                Asistente de voz
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Cerrar asistente de voz"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-3 px-4 py-4">
            <p className="text-xs text-gray-600">
              Lectura por voz en español. Selecciona texto y presiona{' '}
              <kbd className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[10px] text-gray-800">
                Alt + L
              </kbd>{' '}
              o usa los botones.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={readSelection}
                className="flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <TextSelect className="h-4 w-4" aria-hidden="true" />
                Leer selección
              </button>
              <button
                type="button"
                onClick={readMain}
                className="flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Leer página
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-2 py-2">
              <button
                type="button"
                onClick={togglePlayPause}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                aria-label={playback === 'playing' ? 'Pausar' : 'Reproducir'}
              >
                {playback === 'playing' ? (
                  <>
                    <Pause className="h-4 w-4" aria-hidden="true" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" aria-hidden="true" />
                    {playback === 'paused' ? 'Reanudar' : 'Reproducir'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  stop();
                  announce('Reproducción detenida.', 'info');
                }}
                className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="Detener reproducción"
              >
                <Square className="h-4 w-4" aria-hidden="true" />
                Detener
              </button>
            </div>

            <div>
              <label
                htmlFor="voice-rate"
                className="mb-1 flex items-center justify-between text-xs font-medium text-gray-700"
              >
                <span>Velocidad de lectura</span>
                <span className="font-mono text-[11px] text-gray-500">{rate.toFixed(1)}x</span>
              </label>
              <input
                id="voice-rate"
                type="range"
                min={MIN_RATE}
                max={MAX_RATE}
                step={RATE_STEP}
                value={rate}
                onChange={e => setRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-700"
                aria-label="Ajustar velocidad de lectura"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowShortcuts(s => !s)}
              className="flex w-full items-center justify-between rounded-md px-2 py-1 text-xs text-gray-600 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-expanded={showShortcuts}
            >
              <span className="flex items-center gap-1">
                <Keyboard className="h-3.5 w-3.5" aria-hidden="true" />
                Atajos de teclado
              </span>
              <span aria-hidden="true">{showShortcuts ? '−' : '+'}</span>
            </button>

            {showShortcuts && (
              <ul className="space-y-1 rounded-md bg-gray-50 px-3 py-2 text-[11px] text-gray-700">
                <li className="flex justify-between">
                  <span>Abrir / cerrar</span>
                  <kbd className="rounded bg-white px-1 font-mono">Alt + A</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Reproducir / pausar</span>
                  <kbd className="rounded bg-white px-1 font-mono">Alt + P</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Detener</span>
                  <kbd className="rounded bg-white px-1 font-mono">Alt + S</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Leer selección</span>
                  <kbd className="rounded bg-white px-1 font-mono">Alt + L</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Leer página</span>
                  <kbd className="rounded bg-white px-1 font-mono">Alt + M</kbd>
                </li>
              </ul>
            )}

            {status && (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-md px-2 py-1 text-[11px] ${
                  status.tone === 'warn'
                    ? 'bg-amber-50 text-amber-800'
                    : status.tone === 'success'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-gray-50 text-gray-700'
                }`}
              >
                {status.text}
              </p>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={togglePanel}
        aria-label={open ? 'Ocultar asistente de accesibilidad' : 'Activar asistente de accesibilidad por voz'}
        aria-pressed={open}
        aria-keyshortcuts="Alt+A"
        title="Asistente de accesibilidad (Alt + A)"
        className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 ${
          playback === 'playing'
            ? 'bg-emerald-600 ring-4 ring-emerald-200 animate-pulse'
            : 'bg-emerald-700 hover:bg-emerald-800'
        }`}
      >
        <Accessibility className="h-7 w-7" aria-hidden="true" />
        {playback === 'playing' && (
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
