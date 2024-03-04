import { Loader } from 'views/Loader';
import { Home } from 'views/Home';
import { useGlobalStore } from 'store/global';

function App() {
    const loading = useGlobalStore((state) => state.loading);

    return loading ? <Loader /> : <Home />;
}

export default App;
