"use client";

import { getSignedURL } from "@/actions/upload-s3";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export const MyDropZone = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.click();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageFile = e.target.files[0];
    Object.assign(imageFile, {
      preview: URL.createObjectURL(imageFile),
    });
    setFile(imageFile);
  };

  const unSelect = () => {
    setFile(undefined);
  };

  const handleUpload = async () => {
    if (!file) return;
    const signUrlResult = await getSignedURL();
    const url = signUrlResult.sucess.url;
    const res = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
    console.log(res);
  };
  return (
    <div className="h-44 w-56 flex flex-col justify-center items-center p-2  border-2 border-dotted border-black">
      {!file ? (
        <>
          <input
            ref={inputRef}
            onChange={handleChange}
            hidden
            type="file"
            id="imageInput"
          />
          <button
            onClick={onClick}
            className="bg-gray-300 h-full w-full flex items-center justify-center"
          >
            Click to upload files
          </button>
        </>
      ) : (
        <>
          <div className="h-full w-full relative">
            <div
              onClick={unSelect}
              className="-top-4 -right-4 h-8 rounded-2xl text-center w-8 absolute bg-gray-800 font-bold text-white text-xl"
            >
              x
            </div>
            <Image
              height={1}
              width={1}
              className="h-full w-full"
              src={file.preview}
              alt="image"
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
          </div>
          <button onClick={handleUpload}>upload</button>
        </>
      )}
    </div>
  );
};
