import { useState, useEffect } from 'react';

/**
 * Hook para retrasar la actualización de un valor (Debouncing).
 * Útil para optimizar búsquedas en tiempo real y evitar ejecuciones excesivas.
 * * @template T - Tipo de dato del valor a de-bouncificar.
 * @param {T} value - Valor de entrada que cambia frecuentemente.
 * @param {number} delay - Tiempo de espera en milisegundos.
 * @returns {T} El valor actualizado solo después de que haya transcurrido el tiempo definido.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}