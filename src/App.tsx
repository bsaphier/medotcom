import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Loader } from 'views/Loader';
import { Home } from 'views/Home';
import { useGlobalStore } from 'store/global';

function App() {
    const [loading, setLoading] = useGlobalStore(
        useShallow((state) => [state.loading, state.setLoading]),
    );

    useEffect(() => {
        // simulate some load time
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 3333);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [setLoading]);

    return loading ? <Loader /> : <Home />;
}

export default App;
