import { XMarkIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, isOpen, onClose }) {
  if(!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
          <div className="flex justify-between items-center mb-4 pb-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="flex text-gray-600 hover:text-gray-950">
              <XMarkIcon className="h-5 w-5"/>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;