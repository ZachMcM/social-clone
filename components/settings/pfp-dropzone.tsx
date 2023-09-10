"use client";

import { ChangeEvent, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

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
    <div className="h-[200px] w-full border border-dashed rounded-md flex justify-center items-center relative hover:bg-secondary duration-500">
      <input
        type="file"
        onChange={(e) => handleFileUpload(e)}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />
      {
        url &&
        <Avatar className="h-16 w-16">
          <AvatarImage src={url}/>  
        </Avatar>
      }
    </div>
  );
}
