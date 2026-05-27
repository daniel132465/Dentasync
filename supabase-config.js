import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Credenciales oficiales de producción del proyecto DentaSync
const supabaseUrl = 'https://kjbrpydruswugwshvwvb.supabase.co';
const supabaseKey = 'sb_publishable_U1iNyWHxH_pF8rMFbKRGvg_OqQ730yk';

export const supabase = createClient(supabaseUrl, supabaseKey);
