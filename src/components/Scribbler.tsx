"use client";

import { useEffect, useRef, useState } from "react";

export default function Scribbler() {
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState("#bf9270"); // default Gold Accent
  const [brushSize, setBrushSize] = useState(3); // default thin

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Initialize and handle resize of the full-screen canvas
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      // Preserve canvas drawing on temporary resizing if possible, or just reset dimensions
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
      }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Restore drawing
      ctx.drawImage(tempCanvas, 0, 0);
      
      // Set line qualities
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isActive]);

  const getCoordinates = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX,
      y: clientY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const { x, y } = getCoordinates(e.nativeEvent);
    lastPosRef.current = { x, y };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    e.preventDefault(); // Prevent scrolling on touch devices while drawing

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e.nativeEvent);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPosRef.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      {/* Floating Mode Toggle Button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group border ${
          isActive
            ? "bg-ink-sepia text-paper-foundation border-paper-foundation/20"
            : "bg-accent-doodle text-paper-foundation border-outline-variant/30 hover:bg-ink-sepia"
        }`}
        title={isActive ? "Close drawing overlay" : "Draw a doodle on page"}
        aria-label="Toggle drawing canvas"
      >
        {isActive ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        )}
      </button>

      {/* Screen Canvas Overlay */}
      {isActive && (
        <>
          <canvas
            ref={canvasRef}
            className="fixed inset-0 z-40 touch-none cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {/* Floating Canvas Action Dock (Bottom Center) */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-paper-foundation/90 backdrop-blur-md border border-outline-variant/60 shadow-2xl rounded-full px-6 py-3 flex items-center gap-6 animate-fade-in">
            <span className="text-[9px] uppercase tracking-widest font-bold text-ink-sepia/60 select-none border-r border-outline-variant/30 pr-4">
              Ink Nib
            </span>

            {/* Colors */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setColor("#bf9270")}
                className={`w-6 h-6 rounded-full bg-[#bf9270] transition-all border ${
                  color === "#bf9270" ? "scale-125 border-ink-sepia ring-2 ring-[#bf9270]/20" : "border-transparent"
                }`}
                title="Gold Accent Ink"
              />
              <button
                onClick={() => setColor("#2d241e")}
                className={`w-6 h-6 rounded-full bg-[#2d241e] transition-all border ${
                  color === "#2d241e" ? "scale-125 border-accent-doodle ring-2 ring-[#2d241e]/20" : "border-transparent"
                }`}
                title="Sepia Ink"
              />
            </div>

            {/* Brush Sizes */}
            <div className="flex items-center gap-3 border-l border-outline-variant/30 pl-4">
              <button
                onClick={() => setBrushSize(3)}
                className={`flex items-center justify-center p-1 rounded transition-colors ${
                  brushSize === 3 ? "bg-container-warm text-ink-sepia" : "text-ink-sepia/50 hover:text-ink-sepia"
                }`}
                title="Thin Stroke"
              >
                <div className="w-1.5 h-1.5 bg-current rounded-full" />
              </button>
              <button
                onClick={() => setBrushSize(6)}
                className={`flex items-center justify-center p-1 rounded transition-colors ${
                  brushSize === 6 ? "bg-container-warm text-ink-sepia" : "text-ink-sepia/50 hover:text-ink-sepia"
                }`}
                title="Thick Stroke"
              >
                <div className="w-3 h-3 bg-current rounded-full" />
              </button>
            </div>

            {/* Clear Board */}
            <button
              onClick={clearCanvas}
              className="p-1 rounded text-ink-sepia/60 hover:text-red-600 hover:bg-red-50 transition-colors border-l border-outline-variant/30 pl-4"
              title="Clear drawings"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </>
  );
}
