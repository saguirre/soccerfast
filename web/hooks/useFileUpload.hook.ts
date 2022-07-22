import { ChangeEvent, useState } from 'react';

export const useFileUpload = (upload: any) => {
  const [newlyUploadedLogo, setNewlyUploadedLogo] = useState<string | null>(null);
  const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);

  const handleSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event?.target;
    if (files?.length) {
      setLoadingImageUpload(true);
      const uploadedImage = await upload(files[0]);
      if (!uploadedImage) {
        return;
      }
      setNewlyUploadedLogo(uploadedImage);
      setLoadingImageUpload(false);
    }
  };

  return {
    loadingImageUpload,
    setLoadingImageUpload,
    newlyUploadedLogo,
    setNewlyUploadedLogo,
    handleSetImage,
  };
};
