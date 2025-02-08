import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface FilterPopupProps {
    isOpen: boolean;
    onClose: () => void;
    dataFilter: Record<any, any>;
    setDataFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setDataFilterNull: () => void;
    submitFilter: () => void;
    titleName?: string | null;
}

const FilterPopupLayout: React.FC<FilterPopupProps & {
    handleSubmit: () => void,
    children: React.ReactNode
}> = ({
    isOpen,
    handleSubmit,
    titleName,
    children,
    setDataFilterNull,
    onClose
}) => {
        const [visible, setVisible] = useState(isOpen);
        const handleClose = () => {
            setDataFilterNull()
            setVisible(false);
            setTimeout(() => onClose(), 250)
        }
        useEffect(() => {
            setVisible(isOpen);
        }, [isOpen]);
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
                <div
                    className={`bg-primary rounded-lg w-full max-w-md transition-transform
                        ${visible ? "scale-100" : "scale-0"}
                        max-w-[1100px] max-h-[80vh] min-h-fit 
                    `}
                >
                    <div className="flex items-center relative justify-between p-4 border-b border-gray-700">
                        <h2 className="text-xl font-bold text-orange-400 text-center w-full">{titleName || "Filter"}</h2>
                        <button
                            onClick={handleClose}
                            type="button"
                            className="text-gray-400 hover:text-gray-200 right-3 absolute transition-colors"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>
                    {children}
                    <div className="p-4 flex justify-end space-x-3 border-t border-gray-700">
                        <button
                            onClick={handleClose}
                            type="button"
                            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            type='button'
                            className="px-4 py-2 rounded bg-orange-400 text-white hover:bg-orange-500 transition-colors"
                        >
                            Use Filter
                        </button>
                    </div>
                </div>
            </div>
        )
    }
export type { FilterPopupProps };
export default FilterPopupLayout;