'use client';

import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { storeIPC } from '@/services/ipcService';

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

interface IPCData {
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
  const [editingId, setEditingId] = useState<string | null>(null);
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

      const newData: IPCData = {
        id: Date.now().toString(),
        mes: formData.mes,
        ipcMes: parseFloat(formData.ipcMes),
        ipcYtd: parseFloat(formData.ipcYtd),
        ipcInteranual: parseFloat(formData.ipcInteranual),
        // Nuevos campos de clasificación
        assaCasArt: formData.assaCasArt,
        ramaUnificada: formData.ramaUnificada,
        ramDes: formData.ramDes,
        artCod: formData.artCod,
        descProducto: formData.descProducto,
        cia: formData.cia,
        canal: formData.canal,
        segmento: formData.segmento,
        ecEjecutivo: formData.ecEjecutivo,
        // Nuevos campos de porcentajes
        discrecionalAnualQ: formData.discrecionalAnualQ ? parseFloat(formData.discrecionalAnualQ) : 0,
        discrecionalAnualPrima: formData.discrecionalAnualPrima ? parseFloat(formData.discrecionalAnualPrima) : 0
      };

      setIpcData([...ipcData, newData]);
      setFormData({
        mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '',
        assaCasArt: [], ramaUnificada: [], ramDes: [], artCod: [], descProducto: [],
        cia: [], canal: [], segmento: [], ecEjecutivo: [],
        discrecionalAnualQ: '', discrecionalAnualPrima: ''
      });
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

  const handleUpdate = () => {
    if (!editingId) return;

    setIpcData(ipcData.map(item =>
      item.id === editingId
        ? {
          ...item,
          mes: formData.mes,
          ipcMes: parseFloat(formData.ipcMes),
          ipcYtd: parseFloat(formData.ipcYtd),
          ipcInteranual: parseFloat(formData.ipcInteranual),
          // Nuevos campos de clasificación
          assaCasArt: formData.assaCasArt,
          ramaUnificada: formData.ramaUnificada,
          ramDes: formData.ramDes,
          artCod: formData.artCod,
          descProducto: formData.descProducto,
          cia: formData.cia,
          canal: formData.canal,
          segmento: formData.segmento,
          ecEjecutivo: formData.ecEjecutivo,
          // Nuevos campos de porcentajes
          discrecionalAnualQ: formData.discrecionalAnualQ ? parseFloat(formData.discrecionalAnualQ) : 0,
          discrecionalAnualPrima: formData.discrecionalAnualPrima ? parseFloat(formData.discrecionalAnualPrima) : 0
        }
        : item
    ));

    setFormData({
      mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '',
      assaCasArt: [], ramaUnificada: [], ramDes: [], artCod: [], descProducto: [],
      cia: [], canal: [], segmento: [], ecEjecutivo: [],
      discrecionalAnualQ: '', discrecionalAnualPrima: ''
    });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
      setIpcData(ipcData.filter(item => item.id !== id));
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
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Datos IPC</h2>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ipcData.length === 0 ? (
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
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-900 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
