interface ChartPlaceholderProps {
  title: string;
  chartType: 'line' | 'bar' | 'pie' | 'area';
  description: string;
}

export default function ChartPlaceholder({ title, chartType, description }: ChartPlaceholderProps) {
  const chartIcons = {
    line: 'fa-solid fa-chart-line',
    bar: 'fa-solid fa-chart-bar',
    pie: 'fa-solid fa-chart-pie',
    area: 'fa-solid fa-chart-area'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        {title}
      </h3>
      <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
        <div className="text-center">
          <i className={`${chartIcons[chartType]} text-5xl text-gray-400 mb-4`}></i>
          <p className="text-gray-500 font-medium">{chartType === 'line' ? 'Gráfico de Línea' : 
                                                   chartType === 'bar' ? 'Gráfico de Barras' :
                                                   chartType === 'pie' ? 'Gráfico Circular' :
                                                   'Gráfico de Área'}</p>
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
} 