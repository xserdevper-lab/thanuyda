let installPrompt;
const bar=document.createElement('aside');bar.className='install-bar';bar.innerHTML='<span>ใช้งานสะดวกขึ้นจากหน้าจอมือถือ</span><button type="button" class="secondary">ติดตั้งแอป ↗</button><p class="install-help" hidden></p>';
const standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone;
if(!standalone)document.querySelector('header').after(bar);
const help=bar.querySelector('p');
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event});
window.addEventListener('appinstalled',()=>{bar.remove();installPrompt=null});
bar.querySelector('button').addEventListener('click',async()=>{
 if(installPrompt){await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;return}
 help.hidden=false;help.textContent=/iPad|iPhone|iPod/.test(navigator.userAgent)?'iPhone: เปิดเว็บนี้ใน Safari → แชร์ → เพิ่มไปยังหน้าจอโฮม':'Android: เปิดเว็บนี้ใน Chrome → เมนู ⋮ → ติดตั้งแอป หรือ เพิ่มไปยังหน้าจอหลัก';
});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(error=>console.warn('Offline cache unavailable:',error.message)))}
function connectionStatus(){const s=document.querySelector('.status');if(s)s.textContent=navigator.onLine?'● พร้อมใช้งาน':'● ออฟไลน์'}
window.addEventListener('online',connectionStatus);window.addEventListener('offline',connectionStatus);connectionStatus();
