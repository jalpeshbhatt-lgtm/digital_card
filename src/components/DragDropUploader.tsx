"use client";

import { useRef, useState } from "react";

type UploadItem = {
  file: File;
  preview: string;
  progress: number;
  url?: string;
};

export default function DragDropUploader({
  onChange,
}: {
  onChange: (urls: string[]) => void;
}) {
  const [items, setItems] = useState<UploadItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = async (item: UploadItem, index: number) => {
    const formData = new FormData();
    formData.append("file", item.file);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;

      const percent = Math.round((e.loaded / e.total) * 100);

      setItems((prev) => {
        const copy = [...prev];
        copy[index].progress = percent;
        return copy;
      });
    };

    xhr.open("POST", "/api/upload");

    xhr.onload = () => {
      const res = JSON.parse(xhr.response);

      setItems((prev) => {
        const copy = [...prev];
        copy[index].url = res.url;
        return copy;
      });

      const allUrls = [...items.map(i => i.url).filter(Boolean), res.url];
      onChange(allUrls as string[]);
    };

    xhr.send(formData);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newItems: UploadItem[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));

    setItems((prev) => [...prev, ...newItems]);

    newItems.forEach((item, i) => {
      uploadFile(item, items.length + i);
    });
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="border border-white/10 rounded-3xl p-6 bg-[#071132]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
    >
      {/* DROP AREA */}
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center cursor-pointer hover:border-violet-500 transition"
      >
        Drag & Drop Images or Click to Upload
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* PREVIEWS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden bg-[#020617] border border-white/10"
          >
            <img
              src={item.preview}
              className="w-full h-40 object-cover"
            />

            {/* PROGRESS BAR */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-800">
              <div
                className="h-full bg-violet-500 transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(index)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full text-white"
            >
              ×
            </button>

            {/* DONE BADGE */}
            {item.url && (
              <div className="absolute top-2 left-2 text-xs bg-green-500 px-2 py-1 rounded">
                Done
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}