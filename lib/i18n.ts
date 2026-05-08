import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        team: 'Team',
        projects: 'Projects',
        blog: 'Blog',
        faq: 'FAQ',
        discord: 'Discord',
        docs: 'Documentation',
        status: 'Server Status',
        contact: 'Contact',
      },
      common: {
        joinDiscord: 'Join Discord',
        learnMore: 'Learn More',
        viewProject: 'View Project',
        readMore: 'Read More',
        search: 'Search',
        filter: 'Filter',
        loading: 'Loading...',
        error: 'An error occurred',
        notFound: 'Not found',
      },
    },
  },
  id: {
    translation: {
      nav: {
        home: 'Beranda',
        about: 'Tentang',
        team: 'Tim',
        projects: 'Proyek',
        blog: 'Blog',
        faq: 'Tanya Jawab',
        discord: 'Discord',
        docs: 'Dokumentasi',
        status: 'Status Server',
        contact: 'Kontak',
      },
      common: {
        joinDiscord: 'Bergabung Discord',
        learnMore: 'Pelajari Lebih Lanjut',
        viewProject: 'Lihat Proyek',
        readMore: 'Baca Selengkapnya',
        search: 'Cari',
        filter: 'Filter',
        loading: 'Memuat...',
        error: 'Terjadi kesalahan',
        notFound: 'Tidak ditemukan',
      },
    },
  },
};

export const initializeI18n = () => {
  if (i18n.isInitialized) return;

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

export default i18n;
