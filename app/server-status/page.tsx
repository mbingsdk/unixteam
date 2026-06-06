import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, MessageCircle, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';

export const metadata: Metadata = {
  title: 'Server Status | UNIX-TEAM',
  description: 'Check the real-time status of UNIX-TEAM services and infrastructure.',
};

const services = [
  {
    name: 'Website',
    status: 'operational',
    uptime: 99.99,
    lastChecked: 'Just now',
  },
  {
    name: 'Discord API',
    status: 'operational',
    uptime: 99.95,
    lastChecked: '5 minutes ago',
  },
  {
    name: 'Game Servers',
    status: 'operational',
    uptime: 99.8,
    lastChecked: '2 minutes ago',
  },
  {
    name: 'File Storage',
    status: 'operational',
    uptime: 100,
    lastChecked: '1 minute ago',
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'operational':
      return 'text-green-400 bg-green-500/10';
    case 'degraded':
      return 'text-yellow-400 bg-yellow-500/10';
    case 'down':
      return 'text-red-400 bg-red-500/10';
    default:
      return 'text-gray-400 bg-gray-500/10';
  }
}

export default function ServerStatusPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back button */}
          <ScrollReveal className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              Server Status
            </h1>
            <p className="text-foreground/60 text-lg">
              Real-time status of all UNIX-TEAM services
            </p>
          </ScrollReveal>

          {/* Overall Status */}
          <ScrollReveal delay={0.1} className="mb-12">
            <div className="glass-effect rounded-lg p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-2xl font-bold text-green-400">
                  All Systems Operational
                </span>
              </div>
              <p className="text-foreground/60 mb-6">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
              {/* Refresh button */}
              <Link
                href="/server-status"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground/70 hover:text-accent hover:border-accent/50 transition-all text-sm font-medium"
              >
                <RefreshCw size={15} />
                Refresh Status
              </Link>
            </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Services</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <ScrollReveal key={service.name} delay={index * 0.05}>
                  <div className="glass-effect rounded-lg p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {service.name}
                      </h3>
                      <p className="text-foreground/60 text-sm">
                        Last checked: {service.lastChecked}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-block px-4 py-2 rounded-lg font-semibold text-sm mb-2 ${getStatusColor(service.status)}`}
                      >
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </div>
                      <p className="text-foreground/60 text-sm">
                        {service.uptime}% uptime
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA Section */}
          <ScrollReveal delay={0.4} className="mt-16">
            <div className="glass-effect rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Ada masalah atau mau laporin gangguan?
              </h2>
              <p className="text-foreground/60 text-sm mb-6">
                Kalau ada service yang ga beres, langsung aja lapor di Discord kita.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://discord.gg/Jdqhnyu2dw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-all"
                >
                  <MessageCircle size={16} />
                  Lapor di Discord
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground/70 hover:text-accent hover:border-accent/50 transition-all text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}