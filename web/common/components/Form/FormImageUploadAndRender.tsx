import { FormLabel } from './FormLabel';

interface Props {
  openFileExplorer: () => void;
  loadingImageUpload?: boolean;
  newlyUploadedLogo: string | null;
  title: string;
  image?: string;
  changeButtonText: string;
  inputFileRef: any;
  handleSetImage: any;
}

export const FormImageUploadAndRender: React.FC<Props> = ({
  openFileExplorer,
  loadingImageUpload,
  newlyUploadedLogo,
  title,
  image,
  inputFileRef,
  handleSetImage,
  changeButtonText,
}) => {
  return (
    <div className="mr-4">
      <FormLabel labelText={title} />
      <div className="mt-1 flex items-center">
        <div className="flex justify-center items-center overflow-hidden h-14 w-10">
          <div>
            {loadingImageUpload ? (
              <svg
                role="status"
                className="inline w-5 h-5 mb-1 text-transparent animate-spin fill-sky-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              <div>
                {!newlyUploadedLogo ? (
                  <div>
                    {!image ? (
                      <div>
                        <svg className="h-14 w-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    ) : (
                      <img src={image} />
                    )}
                  </div>
                ) : (
                  <img src={newlyUploadedLogo} className="h-14 w-11" />
                )}
              </div>
            )}
          </div>
        </div>
        <input
          ref={inputFileRef}
          className="hidden"
          type="file"
          name="image"
          id="file"
          onChange={(e) => handleSetImage(e)}
        />
        <button
          type="button"
          onClick={openFileExplorer}
          className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          {changeButtonText}
        </button>
      </div>
    </div>
  );
};
