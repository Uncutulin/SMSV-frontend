"use client";
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AssaPorRiesgo() {
  // Datos de riesgos ASSA
  const riesgosData = [
    { riesgo: 'AP', qPolJunio: '1,245', r12Junio: '$ 498,000', qPolJulio: '1,380', r12Julio: '$ 552,000', qPolCrec: '+135', r12Crec: '+$ 54,000' },
    { riesgo: 'AUTOMOTORES', qPolJunio: '2,156', r12Junio: '$ 862,400', qPolJulio: '2,340', r12Julio: '$ 936,000', qPolCrec: '+184', r12Crec: '+$ 73,600' },
    { riesgo: 'RC', qPolJunio: '890', r12Junio: '$ 356,000', qPolJulio: '945', r12Julio: '$ 378,000', qPolCrec: '+55', r12Crec: '+$ 22,000' },
    { riesgo: 'ROBO', qPolJunio: '567', r12Junio: '$ 226,800', qPolJulio: '612', r12Julio: '$ 244,800', qPolCrec: '+45', r12Crec: '+$ 18,000' },
    { riesgo: 'SALUD', qPolJunio: '1,789', r12Junio: '$ 715,600', qPolJulio: '1,890', r12Julio: '$ 756,000', qPolCrec: '+101', r12Crec: '+$ 40,400' },
    { riesgo: 'COMBINADO FAMILIAR', qPolJunio: '2,345', r12Junio: '$ 938,000', qPolJulio: '2,520', r12Julio: '$ 1,008,000', qPolCrec: '+175', r12Crec: '+$ 70,000' },
    { riesgo: 'VIDA OBLIGATORIO', qPolJunio: '3,456', r12Junio: '$ 1,382,400', qPolJulio: '3,680', r12Julio: '$ 1,472,000', qPolCrec: '+224', r12Crec: '+$ 89,600' },
    { riesgo: 'VIDA INDIVIDUAL', qPolJunio: '1,234', r12Junio: '$ 493,600', qPolJulio: '1,320', r12Julio: '$ 528,000', qPolCrec: '+86', r12Crec: '+$ 34,400' },
    { riesgo: 'INCENDIO', qPolJunio: '678', r12Junio: '$ 271,200', qPolJulio: '720', r12Julio: '$ 288,000', qPolCrec: '+42', r12Crec: '+$ 16,800' },
    { riesgo: 'INT. COMERCIO', qPolJunio: '445', r12Junio: '$ 178,000', qPolJulio: '480', r12Julio: '$ 192,000', qPolCrec: '+35', r12Crec: '+$ 14,000' },
    { riesgo: 'PRAXIS', qPolJunio: '789', r12Junio: '$ 315,600', qPolJulio: '840', r12Julio: '$ 336,000', qPolCrec: '+51', r12Crec: '+$ 20,400' },
    { riesgo: 'INT. CONSORCIO', qPolJunio: '234', r12Junio: '$ 93,600', qPolJulio: '255', r12Julio: '$ 102,000', qPolCrec: '+21', r12Crec: '+$ 8,400' },
    { riesgo: 'SEGURO TÉCNICO', qPolJunio: '123', r12Junio: '$ 49,200', qPolJulio: '135', r12Julio: '$ 54,000', qPolCrec: '+12', r12Crec: '+$ 4,800' },
    { riesgo: 'SEPELIO INDIVIDUAL', qPolJunio: '456', r12Junio: '$ 182,400', qPolJulio: '480', r12Julio: '$ 192,000', qPolCrec: '+24', r12Crec: '+$ 9,600' },
    { riesgo: 'AERONAVEGACIÓN', qPolJunio: '67', r12Junio: '$ 26,800', qPolJulio: '72', r12Julio: '$ 28,800', qPolCrec: '+5', r12Crec: '+$ 2,000' },
    { riesgo: 'CASCOS', qPolJunio: '89', r12Junio: '$ 35,600', qPolJulio: '96', r12Julio: '$ 38,400', qPolCrec: '+7', r12Crec: '+$ 2,800' },
    { riesgo: 'VIDA COLECTIVO', qPolJunio: '567', r12Junio: '$ 226,800', qPolJulio: '600', r12Julio: '$ 240,000', qPolCrec: '+33', r12Crec: '+$ 13,200' },
    { riesgo: 'TRANSPORTES', qPolJunio: '234', r12Junio: '$ 93,600', qPolJulio: '252', r12Julio: '$ 100,800', qPolCrec: '+18', r12Crec: '+$ 7,200' },
    { riesgo: 'CAUCIÓN', qPolJunio: '123', r12Junio: '$ 49,200', qPolJulio: '132', r12Julio: '$ 52,800', qPolCrec: '+9', r12Crec: '+$ 3,600' },
    { riesgo: 'RS. VS.', qPolJunio: '345', r12Junio: '$ 138,000', qPolJulio: '372', r12Julio: '$ 148,800', qPolCrec: '+27', r12Crec: '+$ 10,800' },
    { riesgo: 'MOTOS', qPolJunio: '678', r12Junio: '$ 271,200', qPolJulio: '720', r12Julio: '$ 288,000', qPolCrec: '+42', r12Crec: '+$ 16,800' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">CARTERA ASSA</h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">EVOLUCIÓN ASSA POR RIESGO</h2>
        </div>

        {/* Tabla de ASSA por Riesgo */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* Header principal */}
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-3 text-left font-bold">CANAL</th>
                  <th className="px-4 py-3 text-center font-bold" colSpan={2}>JUNIO 23</th>
                  <th className="px-4 py-3 text-center font-bold" colSpan={2}>JULIO 23</th>
                  <th className="px-4 py-3 text-center font-bold" colSpan={2}>CRECIMIENTO</th>
                </tr>
                <tr className="bg-blue-100">
                  <th className="px-4 py-2 text-left font-semibold text-blue-800">RIESGO</th>
                  <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                  <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                  <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                  <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                  <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                  <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                </tr>
              </thead>
              <tbody>
                {riesgosData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 font-medium text-gray-900">{item.riesgo}</td>
                    <td className="px-4 py-2 text-center text-red-600">{item.qPolJunio}</td>
                    <td className="px-4 py-2 text-center text-gray-900">{item.r12Junio}</td>
                    <td className="px-4 py-2 text-center text-red-600">{item.qPolJulio}</td>
                    <td className="px-4 py-2 text-center text-gray-900">{item.r12Julio}</td>
                    <td className="px-4 py-2 text-center text-gray-900">{item.qPolCrec}</td>
                    <td className="px-4 py-2 text-center text-gray-900">{item.r12Crec}</td>
                  </tr>
                ))}
                {/* Total general */}
                <tr className="bg-blue-100 font-bold">
                  <td className="px-4 py-3 text-gray-900">Total general</td>
                  <td className="px-4 py-3 text-center text-gray-900">16,987</td>
                  <td className="px-4 py-3 text-center text-gray-900">$ 6,794,800</td>
                  <td className="px-4 py-3 text-center text-gray-900">18,240</td>
                  <td className="px-4 py-3 text-center text-gray-900">$ 7,296,000</td>
                  <td className="px-4 py-3 text-center text-gray-900">+1,253</td>
                  <td className="px-4 py-3 text-center text-gray-900">+$ 501,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 