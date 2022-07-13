import { classNames } from "@utils";

interface ModalBackgroundTintProps {
  zIndex: 0 | 10 | 20 | 30 | 40 | 50 | undefined;
}

export const ModalBackgroundTint: React.FC<ModalBackgroundTintProps> = ({ zIndex }) => {
  return (
    <div
      className={classNames(`z-${zIndex || 0}`, "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity")}
    ></div>
  );
};
