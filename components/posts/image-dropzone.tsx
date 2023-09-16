"use client";

import { ChangeEvent, useState } from "react";
import { Upload, UploadCloud } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ImageDropzone({
  updateForm,
}: {
  updateForm: (file: File) => void;
}) {
  const [url, setUrl] = useState<string>();

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files[0]) {
      updateForm(files[0]);
      const fileUrl = URL.createObjectURL(files[0]);
      setUrl(fileUrl);
    }
  }

  return (
    <div
      className={cn(
        "w-full aspect-square rounded-md border bg-background relative flex justify-center shadow-sm",
        !url && "hover:border-dashed duration-500 hover:opacity-80"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(e)}
        className="absolute inset-0 opacity-0 z-10 cursor-pointer"
      />
      {url ? (
        <Image src={url} fill alt={"uploaded image"} objectFit="contain"/>
        ) : (
        <div className="w-full h-full flex flex-col space-y-1 items-center justify-center">
          <UploadCloud className="h-16 w-16" />
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">Click to upload</span> or drag and drop.
          </p>
          <p className="text-xs text-muted-foreground">
            Any image file format.
          </p>
        </div>
      )}
    </div>
  );
}
