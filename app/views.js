/* ============================================================
   VIEWS — page renderers (bilingual via L())
   ============================================================ */

/* ---- context: ONE per work group, carried through ALL six sessions ---- */
function curCtx(){
  const g=G(); if(!g.ctx||typeof g.ctx!=="object") g.ctx={};
  // migrate old per-session shape {1:{sel,own},2:{…}} → flat {sel,own}
  if(g.ctx.sel===undefined && g.ctx.own===undefined){
    for(const k in g.ctx){ if(/^\d+$/.test(k)){ const v=g.ctx[k]; if(v&&(v.sel!=null||v.own)){ g.ctx={sel:v.sel,own:v.own}; saveStore(); break; } } }
    for(const k in g.ctx){ if(/^\d+$/.test(k)) delete g.ctx[k]; }
  }
  return g.ctx;
}
function groupCtx(g){ if(!g||!g.ctx) return {}; if(g.ctx.sel!==undefined||g.ctx.own!==undefined) return g.ctx; for(const k in g.ctx){ if(/^\d+$/.test(k)&&g.ctx[k]&&(g.ctx[k].sel!=null||g.ctx[k].own)) return g.ctx[k]; } return g.ctx; }
function ctxLabel(){const c=curCtx();if(c.sel==="own")return c.own&&c.own.trim()?c.own:L("Egen case fra arbeidsgruppa","Your own case from the work group");if(c.sel!=null&&c.sel!=="own"&&KONTEKST[c.sel])return KONTEKST[c.sel].t;return null;}
function ctxBar(){
  const c=curCtx();
  let opts='<option value="">'+L("– velg kontekst –","– choose a context –")+'</option>';
  KONTEKST.forEach((k,i)=>{opts+='<option value="'+i+'"'+(c.sel==i?' selected':'')+'>'+k.t+' · '+k.sektor+'</option>';});
  opts+='<option value="own"'+(c.sel==="own"?' selected':'')+'>'+L("Egen case fra arbeidsgruppa …","Your own case from the work group …")+'</option>';
  let h='<div class="ctxbar"><div class="cth">'+IC("building")+L("Gruppas kontekst – velges én gang og følger dere gjennom alle seks sesjonene","Your group's context — chosen once and carried through all six sessions")+'</div>';
  h+='<div class="ctxrow"><select id="ctxSel">'+opts+'</select>';
  if(c.sel==="own")h+='<input id="ctxOwn" placeholder="'+L("Skriv kort hva caset handler om …","Briefly describe the case …")+'" value="'+((c.own||"").replace(/"/g,"&quot;"))+'">';
  h+='</div>';
  const lab=ctxLabel(),k=(c.sel!=null&&c.sel!=="own")?KONTEKST[c.sel]:null;
  if(lab)h+='<div class="ctx-chosen"><b>'+L("Valgt kontekst:","Chosen context:")+'</b> '+lab+(k?'. '+k.s:'')+(k?'<div class="ct-tags"><span>'+k.sektor+'</span><span>'+k.fase+'</span></div>':'')+'</div>';
  else h+='<div class="ctx-none">'+L("Ingen kontekst valgt ennå. Se hele biblioteket under ","No context chosen yet. See the full library under ")+'<b>'+L("Kontekster","Contexts")+'</b>.</div>';
  return h+'</div>';
}
function ctxChip(){const lab=ctxLabel();return lab?'<div class="ctx-chip">'+IC("building")+L("Kontekst: ","Context: ")+'<span class="ctx-chip-val">'+lab+'</span></div>':'';}
function updateChips(){const lab=ctxLabel()||"–";document.querySelectorAll(".ctx-chip-val").forEach(e=>e.textContent=lab);}

/* ---- shared render helpers ---- */
function subnav(){
  return '<div class="subnav">'+SESS.map(s=>'<button class="spill'+(SUB===s.no?" on":"")+'" onclick="setSub('+s.no+')" style="'+(SUB===s.no?'background:'+s.accent:'')+'"><span class="d" style="background:'+s.accent+'"></span>'+s.no+' · '+s.tema.split(" – ")[0].split(" (")[0]+'</button>').join("")+'</div>';
}
function block(color,ic,phase,title,role,body){
  if(phase==null)phase="";if(body==null)body="";
  return '<div class="block reveal"><div class="bh"><div class="bi" style="background:'+color+'">'+IC(ic)+'</div><div class="bhtxt">'+(phase?'<div class="phase-lbl">'+phase+'</div>':'')+'<h3>'+title+'</h3></div>'+(role?'<div class="time">'+role+'</div>':'')+'</div><div class="bb">'+body+'</div></div>';
}
function sec2(ic,lbl,title,sub,body){return '<div class="sec2 reveal"><div class="lbl">'+IC(ic)+lbl+'</div><h2>'+title+'</h2>'+(sub?'<div class="s2sub">'+sub+'</div>':'')+body+'</div>';}
function mini(ic,h,p){return '<div class="mini"><div class="mi">'+IC(ic)+'</div><h4>'+h+'</h4><p>'+p+'</p></div>';}
function runBlock(color,title,role,run){
  let r='<div class="run">';
  run.forEach(s=>{r+='<div class="rline"><div class="rtime"><div class="tm2">'+s.time+'</div><span class="met">'+s.met+'</span>'+(s.mins?'<button class="rtimer" onclick="openTimer('+s.mins+',\''+s.h.replace(/'/g,"")+'\')" title="'+L("Start","Start")+' '+s.mins+' min">'+IC("timer")+s.mins+'m</button>':'')+'</div><div class="rbody"><h6>'+s.h+'</h6><p>'+s.p+'</p><div class="ment">'+IC("compass")+'<span>'+s.ment+'</span></div></div></div>';});
  return block(color,"route","",title,role,r+'</div>');
}
function ddwBlock(color,title,dd,exLabel,exItems){
  function col(cls,ic,lbl,items,el,ei){let c='<div class="ddcol '+cls+'"><div class="ch">'+IC(ic)+lbl+'</div><ul>'+items.map(x=>'<li>'+x+'</li>').join("")+'</ul>';if(ei&&ei.length)c+='<div class="extra"><div class="et">'+el+'</div><ul>'+ei.map(x=>'<li>'+x+'</li>').join("")+'</ul></div>';return c+'</div>';}
  return block(color,"hand","",title,"",'<div class="ddw">'+col("do","task",L("Gjør","Do"),dd.do)+col("dont","q",L("Ikke gjør","Don't"),dd.dont)+col("watch","eye",L("Følg med på","Watch for"),dd.watch,exLabel,exItems)+'</div>');
}
function roleBar(){
  return ROLE==="student"
    ? '<div class="rolebar student">'+IC("group")+'<span>'+L("<b>Studentvisning</b> – dette er arbeidsarket dere løser oppgavene på. Mentor bytter til <b>Mentor</b> øverst for eksempelsvar og fasiliteringstips.","<b>Student view</b> — this is the worksheet you solve the tasks on. Mentors switch to <b>Mentor</b> at the top for sample answers and facilitation tips.")+'</span></div>'
    : '<div class="rolebar mentor">'+IC("star")+'<span>'+L("<b>Mentorvisning</b> – samme oppgaver som studentene, men med eksempelsvar, fasiliteringstips og det du skal sikre. Steg-for-steg-kjøring ligger i <b>Kjøreplan</b>.","<b>Mentor view</b> — the same tasks as the students, but with sample answers, facilitation tips and what to secure. The step-by-step run-of-show is under <b>Run-of-show</b>.")+'</span></div>';
}
function typeLbl(t){return {praktisk:L("Praktisk øvelse","Hands-on exercise"),refleksjon:L("Refleksjon","Reflection"),analyse:L("Analyse","Analysis")}[t]||L("Oppgave","Task");}

function weekData(){return [
  {dd:L("MANDAG 03.08","MON · AUG 3"),dn:L("Mentordag","Mentor day"),slots:[{cls:"muted2",st:"",t:L("Kl. 10–18 · mentorforberedelse","10:00–18:00 · mentor prep")},{cls:"muted2",t:L("Felles middag 19:00","Group dinner 19:00")}]},
  {dd:L("TIRSDAG 04.08","TUE · AUG 4"),dn:L("Dag 1","Day 1"),slots:[{ws:1},{cls:"lunch",t:L("FELLES LUNSJ","GROUP LUNCH")},{ws:2},{cls:"muted2",st:L("Kveld","Evening"),t:L("Simulering av ICE-sesjon","ICE session simulation")}]},
  {dd:L("ONSDAG 05.08","WED · AUG 5"),dn:L("Dag 2","Day 2"),slots:[{ws:3},{cls:"lunch",t:L("FELLES LUNSJ","GROUP LUNCH")},{ws:4},{cls:"muted2",st:L("Kveld","Evening"),t:L("Variabilitet + Kniberg + terningspill","Variability + Kniberg + dice game")}]},
  {dd:L("TORSDAG 06.08","THU · AUG 6"),dn:L("Dag 3","Day 3"),slots:[{ws:5},{cls:"lunch",t:L("FELLES LUNSJ","GROUP LUNCH")},{ws:6},{cls:"muted2",st:L("Kveld","Evening"),t:L("Forberedelse: implementering","Prep: implementation")}]},
  {dd:L("FREDAG 07.08","FRI · AUG 7"),dn:L("Dag 4","Day 4"),slots:[{cls:"muted2",st:"09–12",t:L("Implementeringsplan (Fischer) + arbeid","Implementation plan (Fischer) + work")},{cls:"lunch",t:L("FELLES LUNSJ","GROUP LUNCH")},{cls:"muted2",st:"13–15",t:L("Innsjekk + oppsummering","Check-in + wrap-up")}]}
];}

/* ============================ OVERVIEW ============================ */
function overview(){
  let h='<div class="hero reveal"><div class="eyebrow">'+IC("compass")+' VDC Compass · '+L("Introuka 2026","Intro Week 2026")+'</div>'+
    '<h1>'+L("Kompasset for<br>introuka","The compass for<br>intro week")+'</h1>'+
    '<p class="lead">'+L("Seks workshops à tre timer over tre dager. Hver har <b>samme grunnrytme</b> – 1 t input fra Martin Fischer, 1 t trening, 1 t refleksjon – men <b>bevisst forskjellig arbeidsform</b>, så de 60 deltakerne lærer VDC på seks ulike måter. Alle øvelser kjøres direkte her – ingen Miro.","Six three-hour workshops over three days. Each has the <b>same base rhythm</b> — 1 h of input from Martin Fischer, 1 h of practice, 1 h of reflection — but a <b>deliberately different working method</b>, so the 60 participants learn VDC in six different ways. Every exercise runs right here — no Miro.")+'</p>'+
    journeyCompass()+'</div>';
  h+=roleBar();
  h+='<h2 class="sec">'+IC("route")+L("Uka i ett blikk","The week at a glance")+'</h2><div class="week reveal">';
  weekData().forEach(d=>{h+='<div class="day"><div class="dh"><div class="dd">'+d.dd+'</div><div class="dn">'+d.dn+'</div></div><div class="slots">';
    d.slots.forEach(sl=>{if(sl.ws){const s=SESS.find(x=>x.no===sl.ws);h+='<div class="slot ws" style="background:'+s.color+'" onclick="SUB='+s.no+';go(\'oppgaver\')"><div class="st">'+s.time+'</div>'+s.no+' · '+s.tema.split(" – ")[0].split(" (")[0]+'</div>';}else h+='<div class="slot '+(sl.cls||"")+'">'+(sl.st?'<div class="st">'+sl.st+'</div>':'')+sl.t+'</div>';});
    h+='</div></div>';});
  h+='</div>';
  h+='<h2 class="sec">'+IC("flag")+L("Finn fram","Find your way")+'</h2><div class="dims reveal">'+[
    ["introuka","book",L("Introuka","Intro week"),L("Hva hver temaintroduksjon inneholder, og hvordan de seks sesjonene henger sammen.","What each topic intro covers, and how the six sessions connect.")],
    ["struktur","layers",L("Struktur","Structure"),L("Den pedagogiske oppbyggingen: faser, roller, arbeidsgrupper og den røde tråden.","The pedagogical build-up: phases, roles, work groups and the through-line.")],
    ["kjoreplan","route",L("Kjøreplan","Run-of-show"),L("Minutt-for-minutt kjøreguide for Workshop 1 og 2 – med live tidtaker per bolk.","A minute-by-minute guide for Workshop 1 and 2 — with a live timer per block.")],
    ["oppgaver","list",L("Oppgaver & verktøy","Tasks & tools"),L("De konkrete oppgavene per sesjon","The concrete tasks per session")+(ROLE==="mentor"?L(", med eksempelsvar, fasilitatornotater og kjørbare arbeidstavler.",", with sample answers, facilitator notes and runnable boards."):L(". Hver oppgave har sin egen kjørbare tavle – post-its, prosesskart, spill og mer.",". Each task has its own runnable board — sticky notes, process maps, games and more."))],
    ["kontekster","building",L("Kontekster","Contexts"),L("Generiske, typiske situasjoner gruppene kan velge fra – eller egen case fra arbeidsgruppa.","Generic, typical situations groups can choose from — or their own case.")],
    ["samling","share",L("Samling & deling","Collect & share"),L("Samle gruppenes arbeid, del mellom enheter og eksportér til workshop 2 og plenum.","Collect the groups' work, share between devices and export to Workshop 2 and plenary.")],
    ["fasilitator","compass",L("Fasilitatorpakke","Facilitator pack"),L("Mentorenes verktøy: forberedelse, SPGR, endringsledelse og hele mentorlæringen.","The mentors' toolkit: preparation, SPGR, change leadership and the full mentor learning track.")]
  ].filter(d=>allowed(d[0])).map(([v,ic,t,p])=>'<div class="dim" onclick="go(\''+v+'\')"><div class="di">'+IC(ic)+'</div><h3>'+t+'</h3><p>'+p+'</p></div>').join("")+'</div>';
  return h;
}

/* gamified progress compass-rose */
function journeyCompass(){
  const g=G();let don=0;
  const pts=SESS.map((s,i)=>{const ang=(-90+i*60)*Math.PI/180;const done=!!(g.done&&g.done[s.no]);const started=sessionStarted(s.no);if(done)don++;
    return {s,x:50+38*Math.cos(ang),y:50+38*Math.sin(ang),done,started};});
  const pct=Math.round(don/6*100);
  let dots=pts.map(p=>'<button class="jc-pt'+(p.done?" done":(p.started?" started":""))+'" style="left:'+p.x+'%;top:'+p.y+'%;--cc:'+p.s.accent+'" onclick="SUB='+p.s.no+';go(\'oppgaver\')" title="'+L("Sesjon","Session")+' '+p.s.no+' · '+p.s.tema+'"><span>'+(p.done?"✓":p.s.no)+'</span></button>').join("");
  return '<div class="journey-c"><div class="jc-ring"><svg viewBox="0 0 100 100" class="jc-svg"><circle cx="50" cy="50" r="38" class="jc-track"/><circle cx="50" cy="50" r="38" class="jc-prog" style="stroke-dasharray:'+(2*Math.PI*38)+';stroke-dashoffset:'+(2*Math.PI*38*(1-don/6))+'"/></svg>'+
    '<div class="jc-core"><div class="jc-pct">'+pct+'%</div><div class="jc-lbl">'+L("awareness<br>låst opp","awareness<br>unlocked")+'</div></div>'+dots+'</div>'+
    '<div class="jc-side"><div class="jc-h">'+L("Reisen gjennom uka","The journey through the week")+'</div><p>'+L("Følg progresjonen deres: hvert punkt lyser opp når dere fullfører en sesjon. Trykk «Marker awareness som nådd» nederst i hver oppgave-økt når dere er i mål – da fylles ringen.","Track your progress: each point lights up when you complete a session. Click “Mark awareness as reached” at the bottom of each task session when you're there — and the ring fills.")+'</p>'+
    '<div class="jc-leg"><span class="lg done"></span>'+L("Fullført","Done")+' <span class="lg started"></span>'+L("I gang","In progress")+' <span class="lg"></span>'+L("Ikke startet","Not started")+'</div></div></div>';
}
function sessionStarted(no){const g=G();const a=g.answers||{},b=g.boards||{};
  if(Object.keys(a).some(k=>k.startsWith("s"+no+"-")&&a[k]&&a[k].trim()))return true;
  if(Object.keys(b).some(k=>{if(!(k.startsWith("s"+no+"-")||(no===2&&k==="s2-map")||(no===4&&k.startsWith("proc-map"))))return false;const v=b[k];return v&&((v.notes&&v.notes.length)||(v.cards&&v.cards.length)||(v.items&&v.items.length)||(v.nodes&&v.nodes.length)||(v.marks&&v.marks.length)||(v.placed&&v.placed.length)||(v.rows&&v.rows.some(r=>r.some(c=>c&&c.trim))));}))return true;
  return false;
}

/* ============================ INTROUKA ============================ */
function introukaView(){
  let h='<div class="eyebrow">'+IC("book")+' '+L("Introuka","Intro week")+'</div><h1>'+L("Introduksjonene og den røde tråden","The intros and the through-line")+'</h1>';
  h+='<p class="lead">'+L("Før hver workshop setter Martin Fischer standarden i plenum. Her ser du hva hver introduksjon dekker, hva sesjonen skal lære bort, og hvordan de seks sesjonene bygger videre på hverandre.","Before each workshop, Martin Fischer sets the standard in plenary. Here you see what each intro covers, what the session teaches, and how the six sessions build on each other.")+'</p>';
  h+=sec2("route",L("Sammenhengen","The through-line"),L("Slik henger de seks sesjonene sammen","How the six sessions connect"),L("Gruppa velger én kontekst og bærer den gjennom hele uka – akkurat som et ekte prosjekt utvikler seg fra mål til informasjon.","The group picks one context and carries it through the whole week — just as a real project evolves from objectives to information."),
    '<div class="route">'+SESS.map((s,i)=>'<span class="rstep" style="border-color:'+s.accent+';color:'+s.accent+'">'+s.no+' · '+s.tema.split(" – ")[0].split(" (")[0]+'</span>'+(i<5?'<span class="rarr">→</span>':'')).join("")+'</div>');
  SESS.forEach(s=>{
    h+=block(s.color,"present",L("Sesjon ","Session ")+s.no+" · "+s.day+" · "+s.time,s.tema,s.time,
      '<div class="goal" style="background:'+s.color+'"><span class="gi">'+IC("target")+'</span><div><div class="gl">'+L("Læringsmål","Learning goal")+'</div><p>'+s.goal+'</p></div></div>'+
      '<h5>'+IC("bulb")+L("Etter Fischers intro skal studentene forstå","After Fischer's intro, participants should understand")+'</h5><ul>'+s.fischer.map(x=>'<li>'+x+'</li>').join("")+'</ul>'+
      '<div class="awareness" style="border-left-color:'+s.accent+'"><b style="color:'+s.accent+'">'+L("Henger sammen:","Connects:")+'</b> '+s.connect+'</div>');
  });
  return h;
}

/* ============================ STRUKTUR ============================ */
function strukturView(){
  let h='<div class="eyebrow">'+IC("layers")+' '+L("Struktur","Structure")+'</div><h1>'+L("Slik er sesjonene bygd opp","How the sessions are built")+'</h1>';
  h+='<p class="lead">'+L("Hver sesjon har <b>samme grunnrytme</b> – 1 t input fra Martin Fischer, 1 t trening, 1 t refleksjon – men <b>bevisst forskjellig arbeidsform</b>. De 60 deltakerne møter VDC gjennom seks ulike måter å jobbe og lære på, slik at metoden i seg selv forsterker det sesjonen skal lære bort.","Each session has the <b>same base rhythm</b> — 1 h of input from Martin Fischer, 1 h of practice, 1 h of reflection — but a <b>deliberately different working method</b>. The 60 participants meet VDC through six different ways of working and learning, so the method itself reinforces what the session teaches.")+'</p>';
  h+='<div class="anat reveal"><h3>'+L("Grunnrytmen – tre timer, tre faser","The base rhythm — three hours, three phases")+'</h3><div class="sub">'+L("Selve rytmen er fast og gjenkjennelig. Arbeidsformen INNI trening og refleksjon varierer fra sesjon til sesjon (se under).","The rhythm itself is fixed and recognizable. The working method WITHIN practice and reflection changes from session to session (see below).")+'</div><div class="phases">'+ANAT.map(p=>'<div class="phase '+p.cls+'"><div class="pi">'+IC(p.ic)+'</div><div class="pt">'+p.tag+'</div><h4>'+p.h+'</h4><p>'+p.p+'</p></div>').join("")+'</div></div>';
  h+=sec2("spark",L("Variasjon","Variation"),L("Seks sesjoner, seks arbeidsformer","Six sessions, six working methods"),L("Samme rytme – ulik aktivisering. Vi varierer pedagogikken bevisst for å holde energien oppe og treffe flere læringsstiler. Trykk en rad for å åpne kjøreplanen.","Same rhythm — different activation. We vary the pedagogy on purpose to keep energy up and reach more learning styles. Click a row to open the run-of-show."),
    '<div class="fmtlist">'+SESS.map(s=>{const p=PED[s.no];if(!p)return"";return '<button class="fmtrow" style="--ac:'+s.accent+'" onclick="SUB='+s.no+';go(\'kjoreplan\')"><span class="fmtrow-no">'+s.no+'</span><span class="fmtrow-tema">'+s.tema.split(" – ")[0].split(" (")[0]+'</span><span class="fmtrow-meth"><b>'+IC("group")+p.format.w1.name+'</b><span class="fmtrow-arr">→</span><b>'+IC("chat")+p.format.w2.name+'</b></span></button>';}).join("")+'</div>');
  h+=sec2("group",L("Oppsett","Setup"),L("Arbeidsgrupper og roller","Work groups and roles"),L("Hvert mentorteam er 20 studenter, delt i fire arbeidsgrupper på fem. Faste roller gjør gruppearbeidet effektivt.","Each mentor team is 20 participants, split into four work groups of five. Fixed roles keep the group work efficient."),
    '<div class="cardgrid">'+
      mini("group",L("4 arbeidsgrupper á 5","4 work groups of 5"),L("Gruppene jobber parallelt på hver sin valgte kontekst. Mentor(ene) roterer mellom gruppene.","The groups work in parallel, each on its chosen context. The mentor(s) rotate between groups."))+
      mini("flag",L("Leder","Lead"),L("Styrer fremdriften i gruppa og passer på at alle oppgaver blir besvart.","Drives the group's progress and makes sure every task gets answered."))+
      mini("clip",L("Sekretær","Scribe"),L("Skriver ned svarene og lager det delbare bildet til workshop 2.","Writes down the answers and creates the shareable picture for Workshop 2."))+
      mini("compass",L("Tidtaker","Timekeeper"),L("Passer på klokka og holder gruppa innenfor tidsrammene.","Watches the clock and keeps the group inside the time boxes."))+
    '</div>');
  h+=sec2("list",L("Arbeidsarket","The worksheet"),L("Den faste flyten i hver workshop","The fixed flow in each workshop"),L("Selve arbeidsformen varierer (se over), men leveranselogikken er gjenkjennelig: ramme → jobb → del → oppsummer.","The working method varies (see above), but the delivery logic is consistent: frame → work → share → wrap up."),
    block("#00509E","route","",L("Standard rekkefølge på arbeidsarket","Standard order on the worksheet"),"",
      '<div class="run">'+[
        [L("Oppstart med mentor","Kickoff with mentor"),L("3 min","3 min"),L("Mentor rammer oppgaven, læringsmål og hvordan gjennomføre.","The mentor frames the task, the goal and how to run it.")],
        [L("Kontekst","Context"),L("5 min","5 min"),L("Gruppa velger og forankrer sin kontekst (fra biblioteket eller egen case).","The group picks and anchors its context (from the library or its own case).")],
        [L("Oppgave 1–5","Tasks 1–5"),L("~35 min","~35 min"),L("Gruppa løser oppgavene og noterer svar på de kjørbare tavlene.","The group solves the tasks and records answers on the runnable boards.")],
        [L("Pause","Break"),"–",L("Kort pause før deling.","A short break before sharing.")],
        [L("Presentasjon og refleksjon med mentor","Presentation and reflection with mentor"),L("30 min","30 min"),L("Workshop 2: deling og refleksjon på tvers i mentorteamet.","Workshop 2: sharing and reflection across the mentor team.")],
        [L("Oppsummering · Pluss/Delta","Wrap-up · Plus/Delta"),L("10 min","10 min"),L("Hva var bra (Pluss), hva bør endres (Delta), og Key takeaways.","What was good (Plus), what to change (Delta), and key takeaways.")],
        [L("Plenum deling","Plenary share"),"–",L("Deling og refleksjon fra VDC-økten på tvers av alle mentorteam.","Sharing and reflection from the VDC session across all mentor teams.")]
      ].map(r=>'<div class="rline"><div class="rtime"><div class="tm2">'+r[1]+'</div></div><div class="rbody"><h6>'+r[0]+'</h6><p>'+r[2]+'</p></div></div>').join("")+'</div>'));
  h+='<div class="link-fk">'+IC("route")+'<div>'+L("Vil du se minutt-for-minutt kjøring og mentorens rolle? Gå til <b>Kjøreplan</b>. De konkrete oppgavene ligger under <b>Oppgaver</b>.","Want the minute-by-minute run and the mentor's role? Go to <b>Run-of-show</b>. The concrete tasks are under <b>Tasks</b>.")+'</div></div>';
  return h;
}

/* ============================ KJØREPLAN ============================ */
function kjoreplanView(){
  const s=SESS.find(x=>x.no===SUB);
  let h='<div class="eyebrow">'+IC("route")+' '+L("Kjøreplan","Run-of-show")+'</div><h1>'+L("Kjøreguide for Workshop 1 og 2","Run-of-show for Workshop 1 and 2")+'</h1>';
  h+='<p class="lead">'+L("Minutt-for-minutt-guide for mentor: hva du gjør i hvert steg, hva du skal unngå, og hva du følger med på. Trykk klokke-knappen i et steg for å starte nedtellingen live. Velg sesjon:","Minute-by-minute guide for the mentor: what you do in each step, what to avoid, and what to watch for. Click the clock button in a step to start the live countdown. Choose a session:")+'</p>';
  h+=subnav();
  h+='<div class="goal reveal" style="background:'+s.color+'"><span class="gi">'+IC("target")+'</span><div><div class="gl">'+L("Sesjon ","Session ")+s.no+' · '+s.tema+'</div><p>'+s.goal+'</p></div></div>';
  const p=PED[s.no];
  if(p){
    h+=formatBanner(p,s);
    h+=runBlock(s.color,L("Slik kjører du Workshop 1 · Trening","How to run Workshop 1 · Practice"),L("60 min · arbeidsgrupper á 5","60 min · work groups of 5"),p.w1);
    h+=ddwBlock(s.color,L("Mentor i Workshop 1","Mentor in Workshop 1"),p.dd1,L("Følg spesielt med på her","Watch especially for"),s.mentorTips);
    h+=runBlock(s.color,L("Slik kjører du Workshop 2 · Refleksjon","How to run Workshop 2 · Reflection"),L("60 min · mentorteam (4 grupper)","60 min · mentor team (4 groups)"),p.w2);
    h+=ddwBlock(s.color,L("Mentor i Workshop 2","Mentor in Workshop 2"),p.dd2,L("Sikre at dette tas opp her","Make sure this is raised"),s.facilitate);
  }
  h+='<div class="link-fk">'+IC("compass")+'<div>'+L("Trenger du å friske opp fasilitering, SPGR eller endringsledelse? Se <b>Fasilitatorpakken</b>.","Need to refresh facilitation, SPGR or change leadership? See the <b>Facilitator pack</b>.")+'</div></div>';
  return h;
}

/* pedagogical-format banner — makes the varied working method explicit */
function formatBanner(p,s){
  return '<div class="fmtbanner reveal" style="--ac:'+s.accent+'">'+
    '<div class="fmt-tag">'+IC("spark")+L("Arbeidsform denne sesjonen ","Working method this session ")+'<span class="fmt-vary">'+L("– bevisst forskjellig fra de andre","— deliberately different from the others")+'</span></div>'+
    '<div class="fmt-why">'+p.why+'</div>'+
    '<div class="fmt-cols">'+
      '<div class="fmt-c"><div class="fmt-ph">'+IC("group")+L("Trening · 60 min","Practice · 60 min")+'</div><h4>'+p.format.w1.name+'</h4><p>'+p.format.w1.ped+'</p></div>'+
      '<div class="fmt-c"><div class="fmt-ph">'+IC("chat")+L("Refleksjon · 60 min","Reflection · 60 min")+'</div><h4>'+p.format.w2.name+'</h4><p>'+p.format.w2.ped+'</p></div>'+
    '</div></div>';
}

/* ============================ OPPGAVER ============================ */
function taskFlow(s,isM){
  const chips=s.oppgaver.map((o,i)=>{
    const lbl=o.tool?o.tool.title:typeLbl(o.type);
    const carry=(o.tool&&(o.tool.fromBoard||o.tool.fromGoals))?'<span class="tf-carry">'+IC("link")+L("henter fra tidligere","pulls earlier work")+'</span>':'';
    return '<div class="tf-step"><span class="tf-n" style="background:'+s.color+'">'+o.n+'</span><span class="tf-l">'+lbl+'</span>'+carry+'</div>'+(i<s.oppgaver.length-1?'<span class="tf-arr">\u2192</span>':'');
  }).join("");
  return '<div class="taskflow reveal"><div class="tf-h">'+IC("route")+'<b>'+L("Flyt i økten","Flow of the session")+'</b><span class="tf-sub">'+L("Oppgavene bygger på hverandre – svar føres videre der pilene viser","The tasks build on each other — answers carry forward where the links show")+'</span></div><div class="tf-row">'+chips+'</div></div>';
}
function oppgaverView(){
  const s=SESS.find(x=>x.no===SUB);
  const isM=ROLE==="mentor";
  let h='<div class="eyebrow">'+IC("list")+' '+L("Oppgaver & verktøy","Tasks & tools")+'</div><h1>'+L("Oppgaver per sesjon","Tasks per session")+'</h1>';
  h+=roleBar();
  h+='<p class="lead">'+(isM?L("Oppgavene arbeidsgruppene løser – med eksempelsvar, fasiliteringstips og de samme kjørbare tavlene som studentene ser. Velg sesjon:","The tasks the work groups solve — with sample answers, facilitation tips and the same runnable boards the students see. Choose a session:"):L("Arbeidsarket dere løser oppgavene på. Slik gjør dere: <b>1)</b> velg konteksten deres øverst, <b>2)</b> løs hver oppgave på tavla rett under den, <b>3)</b> oppsummer svaret i feltet. Alt lagres automatisk for gruppa. Velg sesjon:","The worksheet you solve the tasks on. Here's how: <b>1)</b> choose your context at the top, <b>2)</b> solve each task on the board right below it, <b>3)</b> summarize your answer in the field. Everything saves automatically for the group. Choose a session:"))+'</p>';
  h+=subnav();
  h+='<div class="goal reveal" style="background:'+s.color+'"><span class="gi">'+IC("target")+'</span><div><div class="gl">'+L("Sesjon ","Session ")+s.no+' · '+s.tema+'</div><p>'+s.goal+'</p></div></div>';
  const pf=PED[s.no];
  if(pf)h+='<div class="fmtchip reveal" style="--ac:'+s.accent+'">'+IC("spark")+'<span><b>'+L("Arbeidsform:","Working method:")+'</b> '+pf.format.w1.name+L(" (trening) → "," (practice) → ")+pf.format.w2.name+L(" (refleksjon)"," (reflection)")+'</span>'+(isM?'<button class="fmtchip-link" onclick="go(\'kjoreplan\')">'+L("Se kjøreplan ›","See run-of-show ›")+'</button>':'')+'</div>';
  h+=ctxBar();
  h+=taskFlow(s,isM);
  h+='<div class="wsh">'+IC("task")+L("Workshop 1 · Trening","Workshop 1 · Practice")+' <span class="wsh-sub">'+L("· 60 min · arbeidsgruppe á 5","· 60 min · work group of 5")+(pf?' · '+pf.format.w1.name:'')+'</span></div>';
  s.oppgaver.forEach(o=>{
    h+='<div class="opg reveal"><div class="oh"><div class="on" style="background:'+s.color+'">'+o.n+'</div><div style="flex:1">'+ctxChip()+'<div class="otype '+(o.type||"analyse")+'">'+typeLbl(o.type)+'</div><div class="oq">'+o.q+'</div></div></div>';
    if(o.how)h+='<div class="how"><b>'+L("Slik jobber dere:","How you work:")+'</b> '+o.how+'</div>';
    if(o.tool)h+=toolHTML(o,s);
    if(isM)h+='<div class="svar"><div class="sl">'+IC("bulb")+L("Eksempelsvar / fasilitatornotat","Sample answer / facilitator note")+'</div>'+(o.svar.length>1?'<ul>'+o.svar.map(x=>'<li>'+x+'</li>').join("")+'</ul>':'<p>'+o.svar[0]+'</p>')+'</div>';
    else h+='<div class="afield"><div class="al">'+IC("clip")+L("Deres svar (oppsummer det dere kom fram til)","Your answer (summarize what you concluded)")+'</div><textarea data-ans="s'+s.no+'-o'+o.n+'" placeholder="'+L("Skriv kort oppsummering her – tavla over er arbeidsflaten …","Write a short summary here — the board above is your workspace …")+'"></textarea></div>';
    h+='</div>';
  });
  h+='<div class="awareness awareness-big" style="border-left-color:'+s.accent+'"><b style="color:'+s.accent+'">'+(isM?L("Awareness studentene skal sitte igjen med:","The awareness students should leave with:"):L("Dette skal dere sitte igjen med:","This is what you should leave with:"))+'</b> '+s.awareness+
    (isM?"":'<div class="awctrl"><button class="awbtn'+(G().done&&G().done[s.no]?" on":"")+'" onclick="toggleDone('+s.no+')">'+IC("check")+'<span>'+(G().done&&G().done[s.no]?L("Awareness nådd ✓","Awareness reached ✓"):L("Marker awareness som nådd","Mark awareness as reached"))+'</span></button></div>')+'</div>';
  h+='<div class="wsh">'+IC("chat")+L("Workshop 2 · Refleksjon","Workshop 2 · Reflection")+' <span class="wsh-sub">'+L("· 60 min · mentorteam","· 60 min · mentor team")+(pf?' · '+pf.format.w2.name:'')+'</span></div>';
  if(isM){
    h+=block(s.color,"chat",L("Presentasjon og refleksjon med mentor","Presentation and reflection with mentor"),L("Mentorteamet (4 grupper)","The mentor team (4 groups)"),L("30 min","30 min"),
      '<h5>'+IC("group")+L("Deling","Sharing")+'</h5><p>'+L("Hver gruppe deler leveransen (2–3 min). Gruppene har jobbet med ulike kontekster – det er selve poenget.","Each group shares its deliverable (2–3 min). The groups worked with different contexts — that's the whole point.")+'</p>'+
      '<h5>'+IC("link")+L("Refleksjonsspørsmål","Reflection questions")+'</h5><ul>'+s.reflect.map(x=>'<li class="q">'+x+'</li>').join("")+'</ul>'+
      '<h5>'+IC("flag")+L("Mentor sikrer at dette tas opp","The mentor makes sure this is raised")+'</h5><ul>'+s.facilitate.map(x=>'<li class="chk">'+x+'</li>').join("")+'</ul>'+
      '<div class="awareness">'+L("Avsluttes med <b>Pluss/Delta</b> og <b>Key takeaways</b> i mentorgruppen, før plenumsdeling på tvers av alle mentorteam. Hent fram gruppenes arbeid under <b>Samling</b>.","Ends with <b>Plus/Delta</b> and <b>key takeaways</b> in the mentor group, before the plenary share across all mentor teams. Pull up the groups' work under <b>Collect</b>.")+'</div>');
  }else{
    h+='<div class="block reveal"><div class="bh"><div class="bi" style="background:'+s.color+'">'+IC("chat")+'</div><div><div class="phase-lbl">'+L("Hele mentorteamet · 30 min","The full mentor team · 30 min")+'</div><h3>'+L("Presentasjon og refleksjon med mentor","Presentation and reflection with mentor")+'</h3></div></div><div class="bb">'+
      '<h5>'+IC("group")+L("Slik foregår det","How it works")+'</h5><p>'+L("Hver gruppe presenterer leveransen sin (2–3 min). Dere har jobbet med ulike kontekster – lytt etter hva som er likt og ulikt.","Each group presents its deliverable (2–3 min). You've worked with different contexts — listen for what's alike and what differs.")+'</p>'+
      '<h5>'+IC("link")+L("Skriv ned refleksjonene deres","Write down your reflections")+'</h5>'+
      s.reflect.map((x,i)=>'<div class="afield"><div class="al">'+IC("chat")+x+'</div><textarea data-ans="s'+s.no+'-r'+i+'" placeholder="'+L("Deres refleksjon …","Your reflection …")+'"></textarea></div>').join("")+
      '<div class="awareness">'+L("Økten avsluttes med <b>Pluss/Delta</b> og <b>Key takeaways</b>, før felles plenumsdeling. Del arbeidet deres under <b>Samling</b>.","The session ends with <b>Plus/Delta</b> and <b>key takeaways</b>, before the shared plenary. Share your work under <b>Collect</b>.")+'</div></div></div>';
  }
  h+='<div class="takeaway reveal"><span class="ti">'+IC("star")+'</span><div><div class="tl">'+L("Key takeaway","Key takeaway")+'</div><p>'+s.takeaway+'</p></div></div>';
  if(isM)h+='<div class="link-fk">'+IC("route")+'<div>'+L("Hvordan kjøre dette steg for steg? Se <b>Kjøreplan</b> for sesjon ","How to run this step by step? See the <b>Run-of-show</b> for session ")+s.no+'.</div></div>';
  return h;
}

/* ============================ KONTEKSTER ============================ */
function kontekstView(){
  let h='<div class="eyebrow">'+IC("building")+' '+L("Kontekster","Contexts")+'</div><h1>'+L("Velg en situasjon å jobbe med","Choose a situation to work with")+'</h1>';
  h+='<p class="lead">'+L("Hver arbeidsgruppe velger én typisk, utfordrende situasjon fra lista – innen bygg, anlegg, infrastruktur eller industri. Finner dere ikke noe som passer, lar dere én i gruppa fortelle om en reell case fra eget prosjekt. <b>Samme kontekst følger dere gjennom alle seks sesjonene</b>, akkurat som et ekte prosjekt.","Each work group picks one typical, challenging situation from the list — in building, civil, infrastructure or industry. If nothing fits, let someone in the group describe a real case from their own project. <b>The same context follows you through all six sessions</b>, just like a real project.")+'</p>';
  h+='<div class="methodgrid reveal">'+
     mini("building",L("Én kontekst per gruppe – hele uka","One context per group — all week"),L("Gruppa velger konteksten i VDC Intro, og den fylles automatisk inn på hver sesjon. Slik bygger arbeidet seg opp som i et ekte prosjekt: mål → målinger → beslutninger → prosess → flyt → informasjon.","The group picks the context in VDC Intro, and it fills in automatically on every session. The work builds up like a real project: objectives → metrics → decisions → process → flow → information."))+
     mini("users",L("Ulike kontekster i samme team – det er meningen","Different contexts in the same team — that's the point"),L("De fire gruppene i et mentorteam jobber med hver sin kontekst. I refleksjonen (Workshop 2) ser dere at de samme VDC-prinsippene gjelder på tvers av svært ulike prosjekter – det er selve læringen.","The four groups in a mentor team each work with a different context. In the reflection (Workshop 2) you see the same VDC principles hold across very different projects — that's the real learning."))+
     mini("spark",L("Varierte arbeidsformer","Varied working methods"),L("Hver sesjon bruker en bevisst forskjellig metode – 1→2→4→Alle, gallery walk, rolle-simulering, speed-kritikk, spill og World Café – for å treffe flere læringsstiler og holde energien oppe.","Each session uses a deliberately different method — 1→2→4→All, gallery walk, role simulation, speed critique, games and World Café — to reach more learning styles and keep the energy up."))+
     '</div>';
  h+='<div class="kgrid reveal">';
  KONTEKST.forEach(k=>{h+='<div class="kcard"><div class="ktags"><span class="ktag">'+k.sektor+'</span><span class="ktag fase">'+k.fase+'</span></div><h4>'+k.t+'</h4><p>'+k.s+'</p><div class="chall">'+IC("flag")+' '+k.c+'</div></div>';});
  h+='<div class="kcard own"><div class="ktags"><span class="ktag" style="background:var(--cardinal-soft);color:var(--cardinal)">'+L("Egen case","Own case")+'</span></div><h4>'+L("Egen situasjon fra arbeidsgruppa","Your own situation from the group")+'</h4><p>'+L("Finner dere ikke en passende kontekst? La én i gruppa fortelle om en reell, utfordrende situasjon fra eget prosjekt – og bruk den gjennom sesjonene.","Can't find a context that fits? Let someone in the group describe a real, challenging situation from their own project — and use it through the sessions.")+'</p><div class="chall" style="background:var(--cardinal-soft);color:var(--cardinal-dark)">'+IC("group")+' '+L("Velg noe konkret nok til at dere kan sette mål, måle og finne tiltak.","Pick something concrete enough to set objectives, measure and find actions.")+'</div></div>';
  h+='</div>';
  h+='<div class="link-fk" style="margin-top:22px">'+IC("list")+'<div>'+L("Når konteksten er valgt: gå til <b>Oppgaver</b> og jobb dere gjennom sesjonens oppgaver med den valgte situasjonen som utgangspunkt.","Once the context is chosen: go to <b>Tasks</b> and work through the session's tasks with the chosen situation as your starting point.")+'</div></div>';
  return h;
}
