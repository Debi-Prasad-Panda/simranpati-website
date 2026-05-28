"use client";

import { useState } from "react";

type ImageUploaderProps = {
  label: string;
  onUpload: (url: string) => void;
};

export default function ImageUploader({ label, onUpload }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setMessage("Upload failed.");
      setIsUploading(false);
      return;
    }

    const data = await response.json();
    onUpload(data.url);
    setIsUploading(false);
    setMessage("Uploaded.");
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-[0.2em] text-on-surface-variant">
        {label}
      </label>
      <input className="w-full" onChange={handleChange} type="file" />
      {isUploading && (
        <p className="text-xs text-on-surface-variant">Uploading...</p>
      )}
      {message && <p className="text-xs text-on-surface-variant">{message}</p>}
    </div>
  );
}
