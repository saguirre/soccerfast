import { ChangeEvent, useState } from 'react';

export const useFileUpload = (upload: any, inputFileRef: any) => {
  const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState();
  const openFileExplorer = () => {
    inputFileRef?.current?.click();
  };

  const handleSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event?.target;
    if (files?.length) {
      setLoadingImageUpload(true);
      const uploadedImage = await upload(files[0]);
      if (!uploadedImage) {
        return;
      }
      setUploadedImage(uploadedImage);
      setLoadingImageUpload(false);
    }
  };

  return {
    loadingImageUpload,
    setLoadingImageUpload,
    uploadedImage,
    setUploadedImage,
    inputFileRef,
    openFileExplorer,
    handleSetImage,
  };
};
