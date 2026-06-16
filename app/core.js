/* ============================================================
   CORE — engine, persistence, language, groups, timer, help, init
   ============================================================ */

let VIEW="oversikt", SUB=1, ROLE="student";
function TABS(){return [
  ["oversikt","flag",L("Oversikt","Overview"),"both"],["introuka","book",L("Introuka","Intro week"),"both"],["struktur","layers",L("Struktur","Structure"),"both"],
  ["kjoreplan","route",L("Kjøreplan","Run-of-show"),"mentor"],["oppgaver","list",L("Oppgaver & verktøy","Tasks & tools"),"both"],["kontekster","building",L("Kontekster","Contexts"),"both"],
  ["samling","share",L("Samling","Collect"),"both"],["fasilitator","compass",L("Fasilitatorpakke","Facilitator pack"),"mentor"],["impl","rocket",L("Implementering","Implementation"),"both"]
];}
function allowed(v){const t=TABS().find(x=>x[0]===v);return !t||t[3]==="both"||t[3]===ROLE;}
function tabs(){
  document.getElementById("tabs").innerHTML=TABS().filter(t=>t[3]==="both"||t[3]===ROLE).map(([v,ic,l])=>'<button class="tab'+(VIEW===v?" on":"")+'" onclick="go(\''+v+'\')">'+IC(ic)+l+'</button>').join("");
}
function setRole(r){ROLE=r;STORE.ui.role=r;saveStore();document.querySelectorAll("#rolesw button").forEach(b=>b.classList.toggle("on",b.dataset.r===r));if(!allowed(VIEW))VIEW="oversikt";tabs();render();window.scrollTo({top:0});}
function go(v){VIEW=v;tabs();render();window.scrollTo({top:0});}
function setSub(n){SUB=n;render();window.scrollTo({top:0});}

/* ---- language ---- */
function setLang(l){
  if(l===LANG)return;
  LANG=l;STORE.ui.lang=l;saveStore();
  applyDataLang();applyPedLang();
  document.documentElement.lang=l;
  applyChrome();tabs();render();
  const help=document.getElementById("helpModal");if(help&&help.classList.contains("open"))openHelp();
}
function applyChrome(){
  document.querySelectorAll("#langsw button").forEach(b=>b.classList.toggle("on",b.dataset.l===LANG));
  const set=(id,txt)=>{const e=document.getElementById(id);if(e)e.textContent=txt;};
  set("brandSub",L("INTROUKA · WORKSHOPS","INTRO WEEK · WORKSHOPS"));
  set("roleStudent",L("Student","Student"));
  set("roleMentor",L("Mentor","Mentor"));
  set("timerBtnTxt",L("Timer","Timer"));
  set("badgeDate",L("3.–7. august 2026","Aug 3–7, 2026"));
  set("helpBtnTxt",L("Hjelp","Help"));
  const foot=document.getElementById("footText");
  if(foot)foot.innerHTML=L(
    "<b>Grunnrytme i hver sesjon:</b> 1 t input fra Martin Fischer i plenum (alle 60) → 1 t trening i arbeidsgruppene (5 stk) → 1 t refleksjon i mentorteamet (4 grupper). <b>Arbeidsformen varieres bevisst per sesjon</b> – 1→2→4→Alle, gallery walk, rolle-simulering, speed-kritikk, spillbasert læring og World Café – for å treffe flere læringsstiler og holde energien oppe.<br><b>Faglig forankring:</b> Stanford CIFE (Fischer/Kunz), Aurora 2, Heathrow T5, FREYR Giga Arctic, Koskela (TFV), Modig (flyteffektivitet), Kniberg (Push/Pull), terningspill/Parade of Trades, SPGR (Sjøvold/NTNU), BM6101.",
    "<b>Base rhythm each session:</b> 1 h of input from Martin Fischer in plenary (all 60) → 1 h of practice in the work groups (5 each) → 1 h of reflection in the mentor team (4 groups). <b>The working method changes deliberately each session</b> — 1→2→4→All, gallery walk, role simulation, speed critique, game-based learning and World Café — to reach more learning styles and keep the energy up.<br><b>Grounded in:</b> Stanford CIFE (Fischer/Kunz), Aurora 2, Heathrow T5, FREYR Giga Arctic, Koskela (TFV), Modig (flow efficiency), Kniberg (Push/Pull), dice game/Parade of Trades, SPGR (Sjøvold/NTNU), BM6101."
  );
}

/* ---- persistence ---- */
const LS="vdc_compass_v2";
let STORE={active:"g1",groups:{},ui:{role:"student",lang:"no"}};
function loadStore(){try{const d=JSON.parse(localStorage.getItem(LS));if(d&&d.groups)STORE=Object.assign({active:"g1",groups:{},ui:{role:"student",lang:"no"}},d);}catch(e){}
  if(!STORE.groups||!Object.keys(STORE.groups).length){STORE.groups={g1:freshGroup()};STORE.active="g1";}
  if(!STORE.groups[STORE.active])STORE.active=Object.keys(STORE.groups)[0];
  STORE.ui=STORE.ui||{};
  ROLE=STORE.ui.role||"student";
  LANG=STORE.ui.lang||"no";}
let _saveT;
function saveStore(){clearTimeout(_saveT);_saveT=setTimeout(()=>{try{localStorage.setItem(LS,JSON.stringify(STORE));}catch(e){}},120);}

/* ---- group management ---- */
function addGroup(){const n=Object.keys(STORE.groups).length+1;const id="g"+Date.now().toString(36);STORE.groups[id]=freshGroup();STORE.groups[id].meta.num=n;STORE.active=id;saveStore();render();}
function switchGroup(id){STORE.active=id;saveStore();render();}
function renameActive(){const t=document.getElementById("mTeam"),n=document.getElementById("mNum");if(t)G().meta.team=t.value;if(n)G().meta.num=+n.value||1;saveStore();render();renderIdentity();}
function renderIdentity(){const m=G().meta||{};const el=document.getElementById("gid");if(el)el.innerHTML=IC("group")+'<span>'+(m.team?esc(m.team)+" · ":"")+L("Gruppe ","Group ")+(m.num||1)+'</span>';}

/* ---- share between devices (sync simulation) ---- */
function makeShare(){const payload={meta:G().meta,ctx:G().ctx,answers:G().answers,boards:G().boards,done:G().done};const code="VDC1:"+btoa(unescape(encodeURIComponent(JSON.stringify(payload))));const out=document.getElementById("shareOut");if(out)out.value=code;}
function copyShare(){const out=document.getElementById("shareOut");if(out&&out.value){out.select();try{navigator.clipboard.writeText(out.value);}catch(e){document.execCommand("copy");}out.blur();}}
function importShare(){const inp=document.getElementById("shareIn"),msg=document.getElementById("impMsg");if(!inp||!inp.value.trim())return;
  try{let raw=inp.value.trim();if(raw.startsWith("VDC1:"))raw=raw.slice(5);const data=JSON.parse(decodeURIComponent(escape(atob(raw))));
    const id="g"+Date.now().toString(36);STORE.groups[id]=Object.assign(freshGroup(),{meta:data.meta||{num:Object.keys(STORE.groups).length+1},ctx:data.ctx||{},answers:data.answers||{},boards:data.boards||{},done:data.done||{}});
    saveStore();if(msg){msg.className="impmsg ok";msg.textContent=L("Hentet inn ✓ – lagt til som ny gruppe.","Imported ✓ — added as a new group.");}render();}
  catch(e){if(msg){msg.className="impmsg err";msg.textContent=L("Ugyldig kode – sjekk at hele koden ble limt inn.","Invalid code — check that the whole code was pasted.");}}
}

/* ---- gamification: mark awareness reached ---- */
function toggleDone(no){const g=G();g.done=g.done||{};const was=g.done[no];g.done[no]=!was;saveStore();if(g.done[no])celebrate();render();}
function celebrate(){
  const wrap=document.createElement("div");wrap.className="confetti";document.body.appendChild(wrap);
  const cols=["#00509E","#8C1515","#2e7d57","#d98a1f","#5d3fa3","#3cbfbe","#B1040E"];
  for(let i=0;i<70;i++){const p=document.createElement("i");p.style.cssText="left:"+(50+(Math.random()*40-20))+"%;background:"+cols[i%cols.length]+";--dx:"+(Math.random()*420-210)+"px;--dy:"+(380+Math.random()*260)+"px;--r:"+(Math.random()*720-360)+"deg;--d:"+(0.7+Math.random()*0.7)+"s;--w:"+(6+Math.random()*7)+"px";wrap.appendChild(p);}
  const toast=document.createElement("div");toast.className="awtoast";toast.innerHTML=COMPASS_MARK(30)+'<div><b>'+L("Awareness låst opp!","Awareness unlocked!")+'</b><span>'+L("Kompasset fylles – godt jobba.","The compass fills — well done.")+'</span></div>';document.body.appendChild(toast);
  setTimeout(()=>{toast.classList.add("out");},2200);
  setTimeout(()=>{wrap.remove();toast.remove();},3200);
}

/* ---- global dockable timer ---- */
let _gtimer=null;
function openTimer(mins,label){
  let dock=document.getElementById("gtimer");
  if(!dock){dock=document.createElement("div");dock.id="gtimer";dock.className="gtimer";document.body.appendChild(dock);}
  dock.innerHTML='<div class="gt-head" id="gtHead"><span class="gt-grip">⠿</span><span class="gt-label"></span><button class="gt-min" title="'+L("Skjul","Hide")+'">–</button><button class="gt-close" title="'+L("Lukk","Close")+'">×</button></div><div class="gt-body" data-cd></div>';
  dock.querySelector(".gt-label").textContent=label||L("Tidtaker","Timer");
  dock.classList.remove("min");dock.style.display="block";
  _gtimer=makeCountdown(dock.querySelector("[data-cd]"),mins||5,{});
  _gtimer.set(mins||5);_gtimer.start();
  dock.querySelector(".gt-close").onclick=()=>{_gtimer.stop();dock.style.display="none";};
  dock.querySelector(".gt-min").onclick=()=>dock.classList.toggle("min");
  const head=dock.querySelector("#gtHead");
  head.addEventListener("pointerdown",e=>{if(e.target.tagName==="BUTTON")return;e.preventDefault();const r=dock.getBoundingClientRect();const ox=e.clientX-r.left,oy=e.clientY-r.top;
    function mv(ev){dock.style.left=Math.max(6,Math.min(ev.clientX-ox,innerWidth-dock.offsetWidth-6))+"px";dock.style.top=Math.max(6,Math.min(ev.clientY-oy,innerHeight-60))+"px";dock.style.right="auto";dock.style.bottom="auto";}
    function up(){window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);}
    window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);});
}

/* ---- help / instructions (life-buoy) ---- */
function helpHTML(){
  const steps=[
    ["compass",L("Hva er dette?","What is this?"),L("Et kjøreverktøy for introukas seks VDC-workshops. Alt arbeidet gjøres direkte her – ingen Miro. Velg språk når som helst med <b>NO / EN</b> øverst til høyre.","A facilitation tool for intro week's six VDC workshops. All the work happens right here — no Miro. Switch language any time with <b>NO / EN</b> at the top right.")],
    ["group",L("Student eller mentor","Student or mentor"),L("Bytt rolle øverst til venstre. <b>Student</b> viser arbeidsarket. <b>Mentor</b> legger til eksempelsvar, fasiliteringstips og fanene <b>Kjøreplan</b> og <b>Fasilitatorpakke</b>.","Switch role at the top left. <b>Student</b> shows the worksheet. <b>Mentor</b> adds sample answers, facilitation tips and the <b>Run-of-show</b> and <b>Facilitator pack</b> tabs.")],
    ["building",L("Velg kontekst","Choose a context"),L("Under <b>Oppgaver</b> velger gruppa én kontekst øverst. Den følger dere automatisk gjennom alle seks sesjonene – som et ekte prosjekt.","Under <b>Tasks</b>, the group picks one context at the top. It follows you automatically through all six sessions — like a real project.")],
    ["note",L("Jobb på tavlene","Work on the boards"),L("Hver oppgave har sin egen kjørbare tavle: post-its, kolonner, prosesskart, koblingskart, ICE-simulering og spill. Dra, skriv og stem direkte. Alt lagres automatisk per gruppe.","Each task has its own runnable board: sticky notes, columns, process maps, connection maps, ICE simulation and games. Drag, type and vote right there. Everything saves automatically per group.")],
    ["share",L("Samle og del","Collect and share"),L("Under <b>Samling</b> bytter du mellom grupper, henter fram alt arbeidet til Workshop 2, deler mellom enheter med en kode, og skriver ut til PDF for plenum.","Under <b>Collect</b> you switch between groups, pull up all the work for Workshop 2, share between devices with a code, and print to PDF for plenary.")],
    ["timer",L("Tidtaker","Timer"),L("Bruk <b>Timer</b>-knappen øverst, eller klokke-knappene i Kjøreplan, til å tidsstyre hver bolk. Tidtakeren kan dras dit du vil på skjermen.","Use the <b>Timer</b> button at the top, or the clock buttons in the Run-of-show, to time each block. The timer can be dragged anywhere on screen.")]
  ];
  return '<div class="help-card" role="dialog" aria-modal="true">'+
    '<button class="help-x" onclick="closeHelp()" aria-label="'+L("Lukk","Close")+'">×</button>'+
    '<div class="help-head">'+COMPASS_MARK(40)+'<div><div class="help-eyebrow">'+L("Slik bruker du verktøyet","How to use this tool")+'</div><h2>VDC Compass · '+L("Introuka","Intro week")+'</h2></div></div>'+
    '<div class="help-grid">'+steps.map((s,i)=>'<div class="help-step"><div class="help-ic">'+IC(s[0])+'</div><div><div class="help-n">'+(i+1)+'</div><h4>'+s[1]+'</h4><p>'+s[2]+'</p></div></div>').join("")+'</div>'+
    '<div class="help-foot"><button class="bbtn help-go" onclick="closeHelp()">'+IC("check")+L("Kom i gang","Get started")+'</button><span class="help-tip">'+IC("bulb")+L("Trykk livbøyen nederst til venstre for å se dette igjen.","Tap the life-buoy at the bottom left to see this again.")+'</span></div>'+
  '</div>';
}
function openHelp(){
  let m=document.getElementById("helpModal");
  if(!m){m=document.createElement("div");m.id="helpModal";m.className="help-overlay";document.body.appendChild(m);
    m.addEventListener("click",e=>{if(e.target===m)closeHelp();});}
  m.innerHTML=helpHTML();
  m.classList.add("open");document.body.classList.add("noscroll");
  STORE.ui.seenHelp=true;saveStore();
}
function closeHelp(){const m=document.getElementById("helpModal");if(m){m.classList.remove("open");}document.body.classList.remove("noscroll");}

/* ---- render ---- */
function render(){
  const el=document.getElementById("view");
  const map={oversikt:overview,introuka:introukaView,struktur:strukturView,kjoreplan:kjoreplanView,oppgaver:oppgaverView,kontekster:kontekstView,samling:samling,fasilitator:fasilitator,impl:implementering};
  TOOLREG=[];
  el.innerHTML=(map[VIEW]||overview)();
  if(VIEW==="oppgaver"){bindOppgaver();bindTools();}
  renderIdentity();
  revealOnScroll();
}
function bindOppgaver(){
  const sel=document.getElementById("ctxSel");
  if(sel)sel.onchange=()=>{const c=curCtx();const v=sel.value;c.sel=(v===""?null:(v==="own"?"own":parseInt(v)));saveStore();render();};
  const own=document.getElementById("ctxOwn");
  if(own)own.oninput=()=>{const c=curCtx();c.sel="own";c.own=own.value;saveStore();updateChips();};
  document.querySelectorAll("textarea[data-ans]").forEach(t=>{t.value=G().answers[t.dataset.ans]||"";t.oninput=()=>{G().answers[t.dataset.ans]=t.value;saveStore();};});
}

/* ---- scroll reveal ---- */
let _io;
function revealOnScroll(){
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll(".reveal").forEach(e=>e.classList.add("in"));return;}
  if(_io)_io.disconnect();
  _io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");_io.unobserve(en.target);}});},{rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll(".reveal:not(.in)").forEach(e=>_io.observe(e));
}

/* ---- init ---- */
loadStore();
applyDataLang();applyPedLang();
document.documentElement.lang=LANG;
document.querySelectorAll("#rolesw button").forEach(b=>b.classList.toggle("on",b.dataset.r===ROLE));
applyChrome();
tabs();render();
if(!STORE.ui.seenHelp){setTimeout(openHelp,400);}
