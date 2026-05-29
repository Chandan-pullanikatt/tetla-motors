"use client";

import dynamic from "next/dynamic";
import { Upload, X } from "lucide-react";

const CldUploadWidget = dynamic(
  () => import("next-cloudinary").then((m) => m.CldUploadWidget),
  { ssr: false }
);

interface VideoUploadProps {
  value: string;
  publicId?: string;
  onChange: (url: string, publicId: string) => void;
  onClear?: () => void;
}

export function VideoUpload({ value, publicId, onChange, onClear }: VideoUploadProps) {
  return (
    <div className="space-y-3">
      {value && (
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
          <video
            src={value}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
          {onClear && (
            <button
              onClick={onClear}
              className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>
      )}

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          resourceType: "video",
          maxFileSize: 200_000_000,
          clientAllowedFormats: ["mp4", "mov", "webm", "avi"],
        }}
        onSuccess={(result: any) => {
          const info = result.info;
          onChange(info.secure_url, info.public_id);
        }}
      >
        {({ open }: { open: () => void }) => (
          <button
            type="button"
            onClick={() => open()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors w-full justify-center"
          >
            <Upload size={15} />
            {value ? "Replace video" : "Upload video"}
          </button>
        )}
      </CldUploadWidget>

      {publicId && (
        <p className="text-xs text-gray-400 truncate">ID: {publicId}</p>
      )}
    </div>
  );
}
