const catalog=window.UI_CATALOG;
const styles=document.getElementById('styles'),frame=document.getElementById('demo'),search=document.getElementById('search'),theme=document.getElementById('theme');
let current=catalog[0];
for(const [index,c] of catalog.entries()){
 const button=document.createElement('button');button.type='button';button.dataset.style=c.id;
 const icon=document.createElement('span');icon.className='swatch';icon.textContent=['◫','✳','◉'][index];icon.setAttribute('aria-hidden','true');
 const title=document.createElement('strong');title.textContent=c.name;
 const description=document.createElement('small');description.textContent=`${c.count} 项组件 · ${c.description}`;
 button.append(icon,title,description);button.onclick=()=>{location.hash=c.id};styles.append(button);
}
function renderComponents(){const query=search.value.trim().toLowerCase(),items=current.components.filter(c=>`${c.name} ${(c.features||[]).join(' ')}`.toLowerCase().includes(query));const container=document.getElementById('components');container.replaceChildren();for(const c of items){const item=document.createElement('article');item.className='component';const name=document.createElement('strong');name.textContent=c.name;const source=document.createElement('small');source.textContent=c.source;item.append(name,source);container.append(item)}document.getElementById('result-count').textContent=items.length?`${current.name} · ${items.length} 项组件`:'没有匹配组件，试试其他名称。'}
function applyTheme(){const value=theme.value==='auto'?'light dark':theme.value;document.documentElement.style.colorScheme=value;if(frame.contentDocument)frame.contentDocument.documentElement.style.colorScheme=value;try{localStorage.setItem('coldrain-theme',theme.value)}catch{}}
function select(){current=catalog.find(c=>c.id===location.hash.slice(1))||catalog[0];for(const b of styles.children)b.setAttribute('aria-pressed',String(b.dataset.style===current.id));document.getElementById('preview-title').textContent=current.name;document.getElementById('preview-description').textContent=current.description;document.getElementById('full-page').href=`${current.id}.html`;if(frame.getAttribute('src')!==`${current.id}.html`)frame.src=`${current.id}.html`;frame.title=`${current.name}组件预览`;search.value='';renderComponents()}
try{const saved=localStorage.getItem('coldrain-theme');if(['auto','light','dark'].includes(saved))theme.value=saved}catch{}
frame.addEventListener('load',applyTheme);theme.addEventListener('change',applyTheme);search.addEventListener('input',renderComponents);window.addEventListener('hashchange',select);applyTheme();select();
