import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Big 404 */}
        <div className="relative">
          <p className="text-[10rem] font-bold leading-none text-accent/10 select-none tracking-tighter">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-6xl font-bold text-accent tracking-tighter">404</p>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Halaman Ini Ga Ada
          </h1>
          <p className="text-foreground/50 text-sm leading-relaxed">
            Mungkin lu salah ketik, mungkin halamannya dihapus, atau mungkin
            emang ga pernah ada. Sama kayak ETA project UNIX — ga jelas
            kapannya.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 transition-all w-full sm:w-auto justify-center shadow-lg shadow-accent/25"
          >
            <Home size={16} />
            Balik ke Home
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-foreground/70 hover:text-accent hover:bg-white/[0.08] font-semibold text-sm transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={16} />
            Liat Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
