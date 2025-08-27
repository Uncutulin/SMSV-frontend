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
  const renderMainDataTable = (data: Array<{description: string, qPol1: string, qPol2: string, r12_1: string, r12_2: string, isTotal?: boolean}>, title: string) => (
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">+15.2%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">+12.8%</td>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">94.4%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">15,200</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">14,850</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">97.7%</td>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">95.2%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">30,400</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">29,700</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">97.7%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Renderizado de tablas para TOTAL X CÍA
  const renderTotalXCiaTables = () => (
    <>
      {/* Tablas principales lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla TOTAL X CÍA */}
        {renderMainDataTable([
          { description: 'ART', qPol1: '3.244', qPol2: '3.345', r12_1: '7.550.273.010', r12_2: '12.369.878.053', isTotal: false },
          { description: 'ASSA', qPol1: '75.455', qPol2: '73.631', r12_1: '13.250.722.758', r12_2: '28.410.171.357', isTotal: false },
          { description: 'CAS', qPol1: '27.899', qPol2: '26.669', r12_1: '11.820.721.857', r12_2: '23.386.730.812', isTotal: false },
          { description: 'Total General', qPol1: '106.598', qPol2: '103.645', r12_1: '32.621.717.625', r12_2: '64.166.780.222', isTotal: true }
        ], 'TOTAL X CÍA')}
        
        {/* Tabla CRECIMIENTO REAL 2025/06 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CRECIMIENTO REAL 202506</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    R12
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % R12
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">3,11%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">4.819.605.043</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">63,83%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-1.824</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">-2,42%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">15.159.448.599</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">114,40%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-1.230</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">-4,41%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">11.566.008.954</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">97,85%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">-2.953</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">-2,77%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">31.545.062.596</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">96,70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Tablas adicionales en fila completa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla CUMP. PPTO YTD 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO YTD 202506</h2>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.244</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">97,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">12.369.878.053</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">7.550.273.010</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">61,04%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ASSA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">73.631</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">75.455</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">102,48%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">28.410.171.357</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">13.250.722.758</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">46,66%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">26.669</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">27.899</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">104,61%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">23.386.730.812</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">11.820.721.857</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">50,56%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">103.645</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">106.598</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">102,85%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">64.166.780.222</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">32.621.717.625</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">50,84%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Tabla CUMP. PPTO TOTAL 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO TOTAL 202506</h2>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.244</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">97,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">12.369.878.053</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">7.550.273.010</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">61,04%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ASSA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">73.631</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">75.455</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">102,48%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">28.410.171.357</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">13.250.722.758</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">46,66%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">26.669</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">27.899</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">104,61%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">23.386.730.812</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">11.820.721.857</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">50,56%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">103.645</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">106.598</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">102,85%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">64.166.780.222</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">32.621.717.625</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">50,84%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  // Renderizado de tablas para TOTAL X CANAL
  const renderTotalXCanalTables = () => (
    <>
      {/* Tablas principales lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla TOTAL X CANAL */}
        {renderMainDataTable([
          { description: 'CANAL DIRECTO', qPol1: '15.000', qPol2: '18.000', r12_1: '2.500.000.000', r12_2: '4.500.000.000', isTotal: false },
          { description: 'CANAL FILIALES', qPol1: '60.000', qPol2: '65.000', r12_1: '20.000.000.000', r12_2: '35.000.000.000', isTotal: false },
          { description: 'CANAL PAS', qPol1: '31.598', qPol2: '20.645', r12_1: '10.121.717.625', r12_2: '24.666.780.222', isTotal: false },
          { description: 'Total General', qPol1: '106.598', qPol2: '103.645', r12_1: '32.621.717.625', r12_2: '64.166.780.222', isTotal: true }
        ], 'TOTAL X CANAL')}
        
        {/* Tabla CRECIMIENTO REAL 2025/06 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CRECIMIENTO REAL 202506</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    R12
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % R12
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">20,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">2.000.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">80,00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">5.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">8,33%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">15.000.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">75,00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-10.953</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">-34,66%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">14.545.062.596</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">143,66%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">-2.953</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">-2,77%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">31.545.062.596</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">96,70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Tablas adicionales en fila completa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla CUMP. PPTO YTD 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO YTD 202506</h2>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL DIRECTO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">18.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">15.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">83,33%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">4.500.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">2.500.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">55,56%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL FILIALES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">65.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">60.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">92,31%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">35.000.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">20.000.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">57,14%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL PAS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">20.645</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">31.598</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">153,05%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">24.666.780.222</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">10.121.717.625</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">41,05%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">103.645</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">106.598</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">102,85%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">64.166.780.222</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">32.621.717.625</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">50,84%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Tabla CUMP. PPTO TOTAL 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO TOTAL 202506</h2>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL DIRECTO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">18.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">15.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">83,33%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">4.500.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">2.500.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">55,56%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL FILIALES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">65.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">60.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">92,31%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">35.000.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">20.000.000.000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">57,14%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL PAS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">20.645</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">31.598</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">153,05%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">24.666.780.222</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">10.121.717.625</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">41,05%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">103.645</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">106.598</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">102,85%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">64.166.780.222</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">32.621.717.625</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">50,84%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  // Renderizado de tablas para ART X CANAL
  const renderArtXCanalTables = () => (
    <>
      {/* Tablas principales lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla ART X CANAL */}
        {renderMainDataTable([
          { description: 'CANAL DIRECTO', qPol1: '1.622', qPol2: '1.672', r12_1: '3.775.136.505', r12_2: '6.184.939.026', isTotal: false },
          { description: 'CANAL FILIALES', qPol1: '1.622', qPol2: '1.673', r12_1: '3.775.136.505', r12_2: '6.184.939.027', isTotal: false },
          { description: 'Total General', qPol1: '3.244', qPol2: '3.345', r12_1: '7.550.273.010', r12_2: '12.369.878.053', isTotal: true }
        ], 'ART X CANAL')}
        
        {/* Tabla CRECIMIENTO REAL 2025/06 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CRECIMIENTO REAL 202506</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    R12
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % R12
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">3,08%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">2.409.802.521</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">63,83%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">51</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">3,14%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">2.409.802.522</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">63,83%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">3,11%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">4.819.605.043</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">63,83%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Tablas adicionales en fila completa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla CUMP. PPTO YTD 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO YTD 202506</h2>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL DIRECTO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1.672</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1.622</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">97,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">6.184.939.026</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.775.136.505</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">61,04%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL FILIALES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1.673</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1.622</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">97,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">6.184.939.027</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.775.136.505</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">61,04%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">3.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">3.244</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">97,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">12.369.878.053</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">7.550.273.010</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">61,04%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Tabla CUMP. PPTO TOTAL 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO TOTAL 202506</h2>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL DIRECTO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1.672</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1.622</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">97,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">6.184.939.026</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.775.136.505</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">61,04%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL FILIALES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1.673</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">1.622</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">97,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">6.184.939.027</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3.775.136.505</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-semibold">61,04%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">3.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">3.244</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">97,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">12.369.878.053</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">7.550.273.010</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">61,04%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  // Renderizado de tablas para ART POR CÍA
  const renderArtPorCiaTables = () => (
    <>
      {/* Tablas principales lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla ART POR CÍA */}
        {renderMainDataTable([
          { description: 'ANDINA ART', qPol1: '73', qPol2: '244', r12_1: '166.842.533', r12_2: '1.479.829.623', isTotal: false },
          { description: 'ASOCIART ART', qPol1: '323', qPol2: '361', r12_1: '1.629.349.277', r12_2: '2.575.358.075', isTotal: false },
          { description: 'EXPERTA ART', qPol1: '28', qPol2: '23', r12_1: '138.734.835', r12_2: '309.246.420', isTotal: false },
          { description: 'FED PAT', qPol1: '132', qPol2: '106', r12_1: '2.349.559.046', r12_2: '1.069.467.626', isTotal: false },
          { description: 'GALENO ART', qPol1: '12', qPol2: '8', r12_1: '66.536.918', r12_2: '10.885.655', isTotal: false },
          { description: 'LA HOLANDO ART', qPol1: '8', qPol2: '11', r12_1: '21.561.415', r12_2: '248.271.635', isTotal: false },
          { description: 'OMINT ART', qPol1: '4', qPol2: '4', r12_1: '5.009.147', r12_2: '8.405.747', isTotal: false },
          { description: 'PREVENCION ART', qPol1: '1.579', qPol2: '1.590', r12_1: '1.215.706.171', r12_2: '2.745.633.959', isTotal: false },
          { description: 'PROVINCIA ART', qPol1: '574', qPol2: '534', r12_1: '1.074.334.312', r12_2: '2.361.201.528', isTotal: false },
          { description: 'SMG ART', qPol1: '511', qPol2: '460', r12_1: '882.639.356', r12_2: '1.546.534.132', isTotal: false },
          { description: 'VICTORIA ART', qPol1: '-', qPol2: '4', r12_1: '-', r12_2: '15.043.652', isTotal: false },
          { description: 'Total General', qPol1: '3.244', qPol2: '3.345', r12_1: '7.550.273.010', r12_2: '12.369.878.053', isTotal: true }
        ], 'ART POR CÍA')}
        
        {/* Tabla CRECIMIENTO REAL 2025/06 */}
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
                    Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    R12
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % R12
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ANDINA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">171</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">234,25%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.312.987.090</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">786,96%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ASOCIART ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">38</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">11,76%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">946.008.798</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">58,06%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EXPERTA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-17,86%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">170.511.586</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">122,90%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FED PAT</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-26</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-19,70%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-1.280.091.420</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-54,48%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GALENO ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-33,33%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-55.651.263</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-83,64%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LA HOLANDO ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">37,50%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">226.710.220</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">1051,46%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">OMINT ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.396.600</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">67,81%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PREVENCION ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,70%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.529.927.788</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">125,85%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PROVINCIA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-40</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-6,97%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.286.867.216</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">119,78%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-51</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-9,98%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">663.894.776</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">75,22%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VICTORIA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">100,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15.043.652</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">100,00%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">3,11%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">4.819.605.043</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">63,83%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Tablas adicionales en fila completa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla CUMP. PPTO YTD 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    PPTO Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    REAL Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO R12
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ANDINA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">80</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">244</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">303,86%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">249.262.744</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.479.829.623</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">593,68%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ASOCIART ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">355</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">361</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">101,60%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2.434.247.820</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2.575.358.075</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">105,80%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EXPERTA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">31</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">74,68%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">207.269.843</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">309.246.420</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">149,20%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FED PAT</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">145</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">106</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">73,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.510.241.215</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.069.467.626</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">30,47%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GALENO ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">60,61%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">99.406.156</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10.885.655</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">10,95%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LA HOLANDO ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">125,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">32.212.754</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">248.271.635</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">770,72%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">OMINT ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90,91%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7.483.665</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8.405.747</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">112,32%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PREVENCION ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.737</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.590</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">91,54%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.816.265.019</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2.745.633.959</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">151,17%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PROVINCIA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">631</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">534</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">84,57%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.605.055.462</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2.361.201.528</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">147,11%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">562</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">460</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">81,84%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.318.663.198</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.546.534.132</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">117,28%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VICTORIA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">100,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15.043.652</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">100,00%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">3.568</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">3.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">93,74%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">11.280.107.876</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">12.369.878.053</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">109,66%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Tabla CUMP. PPTO TOTAL 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    PPTO Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    REAL Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO R12
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ANDINA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">80</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">244</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">303,86%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">249.262.744</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.479.829.623</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">593,68%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ASOCIART ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">355</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">361</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">101,60%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2.434.247.820</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2.575.358.075</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">105,80%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EXPERTA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">31</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">74,68%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">207.269.843</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">309.246.420</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">149,20%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FED PAT</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">145</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">106</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">73,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.510.241.215</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.069.467.626</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">30,47%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GALENO ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">60,61%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">99.406.156</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10.885.655</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">10,95%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LA HOLANDO ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">125,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">32.212.754</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">248.271.635</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">770,72%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">OMINT ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90,91%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7.483.665</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8.405.747</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">112,32%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PREVENCION ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.737</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.590</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">91,54%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.816.265.019</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2.745.633.959</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">151,17%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PROVINCIA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">631</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">534</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">84,57%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.605.055.462</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2.361.201.528</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">147,11%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">562</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">460</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">81,84%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.318.663.198</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.546.534.132</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">117,28%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VICTORIA ART</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">100,00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15.043.652</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">100,00%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">3.568</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">3.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">93,74%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">11.280.107.876</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">12.369.878.053</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">109,66%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  // Renderizado de tablas para ASSA X CANAL
  const renderAssaXCanalTables = () => (
    <>
      {/* Layout específico: ASSA X CANAL + CRECIMIENTO REAL en la misma línea */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla principal ASSA X CANAL */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {renderMainDataTable([
            { description: 'CANAL DIRECTO', qPol1: '23.806', qPol2: '22.607', r12_1: '2.240.959.553', r12_2: '3.431.509.543', isTotal: false },
            { description: 'CANAL FILIALES', qPol1: '22.313', qPol2: '21.709', r12_1: '4.193.230.281', r12_2: '9.421.091.618', isTotal: false },
            { description: 'CANAL PAS', qPol1: '29.336', qPol2: '29.315', r12_1: '6.816.532.925', r12_2: '15.557.570.196', isTotal: false },
            { description: 'Total General', qPol1: '75.455', qPol2: '73.631', r12_1: '13.250.722.758', r12_2: '28.410.171.357', isTotal: true }
          ], 'ASSA X CANAL')}
        </div>

        {/* Tabla CRECIMIENTO REAL 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CRECIMIENTO REAL 202506</h2>
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
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    R12
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % R12
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL DIRECTO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">- 1.199</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-5,04%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.190.549.990</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">53,13%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL FILIALES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">- 604</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-2,71%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">5.227.861.338</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">124,67%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL PAS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">- 21</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-0,07%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8.741.037.271</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">128,23%</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">- 1.824</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">-2,42%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">15.159.448.599</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">114,40%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Layout específico: CUMP. PPTO YTD + CUMP. PPTO TOTAL en la misma línea */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tabla CUMP. PPTO YTD 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO YTD 202506</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    REAL Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO R12
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL DIRECTO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">26.187</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">22.607</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">86,33%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.347.993.572</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.431.509.543</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">102,49%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL FILIALES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">24.544</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">21.709</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">88,45%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">6.264.686.039</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9.421.091.618</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">150,38%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL PAS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">32.271</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">29.315</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90,84%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10.184.917.665</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15.557.570.196</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">152,75%</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">83.002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">73.631</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">88,71%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">19.797.597.276</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">28.410.171.357</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">143,50%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla CUMP. PPTO TOTAL 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO TOTAL 202506</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    REAL Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO R12
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL DIRECTO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">26.187</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">22.607</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">86,33%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.347.993.572</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.431.509.543</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">102,49%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL FILIALES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">24.544</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">21.709</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">88,45%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">6.264.686.039</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9.421.091.618</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">150,38%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CANAL PAS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">32.271</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">29.315</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90,84%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10.184.848.650</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15.557.570.196</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">152,75%</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">83.002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">73.631</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">88,71%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">19.797.528.261</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">28.410.171.357</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">143,50%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  // Renderizado de tablas para ASSA X RAMO
  const renderAssaXRamoTables = () => (
    <>
      {/* Layout específico: ASSA X RAMO + CRECIMIENTO REAL en la misma línea */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla principal ASSA X RAMO */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {renderMainDataTable([
            { description: 'AERONAVEGACIÓN', qPol1: '5', qPol2: '7', r12_1: '5.135.009', r12_2: '26.056.851', isTotal: false },
            { description: 'AP', qPol1: '1.234', qPol2: '1.456', r12_1: '123.456.789', r12_2: '234.567.890', isTotal: false },
            { description: 'AUTOMOTORES', qPol1: '26.185', qPol2: '25.872', r12_1: '10.545.921.731', r12_2: '22.109.067.730', isTotal: false },
            { description: 'CASCOS', qPol1: '567', qPol2: '678', r12_1: '67.890.123', r12_2: '89.012.345', isTotal: false },
            { description: 'CAUCIÓN', qPol1: '89', qPol2: '98', r12_1: '8.901.234', r12_2: '12.345.678', isTotal: false },
            { description: 'COMBINADO FAMILIAR', qPol1: '345', qPol2: '456', r12_1: '34.567.890', r12_2: '45.678.901', isTotal: false },
            { description: 'INCENDIO', qPol1: '234', qPol2: '345', r12_1: '23.456.789', r12_2: '34.567.890', isTotal: false },
            { description: 'INT. COMERCIO', qPol1: '123', qPol2: '234', r12_1: '12.345.678', r12_2: '23.456.789', isTotal: false },
            { description: 'INT. CONSORCIO', qPol1: '67', qPol2: '78', r12_1: '6.789.012', r12_2: '7.890.123', isTotal: false },
            { description: 'MOTOS', qPol1: '456', qPol2: '567', r12_1: '45.678.901', r12_2: '56.789.012', isTotal: false },
            { description: 'PRAXIS', qPol1: '78', qPol2: '89', r12_1: '7.890.123', r12_2: '8.901.234', isTotal: false },
            { description: 'RC', qPol1: '789', qPol2: '890', r12_1: '78.901.234', r12_2: '89.012.345', isTotal: false },
            { description: 'ROBO', qPol1: '234', qPol2: '345', r12_1: '23.456.789', r12_2: '34.567.890', isTotal: false },
            { description: 'RS. VS.', qPol1: '123', qPol2: '234', r12_1: '12.345.678', r12_2: '23.456.789', isTotal: false },
            { description: 'SALUD', qPol1: '567', qPol2: '678', r12_1: '56.789.012', r12_2: '67.890.123', isTotal: false },
            { description: 'SEGURO TÉCNICO', qPol1: '157', qPol2: '132', r12_1: '133.314.698', r12_2: '108.466.196', isTotal: false },
            { description: 'SEPELIO INDIVIDUAL', qPol1: '234', qPol2: '345', r12_1: '23.456.789', r12_2: '34.567.890', isTotal: false },
            { description: 'TRANSPORTES', qPol1: '89', qPol2: '98', r12_1: '8.901.234', r12_2: '12.345.678', isTotal: false },
            { description: 'VIDA COLECTIVO', qPol1: '345', qPol2: '456', r12_1: '34.567.890', r12_2: '45.678.901', isTotal: false },
            { description: 'VIDA INDIVIDUAL', qPol1: '234', qPol2: '345', r12_1: '23.456.789', r12_2: '34.567.890', isTotal: false },
            { description: 'VIDA OBLIGATORIO', qPol1: '123', qPol2: '234', r12_1: '12.345.678', r12_2: '23.456.789', isTotal: false },
            { description: 'Total general', qPol1: '75.455', qPol2: '73.631', r12_1: '13.250.722.758', r12_2: '28.410.171.357', isTotal: true }
          ], 'ASSA X RAMO')}
        </div>

        {/* Tabla CRECIMIENTO REAL 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CRECIMIENTO REAL 202506</h2>
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
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    R12
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % R12
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AERONAVEGACIÓN</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">40.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">20.921.842</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">407.44%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AP</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">222</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">18.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111.111.101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AUTOMOTORES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-313</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-1.20%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.563.145.999</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">109.65%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CASCOS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">19.58%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">21.122.222</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">31.25%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAUCIÓN</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">10.11%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.444.444</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">38.71%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">COMBINADO FAMILIAR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">32.17%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.011</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">32.17%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INCENDIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">47.44%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">47.44%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INT. COMERCIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90.24%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90.24%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INT. CONSORCIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">16.42%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.101.111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">16.42%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">MOTOS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">24.34%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.110.111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">24.34%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PRAXIS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">14.10%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.011.111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">14.10%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RC</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">12.80%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10.111.111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">12.80%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ROBO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">47.44%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">47.44%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RS. VS.</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90.24%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90.24%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SALUD</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">19.58%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.101.111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">19.58%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SEGURO TÉCNICO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-25</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-15.92%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-24.848.501</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-18.64%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SEPELIO INDIVIDUAL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">47.44%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">47.44%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TRANSPORTES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">10.11%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3.444.444</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">38.71%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA COLECTIVO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">32.17%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.011</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">32.17%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA INDIVIDUAL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">47.44%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">47.44%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA OBLIGATORIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90.24%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11.111.111</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90.24%</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total general</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">-1.824</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">-2.42%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">15.159.448.599</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">114.40%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Layout específico: CUMP. PPTO YTD + CUMP. PPTO TOTAL en la misma línea */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tabla CUMP. PPTO YTD 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO YTD 202506</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    REAL Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO R12
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AERONAVEGACIÓN</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">6</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">127.27%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7.671.704</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">26.056.851</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">339.65%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AP</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AUTOMOTORES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">28.804</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">25.872</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">89.82%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15.755.607.066</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">22.109.067.730</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">140.33%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CASCOS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89.012.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89.012.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAUCIÓN</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">98</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">98</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12.345.678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12.345.678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">COMBINADO FAMILIAR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45.678.901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45.678.901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INCENDIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INT. COMERCIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INT. CONSORCIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">78</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">78</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7.890.123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7.890.123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">MOTOS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">567</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">567</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">56.789.012</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">56.789.012</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PRAXIS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8.901.234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8.901.234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RC</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89.012.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89.012.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ROBO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RS. VS.</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SALUD</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">67.890.123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">67.890.123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SEGURO TÉCNICO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">173</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">132</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">76.43%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">199.172.158</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">108.466.196</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">54.46%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SEPELIO INDIVIDUAL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TRANSPORTES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">98</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">98</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12.345.678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12.345.678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA COLECTIVO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45.678.901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45.678.901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA INDIVIDUAL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA OBLIGATORIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total general</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">83.002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">73.631</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold text-black">88.71%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">19.797.597.276</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">28.410.171.357</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold text-black">143.50%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla CUMP. PPTO TOTAL 202506 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">CUMP. PPTO TOTAL 202506</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO Q PÓL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    REAL Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Q POL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PPTO R12
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AERONAVEGACIÓN</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">6</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">127.27%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7.671.704</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">26.056.851</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">339.65%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AP</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1.456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AUTOMOTORES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">28.804</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">25.872</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">89.82%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15.755.607.066</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">22.109.067.730</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">140.33%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CASCOS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89.012.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89.012.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAUCIÓN</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">98</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">98</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12.345.678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12.345.678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">COMBINADO FAMILIAR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45.678.901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45.678.901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INCENDIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INT. COMERCIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INT. CONSORCIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">78</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">78</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7.890.123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7.890.123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">MOTOS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">567</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">567</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">56.789.012</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">56.789.012</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PRAXIS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8.901.234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8.901.234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RC</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89.012.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">89.012.345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ROBO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RS. VS.</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SALUD</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">67.890.123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">67.890.123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SEGURO TÉCNICO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">173</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">132</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">76.43%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">199.172.158</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">108.466.196</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">54.46%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SEPELIO INDIVIDUAL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TRANSPORTES</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">98</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">98</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12.345.678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12.345.678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA COLECTIVO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45.678.901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45.678.901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA INDIVIDUAL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34.567.890</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VIDA OBLIGATORIO</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23.456.789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold text-black">100.00%</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-bold">Total general</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">83.002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">73.631</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold text-black">88.71%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">19.797.597.276</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold">28.410.171.357</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-bold text-black">143.50%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  // Renderizado de tablas para ASSA X CÍA
  const renderAssaXCiaTables = () => (
    <>
      {renderMainDataTable([
        { description: 'AFIANZADORA', qPol1: '121', qPol2: '213', r12_1: '23,275,510', r12_2: '30,786,112', isTotal: false },
        { description: 'ALLIANZ', qPol1: '1,564', qPol2: '2,325', r12_1: '313,484,478', r12_2: '1,041,865,659', isTotal: false },
        { description: 'ATM', qPol1: '513', qPol2: '716', r12_1: '46,181,438', r12_2: '138,493,339', isTotal: false },
        { description: 'BOSTON', qPol1: '18', qPol2: '1', r12_1: '8,952,959', r12_2: '74,379', isTotal: false },
        { description: 'CAUCIONES', qPol1: '19', qPol2: '13', r12_1: '5,344,606', r12_2: '1,390,887', isTotal: false },
        { description: 'CHUBB', qPol1: '96', qPol2: '15', r12_1: '15,861,757', r12_2: '18,972,684', isTotal: false },
        { description: 'FED PAT', qPol1: '791', qPol2: '959', r12_1: '305,661,335', r12_2: '531,237,711', isTotal: false },
        { description: 'HDI', qPol1: '9', qPol2: '7', r12_1: '734,095', r12_2: '2,321,757', isTotal: false },
        { description: 'INTEGRITY', qPol1: '1,533', qPol2: '1,619', r12_1: '312,773,035', r12_2: '543,840,130', isTotal: false },
        { description: 'LA HOLANDO', qPol1: '70', qPol2: '62', r12_1: '6,838,282', r12_2: '15,875,658', isTotal: false },
        { description: 'LIBRA', qPol1: '793', qPol2: '490', r12_1: '5,769,511', r12_2: '5,769,511', isTotal: false },
        { description: 'LMA', qPol1: '24,266', qPol2: '23,454', r12_1: '3,366,394,962', r12_2: '9,590,435,724', isTotal: false },
        { description: 'NACION', qPol1: '1', qPol2: '-', r12_1: '12,922', r12_2: '-', isTotal: false },
        { description: 'NOBLE', qPol1: '12', qPol2: '11', r12_1: '6,352,831', r12_2: '13,304,418', isTotal: false },
        { description: 'PRUDENCIA', qPol1: '265', qPol2: '333', r12_1: '46,599,032', r12_2: '129,736,655', isTotal: false },
        { description: 'RIVADAVIA', qPol1: '10', qPol2: '48', r12_1: '2,596,687', r12_2: '22,280,185', isTotal: false },
        { description: 'RUS', qPol1: '11', qPol2: '9', r12_1: '1,497,250', r12_2: '3,311,881', isTotal: false },
        { description: 'SANCOR', qPol1: '4,675', qPol2: '3,256', r12_1: '988,772,441', r12_2: '2,826,362,279', isTotal: false },
        { description: 'SMG', qPol1: '27,059', qPol2: '25,746', r12_1: '7,188,385,151', r12_2: '12,404,213,055', isTotal: false },
        { description: 'SMG LIFE', qPol1: '13,379', qPol2: '13,295', r12_1: '528,038,385', r12_2: '684,862,351', isTotal: false },
        { description: 'TPC', qPol1: '20', qPol2: '-', r12_1: '81,052', r12_2: '20,927', isTotal: false },
        { description: 'VICTORIA', qPol1: '46', qPol2: '214', r12_1: '7,172,892', r12_2: '55,348,609', isTotal: false },
        { description: 'ZURICH', qPol1: '8', qPol2: '2', r12_1: '2,291,112', r12_2: '96,455', isTotal: false },
        { description: 'COSENA', qPol1: '136', qPol2: '218', r12_1: '61,962,312', r12_2: '52,853,317', isTotal: false },
        { description: 'SAN CRISTOBAL', qPol1: '40', qPol2: '621', r12_1: '5,688,723', r12_2: '296,318,204', isTotal: false },
        { description: 'Total General', qPol1: '75,455', qPol2: '73,631', r12_1: '13,250,722,758', r12_2: '28,410,171,357', isTotal: true }
      ], 'ASSA X CÍA')}
      {renderAssaGrowthTable()}
      {renderAssaYTDComplianceTable()}
      {renderAssaTotalComplianceTable()}
    </>
  );

  // Tabla de crecimiento específica para ASSA X CÍA
  const renderAssaGrowthTable = () => (
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
                Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                R12
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % R12
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AFIANZADORA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">92</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">76,03%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7,510,602</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">32,27%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ALLIANZ</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">761</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">48,66%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">728,381,180</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">232,35%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ATM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">203</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">39,57%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">92,311,901</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">199,89%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BOSTON</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-17</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-94,44%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-8,878,580</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-99,17%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAUCIONES</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-6</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-31,58%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-3,953,720</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-73,98%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CHUBB</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-81</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-84,38%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,110,927</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">19,61%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FED PAT</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">168</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">21,24%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">225,576,376</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">73,80%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HDI</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-22,22%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,587,663</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">216,27%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INTEGRITY</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">86</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">5,61%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">231,067,095</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">73,88%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LA HOLANDO</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-8</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-11,43%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9,037,376</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">132,16%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LIBRA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-303</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-38,21%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">0</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,00%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LMA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-812</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-3,35%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">6,224,040,762</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">184,89%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">NACION</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-100,00%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-12,922</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-100,00%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">NOBLE</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-8,33%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">6,951,587</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">109,43%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PRUDENCIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">68</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">25,66%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">83,137,623</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">178,41%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RIVADAVIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">38</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">380,00%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">19,683,498</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">758,02%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RUS</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-18,18%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,814,631</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">121,20%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SANCOR</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-1,419</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-30,35%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,837,589,837</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">185,85%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-1,313</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-4,85%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">5,215,827,904</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">72,56%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG LIFE</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-84</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-0,63%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">156,823,967</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">29,70%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TPC</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-20</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-100,00%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-60,125</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-74,18%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VICTORIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">168</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">365,22%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">48,175,717</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">671,64%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ZURICH</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-6</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-75,00%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-2,194,657</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-95,79%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">COSENA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">82</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">60,29%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-9,108,995</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-14,70%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SAN CRISTOBAL</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">581</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">1,452,50%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">290,629,481</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">5,108,87%</td>
            </tr>
            <tr className="hover:bg-gray-50 bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total General</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-1,824</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">-2,42%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">15,159,448,599</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">114,40%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Tabla de cumplimiento YTD específica para ASSA X CÍA
  const renderAssaYTDComplianceTable = () => (
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
                PPTO Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                REAL Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                PPTO R12
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AFIANZADORA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">133</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">213</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">160,03%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34,773,612</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">30,786,112</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">88,53%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ALLIANZ</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,720</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2,325</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">135,14%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">468,345,810</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,041,865,659</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">222,46%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ATM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">564</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">716</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">126,88%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">68,995,069</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">138,493,339</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">200,73%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BOSTON</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">20</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">5,05%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13,375,720</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">74,379</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,56%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAUCIONES</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">21</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">62,20%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7,984,842</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,390,887</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">17,42%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CHUBB</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">106</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">14,20%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23,697,464</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">18,972,684</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">80,06%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FED PAT</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">870</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">959</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">110,22%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456,658,035</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">531,237,711</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">116,33%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HDI</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">70,71%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,096,737</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2,321,757</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">211,70%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INTEGRITY</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,686</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,619</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">96,01%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">467,282,914</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">543,840,130</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">116,38%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LA HOLANDO</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">77</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">62</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">80,52%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10,216,393</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15,875,658</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">155,39%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LIBRA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">872</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">490</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">56,17%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8,619,650</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">5,769,511</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">66,93%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LMA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">26,693</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23,454</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">87,87%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">5,029,394,074</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9,590,435,724</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">190,69%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">NACION</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,00%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">19,305</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,00%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">NOBLE</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">83,33%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9,491,130</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13,304,418</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">140,18%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PRUDENCIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">292</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">333</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">114,24%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">69,618,953</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">129,736,655</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">186,35%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RIVADAVIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">48</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">436,36%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,879,450</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">22,280,185</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">574,31%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RUS</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">74,38%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2,236,892</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,311,881</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">148,06%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SANCOR</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">5,143</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,256</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">63,32%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,477,226,027</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2,826,362,279</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">191,33%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">29,765</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">25,746</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">86,50%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10,739,447,416</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12,404,213,055</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">115,50%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG LIFE</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">14,717</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13,295</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90,34%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">788,889,347</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">684,862,351</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">86,81%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TPC</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">22</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,00%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">121,091</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">20,927</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">17,28%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VICTORIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">51</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">214</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">422,92%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10,716,301</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">55,348,609</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">516,49%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ZURICH</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">22,73%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,422,922</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">96,455</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">2,82%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">COSENA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">150</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">218</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">145,72%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">92,571,694</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">52,853,317</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">57,09%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SAN CRISTOBAL</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">621</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">1,375,42%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9,516,428</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">296,318,204</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">3,113,75%</td>
            </tr>
            <tr className="hover:bg-gray-50 bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total General</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">83,002</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">73,631</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">88,71%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">19,797,597,276</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">28,410,171,357</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">143,50%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Tabla de cumplimiento total específica para ASSA X CÍA
  const renderAssaTotalComplianceTable = () => (
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
                PPTO Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                REAL Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Q PÓL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                PPTO R12
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AFIANZADORA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">133</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">213</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">160,03%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">34,773,612</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">30,786,112</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">88,53%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ALLIANZ</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,720</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2,325</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">135,14%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">468,345,810</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,041,865,659</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">222,46%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ATM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">564</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">716</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">126,88%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">68,995,069</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">138,493,339</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">200,73%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BOSTON</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">20</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">5,05%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13,375,720</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">74,379</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,56%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAUCIONES</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">21</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">62,20%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7,984,842</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,390,887</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">17,42%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CHUBB</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">106</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">14,20%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23,697,464</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">18,972,684</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">80,06%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FED PAT</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">870</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">959</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">110,22%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">456,658,035</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">531,237,711</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">116,33%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HDI</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">7</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">70,71%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,096,737</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2,321,757</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">211,70%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INTEGRITY</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,686</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,619</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">96,01%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">467,282,914</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">543,840,130</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">116,38%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LA HOLANDO</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">77</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">62</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">80,52%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10,216,393</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">15,875,658</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">155,39%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LIBRA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">872</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">490</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">56,17%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">8,619,650</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">5,769,511</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">66,93%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LMA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">26,693</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">23,454</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">87,87%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">5,029,394,074</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9,590,435,724</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">190,69%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">NACION</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,00%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">19,305</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,00%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">NOBLE</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">83,33%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9,491,130</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13,304,418</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">140,18%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PRUDENCIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">292</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">333</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">114,24%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">69,618,953</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">129,736,655</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">186,35%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RIVADAVIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">11</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">48</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">436,36%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,879,450</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">22,280,185</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">574,31%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RUS</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">74,38%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2,236,892</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,311,881</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">148,06%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SANCOR</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">5,143</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,256</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">63,32%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">1,477,226,027</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2,826,362,279</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">191,33%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">29,765</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">25,746</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">86,50%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10,739,447,416</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">12,404,213,055</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">115,50%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SMG LIFE</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">14,717</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">13,295</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">90,34%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">788,889,347</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">684,862,351</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">86,81%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TPC</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">22</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">0,00%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">121,091</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">20,927</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">17,28%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">VICTORIA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">51</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">214</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">422,92%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">10,716,301</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">55,348,609</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">516,49%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ZURICH</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">22,73%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">3,422,922</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">96,455</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">2,82%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">COSENA</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">150</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">218</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">145,72%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">92,571,694</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">52,853,317</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">57,09%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SAN CRISTOBAL</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">45</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">621</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">1,375,42%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">9,447,413</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">296,318,204</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">3,136,50%</td>
            </tr>
            <tr className="hover:bg-gray-50 bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total General</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">83,002</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">73,631</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">88,71%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">19,797,528,261</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">28,410,171,357</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black font-semibold">143,50%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
