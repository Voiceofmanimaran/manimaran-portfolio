import { useEffect, useRef, useState } from 'react'
import {
  Activity, ArrowUpRight, BadgeCheck, Check, ChevronDown, CircleDot, Cloud,
  Code2, Copy, Cpu, Download, GitBranch, Globe2, Mail, MapPin,
  Menu, Network, Radio, Send, Server, Settings2, Terminal, Wifi, X, Zap,
} from 'lucide-react'
import { achievements, certifications, ongoingPrograms } from './data/credentials'

const projects = [
  { name: 'Mr.Portfolio', type: 'web', icon: Globe2, badge: 'LOGIC: WEB / VERCEL', stack: 'ReactJS / Vercel / Tailwind CSS', text: 'Dynamic portfolio builder offering 100+ templates with instant live preview publishing for students and freshers.', metric: '100+ templates' },
  { name: 'IoT-Enabled Water Quality Monitoring', type: 'hardware', icon: Cloud, badge: 'BUS: I2C / TELEMETRY', stack: 'ESP32 / Arduino Uno / ThingSpeak', text: 'Telemetry-backed embedded system tracking physical water quality metrics with real-time cloud data logging and threshold alerts.', metric: '24/7 telemetry' },
  { name: 'Ticket Exchanger', type: 'web', icon: Network, badge: 'LOGIC: WEB / PEER-TO-PEER', stack: 'ReactJS / Vercel', text: 'Peer-to-peer ticket exchange web application featuring structured listings, responsive design, and real-time form validation.', metric: 'Live listings' },
  { name: 'Wireless Power Transmission', type: 'hardware', icon: Zap, badge: 'CIRCUIT: ANALOG / RF', stack: 'Embedded Firmware / Analog RF / Power Electronics', text: 'State-level evaluated research project analyzing high-efficiency inductive power transfer mechanisms.', metric: 'State-level' },
  { name: 'Manzee Footwear', type: 'web', icon: Globe2, badge: 'LOGIC: WEB / E-COMMERCE', stack: 'ReactJS / Vercel', text: 'Responsive e-commerce storefront featuring dynamic category filtering, cart management, and fluid UI.', metric: 'Fluid UI' },
  { name: 'Manzee Music', type: 'web', icon: Radio, badge: 'LOGIC: WEB AUDIO', stack: 'HTML5 / CSS3 / JavaScript / Netlify', text: 'Interactive audio streaming web player featuring dynamic playlist rendering and custom playback controls.', metric: 'Audio stream' },
  { name: 'Keyword Spotting', type: 'hardware', icon: Radio, badge: 'SYSTEM: AUDIO / ML', stack: 'Embedded Audio / Keyword Detection / Vercel', text: 'Robust audio testbench for capturing short voice samples, simulating noise, and evaluating keyword recognition confidence.', metric: 'Audio inference' },
]

const skillGroups = [
  ['Hardware & IoT', 'ESP32', 'Arduino Uno', 'Sensor Interfacing', 'ThingSpeak', 'Arduino IDE'],
  ['Programming & Web', 'ReactJS', 'JavaScript', 'C Programming', 'HTML5', 'CSS3', 'Vercel', 'Netlify'],
  ['Automation & Tools', 'n8n Workflows', 'Antigravity', 'Git / GitHub', 'Claude AI'],
  ['Core Competencies', 'Firmware', 'HW-SW Interfacing', 'Paper Presentation', 'Troubleshooting'],
]

function createResumePdf() {
  const lines = [
    ['title', 'MANIMARAN B'],
    ['subtitle', 'Electronics & Communication Engineer | Embedded Systems & Web Developer'],
    ['meta', 'Coimbatore, Tamil Nadu  |  +91 8015017758  |  manimaranboopal@gmail.com'],
    ['section', 'EDUCATION'],
    ['body', 'B.E. Electronics & Communication Engineering (4th Year)  |  2023 - 2027'],
    ['body', 'B.E. Electronics & Communication Engineering  |  2023 - 2027  |  Expected Graduation: May 2027'],
    ['section', 'TECHNICAL SKILLS'],
    ['body', 'Hardware & IoT: ESP32, Arduino Uno, Sensor Interfacing, ThingSpeak Cloud Telemetry'],
    ['body', 'Programming & Web: C, ReactJS, JavaScript, HTML5, CSS3, Vercel, Netlify'],
    ['body', 'Automation & Tools: n8n Workflow Automation, Antigravity, Git/GitHub, Claude AI'],
    ['section', 'PROFESSIONAL EXPERIENCE'],
    ['body', 'Ether Services  |  Embedded Systems Intern  |  Jun 2026 - Jul 2026'],
    ['body', 'Microcontroller programming, embedded firmware development, and hardware-software interfacing.'],
    ['body', 'Worked with AI productivity tools and modern automated engineering workflows.'],
    ['body', 'Excellent overall performance evaluation.'],
    ['section', 'KEY PROJECTS'],
    ['body', 'Mr.Portfolio  |  ReactJS, Vercel, Tailwind CSS'],
    ['body', 'IoT Water Quality Monitoring  |  ESP32, Arduino Uno, ThingSpeak Cloud'],
    ['body', 'Ticket Exchanger  |  ReactJS, Vercel'],
    ['body', 'Wireless Power Transmission  |  Embedded Firmware, Analog RF, Power Electronics'],
    ['body', 'Manzee Footwear  |  ReactJS, Vercel'],
    ['body', 'Manzee Music  |  HTML5, CSS3, JavaScript, Netlify'],
    ['section', 'ACHIEVEMENTS'],
    ['body', '1st Place - Connexions, PRAVARTAN 25'],
    ['body', '2nd Place - Tech Face-Off, INTEROFEST-2K26'],
    ['body', '2nd Place - Paper Presentation, TEXPERIA 2025'],
    ['body', '2nd Place - Technical Events, SPECTRA 2K25'],
    ['body', '3rd Place - Paper Presentation, INTEROFEST-2K26'],
    ['section', 'CERTIFICATIONS'],
    ['body', 'Gen AI and Vibe Coding - 7-Day Value Added Course - AJ Academy (2026)'],
    ['body', 'Embedded C and Python Programming - Apex ISYS (2026)'],
    ['body', 'Oracle Cloud Infrastructure 2025 Foundations Associate - Oracle'],
    ['body', 'Oracle Cloud Infrastructure 2025 AI Foundations Associate - Oracle'],
    ['body', 'Full Stack Web Development - AXEXA Technology Solutions'],
    ['body', 'AI Tools & Claude Engineering Workshop - be10x (2026)'],
    ['body', 'Public Relations in the Digital Age | Quickstart Guide for C Programming'],
  ]
  const escapePdf = (text) => text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
  let y = 752
  const commands = ['BT']
  lines.forEach(([type, text]) => {
    const size = type === 'title' ? 22 : type === 'section' ? 11 : type === 'subtitle' ? 10 : 8.5
    const color = type === 'section' ? '0.02 0.52 0.78' : '0.06 0.09 0.16'
    commands.push(`/${type === 'body' || type === 'meta' ? 'F1' : 'F2'} ${size} Tf ${color} rg 1 0 0 1 50 ${y} Tm (${escapePdf(text)}) Tj`)
    y -= type === 'section' ? 22 : type === 'title' ? 25 : 14
    if (type === 'section') y -= 3
  })
  commands.push('ET')
  const stream = commands.join('\n')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]
  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n` })
  const xref = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n `).join('\n')}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  return pdf
}

function Oscilloscope() {
  const canvasRef = useRef(null)
  const [wave, setWave] = useState('SINE')
  const [frequency, setFrequency] = useState(1.8)
  const [channel, setChannel] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = 100
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    let frame
    const draw = (time) => {
      const width = canvas.width
      const height = canvas.height
      context.clearRect(0, 0, width, height)
      context.strokeStyle = '#dbeafe'; context.lineWidth = 1
      for (let x = 0; x < width; x += 24) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke() }
      for (let y = 0; y < height; y += 24) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke() }
      context.strokeStyle = '#94a3b8'; context.beginPath(); context.moveTo(0, height / 2); context.lineTo(width, height / 2); context.stroke()
      if (!channel) { frame = requestAnimationFrame(draw); return }
      context.strokeStyle = '#0284c7'; context.lineWidth = 2.5; context.shadowColor = '#38bdf8'; context.shadowBlur = 8; context.beginPath()
      for (let x = 0; x <= width; x += 2) {
        const phase = (x / width) * Math.PI * 2 * frequency + time / 900
        const normalized = wave === 'SQUARE' ? (Math.sin(phase) > 0 ? 1 : -1) : wave === 'TRIANGULAR' ? (2 / Math.PI) * Math.asin(Math.sin(phase)) : Math.sin(phase)
        const y = height / 2 - normalized * height * .3
        x === 0 ? context.moveTo(x, y) : context.lineTo(x, y)
      }
      context.stroke(); context.shadowBlur = 0
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [wave, frequency, channel])

  return <div className="scope-panel chip-frame">
    <div className="scope-head"><div><span className="eyebrow"><Activity size={13} /> LIVE INSTRUMENT</span><h3>Oscilloscope / CH-A</h3></div><span className="live-pill"><span /> RUNNING</span></div>
    <canvas ref={canvasRef} className="scope-canvas" aria-label="Live waveform visualization" />
    <div className="scope-controls">
      <div className="wave-tabs">{['SINE', 'SQUARE', 'TRIANGULAR'].map((item) => <button key={item} className={wave === item ? 'active' : ''} onClick={() => setWave(item)}>{item}</button>)}</div>
      <label className="range-control"><span>FREQ <b>{frequency.toFixed(1)} kHz</b></span><input type="range" min=".4" max="4" step=".1" value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} /></label>
      <button className={`channel-toggle ${channel ? 'on' : ''}`} onClick={() => setChannel(!channel)}><CircleDot size={15} /> CH-A {channel ? 'ON' : 'OFF'}</button>
    </div>
  </div>
}

function App() {
  const [filter, setFilter] = useState('all')
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const visibleProjects = filter === 'all' ? projects : projects.filter((project) => project.type === filter)
  const SelectedProjectIcon = selectedProject?.icon
  const openProject = (project) => setSelectedProject(project)
  const copyEmail = async () => { await navigator.clipboard?.writeText('manimaranboopal@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  const downloadResume = () => { const blob = new Blob([createResumePdf()], { type: 'application/pdf' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'Manimaran-B-Resume.pdf'; anchor.click(); URL.revokeObjectURL(url) }
  return <div className="app-shell">
    <div className="status-bar"><div><span className="status-led" /> SYSTEM: READY <i>•</i> 115200 BAUD <i>•</i> COIMBATORE_NODE</div><div className="status-right"><span><b className="rx-dot" /> RX 0842</span><span><b className="tx-dot" /> TX 0317</span><span className="serial">SERIAL MONITOR <Wifi size={13} /></span></div></div>
    <header className="site-header"><a className="brand" href="#top"><span className="brand-mark"><Cpu size={20} /></span><span>MANIMARAN<span className="brand-dot">.B</span></span></a><nav className={menuOpen ? 'mobile-open' : ''}><a href="#systems" onClick={() => setMenuOpen(false)}>Systems</a><a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav><div className="header-actions"><a className="icon-link" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={18} /></a><a className="icon-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Network size={18} /></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></header>
    <main id="top">
      <section className="hero section-grid"><div className="hero-copy"><span className="eyebrow orange"><span className="pulse-dot" /> EMBEDDED SYSTEMS & WEB SYSTEMS ARCHITECTURE</span><h1>Bridging physical<br /><em>sensor data</em> & modern<br />web logic.</h1><p>Final-year ECE undergraduate engineering reliable microcontroller firmware, IoT cloud telemetry, and responsive React applications backed by automated engineering workflows.</p><div className="hero-cta"><a className="primary-btn" href="#projects">Inspect Systems <ArrowUpRight size={17} /></a><a className="secondary-btn" href="/resume.pdf" onClick={(event) => { event.preventDefault(); downloadResume() }}><Download size={16} /> Download Resume</a></div><div className="hero-meta"><span><MapPin size={14} /> COIMBATORE, INDIA</span><span><Terminal size={14} /> BUILD 2027.04</span></div></div><Oscilloscope /></section>
        <section className="architecture-section"><div className="architecture-heading"><span className="eyebrow">01 / SYSTEMS</span><h2>One signal. <em>Three layers.</em></h2></div><div className="architecture-grid"><article><span>01</span><h3>Physical Layer</h3><p>Sensor acquisition, analog-to-digital signal processing, and low-level firmware on ESP32 and Arduino Uno.</p></article><article><span>02</span><h3>Data & Automation Layer</h3><p>Cloud telemetry aggregation via ThingSpeak, real-time logging, and n8n automated engineering pipelines.</p></article><article><span>03</span><h3>Experience Layer</h3><p>Modern, component-driven web interfaces built with ReactJS and Tailwind CSS, deployed on high-performance edge networks like Vercel.</p></article></div></section>
      <section id="stack" className="section stack-section"><div className="section-intro"><span className="section-number">02</span><div><span className="eyebrow">CAPABILITY MATRIX / v3.1</span><h2>Tools for the <em>real world.</em></h2></div><p>A practical stack tuned for closing the loop between a physical signal and a useful interface.</p></div><div className="skills-grid">{skillGroups.map(([title, ...items], index) => <article className="skill-card chip-frame" key={title}><div className="skill-index">0{index + 1}</div><h3>{title}</h3><div className="skill-list">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section>
      <section id="projects" className="section projects-section"><div className="section-intro project-intro"><div><span className="eyebrow">03 / DEPLOYED NODES</span><h2>Selected <em>builds.</em></h2></div><p>From inductive coils to responsive components, each node is built to move a signal somewhere meaningful.</p></div><div className="filter-row"><span className="filter-label"><Settings2 size={15} /> ROUTE FILTER</span>{[['all', '[ALL_NODES]'], ['hardware', '[HARDWARE / IOT]'], ['web', '[REACT / WEB]']].map(([key, label]) => <button key={key} className={filter === key ? 'filter-active' : ''} onClick={() => setFilter(key)}><span className={`switch ${filter === key ? 'switch-on' : ''}`} />{label}</button>)}</div><div className="project-grid">{visibleProjects.map((project) => { const Icon = project.icon; return <article className={`project-card chip-frame ${project.url ? 'project-link-card' : ''}`} key={project.name} role="button" tabIndex="0" onClick={() => openProject(project)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openProject(project) }}><div className="project-top"><span className="project-icon"><Icon size={20} /></span><span className="project-type">{project.type === 'web' ? 'WEB NODE' : 'HARDWARE NODE'} <ArrowUpRight size={15} /></span></div><h3>{project.name}</h3><p>{project.text}</p><div className="project-bottom"><span>{project.stack}</span><b>{project.metric}</b></div><div className="project-badge">{project.badge}<span>{project.url ? 'OPEN LIVE SITE' : 'INSPECT NODE'} <ArrowUpRight size={12} /></span></div></article> })}</div>{selectedProject && <div className="project-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal chip-frame" role="dialog" aria-modal="true" aria-label={`${selectedProject.name} details`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button><span className="eyebrow"><span className="pulse-dot" /> NODE INSPECTION / ONLINE</span><div className="modal-icon"><SelectedProjectIcon size={28} /></div><h3>{selectedProject.name}</h3><p>{selectedProject.text}</p><div className="modal-data"><span><small>ROUTE</small>{selectedProject.type === 'web' ? 'REACT / WEB' : 'HARDWARE / IOT'}</span><span><small>STACK</small>{selectedProject.stack}</span><span><small>TELEMETRY</small>{selectedProject.metric}</span></div><div className="project-badge">{selectedProject.badge}</div></div></div>}</section>
      <section id="systems" className="section experience-section"><div className="section-intro"><div><span className="eyebrow">04 / SIGNAL HISTORY</span><h2>Field notes & <em>milestones.</em></h2></div></div><div className="timeline"><article className="timeline-item"><span className="timeline-pin" /><div><span className="eyebrow orange">JUN 2026 — JUL 2026 / ETHER SERVICES</span><h3>Embedded Systems Intern</h3><p>Practical microcontroller programming, embedded firmware development, and hardware-software interfacing. Participated in technical workshops on AI productivity tools and modern automated engineering workflows.</p><span className="award"><BadgeCheck size={15} /> EXCELLENT PERFORMANCE EVALUATION</span></div></article><article className="timeline-item"><span className="timeline-pin" /><div><span className="eyebrow orange">2023 — 2027 / INFO INSTITUTE OF ENGINEERING</span><h3>B.E. Electronics & Communication Engineering</h3><p>4th Year · Coimbatore, Tamil Nadu<br /><span className="mono">ROLL 23BEC016 // REG 711023106016</span></p><span className="award"><Zap size={15} /> STATE-LEVEL PAPER PRESENTATION HONORS</span></div></article></div><div className="credentials-grid"><div className="credential-column"><div className="credential-heading"><span className="eyebrow">CREDENTIALS</span><h3>Certified <em>systems.</em></h3></div>{certifications.map((credential) => <article className="credential-row" key={credential.name}><div><strong>{credential.name}</strong><span>{credential.issuer}</span></div><time>{credential.year}</time></article>)}</div><div className="credential-column"><div className="credential-heading"><span className="eyebrow orange">RECOGNITION</span><h3>Selected <em>honors.</em></h3></div>{achievements.map((achievement) => <article className="credential-row" key={achievement.award}><div><strong>{achievement.award}</strong><span>{achievement.event}</span></div><time>{achievement.year}</time></article>)}</div></div><div className="ongoing-section"><div className="credential-heading"><span className="eyebrow orange">05 / CURRENTLY BUILDING</span><h3>Learning in <em>progress.</em></h3></div><div className="ongoing-grid">{ongoingPrograms.map((program) => <article className="ongoing-row" key={program.name}><div><strong>{program.name}</strong><span>{program.provider}</span></div><b><span />{program.status}</b></article>)}</div></div></section>
      <section id="contact" className="contact-section"><div><span className="eyebrow orange">05 / OPEN CHANNEL</span><h2>Ready to build the next<br /><em>connected system.</em></h2><p>Have an engineering challenge or an open role? Let’s connect and make it happen.</p></div><div className="contact-actions"><button className="email-copy" onClick={copyEmail}>{copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'COPIED TO BUFFER' : 'COPY EMAIL ADDRESS'}<span>manimaranboopal@gmail.com</span></button><a className="primary-btn" href="mailto:manimaranboopal@gmail.com">Send Direct Message <Send size={16} /></a></div></section>
    </main><footer><span>MB<span className="brand-dot">.01</span> / PRECISION SILICON LAB</span><span>BUILT WITH CURIOSITY + CURRENT <span className="footer-led" /></span></footer>
  </div>
}

export default App
