import { ModalBackgroundTint } from '@components';
import { XCircleIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { classNames } from '@utils/*';

interface ImageViewerProps {
  image: string;
  open: boolean;
  isLast?: boolean;
  isFirst: boolean;
  handleClose: () => void;
  moveToNext: () => void;
  moveToPrevious: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  image,
  open,
  isLast,
  isFirst,
  handleClose,
  moveToNext,
  moveToPrevious,
}) => {
  return (
    <div className={`relative z-10 ${!open && 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background Tint */}
      <ModalBackgroundTint zIndex={10} />
      {/* Modal */}
      <div className="z-20 fixed inset-0 overflow-y-auto h-screen ">
        <div className="flex flex-row justify-center">
          <div className="flex items-center flex-grow justify-center h-screen w-lg text-center">
            <div
              className={classNames(
                !isFirst ? 'hover:cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-white ' : '',
                'mr-4 rounded-full flex items-center justify-center'
              )}
              onClick={moveToPrevious}
            >
              {!isFirst ? (
                <ChevronLeftIcon className="h-12 w-12 text-slate-200 hover:text-white" />
              ) : (
                <div className="h-12 w-12 bg-transparent"></div>
              )}
            </div>
            <div className={`relative rounded-lg text-left transform transition-all lg:overflow-y-scroll`}>
              <div className="relative rounded-lg inset-0">
                <img
                  src={image}
                  alt=""
                  className="max-w-lg max-h-screen object-cover pointer-events-none rounded-lg group-hover:opacity-75 h-fill p-4"
                />
              </div>
            </div>
            <div
              className={classNames(
                !isLast ? 'hover:cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-white ' : '',
                'mr-4 rounded-full flex items-center justify-center'
              )}
              onClick={moveToNext}
            >
              {!isLast ? (
                <ChevronRightIcon className="h-12 w-12 text-slate-200 hover:text-white" />
              ) : (
                <div className="h-12 w-12 bg-transparent"></div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-shrink justify-start items-end w-fill h-fill pt-6 pr-6">
            <button onClick={handleClose} className="rounded-full  hover:ring-1 hover:ring-white">
              <XCircleIcon className="h-14 w-14 text-slate-200 hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
