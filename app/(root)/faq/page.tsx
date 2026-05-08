import { Metadata } from 'next';
import FAQAccordion from '@/components/sections/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ | UNIX-TEAM',
  description: 'Frequently asked questions about UNIX-TEAM community and projects.',
};

export default function FAQPage() {
  return <FAQAccordion />;
}
