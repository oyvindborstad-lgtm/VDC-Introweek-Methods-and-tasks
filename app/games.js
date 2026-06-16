/* ============================================================
   GAMES — runnable in-page exercises (bilingual via L())
   dice  : Terningspillet (capacity utilization / variability)
   pushpull : Push vs Pull production line
   timer : inline countdown + decision note (ICE live)
   ============================================================ */

/* small reusable countdown. mountEl gets innerHTML; returns control obj */
function makeCountdown(mount,startMin,opts){
  opts=opts||{};
  let total=startMin*60, left=total, t=null, running=false;
  mount.innerHTML='<div class="cd">'+
    '<svg class="cdring" viewBox="0 0 120 120"><circle class="cdbg" cx="60" cy="60" r="52"/><circle class="cdfg" cx="60" cy="60" r="52"/></svg>'+
    '<div class="cdtime" data-t>00:00</div></div>'+
    '<div class="cdctrl">'+
      '<button class="bbtn cdplay">'+IC("play")+'<span>'+L("Start","Start")+'</span></button>'+
      '<button class="bbtn ghost cdreset">'+IC("reset")+'</button>'+
      '<span class="cdpresets">'+[5,10,15,30].map(m=>'<button class="cdpreset" data-m="'+m+'">'+m+'m</button>').join("")+'</span>'+
    '</div>';
  const ring=mount.querySelector(".cdfg"), disp=mount.querySelector("[data-t]"), playBtn=mount.querySelector(".cdplay");
  const C=2*Math.PI*52; ring.style.strokeDasharray=C;
  function fmt(s){const m=Math.floor(s/60),x=s%60;return (m<10?"0":"")+m+":"+(x<10?"0":"")+x;}
  function paint(){disp.textContent=fmt(Math.max(0,left));const frac=total?left/total:0;ring.style.strokeDashoffset=C*(1-frac);ring.classList.toggle("low",left<=Math.min(60,total*0.15));}
  function tick(){left--;paint();if(left<=0){stop();mount.querySelector(".cd").classList.add("done");try{beep();}catch(e){}opts.onEnd&&opts.onEnd();}}
  function start(){if(running)return;running=true;mount.querySelector(".cd").classList.remove("done");playBtn.innerHTML=IC("pause")+'<span>'+L("Pause","Pause")+'</span>';t=setInterval(tick,1000);}
  function stop(){running=false;clearInterval(t);playBtn.innerHTML=IC("play")+'<span>'+L("Start","Start")+'</span>';}
  function set(m){stop();total=m*60;left=total;paint();}
  playBtn.onclick=()=>running?stop():start();
  mount.querySelector(".cdreset").onclick=()=>{set(total/60);};
  mount.querySelectorAll(".cdpreset").forEach(b=>b.onclick=()=>set(+b.dataset.m));
  paint();
  return {start,stop,set};
}
let _ac;
function beep(){_ac=_ac||new (window.AudioContext||window.webkitAudioContext)();const o=_ac.createOscillator(),g=_ac.createGain();o.connect(g);g.connect(_ac.destination);o.frequency.value=880;g.gain.setValueAtTime(.0001,_ac.currentTime);g.gain.exponentialRampToValueAtTime(.3,_ac.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,_ac.currentTime+.6);o.start();o.stop(_ac.currentTime+.6);}

/* ---------- timer tool (ICE live) ---------- */
function buildTimerTool(stage,reg){
  const id=reg.id,t=reg.t;
  const st=boardState(id,{note:""});
  stage.innerHTML='<div class="timertool"><div class="cdhost" data-cd></div>'+
    '<div class="afield" style="margin:0;flex:1"><div class="al">'+IC("flag")+L("Beslutning og hvem gjør hva videre","Decision and who does what next")+'</div>'+
    '<textarea class="livenote" placeholder="'+L("Vi besluttet … Ansvar videre: …","We decided … Next steps: …")+'"></textarea></div></div>';
  makeCountdown(stage.querySelector("[data-cd]"),t.mins||15,{});
  const ta=stage.querySelector(".livenote");ta.value=st.note||"";ta.oninput=()=>{st.note=ta.value;saveStore();};
}

/* ---------- ICE SIMULATION (full guided session) ---------- */
/* structural phase data (icon + minutes) is language-independent */
const ICESIM_PHASES=[
  {mins:0,ic:"clip"},
  {mins:1,ic:"target"},
  {mins:5,ic:"eye"},
  {mins:5,ic:"check"},
  {mins:2,ic:"hand"},
  {mins:0,ic:"rocket"}
];
function icePhaseTxt(i){return [
  {t:L("Forberedelse","Preparation"),desc:L("Skriv beslutningsspørsmålet, og marker hvem som faktisk sitter rundt bordet. Fordel rollene i gruppa.","Write the decision question, and mark who's actually around the table. Assign the roles within the group.")},
  {t:L("Hensikt","Purpose"),desc:L("Møteleder gjentar hva dere skal bestemme – kort og presist, på 1 minutt. Alle skal vite hva som er målet.","The chair restates what you're deciding — short and precise, in 1 minute. Everyone should know the goal.")},
  {t:L("Gjennomgang","Review"),desc:L("Hver rolle som er til stede legger fram sitt krav, innspill eller forbehold. Skriv det inn – det er grunnlaget for beslutningen.","Each role present states its requirement, input or caveat. Write it down — it's the basis for the decision.")},
  {t:L("Beslutning","Decision"),desc:L("Ta beslutningen sammen, i sanntid, mens alle fagene er i rommet. Formulér den så tydelig at ingen er i tvil.","Make the decision together, in real time, while every discipline is in the room. State it so clearly that no one is in doubt.")},
  {t:L("Ansvar","Responsibility"),desc:L("Hvem gjør hva videre – og når? En beslutning uten ansvar forblir en intensjon.","Who does what next — and when? A decision without ownership stays an intention.")},
  {t:L("Oppsummering","Wrap-up"),desc:L("Slik komprimerte dere uker med e-post og venting til én økt.","This is how you compressed weeks of email and waiting into one session.")}
][i];}
function buildIceSim(stage,reg){
  const id=reg.id,t=reg.t;
  let roles=ICEROLES.slice(0,5).map(r=>({name:r,present:true,note:""}));
  // prefill roles from the ICE planner (previous task), if available
  if(t.fromBoard){const src=(G().boards||{})[t.fromBoard];if(src&&src.placed&&src.placed.length){const uniq=[...new Set(src.placed.map(p=>p.label))];roles=uniq.map(r=>({name:r,present:true,note:""}));}}
  const st=boardState(id,{decision:"",roles:roles,phase:0,beslutning:"",ansvar:""});
  if(!st.roles||!st.roles.length)st.roles=roles;
  let timer=null;
  function render(){
    const ph=Object.assign({},ICESIM_PHASES[st.phase],icePhaseTxt(st.phase));
    let h='<div class="icesim">';
    // stepper
    h+='<div class="isteps">'+ICESIM_PHASES.map((p,i)=>'<button class="istep'+(i===st.phase?" on":"")+(i<st.phase?" done":"")+'" data-p="'+i+'"><span class="isn">'+(i<st.phase?"✓":(i+1))+'</span><span class="isl">'+icePhaseTxt(i).t+'</span></button>'+(i<ICESIM_PHASES.length-1?'<span class="isarr">›</span>':'')).join("")+'</div>';
    h+='<div class="iphase"><div class="iphh"><div class="iphi">'+IC(ph.ic)+'</div><div><div class="iphlbl">'+L("Fase ","Phase ")+(st.phase+1)+L(" av "," of ")+ICESIM_PHASES.length+'</div><h4>'+ph.t+'</h4></div>'+(ph.mins?'<div class="iphtimer" data-cd></div>':'')+'</div><p class="iphdesc">'+ph.desc+'</p>';
    // body per phase
    if(st.phase===0){
      h+='<div class="afield" style="margin:14px 0 0"><div class="al">'+IC("target")+L("Beslutningsspørsmål · «Vi må bestemme …»","Decision question · “We need to decide …”")+'</div><textarea class="isdec" placeholder="'+L("f.eks. Vi må bestemme plasseringen av teknisk rom slik at både ARK, RIV og RIB kan låse sine løsninger.","e.g. We need to decide the location of the technical room so ARK, RIV and RIB can lock their solutions.")+'">'+esc(st.decision)+'</textarea></div>';
      h+='<div class="iroles"><div class="al" style="margin:14px 0 8px">'+IC("users")+L("Rundt bordet · klikk for å markere hvem som er til stede","Around the table · click to mark who's present")+'</div><div class="irolerow">'+st.roles.map((r,i)=>'<button class="irole'+(r.present?" on":"")+'" data-r="'+i+'">'+esc(roleLabel(r.name))+'</button>').join("")+'<button class="irole add" data-add="1">'+IC("plus")+L("rolle","role")+'</button></div></div>';
    } else if(st.phase===2){
      const present=st.roles.filter(r=>r.present);
      h+='<div class="inotes">'+present.map((r,i)=>'<div class="inote"><div class="inh">'+esc(roleLabel(r.name))+'</div><textarea class="irn" data-rn="'+st.roles.indexOf(r)+'" placeholder="'+L("Krav / innspill / forbehold fra ","Requirement / input / caveat from ")+esc(roleLabel(r.name))+' …">'+esc(r.note)+'</textarea></div>').join("")+'</div>';
    } else if(st.phase===3){
      h+='<div class="inputrev">'+(st.roles.filter(r=>r.present&&r.note.trim()).map(r=>'<div class="irev"><b>'+esc(roleLabel(r.name))+':</b> '+esc(r.note)+'</div>').join("")||'<div class="irev muted">'+L("Ingen innspill notert i gjennomgangen.","No input was noted in the review.")+'</div>');
      h+='</div><div class="afield" style="margin:12px 0 0"><div class="al">'+IC("check")+L("Beslutningen dere tok","The decision you made")+'</div><textarea class="isbesl" placeholder="'+L("Vi besluttet at …","We decided that …")+'">'+esc(st.beslutning)+'</textarea></div>';
    } else if(st.phase===4){
      h+='<div class="afield" style="margin:14px 0 0"><div class="al">'+IC("hand")+L("Ansvar videre · hvem gjør hva, og når","Next steps · who does what, and when")+'</div><textarea class="isansv" placeholder="'+L("• ARK oppdaterer modellen innen fredag\n• PL kaller inn berørte fag\n• …","• ARK updates the model by Friday\n• PL calls in the affected disciplines\n• …")+'">'+esc(st.ansvar)+'</textarea></div>';
    } else if(st.phase===5){
      h+=iceSummary();
    }
    // nav
    h+='<div class="inav">'+(st.phase>0?'<button class="bbtn ghost iprev">'+L("‹ Forrige","‹ Previous")+'</button>':'<span></span>')+(st.phase<ICESIM_PHASES.length-1?'<button class="bbtn inext">'+(st.phase===0?L("Start sesjonen ›","Start the session ›"):L("Neste fase ›","Next phase ›"))+'</button>':'<button class="bbtn ghost irestart">'+IC("reset")+L("Kjør på nytt","Run again")+'</button>')+'</div>';
    h+='</div></div>';
    stage.innerHTML=h;
    bind();
  }
  function iceSummary(){
    const present=st.roles.filter(r=>r.present).length;
    return '<div class="isumm"><div class="isumm-grid">'+
      '<div class="isumm-card"><div class="al">'+IC("target")+L("Beslutning","Decision")+'</div><p>'+(esc(st.beslutning)||'<span class="muted">'+L("Ikke notert","Not noted")+'</span>')+'</p></div>'+
      '<div class="isumm-card"><div class="al">'+IC("hand")+L("Ansvar videre","Next steps")+'</div><p>'+(esc(st.ansvar).replace(/\n/g,"<br>")||'<span class="muted">'+L("Ikke notert","Not noted")+'</span>')+'</p></div>'+
      '</div>'+
      '<div class="latency"><div class="al" style="margin-bottom:10px">'+IC("flow")+L("Slik komprimerte ICE prosessen","How ICE compressed the process")+'</div>'+
        '<div class="latrow"><div class="latlbl">'+L("Sekvensiell prosess","Sequential process")+'<span>'+L("e-post, venting på svar, nye møter","email, waiting for answers, new meetings")+'</span></div><div class="latbar seq"><span style="width:100%">'+L("3–4 uker","3–4 weeks")+'</span></div></div>'+
        '<div class="latrow"><div class="latlbl">'+L("ICE-sesjon","ICE session")+'<span>'+present+L(" fag i samme rom, beslutning i sanntid"," disciplines in one room, decision in real time")+'</span></div><div class="latbar ice"><span style="width:12%">'+L("~13 min","~13 min")+'</span></div></div>'+
        '<div class="latnote">'+IC("bulb")+L("Latens (ventetid mellom avhengige steg) er det ICE fjerner. Samme beslutning – brøkdel av tiden.","Latency (the wait between dependent steps) is what ICE removes. Same decision — a fraction of the time.")+'</div>'+
      '</div></div>';
  }
  function bind(){
    stage.querySelectorAll(".istep").forEach(b=>b.onclick=()=>{goPhase(+b.dataset.p);});
    const dec=stage.querySelector(".isdec");if(dec)dec.oninput=()=>{st.decision=dec.value;saveStore();};
    const besl=stage.querySelector(".isbesl");if(besl)besl.oninput=()=>{st.beslutning=besl.value;saveStore();};
    const ansv=stage.querySelector(".isansv");if(ansv)ansv.oninput=()=>{st.ansvar=ansv.value;saveStore();};
    stage.querySelectorAll(".irole[data-r]").forEach(b=>b.onclick=()=>{const i=+b.dataset.r;st.roles[i].present=!st.roles[i].present;saveStore();render();});
    const addR=stage.querySelector(".irole[data-add]");if(addR)addR.onclick=()=>{const n=prompt(L("Hvilken rolle?","Which role?"));if(n&&n.trim()){st.roles.push({name:n.trim(),present:true,note:""});saveStore();render();}};
    stage.querySelectorAll(".irn").forEach(ta=>ta.oninput=()=>{st.roles[+ta.dataset.rn].note=ta.value;saveStore();});
    const cd=stage.querySelector("[data-cd]");if(cd){timer=makeCountdown(cd,ICESIM_PHASES[st.phase].mins,{});}
    const nx=stage.querySelector(".inext");if(nx)nx.onclick=()=>goPhase(st.phase+1);
    const pv=stage.querySelector(".iprev");if(pv)pv.onclick=()=>goPhase(st.phase-1);
    const rs=stage.querySelector(".irestart");if(rs)rs.onclick=()=>{goPhase(0);};
  }
  function goPhase(p){if(timer)timer.stop();st.phase=Math.max(0,Math.min(p,ICESIM_PHASES.length-1));saveStore();render();
    const cd=stage.querySelector("[data-cd]");if(cd&&ICESIM_PHASES[st.phase].mins)setTimeout(()=>{if(timer)timer.start();},120);}
  render();
}


/* ---------- TERNINGSPILLET (dice / capacity utilization) ---------- */
function buildDice(stage,reg){
  const N=5;
  let buf=[8,4,4,4,4];   // buf[0]=supply (replenished), buf[1..4]=between-station queues
  let out=0, round=0, hist=[];
  let lowVar=false;
  stage.innerHTML='<div class="game dice">'+
    '<div class="gbar"><button class="bbtn roll">'+IC("dice")+L("Kjør runde","Run round")+'</button>'+
      '<button class="bbtn ghost run5">'+L("+5 runder","+5 rounds")+'</button>'+
      '<button class="bbtn ghost rs">'+IC("reset")+L("Nullstill","Reset")+'</button>'+
      '<label class="varToggle"><input type="checkbox" class="vchk"> '+L("Lav variabilitet (3–4)","Low variability (3–4)")+'</label></div>'+
    '<div class="dstations" data-st></div>'+
    '<div class="dstats"><div class="dstat"><span class="dk" data-out>0</span>'+L("ferdige enheter","finished units")+'</div>'+
      '<div class="dstat"><span class="dk" data-r>0</span>'+L("runder","rounds")+'</div>'+
      '<div class="dstat"><span class="dk" data-tp>0</span>'+L("snitt / runde","avg / round")+'</div>'+
      '<div class="dstat"><span class="dk" data-wip>0</span>'+L("WIP i kø","WIP in queue")+'</div></div>'+
    '<div class="dchart" data-chart></div>'+
    '<div class="dlesson">'+L("Hver stasjon kaster en terning og flytter så mange enheter som den klarer – men aldri flere enn det som ligger i køen foran. Variabiliteten i terningen lager køer selv om snittkapasiteten er lik. <b>«Alle travle» er ikke det samme som god flyt.</b>","Each station rolls a die and moves on as many units as it can — but never more than what's in the queue in front. The variability in the die creates queues even though average capacity is equal. <b>“Everyone busy” is not the same as good flow.</b>")+'</div></div>';
  const host=stage.querySelector("[data-st]");
  function die(){return lowVar?(3+Math.floor(Math.random()*2)):(1+Math.floor(Math.random()*6));}
  function drawStations(rolls){
    host.innerHTML="";
    for(let i=0;i<N;i++){
      const st=document.createElement("div");st.className="dstation";
      const q=buf[i];
      st.innerHTML='<div class="dqueue">'+(i===0?'<span class="dsupply">'+L("∞ råvarer","∞ raw")+'</span>':Array.from({length:Math.min(q,18)}).map(()=>'<span class="dtok"></span>').join("")+(q>18?'<span class="dmore">+'+(q-18)+'</span>':''))+'</div>'+
        '<div class="dbox"><div class="dlabel">'+L("Stasjon ","Station ")+(i+1)+'</div><div class="ddie'+(rolls&&rolls[i]?" rolled":"")+'">'+(rolls?dieFace(rolls[i]):"–")+'</div></div>';
      host.appendChild(st);
      if(i<N-1){const arr=document.createElement("div");arr.className="darrow";arr.innerHTML="→";host.appendChild(arr);}
    }
    const fin=document.createElement("div");fin.className="dfinish";fin.innerHTML='<div class="dlabel">'+L("Ferdig","Done")+'</div><div class="dfin-n" data-fin>'+out+'</div>';host.appendChild(fin);
  }
  function dieFace(v){const pip='<i></i>';return '<div class="face f'+v+'">'+pip.repeat(v)+'</div>';}
  function doRound(){
    round++;const rolls=[0];
    buf[0]=Math.max(buf[0],12); // keep supply available
    for(let s=1;s<=N;s++){const d=die();rolls[s]=d;const move=Math.min(d,buf[s-1]);buf[s-1]-=move;if(s===N)out+=move;else buf[s]+=move;}
    hist.push(buf.slice(1).reduce((a,b)=>a+b,0));
    drawStations(rolls);update();
  }
  function update(){
    stage.querySelector("[data-out]").textContent=out;
    stage.querySelector("[data-r]").textContent=round;
    stage.querySelector("[data-tp]").textContent=round?(out/round).toFixed(1):"0";
    const wip=buf.slice(1).reduce((a,b)=>a+b,0);
    stage.querySelector("[data-wip]").textContent=wip;
    const chart=stage.querySelector("[data-chart]");const mx=Math.max(8,...hist);
    chart.innerHTML='<div class="chlbl">'+L("WIP i kø per runde","WIP in queue per round")+'</div><div class="chbars">'+hist.slice(-26).map(v=>'<span class="chbar" style="height:'+(8+v/mx*64)+'px" title="'+v+'"></span>').join("")+'</div>';
  }
  stage.querySelector(".roll").onclick=doRound;
  stage.querySelector(".run5").onclick=()=>{let i=0;const iv=setInterval(()=>{doRound();if(++i>=5)clearInterval(iv);},260);};
  stage.querySelector(".rs").onclick=()=>{buf=[8,4,4,4,4];out=0;round=0;hist=[];drawStations(null);update();};
  stage.querySelector(".vchk").onchange=e=>{lowVar=e.target.checked;};
  drawStations(null);update();
}

/* ---------- PUSH vs PULL ---------- */
function buildPushPull(stage,reg){
  const N=4, CAP=3, TICKS=20;
  stage.innerHTML='<div class="game pp">'+
    '<div class="gbar"><button class="bbtn runpp">'+IC("play")+L("Kjør 20 takter","Run 20 ticks")+'</button>'+
      '<button class="bbtn ghost rspp">'+IC("reset")+L("Nullstill","Reset")+'</button>'+
      (reg.t.video?'<a class="bbtn ghost" href="'+reg.t.video+'" target="_blank" rel="noopener">'+IC("play")+L("Kniberg-film","Kniberg video")+'</a>':'')+'</div>'+
    '<div class="pplane"><div class="ppmode push" data-push><div class="ppmh">'+L("PUSH — dytt alt du klarer","PUSH — push all you can")+'</div><div class="ppstations" data-ps-push></div><div class="ppres" data-res-push></div></div>'+
    '<div class="ppmode pull" data-pull><div class="ppmh">'+L("PULL — bare når neste er klar (maks ","PULL — only when the next is ready (max ")+CAP+L(" i buffer)"," in buffer)")+'</div><div class="ppstations" data-ps-pull></div><div class="ppres" data-res-pull></div></div></div>'+
    '<div class="dlesson">'+L("Begge linjer har nøyaktig samme tilfeldige kapasitet hver takt. <b>Push</b> fyller systemet med arbeid ingen rekker å ta imot → lager hoper seg opp mellom stasjonene. <b>Pull</b> slipper bare løs arbeid når neste stasjon har plass → jevnere flyt og mye mindre lager (WIP).","Both lines have exactly the same random capacity each tick. <b>Push</b> fills the system with work no one can receive → inventory piles up between stations. <b>Pull</b> only releases work when the next station has room → smoother flow and far less inventory (WIP).")+'</div></div>';
  function fresh(){return {buf:Array.from({length:N},()=>0),out:0};}
  function drawLine(host,state,mx){
    host.innerHTML="";
    for(let i=0;i<N;i++){const st=document.createElement("div");st.className="ppstation";
      const q=state.buf[i];const h=Math.min(q,30);
      st.innerHTML='<div class="ppbufwrap"><div class="ppbuf" style="height:'+(6+h*5)+'px"><span class="ppn">'+q+'</span></div></div><div class="pplabel">S'+(i+1)+'</div>';
      if(q>CAP&&host.parentElement.classList.contains("push"))st.querySelector(".ppbuf").classList.add("hot");
      host.appendChild(st);
      if(i<N-1){const a=document.createElement("span");a.className="pparrow";a.textContent="→";host.appendChild(a);}}
    const f=document.createElement("div");f.className="ppfinish";f.innerHTML='<div class="ppfin-n">'+state.out+'</div><div class="pplabel">'+L("ferdig","done")+'</div>';host.appendChild(f);
  }
  let pushS,pullS,seedRolls;
  function reset(){pushS=fresh();pullS=fresh();seedRolls=null;drawLine(stage.querySelector("[data-ps-push]"),pushS);drawLine(stage.querySelector("[data-ps-pull]"),pullS);stage.querySelector("[data-res-push]").innerHTML="";stage.querySelector("[data-res-pull]").innerHTML="";}
  function step(state,pull,rolls){
    for(let i=0;i<N;i++){const cap=rolls[i];
      if(i===0){const make=pull?Math.min(cap,Math.max(0,CAP-state.buf[0])):cap;state.buf[0]+=make;}
      else{const avail=state.buf[i-1];const room=pull?Math.max(0,CAP-state.buf[i]):Infinity;const move=Math.min(cap,avail,room);state.buf[i-1]-=move;state.buf[i]+=move;}
    }
    const shipCap=rolls[N-1];const ship=Math.min(shipCap,state.buf[N-1]);state.buf[N-1]-=ship;state.out+=ship;
  }
  function run(){
    reset();let tick=0;
    const iv=setInterval(()=>{
      const rolls=Array.from({length:N},()=>1+Math.floor(Math.random()*CAP+0.0));
      const r2=rolls.slice();
      step(pushS,false,rolls);step(pullS,true,r2);
      drawLine(stage.querySelector("[data-ps-push]"),pushS);drawLine(stage.querySelector("[data-ps-pull]"),pullS);
      if(++tick>=TICKS){clearInterval(iv);results();}
    },300);
  }
  function wip(s){return s.buf.reduce((a,b)=>a+b,0);}
  function results(){
    stage.querySelector("[data-res-push]").innerHTML='<span class="ppr"><b>'+pushS.out+'</b> '+L("ferdige","finished")+'</span><span class="ppr hot"><b>'+wip(pushS)+'</b> '+L("i lager (WIP)","in inventory (WIP)")+'</span>';
    stage.querySelector("[data-res-pull]").innerHTML='<span class="ppr"><b>'+pullS.out+'</b> '+L("ferdige","finished")+'</span><span class="ppr cool"><b>'+wip(pullS)+'</b> '+L("i lager (WIP)","in inventory (WIP)")+'</span>';
  }
  stage.querySelector(".runpp").onclick=run;
  stage.querySelector(".rspp").onclick=reset;
  reset();
}
