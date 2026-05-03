import React, { useEffect, useRef, useState } from 'react';

// ─── Foto de perfil — reemplazá por tu ruta real si cambiás el archivo ────────
const PROFILE_PHOTO = '/profile.jpg';

// ─── Scroll Animation ─────────────────────────────────────────────────────────

const useFadeIn = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0, className = '' }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    number: '01',
    tags: ['React', 'Firebase', 'B2B / Web'],
    title: 'Hospital CAE — Real-Time Booking System',
    description:
      "Replaced a fragmented paper-based process at a high-complexity hospital's Centro de Atención de Especialidades with a real-time scheduling dashboard and analytics panel built in React + Firebase. Designed from the inside — as the clinical operator who lived the bottleneck — and shipped into full production.",
    impact: ['Zero double-bookings post-launch', 'Live in a high-complexity hospital', 'Adopted by clinical staff on day one'],
    gradient: 'from-blue-500 to-cyan-400',
    url: null,
  },
  {
    number: '02',
    tags: ['Flutter', 'Supabase', 'iOS + Android'],
    title: 'Yoinn — Social Discovery App',
    description:
      'Location-based social discovery platform that lets users find and join real events and experiences happening within 500m in real time. Built the entire frontend and backend with Flutter + Supabase — Live Map, Group Chat, verified profiles, and a zero-friction join flow. Shipped to both App Store and Google Play.',
    impact: ['Live on App Store & Google Play', 'Real-time 500m event radar', 'AI-accelerated full-stack delivery'],
    gradient: 'from-violet-500 to-indigo-400',
    url: 'https://www.yoinn.cl',
  },
  {
    number: '03',
    tags: ['n8n', 'Claude API', 'B2B SaaS'],
    title: 'LockedInWork — AI Automation Agency',
    description:
      'B2B agency deploying Chatbots and AI Agents that automate operational processes and replace repetitive manual labor at scale. Built end-to-end automation pipelines using n8n, the Claude API, and custom integrations — giving companies a digital workforce without the headcount.',
    impact: ['Chatbots + AI Agents in production', 'B2B clients across Chile', 'Digital workforce infrastructure'],
    gradient: 'from-emerald-500 to-teal-400',
    url: 'https://www.lockedinwork.com',
  },
];

const techStack = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Flutter', 'Tailwind CSS'] },
  { category: 'Backend & DB', items: ['Firebase', 'Supabase', 'Node.js', 'REST APIs'] },
  { category: 'AI & Automation', items: ['Claude API', 'OpenAI', 'n8n', 'LangChain'] },
  { category: 'DevOps & Tools', items: ['Git', 'Vercel', 'Figma', 'Vite'] },
];

const stats = [
  { label: 'Clinical Experience', value: '8 Years', sub: 'High-complexity hospitals' },
  { label: 'Products in Production', value: '3+', sub: 'Real users, real stakes' },
  { label: 'Target Market', value: 'Canada', sub: 'Calgary · Vancouver' },
  { label: 'Kettlebell Cert.', value: 'Level I & II', sub: 'Certified Instructor' },
];

// ─── Profile Photo ───────────────────────────────────────────────────────────

interface ProfilePhotoProps {
  size: 'hero' | 'card';
  openToWork?: boolean;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ size, openToWork = false }) => {
  const [error, setError] = useState(false);
  const isHero = size === 'hero';
  const dim = isHero ? 'w-56 h-56 md:w-72 md:h-72' : 'w-20 h-20';
  const textSize = isHero ? 'text-5xl' : 'text-xl';

  const photo = !error ? (
    <img
      src={PROFILE_PHOTO}
      alt="Miguel Moreira"
      className="w-full h-full object-cover object-center"
      onError={() => setError(true)}
    />
  ) : (
    <span className={`${textSize} font-black text-white select-none`}>MM</span>
  );

  const circle = (
    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
      {photo}
    </div>
  );

  if (!openToWork) {
    return <div className={`${dim} rounded-full overflow-hidden shrink-0`}>{circle}</div>;
  }

  return (
    <div className={`${dim} relative shrink-0`}>
      <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-[#6dae4f] via-[#4a9e31] to-[#6dae4f]">
        <div className="w-full h-full rounded-full bg-slate-950 p-[3px]">
          {circle}
        </div>
      </div>
    </div>
  );
};

// ─── Navbar ──────────────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl shadow-slate-950/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-lg tracking-tight">
          Miguel<span className="text-blue-400">Moreira</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {[['About', '#about'], ['Work', '#projects'], ['Stack', '#stack']].map(([label, href]) => (
            <a key={label} href={href} className="hover:text-white transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
        >
          Get in touch →
        </a>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero: React.FC = () => (
  <header className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-blue-600/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/5 w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>

    <div className="max-w-5xl mx-auto px-6 py-32 relative z-10 w-full">
      <div className="grid md:grid-cols-5 gap-10 items-center">

        {/* Left: copy */}
        <div className="md:col-span-3">
          <FadeUp>
            <span className="inline-flex items-center gap-2.5 text-blue-400 font-semibold tracking-widest uppercase text-xs mb-8 border border-blue-500/25 bg-blue-500/10 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Clinical Full-Stack Builder · HealthTech & AI Operator
            </span>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.04] tracking-tight mb-6">
              I build HealthTech systems that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400">
                actually ship.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={200}>
            <p className="text-xl text-slate-400 max-w-xl mb-4 leading-relaxed">
              8 years inside high-complexity hospital labs. Then I learned to code.
            </p>
            <p className="text-xl text-slate-400 max-w-xl mb-10 leading-relaxed">
              The result: a builder who understands clinical workflows{' '}
              <span className="text-slate-300 font-medium">and</span> can ship production software in React,
              Flutter, and n8n — with no translation layer between medicine and engineering.
            </p>
          </FadeUp>

          <FadeUp delay={300}>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                View Case Studies
              </a>
              <a
                href="https://www.linkedin.com/in/miguel-moreira-ampuero/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800/70 hover:bg-slate-800 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 border border-slate-700 hover:border-slate-500 backdrop-blur"
              >
                LinkedIn ↗
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Right: profile photo */}
        <FadeUp delay={150} className="hidden md:flex md:col-span-2 justify-center items-center">
          <div className="relative flex flex-col items-center gap-4">
            {/* Glow behind photo */}
            <div className="absolute w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
            <ProfilePhoto size="hero" openToWork />
            <span className="relative flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Open to work · Canada
            </span>
          </div>
        </FadeUp>

      </div>
    </div>
  </header>
);

// ─── About ───────────────────────────────────────────────────────────────────

const About: React.FC = () => (
  <section id="about" className="py-24 bg-slate-900/40 border-y border-slate-800/50">
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-16 items-start">
      <FadeUp className="md:col-span-3">
        <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-4">About</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
          Most devs have never stepped foot in a clinical lab.{' '}
          <span className="text-slate-400 font-normal">I spent 8 years in one.</span>
        </h2>
        <div className="space-y-4 text-slate-400 leading-relaxed text-[17px]">
          <p>
            I know what it feels like when a hospital system crashes at 3 AM during an emergency. I know the
            bureaucratic friction, the real bottlenecks, and what clinical staff{' '}
            <span className="text-slate-200 font-medium">actually need</span> from software — because I
            lived it as a Medical Laboratory Technologist for nearly a decade.
          </p>
          <p>
            That context is my unfair advantage. I don't need a product manager to translate medical workflows
            into specs. I write the specs. Then I ship the code using React, Flutter, Firebase, and Supabase,
            with AI compressing what used to take months into weeks.
          </p>
          <p>
            Outside the terminal: I'm a{' '}
            <span className="text-slate-200 font-medium">Certified Kettlebell Instructor (Level I & II)</span>{' '}
            and an avid snowboarder. The same discipline required to coach others physically is what drives me
            to ship products without cutting corners.
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={180} className="md:col-span-2">
        <div className="space-y-3 pt-10 md:pt-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 backdrop-blur transition-colors duration-200"
            >
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </section>
);

// ─── Case Studies ─────────────────────────────────────────────────────────────

const CaseStudies: React.FC = () => (
  <section id="projects" className="bg-slate-950 py-24">
    <div className="max-w-5xl mx-auto px-6">
      <FadeUp>
        <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">Proof of Work</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-14">Case Studies</h2>
      </FadeUp>

      <div className="space-y-5">
        {projects.map((project, i) => (
          <FadeUp key={project.number} delay={i * 90}>
            <div className="group relative bg-slate-900/50 border border-slate-800 hover:border-slate-600/80 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-900/80 overflow-hidden">
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="shrink-0 select-none">
                  <span
                    className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b ${project.gradient} opacity-20 group-hover:opacity-50 transition-opacity duration-300`}
                  >
                    {project.number}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-800 text-slate-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6 text-[15px] md:text-base">
                    {project.description}
                  </p>

                  {/* Website preview */}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mb-6 rounded-xl overflow-hidden border border-slate-700/80 hover:border-slate-500 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Browser chrome */}
                      <div className="bg-slate-800 px-3 py-2 flex items-center gap-2.5">
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                        </div>
                        <div className="flex-1 bg-slate-700/80 rounded-md px-2.5 py-1 text-xs text-slate-400 truncate">
                          {project.url.replace('https://', '')}
                        </div>
                        <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      {/* Screenshot via thum.io */}
                      <div className="h-44 overflow-hidden bg-slate-800 relative">
                        <img
                          src={`https://image.thum.io/get/width/1200/crop/600/noanimate/${project.url}`}
                          alt={`${project.title} preview`}
                          className="w-full object-cover object-top"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                      </div>
                    </a>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {project.impact.map((item) => (
                        <span key={item} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} shrink-0`} />
                          {item}
                        </span>
                      ))}
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-200 bg-gradient-to-r ${project.gradient} text-white border-transparent hover:opacity-90 hover:-translate-y-0.5`}
                      >
                        Visit Site ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const TechStack: React.FC = () => (
  <section id="stack" className="py-24 border-t border-slate-800/50">
    <div className="max-w-5xl mx-auto px-6">
      <FadeUp>
        <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">Toolbox</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-14">Tech Stack</h2>
      </FadeUp>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {techStack.map((group, i) => (
          <FadeUp key={group.category} delay={i * 75}>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 h-full hover:border-slate-700 transition-colors duration-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                {group.category}
              </p>
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-medium text-slate-300 bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/40 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ─── LinkedIn Card ────────────────────────────────────────────────────────────

const LinkedInCard: React.FC = () => (
  <a
    href="https://www.linkedin.com/in/miguel-moreira-ampuero/"
    target="_blank"
    rel="noopener noreferrer"
    className="group block bg-[#1b1f23] border border-slate-700/60 hover:border-[#0A66C2]/70 rounded-2xl overflow-hidden transition-all duration-300 w-full hover:shadow-2xl hover:shadow-[#0A66C2]/10 hover:-translate-y-0.5"
  >
    {/* Banner */}
    <div className="h-24 bg-gradient-to-br from-[#0A66C2] via-[#0077b5] to-[#004182] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
    </div>

    <div className="px-5 pb-5">
      {/* Avatar with Open to Work ring */}
      <div className="-mt-10 mb-3 flex items-end justify-between">
        <ProfilePhoto size="card" openToWork />
        {/* LinkedIn logo badge */}
        <div className="mb-1 bg-[#0A66C2] rounded-lg p-2">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
      </div>

      {/* Name & headline */}
      <h3 className="text-base font-bold text-white leading-tight mb-0.5">Miguel Moreira</h3>
      <p className="text-[13px] text-slate-300 leading-snug mb-2">
        Clinical Full-Stack Builder · Medical Technologist & AI Operator
      </p>

      {/* Company line */}
      <p className="text-xs text-slate-500 mb-3">
        LockedInWork · Hospital San José
      </p>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        Santiago, Chile
        <span className="text-slate-700">·</span>
        <span className="text-green-400 font-medium">Open to work</span>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700/50 pt-4 mb-4">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Open to</p>
        <div className="flex flex-wrap gap-1.5">
          {['HealthTech', 'MedTech', 'Remote · Canada'].map((tag) => (
            <span key={tag} className="text-xs text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center gap-2 w-full bg-[#0A66C2] group-hover:bg-[#0958a8] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-200">
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        View LinkedIn Profile ↗
      </div>
    </div>
  </a>
);

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact: React.FC = () => (
  <section id="contact" className="bg-slate-950 py-28 border-t border-slate-800/50">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-5 gap-12 items-center">

        {/* Left: CTA copy + buttons */}
        <div className="md:col-span-3">
          <FadeUp>
            <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-5">Let's Work</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
              Need a builder who speaks{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                clinical?
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              If your HealthTech startup needs someone who understands medical workflows and can ship fast —
              let's get on a call.
            </p>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* ← Replace href with your real Calendly link */}
              <a
                href="https://calendly.com/miguel-moreira-ampuero/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a 30-min Call
              </a>

              <a
                href="mailto:letsgo@yoinn.cl"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-800/80 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 border border-slate-700 hover:border-slate-500 backdrop-blur"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send an Email
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={220}>
            <p className="mt-6 text-sm text-slate-600">
              Open to remote contracts & full-time roles · Calgary & Vancouver preferred
            </p>
          </FadeUp>
        </div>

        {/* Right: LinkedIn Card */}
        <FadeUp delay={200} className="md:col-span-2">
          <LinkedInCard />
        </FadeUp>

      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer: React.FC = () => (
  <footer className="border-t border-slate-800/50 py-8 bg-slate-950">
    <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
      <p>
        © {new Date().getFullYear()}{' '}
        <span className="text-slate-400 font-medium">Miguel Moreira</span> · Clinical Full-Stack Builder
      </p>
      <div className="flex gap-6">
        <a href="https://www.linkedin.com/in/miguel-moreira-ampuero/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors duration-200">
          LinkedIn
        </a>
        <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors duration-200">
          GitHub
        </a>
        <a href="mailto:letsgo@yoinn.cl" className="hover:text-slate-300 transition-colors duration-200">
          Email
        </a>
      </div>
    </div>
  </footer>
);

// ─── Root ─────────────────────────────────────────────────────────────────────

const Portfolio: React.FC = () => (
  <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white antialiased">
    <Navbar />
    <Hero />
    <About />
    <CaseStudies />
    <TechStack />
    <Contact />
    <Footer />
  </div>
);

export default Portfolio;
