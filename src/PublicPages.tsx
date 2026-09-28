import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {createPortal} from 'react-dom';
import {ArrowRight,ChevronLeft,ChevronRight,Instagram,MapPin,Phone,Maximize2,X} from 'lucide-react';
import {business} from './data';
import {PublicHero} from './PublicHero';
import {candyBarImage,celebrationImage,closingImage,customDesignImage,designHelpImage,galleryImages,weddingsImage,welcomeImage,xvImage,type VisualAsset} from './visuals';

type PublicRoute='/'|'/productos'|'/cotiza-tu-propio-pastel';
type Navigate=(route:PublicRoute)=>void;

function Photo({image,className='',priority=false}:{image:VisualAsset;className?:string;priority?:boolean}){
  return <img className={className} src={image.src} alt={image.alt} width={image.width} height={image.height} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} decoding="async"/>;
}
const publicProducts=[
  {title:'Pastelitos de celebración',description:'Para cumpleaños y ocasiones que merecen un detalle muy personal.',image:celebrationImage,category:'Celebración'},
  {title:'Bodas y XV años',description:'Una pieza pensada alrededor del estilo de tu gran día.',image:weddingsImage,category:'Grandes momentos'},
  {title:'Candy Bar',description:'Productos dulces para compartir; selección exacta por confirmar.',image:candyBarImage,category:'Para compartir'},
  {title:'Diseños personalizados',description:'Comparte colores, temática o una imagen para orientar la propuesta.',image:customDesignImage,category:'Tu idea'},
] as const;
const catalogProducts=[
  {title:'Pasteles de celebración',description:'Una propuesta para cumpleaños y celebraciones personales.',image:celebrationImage,category:'01 / Celebración'},
  {title:'Pasteles de boda',description:'Diseños para acompañar el día de tu boda.',image:weddingsImage,category:'02 / Bodas'},
  {title:'Pasteles para XV años',description:'Un pastel pensado para el estilo de la celebración.',image:xvImage,category:'03 / XV años'},
  {title:'Candy Bar',description:'Elementos dulces para compartir; selección exacta pendiente.',image:candyBarImage,category:'04 / Candy Bar'},
  {title:'Diseños personalizados',description:'Comparte referencias de colores, temática y acabados.',image:customDesignImage,category:'05 / Diseño'},
  {title:'Apoyo con el diseño',description:'Si aún no tienes una idea definida, conversemos sobre ella.',image:designHelpImage,category:'06 / Acompañamiento'},
] as const;
function ServiceCard({item,index,go}:{item:{title:string;description:string;image:VisualAsset;category:string};index:number;go:Navigate}){
  return <article className="editorial-card" data-reveal style={{'--reveal-delay':`${index*75}ms`} as CSSProperties}>
    <div className="editorial-card-media"><Photo image={item.image}/><span className="photo-reference">Imagen de referencia para demostración</span></div>
    <div className="editorial-card-body"><span className="editorial-card-category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><button className="editorial-card-link" onClick={()=>go('/cotiza-tu-propio-pastel')}>Cotizar este producto <ArrowRight size={17}/></button></div>
  </article>;
}
function Lightbox({index,onClose,onChange}:{index:number;onClose:()=>void;onChange:(index:number)=>void}){
  const closeRef=useRef<HTMLButtonElement>(null);const dialogRef=useRef<HTMLDivElement>(null);const touchStart=useRef<number|null>(null);
  const image=galleryImages[index];
  useEffect(()=>{
    const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';closeRef.current?.focus();
    const key=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();onClose()}
      if(event.key==='ArrowRight'){event.preventDefault();onChange((index+1)%galleryImages.length)}
      if(event.key==='ArrowLeft'){event.preventDefault();onChange((index-1+galleryImages.length)%galleryImages.length)}
      if(event.key==='Tab'){
        const controls=Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button')||[]);
        const first=controls[0],last=controls[controls.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}
      }
    };
    window.addEventListener('keydown',key);
    return()=>{document.body.style.overflow=previousOverflow;window.removeEventListener('keydown',key)};
  },[index,onClose,onChange]);
  return createPortal(<div className="gallery-lightbox" onMouseDown={event=>event.target===event.currentTarget&&onClose()}>
    <div className="gallery-dialog" role="dialog" aria-modal="true" aria-label={`Imagen ${index+1} de ${galleryImages.length}: ${image.title}`} ref={dialogRef}>
      <div className="gallery-dialog-head"><span>{String(index+1).padStart(2,'0')} / {String(galleryImages.length).padStart(2,'0')} &nbsp; INSPIRACIÓN</span><button ref={closeRef} className="gallery-close" onClick={onClose} aria-label="Cerrar imagen"><X size={22}/></button></div>
      <div className="gallery-dialog-image" onTouchStart={event=>touchStart.current=event.touches[0].clientX} onTouchEnd={event=>{if(touchStart.current===null)return;const delta=event.changedTouches[0].clientX-touchStart.current;if(Math.abs(delta)>45)onChange((index+(delta<0?1:-1)+galleryImages.length)%galleryImages.length);touchStart.current=null}}><Photo image={image} priority/></div>
      <div className="gallery-dialog-footer"><button className="gallery-arrow" onClick={()=>onChange((index-1+galleryImages.length)%galleryImages.length)} aria-label="Imagen anterior"><ChevronLeft size={22}/></button><div><strong>{image.title}</strong><span>{image.category} · Imagen de referencia para demostración</span><a href={image.source} target="_blank" rel="noreferrer">Fuente: {image.photographer}</a></div><button className="gallery-arrow" onClick={()=>onChange((index+1)%galleryImages.length)} aria-label="Imagen siguiente"><ChevronRight size={22}/></button></div>
    </div>
  </div>,document.body);
}
function Gallery(){
  const[open,setOpen]=useState<number|null>(null);const trigger=useRef<HTMLButtonElement|null>(null);
  const close=()=>{setOpen(null);requestAnimationFrame(()=>trigger.current?.focus())};
  return <section className="gallery-section public-gallery container" aria-labelledby="gallery-title"><div className="section-heading center" data-reveal><div><p className="eyebrow">INSPIRACIÓN</p><h2 id="gallery-title">Ideas para imaginar la tuya</h2><p>Una mirada a diferentes estilos y detalles para celebrar.</p></div></div><div className="gallery-grid photo-gallery">
    {galleryImages.map((item,index)=><button className="gallery-tile" data-reveal style={{'--reveal-delay':`${index*65}ms`} as CSSProperties} key={item.src} onClick={event=>{trigger.current=event.currentTarget;setOpen(index)}} aria-label={`Ampliar imagen: ${item.title}`}><Photo image={item}/><span className="gallery-tile-caption"><small>{item.category}</small><strong>{item.title}</strong></span><span className="gallery-zoom"><Maximize2 size={17}/></span></button>)}
  </div><p className="fineprint centered">Imagen de referencia para demostración. Estas fotografías no representan trabajos acreditados de Awake & Bake.</p>{open!==null&&<Lightbox index={open} onClose={close} onChange={setOpen}/>}</section>;
}
export function Home({go}:{go:Navigate}){
  const process=['Cuéntanos tu idea','Comparte fecha y detalles','Recibe una estimación','Revisamos tu solicitud','Confirmamos contigo'];
  const processCopy=['Elige el tipo de producto que imaginas.','Agrega porciones, ubicación y una imagen si la tienes.','Mira una referencia de precio sujeta a confirmación.','Awake & Bake verifica disponibilidad y detalles.','El equipo te contacta personalmente para definir el pedido.'];
  return <main className="public-page home-page">
    <PublicHero go={go}/>
    <section className="intro-section public-intro container" ><div className="public-intro-copy" data-reveal><p className="eyebrow">BIENVENIDOS A AWAKE & BAKE</p><h2>El pastel también<br/>cuenta la historia.</h2><p>Desde un cumpleaños íntimo hasta una celebración grande, cada solicitud comienza con los detalles que la hacen única: la fecha, las personas y el estilo que imaginas.</p><p>Cuéntanos qué necesitas. Nuestro equipo revisará tu solicitud y se comunicará personalmente para confirmar la propuesta.</p><span className="intro-signature">Cada idea merece atención personal <span>✳</span></span></div><div className="public-intro-photo" data-reveal><Photo image={welcomeImage}/><span>Imagen de referencia para demostración</span></div></section>
    <section className="product-section public-products"><div className="container"><div className="section-heading" data-reveal><div><p className="eyebrow">PARA CADA OCASIÓN</p><h2>Algo especial para celebrar</h2></div><button className="text-link" onClick={()=>go('/productos')}>Ver todos los productos <ArrowRight size={16}/></button></div><div className="public-product-grid">{publicProducts.map((item,index)=><ServiceCard item={item} index={index} go={go} key={item.title}/>)}</div></div></section>
    <Gallery/>
    <section className="process-section public-process"><div className="container"><div className="section-heading" data-reveal><div><p className="eyebrow">ASÍ FUNCIONA</p><h2>De tu idea a una conversación</h2></div></div><ol className="process-grid">{process.map((title,index)=><li className="process-item" key={title}><span aria-hidden="true">0{index+1}</span><h3>{title}</h3><p>{processCopy[index]}</p></li>)}</ol></div></section>
    <section className="closing-section container"><div className="closing-feature" data-reveal><Photo image={closingImage}/><div className="closing-overlay"/><div className="closing-copy"><p className="eyebrow">UNA IDEA, MUCHAS POSIBILIDADES</p><h2>Hagamos de tu idea<br/><em>algo memorable.</em></h2><p>Comparte los detalles de tu ocasión y recibe una estimación inicial sujeta a confirmación.</p><button className="btn btn-light" onClick={()=>go('/cotiza-tu-propio-pastel')}>Cotiza tu propio pastel <ArrowRight size={17}/></button></div><span className="closing-photo-label">Imagen de referencia para demostración</span></div><div className="contact-details" data-reveal><p className="eyebrow">ENCUÉNTRANOS</p><h3>Awake & Bake</h3><p><MapPin size={19}/> {business.location}</p><p><Phone size={19}/> <a href="tel:+50250655227">{business.phone}</a></p><small>Horarios y opciones de entrega pendientes de confirmar.</small><a className="contact-instagram" href={business.instagram} target="_blank" rel="noreferrer"><Instagram size={17}/> Instagram</a></div></section>
  </main>;
}
export function Products({go}:{go:Navigate}){
  return <main className="public-page catalog-page"><section className="catalog-intro container" data-reveal><div><p className="eyebrow">NUESTROS PRODUCTOS</p><h1>Para celebrar<br/><em>a tu manera.</em></h1></div><div><p>Elige un punto de partida. Cada solicitud se revisa de forma personal para definir disponibilidad, diseño y precio final.</p><span className="catalog-intro-rule"/></div></section><section className="container catalog-products"><div className="catalog-section-label" data-reveal><span>01 — 06</span><span>Explora las posibilidades</span></div><div className="catalog-grid">{catalogProducts.map((item,index)=><ServiceCard item={item} index={index} go={go} key={item.title}/>)}</div><div className="provisional-panel" data-reveal><span className="provisional-star">✳</span><span>Imágenes de referencia para demostración. Sabores, productos exactos y precios definitivos están pendientes de confirmar con Awake & Bake.</span></div></section><section className="catalog-final container" data-reveal><div><p className="eyebrow">¿YA TIENES UNA IDEA?</p><h2>El siguiente paso empieza contigo.</h2></div><button className="btn btn-dark" onClick={()=>go('/cotiza-tu-propio-pastel')}>Cotiza tu propio pastel <ArrowRight size={17}/></button></section></main>;
}
