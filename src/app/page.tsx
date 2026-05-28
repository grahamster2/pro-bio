import { Metadata } from 'next';
import AuroraHome from '@/components/AuroraHome';

export const metadata: Metadata = {
  title: 'Rovult | Websites that bring in customers',
  description: 'We build fast, professional websites for local service businesses. Calm, premium, and built to get you more calls.',
};

export default function HomePage() {
  return <AuroraHome />;
}
