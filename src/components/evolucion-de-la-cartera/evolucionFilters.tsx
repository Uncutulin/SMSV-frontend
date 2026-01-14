import { Dispatch, SetStateAction } from 'react';

interface Periodo {
    anio: number;
}

interface Mes {
    mes_numero: number;
    mes_nombre: string;
}

// Define the shape of allFilters based on usage
interface FilterGroup {
    compania: string;
    anio: string;
    mes: string;
    tipo_filtro: string;
}

interface AllFilters {
    inicio: FilterGroup;
    fin: FilterGroup;
    productores: FilterGroup;
    ejecutivos: FilterGroup;
}

// Props interface based on what's used in the filter block
interface Props {
    allFilters: AllFilters;
    handleFilterChange: (grupo: keyof AllFilters, key: string, value: string) => void;
    loadingInicio: boolean;
    loadingFin: boolean;
    aniosInicio: Periodo[];
    mesesInicio: Mes[];
    aniosFin: Periodo[];
    mesesFin: Mes[];
    tipoVista: string;
    setTipoVista: Dispatch<SetStateAction<string>>;
    filtroProductor: string;
    setFiltroProductor: Dispatch<SetStateAction<string>>;
    filtroEjecutivo: string;
    setFiltroEjecutivo: Dispatch<SetStateAction<string>>;
    listaProductores: { nombre: string }[];
    listaEjecutivos: { nombre: string }[];
    loadingDropdowns: boolean;
    setFilterApplied: Dispatch<SetStateAction<boolean>>;
}

export default function EvolucionFilters({
    allFilters,
    handleFilterChange,
    loadingInicio,
    loadingFin,
    aniosInicio,
    mesesInicio,
    aniosFin,
    mesesFin,
    tipoVista,
    setTipoVista,
    filtroProductor,
    setFiltroProductor,
    filtroEjecutivo,
    setFiltroEjecutivo,
    listaProductores,
    listaEjecutivos,
    loadingDropdowns,
    setFilterApplied
}: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro</h3>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* Fecha Inicio */}
                <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-md font-medium text-blue-800 mb-3">Fecha Inicio</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={allFilters.inicio.anio}
                                onChange={(e) => handleFilterChange('inicio', 'anio', e.target.value)}
                                disabled={loadingInicio}
                            >
                                {aniosInicio.map((anio) => (
                                    <option key={anio.anio} value={anio.anio.toString()}>
                                        {anio.anio}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                            <select
                                value={allFilters.inicio.mes} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => handleFilterChange('inicio', 'mes', e.target.value)}
                                disabled={loadingInicio}
                            >
                                {mesesInicio.map((mes) => (
                                    <option key={mes.mes_numero} value={mes.mes_numero.toString().padStart(2, '0')}>
                                        {mes.mes_nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Fecha Fin */}
                <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-md font-medium text-green-800 mb-3">Fecha Fin</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                            <select
                                value={allFilters.fin.anio}
                                onChange={(e) => handleFilterChange('fin', 'anio', e.target.value)}
                                disabled={loadingFin}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {aniosFin.map((item) => (
                                    <option key={item.anio} value={item.anio.toString()}>
                                        {item.anio}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={allFilters.fin.mes}
                                onChange={(e) => handleFilterChange('fin', 'mes', e.target.value)}
                                disabled={loadingFin}
                            >
                                {mesesFin.map((mes) => (
                                    <option key={mes.mes_numero} value={mes.mes_numero.toString().padStart(2, '0')}>
                                        {mes.mes_nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtros en fila horizontal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Tipo de Vista */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vista</label>
                    <select
                        value={tipoVista}
                        onChange={(e) => setTipoVista(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <optgroup label="Vistas Generales">
                            <option value="TOTAL X CANAL">TOTAL X CANAL</option>
                            <option value="TOTAL X RAMO">TOTAL X RAMO</option>
                            <option value="TOTAL X CÍA">TOTAL X CÍA</option>
                        </optgroup>
                        <optgroup label="Vistas CAS">
                            <option value="CAS X CANAL">CAS X CANAL</option>
                            <option value="CAS X RAMO">CAS X RAMO</option>
                        </optgroup>
                        <optgroup label="Vistas ASSA">
                            <option value="ASSA X CANAL">ASSA X CANAL</option>
                            <option value="ASSA X RAMO">ASSA X RAMO</option>
                            <option value="ASSA X CÍA">ASSA X CÍA</option>
                        </optgroup>
                        <optgroup label="Vistas ART">
                            <option value="ART X CANAL">ART X CANAL</option>
                            <option value="ART X CÍA">ART X CÍA</option>
                        </optgroup>
                    </select>
                </div>

                {/* Filtro Productores */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Productores</label>
                    <select
                        value={filtroProductor}
                        onChange={(e) => {
                            setFiltroProductor(e.target.value);
                            if (e.target.value !== 'TODOS') setFiltroEjecutivo('TODOS');
                        }}
                        disabled={loadingDropdowns}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="TODOS">TODOS</option>
                        {listaProductores.map((productor) => (
                            <option key={productor.nombre} value={productor.nombre}>
                                {productor.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro Ejecutivo */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ejecutivo</label>
                    <select
                        value={filtroEjecutivo}
                        onChange={(e) => {
                            setFiltroEjecutivo(e.target.value);
                            if (e.target.value !== 'TODOS') setFiltroProductor('TODOS');
                        }}
                        disabled={loadingDropdowns}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="TODOS">TODOS</option>
                        {listaEjecutivos.map((ejecutivo) => (
                            <option key={ejecutivo.nombre} value={ejecutivo.nombre}>
                                {ejecutivo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Botón Aplicar Filtros */}
            <div className="flex justify-end hidden">
                <button
                    onClick={() => setFilterApplied(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md flex items-center gap-2"
                >
                    <i className="fa-solid fa-check text-white"></i>
                    Aplicar Filtros
                </button>
            </div>
        </div>
    );
}