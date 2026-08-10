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
  entries.forEach(entry => {
    entry.target.classList.toggle('active', entry.isIntersecting);
  });
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
  server: {
    kicker:'INFRASTRUCTURE / SELF-HOSTING',
    title:'Self-hosted ecosystem',
    summary:'What began as an old laptop became a long-running laboratory for servers, storage, networking and automation.',
    cards:[
      ['Evolution','Acer + TrueNAS → Plex → OpenVPN → Dell Vostro → Windows Server → RAID → Docker.',''],
      ['Learning','Linux commands, PowerShell, WSL, containerization, storage and service deployment became practical skills rather than isolated topics.',''],
      ['Why it matters','The server was never just a server. It became the platform on which many later experiments were built.','']
    ]
  },
  smart: {
    kicker:'AUTOMATION / IOT',
    title:'Smart room',
    summary:'A home automation system assembled from inexpensive hardware, open software and a lot of experimentation.',
    cards:[
      ['Control layer','Home Assistant running through Docker became the central interface for the room.',''],
      ['Physical layer','Smart bulbs, LED strips, switches and an ESP32-powered door lock connected the physical environment to the software layer.',''],
      ['Interface','A custom JSON dashboard and repurposed tablet became a dedicated 24/7 control panel.','']
    ]
  },
  audio: {
    kicker:'AUDIO / DIY ENGINEERING',
    title:'Desk audio',
    summary:'A system that evolved through repeated experiments with amplifiers, speakers, DSP, wiring and a DIY subwoofer.',
    cards:[
      ['Starting point','Living-room 5.1 experimentation and a DIY 2.1 system created the foundation.',''],
      ['Desk system','An Android car radio, 12 V supply and DIY amplification became a compact multi-channel setup.',''],
      ['Iteration','A passive subwoofer built from scrap wood and 5-inch drivers became another experiment in enclosure and system design.','']
    ]
  },
  adsb: {
    kicker:'RADIO / LINUX / INFRASTRUCTURE',
    title:'ADS-B infrastructure',
    summary:'A project that pushed the self-hosting mindset beyond the home network.',
    cards:[
      ['Opportunity','Applications to host ADS-B receivers resulted in sponsored equipment for deployments.',''],
      ['Deployment','A dedicated Linux mini-PC was planned for a Chennai deployment with aircraft tracking and additional services.',''],
      ['Systems thinking','The project combined radio hardware, Linux, networking, remote access and reliable 24/7 operation.','']
    ]
  },
  network: {
    kicker:'NETWORKING',
    title:'Wi-Fi 6 mesh',
    summary:'A full apartment network designed using practical networking knowledge and CCNA concepts.',
    cards:[
      ['Design','Switches, access points and powerline links were arranged around the physical constraints of a three-bedroom apartment.',''],
      ['Knowledge','Cisco Packet Tracer and CCNA study helped turn trial-and-error into deliberate network design.',''],
      ['Result','A home network became another real environment in which to apply networking concepts.','']
    ]
  },
  pulse: {
    kicker:'SCHOOL / INNOVATION',
    title:'Bias-aware pulse oximeter',
    summary:'A Raspberry Pi and sensor project that connected engineering with a real-world question about measurement bias.',
    cards:[
      ['Build','The project used a Raspberry Pi and multiple sensors to construct a working pulse-oximeter concept.',''],
      ['Question','The project considered how measurement systems can behave differently across users rather than treating a sensor reading as universally neutral.',''],
      ['Outcome','The project cleared the first round of the GEMS Innovation Challenge from the whole grade.','']
    ]
  }
};

const modal = $('.modal');
const modalTitle = $('.modal-title');
const modalKicker = $('.modal-kicker');
const modalSummary = $('.modal-summary');
const modalBody = $('.modal-body');

function openProject(key) {
  const p = projects[key];
  if (!p) return;
  modalKicker.textContent = p.kicker;
  modalTitle.textContent = p.title;
  modalSummary.textContent = p.summary;
  modalBody.innerHTML = p.cards.map(c => `<div><strong>${c[0]}</strong><p>${c[1]}</p></div>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeProject() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
$$('.project-card').forEach(card => card.addEventListener('click', () => openProject(card.dataset.project)));
$('.modal-close')?.addEventListener('click', closeProject);
$('.modal-backdrop')?.addEventListener('click', closeProject);
window.addEventListener('keydown', e => { if(e.key === 'Escape') closeProject(); });

$$('.magnetic').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX-r.left-r.width/2)*.12;
    const y = (e.clientY-r.top-r.height/2)*.12;
    el.style.transform = `translate(${x}px,${y}px)`;
  });
  el.addEventListener('pointerleave', () => el.style.transform = '');
});
