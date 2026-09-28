import {ArrowRight} from 'lucide-react';
import {xvImage} from './visuals';
import './public-hero.css';

type Navigate = (route:'/'|'/productos'|'/cotiza-tu-propio-pastel') => void;
export function PublicHero({go}:{go:Navigate}){
  return <section className="calm-hero" aria-labelledby="calm-hero-title">
    <div className="calm-hero-inner container">
      <div className="calm-hero-copy"><div className="calm-hero-copy-inner">
        <p className="eyebrow">AWAKE & BAKE · PASTELERÍA PARA CELEBRAR</p>
        <h1 id="calm-hero-title">Cada celebración tiene su <em>dulce historia.</em></h1>
        <p className="calm-hero-lead">Pasteles personalizados alrededor de tu ocasión. Comparte tu idea, el diseño que imaginas y los detalles de tu celebración; el equipo te acompaña para definir la propuesta.</p>
        <div className="calm-hero-actions"><button className="btn btn-dark" onClick={()=>go('/cotiza-tu-propio-pastel')}>Cotiza tu propio pastel <ArrowRight size={17}/></button><button className="text-link" onClick={()=>go('/productos')}>Explorar productos <ArrowRight size={16}/></button></div>
        <div className="calm-hero-note"><span/>Diseños personalizados · Atención personal</div>
      </div></div>
      <div className="calm-hero-visual"><div className="calm-hero-visual-inner"><img src={xvImage.src} alt={xvImage.alt} width={xvImage.width} height={xvImage.height} loading="eager" fetchPriority="high" decoding="async"/><span>Imagen de referencia para demostración</span></div></div>
    </div>
  </section>;
}
