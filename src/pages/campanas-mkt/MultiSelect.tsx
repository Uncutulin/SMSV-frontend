'use client';

import { useState, useRef, useEffect } from 'react';

export type SelectOption = string | { id: string | number; nombre: string };

interface MultiSelectProps {
    options: SelectOption[];
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

    const getOptionValue = (option: SelectOption) => typeof option === 'string' ? option : String(option.id);
    const getOptionLabel = (option: SelectOption) => typeof option === 'string' ? option : option.nombre;

    const handleToggleOption = (option: SelectOption) => {
        const val = getOptionValue(option);
        const newValue = value.includes(val)
            ? value.filter(v => v !== val)
            : [...value, val];
        onChange(newValue);
    };

    const handleSelectAll = () => {
        onChange(options.map(getOptionValue));
    };

    const filteredOptions = options.filter(option =>
        getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
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
                            className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700"
                            onClick={(e) => { e.stopPropagation(); handleSelectAll(); }}
                        >Todos</button>
                        <button
                            type="button"
                            className="text-[10px] bg-gray-400 text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-500"
                            onClick={(e) => { e.stopPropagation(); onChange([]); }}
                        >Ninguno</button>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.map(option => {
                            const val = getOptionValue(option);
                            const label = getOptionLabel(option);
                            return (
                                <label key={val} className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={value.includes(val)}
                                        onChange={() => handleToggleOption(option)}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span className="text-xs">{label}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}