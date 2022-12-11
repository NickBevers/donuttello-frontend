import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    // bestanden worden herkend via hieronder opgegeven extensies
    assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.png'],
    plugins: [vue()],
});
