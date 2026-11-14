(()=>{'use strict';
const $=id=>document.getElementById(id);
const read=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key)||'null');return value??fallback}catch(e){return fallback}};
const tools=[
 {href:'trip-planner.html',en:'Trip Planner',sl:'Načrtovalnik izletov'},
 {href:'field-station.html',en:'Field Station',sl:'Terenska postaja'},
 {href:'field-station.html#mission-planner',en:'Mission Planner',sl:'Načrtovalnik odprav'},
 {href:'field-kit.html',en:'Field Kit',sl:'Terenski komplet'},
 {href:'field-journal.html',en:'Field Journal',sl:'Terenski dnevnik'},
 {href:'camping-checklist.html',en:'Trip Checklists',sl:'Seznami za izlete'},
 {href:'tools.html',en:'Outdoor Tools',sl:'Outdoor orodja'},
 {href:'fishing-log.html',en:'Fishing Log',sl:'Ribolovni dnevnik'},
 {href:'outdoor-map.html',en:'Outdoor Map',sl:'Outdoor zemljevid'},
 {href:'academy.html',en:'WILDCORE Academy',sl:'WILDCORE učilnica'},
 {href:'weekly-challenge.html',en:'Weekly Challenges',sl:'Tedenski izzivi'}
];
const academy=read('wildcore-academy-progress-v1',[]),gear=read('wildcore-gear-builder-v1',{}),expeditions=read('wildcore-expeditions-v1',[]),tripPlans=read('wildcore-trip-plans-v1',[]),missionPlans=read('wildcore-mission-plans-v1',[]),savedPlaces=read('wildcore-map-saved-locations-v1',[]);
const challengeProgress=read('wildcore-category-challenges-v2',{});
let favorites=read('wildcore-hub-favorites-v1',[]);
if(!Array.isArray(favorites))favorites=[];
const modules=10,completed=Array.isArray(academy)?academy.length:0;
const items=Array.isArray(gear.items)?gear.items:[],checks=gear.checks&&typeof gear.checks==='object'?gear.checks:{};
const packed=items.filter(name=>!!checks[name]).length,total=items.length;
const trips=(Array.isArray(expeditions)?expeditions.length:0)+(Array.isArray(tripPlans)?tripPlans.length:0);
const doneChallenges=challengeProgress&&typeof challengeProgress==='object'?Object.values(challengeProgress).filter(Boolean).length:0;
const lang=()=>document.documentElement.lang==='sl'?'sl':'en';
const set=(id,value)=>{const node=$(id);if(node)node.textContent=value};
function link(href,label){const a=document.createElement('a');a.className='hub-personal-link';a.href=href;a.textContent=label;return a}
function render(){
 const sl=lang()==='sl',percent=Math.round(Math.min(modules,completed)/modules*100);
 set('hub-academy',percent+'%');
 set('hub-academy-note',Math.min(completed,modules)+' / '+modules+' '+(sl?'modulov opravljenih':'modules completed'));
 set('hub-gear',total?packed+' / '+total:'—');
 set('hub-trips',String(trips));
 set('hub-missions',String(Array.isArray(missionPlans)?missionPlans.length:0));
 set('hub-places',String(Array.isArray(savedPlaces)?savedPlaces.length:0));
 set('hub-challenges',String(doneChallenges));
 set('hub-challenges-note',sl?'Opravljeno v tem brskalniku':'Completed in this browser');
 const picker=$('hub-favorite-picker'),list=$('hub-favorites'),recent=$('hub-recent'),places=$('hub-saved-places');
 if(!picker||!list||!recent)return;
 picker.replaceChildren();
 tools.forEach(tool=>{
  const selected=favorites.includes(tool.href),button=document.createElement('button'),star=document.createElement('span');
  button.type='button';button.className='hub-favorite-option';button.setAttribute('aria-pressed',String(selected));
  button.setAttribute('aria-label',(selected?(sl?'Odstrani iz priljubljenih: ':'Remove from favourites: '):(sl?'Dodaj med priljubljene: ':'Add to favourites: '))+tool[sl?'sl':'en']);
  star.textContent=selected?'★':'☆';button.append(star,document.createTextNode(tool[sl?'sl':'en']));
  button.addEventListener('click',()=>{favorites=selected?favorites.filter(x=>x!==tool.href):[...favorites,tool.href];try{localStorage.setItem('wildcore-hub-favorites-v1',JSON.stringify(favorites))}catch(e){}render()});
  picker.append(button);
 });
 list.replaceChildren();
 const selectedTools=tools.filter(t=>favorites.includes(t.href));
 if(!selectedTools.length){const empty=document.createElement('div');empty.className='hub-empty';empty.textContent=sl?'Izberi priljubljena orodja zgoraj.':'Choose favourite tools above.';list.append(empty)}
 else selectedTools.forEach(t=>list.append(link(t.href,t[sl?'sl':'en'])));
 recent.replaceChildren();
 const history=read('wildcore-recent-pages-v1',[]).filter(x=>x&&x.href&&x.href!=='field-hub.html').slice(0,5);
 if(!history.length){const empty=document.createElement('div');empty.className='hub-empty';empty.textContent=sl?'Obiskane strani se bodo prikazale tukaj.':'Pages you visit will appear here.';recent.append(empty)}
 else history.forEach(x=>recent.append(link(x.href,x.title||x.href)));
 if(places){
  places.replaceChildren();
  const saved=Array.isArray(savedPlaces)?savedPlaces.slice(-6).reverse():[];
  if(!saved.length){const empty=document.createElement('div');empty.className='hub-empty';empty.textContent=sl?'Lokacije, ki jih shraniš na zemljevidu, se bodo prikazale tukaj.':'Places you save on the map will appear here.';places.append(empty)}
  saved.forEach(place=>{
   const row=document.createElement('div');row.className='hub-saved-place';
   const name=document.createElement('strong');name.textContent=place.name|| (sl?'Shranjena lokacija':'Saved place');
   const actions=document.createElement('div');actions.className='hub-saved-place-actions';
   const mapLink=document.createElement('a');mapLink.href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(place.lat+','+place.lon);mapLink.target='_blank';mapLink.rel='noopener noreferrer';mapLink.textContent=sl?'Navigacija ↗':'Directions ↗';
   const planLink=document.createElement('a');planLink.href='field-station.html?destination='+encodeURIComponent(place.name||'')+'#mission-planner';planLink.textContent=sl?'Načrtuj odpravo →':'Plan mission →';
   actions.append(mapLink,planLink);row.append(name,actions);places.append(row);
  });
 }
}
render();
document.querySelectorAll('[data-lang-toggle]').forEach(button=>button.addEventListener('click',()=>setTimeout(render,0)));
})();
