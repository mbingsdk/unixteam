import { Metadata } from 'next';
import ContactForm from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | UNIX-TEAM',
  description: 'Hubungi UNIX-TEAM. Kalau sempat, kita balas.',
};

export default function ContactPage() {
  return <ContactForm />;
}