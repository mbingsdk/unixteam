import { Metadata } from 'next';
import ContactForm from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | UNIX-TEAM',
  description: 'Get in touch with UNIX-TEAM. We&apos;d love to hear from you!',
};

export default function ContactPage() {
  return <ContactForm />;
}
