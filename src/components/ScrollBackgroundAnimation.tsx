import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sparkles, 
  Eye, 
  Pause, 
  Play, 
  Upload, 
  FolderUp, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Volume2,
  VolumeX,
  Radio,
  X
} from 'lucide-react';

interface FrameItem {
  filename: string;
  url: string;
}

interface ScrollBackgroundAnimationProps {
  frameDir?: string;
  targetSectionId?: string;
}

export const ScrollBackgroundAnimation: React.FC<ScrollBackgroundAnimationProps> = ({
  frameDir = '/frames',
  targetSectionId = 'who-is-sayan-stats',
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Frame list and state
  const [frames, setFrames] = useState<FrameItem[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [currentFrameNum, setCurrentFrameNum] = useState<number>(0);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  // Intensity preference: default to 'subtle' per user specification
  const [intensity, setIntensity] = useState<'subtle' | 'balanced' | 'vivid'>(() => {
    try {
      const saved = localStorage.getItem('sayan_bg_intensity');
      if (saved === 'subtle' || saved === 'balanced' || saved === 'vivid') return saved;
    } catch {
      // ignore
    }
    return 'subtle';
  });

  // Auto-dim state: dims background once scrolled past "Who is Sayan Nan?"
  const [autoDim, setAutoDim] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sayan_bg_autodim');
      if (saved !== null) return saved === 'true';
    } catch {
      // ignore
    }
    return true;
  });

  const [isPastWhoIsSayan, setIsPastWhoIsSayan] = useState<boolean>(false);
  const [hudOpen, setHudOpen] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Internal animation refs (avoiding re-renders during 60-120fps rAF loop)
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number>(0);
  const isReducedMotionRef = useRef<boolean>(false);

  // Web Audio API Ambient Soundscape Synthesizer
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.15);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(audioVolume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft low-pass filter for smooth ambient warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.connect(masterGain);

      // Dual harmonic binaural oscillators (108Hz / 216Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(108, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(216, ctx.currentTime);
      osc2.detune.setValueAtTime(4, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;

      audioCtxRef.current = ctx;
    } catch (e) {
      console.warn('Web Audio Ambient setup unavailable:', e);
    }
  }, [audioVolume]);

  const toggleAudio = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioEnabled) {
      if (!audioCtxRef.current) {
        initAudio();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(audioVolume, audioCtxRef.current.currentTime, 0.1);
      }
      setAudioEnabled(true);
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      }
      setAudioEnabled(false);
    }
  }, [audioEnabled, audioVolume, initAudio]);

  const handleVolumeChange = useCallback((vol: number) => {
    setAudioVolume(vol);
    if (gainNodeRef.current && audioCtxRef.current && audioEnabled) {
      gainNodeRef.current.gain.setTargetAtTime(vol, audioCtxRef.current.currentTime, 0.05);
    }
  }, [audioEnabled]);

  // Subtle scroll-reactive frequency modulation for dynamic responsive ambiance
  useEffect(() => {
    if (audioEnabled && audioCtxRef.current && osc1Ref.current) {
      const targetFreq = 108 + (scrollPercent * 0.12);
      osc1Ref.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.15);
    }
  }, [scrollPercent, audioEnabled]);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Persist intensity preference
  const handleSetIntensity = (lvl: 'subtle' | 'balanced' | 'vivid') => {
    setIntensity(lvl);
    try {
      localStorage.setItem('sayan_bg_intensity', lvl);
    } catch {
      // ignore
    }
  };

  // Toggle auto-dimming past target section
  const handleToggleAutoDim = () => {
    setAutoDim(prev => {
      const next = !prev;
      try {
        localStorage.setItem('sayan_bg_autodim', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Developer/Admin shortcut (Shift + H) to toggle the diagnostic HUD
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Shift + H toggles the developer telemetry HUD
      if (e.shiftKey && (e.key === 'H' || e.key === 'h')) {
        e.preventDefault();
        setHudOpen(prev => !prev);
      } else if (e.key === 'Escape' && hudOpen) {
        setHudOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hudOpen]);

  // Check if viewer has scrolled past the "Who is Sayan Nan?" section
  const checkDimState = useCallback(() => {
    const targetEl = document.getElementById(targetSectionId) || 
      document.querySelector('[data-who-is-sayan-section="true"]');
      
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      // When the bottom edge of the "Who is Sayan Nan?" section has scrolled past the top sticky header (~120px)
      const isPast = rect.bottom <= 120;
      setIsPastWhoIsSayan(isPast);
    } else {
      // On internal reading views (e.g., About, Services, Case Studies) that lack this specific section,
      // dim gracefully once the reader scrolls past the hero/banner area (> 280px)
      const isPast = window.scrollY > 280;
      setIsPastWhoIsSayan(isPast);
    }
  }, [targetSectionId]);

  // Natural sort helper for frame filenames (e.g. frame_1.jpg, frame_2.jpg, frame_10.jpg)
  // Natural sort helper for frame filenames (e.g. frame_1.jpg, frame_2.jpg, frame_10.jpg)
  const naturalSort = useCallback((a: string, b: string) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  }, []);

  // Fetch list of available frames from static manifest or dev server API, with guaranteed 240-frame fallback
  const fetchAvailableFrames = useCallback(async () => {
    setLoadingList(true);
    let loadedFiles: string[] = [];

    // 1. Try static manifest.json first (instant, production-ready for Vercel/Netlify)
    try {
      const manifestRes = await fetch(`${frameDir}/manifest.json`);
      if (manifestRes.ok) {
        const manifestData = await manifestRes.json();
        const list = Array.isArray(manifestData) ? manifestData : (manifestData.frames || []);
        if (Array.isArray(list) && list.length > 0) {
          loadedFiles = list;
        }
      }
    } catch {
      // Ignore static manifest fetch error and proceed to fallbacks
    }

    // 2. In local dev environment, check live /api/list-frames if manifest was not yet found
    if (loadedFiles.length === 0) {
      try {
        const apiRes = await fetch('/api/list-frames');
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (Array.isArray(apiData.frames) && apiData.frames.length > 0) {
            loadedFiles = apiData.frames;
          }
        }
      } catch {
        // Ignore API error
      }
    }

    // 3. Guaranteed Production Deterministic Fallback: standard 240 frame sequence
    if (loadedFiles.length === 0) {
      loadedFiles = Array.from({ length: 240 }, (_, i) => `frame_${String(i + 1).padStart(6, '0')}.jpg`);
    }

    if (loadedFiles.length > 0) {
      const sorted = [...loadedFiles].sort(naturalSort);
      const mapped: FrameItem[] = sorted.map(filename => ({
        filename,
        url: `${frameDir}/${filename}`
      }));
      setFrames(mapped);
      setUploadStatus(`Loaded ${mapped.length} animation frames.`);
    } else {
      setFrames([]);
    }
    setLoadingList(false);
  }, [frameDir, naturalSort]);

  useEffect(() => {
    fetchAvailableFrames();
  }, [fetchAvailableFrames]);

  // Handle uploaded files directly from user (via file picker or drag-and-drop)
  const handleUserFiles = useCallback(async (fileList: FileList | File[]) => {
    const validImageFiles = Array.from(fileList).filter(file => 
      /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name)
    );

    if (validImageFiles.length === 0) {
      setUploadStatus('No supported image files (.jpg, .png, .webp) detected.');
      return;
    }

    setUploadStatus(`Processing ${validImageFiles.length} supplied frames...`);

    // Sort files by natural name order
    validImageFiles.sort((a, b) => naturalSort(a.name, b.name));

    // 1. Immediately create local Object URLs for instant, zero-delay preview in browser
    const localFrames: FrameItem[] = validImageFiles.map(file => ({
      filename: file.name,
      url: URL.createObjectURL(file)
    }));
    setFrames(localFrames);
    setUploadStatus(`Active: ${localFrames.length} supplied frames ready. Uploading to server...`);

    // 2. Convert to base64 and persist to server /public/frames/ in chunks
    try {
      const readAsDataUrl = (file: File): Promise<{ filename: string; dataUrl: string }> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ filename: file.name, dataUrl: reader.result as string });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      const payloadFrames = await Promise.all(validImageFiles.map(readAsDataUrl));

      const res = await fetch('/api/upload-frames', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frames: payloadFrames })
      });

      if (res.ok) {
        setUploadStatus(`Successfully saved ${payloadFrames.length} frames to /public/frames!`);
      } else {
        setUploadStatus(`Running ${localFrames.length} frames in browser memory.`);
      }
    } catch (err) {
      console.warn('Persisting frames to server encountered error; operating in client memory:', err);
      setUploadStatus(`Running ${localFrames.length} frames smoothly in browser memory.`);
    }
  }, [naturalSort]);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUserFiles(e.dataTransfer.files);
    }
  };

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;

    const listener = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches) setIsPaused(true);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Preload frames when `frames` list updates
  useEffect(() => {
    if (frames.length === 0) {
      imagesRef.current = [];
      setImagesLoaded(0);
      return;
    }

    let isCancelled = false;
    const cache: HTMLImageElement[] = [];
    imagesRef.current = cache;
    let loadedCount = 0;

    // Load Frame 0 first for instantaneous render
    const firstImg = new Image();
    firstImg.src = frames[0].url;
    firstImg.onload = () => {
      if (isCancelled) return;
      cache[0] = firstImg;
      loadedCount++;
      setImagesLoaded(loadedCount);
      drawFrame(0);
    };

    // Load remaining frames
    frames.forEach((frame, idx) => {
      if (idx === 0) return;
      const img = new Image();
      img.src = frame.url;
      img.onload = () => {
        if (isCancelled) return;
        cache[idx] = img;
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      img.onerror = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [frames]);

  // High-performance Draw Frame on HTML5 Canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (frames.length === 0) {
      // If no frames supplied, render a clean, subtle ambient gradient mesh
      return;
    }

    // Find requested or nearest available loaded frame
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      let nearestImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < frames.length; offset++) {
        const left = frameIndex - offset;
        const right = frameIndex + offset;
        if (left >= 0 && imagesRef.current[left]?.complete) {
          nearestImg = imagesRef.current[left];
          break;
        }
        if (right < frames.length && imagesRef.current[right]?.complete) {
          nearestImg = imagesRef.current[right];
          break;
        }
      }
      img = nearestImg || imagesRef.current[0];
    }

    if (img && img.complete && img.naturalWidth > 0) {
      // Aspect-ratio cover calculation
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let drawX = 0;
      let drawY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        drawY = (height - drawHeight) / 2;
      } else {
        drawHeight = height;
        drawWidth = height * imgRatio;
        drawX = (width - drawWidth) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }
  }, [frames]);

  // Handle Resize and Retina DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        drawFrame(Math.round(currentFrameRef.current));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Scroll listener to update target frame index and check dimming threshold
  useEffect(() => {
    const onScroll = () => {
      // Evaluate if viewer has scrolled past "Who is Sayan Nan?"
      checkDimState();

      if (isPaused || frames.length === 0) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));

      setScrollPercent(Math.round(progress * 100));

      const targetIdx = progress * (frames.length - 1);
      targetFrameRef.current = targetIdx;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkDimState, { passive: true });
    window.addEventListener('hashchange', checkDimState, { passive: true });

    // Initial evaluation & delayed checks for view mounting
    checkDimState();
    const t1 = setTimeout(checkDimState, 100);
    const t2 = setTimeout(checkDimState, 350);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkDimState);
      window.removeEventListener('hashchange', checkDimState);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isPaused, frames.length, checkDimState]);

  // rAF Smooth Interpolation Loop (Linear Lerp with damping factor)
  useEffect(() => {
    let lastDrawnFrame = -1;

    const tick = () => {
      if (!isPaused && !isReducedMotionRef.current && frames.length > 0) {
        const diff = targetFrameRef.current - currentFrameRef.current;

        // Damping factor: 0.12 provides smooth cinematic gliding
        if (Math.abs(diff) > 0.005) {
          currentFrameRef.current += diff * 0.12;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }

        const roundedFrame = Math.min(
          frames.length - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );

        if (roundedFrame !== lastDrawnFrame) {
          lastDrawnFrame = roundedFrame;
          setCurrentFrameNum(roundedFrame + 1);
          drawFrame(roundedFrame);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameIdRef.current);
  }, [isPaused, frames.length, drawFrame]);

  // Theme and Dimming-aware opacity and filter tuning
  const themeStyles = useMemo(() => {
    const isDark = theme === 'dark';
    const isDimmed = autoDim && isPastWhoIsSayan;

    // Default subtle intensity tuning per user request
    let normalOpacity = isDark ? 0.38 : 0.28;
    let dimmedOpacity = isDark ? 0.10 : 0.07;

    if (intensity === 'balanced') {
      normalOpacity = isDark ? 0.80 : 0.60;
      dimmedOpacity = isDark ? 0.20 : 0.14;
    } else if (intensity === 'vivid') {
      normalOpacity = isDark ? 1.0 : 0.85;
      dimmedOpacity = isDark ? 0.28 : 0.20;
    }

    const computedOpacity = isDimmed ? dimmedOpacity : normalOpacity;

    // In light mode, maintain high contrast and clarity for text
    const filterClass = isDark
      ? 'filter-none'
      : 'contrast-[1.05] brightness-[1.02]';

    return {
      computedOpacity,
      isDimmed,
      filterClass,
    };
  }, [theme, intensity, autoDim, isPastWhoIsSayan]);

  return (
    <>
      {/* Hidden File Input for User Image Sequence Upload */}
      <input 
        ref={fileInputRef}
        type="file" 
        multiple 
        accept="image/png,image/jpeg,image/webp,image/avif" 
        className="hidden" 
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleUserFiles(e.target.files);
          }
        }}
      />

      {/* Global Drag-and-Drop Overlay */}
      {isDraggingOver && (
        <div 
          className="fixed inset-0 z-50 bg-amber-500/10 backdrop-blur-md border-4 border-dashed border-amber-500 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-strong)] shadow-2xl flex flex-col items-center gap-4 text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <FolderUp className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Drop Animation Frames Here</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Drop your image sequence (e.g. frame_000001.jpg, 0002.png) to bind them directly to the scroll animation engine.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Fullscreen Background Canvas Stage */}
      <div 
        id="scroll-background-container"
        aria-hidden="true"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      >
        <canvas
          ref={canvasRef}
          style={{ opacity: themeStyles.computedOpacity }}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out will-change-transform ${themeStyles.filterClass}`}
        />

        {/* Ambient Vignette Overlay for Crisp Typography Legibility */}
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-35" 
        />
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, var(--bg-primary) 100%)'
          }}
        />

        {/* Soft Focused Reading Veil: Fades in smoothly when scrolled past 'Who is Sayan Nan?' */}
        <div 
          className={`absolute inset-0 pointer-events-none bg-[var(--bg-primary)] transition-opacity duration-700 ease-out ${
            themeStyles.isDimmed ? 'opacity-40 dark:opacity-45' : 'opacity-0'
          }`}
        />
      </div>

      {/* When No Frames Are Found in Dev: Banner Prompter (Completely suppressed in production) */}
      {!import.meta.env.PROD && frames.length === 0 && !loadingList && (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="fixed top-20 right-4 z-40 max-w-sm p-4 rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-xl border border-amber-500/40 shadow-xl space-y-3 pointer-events-auto"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <FolderUp className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">
                Connect Supplied Animation Frames
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                The scroll animation engine is active and waiting for your image sequence. Place your frames in <code className="px-1 py-0.5 rounded bg-[var(--bg-secondary)] font-mono text-[10px]">/public/frames/</code> or select them below:
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-neutral-950 transition-colors shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Select Frames</span>
            </button>
            <button
              type="button"
              onClick={fetchAvailableFrames}
              title="Rescan /public/frames/"
              className="p-2 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] transition-colors border border-[var(--border-subtle)]"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          {uploadStatus && (
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">
              {uploadStatus}
            </p>
          )}
        </div>
      )}

      {/* Developer Telemetry & Ambient Controls (Hidden from clients; press Shift + H to toggle) */}
      {hudOpen && (
        <aside 
          id="executive-ambient-hud-dock"
          aria-label="Developer Telemetry & Animation Dock"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="fixed bottom-4 left-4 z-50 font-mono pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="w-84 sm:w-92 p-4 rounded-2xl bg-[var(--bg-card)]/98 backdrop-blur-2xl border border-[var(--border-strong)] shadow-2xl text-xs space-y-3.5">
            {/* Header with Close and Shortcut Indicator */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold text-[11px] tracking-wider uppercase text-[var(--text-primary)]">
                  Developer Telemetry HUD
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  Shift + H
                </span>
                <button
                  type="button"
                  onClick={() => setHudOpen(false)}
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                  aria-label="Close developer HUD"
                  title="Close (or press Esc / Shift+H)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Frame & Progress Metrics */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block">Active Frame</span>
                <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">
                  {frames.length > 0 ? `#${String(currentFrameNum).padStart(3, '0')}` : 'None'}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {frames.length > 0 ? ` / ${frames.length}` : ' (awaiting)'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block">Scroll Depth</span>
                <span className="font-bold text-[var(--text-primary)] text-sm">{scrollPercent}%</span>
                <span className="text-[10px] text-[var(--text-muted)]"> viewport</span>
              </div>
            </div>

            {/* Audio Ambient Synthesizer Controls */}
            <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {audioEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    Ambient Audio Synthesizer
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                    audioEnabled 
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30' 
                      : 'bg-neutral-500/20 text-neutral-400 border border-neutral-500/30'
                  }`}
                >
                  {audioEnabled ? 'Active' : 'Muted'}
                </button>
              </div>
              {audioEnabled && (
                <div className="flex items-center gap-2 pt-1 text-[10px]">
                  <span className="text-[9px] text-[var(--text-muted)]">Volume</span>
                  <input
                    type="range"
                    min="0"
                    max="0.4"
                    step="0.02"
                    value={audioVolume}
                    aria-label="Ambient volume"
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="flex-1 accent-amber-500 h-1 bg-[var(--bg-card)] rounded-lg cursor-pointer"
                  />
                  <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400">
                    {Math.round(audioVolume * 250)}%
                  </span>
                </div>
              )}
            </div>

            {/* Focus Mode & Auto-Dim Status Card */}
            <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    Text Focus Auto-Dim
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAutoDim}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                    autoDim 
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30' 
                      : 'bg-neutral-500/20 text-neutral-400 border border-neutral-500/30'
                  }`}
                  title="Toggle automatic background dimming past 'Who is Sayan Nan?'"
                >
                  {autoDim ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                {themeStyles.isDimmed 
                  ? 'Background is dimmed for razor-sharp on-screen text focus (scrolled past "Who is Sayan Nan?").' 
                  : 'Subtle ambient background visible (currently viewing Hero or "Who is Sayan Nan?").'}
              </p>
            </div>

            {/* Scrub Progress Bar */}
            {frames.length > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                  <span>Buffered Sequence</span>
                  <span>{imagesLoaded}/{frames.length} loaded</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${(imagesLoaded / frames.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Frame Management Section */}
            <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)]/70 border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-[var(--text-primary)]">Supplied Frame Sequence</span>
                <span className="text-[var(--text-muted)]">
                  {frames.length > 0 ? `${frames.length} frames linked` : 'No frames loaded'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-amber-500 hover:bg-amber-600 text-neutral-950 transition-colors cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>{frames.length > 0 ? 'Replace Frames' : 'Upload Frames'}</span>
                </button>
                <button
                  type="button"
                  onClick={fetchAvailableFrames}
                  className="p-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                  title="Rescan /public/frames"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {uploadStatus && (
                <p className="text-[9px] text-amber-600 dark:text-amber-400 font-mono break-words leading-tight">
                  {uploadStatus}
                </p>
              )}
            </div>

            {/* Play/Pause & Intensity Controls */}
            {frames.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[var(--text-muted)]">Fluid Scroll Scrub</span>
                  <button
                    type="button"
                    onClick={() => setIsPaused(p => !p)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                      isPaused 
                        ? 'bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/30' 
                        : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                    <span>{isPaused ? 'Paused' : 'Active'}</span>
                  </button>
                </div>

                {/* Intensity Presets */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[var(--text-muted)]">Intensity:</span>
                    {intensity === 'subtle' && (
                      <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 font-semibold">(Preferred)</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {(['subtle', 'balanced', 'vivid'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleSetIntensity(lvl)}
                        className={`px-2 py-0.5 rounded text-[10px] capitalize transition-colors cursor-pointer ${
                          intensity === lvl
                            ? 'bg-amber-500 text-neutral-950 font-bold'
                            : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  );
};
