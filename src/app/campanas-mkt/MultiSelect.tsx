'use client';

import { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export function MultiSelect({ options, value, onChange, placeholder = "Seleccionar..." }: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggleOption = (option: string) => {
        const newValue = value.includes(option)
            ? value.filter(v => v !== option)
            : [...value, option];
        onChange(newValue);
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-1 overflow-hidden max-h-6">
                    {value.length > 0 ? (
                        <span className="text-xs font-medium text-blue-700">{value.length} seleccionados</span>
                    ) : (
                        <span className="text-gray-400 text-xs">{placeholder}</span>
                    )}
                </div>
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="p-2 border-b">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full px-2 py-1 text-xs border rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="flex gap-2 p-2 bg-gray-50 border-b">
                        <button
                            type="button"
                            className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded"
                            onClick={(e) => { e.stopPropagation(); onChange([...options]); }}
                        >Todos</button>
                        <button
                            type="button"
                            className="text-[10px] bg-gray-400 text-white px-2 py-1 rounded"
                            onClick={(e) => { e.stopPropagation(); onChange([]); }}
                        >Ninguno</button>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.map(option => (
                            <label key={option} className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={value.includes(option)}
                                    onChange={() => handleToggleOption(option)}
                                    className="mr-2"
                                />
                                <span className="text-xs">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}