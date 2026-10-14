import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function framesApiPlugin(): Plugin {
  const syncManifest = () => {
    try {
      const framesDir = path.resolve('public/frames');
      if (fs.existsSync(framesDir)) {
        const files = fs.readdirSync(framesDir)
          .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        fs.writeFileSync(
          path.join(framesDir, 'manifest.json'),
          JSON.stringify({ generatedAt: new Date().toISOString(), count: files.length, frames: files }, null, 2),
          'utf-8'
        );
      }
    } catch (e) {
      console.warn('Frames manifest auto-sync notice:', e);
    }
  };

  return {
    name: 'frames-api',
    buildStart() {
      syncManifest();
    },
    configureServer(server) {
      syncManifest();

      server.middlewares.use('/api/list-frames', (_req, res) => {
        const framesDir = path.resolve('public/frames');
        if (!fs.existsSync(framesDir)) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ frames: [] }));
          return;
        }
        try {
          const files = fs.readdirSync(framesDir)
            .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ frames: files }));
        } catch {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ frames: [] }));
        }
      });

      server.middlewares.use('/api/upload-frames', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const framesDir = path.resolve('public/frames');
        fs.mkdirSync(framesDir, { recursive: true });

        const chunks: Buffer[] = [];
        req.on('data', chunk => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        req.on('end', () => {
          try {
            const raw = Buffer.concat(chunks).toString('utf-8');
            const data = JSON.parse(raw);
            if (Array.isArray(data.frames)) {
              for (const item of data.frames) {
                if (item.filename && item.dataUrl) {
                  const safeFilename = path.basename(item.filename);
                  const base64Data = item.dataUrl.replace(/^data:image\/\w+;base64,/, '');
                  const buf = Buffer.from(base64Data, 'base64');
                  fs.writeFileSync(path.join(framesDir, safeFilename), buf);
                }
              }
              const saved = fs.readdirSync(framesDir)
                .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
                .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
              
              fs.writeFileSync(
                path.join(framesDir, 'manifest.json'),
                JSON.stringify({ generatedAt: new Date().toISOString(), count: saved.length, frames: saved }, null, 2),
                'utf-8'
              );

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: saved.length, frames: saved }));
              return;
            }
          } catch (err) {
            console.error('Failed to parse frame upload:', err);
          }
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Invalid frame payload' }));
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), framesApiPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase') || id.includes('@firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'vendor-motion';
            }
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts';
            }
            return 'vendor-misc';
          }
        },
      },
    },
  },
});
