/* ============================================================
   VIEWS 2 — facilitator package, implementation, samling (bilingual)
   ============================================================ */

function fasilitator(){
  const C="#8C1515";
  let h='<div class="eyebrow">'+IC("compass")+' '+L("For mentorene","For the mentors")+'</div><h1>'+L("Fasilitatorpakke","Facilitator pack")+'</h1>';
  h+='<p class="lead">'+L("Et reelt verktøy for å komme best mulig forberedt til introuka – og en oversikt over hele mentorlæringen. Du har to oppgaver: hjelpe studentene å lære, og lede VDC inn i egne prosjekter.","A real tool for arriving at intro week as prepared as possible — and an overview of the whole mentor learning track. You have two jobs: help the students learn, and lead VDC into your own projects.")+'</p>';
  h+=sec2("route",L("Helheten","The whole"),L("Mentorens læringsreise","The mentor's learning journey"),
    L("Mentorrollen din vokser i tre arenaer samtidig. Erfaringsrapporten (BM6101) ber deg reflektere over læring fra alle tre.","Your mentor role grows in three arenas at once. The experience report (BM6101) asks you to reflect on learning from all three."),
    '<div class="journey">'+
      '<div class="jstep"><div class="jn" style="background:var(--ntnu)">1</div><h4>'+L("Fra VDC-opplæringen","From the VDC training")+'</h4><p>'+L("Du kjenner elementene – men «det er i kombinasjonen magien skjer». Repeter helheten, ikke bare delene.","You know the elements — but “the magic happens in the combination.” Review the whole, not just the parts.")+'</p></div>'+
      '<div class="jstep"><div class="jn" style="background:var(--cardinal)">2</div><h4>'+L("Fra veiledning av studenter","From mentoring students")+'</h4><p>'+L("Å multiplisere egen læring er vanskeligere enn å lære selv. Det krever gjensidig tillit for å bygge innflytelse.","Multiplying your own learning is harder than learning yourself. It takes mutual trust to build influence.")+'</p></div>'+
      '<div class="jstep"><div class="jn" style="background:var(--green)">3</div><h4>'+L("Fra bruk i eget prosjekt","From use in your own project")+'</h4><p>'+L("Tydelige CO/PO skaper enhet; BIM + ICE gir raskere beslutninger. Det du lærer her, tar du med til studentene.","Clear CO/PO create unity; BIM + ICE give faster decisions. What you learn here, you bring to the students.")+'</p></div>'+
    '</div>');
  h+=sec2("bulb",L("Fra mentorer som har gått løpet","From mentors who've done it"),L("Praktiske grep og erfaringer","Practical moves and experiences"),
    L("Sitater og innsikt fra tidligere mentorers erfaringsrapporter (BM6101). Bruk dem som påminnelser når du veileder.","Quotes and insights from previous mentors' experience reports (BM6101). Use them as reminders when you mentor."),
    '<div class="cardgrid">'+
      mini("spark",L("«I kombinasjonen skjer magien»","“The magic is in the combination”"),L("Enkeltelementene gir verdi hver for seg, men sammen forsterker de hverandre, skaper felles forståelse og øker eierskap. Repeter helheten, ikke bare delene.","Each element adds value on its own, but together they reinforce each other, build shared understanding and grow ownership. Review the whole, not just the parts."))+
      mini("group",L("Å lære bort er vanskeligere enn å lære","Teaching is harder than learning"),L("«Å multiplisere egen læring er langt verre enn å innta lærdom selv.» Det krever gjensidig tillit å bygge innflytelse – invester i relasjonen først.","“Multiplying your own learning is far harder than absorbing it yourself.” Building influence takes mutual trust — invest in the relationship first."))+
      mini("target",L("Tydelige CO/PO skaper enhet","Clear CO/PO create unity"),L("Godt kommuniserte mål ga klarhet og samlet kunde, byggeledelse og utførende. Bruk mye tid på å gjøre målene tydelige tidlig.","Well-communicated objectives gave clarity and united client, construction management and trades. Spend real time making the objectives clear early."))+
      mini("eye",L("Synergiene i praksis","The synergies in practice"),L("BIM + ICE → raskere og bedre beslutninger. 4D + ICE → visualisering ga færre misforståelser. 5D + BIM → endringer ga direkte utslag i kost og tid. Alt i skyen → sømløs informasjonsflyt.","BIM + ICE → faster, better decisions. 4D + ICE → visualization cut misunderstandings. 5D + BIM → changes showed directly in cost and time. Everything in the cloud → seamless information flow."))+
      mini("book",L("Repetisjon gjør deg trygg","Repetition makes you confident"),L("Faglig repetisjon av eksempler og innhold var en stor bidragsyter for å lykkes som mentor. Kjenn eksemplene (Aurora, Heathrow, FREYR) godt nok til å bruke dem fritt.","Reviewing the examples and content was a big factor in succeeding as a mentor. Know the examples (Aurora, Heathrow, FREYR) well enough to use them freely."))+
      mini("grow",L("Reflekter sammen med studentene","Reflect together with the students"),L("Studentene har sprikende forståelse – juster og utfordre tankesett sammen med dem, og les oppgavene deres som en kilde til egen læring.","Students arrive with mixed understanding — adjust and challenge mindsets together with them, and read their work as a source for your own learning."))+
    '</div>');
  h+=sec2("clip",L("Før introuka","Before intro week"),L("Forbered deg","Prepare yourself"),L("Gjør dette i god tid før mandag – mye av kvaliteten avgjøres av forarbeidet.","Do this well before Monday — much of the quality is decided by the prep."),
    block(C,"clip","",L("Sjekkliste","Checklist"),"",
      '<ul>'+[
        L("Gjennomfør forkurset og mentor-modulene (BM6101) selv.","Complete the pre-course and the mentor modules (BM6101) yourself."),
        L("Les kartleggingen av dine egne studenter i admin-dashbordet: hvor står gruppen, og hva er svakeste område?","Read the assessment of your own students in the admin dashboard: where does the group stand, and what's the weakest area?"),
        L("Bli kjent med de fire arbeidsgruppene og hvilke prosjekter studentene kommer fra.","Get to know the four work groups and the projects the students come from."),
        L("Kjør en SPGR-kartlegging av mentorteamet for å forstå dynamikken.","Run an SPGR assessment of the mentor team to understand the dynamics."),
        L("Repeter de seks sesjonenes læringsmål og oppgaver; ha kontekster og maler klare.","Review the six sessions' goals and tasks; have contexts and templates ready."),
        L("Avklar rollefordeling hvis dere er flere mentorer.","Sort out role-sharing if there are several mentors."),
        L("Velg ditt eget prosjekt for implementeringsfasen – du jobber på to fronter.","Pick your own project for the implementation phase — you work on two fronts.")
      ].map(x=>'<li class="chk">'+x+'</li>').join("")+'</ul>'));
  const fns=[
    {c:"#00509E",ic:"target",h:L("Kontroll","Control"),p:L("Struktur, mål og styring. For mye: rigid og lite kreativ.","Structure, goals and steering. Too much: rigid and uncreative.")},
    {c:"#2e7d57",ic:"hand",h:L("Omsorg (Nurture)","Nurture"),p:L("Relasjon, støtte og kreativitet. For lite: kald og utrygg gruppe.","Relationship, support and creativity. Too little: a cold, unsafe group.")},
    {c:"#B1040E",ic:"spark",h:L("Opposisjon","Opposition"),p:L("Kritikk og nytenkning. Krever psykologisk trygghet for å komme fram.","Critique and new thinking. Needs psychological safety to surface.")},
    {c:"#a86410",ic:"shield",h:L("Avhengighet","Dependence"),p:L("Lojalitet og aksept. For mye: ingen tør å si imot.","Loyalty and acceptance. Too much: no one dares to push back.")}
  ];
  h+=sec2("balance",L("Teamverktøy","Team tool"),L("SPGR – les teamet ditt","SPGR – read your team"),
    L("SPGR (Systematizing Person-Group Relations), utviklet av Endre Sjøvold ved NTNU, kartlegger gruppedynamikk. De fire funksjonene må være i balanse for at teamet skal nå sitt potensial; målet er gruppemodenhet – at teamet kan veksle mellom funksjonene.","SPGR (Systematizing Person-Group Relations), developed by Endre Sjøvold at NTNU, maps group dynamics. The four functions must be in balance for the team to reach its potential; the goal is group maturity — being able to shift between the functions."),
    '<div class="spgr">'+fns.map(f=>'<div class="fn" style="background:'+f.c+'"><div class="fh">'+IC(f.ic)+f.h+'</div><p>'+f.p+'</p></div>').join("")+'</div>'+
    block(C,"compass","",L("Bruk linsen i introuka","Use the lens during intro week"),"",
      '<ul>'+[
        L("Mangler Opposisjon? Be eksplisitt om motforestillinger, og gjør det trygt.","Missing Opposition? Explicitly invite objections, and make it safe."),
        L("For mye Kontroll? Gi de stille ordet, åpne for kreativitet (Omsorg).","Too much Control? Give the quiet ones the floor, open up creativity (Nurture)."),
        L("For mye Avhengighet? Sett to grupper opp mot hverandre.","Too much Dependence? Set two groups up against each other."),
        L("Lav energi? Styrk Omsorg – anerkjenn bidrag før du presser på oppgaven.","Low energy? Strengthen Nurture — acknowledge contributions before pressing on the task.")
      ].map(x=>'<li>'+x+'</li>').join("")+'</ul>'+
      '<div class="srcnote">'+L("Kilde: Sjøvold, E. (2007), «Systematizing Person-Group Relations (SPGR)», Small Group Research. Brukes i NTNUs VDC-lederopplæring (BM6101).","Source: Sjøvold, E. (2007), “Systematizing Person-Group Relations (SPGR)”, Small Group Research. Used in NTNU's VDC leadership training (BM6101).")+'</div>'));
  h+=sec2("rocket",L("Ledelse","Leadership"),L("Endringsledelse og teamutvikling","Change leadership and team development"),L("Du er endringsleder og teamutvikler denne uka – det avgjør hvor mye læring som sitter.","You're a change leader and team developer this week — that decides how much of the learning sticks."),
    '<div class="cardgrid">'+
      mini("grow",L("Du er endringsleder","You're a change leader"),L("Lippitt-Knoster: sørg for visjon, ferdigheter, insentiver, ressurser og plan. Mangler én, får du et bestemt symptom.","Lippitt-Knoster: ensure vision, skills, incentives, resources and a plan. Miss one, and you get a specific symptom."))+
      mini("shield",L("Psykologisk trygghet","Psychological safety"),L("Vis sårbarhet, belønn at problemer kommer fram, skill sak fra person. Forutsetningen for ekte refleksjon.","Show vulnerability, reward problems coming to light, separate issue from person. The precondition for real reflection."))+
      mini("spark",L("Kaossonen","The chaos zone"),L("«Læring skal smerte litt.» Hold gruppen trygt gjennom usikkerheten til ny innsikt.","“Learning should hurt a little.” Hold the group safely through the uncertainty toward new insight."))+
      mini("chat",L("Utviklingssamtale","Development conversation"),L("Vurdering er en samtale om vei videre, ikke en karakter. Spør før du svarer.","Assessment is a conversation about the way forward, not a grade. Ask before you answer."))+
    '</div>');
  h+=sec2("book",L("Etter uka","After the week"),L("Din erfaringsrapport – hva har du forbedret og lært?","Your experience report — what have you improved and learned?"),
    L("Mentorlæringen avsluttes med en egen refleksjon (BM6101). Bruk den samme linsen på deg selv som du bruker på studentene.","The mentor learning ends with your own reflection (BM6101). Use the same lens on yourself that you use on the students."),
    '<div class="cardgrid">'+
      mini("bulb",L("Faglig læring","Professional learning"),L("Hva forsto du dypere om VDC – særlig om hvordan elementene forsterker hverandre i kombinasjon?","What did you understand more deeply about VDC — especially how the elements reinforce each other in combination?"))+
      mini("group",L("Personlig læring","Personal learning"),L("Hva lærte du om å veilede, bygge tillit og multiplisere egen kunnskap til andre?","What did you learn about mentoring, building trust and multiplying your knowledge to others?"))+
      mini("task",L("Kontrollerbare faktorer","Controllable factors"),L("«Ting» du selv kan gjøre i egen virksomhet – konkrete tiltak du styrer.","“Things” you can do yourself in your own organization — concrete actions you control."))+
      mini("hand",L("Påvirkbare faktorer","Influenceable factors"),L("«Ting» du kan få andre til å gjøre – der du må påvirke og lede endring.","“Things” you can get others to do — where you must influence and lead change."))+
    '</div>'+
    '<div class="link-fk">'+IC("star")+'<div>'+L("<b>Egenvurdering (maks tre punkter):</b> Hva var mest nyttig for deg? Hva var mest nyttig for din virksomhet? Pluss/Delta av hele opplegget.","<b>Self-assessment (max three points):</b> What was most useful for you? What was most useful for your organization? Plus/Delta of the whole program.")+'</div></div>');
  h+=sec2("hand",L("Hver dag","Every day"),L("Fasiliteringsprinsipper","Facilitation principles"),L("Fem prinsipper å ha med inn i hver sesjon.","Five principles to bring into every session."),
    block(C,"hand","",L("Mentorens fem","The mentor's five"),"",
      '<ul>'+[
        L("Spør før du svarer – åpne spørsmål gir dypere læring.","Ask before you answer — open questions give deeper learning."),
        L("Tidsstyr hardt, og park det som ikke kan løses nå.","Time-manage hard, and park what can't be solved now."),
        L("Gi de stilleste stemme – de sitter ofte med nøkkelinformasjonen.","Give the quietest a voice — they often hold the key information."),
        L("Koble alltid tilbake til studentenes egne prosjekter.","Always connect back to the students' own projects."),
        L("Vær rollemodell: studentene kopierer det du gjør, ikke det du sier.","Be a role model: students copy what you do, not what you say.")
      ].map(x=>'<li class="chk">'+x+'</li>').join("")+'</ul>'));
  h+='<div class="link-fk">'+IC("route")+'<div>'+L("Sesjonsspesifikke fasilitatortips ligger i <b>Kjøreplan</b> under hver sesjons «Mentor i Workshop 1 / 2».","Session-specific facilitator tips are in the <b>Run-of-show</b> under each session's “Mentor in Workshop 1 / 2.”")+'</div></div>';
  return h;
}

function implementering(){
  const C="#00509E";
  let h='<div class="eyebrow">'+IC("rocket")+' '+L("Neste fase","Next phase")+'</div><h1>'+L("Implementeringsfasen","The implementation phase")+'</h1>';
  h+='<p class="lead">'+L("Introuka var trening. Nå skal studentene og mentorene sette det de har lært ut i virkelige prosjekter – det mest spennende og mest krevende steget.","Intro week was practice. Now the students and mentors put what they've learned into real projects — the most exciting and most demanding step.")+'</p>';
  h+=sec2("route",L("Veien videre","The way forward"),L("Fra introuka til effekt","From intro week to impact"),L("Implementeringsfasen er broa mellom læring og resultat.","The implementation phase is the bridge between learning and results."),
    '<div class="route"><span class="rstep">'+L("Introuka","Intro week")+'</span><span class="rarr">→</span><span class="rstep now">'+L("Implementering i eget prosjekt","Implementation in your own project")+'</span><span class="rarr">→</span><span class="rstep">'+L("Midtveissamling 1 & 2","Midway gathering 1 & 2")+'</span><span class="rarr">→</span><span class="rstep">'+L("IE-samling","IE gathering")+'</span></div>');
  h+=block(C,"present",L("Torsdag 06.08 · avslutning","Thursday Aug 6 · closing"),L("Martin Fischer introduserer implementeringsfasen","Martin Fischer introduces the implementation phase"),L("plenum","plenary"),
    '<h5>'+IC("bulb")+L("Dette skal studentene forstå","What the students should understand")+'</h5><ul>'+[
      L("Introuka ga forståelse og trening – nå handler det om å anvende og endre i et ekte prosjekt.","Intro week gave understanding and practice — now it's about applying and changing in a real project."),
      L("Implementering er et eget fag: det skjer ikke av seg selv fordi man forstår VDC.","Implementation is a discipline of its own: it doesn't happen by itself just because you understand VDC."),
      L("Det vil møte motstand, kultur og virkelighet – og det er normalt.","It will meet resistance, culture and reality — and that's normal."),
      L("Velg ett avgrenset, realistisk første steg (en tidlig seier) framfor å endre alt.","Pick one bounded, realistic first step (an early win) rather than changing everything.")
    ].map(x=>'<li>'+x+'</li>').join("")+'</ul>'+
    '<div class="awareness">'+L("Overgangen: fra «jeg forstår VDC» til «jeg leder VDC inn i prosjektet mitt».","The shift: from “I understand VDC” to “I lead VDC into my project.”")+'</div>');
  h+=block(C,"clip",L("Fredag 07.08 · 09–12","Friday Aug 7 · 09:00–12:00"),L("Implementeringsplanen","The implementation plan"),L("grupper og individuelt","groups and individual"),
    '<p>'+L("Plenum med Fischer, så jobber hver student/gruppe med en plan for et eget, reelt prosjekt (bygger på malen Implementation Plan VDC og BM6101).","Plenary with Fischer, then each student/group works on a plan for their own real project (built on the Implementation Plan VDC template and BM6101).")+'</p>'+
    '<h5>'+IC("task")+L("Hva planen skal inneholde","What the plan should contain")+'</h5><ul>'+[
      L("<b>Nullpunkt:</b> hvor står prosjektet i dag?","<b>Baseline:</b> where does the project stand today?"),
      L("<b>Ønsket effekt/gevinst:</b> formulert som målbare mål (Metrics).","<b>Desired impact/benefit:</b> stated as measurable objectives (Metrics)."),
      L("<b>Hvilke VDC-elementer</b> innføres først, og hvorfor.","<b>Which VDC elements</b> go in first, and why."),
      L("<b>Hvem og når:</b> roller, ansvar og realistisk tidslinje.","<b>Who and when:</b> roles, responsibilities and a realistic timeline."),
      L("<b>Hindringer:</b> bruk Lippitt-Knoster.","<b>Obstacles:</b> use Lippitt-Knoster."),
      L("<b>Måling:</b> hvordan vise oppnådd effekt (gevinstrealisering).","<b>Measurement:</b> how to show the impact achieved (benefits realization).")
    ].map(x=>'<li>'+x+'</li>').join("")+'</ul>'+
    '<h5>'+IC("spark")+L("Det utfordrende – og spennende","The challenging — and exciting")+'</h5><ul>'+[
      L("Å gå fra et trygt kursmiljø til et prosjekt med ekte motstand.","Going from a safe course setting to a project with real resistance."),
      L("Å velge ETT realistisk første steg.","Choosing ONE realistic first step."),
      L("Å sikre lederforankring.","Securing leadership buy-in."),
      L("Å holde praksisen i live når hverdagen melder seg.","Keeping the practice alive when everyday work takes over.")
    ].map(x=>'<li class="q">'+x+'</li>').join("")+'</ul>');
  h+=sec2("compass",L("Mentorens rolle","The mentor's role"),L("Slik veileder du implementeringen","How you guide the implementation"),L("Her blir din egen erfaring fra eget prosjekt gull verdt.","Here your own experience from your own project is worth its weight in gold."),
    '<div class="cardgrid">'+
      mini("target",L("Utfordre på realisme","Challenge on realism"),L("Hjelp studenten å avgrense: ett prosjekt, ett tydelig første steg, målbar effekt.","Help the student narrow down: one project, one clear first step, measurable impact."))+
      mini("balance",L("Les motstanden","Read the resistance"),L("Bruk SPGR og endringsledelse til å forstå hvor motstanden sitter, og møt den med involvering.","Use SPGR and change leadership to understand where the resistance sits, and meet it with involvement."))+
      mini("grow",L("Koble til gevinst","Connect to benefit"),L("Knytt planen til nullpunkt og målbar effekt, så den kan forsvares og spres.","Tie the plan to a baseline and measurable impact, so it can be defended and spread."))+
      mini("chat",L("Avtal oppfølging","Agree on follow-up"),L("Sett konkrete sjekkpunkter fram mot midtveissamlingene.","Set concrete checkpoints leading up to the midway gatherings."))+
    '</div>');
  h+='<div class="takeaway reveal" style="margin-top:24px"><span class="ti">'+IC("rocket")+'</span><div><div class="tl">'+L("Målet med implementeringsfasen","The goal of the implementation phase")+'</div><p>'+L("At hver student forlater introuka med en konkret, realistisk plan for å skape målbar effekt med VDC – og en mentor som følger dem videre.","That each student leaves intro week with a concrete, realistic plan to create measurable impact with VDC — and a mentor who follows them onward.")+'</p></div></div>';
  return h;
}

/* ============================ SAMLING ============================ */
function samling(){
  let h='<div class="eyebrow">'+IC("share")+' '+L("Samling & deling","Collect & share")+'</div><h1>'+L("Samle og del gruppenes arbeid","Collect and share the groups' work")+'</h1>';
  h+='<p class="lead">'+L("Alt arbeidsgruppene lager lagres lokalt per gruppe. Her bytter dere mellom grupper, samler arbeidet til delingen i Workshop 2, deler mellom enheter med en kode, og eksporterer til PDF eller bilde for plenum.","Everything the work groups make is saved locally per group. Here you switch between groups, collect the work for the Workshop 2 share, share between devices with a code, and export to PDF or image for plenary.")+'</p>';

  // group manager
  const ids=Object.keys(STORE.groups);
  h+='<div class="block reveal"><div class="bh"><div class="bi" style="background:var(--ntnu)">'+IC("users")+'</div><div><div class="phase-lbl">'+L("Grupper på denne enheten","Groups on this device")+'</div><h3>'+L("Aktiv gruppe","Active group")+'</h3></div></div><div class="bb">'+
    '<div class="grouprow">'+ids.map(id=>{const m=STORE.groups[id].meta||{};const nm=(m.team?m.team+" · ":"")+L("Gruppe ","Group ")+(m.num||"?");return '<button class="gchip'+(id===STORE.active?" on":"")+'" onclick="switchGroup(\''+id+'\')">'+IC("group")+nm+'</button>';}).join("")+
    '<button class="gchip add" onclick="addGroup()">'+IC("plus")+L("Ny gruppe","New group")+'</button></div>'+
    '<div class="metaedit">'+
      '<label>'+L("Mentorteam","Mentor team")+' <input id="mTeam" placeholder="'+L("f.eks. Team Blå","e.g. Team Blue")+'" value="'+esc((G().meta.team||""))+'"></label>'+
      '<label>'+L("Gruppenr.","Group no.")+' <input id="mNum" type="number" min="1" max="8" value="'+esc((G().meta.num||1))+'" style="width:72px"></label>'+
      '<button class="bbtn ghost" onclick="renameActive()">'+IC("check")+L("Lagre","Save")+'</button>'+
    '</div></div></div>';

  // collection per session
  h+='<div class="block reveal"><div class="bh"><div class="bi" style="background:var(--cardinal)">'+IC("chat")+'</div><div><div class="phase-lbl">'+L("Til Workshop 2 · deling på tvers","For Workshop 2 · sharing across groups")+'</div><h3>'+L("Gruppenes leveranser","The groups' deliverables")+'</h3></div>'+
    '<button class="bbtn" style="margin-left:auto" onclick="window.print()">'+IC("print")+L("Skriv ut / PDF","Print / PDF")+'</button></div><div class="bb">'+
    '<div class="subnav">'+SESS.map(s=>'<button class="spill'+(SUB===s.no?" on":"")+'" onclick="setSub('+s.no+')" style="'+(SUB===s.no?'background:'+s.accent:'')+'"><span class="d" style="background:'+s.accent+'"></span>'+s.no+'</button>').join("")+'</div>'+
    collectGrid()+'</div></div>';

  // share between devices
  h+='<div class="block reveal"><div class="bh"><div class="bi" style="background:var(--green)">'+IC("share")+'</div><div><div class="phase-lbl">'+L("Deling mellom enheter","Sharing between devices")+'</div><h3>'+L("Del og hent inn arbeid","Share and import work")+'</h3></div></div><div class="bb">'+
    '<p>'+L("Jobber gruppene på hver sin laptop? Eksportér gruppas arbeid som en kode, send den (chat/e-post), og hent den inn på maskinen som styrer fellesskjermen før Workshop 2.","Are the groups working on separate laptops? Export a group's work as a code, send it (chat/email), and import it on the machine that runs the shared screen before Workshop 2.")+'</p>'+
    '<div class="sharegrid">'+
      '<div class="sharecol"><h5>'+IC("download")+L("Del denne gruppas arbeid","Share this group's work")+'</h5><button class="bbtn" onclick="makeShare()">'+IC("share")+L("Lag delingskode","Create share code")+'</button><textarea id="shareOut" class="sharebox" readonly placeholder="'+L("Koden vises her – kopiér og send den.","The code appears here — copy and send it.")+'"></textarea><button class="bbtn ghost" onclick="copyShare()">'+L("Kopiér kode","Copy code")+'</button></div>'+
      '<div class="sharecol"><h5>'+IC("plus")+L("Hent inn arbeid fra en annen enhet","Import work from another device")+'</h5><textarea id="shareIn" class="sharebox" placeholder="'+L("Lim inn delingskoden her …","Paste the share code here …")+'"></textarea><button class="bbtn" onclick="importShare()">'+IC("check")+L("Hent inn som ny gruppe","Import as a new group")+'</button><div class="impmsg" id="impMsg"></div></div>'+
    '</div></div></div>';
  return h;
}
function collectGrid(){
  const s=SESS.find(x=>x.no===SUB);
  const ids=Object.keys(STORE.groups);
  let h='<div class="collect">';
  ids.forEach(id=>{
    const g=STORE.groups[id], m=g.meta||{};
    const ctx=(g.ctx&&g.ctx[s.no])||{};
    const ctxName=ctx.sel==="own"?(ctx.own||L("Egen case","Own case")):(ctx.sel!=null&&KONTEKST[ctx.sel]?KONTEKST[ctx.sel].t:"–");
    h+='<div class="ccard2"><div class="cc-head" style="--cc:'+s.accent+'"><b>'+(m.team?m.team+" · ":"")+L("Gruppe ","Group ")+(m.num||"?")+'</b><span class="cc-ctx">'+IC("building")+esc(ctxName)+'</span></div>';
    let any=false;
    s.oppgaver.forEach(o=>{const ans=(g.answers||{})["s"+s.no+"-o"+o.n];const bId=(o.tool&&o.tool.boardKey)?o.tool.boardKey:("s"+s.no+"-o"+o.n);const bs=(g.boards||{})[bId];const cnt=boardCount(bs);
      if((ans&&ans.trim())||cnt){any=true;h+='<div class="cc-o"><div class="cc-on">'+o.n+'</div><div class="cc-ob">'+(ans&&ans.trim()?'<div class="cc-ans">'+esc(ans)+'</div>':'')+(cnt?'<div class="cc-cnt">'+IC("note")+cnt+L(" element på "," items on ")+(o.tool?kindLabel(o.tool.k):L("tavla","the board"))+'</div>':'')+'</div></div>';}});
    if(!any)h+='<div class="cc-empty">'+L("Ingen leveranse ennå.","No deliverable yet.")+'</div>';
    h+='</div>';
  });
  return h+'</div>';
}
function boardCount(bs){if(!bs)return 0;return (bs.notes&&bs.notes.length||0)+(bs.cards&&bs.cards.length||0)+(bs.items&&bs.items.length||0)+(bs.nodes&&bs.nodes.length||0)+(bs.marks&&bs.marks.length||0)+(bs.placed&&bs.placed.length||0)+((bs.rows&&bs.rows.reduce((a,r)=>a+r.filter(c=>c&&(""+c).trim()).length,0))||0);}
