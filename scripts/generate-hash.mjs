// Jalankan: node scripts/generate-hash.mjs
// Ganti PASSWORD_HERE dengan password yang kamu mau

import bcrypt from 'bcryptjs';

const password = 'virus6606';
const hash = await bcrypt.hash(password, 12);

console.log('\n✅ Hash berhasil dibuat!');
console.log('Salin hash ini ke ADMIN_PASSWORD_HASH di admin page:\n');
console.log(hash);
console.log('');
