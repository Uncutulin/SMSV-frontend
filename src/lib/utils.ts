// src/lib/formatters.ts
export const cleanCurrency = (val: any): number | any => {
    if (typeof val === 'string') {
        // Elimina puntos de miles, cambia coma decimal por punto y quita símbolos
        const cleaned = val.replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
        const num = parseFloat(cleaned);
        return isNaN(num) ? val : num;
    }
    return typeof val === 'number' ? val : val;
};