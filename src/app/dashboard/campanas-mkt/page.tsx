'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import HighchartsChart from '@/components/dashboard/HighchartsChart';

// Componente de Select Múltiple Desplegable
interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

function MultiSelect({ options, value, onChange, placeholder = "Seleccionar opciones" }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm(''); // Limpiar búsqueda al cerrar
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
    ? value.join(', ') 
    : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Campo principal que muestra las opciones seleccionadas */}
      <div 
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white"
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

      {/* Dropdown con opciones */}
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
              onClick={(e) => { e.stopPropagation(); handleSelectAll(); }}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Seleccionar Todos
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleDeselectAll(); }}
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Deseleccionar Todos
            </button>
          </div>
          
          {/* Lista de opciones */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.map(option => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CampanasMKTPage() {
  // Estados para los filtros - ahora son arrays para opción múltiple
  const [filters, setFilters] = useState({
    sexo: [] as string[],
    edadDesde: [] as string[],
    edadHasta: [] as string[],
    provincia: [] as string[],
    canal: [] as string[],
    estadoCivil: [] as string[],
    productoVigente: [] as string[],
    compania: [] as string[],
    productoNoTiene: [] as string[],
    socioMutual: [] as string[],
    antiguedad: [] as string[],
    tieneMail: [] as string[],
    tieneTelefono: [] as string[],
    fuerzaEmpresa: [] as string[],
    situacionRevista: [] as string[],
    origenDato: [] as string[]
  });

  const [filtersApplied, setFiltersApplied] = useState(false);

  // Datos de ejemplo para segmentación por grupo etario
  const chartDataEdad = {
    chart: { type: 'pie', height: 320 },
    title: { text: '' },
    series: [
      {
        name: 'Clientes por Edad',
        colorByPoint: true,
        data: [
          { name: '18-25 años', y: 15, color: '#007cc5' },
          { name: '26-35 años', y: 25, color: '#004376' },
          { name: '36-45 años', y: 30, color: '#74671f' },
          { name: '46-55 años', y: 20, color: '#e74c3c' },
          { name: '56+ años', y: 10, color: '#9b59b6' },
        ],
      },
    ],
    credits: { enabled: false },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: '110%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
  };

  // Datos de ejemplo para segmentación por sexo
  const chartDataSexo = {
    chart: { type: 'pie', height: 320 },
    title: { text: '' },
    series: [
      {
        name: 'Clientes por Sexo',
        colorByPoint: true,
        data: [
          { name: 'Masculino', y: 50, color: '#007cc5' },
          { name: 'Femenino', y: 40, color: '#e74c3c' },
          { name: 'No definido', y: 10, color: '#95a5a6' },
        ],
      },
    ],
    credits: { enabled: false },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: '110%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
  };

  // Datos dinámicos para oportunidades de venta cruzada basados en filtros
  const chartCrossSell = useMemo(() => {
    // Si no hay filtros aplicados o no hay productos seleccionados, usar datos por defecto
    const productosSeleccionados = filters.productoVigente.length > 0 ? filters.productoVigente : ['AUTOMOTORES', 'VIDA COLECTIVO', 'INCENDIO', 'SEPELIO INDIVIDUAL', 'AP'];
    
    // Generar datos aleatorios para cada producto seleccionado
    const datosVentaCruzada = productosSeleccionados.map(() => ({
      clientes2Productos: Math.floor(Math.random() * 50) + 10,
      clientes3OMas: Math.floor(Math.random() * 30) + 5,
      clientes1Producto: Math.floor(Math.random() * 80) + 20,
    }));

    return {
      chart: { type: 'bar', height: 320 },
      xAxis: {
        categories: productosSeleccionados,
        title: { text: 'Ramo/Producto' },
      },
      yAxis: {
        min: 0,
        title: { text: 'Oportunidades de Venta Cruzada' },
        allowDecimals: false,
      },
      legend: { reversed: true },
      plotOptions: {
        series: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Clientes con 3 o más productos',
          data: datosVentaCruzada.map(d => d.clientes2Productos),
          color: '#007cc5',
        },
        {
          name: 'Clientes con 2 productos',
          data: datosVentaCruzada.map(d => d.clientes3OMas),
          color: '#74671f',
        },
        {
          name: 'Clientes con 1 product',
          data: datosVentaCruzada.map(d => d.clientes1Producto),
          color: '#004376',
        },
      ],
      credits: { enabled: false },
    };
  }, [filters.productoVigente, filtersApplied]);


  // Función para manejar cambios en los filtros de opción múltiple
  const handleFilterChange = (field: string, value: string[]) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para aplicar filtros
  const applyFilters = () => {
    setFiltersApplied(true);
  };

  // Función para limpiar filtros
  const clearFilters = () => {
    setFilters({
      sexo: [],
      edadDesde: [],
      edadHasta: [],
      provincia: [],
      canal: [],
      estadoCivil: [],
      productoVigente: [],
      compania: [],
      productoNoTiene: [],
      socioMutual: [],
      antiguedad: [],
      tieneMail: [],
      tieneTelefono: [],
      fuerzaEmpresa: [],
      situacionRevista: [],
      origenDato: []
    });
    setFiltersApplied(false);
  };

  // Función para generar resultados de búsqueda (ahora usa datos estáticos)
  const generateSearchResults = () => {
    return staticResults;
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const results = generateSearchResults();
    
    // Preparar los datos para la exportación con solo las columnas especificadas
    const exportData = results.map(cliente => ({
      'NOMBRE': cliente.nombre,
      'APELLIDO': cliente.apellido,
      'DNI': cliente.dni,
      'TELEFONO': cliente.telefono,
      'EMAIL': cliente.email,
      'OBS': new Date().toISOString().split('T')[0].replace(/-/g, '/') // Fecha en formato AAAA/MM/DD
    }));

    // Crear el workbook y worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes Campañas MKT');

    // Ajustar el ancho de las columnas para las nuevas columnas
    const colWidths = [
      { wch: 15 }, // NOMBRE
      { wch: 15 }, // APELLIDO
      { wch: 12 }, // DNI
      { wch: 20 }, // TELEFONO
      { wch: 25 }, // EMAIL
      { wch: 12 }  // OBS (fecha)
    ];
    ws['!cols'] = colWidths;

    // Generar el nombre del archivo con fecha
    const fecha = new Date().toISOString().split('T')[0];
    const fileName = `Clientes_Campanas_MKT_${fecha}.xlsx`;

    // Descargar el archivo
    XLSX.writeFile(wb, fileName);
  };

  // Estados para los desplegables de estadísticas
  const [activeColumnFilter, setActiveColumnFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos estáticos para evitar reordenamiento
  const staticResults = useMemo(() => {
    const results = [];
    for (let i = 1; i <= 20; i++) {
      results.push({
        id: i,
        nombre: `Cliente ${i}`,
        apellido: `Apellido ${i}`,
        dni: Math.floor(Math.random() * 90000000) + 10000000,
        edad: Math.floor(Math.random() * 50) + 25,
        provincia: ['Gran Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Córdoba', 'Santa Fe'][Math.floor(Math.random() * 4)],
        canal: ['Canal PAS', 'Canal Filiales', 'Canal Directo'][Math.floor(Math.random() * 3)],
        producto: ['AUTOMOTORES', 'CASCOS', 'COMBINADO FAMILIAR', 'INCENDIO'][Math.floor(Math.random() * 4)],
        compania: ['ALLIANZ', 'CHUBB', 'HDI', 'ZURICH'][Math.floor(Math.random() * 4)],
        tieneMail: Math.random() > 0.3 ? 'SI' : 'NO',
        tieneTelefono: Math.random() > 0.2 ? 'SI' : 'NO',
        telefono: Math.random() > 0.2 ? `+54 9 11 ${Math.floor(Math.random() * 9000000) + 1000000}` : 'No disponible',
        email: Math.random() > 0.3 ? `cliente${i}@email.com` : 'No disponible',
        observaciones: `Observaciones para cliente ${i}`,
        socioMutual: Math.random() > 0.5 ? 'SI' : 'NO'
      });
    }
    return results;
  }, []);

  // Función para alternar el desplegable de estadísticas
  const toggleColumnFilter = (field: string) => {
    setActiveColumnFilter(activeColumnFilter === field ? null : field);
    setSearchTerm(''); // Limpiar el término de búsqueda al abrir/cerrar
  };

  // Cerrar desplegable cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activeColumnFilter && !(event.target as Element).closest('.column-filter-dropdown')) {
        setActiveColumnFilter(null);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeColumnFilter]);

  // Función para obtener valores únicos de una columna con cantidades
  const getColumnUniqueValues = (field: string) => {
    const results = generateSearchResults();
    const valueCounts: { [key: string]: number } = {};
    
    // Contar la cantidad de cada valor
    results.forEach(r => {
      const value = String((r as Record<string, unknown>)[field] || '');
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });
    
    // Mantener el orden original de aparición en la tabla
    const uniqueValues: string[] = [];
    const seen = new Set<string>();
    
    results.forEach(r => {
      const value = String((r as Record<string, unknown>)[field] || '');
      if (!seen.has(value)) {
        seen.add(value);
        uniqueValues.push(value);
      }
    });
    
    return uniqueValues.map(value => ({
      value,
      count: valueCounts[value]
    }));
  };

  return (
    <div className="flex-1 pb-6 px-4 w-full h-full">
         <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Campañas de Marketing</h1>
          <p className="text-gray-600 mt-2 pb-7"> </p>
        </div>

      {/* Sistema de Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Filtro</h3>
        <p className="text-sm text-gray-600 mb-4">
          <i className="fa-solid fa-info-circle mr-1"></i>
          Haga clic en cada filtro para desplegar las opciones y seleccionar múltiples valores
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                     {/* Sexo */}
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
             <MultiSelect
               options={["Masculino", "Femenino"]}
               value={filters.sexo}
               onChange={(value) => handleFilterChange("sexo", value)}
             />
           </div>

          {/* Edad Desde */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Edad Desde</label>
            <input
              type="number"
              min="1"
              max="120"
              placeholder="Ej: 25"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.edadDesde[0] || ''}
              onChange={(e) => handleFilterChange("edadDesde", e.target.value ? [e.target.value] : [])}
            />
          </div>

          {/* Edad Hasta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Edad Hasta</label>
            <input
              type="number"
              min="1"
              max="120"
              placeholder="Ej: 65"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.edadHasta[0] || ''}
              onChange={(e) => handleFilterChange("edadHasta", e.target.value ? [e.target.value] : [])}
            />
          </div>

          {/* Provincia/Localidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Provincia/Localidad</label>
            <MultiSelect
              options={[
                "Gran Buenos Aires",
                "Ciudad Autónoma de Buenos Aires",
                "Catamarca",
                "Chaco",
                "Chubut",
                "Córdoba",
                "Corrientes",
                "Entre Ríos",
                "Formosa",
                "Jujuy",
                "La Pampa",
                "La Rioja",
                "Mendoza",
                "Misiones",
                "Neuquén",
                "Río Negro",
                "Salta",
                "San Juan",
                "San Luis",
                "Santa Cruz",
                "Santiago del Estero",
                "Tierra del Fuego",
                "Tucumán"
              ]}
              value={filters.provincia}
              onChange={(value) => handleFilterChange("provincia", value)}
            />
          </div>

          {/* Canal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Canal</label>
            <MultiSelect
              options={["Canal PAS", "Canal Filiales", "Canal Directo"]}
              value={filters.canal}
              onChange={(value) => handleFilterChange("canal", value)}
            />
          </div>

          {/* Estado Civil */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado Civil</label>
            <MultiSelect
              options={["Soltero/a", "Casado/a", "Separado/a", "Divorciado/a"]}
              value={filters.estadoCivil}
              onChange={(value) => handleFilterChange("estadoCivil", value)}
            />
          </div>

          {/* Producto Vigente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Producto Vigente</label>
            <MultiSelect
              options={[
                "AERONAVEGACIÓN", "AP", "ART", "ASISTENCIA AL VIAJERO", "AUTOMOTORES",
                "BOLSO PROTEGIDO", "CASCOS", "CAUCIÓN", "COMBINADO FAMILIAR", "INCENDIO",
                "INT. COMERCIO", "INT. CONSORCIO", "MOTOS", "PRAXIS", "RC", "ROBO",
                "RS. VS.", "SALDO DEUDOR", "SALUD", "SEGURO TÉCNICO", "SEPELIO COLECTIVO",
                "SEPELIO INDIVIDUAL", "TRO", "VIDA COLECTIVO", "VIDA COLECTIVO CON AHORRO",
                "VIDA INDIVIDUAL", "VIDA INDIVIDUAL CON AHORRO", "VIDA OBLIGATORIO",
                "AP BOLSO", "TRANSPORTES", "SEPELIO", "ESCOLTA", "ARMAS", "ESCOLTA EJERCITO",
                "SDJM", "ROBO DIBA", "ROBO Y RS. VS."
              ]}
              value={filters.productoVigente}
              onChange={(value) => handleFilterChange("productoVigente", value)}
            />
          </div>

          {/* Sin el Producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sin el Producto</label>
            <MultiSelect
              options={[
                "AERONAVEGACIÓN", "AP", "ART", "ASISTENCIA AL VIAJERO", "AUTOMOTORES",
                "BOLSO PROTEGIDO", "CASCOS", "CAUCIÓN", "COMBINADO FAMILIAR", "INCENDIO",
                "INT. COMERCIO", "INT. CONSORCIO", "MOTOS", "PRAXIS", "RC", "ROBO",
                "RS. VS.", "SALDO DEUDOR", "SALUD", "SEGURO TÉCNICO", "SEPELIO COLECTIVO",
                "SEPELIO INDIVIDUAL", "TRO", "VIDA COLECTIVO", "VIDA COLECTIVO CON AHORRO",
                "VIDA INDIVIDUAL", "VIDA INDIVIDUAL CON AHORRO", "VIDA OBLIGATORIO",
                "AP BOLSO", "TRANSPORTES", "SEPELIO", "ESCOLTA", "ARMAS", "ESCOLTA EJERCITO",
                "SDJM", "ROBO DIBA", "ROBO Y RS. VS."
              ]}
              value={filters.productoNoTiene}
              onChange={(value) => handleFilterChange("productoNoTiene", value)}
            />
          </div>

          {/* Compañía */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Compañía</label>
            <MultiSelect
              options={[
                "ALLIANZ", "ASOCIART ART", "ATM", "BOSTON", "CHUBB", "EXPERTA ART",
                "GALENO ART", "HDI", "INTEGRITY", "LA HOLANDO", "LIBRA", "LMA", "NACION",
                "NOBLE", "OMINT ART", "PROVINCIA ART", "PRUDENCIA", "RIVADAVIA", "SANCOR",
                "SMG", "SMG ART", "SMG LIFE", "SMSV SEGUROS", "VICTORIA", "ZURICH",
                "AFIANZADORA", "CAUCIONES", "FED PAT", "PROVINCIA", "PREVENCION ART",
                "RUS", "LA HOLANDO ART", "COSENA", "ANDINA ART", "SAN CRISTOBAL",
                "TRIUNFO", "VICTORIA ART"
              ]}
              value={filters.compania}
              onChange={(value) => handleFilterChange("compania", value)}
            />
          </div>

          {/* Socio Mutual */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Socio Mutual</label>
                         <MultiSelect
               options={["SI", "NO"]}
               value={filters.socioMutual}
               onChange={(value) => handleFilterChange("socioMutual", value)}
             />
          </div>

          {/* Antigüedad en ASSA o CAS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Antigüedad en ASSA o CAS</label>
            <MultiSelect
                             options={["0 a 2 AÑOS", "2 a 5 AÑOS", "5 o más AÑOS"]}
              value={filters.antiguedad}
              onChange={(value) => handleFilterChange("antiguedad", value)}
            />
          </div>

          {/* Tiene Mail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tiene Mail</label>
            <MultiSelect
                             options={["SI", "NO"]}
              value={filters.tieneMail}
              onChange={(value) => handleFilterChange("tieneMail", value)}
            />
          </div>

          {/* Tiene Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tiene Teléfono</label>
            <MultiSelect
                             options={["SI", "NO"]}
              value={filters.tieneTelefono}
              onChange={(value) => handleFilterChange("tieneTelefono", value)}
            />
          </div>

          {/* FUERZA/Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">FUERZA/Empresa</label>
            <MultiSelect
                             options={["Ejército", "Armada", "Naval", "Prefectura", "Gendarmería", "Policia", "Mutual", "Otro"]}
              value={filters.fuerzaEmpresa}
              onChange={(value) => handleFilterChange("fuerzaEmpresa", value)}
            />
          </div>

          {/* Situación de Revista */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Situación de Revista</label>
            <MultiSelect
                             options={["En actividad", "Retirado", "No aplica"]}
              value={filters.situacionRevista}
              onChange={(value) => handleFilterChange("situacionRevista", value)}
            />
          </div>

          {/* Origen del Dato */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Origen del Dato (Desol)</label>
            <MultiSelect
                             options={["Campaña comercial", "Referidos", "BBDD", "Newsletter", "Socio SMSV", "WEB", "Casa central - Presencial", "Productor"]}
              value={filters.origenDato}
              onChange={(value) => handleFilterChange("origenDato", value)}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            <i className="fa-solid fa-times mr-2"></i>
            Limpiar Filtros
          </button>
          <button
            onClick={applyFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <i className="fa-solid fa-search mr-2"></i>
            Buscar
          </button>
        </div>
      </div>


      {/* Resultados de búsqueda */}
      {filtersApplied ? (
        <>
          {/* Gráficos principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
            <div className="w-full">
              <HighchartsChart
                id="segmentacion-edad"
                type="pie"
                title="Segmentación por Grupo Etario"
                data={chartDataEdad}
              />
            </div>
            <div className="w-full">
              <HighchartsChart
                id="segmentacion-sexo"
                type="pie"
                title="Segmentación por Sexo"
                data={chartDataSexo}
              />
            </div>
          </div>

          {/* Gráfico de venta cruzada */}
          <div className="w-full mb-8">
            <HighchartsChart
              id="cross-sell"
              type="bar"
              title="Oportunidades de venta cruzada entre ramos/productos"
              data={chartCrossSell}
            />
          </div>
    

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Resultados de Búsqueda</h2>
                <p className="text-sm text-gray-600 mt-1">Se encontraron {generateSearchResults().length} resultados</p>
              </div>
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors flex items-center"
              >
                <i className="fa-solid fa-file-excel mr-2"></i>
                Exportar a Excel
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apellido
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DNI
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Edad
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provincia
                    <div className="relative inline-block ml-1">
                      <button
                        onClick={() => toggleColumnFilter('provincia')}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="Ver estadísticas de columna"
                      >
                        <i className="fa-solid fa-info-circle text-xs"></i>
                      </button>
                      {activeColumnFilter === 'provincia' && (
                        <div className="absolute z-20 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg column-filter-dropdown">
                          <div className="p-2 border-b border-gray-200">
                            <input
                              type="text"
                              placeholder="Buscar..."
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {getColumnUniqueValues('provincia')
                              .filter(item => item.value.toLowerCase().includes(searchTerm.toLowerCase()))
                              .map((item) => (
                                <div key={item.value} className="flex items-center px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                  <span className="text-xs text-gray-700">{item.value} ({item.count})</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Canal
                    <div className="relative inline-block ml-1">
                      <button
                        onClick={() => toggleColumnFilter('canal')}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="Ver estadísticas de columna"
                      >
                        <i className="fa-solid fa-info-circle text-xs"></i>
                      </button>
                      {activeColumnFilter === 'canal' && (
                        <div className="absolute z-20 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg column-filter-dropdown">
                          <div className="p-2 border-b border-gray-200">
                            <input
                              type="text"
                              placeholder="Buscar..."
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {getColumnUniqueValues('canal')
                              .filter(item => item.value.toLowerCase().includes(searchTerm.toLowerCase()))
                              .map((item) => (
                                <div key={item.value} className="flex items-center px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                  <span className="text-xs text-gray-700">{item.value} ({item.count})</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                    <div className="relative inline-block ml-1">
                      <button
                        onClick={() => toggleColumnFilter('producto')}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="Ver estadísticas de columna"
                      >
                        <i className="fa-solid fa-info-circle text-xs"></i>
                      </button>
                      {activeColumnFilter === 'producto' && (
                        <div className="absolute z-20 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg column-filter-dropdown">
                          <div className="p-2 border-b border-gray-200">
                            <input
                              type="text"
                              placeholder="Buscar..."
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {getColumnUniqueValues('producto')
                              .filter(item => item.value.toLowerCase().includes(searchTerm.toLowerCase()))
                              .map((item) => (
                                <div key={item.value} className="flex items-center px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                  <span className="text-xs text-gray-700">{item.value} ({item.count})</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compañía
                    <div className="relative inline-block ml-1">
                      <button
                        onClick={() => toggleColumnFilter('compania')}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="Ver estadísticas de columna"
                      >
                        <i className="fa-solid fa-info-circle text-xs"></i>
                      </button>
                      {activeColumnFilter === 'compania' && (
                        <div className="absolute z-20 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg column-filter-dropdown">
                          <div className="p-2 border-b border-gray-200">
                            <input
                              type="text"
                              placeholder="Buscar..."
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {getColumnUniqueValues('compania')
                              .filter(item => item.value.toLowerCase().includes(searchTerm.toLowerCase()))
                              .map((item) => (
                                <div key={item.value} className="flex items-center px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                  <span className="text-xs text-gray-700">{item.value} ({item.count})</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Socio Mutual
                    <div className="relative inline-block ml-1">
                      <button
                        onClick={() => toggleColumnFilter('socioMutual')}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="Ver estadísticas de columna"
                      >
                        <i className="fa-solid fa-info-circle text-xs"></i>
                      </button>
                      {activeColumnFilter === 'socioMutual' && (
                        <div className="absolute z-20 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg column-filter-dropdown">
                          <div className="p-2 border-b border-gray-200">
                            <input
                              type="text"
                              placeholder="Buscar..."
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {getColumnUniqueValues('socioMutual')
                              .filter(item => item.value.toLowerCase().includes(searchTerm.toLowerCase()))
                              .map((item) => (
                                <div key={item.value} className="flex items-center px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                  <span className="text-xs text-gray-700">{item.value} ({item.count})</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {generateSearchResults().map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                      {cliente.nombre}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                      {cliente.apellido}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                      {cliente.dni}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                      {cliente.edad} años
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {cliente.provincia}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {cliente.canal}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {cliente.producto}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {cliente.compania}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {cliente.telefono}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {cliente.email}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                        cliente.socioMutual === 'SI' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cliente.socioMutual}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <i className="fa-solid fa-search text-yellow-600 text-4xl mb-4"></i>
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Configure los filtros de búsqueda</h3>
          <p className="text-yellow-600">
            Seleccione los criterios de búsqueda para encontrar la audiencia objetivo para sus campañas de marketing
          </p>
        </div>
      )}
    </div>
  );
}
