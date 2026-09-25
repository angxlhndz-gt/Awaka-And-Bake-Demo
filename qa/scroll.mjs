import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.QA_URL||'http://localhost:4173';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
const errors=[];const evidence=[];
fs.mkdirSync('qa/scroll-experience',{recursive:true});
for(const width of [360,390,768,1024,1440]){
 const context=await browser.newContext({viewport:{width,height:850},deviceScaleFactor:1});const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(base);await page.locator('.cake-media-layer img').first().evaluate(img=>img.decode());await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('.cake-experience');let scales=[];
 for(const [index,p] of [0,.27,.49,.71,.96].entries()){
  await section.evaluate((el,p)=>{const stage=el.querySelector('.cake-stage');const header=document.querySelector('.site-header').offsetHeight;window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-header+p*(el.offsetHeight-stage.offsetHeight),behavior:'instant'})},p);
  await page.waitForTimeout(180);
  const state=await page.evaluate(()=>{
   const el=document.querySelector('.cake-experience'),stage=el.querySelector('.cake-stage'),text=el.querySelector(`[data-scene="${el.dataset.activeScene}"]`),img=el.querySelector('.cake-media-wrap');
   const rect=node=>{const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
   return {progress:Number(el.dataset.progress),active:Number(el.dataset.activeScene),header:document.querySelector('.site-header').offsetHeight,stage:rect(stage),text:rect(text),image:rect(img),scale:Number(getComputedStyle(el).getPropertyValue('--cake-scale')),zoom:Number(getComputedStyle(el).getPropertyValue('--cake-zoom')),overflow:document.documentElement.scrollWidth>innerWidth, opacity:Number(getComputedStyle(text).opacity)};
  });
  assert.equal(state.active,index,`${width}: scene ${index}`);assert.ok(state.opacity>.99,`${width}: scene text faded`);assert.equal(state.overflow,false,`${width}: overflow`);assert.ok(Math.abs(state.stage.y-state.header)<2,`${width}: sticky detached`);
  assert.ok(state.text.bottom<state.stage.bottom-50,`${width}: text overlaps bottom controls`);
  if(width<=700)assert.ok(state.image.bottom<state.text.y+5,`${width}: image overlaps text`);else assert.ok(state.text.right<state.image.x+10,`${width}: image overlaps text`);
  scales.push(state.zoom);
  if([390,1440].includes(width))await page.screenshot({path:`qa/scroll-experience/scene-${index+1}-${width}.jpg`,quality:88});
  evidence.push({width,scene:index+1,...state});
 }
 assert.ok(scales[2]>scales[0],`${width}: missing progressive zoom`);
 await page.locator('[data-scene="4"] .cake-quote').click();await page.waitForURL('**/cotiza-tu-propio-pastel');assert.ok(await page.locator('.type-card').first().isVisible());
 await page.goto(base);await page.getByRole('button',{name:'Saltar presentación'}).click();assert.equal(await page.evaluate(()=>document.activeElement.id),'after-cake-experience');
 const end=await section.boundingBox();assert.ok(end.y+end.height<200,`${width}: sticky failed to release`);
 await page.goto(base);await page.getByRole('button',{name:'Escena 3: Los detalles'}).focus();await page.keyboard.press('Enter');await page.waitForTimeout(120);assert.equal(await section.getAttribute('data-active-scene'),'2');
 assert.ok(await page.getByRole('button',{name:'Escena 3: Los detalles'}).evaluate(el=>parseInt(getComputedStyle(el).outlineWidth)>0),'Missing visible keyboard focus');
 await context.close();
}
for(const settings of [{viewport:{width:390,height:850},reducedMotion:'reduce'},{viewport:{width:844,height:390}}]){
 const c=await browser.newContext(settings);const p=await c.newPage();await p.goto(base);await p.locator('.cake-static').waitFor();assert.equal(await p.locator('.cake-experience').count(),0);assert.equal(await p.locator('.cake-static [data-scene]').count(),5);assert.equal(await p.locator('.cake-static [inert]').count(),0);
 for(const text of await p.locator('.cake-static [data-scene]').all())assert.equal(await text.evaluate(el=>getComputedStyle(el).opacity),'1');
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.screenshot({path:`qa/scroll-experience/static-${settings.viewport.width}.jpg`,fullPage:true,quality:85});
 if(settings.reducedMotion){await p.emulateMedia({reducedMotion:'no-preference'});await p.locator('.cake-experience').waitFor();await p.emulateMedia({reducedMotion:'reduce'});await p.locator('.cake-static').waitFor();}
 await c.close();
}
const c=await browser.newContext({viewport:{width:390,height:667}});const p=await c.newPage();await p.goto(base);await p.getByRole('button',{name:'Escena 4: Tu idea'}).click();await p.waitForTimeout(120);const fits=await p.locator('[data-scene="3"]').evaluate(el=>el.getBoundingClientRect().bottom<document.querySelector('.cake-stage-bottom').getBoundingClientRect().top);assert.ok(fits,'Short mobile clips steps');await p.screenshot({path:'qa/scroll-experience/mobile-short.jpg',quality:88});await c.close();
await browser.close();assert.deepEqual(errors,[]);fs.writeFileSync('qa/scroll-experience/results.json',JSON.stringify({base,widths:[360,390,768,1024,1440],evidence,errors},null,2));console.log(JSON.stringify({scenesChecked:evidence.length,reducedMotion:'passed',shortLandscape:'passed',shortMobile:'passed',keyboard:'passed',finalCTA:'passed',errors},null,2));
