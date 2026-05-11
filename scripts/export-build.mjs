// scripts/export-build.mjs
import { renameSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const API_DIR = 'app/api';
const API_BACKUP = 'app/_api_backup';

console.log('📦 Static export build — menyembunyikan app/api sementara...');

try {
  if (existsSync(API_DIR)) renameSync(API_DIR, API_BACKUP);
  execSync('next build', {
    stdio: 'inherit',
    env: { ...process.env, NEXT_EXPORT: '1' },
  });
} finally {
  // Selalu kembalikan, bahkan kalau build gagal
  if (existsSync(API_BACKUP)) {
    renameSync(API_BACKUP, API_DIR);
    console.log('✅ app/api dikembalikan.');
  }
}