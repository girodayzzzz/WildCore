(()=>{'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const root=document.querySelector('[data-checklist-app]');
 if(!root)return;
 const select=root.querySelector('[data-list-select]');
 const exportButton=root.querySelector('[data-export-list]');
 const importButton=root.querySelector('[data-import-list]');
 const fileInput=root.querySelector('[data-import-file]');
 const status=root.querySelector('[data-import-export-status]');
 const listsKey='wildcore-saved-lists-v1';
 const labels=()=>document.documentElement.lang==='sl'?{exported:'Varnostna kopija je bila izvožena.',imported:'Seznam je bil uvožen. Preveri podatke pred uporabo.',invalid:'Datoteka ni veljavna WILDCORE varnostna kopija.',failed:'Uvoza ni bilo mogoče dokončati.',choose:'Najprej izberi datoteko.'}:{exported:'Checklist backup exported.',imported:'Checklist imported. Review the details before using it.',invalid:'This is not a valid WILDCORE checklist backup.',failed:'The import could not be completed.',choose:'Choose a file first.'};
 const announce=(key)=>{if(status)status.textContent=labels()[key]||''};
 const getState=()=>{
  const items={};
  root.querySelectorAll('[data-check-item]').forEach(el=>{items[el.dataset.checkItem]=!!el.checked});
  const custom=[...root.querySelectorAll('.custom-check-item')].map(label=>{
   const input=label.querySelector('input[data-check-item]'),span=label.querySelector('span');
   return input&&span?{id:input.dataset.checkItem,text:span.textContent,checked:!!input.checked}:null;
  }).filter(Boolean);
  const trip={};
  ['[data-trip-type]','[data-trip-destination]','[data-trip-date]','[data-trip-length]'].forEach(selector=>{
   const el=root.querySelector(selector);if(el)trip[selector]=el.value;
  });
  return {items,custom,trip};
 };
 const exportBackup=()=>{
  const state=getState();
  let name='WILDCORE checklist';
  if(select&&select.selectedOptions[0]&&select.value)name=select.selectedOptions[0].textContent;
  const nameInput=root.querySelector('[data-list-name]');
  if(nameInput&&nameInput.value.trim())name=nameInput.value.trim();
  const payload={format:'wildcore-checklist-backup',version:1,name,exportedAt:new Date().toISOString(),state};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='wildcore-checklist-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);announce('exported');
 };
 const validate=data=>{
  if(!data||data.format!=='wildcore-checklist-backup'||data.version!==1||!data.state||typeof data.state.items!=='object'||Array.isArray(data.state.items))return false;
  if(Object.keys(data.state.items).length>1000)return false;
  if(!Array.isArray(data.state.custom)||data.state.custom.length>300)return false;
  if(data.state.trip&&typeof data.state.trip!=='object')return false;
  return data.state.custom.every(x=>x&&typeof x.id==='string'&&typeof x.text==='string'&&x.text.length<=300);
 };
 const importBackup=async file=>{
  if(!file){announce('choose');return}
  if(file.size>2*1024*1024){announce('invalid');return}
  try{
   const data=JSON.parse(await file.text());
   if(!validate(data)){announce('invalid');return}
   const lists=JSON.parse(localStorage.getItem(listsKey)||'{}');
   if(!lists||typeof lists!=='object'||Array.isArray(lists))throw new Error('Invalid saved-list store');
   const id='import-'+Date.now().toString(36);
   const importedName=(typeof data.name==='string'&&data.name.trim()?data.name.trim():'Imported checklist').slice(0,80);
   lists[id]={name:importedName+' (imported)',state:data.state};
   localStorage.setItem(listsKey,JSON.stringify(lists));
   if(select){
    const option=document.createElement('option');option.value=id;option.textContent=lists[id].name;
    select.append(option);select.value=id;select.dispatchEvent(new Event('change',{bubbles:true}));
   }
   announce('imported');
  }catch(error){announce('failed')}
 };
 exportButton?.addEventListener('click',exportBackup);
 importButton?.addEventListener('click',()=>fileInput?.click());
 fileInput?.addEventListener('change',()=>{const file=fileInput.files&&fileInput.files[0];importBackup(file);fileInput.value=''});
 root.addEventListener('change',event=>{
  if(!event.target.matches('[data-check-item]'))return;
  const checks=[...root.querySelectorAll('[data-check-item]')],done=checks.filter(x=>x.checked).length,p=Math.round(done/Math.max(1,checks.length)*100);
  const progress=root.querySelector('[data-check-progress]'),bar=root.querySelector('[data-check-bar]'),count=root.querySelector('[data-check-count]');
  if(progress)progress.textContent=p+'%';if(bar)bar.style.width=p+'%';
  if(count)count.textContent=done+' / '+checks.length+(document.documentElement.lang==='sl'?' opreme pripravljene':' items packed');
 });
});
})();