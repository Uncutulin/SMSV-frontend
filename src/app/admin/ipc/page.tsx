'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface IPCData {
  id: string;
  mes: string;
  ipcMes: number;
  ipcYtd: number;
  ipcInteranual: number;
}

export default function IPCPage() {
  const [ipcData, setIpcData] = useState<IPCData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    mes: '',
    ipcMes: '',
    ipcYtd: '',
    ipcInteranual: ''
  });

  const handleAdd = () => {
    if (!formData.mes || !formData.ipcMes || !formData.ipcYtd || !formData.ipcInteranual) {
      alert('Por favor complete todos los campos');
      return;
    }

    const newData: IPCData = {
      id: Date.now().toString(),
      mes: formData.mes,
      ipcMes: parseFloat(formData.ipcMes),
      ipcYtd: parseFloat(formData.ipcYtd),
      ipcInteranual: parseFloat(formData.ipcInteranual)
    };

    setIpcData([...ipcData, newData]);
    setFormData({ mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '' });
  };

  const handleEdit = (id: string) => {
    const item = ipcData.find(data => data.id === id);
    if (item) {
      setFormData({
        mes: item.mes,
        ipcMes: item.ipcMes.toString(),
        ipcYtd: item.ipcYtd.toString(),
        ipcInteranual: item.ipcInteranual.toString()
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
            ipcInteranual: parseFloat(formData.ipcInteranual)
          }
        : item
    ));

    setFormData({ mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '' });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
      setIpcData(ipcData.filter(item => item.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ mes: '', ipcMes: '', ipcYtd: '', ipcInteranual: '' });
    setEditingId(null);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Administración IPC</h1>
          <p className="text-gray-600">Gestione los datos del Índice de Precios al Consumidor</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Editar Registro IPC' : 'Agregar Nuevo Registro IPC'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mes (YYYYMM)
              </label>
              <input
                type="text"
                placeholder="202501"
                value={formData.mes}
                onChange={(e) => setFormData({...formData, mes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % IPC Mes
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="1.90"
                value={formData.ipcMes}
                onChange={(e) => setFormData({...formData, ipcMes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % IPC YTD
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="1.90"
                value={formData.ipcYtd}
                onChange={(e) => setFormData({...formData, ipcYtd: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % IPC Interanual
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="36.55"
                value={formData.ipcInteranual}
                onChange={(e) => setFormData({...formData, ipcInteranual: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            {editingId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Actualizar
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Agregar
              </button>
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
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ipcData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No hay datos cargados. Agregue el primer registro.
                    </td>
                  </tr>
                ) : (
                  ipcData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.mes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                        {item.ipcMes.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.ipcYtd.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                        {item.ipcInteranual.toFixed(2)}%
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
                            className="text-red-600 hover:text-red-900"
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
