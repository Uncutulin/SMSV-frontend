'use client';

import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { storeIPC, getIPCList, getIpcAnios, getIpcMeses, updateIPC, deleteIPC, type IpcMes, type Pagination } from '@/services/ipcService';

// Componente de Select Múltiple con Búsqueda
interface MultiSelectWithSearchProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label: string;
}

function MultiSelectWithSearch({ options, value, onChange, placeholder = "Seleccionar opciones", label }: MultiSelectWithSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    onChange(value.filter(v => v !== optionToRemove));
  };

  const handleSelectAll = () => {
    onChange([...options]);
  };

  const handleDeselectAll = () => {
    onChange([]);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayText = value.length > 0
    ? `${value.length} opción(es) seleccionada(s)`
    : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Campo principal que muestra las opciones seleccionadas */}
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white min-h-[42px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1 min-h-[20px]">
            {value.length > 0 ? (
              value.map(option => (
                <span
                  key={option}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {option}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(option);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-500">{displayText}</span>
            )}
          </div>
          <div className="flex items-center">
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Dropdown con búsqueda y opciones */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {/* Campo de búsqueda */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-2">
            <input
              type="text"
              placeholder="Buscar opciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Botones de Seleccionar Todos / Deseleccionar Todos */}
          <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectAll();
              }}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Seleccionar Todos
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeselectAll();
              }}
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Deseleccionar Todos
            </button>
          </div>

          {/* Lista de opciones */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <label
                  key={option}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option)}
                    onChange={() => handleToggleOption(option)}
                    className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                No se encontraron opciones
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export interface IPCData {
  id: string;
  mes: string;
  ipcMes: number;
  ipcYtd: number;
  ipcInteranual: number;
  // Nuevos campos de clasificación
  assaCasArt: string[];
  ramaUnificada: string[];
  ramDes: string[];
  artCod: string[];
  descProducto: string[];
  cia: string[];
  canal: string[];
  segmento: string[];
  ecEjecutivo: string[];
  // Nuevos campos de porcentajes
  discrecionalAnualQ: number;
  discrecionalAnualPrima: number;
}

export default function IPCPage() {
  const [ipcData, setIpcData] = useState<IPCData[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filtros
  const [anios, setAnios] = useState<number[]>([]);
  const [meses, setMeses] = useState<IpcMes[]>([]);
  const [selectedAnio, setSelectedAnio] = useState<number | ''>('');
  const [selectedMes, setSelectedMes] = useState<number | ''>('');

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAnio, selectedMes]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [aniosData, mesesData] = await Promise.all([
          getIpcAnios(),
          getIpcMeses()
        ]);
        setAnios(aniosData);
        setMeses(mesesData);

        // Auto-seleccionar el año más reciente si está disponible
        if (aniosData && aniosData.length > 0) {
          const maxAnio = Math.max(...aniosData);
          setSelectedAnio(maxAnio);
        }
      } catch (error) {
        console.error('Error loading filters:', error);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const fetchIPCList = async () => {
      try {
        setIsLoading(true);
        const response = await getIPCList(selectedAnio, selectedMes, currentPage);
        setIpcData(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Error fetching IPC data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIPCList();
  }, [selectedAnio, selectedMes, currentPage]);

  const [formData, setFormData] = useState({
    mes: '',
    ipcMes: '',
    ipcYtd: '',
    ipcInteranual: '',
    // Nuevos campos de clasificación
    assaCasArt: [] as string[],
    ramaUnificada: [] as string[],
    ramDes: [] as string[],
    artCod: [] as string[],
    descProducto: [] as string[],
    cia: [] as string[],
    canal: [] as string[],
    segmento: [] as string[],
    ecEjecutivo: [] as string[],
    // Nuevos campos de porcentajes
    discrecionalAnualQ: '',
    discrecionalAnualPrima: ''
  });

  const handleAdd = async () => {
    if (!formData.mes || !formData.ipcMes || !formData.ipcYtd || !formData.ipcInteranual) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    try {
      await storeIPC({
        periodo_yyyymm: parseInt(formData.mes),
        fuente: formData.assaCasArt[0] || '',
        nombre_compania: formData.cia.join(','), // Uniendo con comas si hay múltiples
        nombre_ramo: formData.ramaUnificada.join(','),
        cod_canal: formData.canal.join(','),
        nombre_segmento: formData.segmento.join(','),
        ipc_mensual: parseFloat(formData.ipcMes),
        ipc_ytd: parseFloat(formData.ipcYtd),
        ipc_interanual: parseFloat(formData.ipcInteranual),
        disc_anual_q: formData.discrecionalAnualQ ? parseFloat(formData.discrecionalAnualQ) : 0,
        disc_anual_prima: formData.discrecionalAnualPrima ? parseFloat(formData.discrecionalAnualPrima) : 0,
        fuente_registro: 'Manual'
      });

      setFormData({
        mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '',
        assaCasArt: [], ramaUnificada: [], ramDes: [], artCod: [], descProducto: [],
        cia: [], canal: [], segmento: [], ecEjecutivo: [],
        discrecionalAnualQ: '', discrecionalAnualPrima: ''
      });

      setIsLoading(true);
      const response = await getIPCList(selectedAnio, selectedMes, currentPage);
      setIpcData(response.data);
      setPagination(response.pagination);
      setIsLoading(false);

      alert('Registro guardado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al guardar el registro: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  };

  const handleEdit = (id: string) => {
    const item = ipcData.find(data => data.id === id);
    if (item) {
      setFormData({
        mes: item.mes,
        ipcMes: item.ipcMes.toString(),
        ipcYtd: item.ipcYtd.toString(),
        ipcInteranual: item.ipcInteranual.toString(),
        // Nuevos campos de clasificación
        assaCasArt: item.assaCasArt,
        ramaUnificada: item.ramaUnificada,
        ramDes: item.ramDes,
        artCod: item.artCod,
        descProducto: item.descProducto,
        cia: item.cia,
        canal: item.canal,
        segmento: item.segmento,
        ecEjecutivo: item.ecEjecutivo,
        // Nuevos campos de porcentajes
        discrecionalAnualQ: item.discrecionalAnualQ.toString(),
        discrecionalAnualPrima: item.discrecionalAnualPrima.toString()
      });
      setEditingId(id);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await updateIPC(editingId, {
        periodo_yyyymm: parseInt(formData.mes),
        fuente: formData.assaCasArt[0] || '',
        ipc_mensual: parseFloat(formData.ipcMes),
        ipc_ytd: parseFloat(formData.ipcYtd),
        ipc_interanual: parseFloat(formData.ipcInteranual),
        disc_anual_q: formData.discrecionalAnualQ ? parseFloat(formData.discrecionalAnualQ) : 0,
        disc_anual_prima: formData.discrecionalAnualPrima ? parseFloat(formData.discrecionalAnualPrima) : 0
      });

      setFormData({
        mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '',
        assaCasArt: [], ramaUnificada: [], ramDes: [], artCod: [], descProducto: [],
        cia: [], canal: [], segmento: [], ecEjecutivo: [],
        discrecionalAnualQ: '', discrecionalAnualPrima: ''
      });
      setEditingId(null);

      setIsLoading(true);
      const response = await getIPCList(selectedAnio, selectedMes, currentPage);
      setIpcData(response.data);
      setPagination(response.pagination);
      setIsLoading(false);

      alert('Registro actualizado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el registro: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
      try {
        await deleteIPC(id);
        
        setIsLoading(true);
        const response = await getIPCList(selectedAnio, selectedMes, currentPage);
        setIpcData(response.data);
        setPagination(response.pagination);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert('Error al eliminar el registro: ' + (error instanceof Error ? error.message : 'Error desconocido'));
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '',
      assaCasArt: [], ramaUnificada: [], ramDes: [], artCod: [], descProducto: [],
      cia: [], canal: [], segmento: [], ecEjecutivo: [],
      discrecionalAnualQ: '', discrecionalAnualPrima: ''
    });
    setEditingId(null);
  };

  const handleClean = () => {
    setFormData({
      mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '',
      assaCasArt: [], ramaUnificada: [], ramDes: [], artCod: [], descProducto: [],
      cia: [], canal: [], segmento: [], ecEjecutivo: [],
      discrecionalAnualQ: '', discrecionalAnualPrima: ''
    });
  };

  return (
    <DashboardLayout>
      <div className="flex-1 pb-6 px-4 w-full h-full">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Administración IPC</h1>
          <p className="text-gray-600 mt-2 pb-6"></p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Editar Registro IPC' : 'Agregar Nuevo Registro IPC'}
          </h2>

          {/* Campos básicos IPC */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">Datos Básicos IPC</h3>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mes (YYYYMM) *
                </label>
                <input
                  type="text"
                  placeholder="202501"
                  value={formData.mes}
                  onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % IPC Mes *
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="1.90"
                  value={formData.ipcMes}
                  onChange={(e) => setFormData({ ...formData, ipcMes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % IPC YTD *
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="1.90"
                  value={formData.ipcYtd}
                  onChange={(e) => setFormData({ ...formData, ipcYtd: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % IPC Interanual *
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="36.55"
                  value={formData.ipcInteranual}
                  onChange={(e) => setFormData({ ...formData, ipcInteranual: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % Discreción Anual Q
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.discrecionalAnualQ}
                  onChange={(e) => setFormData({ ...formData, discrecionalAnualQ: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % Discreción Anual PRIMA
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.discrecionalAnualPrima}
                  onChange={(e) => setFormData({ ...formData, discrecionalAnualPrima: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Campos de clasificación */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">Clasificación y Categorización</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ASSA - CAS - ART
                </label>
                <select
                  value={formData.assaCasArt[0] || ''}
                  onChange={(e) => setFormData({ ...formData, assaCasArt: e.target.value ? [e.target.value] : [] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="ASSA">ASSA</option>
                  <option value="CAS">CAS</option>
                  <option value="ART">ART</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <MultiSelectWithSearch
                  label="RAMA UNIFICADA"
                  options={[
                    "ACC.PERSONALES COLECTIVO", "ACC. PERSONALES INDIVIDUAL", "AP BOLSO", "ARMAS",
                    "BOLSO PROTEGIDO", "ESCOLTA", "ESCOLTA EJERCITO", "ROBO", "SALDO DEUDOR",
                    "SDJM - EA + ARA", "SDJM - FAA + ARA + EA", "SEPELIO COLECTIVO", "SEPELIO INDIVIDUAL",
                    "V.COLECTIVO C/AHORRO", "VIDA COLECTIVO", "VIDA DIBA", "VIDA INDIV C/AHORRO",
                    "VIDA INDIVIDUAL", "VIDA OBLIGATORIO", "ART", "AUTOMOTORES", "AERONAVEGACIÓN",
                    "AP", "CASCOS", "COMBINADO FAMILIAR", "INCENDIO", "INT. COMERCIO", "INT. CONSORCIO",
                    "MOTOS", "PRAXIS", "RC", "RS. VS.", "SALUD", "SEGURO TÉCNICO", "TRO",
                    "VIDA INDIVIDUAL CON AHORRO", "TRANSPORTES", "CAUCIÓN", "ASISTENCIA AL VIAJERO"
                  ]}
                  value={formData.ramaUnificada}
                  onChange={(value) => setFormData({ ...formData, ramaUnificada: value })}
                />
              </div>

              <div className="md:col-span-1">
                <MultiSelectWithSearch
                  label="RamDes"
                  options={[
                    "ACC.PERSONALES COLECTIVO", "ACC. PERSONALES INDIVIDUAL", "AP BOLSO", "ARMAS",
                    "BOLSO PROTEGIDO", "ESCOLTA", "ESCOLTA EJERCITO", "ROBO", "SALDO DEUDOR",
                    "SDJM - EA + ARA", "SDJM - FAA + ARA + EA", "SEPELIO COLECTIVO", "SEPELIO INDIVIDUAL",
                    "V.COLECTIVO C/AHORRO", "VIDA COLECTIVO", "VIDA DIBA", "VIDA INDIV C/AHORRO",
                    "VIDA INDIVIDUAL", "VIDA OBLIGATORIO", "ART", "AUTOMOTORES", "AERONAVEGACIÓN",
                    "AP", "CASCOS", "COMBINADO FAMILIAR", "INCENDIO", "INT. COMERCIO", "INT. CONSORCIO",
                    "MOTOS", "PRAXIS", "RC", "RS. VS.", "SALUD", "SEGURO TÉCNICO", "TRO",
                    "VIDA INDIVIDUAL CON AHORRO", "TRANSPORTES", "CAUCIÓN", "ASISTENCIA AL VIAJERO"
                  ]}
                  value={formData.ramDes}
                  onChange={(value) => setFormData({ ...formData, ramDes: value })}
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ArtCod
                </label>
                <input
                  type="text"
                  placeholder="Código de artículo"
                  value={formData.artCod[0] || ''}
                  onChange={(e) => setFormData({ ...formData, artCod: e.target.value ? [e.target.value] : [] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-1">
                <MultiSelectWithSearch
                  label="Desc Producto"
                  options={[
                    "ACC.PERSONALES COLECTIVO", "ACC. PERSONALES INDIVIDUAL", "AP BOLSO", "ARMAS",
                    "BOLSO PROTEGIDO", "ESCOLTA", "ESCOLTA EJERCITO", "ROBO", "SALDO DEUDOR",
                    "SDJM - EA + ARA", "SDJM - FAA + ARA + EA", "SEPELIO COLECTIVO", "SEPELIO INDIVIDUAL",
                    "V.COLECTIVO C/AHORRO", "VIDA COLECTIVO", "VIDA DIBA", "VIDA INDIV C/AHORRO",
                    "VIDA INDIVIDUAL", "VIDA OBLIGATORIO", "ART", "AUTOMOTORES", "AERONAVEGACIÓN",
                    "AP", "CASCOS", "COMBINADO FAMILIAR", "INCENDIO", "INT. COMERCIO", "INT. CONSORCIO",
                    "MOTOS", "PRAXIS", "RC", "RS. VS.", "SALUD", "SEGURO TÉCNICO", "TRO",
                    "VIDA INDIVIDUAL CON AHORRO", "TRANSPORTES", "CAUCIÓN", "ASISTENCIA AL VIAJERO"
                  ]}
                  value={formData.descProducto}
                  onChange={(value) => setFormData({ ...formData, descProducto: value })}
                />
              </div>

              <div className="md:col-span-1">
                <MultiSelectWithSearch
                  label="CÍA"
                  options={[
                    "ALLIANZ", "ASOCIART ART", "ATM", "BOSTON", "CHUBB", "EXPERTA ART",
                    "GALENO ART", "HDI", "INTEGRITY", "LA HOLANDO", "LIBRA", "LMA", "NACION",
                    "NOBLE", "OMINT ART", "PROVINCIA ART", "PRUDENCIA", "RIVADAVIA", "SANCOR",
                    "SMG", "SMG ART", "SMG LIFE", "SMSV SEGUROS", "VICTORIA", "ZURICH",
                    "AFIANZADORA", "CAUCIONES", "FED PAT", "PROVINCIA", "PREVENCION ART",
                    "RUS", "LA HOLANDO ART", "COSENA", "ANDINA ART", "SAN CRISTOBAL",
                    "TRIUNFO", "VICTORIA ART"
                  ]}
                  value={formData.cia}
                  onChange={(value) => setFormData({ ...formData, cia: value })}
                />
              </div>

              <div className="md:col-span-1">
                <MultiSelectWithSearch
                  label="CANAL"
                  options={["Canal PAS", "Canal Filiales", "Canal Directo", "Otros"]}
                  value={formData.canal}
                  onChange={(value) => setFormData({ ...formData, canal: value })}
                />
              </div>

              <div className="md:col-span-1">
                <MultiSelectWithSearch
                  label="SEGMENTO"
                  options={[
                    "CANAL PAS", "SEGMENTO A", "SEGMENTO B", "SEGMENTO C",
                    "ALIADO - LEGADO", "CALL CENTER", "CASA CENTRAL", "CANAL DIRECTO"
                  ]}
                  value={formData.segmento}
                  onChange={(value) => setFormData({ ...formData, segmento: value })}
                />
              </div>

              <div className="md:col-span-1">
                <MultiSelectWithSearch
                  label="EC (EJECUTIVO)"
                  options={["CAMPOS", "BALSIS", "CERVANTES", "DENNIN", "TORELLI", "SIN EJECUTIVO"]}
                  value={formData.ecEjecutivo}
                  onChange={(value) => setFormData({ ...formData, ecEjecutivo: value })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            {editingId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  Actualizar
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                >
                  Agregar
                </button>
                <button
                  onClick={handleClean}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                >
                  Limpiar Filtros
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Datos IPC</h2>
            <div className="flex gap-4">
              <div className="flex items-center">
                <label className="text-sm text-gray-700 mr-2 font-medium">Año:</label>
                <select
                  value={selectedAnio}
                  onChange={(e) => setSelectedAnio(e.target.value === '' ? '' : parseInt(e.target.value))}
                  className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Todos</option>
                  {anios.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 mr-2 font-medium">Mes:</label>
                <select
                  value={selectedMes}
                  onChange={(e) => setSelectedMes(e.target.value === '' ? '' : parseInt(e.target.value))}
                  className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Todos</option>
                  {meses.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % IPC Mes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % IPC YTD
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % IPC Interanual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ASSA-CAS-ART
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CÍA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Canal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Disc. Q
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Disc. Prima
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={12} className="px-6 py-4 text-center text-gray-500">
                      Cargando datos...
                    </td>
                  </tr>
                ) : ipcData.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-6 py-4 text-center text-gray-500">
                      No hay datos cargados. Agregue el primer registro.
                    </td>
                  </tr>
                ) : (
                  ipcData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.mes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        {item.ipcMes.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.ipcYtd.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        {item.ipcInteranual.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.assaCasArt.length > 0 ? item.assaCasArt.join(', ') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.ramaUnificada.length > 0 ? item.ramaUnificada.join(', ') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.descProducto.length > 0 ? item.descProducto.join(', ') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.cia.length > 0 ? item.cia.join(', ') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.canal.length > 0 ? item.canal.join(', ') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                        {item.discrecionalAnualQ > 0 ? `${item.discrecionalAnualQ.toFixed(2)}%` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                        {item.discrecionalAnualPrima > 0 ? `${item.discrecionalAnualPrima.toFixed(2)}%` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Editar"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L5.314 18l.77-3.14a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Eliminar"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination UI */}
          {pagination && pagination.last_page > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(pagination.last_page, prev + 1))}
                  disabled={currentPage === pagination.last_page}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Siguiente
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando página <span className="font-medium">{currentPage}</span> de{' '}
                    <span className="font-medium">{pagination.last_page}</span> (Total: {pagination.total} registros)
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 cursor-pointer"
                    >
                      <span className="sr-only">Anterior</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === pagination.last_page || Math.abs(p - currentPage) <= 2)
                      .map((p, index, array) => (
                        <span key={p}>
                          {index > 0 && array[index - 1] !== p - 1 ? (
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              ...
                            </span>
                          ) : null}
                          <button
                            onClick={() => setCurrentPage(p)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer ${
                              currentPage === p
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {p}
                          </button>
                        </span>
                      ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(pagination.last_page, prev + 1))}
                      disabled={currentPage === pagination.last_page}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 cursor-pointer"
                    >
                      <span className="sr-only">Siguiente</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
