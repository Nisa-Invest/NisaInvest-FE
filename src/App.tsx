import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Footer } from '@/components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import { supabase } from './lib/supabaseClient';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

function App() {


    // Testing if environment variables are being well resolved
    useEffect(() => {
        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
        console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);
      }, []);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
            if (event === 'SIGNED_IN') {
                // Handle sign in
                console.log('User signed in:', session?.user);
                // You might want to update your app state or context here
            } else if (event === 'SIGNED_OUT') {
                // Handle sign out
                console.log('User signed out');
                // You might want to clear user data from your app state or context here
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <>
            <BrowserRouter>
                <div className='grid min-h-[100dvh] grid-rows-[auto_1fr_auto]'>
                    <NavBar />
                    <AppRoutes />
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;