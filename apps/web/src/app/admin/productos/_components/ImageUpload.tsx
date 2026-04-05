"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  currentUrl: string | null;
  onChange: (url: string | null) => void;
}

export default function ImageUpload({ currentUrl, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);

    // Preview local inmediato
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al subir la imagen");
        setPreview(currentUrl);
        return;
      }

      setPreview(data.url);
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión al subir la imagen");
      setPreview(currentUrl);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localUrl);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  function handleRemove() {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleInputChange}
      />

      {preview ? (
        /* Imagen actual o preview */
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video w-full max-w-sm">
          <Image
            src={preview}
            alt="Imagen del producto"
            fill
            className="object-cover"
            unoptimized
          />
          {/* Overlay con acciones */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 bg-white text-brand-night text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              Cambiar
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Eliminar
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-brand-gold" />
            </div>
          )}
        </div>
      ) : (
        /* Zona de drop / upload */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          disabled={uploading}
          className="w-full max-w-sm aspect-video rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-brand-gold hover:bg-brand-gold/5 transition-colors flex flex-col items-center justify-center gap-2 text-brand-night/40 hover:text-brand-gold disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <>
              <ImageIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Haz clic o arrastra una imagen</span>
              <span className="text-xs">JPG, PNG, WEBP · Máx. 4MB</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
