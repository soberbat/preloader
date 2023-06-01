import React, { useEffect, useRef, useState } from "react";
import Preloader from "./classes/Preloader";

const usePreloder = (shouldStartPreloading: boolean) => {
  const [isPreloaded, setisPreloaded] = useState<boolean>(false);
  const [fileUrls, setfileUrls] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const preloader = useRef<Preloader | null>(null);

  const handleRequestEnd = (fileUrl: string) => {
    setisPreloaded(true);
    setfileUrls(fileUrl);
  };

  const handleProgress = (progress: number) => {
    setProgress(Math.ceil(progress * 100));
  };

  useEffect(() => {
    if (shouldStartPreloading) {
      preloader.current = new Preloader({ handleRequestEnd, handleProgress });
      preloader.current.getFileUrl();
    }
  }, [shouldStartPreloading]);

  return { isPreloaded, fileUrls, progress };
};

export default usePreloder;
