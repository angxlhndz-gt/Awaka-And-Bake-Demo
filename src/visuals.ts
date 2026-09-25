/**
 * Fotografías de referencia para esta demo. Ninguna muestra trabajo acreditado de Awake & Bake.
 * Archivos locales WebP para evitar enlaces temporales de Instagram. Sustituir cada archivo
 * por una fotografía original autorizada, conservando su nombre para no tocar componentes.
 */
export type VisualAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  source: string;
  photographer: string;
  provisionalDemo: boolean;
};
const root = '/images/awake-bake/';
const asset = (file: string, alt: string, width: number, height: number, source: string, photographer: string): VisualAsset => ({
  src: `${root}${file}.webp`, alt, width, height, source, photographer, provisionalDemo: true,
});
export const heroImage = asset('hero', 'Tres pasteles blancos de varios niveles decorados con rosas rosadas, fotografía de referencia', 1600, 900, 'https://unsplash.com/photos/three-tiered-white-cakes-decorated-with-pink-roses-and-greenery-Dfm_QyLkIlw', 'Lucas T Photography');
export const welcomeImage = asset('welcome', 'Pastel rosado con velas sobre una mesa preparada para celebrar, fotografía de referencia', 1000, 1500, 'https://unsplash.com/photos/a-pink-cake-sitting-on-top-of-a-table-3b3IxXxnK1A', 'Julia Blumberg');
export const celebrationImage = asset('celebration', 'Pastel blanco de celebración decorado con flores rosadas y detalles perlados, fotografía de referencia', 900, 1350, 'https://unsplash.com/photos/a-white-cake-with-pink-flowers-on-top-of-it-CWburPtXtHM', 'leyli sadeqian');
export const weddingsImage = asset('wedding', 'Pastel de boda blanco de varios niveles en un entorno de jardín, fotografía de referencia', 900, 1350, 'https://unsplash.com/photos/a-tiered-white-wedding-cake-with-floral-decoration-lD4ei_NHCVI', 'Alexander Mass');
export const candyBarImage = asset('candy-bar', 'Mesa dulce con pastel blanco y pequeños postres de evento, fotografía de referencia', 900, 600, 'https://unsplash.com/photos/elegant-dessert-table-with-a-white-cake-and-various-pastries-HKes9_amYnE', 'Jonathan Borba');
export const customDesignImage = asset('custom-design', 'Pastel blanco de dos niveles con rosas lilas y acabado personalizado, fotografía de referencia', 900, 1348, 'https://unsplash.com/photos/white-cake-with-pink-flower-on-top-fpSOMQj2A6I', 'David Holifield');
export const xvImage = asset('xv', 'Pastel blanco de varios niveles con flores blancas y acabado moderno, fotografía de referencia', 900, 1390, 'https://unsplash.com/photos/elegant-white-tiered-wedding-cake-with-calla-lilies-3olsktlzxNw', 'Karie Sconyers');
export const designHelpImage = asset('design-help', 'Pastel de tres niveles con flores rosadas y mesa de postres, fotografía de referencia', 1600, 1068, 'https://unsplash.com/photos/beautiful-three-tiered-wedding-cake-with-pink-flowers-and-desserts-AnUQUCQelww', 'Jonathan Borba');
export const closingImage = asset('closing', 'Pastel blanco de varios niveles sobre una mesa de celebración, fotografía de referencia', 1200, 1880, 'https://unsplash.com/photos/elegant-white-tiered-wedding-cake-with-topper-a4AXm3Kteug', 'Lucas T Photography');
// Referencias provisionales de terceros; sustituir aquí por originales autorizados.
// La secuencia reutiliza tres archivos existentes sin añadir descargas ni duplicados.
export const experienceImages = {
  heroCake: {...xvImage, position: '50% 54%'},
  cakeDetail: {...designHelpImage, position: '50% 50%'},
  celebrationCake: {...heroImage, position: '50% 50%'},
};
export const galleryImages = [
  {title:'Celebraciones con color', category:'Celebración', ...asset('gallery-floral-cake', 'Pastel turquesa con decoración rosada y grageas de colores, fotografía de referencia', 1000, 807, 'https://unsplash.com/photos/pink-and-white-floral-cake-g5bgYkKa8y0', 'David Holifield')},
  {title:'Detalles de boda', category:'Bodas y XV años', ...asset('gallery-wedding-white', 'Pastel blanco de dos niveles con flores claras y detalles delicados, fotografía de referencia', 1000, 667, 'https://unsplash.com/photos/a-tiered-wedding-cake-decorated-with-white-flowers-BpnJmu37a2o', 'Brooke Balentine')},
  {title:'Una mesa para compartir', category:'Candy Bar', ...asset('gallery-dessert-table', 'Mesa de postres con pasteles y pequeños dulces en un evento, fotografía de referencia', 1000, 1500, 'https://unsplash.com/photos/dessert-table-with-cake-pastries-and-floral-decorations-lZ9ecj4BjHk', 'Alexander Mass')},
  {title:'Pastel de celebración', category:'Celebración', ...asset('gallery-fruit-cake', 'Pastel de cumpleaños decorado con fruta y un mensaje de celebración, fotografía de referencia', 1000, 667, 'https://unsplash.com/photos/birthday-cake-with-fresh-fruits-and-frosting-dGvCTk9urTg', 'Jeff Chang')},
  {title:'Pequeños detalles dulces', category:'Candy Bar', ...asset('gallery-macarons', 'Macarons rosados presentados en un recipiente junto a flores secas, fotografía de referencia', 1000, 667, 'https://unsplash.com/photos/macarons-in-white-ball-selective-focus-photography-oLHk_WLupSc', 'Karlis Dambrans')},
  {title:'Para todos los invitados', category:'Candy Bar', ...asset('gallery-cupcakes', 'Cupcakes con cobertura clara y pequeñas grageas de colores, fotografía de referencia', 1000, 664, 'https://unsplash.com/photos/cupcakes-h2Nh6OMFG9U', 'Jeremy Liew')},
] as const;
