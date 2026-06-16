/* ============================================================
   BOARD ENGINE — the runnable workshop tools (Miro replacement)
   Modes: free · cols · table · swim · map · scale · ice
   Games (dice / pushpull / timer) live in games.js.
   State persists per active group in STORE.groups[active].boards.
   ============================================================ */

const NOTECOLORS=["#ffe27a","#bce8a4","#f8b7c5","#a9d6f2","#ffcf9e","#d9c2f0","#ffffff"];
let NOTECOLOR=NOTECOLORS[0];
let VOTEMODE={};        // per boardId
let EDGECOLOR="#2e7d57";

function esc(s){return (s==null?"":(""+s)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,5);}

/* ---- active group + board state helpers ---- */
function G(){ if(!STORE.groups[STORE.active]) STORE.groups[STORE.active]=freshGroup(); return STORE.groups[STORE.active]; }
function freshGroup(){return {meta:{team:"",num:1,members:["","","","",""]},ctx:{},answers:{},boards:{},done:{}};}
function boardState(id,init){const g=G();g.boards=g.boards||{};if(!g.boards[id])g.boards[id]=init;return g.boards[id];}
function boardId(o,s){return (o.tool&&o.tool.boardKey)?o.tool.boardKey:("s"+s.no+"-o"+o.n);}

/* registry of mounted tools to bind after innerHTML */
let TOOLREG=[];

function toolHTML(o,s){
  if(!o.tool)return"";
  const t=o.tool, id=boardId(o,s), dom="tool_"+id.replace(/[^a-z0-9]/gi,"_");
  TOOLREG.push({dom,t,id,color:s.color,accent:s.accent});
  let badge='<span class="tool-kind">'+IC(kindIcon(t.k))+kindLabel(t.k)+'</span>';
  let shared=t.shared?'<span class="tool-shared">'+IC("link")+L("delt tavle","shared board")+'</span>':'';
  return '<div class="toolwrap" id="'+dom+'" data-board="'+id+'">'+
    '<div class="tool-head"><div class="tool-title">'+IC("note")+(t.title||L("Arbeidstavle","Board"))+'</div>'+badge+shared+
      '<button class="tool-exp" data-act="png" title="'+L("Lagre som bilde","Save as image")+'">'+IC("download")+'</button>'+
      '<button class="tool-exp" data-act="full" title="'+L("Fullskjerm","Fullscreen")+'">'+IC("grid")+'</button></div>'+
    (t.prompt?'<div class="tool-prompt">'+IC("bulb")+'<span>'+t.prompt+'</span></div>':'')+
    '<div class="tool-stage" data-stage></div>'+
  '</div>';
}
function kindIcon(k){return {free:"note",cols:"cols",table:"table",swim:"flow",map:"share",scale:"vote",ice:"users",icesim:"users",dice:"dice",pushpull:"flow",timer:"timer"}[k]||"note";}
function kindLabel(k){return {free:L("Tavle","Board"),cols:L("Kolonner","Columns"),table:L("Tabell","Table"),swim:L("Prosesskart","Process map"),map:L("Koblingskart","Connection map"),scale:L("Måler","Meter"),ice:L("ICE-planlegger","ICE planner"),icesim:L("ICE-simulering","ICE simulation"),dice:L("Terningspill","Dice game"),pushpull:"Push / Pull",timer:L("Tidtaker","Timer")}[k]||L("Tavle","Board");}

function bindTools(){
  TOOLREG.forEach(reg=>{
    const wrap=document.getElementById(reg.dom);if(!wrap)return;
    const stage=wrap.querySelector("[data-stage]");
    const t=reg.t;
    const map={free:buildFree,cols:buildCols,table:buildTable,swim:buildSwim,map:buildMap,scale:buildScale,ice:buildIce,icesim:buildIceSim,dice:buildDice,pushpull:buildPushPull,timer:buildTimerTool};
    (map[t.k]||buildFree)(stage,reg);
    wrap.querySelector('[data-act="png"]').onclick=()=>exportBoardPNG(wrap,t.title||"tavle");
    wrap.querySelector('[data-act="full"]').onclick=()=>toggleFull(wrap);
  });
  TOOLREG=[];
}
function toggleFull(wrap){wrap.classList.toggle("full");document.body.classList.toggle("noscroll",wrap.classList.contains("full"));}

/* ================= FREE (post-its) ================= */
function buildFree(stage,reg){
  const id=reg.id, t=reg.t;
  const st=boardState(id,{notes:[]});
  if(VOTEMODE[id]===undefined)VOTEMODE[id]=false;
  let colSwatches=NOTECOLORS.map(c=>'<span class="sw" data-c="'+c+'" style="background:'+c+'"></span>').join("");
  stage.innerHTML='<div class="bbar">'+
      '<button class="bbtn add">'+IC("plus")+L("Ny lapp","New note")+'</button>'+
      '<span class="swrow">'+colSwatches+'</span>'+
      (t.vote?'<button class="bbtn ghost vt">'+IC("vote")+L("Stem-modus","Vote mode")+'</button>':'')+
      '<button class="bbtn ghost clr" style="margin-left:auto">'+L("Tøm","Clear")+'</button></div>'+
    '<div class="canvas" data-canvas><div class="chint">'+L("Klikk «Ny lapp». Dra i topplinjen for å flytte; dra lapper nær hverandre for å gruppere.","Click “New note.” Drag the top bar to move; drag notes near each other to cluster.")+'</div></div>';
  const canvas=stage.querySelector("[data-canvas]");
  const hint=canvas.querySelector(".chint");
  stage.querySelectorAll(".sw").forEach((sw,i)=>{if(NOTECOLORS[i]===NOTECOLOR)sw.classList.add("on");sw.onclick=()=>{NOTECOLOR=sw.dataset.c;stage.querySelectorAll(".sw").forEach(x=>x.classList.toggle("on",x===sw));};});
  const vt=stage.querySelector(".vt");
  if(vt){vt.classList.toggle("on",VOTEMODE[id]);vt.onclick=()=>{VOTEMODE[id]=!VOTEMODE[id];vt.classList.toggle("on",VOTEMODE[id]);canvas.classList.toggle("voting",VOTEMODE[id]);};canvas.classList.toggle("voting",VOTEMODE[id]);}
  function draw(){canvas.querySelectorAll(".pnote").forEach(n=>n.remove());hint.style.display=st.notes.length?"none":"grid";st.notes.forEach(n=>canvas.appendChild(noteEl(n)));}
  function noteEl(n){
    const el=document.createElement("div");el.className="pnote";el.style.cssText="left:"+n.x+"px;top:"+n.y+"px;background:"+n.color+";transform:rotate("+(n.rot||0)+"deg)";
    el.innerHTML='<div class="ph"><span class="grip">⠿</span><span class="vbadge">'+(n.votes||0)+'</span><span class="del">×</span></div><div class="pt" contenteditable spellcheck="false"></div>';
    const txt=el.querySelector(".pt");txt.textContent=n.text||"";
    txt.oninput=()=>{n.text=txt.textContent;saveStore();};
    el.querySelector(".del").onclick=e=>{e.stopPropagation();st.notes=st.notes.filter(x=>x.id!==n.id);saveStore();draw();};
    el.querySelector(".vbadge").style.display=(n.votes>0||VOTEMODE[id])?"grid":"none";
    el.onclick=()=>{if(!VOTEMODE[id])return;n.votes=(n.votes||0)+1;saveStore();draw();};
    el.querySelector(".vbadge").oncontextmenu=e=>{e.preventDefault();n.votes=Math.max(0,(n.votes||0)-1);saveStore();draw();};
    dragXY(el.querySelector(".ph"),el,canvas,n,()=>saveStore());
    return el;
  }
  stage.querySelector(".add").onclick=()=>{const k=st.notes.length;st.notes.push({id:uid(),x:22+(k%7)*30,y:20+(k%5)*26,text:"",color:NOTECOLOR,rot:(Math.random()*3-1.5),votes:0});saveStore();draw();
    const last=canvas.querySelector(".pnote:last-child .pt");if(last)last.focus();};
  stage.querySelector(".clr").onclick=()=>{if(st.notes.length&&confirm(L("Tøm tavla?","Clear the board?"))){st.notes=[];saveStore();draw();}};
  draw();
}

/* generic free drag within a canvas (keeps element inside bounds) */
function dragXY(handle,el,area,model,onEnd){
  handle.addEventListener("pointerdown",e=>{
    if(e.target.classList.contains("del")||e.target.classList.contains("vbadge"))return;
    e.preventDefault();const r=area.getBoundingClientRect();const ox=e.clientX-r.left-model.x, oy=e.clientY-r.top-model.y;el.style.zIndex=50;el.classList.add("dragging");
    function mv(ev){let nx=ev.clientX-r.left-ox, ny=ev.clientY-r.top-oy;nx=Math.max(0,Math.min(nx,area.clientWidth-el.offsetWidth));ny=Math.max(0,Math.min(ny,area.clientHeight-el.offsetHeight));model.x=Math.round(nx);model.y=Math.round(ny);el.style.left=model.x+"px";el.style.top=model.y+"px";}
    function up(){window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);el.style.zIndex="";el.classList.remove("dragging");onEnd&&onEnd();}
    window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);
  });
}

/* ================= COLS ================= */
function buildCols(stage,reg){
  const id=reg.id,t=reg.t;
  const st=boardState(id,{titles:t.cols.map(c=>c.t),cards:[]});
  if(st.titles.length<t.cols.length)st.titles=t.cols.map((c,i)=>st.titles[i]||c.t);
  function colColor(i){return (t.cols[i]&&t.cols[i].color)||"#00509E";}
  stage.innerHTML='<div class="bbar">'+
    (t.addCol?'<button class="bbtn addcol">'+IC("plus")+L("Ny kolonne","New column")+'</button>':'')+
    (t.fromBoard?'<button class="bbtn ghost imp">'+IC("link")+(t.fromLabel||L('Hent kort fra forrige oppgave','Pull cards from the previous task'))+'</button>':'')+
    '<span class="swrow">'+NOTECOLORS.slice(0,6).map(c=>'<span class="sw" data-c="'+c+'" style="background:'+c+'"></span>').join("")+'</span>'+
    '<button class="bbtn ghost clr" style="margin-left:auto">'+L("Tøm","Clear")+'</button></div>'+
    (t.fromBoard?'<div class="holdtray"><div class="htlabel">'+IC("layers")+L("Til sortering","To sort")+' <span class="htsub">'+L("– dra hvert kort ned i riktig kolonne","— drag each card down into the right column")+'</span></div><div class="colbody htbody" data-cb="-1" data-ph="'+L("Trykk «Hent …» over for å hente kortene hit.","Click “Pull …” above to bring the cards here.")+'"></div></div>':'')+
    '<div class="cols" data-cols></div>';
  stage.querySelectorAll(".sw").forEach((sw,i)=>{if(NOTECOLORS[i]===NOTECOLOR)sw.classList.add("on");sw.onclick=()=>{NOTECOLOR=sw.dataset.c;stage.querySelectorAll(".sw").forEach(x=>x.classList.toggle("on",x===sw));};});
  const wrap=stage.querySelector("[data-cols]");
  function draw(){
    wrap.innerHTML="";
    const tray=stage.querySelector(".htbody");
    if(tray){tray.innerHTML="";const held=st.cards.filter(c=>c.col===-1);held.forEach(c=>tray.appendChild(cardEl(c)));tray.dataset.empty=held.length?"":"1";}
    st.titles.forEach((title,ci)=>{
      const col=document.createElement("div");col.className="col";col.dataset.ci=ci;col.style.setProperty("--cc",colColor(ci));
      col.innerHTML='<div class="colh"><span class="cdot"></span><span class="ctitle" '+(t.fixed?'':'contenteditable spellcheck="false"')+'></span>'+
        (t.addCol&&st.titles.length>1?'<span class="coldel" title="'+L("Slett kolonne","Delete column")+'">×</span>':'')+'</div>'+
        '<div class="colbody" data-cb="'+ci+'"></div>'+
        '<button class="cardadd" data-add="'+ci+'">'+IC("plus")+L("kort","card")+'</button>';
      const ct=col.querySelector(".ctitle");ct.textContent=title;
      if(!t.fixed)ct.oninput=()=>{st.titles[ci]=ct.textContent;saveStore();};
      const cd=col.querySelector(".coldel");if(cd)cd.onclick=()=>{if(confirm(L("Slett kolonnen og kortene i den?","Delete the column and its cards?"))){st.cards=st.cards.filter(c=>c.col!==ci).map(c=>({...c,col:c.col>ci?c.col-1:c.col}));st.titles.splice(ci,1);saveStore();draw();}};
      wrap.appendChild(col);
      const body=col.querySelector(".colbody");
      st.cards.filter(c=>c.col===ci).forEach(c=>body.appendChild(cardEl(c)));
      col.querySelector(".cardadd").onclick=()=>{st.cards.push({id:uid(),col:ci,text:"",color:NOTECOLOR});saveStore();draw();const last=col.querySelector(".colbody .ccard:last-child .cct");if(last)last.focus();};
    });
  }
  function cardEl(c){
    const el=document.createElement("div");el.className="ccard";el.style.background=c.color;el.dataset.id=c.id;
    el.innerHTML='<span class="cgrip">⠿</span><span class="cct" contenteditable spellcheck="false"></span><span class="cdel">×</span>';
    const tx=el.querySelector(".cct");tx.textContent=c.text||"";tx.oninput=()=>{c.text=tx.textContent;saveStore();};
    el.querySelector(".cdel").onclick=()=>{st.cards=st.cards.filter(x=>x.id!==c.id);saveStore();draw();};
    cardDrag(el,c);
    return el;
  }
  function cardDrag(el,c){
    el.querySelector(".cgrip").addEventListener("pointerdown",e=>{
      e.preventDefault();const ghost=el.cloneNode(true);ghost.classList.add("ghostcard");document.body.appendChild(ghost);
      const w=el.offsetWidth;ghost.style.width=w+"px";el.classList.add("lifting");
      function mv(ev){ghost.style.left=(ev.clientX-w/2)+"px";ghost.style.top=(ev.clientY-16)+"px";
        const tgt=document.elementFromPoint(ev.clientX,ev.clientY);const body=tgt&&tgt.closest&&tgt.closest(".colbody");
        document.querySelectorAll(".colbody").forEach(b=>b.classList.toggle("over",b===body));}
      function up(ev){window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);ghost.remove();el.classList.remove("lifting");
        document.querySelectorAll(".colbody").forEach(b=>b.classList.remove("over"));
        const tgt=document.elementFromPoint(ev.clientX,ev.clientY);const body=tgt&&tgt.closest&&tgt.closest(".colbody");
        if(body){const ci=+body.dataset.cb;
          // insert before nearest card
          const cards=[...body.querySelectorAll(".ccard")].filter(x=>x.dataset.id!==c.id);
          let beforeId=null;for(const cc of cards){const r=cc.getBoundingClientRect();if(ev.clientY<r.top+r.height/2){beforeId=cc.dataset.id;break;}}
          st.cards=st.cards.filter(x=>x.id!==c.id);c.col=ci;
          if(beforeId){const idx=st.cards.findIndex(x=>x.id===beforeId);st.cards.splice(idx,0,c);}else st.cards.push(c);
          saveStore();draw();
        }
      }
      window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);
    });
  }
  const ac=stage.querySelector(".addcol");if(ac)ac.onclick=()=>{st.titles.push(L("Ny kolonne","New column"));saveStore();draw();};
  const imp=stage.querySelector(".imp");
  if(imp)imp.onclick=()=>{
    const src=(G().boards||{})[t.fromBoard];
    const texts=(src&&src.cards)?src.cards.map(c=>(c.text||"").trim()).filter(x=>x):[];
    if(!texts.length){alert(L("Ingen kort å hente ennå – fyll ut forrige oppgave først.","No cards to pull yet — fill out the previous task first."));return;}
    const existing=new Set(st.cards.map(c=>(c.text||"").trim()));
    let added=0;texts.forEach(tx=>{if(!existing.has(tx)){st.cards.push({id:uid(),col:-1,text:tx,color:NOTECOLORS[3]});existing.add(tx);added++;}});
    saveStore();draw();
    if(!added)alert(L("Alle kortene er allerede hentet inn.","All cards have already been pulled in."));
  };
  stage.querySelector(".clr").onclick=()=>{if(st.cards.length&&confirm(L("Fjern alle kort?","Remove all cards?"))){st.cards=[];saveStore();draw();}};
  draw();
}

/* ================= TABLE ================= */
function buildTable(stage,reg){
  const id=reg.id,t=reg.t;
  const st=boardState(id,{cols:[...t.cols],rows:t.rows.map(r=>[...r])});
  stage.innerHTML='<div class="bbar"><button class="bbtn addrow">'+IC("plus")+L("Ny rad","New row")+'</button></div><div class="tblwrap" data-tw></div>';
  const tw=stage.querySelector("[data-tw]");
  function draw(){
    let h='<table class="gtbl"><thead><tr>';
    st.cols.forEach(c=>h+='<th>'+esc(c)+'</th>');h+='<th class="rx"></th></tr></thead><tbody>';
    st.rows.forEach((r,ri)=>{h+='<tr>';r.forEach((cell,ci)=>{const lock=t.lockCol0&&ci===0;h+='<td'+(lock?' class="lockcell"':'')+' '+(lock?'':'contenteditable spellcheck="false"')+' data-r="'+ri+'" data-c="'+ci+'">'+esc(cell)+'</td>';});h+='<td class="rx"><span class="rowdel" data-r="'+ri+'">×</span></td></tr>';});
    h+='</tbody></table>';tw.innerHTML=h;
    tw.querySelectorAll('td[contenteditable]').forEach(td=>{td.oninput=()=>{st.rows[+td.dataset.r][+td.dataset.c]=td.textContent;saveStore();};});
    tw.querySelectorAll(".rowdel").forEach(b=>b.onclick=()=>{st.rows.splice(+b.dataset.r,1);saveStore();draw();});
  }
  stage.querySelector(".addrow").onclick=()=>{st.rows.push(st.cols.map(()=>""));saveStore();draw();};
  draw();
}

/* ================= SWIM (process map) ================= */
const SWSYM=[{k:"task",g:"▭"},{k:"queue",g:"▷"},{k:"store",g:"⬭"}];
function swSymName(k){return {task:L("Arbeidsoppgave","Task"),queue:L("Kø","Queue"),store:L("Lager (WIP)","Inventory (WIP)")}[k];}
let SWSEL="task";
function buildSwim(stage,reg){
  const id=reg.id,t=reg.t;
  const st=boardState(id,{items:[]});
  stage.innerHTML='<div class="bbar"><span class="palh">'+L("Symbol:","Symbol:")+'</span>'+
    SWSYM.map(s=>'<button class="symbtn'+(SWSEL===s.k?' on':'')+'" data-k="'+s.k+'"><span class="symg sym-'+s.k+'">'+s.g+'</span>'+swSymName(s.k)+'</button>').join("")+
    (t.fromBoard?'<button class="bbtn ghost imp">'+IC("link")+(t.fromLabel||L('Kopier kart fra forrige oppgave','Copy map from the previous task'))+'</button>':'')+
    '<button class="bbtn ghost clr" style="margin-left:auto">'+L("Tøm","Clear")+'</button></div>'+
    '<div class="swlanes" data-sw></div>'+
    '<div class="swhint">'+L("Velg et symbol over, og klikk i en bane for å legge det inn. Dra for å flytte. Flyt går fra venstre mot høyre.","Pick a symbol above, then click in a lane to place it. Drag to move. Flow runs left to right.")+'</div>';
  stage.querySelectorAll(".symbtn").forEach(b=>b.onclick=()=>{SWSEL=b.dataset.k;stage.querySelectorAll(".symbtn").forEach(x=>x.classList.toggle("on",x===b));});
  const sw=stage.querySelector("[data-sw]");
  function draw(){
    sw.innerHTML="";
    t.lanes.forEach((lane,li)=>{
      const row=document.createElement("div");row.className="swlane";
      row.innerHTML='<div class="swlabel">'+esc(lane)+'</div><div class="swtrack" data-li="'+li+'"></div>';
      sw.appendChild(row);
      const track=row.querySelector(".swtrack");
      track.onclick=e=>{if(e.target!==track)return;const r=track.getBoundingClientRect();const x=Math.max(4,Math.min(e.clientX-r.left-46,track.clientWidth-96));st.items.push({id:uid(),lane:li,x:Math.round(x),sym:SWSEL,text:""});saveStore();draw();};
      st.items.filter(it=>it.lane===li).forEach(it=>track.appendChild(symEl(it,track)));
    });
  }
  function symEl(it,track){
    const el=document.createElement("div");el.className="swsym sym-"+it.sym;el.style.left=it.x+"px";
    el.innerHTML='<span class="swdel">×</span><span class="swt" contenteditable spellcheck="false" data-ph="'+L("skriv …","type …")+'"></span>';
    const tx=el.querySelector(".swt");tx.textContent=it.text||"";tx.oninput=()=>{it.text=tx.textContent;saveStore();};
    el.querySelector(".swdel").onclick=e=>{e.stopPropagation();st.items=st.items.filter(x=>x.id!==it.id);saveStore();draw();};
    // horizontal+lane drag
    el.addEventListener("pointerdown",e=>{
      if(e.target.classList.contains("swt")||e.target.classList.contains("swdel"))return;e.preventDefault();
      el.classList.add("dragging");
      function mv(ev){const all=sw.querySelectorAll(".swtrack");let tgt=null;all.forEach(tr=>{const r=tr.getBoundingClientRect();if(ev.clientY>=r.top&&ev.clientY<=r.bottom)tgt=tr;});const tr=tgt||track;const r=tr.getBoundingClientRect();it.lane=+tr.dataset.li;it.x=Math.round(Math.max(4,Math.min(ev.clientX-r.left-46,tr.clientWidth-96)));el.style.left=it.x+"px";if(tr!==el.parentElement)tr.appendChild(el);}
      function up(){window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);el.classList.remove("dragging");saveStore();}
      window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);
    });
    return el;
  }
  stage.querySelector(".clr").onclick=()=>{if(st.items.length&&confirm(L("Tøm prosesskartet?","Clear the process map?"))){st.items=[];saveStore();draw();}};
  const imp=stage.querySelector(".imp");
  if(imp)imp.onclick=()=>{
    const src=(G().boards||{})[t.fromBoard];
    const items=(src&&src.items)?src.items:[];
    if(!items.length){alert(L("Ingen prosess å kopiere ennå – bygg kartet i forrige oppgave først.","No process to copy yet — build the map in the previous task first."));return;}
    if(st.items.length&&!confirm(L("Erstatt nåværende kart med en kopi fra forrige oppgave?","Replace the current map with a copy from the previous task?")))return;
    st.items=items.map(it=>({id:uid(),lane:it.lane,x:it.x,sym:it.sym,text:it.text}));
    saveStore();draw();
  };
  draw();
}

/* ================= MAP (nodes + arrows) ================= */
function buildMap(stage,reg){
  const id=reg.id,t=reg.t;
  const bands=t.bands||null;
  const st=boardState(id,{nodes:[],edges:[]});
  let SEL=null; // selected node id for connecting
  const colorBtns=(t.mode==="chain")?"":
    '<span class="palh" style="margin-left:6px">'+L("Pil:","Arrow:")+'</span>'+
    '<button class="ecol on" data-e="#2e7d57" style="--e:#2e7d57">'+L("synergi","synergy")+'</button>'+
    '<button class="ecol" data-e="#B1040E" style="--e:#B1040E">'+L("konflikt","conflict")+'</button>';
  let addBtns;
  if(bands){addBtns=bands.map((b,i)=>'<button class="bbtn band" data-band="'+i+'" style="--cc:'+b.color+'">'+IC("plus")+b.t+'</button>').join("");}
  else addBtns='<button class="bbtn add">'+IC("plus")+L("Ny boble","New bubble")+'</button>';
  stage.innerHTML='<div class="bbar">'+addBtns+colorBtns+'<button class="bbtn ghost clr" style="margin-left:auto">'+L("Tøm","Clear")+'</button></div>'+
    '<div class="mapstage" data-map><svg class="mapsvg"></svg><div class="maphint">'+(bands?L('Velg et bånd og legg inn kort. ','Choose a band and add cards. '):L('Legg inn bobler. ','Add bubbles. '))+L('Klikk to bobler etter hverandre for å koble dem; klikk en strek for å fjerne den.','Click two bubbles in turn to connect them; click a line to remove it.')+'</div></div>';
  const area=stage.querySelector("[data-map]");
  const svg=area.querySelector(".mapsvg");
  const hint=area.querySelector(".maphint");
  if(bands){area.classList.add("banded");area.style.setProperty("--bn",bands.length);
    bands.forEach((b,i)=>{const band=document.createElement("div");band.className="bandrow";band.style.cssText="--cc:"+b.color;band.innerHTML='<span class="bandlbl">'+esc(b.t)+'</span>';area.appendChild(band);});}
  stage.querySelectorAll(".ecol").forEach(b=>b.onclick=()=>{EDGECOLOR=b.dataset.e;stage.querySelectorAll(".ecol").forEach(x=>x.classList.toggle("on",x===b));});
  function bandY(i){return (i+0.5)/bands.length*area.clientHeight-26;}
  function addNode(band){const n={id:uid(),x:30+st.nodes.length%4*120,y:bands?bandY(band):(30+st.nodes.length%3*70),text:"",band:band};if(bands)n.color=bands[band].color;st.nodes.push(n);saveStore();draw();const el=area.querySelector('[data-nid="'+n.id+'"] .nt');if(el)el.focus();}
  if(bands)stage.querySelectorAll(".band").forEach(b=>b.onclick=()=>addNode(+b.dataset.band));
  else stage.querySelector(".add").onclick=()=>addNode(null);
  stage.querySelector(".clr").onclick=()=>{if((st.nodes.length||st.edges.length)&&confirm(L("Tøm kartet?","Clear the map?"))){st.nodes=[];st.edges=[];saveStore();draw();}};
  function nodeEl(n){
    const el=document.createElement("div");el.className="mnode"+(SEL===n.id?" sel":"");el.dataset.nid=n.id;el.style.cssText="left:"+n.x+"px;top:"+n.y+"px;"+(n.color?"--cc:"+n.color+";border-color:"+n.color:"");
    el.innerHTML='<span class="ndel">×</span><span class="nt" contenteditable spellcheck="false" data-ph="'+L("navn …","name …")+'"></span>';
    const tx=el.querySelector(".nt");tx.textContent=n.text||"";tx.oninput=()=>{n.text=tx.textContent;saveStore();};
    el.querySelector(".ndel").onclick=e=>{e.stopPropagation();st.nodes=st.nodes.filter(x=>x.id!==n.id);st.edges=st.edges.filter(e2=>e2.a!==n.id&&e2.b!==n.id);saveStore();draw();};
    el.onclick=e=>{if(e.target.classList.contains("nt")||e.target.classList.contains("ndel"))return;
      if(SEL&&SEL!==n.id){if(!st.edges.find(ed=>(ed.a===SEL&&ed.b===n.id)||(ed.a===n.id&&ed.b===SEL)))st.edges.push({a:SEL,b:n.id,color:EDGECOLOR});SEL=null;saveStore();draw();}
      else{SEL=(SEL===n.id?null:n.id);draw();}};
    dragXY2(el,area,n,()=>{saveStore();drawEdges();});
    return el;
  }
  function drawEdges(){
    svg.setAttribute("width",area.clientWidth);svg.setAttribute("height",area.clientHeight);svg.setAttribute("viewBox","0 0 "+area.clientWidth+" "+area.clientHeight);
    let h="";st.edges.forEach((e,i)=>{const a=area.querySelector('[data-nid="'+e.a+'"]'),b=area.querySelector('[data-nid="'+e.b+'"]');if(!a||!b)return;
      const ax=a.offsetLeft+a.offsetWidth/2,ay=a.offsetTop+a.offsetHeight/2,bx=b.offsetLeft+b.offsetWidth/2,by=b.offsetTop+b.offsetHeight/2;
      h+='<line x1="'+ax+'" y1="'+ay+'" x2="'+bx+'" y2="'+by+'" stroke="'+e.color+'" stroke-width="3.5" stroke-linecap="round" marker-end="url(#ah'+i+')" data-ei="'+i+'" class="medge"/>';
      h+='<defs><marker id="ah'+i+'" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9z" fill="'+e.color+'"/></marker></defs>';});
    svg.innerHTML=h;
    svg.querySelectorAll(".medge").forEach(l=>l.onclick=()=>{st.edges.splice(+l.dataset.ei,1);saveStore();draw();});
  }
  function draw(){
    area.querySelectorAll(".mnode").forEach(n=>n.remove());
    hint.style.display=st.nodes.length?"none":"block";
    st.nodes.forEach(n=>area.appendChild(nodeEl(n)));
    drawEdges();
  }
  draw();
  // redraw edges if container resizes
  if(window.ResizeObserver){const ro=new ResizeObserver(()=>drawEdges());ro.observe(area);}
}
function dragXY2(el,area,model,onMove){
  el.addEventListener("pointerdown",e=>{
    if(e.target.classList.contains("nt")||e.target.classList.contains("ndel"))return;e.preventDefault();
    const r=area.getBoundingClientRect();const ox=e.clientX-r.left-model.x,oy=e.clientY-r.top-model.y;el.style.zIndex=30;el.classList.add("dragging");let moved=false;
    function mv(ev){moved=true;let nx=ev.clientX-r.left-ox,ny=ev.clientY-r.top-oy;nx=Math.max(0,Math.min(nx,area.clientWidth-el.offsetWidth));ny=Math.max(0,Math.min(ny,area.clientHeight-el.offsetHeight));model.x=Math.round(nx);model.y=Math.round(ny);el.style.left=model.x+"px";el.style.top=model.y+"px";onMove&&onMove();}
    function up(){window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);el.style.zIndex="";el.classList.remove("dragging");if(moved)onMove&&onMove();}
    window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);
  });
}

/* ================= SCALE (1..max poll) ================= */
function buildScale(stage,reg){
  const id=reg.id,t=reg.t,max=t.max||5;
  const st=boardState(id,{marks:[]}); // marks: {id,val}
  stage.innerHTML='<div class="scalewrap"><div class="scalerow" data-sc></div>'+
    '<div class="scalefoot"><span class="scaleavg" data-avg></span><button class="bbtn ghost clr">'+L("Nullstill","Reset")+'</button></div></div>';
  const row=stage.querySelector("[data-sc]");
  function draw(){
    row.innerHTML="";
    for(let v=1;v<=max;v++){const col=document.createElement("div");col.className="scalecol";col.dataset.v=v;
      const cnt=st.marks.filter(m=>m.val===v).length;
      col.innerHTML='<div class="dots">'+Array.from({length:cnt}).map(()=>'<span class="sdot"></span>').join("")+'</div><button class="scalebtn">'+v+'</button>';
      col.querySelector(".scalebtn").onclick=()=>{st.marks.push({id:uid(),val:v});saveStore();draw();};
      col.querySelector(".dots").onclick=()=>{const i=st.marks.map(m=>m.val).lastIndexOf(v);if(i>=0){st.marks.splice(i,1);saveStore();draw();}};
      row.appendChild(col);}
    const avg=st.marks.length?(st.marks.reduce((a,m)=>a+m.val,0)/st.marks.length).toFixed(1):"–";
    stage.querySelector("[data-avg]").innerHTML='<b>'+st.marks.length+'</b> '+L("stemmer · snitt","votes · avg")+' <b>'+avg+'</b> '+L("av","of")+' '+max;
  }
  stage.querySelector(".clr").onclick=()=>{st.marks=[];saveStore();draw();};
  draw();
}

/* ================= ICE planner ================= */
const ICEROLES=["ARK","RIB","RIV","Byggherre","PL","RIE","Entreprenør","Bruker"];
function roleLabel(r){return ({"Byggherre":L("Byggherre","Client"),"Entreprenør":L("Entreprenør","Contractor"),"Bruker":L("Bruker","User")})[r]||r;}
function buildIce(stage,reg){
  const id=reg.id;
  const st=boardState(id,{placed:[],underlag:["","",""],agenda:["","","",""]});
  stage.innerHTML='<div class="bbar"><span class="palh">'+L("Dra rolle inn på bordet:","Drag a role onto the table:")+'</span>'+
      ICEROLES.map(r=>'<span class="rolechip" draggable="false" data-r="'+r+'">'+roleLabel(r)+'</span>').join("")+'</div>'+
    '<div class="iceflex"><div class="icetable" data-icet><div class="icetbl"><span>'+L("ICE-bord","ICE table")+'</span></div><div class="icehint">'+L("Dra fagroller hit – plasser dem rundt bordet","Drag disciplines here — place them around the table")+'</div></div>'+
    '<div class="icelists"><div class="icelist"><div class="icelh">'+IC("clip")+L("Underlag som må være klart","Inputs that must be ready")+'</div><div data-ul></div></div>'+
    '<div class="icelist"><div class="icelh">'+IC("list")+L("Agenda (3–4 punkter)","Agenda (3–4 points)")+'</div><div data-ag></div></div></div></div>';
  const table=stage.querySelector("[data-icet]");
  function drawTable(){table.querySelectorAll(".placedrole").forEach(n=>n.remove());table.querySelector(".icehint").style.display=st.placed.length?"none":"grid";
    st.placed.forEach(p=>{const el=document.createElement("div");el.className="placedrole";el.style.cssText="left:"+p.x+"px;top:"+p.y+"px";el.innerHTML=roleLabel(p.label)+'<span class="prdel">×</span>';
      el.querySelector(".prdel").onclick=e=>{e.stopPropagation();st.placed=st.placed.filter(x=>x.id!==p.id);saveStore();drawTable();};
      dragXY3(el,table,p,()=>saveStore());table.appendChild(el);});}
  stage.querySelectorAll(".rolechip").forEach(chip=>{
    chip.addEventListener("pointerdown",e=>{e.preventDefault();
      const ghost=document.createElement("div");ghost.className="placedrole floating";ghost.textContent=chip.dataset.r;document.body.appendChild(ghost);
      function mv(ev){ghost.style.left=(ev.clientX-30)+"px";ghost.style.top=(ev.clientY-16)+"px";}
      function up(ev){window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);ghost.remove();
        const r=table.getBoundingClientRect();if(ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom){st.placed.push({id:uid(),label:chip.dataset.r,x:Math.round(ev.clientX-r.left-30),y:Math.round(ev.clientY-r.top-16)});saveStore();drawTable();}}
      mv(e);window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);});
  });
  function lineList(host,arr,ph){host.innerHTML="";arr.forEach((v,i)=>{const row=document.createElement("div");row.className="iceline";row.innerHTML='<span class="icebull"></span><span class="icein" contenteditable spellcheck="false" data-i="'+i+'"></span>';const inp=row.querySelector(".icein");inp.textContent=v;inp.dataset.ph=ph;inp.oninput=()=>{arr[i]=inp.textContent;saveStore();};host.appendChild(row);});
    const add=document.createElement("button");add.className="bbtn ghost icemore";add.innerHTML=IC("plus")+L("linje","line");add.onclick=()=>{arr.push("");saveStore();lineList(host,arr,ph);};host.appendChild(add);}
  lineList(stage.querySelector("[data-ul]"),st.underlag,L("Underlag …","Input …"));
  lineList(stage.querySelector("[data-ag]"),st.agenda,L("Agendapunkt …","Agenda point …"));
  drawTable();
}
function dragXY3(el,area,model,onEnd){el.addEventListener("pointerdown",e=>{if(e.target.classList.contains("prdel"))return;e.preventDefault();const r=area.getBoundingClientRect();const ox=e.clientX-r.left-model.x,oy=e.clientY-r.top-model.y;el.style.zIndex=20;
  function mv(ev){let nx=ev.clientX-r.left-ox,ny=ev.clientY-r.top-oy;nx=Math.max(0,Math.min(nx,area.clientWidth-el.offsetWidth));ny=Math.max(0,Math.min(ny,area.clientHeight-el.offsetHeight));model.x=Math.round(nx);model.y=Math.round(ny);el.style.left=model.x+"px";el.style.top=model.y+"px";}
  function up(){window.removeEventListener("pointermove",mv);window.removeEventListener("pointerup",up);el.style.zIndex="";onEnd&&onEnd();}
  window.addEventListener("pointermove",mv);window.addEventListener("pointerup",up);});}

/* ================= EXPORT board as PNG ================= */
function ensureH2I(){return new Promise((res,rej)=>{if(window.htmlToImage)return res(window.htmlToImage);const sc=document.createElement("script");sc.src="https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js";sc.onload=()=>res(window.htmlToImage);sc.onerror=rej;document.head.appendChild(sc);});}
function exportBoardPNG(wrap,name){
  const stage=wrap.querySelector(".tool-stage");
  const btns=wrap.querySelectorAll(".bbtn,.tool-exp,.cardadd,.symbtn,.scalebtn,.rolechip,.icemore,.ndel,.del,.cdel,.swdel,.prdel,.coldel,.rowdel");
  ensureH2I().then(h2i=>{
    btns.forEach(b=>b.style.visibility="hidden");
    h2i.toPng(stage,{pixelRatio:2,backgroundColor:"#ffffff"}).then(url=>{
      btns.forEach(b=>b.style.visibility="");
      const a=document.createElement("a");a.href=url;a.download=("VDC-"+name).replace(/[^a-z0-9]+/gi,"-")+".png";a.click();
    }).catch(()=>{btns.forEach(b=>b.style.visibility="");});
  }).catch(()=>{window.print();});
}
