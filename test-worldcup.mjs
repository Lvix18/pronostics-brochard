/* ================================================================
   Banc de test — moteur de pronostics Coupe du Monde 2026
   Logique copiée À L'IDENTIQUE depuis index.html (lignes 159-302)
   ================================================================ */

const SCALE = { issue:1, exact:3 };

const GROUPS = {
  A:["Mexique","Afrique du Sud","Corée du Sud","Tchéquie"],
  B:["Canada","Bosnie-Herzégovine","Qatar","Suisse"],
  C:["Brésil","Maroc","Haïti","Écosse"],
  D:["États-Unis","Paraguay","Australie","Turquie"],
  E:["Allemagne","Curaçao","Côte d'Ivoire","Équateur"],
  F:["Pays-Bas","Japon","Suède","Tunisie"],
  G:["Belgique","Égypte","Iran","Nouvelle-Zélande"],
  H:["Espagne","Cap-Vert","Arabie saoudite","Uruguay"],
  I:["France","Sénégal","Irak","Norvège"],
  J:["Argentine","Algérie","Autriche","Jordanie"],
  K:["Portugal","RD Congo","Ouzbékistan","Colombie"],
  L:["Angleterre","Croatie","Ghana","Panama"]
};

const RAW = [
  ["11 juin","A","Mexique","Afrique du Sud","2026-06-11T19:00:00Z"],["11 juin","A","Corée du Sud","Tchéquie","2026-06-12T02:00:00Z"],
  ["12 juin","B","Canada","Bosnie-Herzégovine","2026-06-12T19:00:00Z"],["12 juin","D","États-Unis","Paraguay","2026-06-13T01:00:00Z"],
  ["13 juin","B","Qatar","Suisse","2026-06-13T19:00:00Z"],["13 juin","C","Brésil","Maroc","2026-06-13T22:00:00Z"],["13 juin","C","Haïti","Écosse","2026-06-14T01:00:00Z"],["13 juin","D","Australie","Turquie","2026-06-14T04:00:00Z"],
  ["14 juin","E","Allemagne","Curaçao","2026-06-14T17:00:00Z"],["14 juin","F","Pays-Bas","Japon","2026-06-14T20:00:00Z"],["14 juin","E","Côte d'Ivoire","Équateur","2026-06-14T23:00:00Z"],["14 juin","F","Suède","Tunisie","2026-06-15T02:00:00Z"],
  ["15 juin","H","Espagne","Cap-Vert","2026-06-15T16:00:00Z"],["15 juin","G","Belgique","Égypte","2026-06-15T19:00:00Z"],["15 juin","H","Arabie saoudite","Uruguay","2026-06-15T22:00:00Z"],["15 juin","G","Iran","Nouvelle-Zélande","2026-06-16T01:00:00Z"],
  ["16 juin","I","France","Sénégal","2026-06-16T19:00:00Z"],["16 juin","I","Irak","Norvège","2026-06-16T22:00:00Z"],["16 juin","J","Argentine","Algérie","2026-06-17T01:00:00Z"],["16 juin","J","Autriche","Jordanie","2026-06-17T04:00:00Z"],
  ["17 juin","K","Portugal","RD Congo","2026-06-17T17:00:00Z"],["17 juin","L","Angleterre","Croatie","2026-06-17T20:00:00Z"],["17 juin","L","Ghana","Panama","2026-06-17T23:00:00Z"],["17 juin","K","Ouzbékistan","Colombie","2026-06-18T02:00:00Z"],
  ["18 juin","A","Tchéquie","Afrique du Sud","2026-06-18T16:00:00Z"],["18 juin","B","Suisse","Bosnie-Herzégovine","2026-06-18T19:00:00Z"],["18 juin","B","Canada","Qatar","2026-06-18T22:00:00Z"],["18 juin","A","Mexique","Corée du Sud","2026-06-19T01:00:00Z"],
  ["19 juin","D","États-Unis","Australie","2026-06-19T19:00:00Z"],["19 juin","C","Écosse","Maroc","2026-06-19T22:00:00Z"],["19 juin","C","Brésil","Haïti","2026-06-20T00:30:00Z"],["19 juin","D","Turquie","Paraguay","2026-06-20T03:00:00Z"],
  ["20 juin","F","Pays-Bas","Suède","2026-06-20T17:00:00Z"],["20 juin","E","Allemagne","Côte d'Ivoire","2026-06-20T20:00:00Z"],["20 juin","E","Équateur","Curaçao","2026-06-21T00:00:00Z"],["20 juin","F","Tunisie","Japon","2026-06-21T04:00:00Z"],
  ["21 juin","H","Espagne","Arabie saoudite","2026-06-21T16:00:00Z"],["21 juin","G","Belgique","Iran","2026-06-21T19:00:00Z"],["21 juin","H","Uruguay","Cap-Vert","2026-06-21T22:00:00Z"],["21 juin","G","Nouvelle-Zélande","Égypte","2026-06-22T01:00:00Z"],
  ["22 juin","J","Argentine","Autriche","2026-06-22T17:00:00Z"],["22 juin","I","France","Irak","2026-06-22T21:00:00Z"],["22 juin","I","Norvège","Sénégal","2026-06-23T00:00:00Z"],["22 juin","J","Jordanie","Algérie","2026-06-23T03:00:00Z"],
  ["23 juin","K","Portugal","Ouzbékistan","2026-06-23T17:00:00Z"],["23 juin","L","Angleterre","Ghana","2026-06-23T20:00:00Z"],["23 juin","L","Panama","Croatie","2026-06-23T23:00:00Z"],["23 juin","K","Colombie","RD Congo","2026-06-24T02:00:00Z"],
  ["24 juin","B","Suisse","Canada","2026-06-24T19:00:00Z"],["24 juin","B","Bosnie-Herzégovine","Qatar","2026-06-24T19:00:00Z"],["24 juin","C","Écosse","Brésil","2026-06-24T22:00:00Z"],["24 juin","C","Maroc","Haïti","2026-06-24T22:00:00Z"],["24 juin","A","Tchéquie","Mexique","2026-06-25T01:00:00Z"],["24 juin","A","Afrique du Sud","Corée du Sud","2026-06-25T01:00:00Z"],
  ["25 juin","E","Équateur","Allemagne","2026-06-25T20:00:00Z"],["25 juin","E","Curaçao","Côte d'Ivoire","2026-06-25T20:00:00Z"],["25 juin","F","Japon","Suède","2026-06-25T23:00:00Z"],["25 juin","F","Tunisie","Pays-Bas","2026-06-25T23:00:00Z"],["25 juin","D","Turquie","États-Unis","2026-06-26T02:00:00Z"],["25 juin","D","Paraguay","Australie","2026-06-26T02:00:00Z"],
  ["26 juin","I","Norvège","France","2026-06-26T19:00:00Z"],["26 juin","I","Sénégal","Irak","2026-06-26T19:00:00Z"],["26 juin","H","Cap-Vert","Arabie saoudite","2026-06-27T00:00:00Z"],["26 juin","H","Uruguay","Espagne","2026-06-27T00:00:00Z"],["26 juin","G","Égypte","Iran","2026-06-27T03:00:00Z"],["26 juin","G","Nouvelle-Zélande","Belgique","2026-06-27T03:00:00Z"],
  ["27 juin","L","Panama","Angleterre","2026-06-27T21:00:00Z"],["27 juin","L","Croatie","Ghana","2026-06-27T21:00:00Z"],["27 juin","K","Colombie","Portugal","2026-06-27T23:30:00Z"],["27 juin","K","RD Congo","Ouzbékistan","2026-06-27T23:30:00Z"],["27 juin","J","Algérie","Autriche","2026-06-28T02:00:00Z"],["27 juin","J","Jordanie","Argentine","2026-06-28T02:00:00Z"]
];
const MATCHES = RAW.map((m,i)=>({ id:"m"+i, dateLabel:m[0], group:m[1], home:m[2], away:m[3], ko:m[4] }));

const deadlineMs = ko => new Date(ko).getTime();
const isLocked = (ko, now) => ko ? now >= deadlineMs(ko) : false;

const num=v=>(v===""||v==null)?null:Number(v);
function matchPoints(pred, real){
  if(!pred||!real) return 0;
  const ph=num(pred.h),pa=num(pred.a),rh=num(real.h),ra=num(real.a);
  if(ph==null||pa==null||rh==null||ra==null) return 0;
  if(ph===rh&&pa===ra) return SCALE.exact;
  if(Math.sign(ph-pa)===Math.sign(rh-ra)) return SCALE.issue;
  return 0;
}
function scoreParticipant(part, official){
  const res=(official&&official.results)||{}, preds=part.preds||{};
  const all=[...MATCHES, ...(((official&&official.knockout))||[])];
  let total=0,exact=0,issue=0;
  all.forEach(m=>{ const p=matchPoints(preds[m.id], res[m.id]); if(p===SCALE.exact)exact++; else if(p===SCALE.issue)issue++; total+=p; });
  return {total,exact,issue};
}
function computeRanking(pool, official){
  const scored=(pool||[]).filter(p=>p&&(p.firstName||p.lastName)).map(p=>({...p, ...scoreParticipant(p,official)}));
  scored.sort((a,b)=> b.total-a.total || ((a.lastName||"")+(a.firstName||"")).localeCompare((b.lastName||"")+(b.firstName||""),"fr"));
  let lp=null,lr=0; scored.forEach((s,i)=>{ if(s.total!==lp){lr=i+1;lp=s.total;} s.rank=lr; });
  const c={}; scored.forEach(s=>c[s.rank]=(c[s.rank]||0)+1); scored.forEach(s=>s.tie=c[s.rank]>1);
  return scored;
}
function officialHasResult(official){
  const res=(official&&official.results)||{};
  const all=[...MATCHES, ...(((official&&official.knockout))||[])];
  return all.some(m=>{ const v=res[m.id]; return v&&v.h!==""&&v.h!=null&&v.a!==""&&v.a!=null; });
}

/* ================================================================
   GÉNÉRATEURS DE DONNÉES FICTIVES
   ================================================================ */
const PRENOMS=["Camille","Lucas","Inès","Hugo","Léa","Nathan","Manon","Théo","Chloé","Enzo","Sarah","Maxime","Julie","Antoine","Emma","Romain","Clara","Paul","Alice","Yanis","Nadia","Karim","Sophie","Victor","Élise","Brahim","Marine","Gaël","Awa","Tom"];
const NOMS=["Dupont","Martin","Bernard","Petit","Durand","Leroy","Moreau","Simon","Laurent","Lefebvre","Garnier","Faure","Rousseau","Blanc","Guerin","Muller","Henry","Roussel","Nguyen","Da Silva","Benali","Diallo","Lopez","Marchand","Perrin"];
const rint=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[rint(0,a.length-1)];
const randScore=()=>({h:String(rint(0,4)),a:String(rint(0,4))});

function makeProfile(i){
  const preds={};
  // chaque profil pronostique un sous-ensemble aléatoire des matchs
  MATCHES.forEach(m=>{ if(Math.random()<0.85) preds[m.id]=randScore(); });
  return { uid:"fake_"+i, firstName:pick(PRENOMS), lastName:pick(NOMS)+" "+i, preds };
}
function makeOfficial(nbResults){
  const results={};
  const shuffled=[...MATCHES].sort(()=>Math.random()-0.5).slice(0,nbResults);
  shuffled.forEach(m=>{ results[m.id]=randScore(); });
  return { results, knockout:[] };
}

/* ================================================================
   EXÉCUTION DES TESTS
   ================================================================ */
let pass=0, fail=0;
const ok =(name)=>{ pass++; console.log("  ✓ "+name); };
const ko =(name,d)=>{ fail++; console.log("  ✗ ÉCHEC: "+name+(d?"  → "+d:"")); };

console.log("════════════════════════════════════════════════════════");
console.log(" TEST MOTEUR — Pronostics Coupe du Monde 2026");
console.log("════════════════════════════════════════════════════════");

// --- 0. Intégrité des données de base ---
console.log("\n[0] Intégrité des données");
ok(`72 matchs chargés (réel: ${MATCHES.length})`);
if(MATCHES.length!==72) ko("Il doit y avoir exactement 72 matchs de poule", MATCHES.length);
const teams=Object.values(GROUPS).flat();
teams.length===48 ? ok("48 équipes (12 groupes × 4)") : ko("48 équipes attendues", teams.length);
const uniq=new Set(teams);
uniq.size===48 ? ok("Aucune équipe en double") : ko("Équipe(s) dupliquée(s)", 48-uniq.size+" doublon(s)");
// chaque groupe = 6 matchs
const grpCounts=Object.keys(GROUPS).map(g=>MATCHES.filter(m=>m.group===g).length);
grpCounts.every(c=>c===6) ? ok("Chaque groupe a 6 matchs") : ko("Groupe(s) sans 6 matchs", grpCounts.join(","));

// --- 1. Barème unitaire (cas connus) ---
console.log("\n[1] Barème : +1 issue / +3 exact (cas connus)");
const cas=[
  [{h:"2",a:"1"},{h:"2",a:"1"},3,"score exact (victoire dom)"],
  [{h:"0",a:"0"},{h:"0",a:"0"},3,"score exact (nul 0-0)"],
  [{h:"2",a:"1"},{h:"3",a:"0"},1,"bonne issue (victoire dom, score différent)"],
  [{h:"1",a:"1"},{h:"2",a:"2"},1,"bonne issue (nul, score différent)"],
  [{h:"2",a:"1"},{h:"0",a:"3"},0,"mauvaise issue (dom prédit, ext gagne)"],
  [{h:"2",a:"1"},{h:"1",a:"1"},0,"victoire prédite mais match nul réel"],
  [{h:"1",a:"1"},{h:"2",a:"0"},0,"nul prédit mais victoire réelle"],
  [{h:"",a:""},{h:"2",a:"1"},0,"pronostic vide → 0"],
  [{h:"2",a:"1"},null,0,"pas de résultat officiel → 0"],
];
cas.forEach(([p,r,exp,lbl])=>{ const got=matchPoints(p,r); got===exp?ok(`${lbl} = ${exp}`):ko(lbl,`attendu ${exp}, obtenu ${got}`); });

// --- 2. Verrouillage au coup d'envoi ---
console.log("\n[2] Verrouillage des pronostics au coup d'envoi");
const m0=MATCHES[0];
isLocked(m0.ko, deadlineMs(m0.ko)-1)===false ? ok("Ouvert 1 ms avant le coup d'envoi") : ko("Devrait être ouvert avant le KO");
isLocked(m0.ko, deadlineMs(m0.ko))===true ? ok("Verrouillé pile au coup d'envoi") : ko("Devrait être verrouillé au KO");
isLocked(m0.ko, deadlineMs(m0.ko)+1)===true ? ok("Verrouillé après le coup d'envoi") : ko("Devrait être verrouillé après le KO");

// --- 3. Cohérence du score d'un participant ---
console.log("\n[3] Cohérence du calcul de points (profils fictifs aléatoires)");
const official=makeOfficial(40);
const N=120; // 120 collaborateurs, comme prévu par l'app
const pool=Array.from({length:N},(_,i)=>makeProfile(i));
let coherent=true, detailBad=null;
pool.forEach(p=>{
  const s=scoreParticipant(p,official);
  const recompute=s.exact*SCALE.exact + s.issue*SCALE.issue;
  if(recompute!==s.total){ coherent=false; detailBad=`${p.firstName}: total ${s.total} ≠ ${recompute}`; }
  if(s.total<0){ coherent=false; detailBad="total négatif"; }
});
coherent ? ok(`total = exact×3 + issue×1 pour les ${N} profils`) : ko("Incohérence total/exact/issue", detailBad);

// --- 4. Classement : tri + rangs + ex æquo ---
console.log("\n[4] Classement (tri, rangs, ex æquo)");
const ranking=computeRanking(pool, official);
ranking.length===N ? ok(`${N} participants classés`) : ko("Tous les participants doivent être classés", ranking.length);
let sorted=true;
for(let i=1;i<ranking.length;i++){ if(ranking[i-1].total < ranking[i].total){ sorted=false; break; } }
sorted ? ok("Trié par points décroissants") : ko("Le classement n'est pas trié décroissant");
// rangs cohérents : même total ⇒ même rang
let rankOk=true;
const byRank={};
ranking.forEach(r=>{ (byRank[r.rank]=byRank[r.rank]||[]).push(r.total); });
Object.values(byRank).forEach(arr=>{ if(new Set(arr).size>1) rankOk=false; });
rankOk ? ok("Même rang ⇒ même total") : ko("Des rangs regroupent des totaux différents");
// 1er rang = total max
ranking[0].rank===1 && ranking[0].total===Math.max(...ranking.map(r=>r.total))
  ? ok("Le 1er a le total maximum") : ko("Le 1er n'a pas le total max");
// flag ex æquo
let tieOk=true;
ranking.forEach(r=>{ const cnt=ranking.filter(x=>x.rank===r.rank).length; if((cnt>1)!==!!r.tie) tieOk=false; });
tieOk ? ok("Marqueur 'ex æquo' correct") : ko("Marqueur ex æquo incohérent");

// --- 5. Cas limites du classement ---
console.log("\n[5] Cas limites");
computeRanking([], official).length===0 ? ok("Pool vide → classement vide") : ko("Pool vide devrait donner []");
const sansResultat={results:{},knockout:[]};
!officialHasResult(sansResultat) ? ok("Aucun résultat officiel détecté correctement") : ko("Ne devrait pas détecter de résultat");
officialHasResult(official) ? ok("Présence de résultats officiels détectée") : ko("Devrait détecter des résultats");
// participant sans nom ignoré
const poolAnon=[...pool, {uid:"anon", firstName:"", lastName:"", preds:{}}];
computeRanking(poolAnon, official).length===N ? ok("Participant sans nom ignoré") : ko("Le participant anonyme aurait dû être ignoré");

// --- 6. Score parfait & score nul (bornes) ---
console.log("\n[6] Bornes : score parfait / nul");
const perfect={firstName:"Madame",lastName:"Parfaite",preds:{}};
MATCHES.forEach(m=>{ if(official.results[m.id]) perfect.preds[m.id]={...official.results[m.id]}; });
const ps=scoreParticipant(perfect,official);
const nbRes=Object.keys(official.results).length;
ps.total===nbRes*SCALE.exact && ps.exact===nbRes
  ? ok(`Pronostics parfaits = ${nbRes}×3 = ${ps.total} pts, ${nbRes} exacts`)
  : ko("Le score parfait est faux", `total ${ps.total}, exacts ${ps.exact}, attendu ${nbRes*3}/${nbRes}`);
const empty={firstName:"Monsieur",lastName:"Vide",preds:{}};
scoreParticipant(empty,official).total===0 ? ok("Aucun pronostic = 0 point") : ko("Score à vide devrait être 0");

// --- 7. Aperçu d'un classement réaliste ---
console.log("\n[7] Aperçu du Top 10 (données fictives)");
ranking.slice(0,10).forEach(r=>{
  console.log(`   ${String(r.rank).padStart(2)}.  ${(r.firstName+" "+r.lastName).padEnd(26)} ${String(r.total).padStart(3)} pts   (${r.exact} exacts, ${r.issue} issues)${r.tie?"  [ex æquo]":""}`);
});

console.log("\n════════════════════════════════════════════════════════");
console.log(` RÉSULTAT : ${pass} test(s) réussi(s), ${fail} échec(s)`);
console.log("════════════════════════════════════════════════════════");
process.exit(fail>0?1:0);
