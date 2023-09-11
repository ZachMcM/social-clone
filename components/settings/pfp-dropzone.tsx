"use client";

import { ChangeEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Edit, User } from "lucide-react";

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
      updateForm(files[0])
      const fileUrl = URL.createObjectURL(files[0]);
      setUrl(fileUrl);
    }
  }

  return (
    <div className={cn("h-32 w-32 rounded-full relative", !url && "border")}>
      <input
        type="file"
        onChange={(e) => handleFileUpload(e)}
        className="absolute inset-0 opacity-0 z-10"
      />
        <Avatar className="w-full h-full">
          <AvatarImage src={url}/> 
          <AvatarFallback>
            <User className="h-16 w-16"/>
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 -right-2 p-2 border bg-background rounded-md">
          <p className="flex items-center text-xs">Edit <Edit className="h-3 w-3 ml-1.5"/></p>
        </div>
    </div>
  );
}
