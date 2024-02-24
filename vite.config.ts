import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            views: '/src/views',
            store: '/src/store',
            components: '/src/components',
        },
    },
});
