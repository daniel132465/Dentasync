import { supabase } from '@/lib/supabase';

// Revalidar en cada request para asegurar datos actualizados en la demo
export const revalidate = 0;

export default async function Home() {
  // Realiza una consulta directa a la tabla "prueba" para extraer la columna "numero"
  const { data, error } = await supabase
    .from('prueba')
    .select('numero')
    .limit(20);

  if (error) {
    console.error('Error fetching data from Supabase:', error.message);
  }

  const numeros = data || [];

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-16 px-4">
      {/* Encabezado principal */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-blue-600 mb-12 drop-shadow-sm">
        DENTASYNC
      </h1>

      {/* Grid de números */}
      <div className="w-full max-w-4xl">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600 font-medium">Error al cargar los datos de Supabase:</p>
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          </div>
        ) : numeros.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No hay datos en la tabla "prueba".</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {numeros.map((item, index) => (
              <li 
                key={index} 
                className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
              >
                <span className="text-3xl font-bold text-blue-800">
                  {item.numero}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
