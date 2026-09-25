import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {ArrowDown, ArrowRight, ArrowUpRight} from 'lucide-react';
import {experienceImages, type VisualAsset} from './visuals';
import './scroll-cake.css';

type Navigate = (route: '/' | '/productos' | '/cotiza-tu-propio-pastel') => void;
const scenes = [
  {label: 'La ocasión', eyebrow: 'AWAKE & BAKE · PARA CELEBRAR', title: 'Cada celebración tiene su', accent: 'dulce historia.', description: 'Pasteles personalizados que comienzan con tu idea y los detalles de tu ocasión.'},
  {label: 'El diseño', eyebrow: '01 / UNA IDEA MUY TUYA', title: 'Diseñado alrededor', accent: 'de tu ocasión.', description: 'La fecha, los colores, las personas. El punto de partida siempre es tu historia.', badges: ['Bodas', 'XV años', 'Cumpleaños', 'Candy Bar']},
  {label: 'Los detalles', eyebrow: '02 / LOS DETALLES CUENTAN', title: 'Tu inspiración,', accent: 'en cada detalle.', description: 'Tamaños y porciones. Colores y temática. Comparte un diseño de referencia o carga tu propia imagen; también puedes pedir apoyo con el diseño.', badges: ['Referencia visual', 'Precio estimado', 'Sujeto a confirmación']},
  {label: 'Tu idea', eyebrow: '03 / DE LA IDEA A LA CONVERSACIÓN', title: 'Imagina el pastel.', accent: 'Cuéntanos el resto.', steps: ['Comparte tu idea.', 'Selecciona las porciones.', 'Indica fecha y ubicación.', 'Sube una imagen de referencia.', 'Recibe una estimación inicial.', 'Awake & Bake revisa y te contacta personalmente.']},
  {label: 'Celebremos', eyebrow: '04 / EL SIGUIENTE PASO ES TUYO', title: 'Una ocasión especial.', accent: 'Un comienzo dulce.', description: 'Comparte lo que imaginas. La estimación inicial está sujeta a confirmación personal de Awake & Bake.'},
];
const sceneStops = [0, .27, .49, .71, .96];
const transitions = [[.14, .20], [.36, .42], [.58, .64], [.80, .86]];
const media = Object.values(experienceImages);
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ramp = (value: number, start: number, end: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
const interpolate = (p: number, values: number[]) => {
  const stops = [0, .27, .49, .71, 1];
  const i = Math.min(3, Math.max(0, stops.findIndex((stop, index) => index < 4 && p <= stops[index + 1] && p >= stop)));
  return values[i] + (values[i + 1] - values[i]) * ramp(p, stops[i], stops[i + 1]);
};

function SceneText({index, go, staticScene = false}: {index: number; go: Navigate; staticScene?: boolean}) {
  const scene = scenes[index];
  const Heading = index === 0 ? 'h1' : 'h2';
  return <article id={`cake-scene-${index}`} className="cake-scene-text" data-scene={index} inert={!staticScene && index !== 0} aria-hidden={!staticScene && index !== 0 ? true : undefined}>
    <p className="cake-eyebrow">{scene.eyebrow}</p>
    <Heading>{scene.title} <em>{scene.accent}</em></Heading>
    {scene.description && <p className="cake-description">{scene.description}</p>}
    {scene.badges && <div className="cake-badges">{scene.badges.map((badge, i) => <span className="cake-badge" data-stagger={i} key={badge}>{badge}</span>)}</div>}
    {scene.steps && <ol className="cake-steps">{scene.steps.map((step, i) => <li data-stagger={i} key={step}><span aria-hidden="true">0{i + 1}</span>{step}</li>)}</ol>}
    {(index === 0 || index === 4) && <button className="btn btn-dark cake-quote" onClick={() => go('/cotiza-tu-propio-pastel')}>Cotiza tu propio pastel <ArrowRight size={17}/></button>}
    {index === 4 && <small className="cake-personal-note">Cada solicitud se revisa. Cada celebración es personal.</small>}
  </article>;
}

function CakePhoto({image, index}: {image: VisualAsset & {position: string}; index: number}) {
  return <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : undefined} decoding="async" style={{objectPosition: image.position}}/>;
}
function CakeMedia() {
  return <div className="cake-media-wrap">
    <div className="cake-media-frame">{media.map((image, index) => <div className="cake-media-layer" data-media={index} key={image.src} style={{opacity: index === 0 ? 1 : 0}} aria-hidden={index !== 0 ? true : undefined}><CakePhoto image={image} index={index}/></div>)}</div>
    <span className="cake-media-caption">Imagen de referencia para demostración</span>
    <span className="cake-media-annotation" aria-hidden="true">El arte de celebrar <span>✳</span></span>
  </div>;
}
function ReducedMotionExperience({go}: {go: Navigate}) {
  return <section className="cake-static" aria-label="Una celebración a tu medida">
    {scenes.map((scene, index) => <div className={`cake-static-row ${index === 1 || index === 3 ? 'cake-static-text-only' : ''}`} key={scene.label}>
      <SceneText index={index} go={go} staticScene/>
      {[0, 2, 4].includes(index) && <figure><CakePhoto image={media[index / 2]} index={index / 2}/><figcaption>Imagen de referencia para demostración</figcaption></figure>}
    </div>)}
  </section>;
}

export function ScrollCakeExperience({go}: {go: Navigate}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [staticMode, setStaticMode] = useState(false);
  // Client-only, stable first render. Compact landscape and reduced motion use normal document flow.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce), (max-height: 560px)');
    const update = () => setStaticMode(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (staticMode || !section) return;
    const stage = section.querySelector<HTMLElement>('.cake-stage')!;
    const texts = Array.from(section.querySelectorAll<HTMLElement>('[data-scene]'));
    const layers = Array.from(section.querySelectorAll<HTMLElement>('[data-media]'));
    const controls = Array.from(section.querySelectorAll<HTMLButtonElement>('[data-scene-control]'));
    const header = document.querySelector<HTMLElement>('.site-header');
    const compact = window.matchMedia('(max-width: 700px)');
    const badges = texts.map(text => Array.from(text.querySelectorAll<HTMLElement>('[data-stagger]')));
    let frame = 0;
    let active = -1;
    let inView = true;
    let headerHeight = header?.offsetHeight || 0;
    const paint = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
      const p = clamp((headerHeight - rect.top) / distance);
      section.dataset.progress = p.toFixed(4);
      section.style.setProperty('--cake-progress', String(p));
      const next = transitions.filter(([start, end]) => p >= (start + end) / 2).length;
      if (active !== next) {
        // Move focus only if its scene is leaving; no hidden button can retain keyboard focus.
        if (active >= 0 && texts[active].contains(document.activeElement)) controls[next].focus({preventScroll: true});
        active = next;
        section.dataset.activeScene = String(next);
        texts.forEach((text, i) => {text.inert = i !== next; text.setAttribute('aria-hidden', String(i !== next));});
        controls.forEach((control, i) => {if (i === next) control.setAttribute('aria-current', 'step'); else control.removeAttribute('aria-current');});
      }
      texts.forEach((text, i) => {
        // Fade one headline out before the next enters, keeping text legible between scenes.
        const previous = transitions[Math.max(0, i - 1)];
        const following = transitions[Math.min(3, i)];
        const incoming = i === 0 ? 1 : ramp(p, (previous[0] + previous[1]) / 2, previous[1]);
        const outgoing = i === 4 ? 0 : ramp(p, following[0], (following[0] + following[1]) / 2);
        const opacity = incoming * (1 - outgoing);
        text.style.opacity = String(opacity);
        text.style.transform = `translate3d(0,${(1 - incoming) * 16 - outgoing * 12}px,0)`;
        const start = i === 0 ? 0 : (previous[0] + previous[1]) / 2;
        badges[i].forEach((badge, j) => {
          const entry = ramp(p, start + j * .012, start + .04 + j * .012);
          badge.style.opacity = String(entry);
          badge.style.transform = `translate3d(0,${(1 - entry) * 9}px,0)`;
        });
      });
      const detail = ramp(p, .35, .43), ending = ramp(p, .80, .87);
      [1 - detail, detail * (1 - ending), ending].forEach((opacity, i) => {layers[i].style.opacity = String(opacity); layers[i].setAttribute('aria-hidden', String(opacity < .5));});
      const mobile = compact.matches;
      section.style.setProperty('--cake-x', `${mobile ? 0 : interpolate(p, [0, -4, -2, 1, 0])}vw`);
      section.style.setProperty('--cake-scale', String(interpolate(p, mobile ? [1, 1.025, 1.035, 1, 1] : [1, 1.08, 1.12, .94, 1])));
      const zoom = interpolate(p, mobile ? [1, 1.05, 1.13, 1.02, 1] : [1, 1.12, 1.3, 1.04, 1]);
      section.style.setProperty('--cake-zoom', String(zoom));
    };
    const schedule = () => {if (!frame && inView) frame = requestAnimationFrame(paint);};
    const resize = () => {headerHeight = header?.offsetHeight || 0;section.style.setProperty('--cake-header', `${headerHeight}px`);schedule();};
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);if (header) resizeObserver.observe(header);
    const observer = new IntersectionObserver(([entry]) => {inView = entry.isIntersecting;section.dataset.animating = String(inView);if (inView) schedule();else if (frame) {cancelAnimationFrame(frame);frame = 0;}}, {rootMargin: '100px'});
    observer.observe(section);
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', resize);
    compact.addEventListener('change', schedule);
    resize();paint();
    return () => {cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();window.removeEventListener('scroll', schedule);window.removeEventListener('resize', resize);compact.removeEventListener('change', schedule);};
  }, [staticMode]);

  function jumpTo(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const stage = section.querySelector<HTMLElement>('.cake-stage')!;
    const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight || 0;
    const start = window.scrollY + section.getBoundingClientRect().top - headerHeight;
    window.scrollTo({top: start + sceneStops[index] * (section.offsetHeight - stage.offsetHeight), behavior: 'instant'});
  }
  function skip() {
    const target = document.getElementById('after-cake-experience');
    if (!target) return;
    target.scrollIntoView({behavior: 'instant', block: 'start'});
    target.focus({preventScroll: true});
  }
  if (staticMode) return <ReducedMotionExperience go={go}/>;
  return <section className="cake-experience" ref={sectionRef} aria-label="Una celebración a tu medida" data-active-scene="0" style={{'--cake-progress': 0} as CSSProperties}>
    <div className="cake-stage">
      <div className="cake-stage-top"><span>PASTELERÍA · AWAKE & BAKE</span><button onClick={skip}>Saltar presentación <ArrowDown size={14}/></button></div>
      <span className="cake-background-word" aria-hidden="true">celebrar.</span>
      <CakeMedia/>
      <div className="cake-scenes">{scenes.map((scene, index) => <SceneText index={index} go={go} key={scene.label}/>)}</div>
      <div className="cake-stage-bottom">
        <nav className="cake-progress" aria-label="Escenas de la presentación">{scenes.map((scene, index) => <button key={scene.label} data-scene-control={index} aria-controls={`cake-scene-${index}`} aria-current={index === 0 ? 'step' : undefined} aria-label={`Escena ${index + 1}: ${scene.label}`} onClick={() => jumpTo(index)}><span>0{index + 1}</span><span className="cake-progress-label">{scene.label}</span></button>)}<span className="cake-progress-track" aria-hidden="true"><span/></span></nav>
        <button className="cake-explore" onClick={() => go('/productos')}>Explorar productos <ArrowUpRight size={16}/></button>
      </div>
    </div>
  </section>;
}
