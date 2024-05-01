import { UploadToS3 } from "@/actions/upload-s3";
import { set } from "date-fns";
import { useState } from "react";

export const useUpload = () => {
  const [state, setState] = useState({ isLoading: false, error: "" });

  const fn = (data: FormData) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    UploadToS3(data).then().catch();
  };

  return { ...state, fn };
};
