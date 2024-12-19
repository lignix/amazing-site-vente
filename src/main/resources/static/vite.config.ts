import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../../static', // Placer les fichiers de production dans le répertoire `static`
        emptyOutDir: true,      // Nettoyer le répertoire avant chaque build
    },
});
