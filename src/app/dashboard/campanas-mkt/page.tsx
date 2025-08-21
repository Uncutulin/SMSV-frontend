'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function CampanasMKTPage() {
  // Estados para los filtros
  const [filters, setFilters] = useState({
    sexo: '',
    edadDesde: '',
    edadHasta: '',
    provincia: '',
    canal: '',
    estadoCivil: '',
    productoVigente: '',
    compania: '',
    productoNoTiene: '',
    socioMutual: '',
    antiguedad: '',
    tieneMail: '',
    tieneTelefono: '',
    fuerzaEmpresa: '',
    situacionRevista: '',
    origenDato: ''
  });

  const [filtersApplied, setFiltersApplied] = useState(false);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (field: string, value: string) => {
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
      sexo: '',
      edadDesde: '',
      edadHasta: '',
      provincia: '',
      canal: '',
      estadoCivil: '',
      productoVigente: '',
      compania: '',
      productoNoTiene: '',
      socioMutual: '',
      antiguedad: '',
      tieneMail: '',
      tieneTelefono: '',
      fuerzaEmpresa: '',
      situacionRevista: '',
      origenDato: ''
    });
    setFiltersApplied(false);
  };

  // Función para generar resultados de búsqueda
  const generateSearchResults = () => {
    // Simulación de resultados basados en filtros
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
        observaciones: `Observaciones para cliente ${i}`
      });
    }
    return results;
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const results = generateSearchResults();
    
    // Preparar los datos para la exportación
    const exportData = results.map(cliente => ({
      'NOMBRE': cliente.nombre,
      'APELLIDO': cliente.apellido,
      'DNI': cliente.dni,
      'EDAD': cliente.edad,
      'PROVINCIA': cliente.provincia,
      'CANAL': cliente.canal,
      'PRODUCTO': cliente.producto,
      'COMPAÑÍA': cliente.compania,
      'TELÉFONO': cliente.telefono,
      'EMAIL': cliente.email,
      'TIENE MAIL': cliente.tieneMail,
      'TIENE TELÉFONO': cliente.tieneTelefono,
      'OBSERVACIONES': cliente.observaciones
    }));

    // Crear el workbook y worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes Campañas MKT');

    // Ajustar el ancho de las columnas
    const colWidths = [
      { wch: 15 }, // NOMBRE
      { wch: 15 }, // APELLIDO
      { wch: 12 }, // DNI
      { wch: 8 },  // EDAD
      { wch: 20 }, // PROVINCIA
      { wch: 15 }, // CANAL
      { wch: 20 }, // PRODUCTO
      { wch: 15 }, // COMPAÑÍA
      { wch: 20 }, // TELÉFONO
      { wch: 25 }, // EMAIL
      { wch: 12 }, // TIENE MAIL
      { wch: 15 }, // TIENE TELÉFONO
      { wch: 30 }  // OBSERVACIONES
    ];
    ws['!cols'] = colWidths;

    // Generar el nombre del archivo con fecha
    const fecha = new Date().toISOString().split('T')[0];
    const fileName = `Clientes_Campanas_MKT_${fecha}.xlsx`;

    // Descargar el archivo
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campañas de Marketing</h1>
        <p className="text-gray-600">Buscador avanzado para segmentación de audiencias en campañas de marketing</p>
      </div>

      {/* Sistema de Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros de Búsqueda</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
            <select 
              value={filters.sexo}
              onChange={(e) => handleFilterChange('sexo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          {/* Edad Desde */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Edad Desde</label>
            <select 
              value={filters.edadDesde}
              onChange={(e) => handleFilterChange('edadDesde', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              {Array.from({length: 99}, (_, i) => i + 1).map(edad => (
                <option key={edad} value={edad}>{edad}</option>
              ))}
            </select>
          </div>

          {/* Edad Hasta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Edad Hasta</label>
            <select 
              value={filters.edadHasta}
              onChange={(e) => handleFilterChange('edadHasta', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              {Array.from({length: 99}, (_, i) => i + 1).map(edad => (
                <option key={edad} value={edad}>{edad}</option>
              ))}
            </select>
          </div>

          {/* Provincia/Localidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Provincia/Localidad</label>
            <select 
              value={filters.provincia}
              onChange={(e) => handleFilterChange('provincia', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="Gran Buenos Aires">Gran Buenos Aires</option>
              <option value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
              <option value="Catamarca">Catamarca</option>
              <option value="Chaco">Chaco</option>
              <option value="Chubut">Chubut</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Corrientes">Corrientes</option>
              <option value="Entre Ríos">Entre Ríos</option>
              <option value="Formosa">Formosa</option>
              <option value="Jujuy">Jujuy</option>
              <option value="La Pampa">La Pampa</option>
              <option value="La Rioja">La Rioja</option>
              <option value="Mendoza">Mendoza</option>
              <option value="Misiones">Misiones</option>
              <option value="Neuquén">Neuquén</option>
              <option value="Río Negro">Río Negro</option>
              <option value="Salta">Salta</option>
              <option value="San Juan">San Juan</option>
              <option value="San Luis">San Luis</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="Santiago del Estero">Santiago del Estero</option>
              <option value="Tierra del Fuego">Tierra del Fuego</option>
              <option value="Tucumán">Tucumán</option>
            </select>
          </div>

          {/* Canal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Canal</label>
            <select 
              value={filters.canal}
              onChange={(e) => handleFilterChange('canal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="Canal PAS">Canal PAS</option>
              <option value="Canal Filiales">Canal Filiales</option>
              <option value="Canal Directo">Canal Directo</option>
            </select>
          </div>

          {/* Estado Civil */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado Civil</label>
            <select 
              value={filters.estadoCivil}
              onChange={(e) => handleFilterChange('estadoCivil', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="Soltero/a">Soltero/a</option>
              <option value="Casado/a">Casado/a</option>
              <option value="Separado/a">Separado/a</option>
              <option value="Divorciado/a">Divorciado/a</option>
            </select>
          </div>

          {/* Producto Vigente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Producto Vigente</label>
            <select 
              value={filters.productoVigente}
              onChange={(e) => handleFilterChange('productoVigente', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="AERONAVEGACIÓN">AERONAVEGACIÓN</option>
              <option value="AP">AP</option>
              <option value="ART">ART</option>
              <option value="ASISTENCIA AL VIAJERO">ASISTENCIA AL VIAJERO</option>
              <option value="AUTOMOTORES">AUTOMOTORES</option>
              <option value="BOLSO PROTEGIDO">BOLSO PROTEGIDO</option>
              <option value="CASCOS">CASCOS</option>
              <option value="CAUCIÓN">CAUCIÓN</option>
              <option value="COMBINADO FAMILIAR">COMBINADO FAMILIAR</option>
              <option value="INCENDIO">INCENDIO</option>
              <option value="INT. COMERCIO">INT. COMERCIO</option>
              <option value="INT. CONSORCIO">INT. CONSORCIO</option>
              <option value="MOTOS">MOTOS</option>
              <option value="PRAXIS">PRAXIS</option>
              <option value="RC">RC</option>
              <option value="ROBO">ROBO</option>
              <option value="RS. VS.">RS. VS.</option>
              <option value="SALDO DEUDOR">SALDO DEUDOR</option>
              <option value="SALUD">SALUD</option>
              <option value="SEGURO TÉCNICO">SEGURO TÉCNICO</option>
              <option value="SEPELIO COLECTIVO">SEPELIO COLECTIVO</option>
              <option value="SEPELIO INDIVIDUAL">SEPELIO INDIVIDUAL</option>
              <option value="TRO">TRO</option>
              <option value="VIDA COLECTIVO">VIDA COLECTIVO</option>
              <option value="VIDA COLECTIVO CON AHORRO">VIDA COLECTIVO CON AHORRO</option>
              <option value="VIDA INDIVIDUAL">VIDA INDIVIDUAL</option>
              <option value="VIDA INDIVIDUAL CON AHORRO">VIDA INDIVIDUAL CON AHORRO</option>
              <option value="VIDA OBLIGATORIO">VIDA OBLIGATORIO</option>
              <option value="AP BOLSO">AP BOLSO</option>
              <option value="TRANSPORTES">TRANSPORTES</option>
              <option value="SEPELIO">SEPELIO</option>
              <option value="ESCOLTA">ESCOLTA</option>
              <option value="ARMAS">ARMAS</option>
              <option value="ESCOLTA EJERCITO">ESCOLTA EJERCITO</option>
              <option value="SDJM">SDJM</option>
              <option value="ROBO DIBA">ROBO DIBA</option>
              <option value="ROBO Y RS. VS.">ROBO Y RS. VS.</option>
            </select>
          </div>

          {/* Compañía */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Compañía</label>
            <select 
              value={filters.compania}
              onChange={(e) => handleFilterChange('compania', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="ALLIANZ">ALLIANZ</option>
              <option value="ASOCIART ART">ASOCIART ART</option>
              <option value="ATM">ATM</option>
              <option value="BOSTON">BOSTON</option>
              <option value="CHUBB">CHUBB</option>
              <option value="EXPERTA ART">EXPERTA ART</option>
              <option value="GALENO ART">GALENO ART</option>
              <option value="HDI">HDI</option>
              <option value="INTEGRITY">INTEGRITY</option>
              <option value="LA HOLANDO">LA HOLANDO</option>
              <option value="LIBRA">LIBRA</option>
              <option value="LMA">LMA</option>
              <option value="NACION">NACION</option>
              <option value="NOBLE">NOBLE</option>
              <option value="OMINT ART">OMINT ART</option>
              <option value="PROVINCIA ART">PROVINCIA ART</option>
              <option value="PRUDENCIA">PRUDENCIA</option>
              <option value="RIVADAVIA">RIVADAVIA</option>
              <option value="SANCOR">SANCOR</option>
              <option value="SMG">SMG</option>
              <option value="SMG ART">SMG ART</option>
              <option value="SMG LIFE">SMG LIFE</option>
              <option value="SMSV SEGUROS">SMSV SEGUROS</option>
              <option value="VICTORIA">VICTORIA</option>
              <option value="ZURICH">ZURICH</option>
              <option value="AFIANZADORA">AFIANZADORA</option>
              <option value="CAUCIONES">CAUCIONES</option>
              <option value="FED PAT">FED PAT</option>
              <option value="PROVINCIA">PROVINCIA</option>
              <option value="PREVENCION ART">PREVENCION ART</option>
              <option value="RUS">RUS</option>
              <option value="LA HOLANDO ART">LA HOLANDO ART</option>
              <option value="COSENA">COSENA</option>
              <option value="ANDINA ART">ANDINA ART</option>
              <option value="SAN CRISTOBAL">SAN CRISTOBAL</option>
              <option value="TRIUNFO">TRIUNFO</option>
              <option value="VICTORIA ART">VICTORIA ART</option>
            </select>
          </div>

          {/* Socio Mutual */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Socio Mutual</label>
            <select 
              value={filters.socioMutual}
              onChange={(e) => handleFilterChange('socioMutual', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>
          </div>

          {/* Antigüedad en ASSA o CAS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Antigüedad en ASSA o CAS</label>
            <select 
              value={filters.antiguedad}
              onChange={(e) => handleFilterChange('antiguedad', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-yellow-50"
            >
              <option value="">Seleccionar</option>
              <option value="0 a 2 AÑOS">0 a 2 AÑOS</option>
              <option value="2 a 5 AÑOS">2 a 5 AÑOS</option>
              <option value="5 o más AÑOS">5 o más AÑOS</option>
            </select>
          </div>

          {/* Tiene Mail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tiene Mail</label>
            <select 
              value={filters.tieneMail}
              onChange={(e) => handleFilterChange('tieneMail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>
          </div>

          {/* Tiene Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tiene Teléfono</label>
            <select 
              value={filters.tieneTelefono}
              onChange={(e) => handleFilterChange('tieneTelefono', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>
          </div>

          {/* FUERZA/Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">FUERZA/Empresa</label>
            <select 
              value={filters.fuerzaEmpresa}
              onChange={(e) => handleFilterChange('fuerzaEmpresa', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-yellow-50"
            >
              <option value="">Seleccionar</option>
              <option value="Ejército">Ejército</option>
              <option value="Armada">Armada</option>
              <option value="Naval">Naval</option>
              <option value="Prefectura">Prefectura</option>
              <option value="Gendarmería">Gendarmería</option>
              <option value="Policia">Policia</option>
              <option value="Mutual">Mutual</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Situación de Revista */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Situación de Revista</label>
            <select 
              value={filters.situacionRevista}
              onChange={(e) => handleFilterChange('situacionRevista', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="En actividad">En actividad</option>
              <option value="Retirado">Retirado</option>
              <option value="No aplica">No aplica</option>
            </select>
          </div>

          {/* Origen del Dato */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Origen del Dato (Desol)</label>
            <select 
              value={filters.origenDato}
              onChange={(e) => handleFilterChange('origenDato', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="Campaña comercial">Campaña comercial</option>
              <option value="Referidos">Referidos</option>
              <option value="BBDD">BBDD</option>
              <option value="Newsletter">Newsletter</option>
              <option value="Socio SMSV">Socio SMSV</option>
              <option value="WEB">WEB</option>
              <option value="Casa central - Presencial">Casa central - Presencial</option>
              <option value="Productor">Productor</option>
            </select>
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

      {/* Indicador de filtros aplicados */}
      {filtersApplied && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <i className="fa-solid fa-filter text-blue-600"></i>
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Filtros aplicados
                </p>
                <p className="text-sm text-blue-600">
                  {Object.values(filters).filter(f => f !== '').length} filtros activos
                </p>
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              <i className="fa-solid fa-times mr-1"></i>
              Limpiar
            </button>
          </div>
        </div>
      )}

      {/* Resultados de búsqueda */}
      {filtersApplied ? (
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Edad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provincia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Canal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compañía
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {generateSearchResults().map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cliente.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cliente.edad} años
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.provincia}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.canal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.producto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.compania}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {cliente.tieneMail === 'SI' && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            <i className="fa-solid fa-envelope mr-1"></i>
                            Mail
                          </span>
                        )}
                        {cliente.tieneTelefono === 'SI' && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            <i className="fa-solid fa-phone mr-1"></i>
                            Tel
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
