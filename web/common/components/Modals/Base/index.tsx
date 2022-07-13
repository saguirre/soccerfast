import { CancelButton, ConfirmButton } from "@components";
import { classNames } from "@utils";
import { ModalBackgroundTint } from "./ModalBackground";
import { ModalTitle } from "./ModalTitle";
import { ModalCloseButton } from "./ModalCloseButton";

interface BaseModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  confirmMessage?: string;
  cancelMessage?: string;
  hideCloseIcon?: boolean;
  hideActionButtons?: boolean;
  zIndex?: 10 | 20 | 30 | 40 | 50;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  open,
  handleClose,
  children,
  onConfirm,
  onCancel,
  title,
  confirmMessage,
  cancelMessage,
  hideCloseIcon,
  hideActionButtons,
  zIndex,
}) => {
  return (
    <div className={`relative z-10 ${!open && "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background Tint */}
      <ModalBackgroundTint zIndex={zIndex || 0} />
      {/* Modal */}
      <div className={classNames(`z-${(zIndex || 0) + 10}`, "fixed inset-0 overflow-y-auto")}>
        <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
            className={`relative bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-6 lg:overflow-y-scroll`}
          >
            <div className="relative bg-white rounded-lg inset-0">
              {/* Modal Header */}
              {((title?.length || "") > 0 || !hideCloseIcon) && (
                <div className="flex flex-row justify-between items-center p-5 rounded-t">
                  {/* Modal Title */}
                  <ModalTitle text={title || ""} />
                  {/* Modal Close Button */}
                  {!hideCloseIcon && (
                    <div className="ml-10">
                      <ModalCloseButton onClick={handleClose} />
                    </div>
                  )}
                </div>
              )}
              {/* Modal Body */}
              <div className="p-8 space-y-6">{children}</div>
              {/* Modal Footer */}
              {!hideActionButtons && (
                <div className="flex justify-center items-center px-8 pb-8 space-x-2 rounded-b border-gray-200">
                  {/* Modal Cancel Action */}
                  <CancelButton message={cancelMessage || "No"} onClick={onCancel} />
                  {/* Modal Confirm Action */}
                  <ConfirmButton message={confirmMessage || "Yes"} onClick={onConfirm} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
