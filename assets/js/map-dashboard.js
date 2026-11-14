(()=>{'use strict';
const map=window.wildcoreMap,stage=document.querySelector('.map-stage'),results=document.querySelector('[data-map-results]');
if(!map||!stage||!results)return;
const sl=()=>document.documentElement.lang==='sl';
const say=(en,si)=>sl()?si:en;
const regions=[
 {id:'all',en:'All Slovenia',si:'Vsa Slovenija',center:[46.15,14.9],zoom:8},
 {id:'northwest',en:'North-west · Julian Alps',si:'Severozahod · Julijske Alpe',center:[46.35,13.75],zoom:9},
 {id:'central',en:'Central Slovenia',si:'Osrednja Slovenija',center:[46.05,14.55],zoom:9},
 {id:'northeast',en:'North-east · Maribor',si:'Severovzhod · Maribor',center:[46.56,15.65],zoom:9},
 {id:'pomurje',en:'Pomurje · Murska Sobota',si:'Pomurje · Murska Sobota',center:[46.66,16.17],zoom:10},
 {id:'coast',en:'Coast & Karst',si:'Obala in Kras',center:[45.55,13.85],zoom:9},
 {id:'southeast',en:'South-east · Novo mesto',si:'Jugovzhod · Novo mesto',center:[45.8,15.2],zoom:9}
];
const toolbar=document.createElement('div');toolbar.className='wc-map-tools';
toolbar.innerHTML='<label><span>'+say('Region','Regija')+'</span><select id="wc-map-region" aria-label="'+say('Choose map region','Izberi regijo zemljevida')+'"></select></label><label class="wc-map-search"><span>'+say('Filter location list','Filtriraj seznam lokacij')+'</span><input id="wc-map-filter" type="search" placeholder="'+say('Name or location…','Ime ali lokacija…')+'"></label><button type="button" id="wc-map-reset">'+say('Reset','Ponastavi')+'</button>';
const head=document.querySelector('.map-results-head');if(head)head.insertAdjacentElement('afterend',toolbar);else stage.insertBefore(toolbar,results);
const select=toolbar.querySelector('select');
regions.forEach(r=>{const o=document.createElement('option');o.value=r.id;o.textContent=r[sl()?'si':'en'];select.append(o)});
select.addEventListener('change',()=>{const r=regions.find(x=>x.id===select.value);if(r)map.setView(r.center,r.zoom)});
const search=toolbar.querySelector('input'),reset=toolbar.querySelector('button'),count=document.querySelector('[data-map-count]');
function filter(){const q=search.value.trim().toLocaleLowerCase();let visible=0;results.querySelectorAll(':scope > article').forEach(card=>{const match=!q||card.textContent.toLocaleLowerCase().includes(q);card.hidden=!match;if(match)visible++});if(count){const label=say('shown','prikazanih');count.textContent=visible+' '+label;}}
search.addEventListener('input',filter);
reset.addEventListener('click',()=>{search.value='';select.value='all';const r=regions[0];map.setView(r.center,r.zoom);filter();search.focus()});
const observer=new MutationObserver(filter);observer.observe(results,{childList:true,subtree:true});
document.querySelectorAll('[data-lang-toggle]').forEach(btn=>btn.addEventListener('click',()=>{setTimeout(()=>{const value=select.value;select.replaceChildren();regions.forEach(r=>{const o=document.createElement('option');o.value=r.id;o.textContent=r[sl()?'si':'en'];select.append(o)});select.value=value;toolbar.querySelector('label span').textContent=say('Region','Regija');toolbar.querySelector('.wc-map-search span').textContent=say('Filter location list','Filtriraj seznam lokacij');search.placeholder=say('Name or location…','Ime ali lokacija…');reset.textContent=say('Reset','Ponastavi');filter()},0)}));
filter();
})();