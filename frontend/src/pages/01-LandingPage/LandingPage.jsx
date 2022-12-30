import DaftarMentor from '../../components/01-ComponentLPage/DaftarMentor/DaftarMentor';
import Faq from '../../components/01-ComponentLPage/FAQ/Faq';
import Features from '../../components/01-ComponentLPage/Features/Features';
import Hero from '../../components/01-ComponentLPage/Hero/Hero';
import Testimoni from '../../components/01-ComponentLPage/Testimoni/Testimoni';

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Features />
      <DaftarMentor />
      <Testimoni />
      <Faq />
    </div>
  );
}
