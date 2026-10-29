import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';


export default function HomePage() {

    const [status, setStatus] = useState('Verifica connessione in corso...')

    useEffect(() => {
        async function checkConnection() {
            // Facciamo una chiamata di prova a Supabase
            const { data, error } = await supabase.from('test_connection').select('*').limit(1)

            // Se l'errore è 42P01 (relation does not exist), la connessione FUNZIONA! 
            // Significa solo che la tabella 'test_connection' non esiste ancora sul DB.
            if (error && error.code === '42P01') {
                setStatus('✅ Connessione a Supabase riuscita con successo!')
            } else if (error) {
                setStatus(`❌ Errore di connessione o chiavi errate: ${error.message}`)
            } else {
                setStatus('✅ Connessione a Supabase riuscita!')
            }
        }

        checkConnection()
    }, [])


    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Test Connessione Supabase</h1>
            <p><strong>Stato:</strong> {status}</p>
        </div>
    )
}

