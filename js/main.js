const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const cursor = $('.cursor-glow');
window.addEventListener('pointermove', e => {
  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => revealObserver.observe(el));

const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.target.classList.toggle('active', entry.isIntersecting));
}, {threshold:.55});
$$('.timeline-item').forEach(el => timelineObserver.observe(el));

const filters = $$('.filter');
const items = $$('.timeline-item');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  items.forEach(item => {
    const show = filter === 'all' || item.dataset.type === filter;
    item.classList.toggle('hidden', !show);
  });
  document.querySelector('#timeline').animate(
    [{opacity:.45, transform:'translateY(5px)'},{opacity:1, transform:'translateY(0)'}],
    {duration:420, easing:'cubic-bezier(.2,.8,.2,1)'}
  );
}));

const menuButton = $('.menu-button');
const nav = $('.nav nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
$$('.nav nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const projects = {
  server:{kicker:'INFRASTRUCTURE / SELF-HOSTING',title:'Self-hosted ecosystem',summary:'What began as an old laptop became a long-running laboratory for servers, storage, networking and automation.',cards:[['Evolution','Acer + TrueNAS → Plex → OpenVPN → Dell Vostro → Windows Server → RAID → Docker.'],['Learning','Linux commands, PowerShell, WSL, containerization, storage and service deployment became practical skills rather than isolated topics.'],['Why it matters','The server became the platform on which many later experiments were built.']]},
  smart:{kicker:'AUTOMATION / IOT',title:'Smart room',summary:'A home automation system assembled from inexpensive hardware, open software and a lot of experimentation.',cards:[['Control layer','Home Assistant running through Docker became the central interface for the room.'],['Physical layer','Smart bulbs, LED strips, switches and an ESP32-powered door lock connected the physical environment to the software layer.'],['Interface','A custom JSON dashboard and repurposed tablet became a dedicated 24/7 control panel.']]},
  audio:{kicker:'AUDIO / DIY ENGINEERING',title:'Desk audio',summary:'A system that evolved through repeated experiments with amplifiers, speakers, wiring and a DIY subwoofer.',cards:[['Starting point','Living-room 5.1 experimentation and a DIY 2.1 system created the foundation.'],['Desk system','An Android car radio, 12 V supply and DIY amplification became a compact multi-channel setup.'],['Iteration','A passive subwoofer built from scrap wood and 5-inch drivers became another experiment in enclosure and system design.']]},
  adsb:{kicker:'RADIO / LINUX / INFRASTRUCTURE',title:'ADS-B infrastructure',summary:'A project that pushed the self-hosting mindset beyond the home network.',cards:[['Opportunity','Applications to host ADS-B receivers resulted in two fully sponsored receiver kits.'],['Deployment','A dedicated Linux mini-PC was built for a Chennai deployment supporting aircraft tracking and additional services.'],['Systems thinking','The project combined radio hardware, Linux, networking, remote access and reliable 24/7 operation.']]},
  network:{kicker:'NETWORKING',title:'Wi-Fi 6 mesh',summary:'A full apartment network designed using practical networking knowledge and CCNA concepts.',cards:[['Design','Switches, access points and powerline links were arranged around the physical constraints of a three-bedroom apartment.'],['Knowledge','Cisco Packet Tracer and CCNA study helped turn trial-and-error into deliberate network design.'],['Result','A home network became another real environment in which to apply networking concepts.']]},
  pulse:{kicker:'SCHOOL / INNOVATION',title:'Bias-aware pulse oximeter',summary:'A Raspberry Pi and sensor project that connected engineering with a real-world question about measurement bias.',cards:[['Build','The project used a Raspberry Pi and multiple sensors to construct a working pulse-oximeter concept.'],['Question','The project considered how measurement systems can behave differently across users rather than treating a sensor reading as universally neutral.'],['Outcome','The project cleared the first round of the GEMS Innovation Challenge from the whole grade.']]}
};

const awards = {
  abacus:{kicker:'ACADEMIC · 2018–2019',title:'1st — Varna Academy Abacus',summary:'An early academic competition result that sits at the beginning of the wider story.',cards:[['Result','Placed 1st in Varna Academy in Abacus during 2018–2019 in Chennai.'],['Why it matters','One of the earliest documented competitive achievements in the timeline.']]},
  swimming:{kicker:'GEMS WELLINGTON · FS1–FS2',title:'Best Swimmer',summary:'A recurring early-school recognition for swimming performance.',cards:[['Recognition','Was consistently awarded Best Swimmer during FS1 and FS2.'],['Early years','This sits at the start of the school timeline, before the later academic and technical achievements.']]},
  gemsdiscipline:{kicker:'GEMS FOUNDERS · YEAR 6',title:'Gem of the Year',summary:'Recognised for discipline and effort during Year 6.',cards:[['Recognition','Awarded Gem of the Year for Discipline and Effort.'],['Development','Also enrolled in the Duke of Edinburgh Junior Edition during Year 6.']]},
  frenchbee:{kicker:'GEMS FOUNDERS · YEAR 7',title:'2nd — French Spelling Bee',summary:'A school-level language competition result.',cards:[['Result','Placed 2nd in the French Spelling Bee in Year 7.'],['School contribution','Also wrote the year group’s weekly newsletter once during Year 7.']]},
  film:{kicker:'GEMS MODERN ACADEMY · GRADE 8',title:'1st — French Francophonie Film',summary:'A creative competition win combining filming, storytelling and editing.',cards:[['Result','The GEMS French Francophonie film placed 1st in the film competition.'],['Creative work','Also filmed and edited the class short film and trailer during Grade 8.']]},
  cyber:{kicker:'GEMS MODERN ACADEMY · GRADE 8',title:'2nd — Cyber Olympiad',summary:'A school-wide competitive technology achievement.',cards:[['Result','Placed 2nd across GEMS Modern Academy in the Cyber Olympiad.'],['Context','The result came during Grade 8 alongside other academic and technical competition work.']]},
  council:{kicker:'GEMS MODERN · GRADE 8 · LEADERSHIP',title:'Elected to Class Council',summary:'A full-year student leadership role supported by a formal recommendation letter.',cards:[['Election','Elected as Class Council for the class during Grade 8.'],['Completion','Completed the full school year in the role.'],['Recognition','Received a recommendation letter documenting the successful completion of the year of service.']]},
  critical:{kicker:'NOF · GRADE 8',title:'16th Internationally — Critical Thinking Olympiad',summary:'An international academic competition result.',cards:[['Result','Placed 16th internationally in the NOF Critical Thinking Olympiad.'],['Context','Achieved during Grade 8 at GEMS Modern Academy.']]},
  ccna:{kicker:'NETWORKING · PROFESSIONAL LEARNING',title:'CCNA Completed & Passed',summary:'A formal networking milestone backed by practical home infrastructure work.',cards:[['Qualification','Completed CCNA training through a Cisco-affiliated institute and passed the online CCNA examination.'],['Applied learning','Used the concepts in Cisco Packet Tracer and in designing a Wi-Fi 6 mesh network at home.']]},
  englishbee:{kicker:'SCHOOL · ENGLISH SPELLING BEE',title:'3rd — English Spelling Bee',summary:'A school-level spelling competition achievement.',cards:[['Result','Placed 3rd in an English-based Spelling Bee.'],['Context','Another academic competition result alongside the French spelling and olympiad achievements.']]},
  mc:{kicker:'GEMS MODERN · MYP3 LEADERSHIP',title:'Community Project Assembly MC',summary:'A public-speaking and leadership role within the MYP3 community.',cards:[['Role','Served as MC for the Community Project Assembly.'],['Audience','Spoke to the full MYP3 student cohort.']]},
  scholarship:{kicker:'TKS DUBAI · SCHOLARSHIP',title:'83% TKS Scholarship',summary:'A major selective-programme achievement after interviews and coursework.',cards:[['Selection','Completed three rounds of interviews and coursework for TKS Dubai.'],['Outcome','Received an 83% scholarship, reducing the programme cost from AED 27,000 to AED 3,000.']]}
};

const modal = $('.modal');
const modalTitle = $('.modal-title');
const modalKicker = $('.modal-kicker');
const modalSummary = $('.modal-summary');
const modalBody = $('.modal-body');
function openModal(data){
  if(!data) return;
  modalKicker.textContent=data.kicker;
  modalTitle.textContent=data.title;
  modalSummary.textContent=data.summary;
  modalBody.innerHTML=data.cards.map(c=>`<div><strong>${c[0]}</strong><p>${c[1]}</p></div>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
$$('.project-card').forEach(card=>card.addEventListener('click',()=>openModal(projects[card.dataset.project])));
$$('.award-card').forEach(card=>card.addEventListener('click',()=>openModal(awards[card.dataset.award])));
$('.modal-close')?.addEventListener('click',closeModal);
$('.modal-backdrop')?.addEventListener('click',closeModal);
window.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});

$$('.magnetic').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.12;
    const y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener('pointerleave',()=>el.style.transform='');
});
