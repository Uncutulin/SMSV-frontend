'use client';

import { useState } from 'react';

export default function PresupuestoComercialPage() {
  // Estados para el filtro
  const [selectedYear1, setSelectedYear1] = useState('2024');
  const [selectedYear2, setSelectedYear2] = useState('2025');
  const [selectedMonth1, setSelectedMonth1] = useState('01');
  const [selectedMonth2, setSelectedMonth2] = useState('01');
  const [selectedFilter, setSelectedFilter] = useState('TOTAL X CÍA');
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Función para renderizar las tablas según el filtro seleccionado
  const renderTablesByFilter = () => {
    switch (selectedFilter) {
      case 'TOTAL X CÍA':
        return renderTotalXCiaTables();
      case 'TOTAL X CANAL':
        return renderTotalXCanalTables();
      case 'ART X CANAL':
        return renderArtXCanalTables();
      case 'ART POR CÍA':
        return renderArtPorCiaTables();
      case 'ASSA X CANAL':
        return renderAssaXCanalTables();
      case 'ASSA X RAMO':
        return renderAssaXRamoTables();
      case 'ASSA X CÍA':
        return renderAssaXCiaTables();
      case 'CAS X CANAL':
        return renderCasXCanalTables();
      case 'CAS X RAMO':
        return renderCasXRamoTables();
      default:
        return renderTotalXCiaTables();
    }
  };

  // Tabla principal de datos
  const renderMainDataTable = (data: any[], title: string) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Q PÓL {selectedYear1}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Q PÓL {selectedYear2}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                R12 {selectedYear1}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                R12 {selectedYear2}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className={row.isTotal ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                  {row.qPol1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                  {row.qPol2}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                  {row.r12_1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                  {row.r12_2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Tabla de crecimiento real
  const renderGrowthTable = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">CRECIMIENTO REAL {selectedYear2}/06</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % R12
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total General</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-semibold">+15.2%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-semibold">+12.8%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Tabla de cumplimiento YTD
  const renderYTDComplianceTable = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO YTD {selectedYear2}/06</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                REAL Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                R12
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                REAL R12
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % R12
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total General</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1,250</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1,180</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-semibold">94.4%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">15,200</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">14,850</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-semibold">97.7%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Tabla de cumplimiento total
  const renderTotalComplianceTable = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO TOTAL {selectedYear2}/06</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                REAL Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                R12
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                REAL R12
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % R12
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total General</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">2,500</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">2,380</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-semibold">95.2%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">30,400</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">29,700</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-semibold">97.7%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Renderizado de tablas para TOTAL X CÍA
  const renderTotalXCiaTables = () => (
    <>
      {renderMainDataTable([
        { description: 'ART', qPol1: '450', qPol2: '520', r12_1: '5,400', r12_2: '6,240', isTotal: false },
        { description: 'ASSA', qPol1: '680', qPol2: '780', r12_1: '8,160', r12_2: '9,360', isTotal: false },
        { description: 'CAS', qPol1: '120', qPol2: '150', r12_1: '1,440', r12_2: '1,800', isTotal: false },
        { description: 'Total General', qPol1: '1,250', qPol2: '1,450', r12_1: '15,000', r12_2: '17,400', isTotal: true }
      ], 'TOTAL X CÍA')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  // Renderizado de tablas para TOTAL X CANAL
  const renderTotalXCanalTables = () => (
    <>
      {renderMainDataTable([
        { description: 'CANAL DIRECTO', qPol1: '400', qPol2: '460', r12_1: '4,800', r12_2: '5,520', isTotal: false },
        { description: 'CANAL FILIALES', qPol1: '600', qPol2: '690', r12_1: '7,200', r12_2: '8,280', isTotal: false },
        { description: 'CANAL PAS', qPol1: '250', qPol2: '300', r12_1: '3,000', r12_2: '3,600', isTotal: false },
        { description: 'Total General', qPol1: '1,250', qPol2: '1,450', r12_1: '15,000', r12_2: '17,400', isTotal: true }
      ], 'TOTAL X CANAL')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  // Renderizado de tablas para ART X CANAL
  const renderArtXCanalTables = () => (
    <>
      {renderMainDataTable([
        { description: 'CANAL DIRECTO', qPol1: '180', qPol2: '208', r12_1: '2,160', r12_2: '2,496', isTotal: false },
        { description: 'CANAL FILIALES', qPol1: '200', qPol2: '232', r12_1: '2,400', r12_2: '2,784', isTotal: false },
        { description: 'CANAL PAS', qPol1: '70', qPol2: '80', r12_1: '840', r12_2: '960', isTotal: false },
        { description: 'Total General', qPol1: '450', qPol2: '520', r12_1: '5,400', r12_2: '6,240', isTotal: true }
      ], 'ART X CANAL')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  // Renderizado de tablas para ART POR CÍA
  const renderArtPorCiaTables = () => (
    <>
      {renderMainDataTable([
        { description: 'ANDINA ART', qPol1: '45', qPol2: '52', r12_1: '540', r12_2: '624', isTotal: false },
        { description: 'ASOCIART ART', qPol1: '38', qPol2: '44', r12_1: '456', r12_2: '528', isTotal: false },
        { description: 'EXPERTA ART', qPol1: '42', qPol2: '48', r12_1: '504', r12_2: '576', isTotal: false },
        { description: 'FED PAT', qPol1: '35', qPol2: '40', r12_1: '420', r12_2: '480', isTotal: false },
        { description: 'GAUCHO ART', qPol1: '40', qPol2: '46', r12_1: '480', r12_2: '552', isTotal: false },
        { description: 'LA HOLANDO', qPol1: '32', qPol2: '37', r12_1: '384', r12_2: '444', isTotal: false },
        { description: 'OMNI ART', qPol1: '28', qPol2: '32', r12_1: '336', r12_2: '384', isTotal: false },
        { description: 'PREVENCION ART', qPol1: '30', qPol2: '35', r12_1: '360', r12_2: '420', isTotal: false },
        { description: 'PROVINCIA ART', qPol1: '25', qPol2: '29', r12_1: '300', r12_2: '348', isTotal: false },
        { description: 'SMG ART', qPol1: '35', qPol2: '40', r12_1: '420', r12_2: '480', isTotal: false },
        { description: 'VICTORIA', qPol1: '20', qPol2: '23', r12_1: '240', r12_2: '276', isTotal: false },
        { description: 'Total General', qPol1: '450', qPol2: '520', r12_1: '5,400', r12_2: '6,240', isTotal: true }
      ], 'ART POR CÍA')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  // Renderizado de tablas para ASSA X CANAL
  const renderAssaXCanalTables = () => (
    <>
      {renderMainDataTable([
        { description: 'CANAL DIRECTO', qPol1: '272', qPol2: '312', r12_1: '3,264', r12_2: '3,744', isTotal: false },
        { description: 'CANAL FILIALES', qPol1: '320', qPol2: '368', r12_1: '3,840', r12_2: '4,416', isTotal: false },
        { description: 'CANAL PAS', qPol1: '88', qPol2: '100', r12_1: '1,056', r12_2: '1,200', isTotal: false },
        { description: 'Total General', qPol1: '680', qPol2: '780', r12_1: '8,160', r12_2: '9,360', isTotal: true }
      ], 'ASSA X CANAL')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  // Renderizado de tablas para ASSA X RAMO
  const renderAssaXRamoTables = () => (
    <>
      {renderMainDataTable([
        { description: 'AERONAVEGACION', qPol1: '25', qPol2: '29', r12_1: '300', r12_2: '348', isTotal: false },
        { description: 'AP', qPol1: '45', qPol2: '52', r12_1: '540', r12_2: '624', isTotal: false },
        { description: 'AUTOMOTORES', qPol1: '120', qPol2: '138', r12_1: '1,440', r12_2: '1,656', isTotal: false },
        { description: 'CASCOS', qPol1: '35', qPol2: '40', r12_1: '420', r12_2: '480', isTotal: false },
        { description: 'COMBINADO FAMILIAR', qPol1: '55', qPol2: '63', r12_1: '660', r12_2: '756', isTotal: false },
        { description: 'INCENDIO', qPol1: '40', qPol2: '46', r12_1: '480', r12_2: '552', isTotal: false },
        { description: 'INT. COMERCIO', qPol1: '30', qPol2: '35', r12_1: '360', r12_2: '420', isTotal: false },
        { description: 'RC', qPol1: '65', qPol2: '75', r12_1: '780', r12_2: '900', isTotal: false },
        { description: 'RC VS', qPol1: '28', qPol2: '32', r12_1: '336', r12_2: '384', isTotal: false },
        { description: 'SALUD', qPol1: '42', qPol2: '48', r12_1: '504', r12_2: '576', isTotal: false },
        { description: 'SEGURO TÉCNICO', qPol1: '25', qPol2: '29', r12_1: '300', r12_2: '348', isTotal: false },
        { description: 'SEPELIO INDIVIDUAL', qPol1: '38', qPol2: '44', r12_1: '456', r12_2: '528', isTotal: false },
        { description: 'SEPELIO OBLIGATORIO', qPol1: '32', qPol2: '37', r12_1: '384', r12_2: '444', isTotal: false },
        { description: 'VIDA INDIVIDUAL', qPol1: '28', qPol2: '32', r12_1: '336', r12_2: '384', isTotal: false },
        { description: 'VIDA COLECTIVO', qPol1: '35', qPol2: '40', r12_1: '420', r12_2: '480', isTotal: false },
        { description: 'VIDA OBLIGATORIO', qPol1: '22', qPol2: '25', r12_1: '264', r12_2: '300', isTotal: false },
        { description: 'Total General', qPol1: '680', qPol2: '780', r12_1: '8,160', r12_2: '9,360', isTotal: true }
      ], 'ASSA X RAMO')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  // Renderizado de tablas para ASSA X CÍA
  const renderAssaXCiaTables = () => (
    <>
      {renderMainDataTable([
        { description: 'AFIANZADORA', qPol1: '25', qPol2: '29', r12_1: '300', r12_2: '348', isTotal: false },
        { description: 'ALLIANZ', qPol1: '35', qPol2: '40', r12_1: '420', r12_2: '480', isTotal: false },
        { description: 'AP', qPol1: '30', qPol2: '35', r12_1: '360', r12_2: '420', isTotal: false },
        { description: 'ATM', qPol1: '28', qPol2: '32', r12_1: '336', r12_2: '384', isTotal: false },
        { description: 'BOSTON', qPol1: '32', qPol2: '37', r12_1: '384', r12_2: '444', isTotal: false },
        { description: 'CAMPAÑAS', qPol1: '20', qPol2: '23', r12_1: '240', r12_2: '276', isTotal: false },
        { description: 'CHUBB', qPol1: '38', qPol2: '44', r12_1: '456', r12_2: '528', isTotal: false },
        { description: 'FED PAT', qPol1: '25', qPol2: '29', r12_1: '300', r12_2: '348', isTotal: false },
        { description: 'HDI', qPol1: '30', qPol2: '35', r12_1: '360', r12_2: '420', isTotal: false },
        { description: 'INTEGRITY', qPol1: '22', qPol2: '25', r12_1: '264', r12_2: '300', isTotal: false },
        { description: 'LA HOLANDO', qPol1: '28', qPol2: '32', r12_1: '336', r12_2: '384', isTotal: false },
        { description: 'LIBRA', qPol1: '35', qPol2: '40', r12_1: '420', r12_2: '480', isTotal: false },
        { description: 'MA', qPol1: '26', qPol2: '30', r12_1: '312', r12_2: '360', isTotal: false },
        { description: 'NACION', qPol1: '40', qPol2: '46', r12_1: '480', r12_2: '552', isTotal: false },
        { description: 'NOBLE', qPol1: '24', qPol2: '28', r12_1: '288', r12_2: '336', isTotal: false },
        { description: 'PRUDENCIA', qPol1: '30', qPol2: '35', r12_1: '360', r12_2: '420', isTotal: false },
        { description: 'RIO URUGUAY', qPol1: '22', qPol2: '25', r12_1: '264', r12_2: '300', isTotal: false },
        { description: 'SANCOR', qPol1: '28', qPol2: '32', r12_1: '336', r12_2: '384', isTotal: false },
        { description: 'SMG', qPol1: '32', qPol2: '37', r12_1: '384', r12_2: '444', isTotal: false },
        { description: 'SMG LIFE', qPol1: '20', qPol2: '23', r12_1: '240', r12_2: '276', isTotal: false },
        { description: 'TPC', qPol1: '25', qPol2: '29', r12_1: '300', r12_2: '348', isTotal: false },
        { description: 'VICTORIA', qPol1: '26', qPol2: '30', r12_1: '312', r12_2: '360', isTotal: false },
        { description: 'ZURICH', qPol1: '30', qPol2: '35', r12_1: '360', r12_2: '420', isTotal: false },
        { description: 'COSENSA', qPol1: '24', qPol2: '28', r12_1: '288', r12_2: '336', isTotal: false },
        { description: 'SAN CRISTOBAL', qPol1: '20', qPol2: '23', r12_1: '240', r12_2: '276', isTotal: false },
        { description: 'Total General', qPol1: '680', qPol2: '780', r12_1: '8,160', r12_2: '9,360', isTotal: true }
      ], 'ASSA X CÍA')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  // Renderizado de tablas para CAS X CANAL
  const renderCasXCanalTables = () => (
    <>
      {renderMainDataTable([
        { description: 'CANAL DIRECTO', qPol1: '48', qPol2: '60', r12_1: '576', r12_2: '720', isTotal: false },
        { description: 'CANAL FILIALES', qPol1: '48', qPol2: '60', r12_1: '576', r12_2: '720', isTotal: false },
        { description: 'CANAL PAS', qPol1: '24', qPol2: '30', r12_1: '288', r12_2: '360', isTotal: false },
        { description: 'Total General', qPol1: '120', qPol2: '150', r12_1: '1,440', r12_2: '1,800', isTotal: true }
      ], 'CAS X CANAL')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  // Renderizado de tablas para CAS X RAMO
  const renderCasXRamoTables = () => (
    <>
      {renderMainDataTable([
        { description: 'AP BOLSO', qPol1: '15', qPol2: '19', r12_1: '180', r12_2: '228', isTotal: false },
        { description: 'APARTAMENTO', qPol1: '12', qPol2: '15', r12_1: '144', r12_2: '180', isTotal: false },
        { description: 'BOLSO PROTEGIDO', qPol1: '8', qPol2: '10', r12_1: '96', r12_2: '120', isTotal: false },
        { description: 'ESCOLTAS', qPol1: '10', qPol2: '12', r12_1: '120', r12_2: '144', isTotal: false },
        { description: 'ESCOLTA EJERCITO', qPol1: '6', qPol2: '8', r12_1: '72', r12_2: '96', isTotal: false },
        { description: 'ROBO', qPol1: '18', qPol2: '22', r12_1: '216', r12_2: '264', isTotal: false },
        { description: 'SALDO DEUDOR', qPol1: '12', qPol2: '15', r12_1: '144', r12_2: '180', isTotal: false },
        { description: 'SDJ', qPol1: '8', qPol2: '10', r12_1: '96', r12_2: '120', isTotal: false },
        { description: 'SEPELIO COLECTIVO', qPol1: '6', qPol2: '8', r12_1: '72', r12_2: '96', isTotal: false },
        { description: 'SEPELIO INDIVIDUAL', qPol1: '8', qPol2: '10', r12_1: '96', r12_2: '120', isTotal: false },
        { description: 'VIDA COLECTIVO', qPol1: '10', qPol2: '12', r12_1: '120', r12_2: '144', isTotal: false },
        { description: 'VIDA INDIVIDUAL', qPol1: '8', qPol2: '10', r12_1: '96', r12_2: '120', isTotal: false },
        { description: 'VIDA OBLIGATORIO', qPol1: '9', qPol2: '11', r12_1: '108', r12_2: '132', isTotal: false },
        { description: 'Total General', qPol1: '120', qPol2: '150', r12_1: '1,440', r12_2: '1,800', isTotal: true }
      ], 'CAS X RAMO')}
      {renderGrowthTable()}
      {renderYTDComplianceTable()}
      {renderTotalComplianceTable()}
    </>
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Presupuesto Comercial</h1>
        <p className="text-gray-600">Gestione y visualice el presupuesto comercial de la empresa</p>
      </div>

      {/* Bloque de filtro */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro de Presupuesto</h3>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Primera fecha */}
          <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-md font-medium text-blue-800 mb-3">Fecha Inicio</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                <select 
                  value={selectedYear1}
                  onChange={(e) => setSelectedYear1(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                <select 
                  value={selectedMonth1}
                  onChange={(e) => setSelectedMonth1(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Segunda fecha */}
          <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-md font-medium text-green-800 mb-3">Fecha Fin</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                <select 
                  value={selectedYear2}
                  onChange={(e) => setSelectedYear2(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                <select 
                  value={selectedMonth2}
                  onChange={(e) => setSelectedMonth2(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Filtro de tipo de vista */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-md font-medium text-gray-800 mb-3">Tipo de Vista</h4>
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <optgroup label="Vistas Generales" className="font-semibold">
              <option value="TOTAL X CÍA">TOTAL X CÍA</option>
              <option value="TOTAL X CANAL">TOTAL X CANAL</option>
            </optgroup>
            <optgroup label="Vistas ART" className="font-semibold">
              <option value="ART X CANAL">ART X CANAL</option>
              <option value="ART POR CÍA">ART POR CÍA</option>
            </optgroup>
            <optgroup label="Vistas ASSA" className="font-semibold">
              <option value="ASSA X CANAL">ASSA X CANAL</option>
              <option value="ASSA X RAMO">ASSA X RAMO</option>
              <option value="ASSA X CÍA">ASSA X CÍA</option>
            </optgroup>
            <optgroup label="Vistas CAS" className="font-semibold">
              <option value="CAS X CANAL">CAS X CANAL</option>
              <option value="CAS X RAMO">CAS X RAMO</option>
            </optgroup>
          </select>
        </div>

        {/* Botón de aplicar filtros */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setFiltersApplied(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <i className="fa-solid fa-check mr-2"></i>
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Indicador de filtro aplicado */}
      {filtersApplied && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <i className="fa-solid fa-filter text-blue-600"></i>
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Vista: <span className="font-bold">{selectedFilter}</span>
                </p>
                <p className="text-sm text-blue-600">
                  Período: {selectedMonth1}/{selectedYear1} - {selectedMonth2}/{selectedYear2}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFiltersApplied(false)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                <i className="fa-solid fa-times mr-1"></i>
                Limpiar
              </button>
              <div className="text-right">
                <p className="text-xs text-blue-600">Filtro aplicado</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      {!filtersApplied ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <i className="fa-solid fa-info-circle text-yellow-600 text-4xl mb-4"></i>
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Seleccione los filtros</h3>
          <p className="text-yellow-600">
            Configure las fechas y el tipo de vista para visualizar el presupuesto comercial
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {renderTablesByFilter()}
        </div>
      )}
    </div>
  );
}
