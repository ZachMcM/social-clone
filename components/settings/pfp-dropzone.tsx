"use client";

import { ChangeEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Edit, User, User2 } from "lucide-react";

export function PfpDropzone({
  initUrl,
  updateForm,
}: {
  initUrl?: string;
  updateForm: (file: File) => void;
}) {
  const [url, setUrl] = useState<string>(initUrl!);

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
        "w-32 aspect-square rounded-full relative bg-secondary",
        !url && "border",
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(e)}
        className="absolute inset-0 opacity-0 z-10 cursor-pointer"
      />
      {url ? (
        <Avatar className="w-full h-full">
          <AvatarImage src={url} />
        </Avatar>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <User2 className="h-16 w-16" />
        </div>
      )}

      <div className="absolute -bottom-2 -right-2 p-2 border bg-background rounded-md">
        <p className="flex items-center text-xs">
          Edit <Edit className="h-3 w-3 ml-1.5" />
        </p>
      </div>
    </div>
  );
}
