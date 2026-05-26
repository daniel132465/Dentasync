const supabaseUrl = 'https://kjbrpydruswugwshvwvb.supabase.co';
const supabaseKey = 'sb_publishable_U1iNyWHxH_pF8rMFbKRGvg_OqQ730yk';

// Inicializar el cliente Supabase
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function fetchNumeros() {
    const loadingText = document.getElementById('loading-text');
    const numbersGrid = document.getElementById('numbers-grid');
    const dataContainer = document.getElementById('data-container');

    try {
        // Consultar la tabla "prueba" con límite de 20
        const { data, error } = await supabase
            .from('prueba')
            .select('numero')
            .limit(20);

        if (error) {
            throw error;
        }

        loadingText.classList.add('hidden');
        numbersGrid.classList.remove('hidden');

        if (!data || data.length === 0) {
            const noDataMsg = document.createElement('p');
            noDataMsg.className = 'text-gray-500 text-center text-lg';
            noDataMsg.textContent = 'No hay datos en la tabla "prueba".';
            dataContainer.appendChild(noDataMsg);
            return;
        }

        // Inyectar datos en la UI
        data.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200';
            
            const span = document.createElement('span');
            span.className = 'text-3xl font-bold text-blue-800';
            span.textContent = item.numero;
            
            li.appendChild(span);
            numbersGrid.appendChild(li);
        });

    } catch (error) {
        console.error('Error al obtener datos de Supabase:', error);
        loadingText.textContent = `Error al cargar datos: ${error.message}`;
        loadingText.classList.remove('animate-pulse');
        loadingText.classList.add('text-red-500');
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', fetchNumeros);
