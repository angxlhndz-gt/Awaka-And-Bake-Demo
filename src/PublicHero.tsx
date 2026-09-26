import {useEffect,useRef} from 'react';
import {ArrowRight} from 'lucide-react';
import {xvImage} from './visuals';
import './public-hero.css';

type Navigate = (route:'/'|'/productos'|'/cotiza-tu-propio-pastel') => void;
const clamp=(value:number)=>Math.max(0,Math.min(1,value));
export function PublicHero({go}:{go:Navigate}){
  const hero=useRef<HTMLElement>(null);
  useEffect(()=>{
    const element=hero.current;
    if(!element)return;
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const update=()=>{
      frame=0;
      if(motion.matches){element.style.setProperty('--hero-progress','0');return}
      const bounds=element.getBoundingClientRect();
      element.style.setProperty('--hero-progress',String(clamp(-bounds.top/(bounds.height*.85))));
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    motion.addEventListener('change',schedule);
    schedule();
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);motion.removeEventListener('change',schedule)};
  },[]);
  return <section className="calm-hero" ref={hero} aria-labelledby="calm-hero-title">
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
