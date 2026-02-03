import React, { useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div
                className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            <div
                className={`bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full w-full max-h-[90vh] flex flex-col duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 leading-6">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                    >
                        <span className="sr-only">Cerrar</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 py-4 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
