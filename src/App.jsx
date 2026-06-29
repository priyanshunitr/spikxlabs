import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Copy, ExternalLink, Globe, Mail, Menu, X } from 'lucide-react'
import appDev from './assets/reference/reference-appdev.png'
import fullStack from './assets/reference/reference-fullstack.png'
import uiDesign from './assets/reference/reference-ui.png'
import codeProject from './assets/reference/reference-code.png'
import prepProject from './assets/reference/reference-prepai.png'
import renameProject from './assets/reference/reference-rename.png'

const logoSrc = '/logo.jpg'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#project' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'Email', href: 'mailto:hello@spikxlabs.com', icon: Mail },
  { label: 'Projects', href: '#project', icon: Globe },
  { label: 'Book Call', href: '#contact', icon: ArrowUpRight },
]

const skills = [
  {
    title: 'WEB DESIGN',
    description: 'We design and build fast, clean, conversion-focused websites that make your offer easy to understand and easy to act on.',
    image: appDev,
    tags: ['Landing pages', 'Startup websites', 'Website copy', 'Responsive frontend'],
  },
  {
    title: 'GROWTH SYSTEM',
    description: 'We create campaign systems that connect strategy, creative, landing pages, measurement, and follow-up.',
    image: fullStack,
    tags: ['Launch strategy', 'Lead funnels', 'Analytics', 'Performance roadmap'],
  },
  {
    title: 'BRAND CREATIVE',
    description: 'We create practical ad and content assets designed for testing, learning, and scaling across campaigns.',
    image: uiDesign,
    tags: ['Ad concepts', 'Hook libraries', 'Social systems', 'Creative testing'],
  },
]

const filters = ['Growth', 'Websites', 'Performance', 'Brand']

const projects = [
  {
    title: 'LaunchPad Sprint',
    year: '2026',
    description: 'Built a launch-ready landing page and campaign messaging system for a B2B SaaS product preparing for market validation.',
    client: 'B2B SaaS',
    type: 'Growth',
    tags: ['Growth', 'Websites'],
    image: codeProject,
    result: 'Improved lead clarity and gave the team a repeatable launch page for paid and organic traffic.',
    deliverables: ['Landing page structure', 'Homepage copy', 'Campaign hooks', 'Analytics event plan'],
  },
  {
    title: 'Creator Funnel',
    year: '2025',
    description: 'Created a creator-led growth funnel connecting social content, lead magnets, landing pages, and follow-up emails.',
    client: 'Education Brand',
    type: 'Performance',
    tags: ['Performance', 'Brand'],
    image: prepProject,
    result: 'Helped the brand convert content attention into qualified leads and warmer sales conversations.',
    deliverables: ['Lead magnet landing page', 'Short-form content hooks', 'Paid ad concepts', 'Welcome email sequence'],
  },
  {
    title: 'Retention Studio',
    year: '2025',
    description: 'Built a retention-focused messaging and email system for a consumer brand that wanted more repeat purchases.',
    client: 'D2C Team',
    type: 'Brand',
    tags: ['Growth', 'Brand'],
    image: renameProject,
    result: 'Created a repeatable campaign calendar and improved customer follow-up consistency.',
    deliverables: ['Customer segment mapping', 'Email campaign themes', 'Promotional copy', 'Re-engagement sequence'],
  },
]

const heroStats = [
  '20+ launch and growth projects shipped',
  '3x faster campaign turnaround',
  'Websites, funnels, ads, and retention systems under one roof',
]

const aboutHighlights = [
  'Remote-first agency based in India',
  'Built for fast-moving founders and lean teams',
  'Strong focus on clean design, clear copy, and practical execution',
  'Flexible sprint model for launches, campaigns, and ongoing growth',
]

const serviceDetails = [
  {
    title: 'Website Design and Development',
    copy: 'We design and build fast, clean, conversion-focused websites that make your offer easy to understand and easy to act on.',
    includes: [
      'Landing pages',
      'Startup websites',
      'Service business websites',
      'Campaign microsites',
      'Website copy structure',
      'Responsive frontend development',
      'Conversion-focused page sections',
    ],
    bestFor: 'Founders and teams that need a sharp website for launches, lead generation, product validation, or brand credibility.',
  },
  {
    title: 'Brand Messaging and Positioning',
    copy: 'We clarify what you sell, who it is for, why it matters, and how your brand should speak across every channel.',
    includes: [
      'Offer positioning',
      'Homepage messaging',
      'Value proposition writing',
      'Brand voice direction',
      'Taglines and campaign hooks',
      'Audience and pain-point mapping',
      'Competitor angle review',
    ],
    bestFor: 'Businesses that have a good product or service but struggle to explain it simply and persuasively.',
  },
  {
    title: 'Growth Campaigns',
    copy: 'We create campaign systems that connect strategy, creative, landing pages, and measurement.',
    includes: [
      'Launch strategy',
      'Paid social campaign angles',
      'Ad creative direction',
      'Lead generation funnels',
      'Campaign landing pages',
      'Analytics and tracking setup',
      'Performance testing roadmap',
    ],
    bestFor: 'Brands that want a structured campaign instead of disconnected ads, posts, and pages.',
  },
  {
    title: 'Performance Creative',
    copy: 'We create practical ad and content assets designed for testing, learning, and scaling.',
    includes: [
      'Static ad concepts',
      'Short-form video scripts',
      'Hook libraries',
      'Offer-led creatives',
      'Social post systems',
      'Creative testing matrix',
      'Campaign refresh packs',
    ],
    bestFor: 'Teams running paid campaigns or organic content who need more angles, sharper messaging, and better creative consistency.',
  },
  {
    title: 'Email and Retention Funnels',
    copy: 'We help brands keep attention after the first click through email flows, nurture sequences, and lifecycle campaigns.',
    includes: [
      'Welcome sequences',
      'Lead nurture emails',
      'Abandoned inquiry follow-ups',
      'Promotional campaign emails',
      'Re-engagement flows',
      'Newsletter structure',
      'CRM-friendly copy',
    ],
    bestFor: 'Brands that already get traffic or leads but need better follow-up and higher conversion from existing attention.',
  },
]

const processSteps = [
  {
    title: 'Diagnose',
    copy: 'We review your offer, audience, website, funnel, competitors, and current marketing assets to identify what is unclear, missing, or slowing conversion.',
  },
  {
    title: 'Shape',
    copy: 'We define the strategy: positioning, message hierarchy, campaign angle, content structure, and the exact assets needed for the sprint.',
  },
  {
    title: 'Build',
    copy: 'We design, write, and develop the agreed deliverables, from landing pages and creative assets to email copy and brand messaging.',
  },
  {
    title: 'Launch',
    copy: 'We prepare the final assets for use, connect the handoff pieces, and give your team a clear launch checklist.',
  },
  {
    title: 'Learn',
    copy: 'We review performance signals and recommend next steps so the work can improve after launch instead of sitting still.',
  },
]

const testimonials = [
  {
    quote: 'spikxlabs helped us turn a vague product idea into a clear landing page and campaign plan. The work felt sharp, fast, and easy to use.',
    client: 'Founder, SaaS Startup',
  },
  {
    quote: 'They understood the offer quickly and gave us copy, visuals, and campaign angles we could actually launch with.',
    client: 'Growth Lead, Education Brand',
  },
  {
    quote: 'The biggest value was clarity. Our website finally explains what we do without overcomplicating it.',
    client: 'Owner, Service Business',
  },
]

const faqs = [
  ['What kind of businesses do you work with?', 'We work with startups, creators, service businesses, consultants, education brands, and growing teams that need sharper marketing assets and clearer digital experiences.'],
  ['Do you only design websites?', 'No. Websites are often part of the work, but we also help with positioning, campaign messaging, paid creative, email funnels, and launch strategy.'],
  ['Can you work with our existing brand?', 'Yes. We can work within your current brand system, improve what is already there, or create a cleaner direction if the current brand is not strong enough.'],
  ['Do you handle development?', 'Yes. We can build responsive frontend pages and marketing websites. If a project needs complex backend functionality, we will define the scope clearly before starting.'],
  ['How long does a sprint take?', 'Most focused sprints take 1 to 3 weeks depending on scope, feedback speed, and asset complexity.'],
  ['What do you need from us before starting?', 'We usually need your offer details, target audience, existing website or assets, examples you like, business goals, and any current performance data.'],
  ['Can you help with ads?', 'Yes. We can help with campaign angles, ad concepts, creative direction, landing pages, and testing plans. Media buying can be added if it fits the project scope.'],
  ['Do you offer ongoing support?', 'Yes. Ongoing growth support is available for teams that need continuous campaign, website, creative, and funnel improvements.'],
]

const formFields = ['Name', 'Email', 'Company', 'Website', 'Budget range', 'Project type', 'Timeline', 'What do you need help with?']

const footerCompanyLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#project' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const footerServices = [
  'Conversion websites',
  'Growth campaigns',
  'Brand messaging',
  'Performance creative',
  'Email funnels',
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function useReveal(options) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const threshold = options?.threshold ?? 0.18
  const rootMargin = options?.rootMargin ?? '0px 0px -12% 0px'

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, visible]
}

function useSkillMotion(count) {
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const [motion, setMotion] = useState(() =>
    Array.from({ length: count }, (_, index) => ({
      scale: 2,
      offset: index * 50,
    })),
  )

  useEffect(() => {
    let frame = 0

    const measure = () => {
      const container = containerRef.current
      const viewport = window.innerHeight || 1
      const containerRect = container?.getBoundingClientRect()
      const scrollProgress = containerRect
        ? clamp(-containerRect.top / Math.max(containerRect.height - viewport, 1), 0, 1)
        : 0

      const next = cardRefs.current.map((node, index) => {
        if (!node) {
          return { scale: 2, offset: index * 50 }
        }

        const rect = node.getBoundingClientRect()
        const cardProgress = clamp((viewport - rect.top) / viewport, 0, 1)
        return {
          scale: 2 - cardProgress,
          offset: index * 50 * (1 - scrollProgress),
        }
      })

      setMotion(next)
    }

    const schedule = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [count])

  return { containerRef, cardRefs, motion }
}

function RevealBlock({ as: Component = 'div', children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal()

  return (
    <Component
      ref={ref}
      className={`${className} reveal-block ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  )
}

function Nav({ menuOpen, setMenuOpen }) {
  return (
    <header className="top-nav">
      <div className="nav-inner">
        <a className="brand-link" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="logo-frame" aria-hidden="true">
            <img src={logoSrc} alt="" />
          </span>
          <span>spikxlabs</span>
        </a>

        <nav className="desktop-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>

        <button className="mobile-toggle" type="button" aria-label="Toggle mobile menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        {navItems.map((item) => (
          <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  )
}

function FixedHero({ copied, onCopy }) {
  return (
    <section className="fixed-hero" id="top" aria-label="spikxlabs introduction">
      <div className="hero-frame">
        <main className="hero-content">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-name" aria-label="spikxlabs">
                <span>spikxlabs growth studio</span>
              </div>

              <div className="hero-message">
                <h1>Marketing that looks sharp and sells clearly.</h1>
                <p>
                  We build high-converting websites, brand messaging, campaign assets, and growth systems for teams
                  that want clean design, clear strategy, and measurable momentum.
                </p>
              </div>

              <div className="hero-actions">
                <a className="resume-link" href="#contact">
                  Start Sprint
                </a>
                <div className="role-line">
                  <span>hello@spikxlabs.com</span>
                  <button className="copy-btn" type="button" onClick={onCopy} aria-label="Copy email address">
                    <Copy size={16} />
                  </button>
                  <span className={`copy-note ${copied ? 'is-visible' : ''}`}>Copied</span>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-brand-card">
                <div className="brand-mark-hero">
                  <img src={logoSrc} alt="spikxlabs logo" />
                </div>
                <p>Focused marketing systems for launches, funnels, ads, and retention.</p>
              </div>
            </div>
          </div>

          <div className="hero-section-row">
            <div className="social-links" aria-label="Social links">
              {socials.map(({ label, href, icon: Icon }) => (
                <a href={href} key={label} aria-label={label}>
                  <Icon size={24} />
                </a>
              ))}
            </div>

            <ul className="hero-stats" aria-label="spikxlabs highlights">
              {heroStats.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </section>
  )
}

function SkillStack() {
  const { containerRef, cardRefs, motion } = useSkillMotion(skills.length)

  return (
    <div className="skills-cover" ref={containerRef}>
      <main className="skills-main">
        {skills.map((skill, index) => {
          const reversed = index % 2 === 1
          const transform = `translateY(${motion[index]?.offset ?? index * 50}px)`
          const imageScale = motion[index]?.scale ?? 2

          return (
            <section
              className="skill-stage"
              id={index === 0 ? 'services' : undefined}
              key={skill.title}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
            >
              <article className="skill-panel" style={{ zIndex: 100 - index, transform }}>
                <div className={`skill-image ${reversed ? 'order-two' : ''}`}>
                  <div className="skill-image-scale" style={{ transform: `scale(${imageScale})` }}>
                    <img src={skill.image} alt={`${skill.title} visual`} />
                  </div>
                </div>

                <div className={`skill-copy ${reversed ? 'order-one' : ''}`}>
                  <h2>{skill.title}</h2>
                  <p>{skill.description}</p>
                  <div className="tag-list">
                    {skill.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </section>
          )
        })}
      </main>
    </div>
  )
}

function SectionTitle({ number, title }) {
  return (
    <RevealBlock className="section-title">
      <h2>
        <span>{number}</span>
        {title}
        <span className="period">.</span>
      </h2>
    </RevealBlock>
  )
}

function AboutSection() {
  return (
    <section className="content-section about-section" id="about">
      <div className="content-container">
        <div className="section-head">
          <SectionTitle number="03" title="About" />
        </div>

        <div className="about-layout">
          <RevealBlock className="about-lead">
            <h3>We turn scattered marketing into focused growth systems.</h3>
            <p>
              Most brands do not need more noise. They need a clear offer, a website that explains it fast, creative
              that matches the market, and a funnel that keeps working after the first click.
            </p>
            <p>
              spikxlabs helps you connect those pieces. We combine strategy, design, copy, and campaign execution so
              your brand feels consistent from the first ad impression to the final sales conversation.
            </p>
          </RevealBlock>

          <div className="highlight-list">
            {aboutHighlights.map((highlight, index) => (
              <RevealBlock as="article" className="highlight-item" delay={index * 90} key={highlight}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{highlight}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceDetails() {
  return (
    <section className="content-section service-details" id="services-detail">
      <div className="content-container">
        <div className="section-head">
          <RevealBlock className="section-title">
            <h2>What we build</h2>
          </RevealBlock>
          <RevealBlock className="section-action" delay={120}>
            <a href="#contact">Start a Sprint</a>
          </RevealBlock>
        </div>

        <div className="service-detail-grid">
          {serviceDetails.map((service, index) => (
            <RevealBlock as="article" className="service-detail-card" delay={index * 80} key={service.title}>
              <div>
                <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
              <div>
                <h4>Includes</h4>
                <ul>
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className="best-for">
                <strong>Best for:</strong> {service.bestFor}
              </p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const filteredProjects = useMemo(
    () => projects.filter((project) => project.tags.includes(activeFilter)),
    [activeFilter],
  )

  return (
    <section className="projects-section" id="project">
      <div className="content-container">
        <div className="section-head">
          <RevealBlock className="section-title">
            <h2>
              <span>04</span>
              Selected projects<span className="period">.</span>
            </h2>
          </RevealBlock>

          <RevealBlock className="section-action" delay={120}>
            <a href="#contact">Show More</a>
          </RevealBlock>
        </div>

        <RevealBlock className="filter-row" delay={120}>
          {filters.map((filter) => (
            <button
              className={filter === activeFilter ? 'is-active' : ''}
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </RevealBlock>

        <div className="project-grid" aria-live="polite">
          {filteredProjects.map((project, index) => (
            <RevealBlock as="article" className="project-card" delay={index * 120} key={project.title}>
              <div className="project-media">
                <img src={project.image} alt={`${project.title} campaign preview`} />
                <div className="project-overlay">
                  <a href="#contact" aria-label={`View ${project.title}`}>
                    <span>
                      <ExternalLink size={22} />
                    </span>
                    <strong>View Project</strong>
                  </a>
                </div>
              </div>

              <div className="project-info">
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span>{project.year}</span>
                </div>
                <p>{project.description}</p>
                <p className="project-result">{project.result}</p>
                <div className="project-meta">
                  <span>{project.client}</span>
                  <span>{project.type}</span>
                </div>
                <div className="project-deliverables">
                  {project.deliverables.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock className="center-action" delay={160}>
          <a href="#contact">View All Projects</a>
        </RevealBlock>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="content-section process-section" id="process">
      <div className="content-container">
        <div className="section-head">
          <SectionTitle number="05" title="How the sprint works" />
        </div>

        <div className="process-list">
          {processSteps.map((step, index) => (
            <RevealBlock as="article" className="process-item" delay={index * 100} key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="content-section testimonials-section">
      <div className="content-container">
        <div className="section-head">
          <SectionTitle number="06" title="What clients say" />
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <RevealBlock as="figure" className="testimonial-card" delay={index * 120} key={testimonial.client}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>{testimonial.client}</figcaption>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="content-section faq-section">
      <div className="content-container">
        <div className="section-head">
          <SectionTitle number="07" title="Questions before we start" />
        </div>

        <div className="faq-list">
          {faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index
            return (
              <RevealBlock as="article" className={`faq-item ${isOpen ? 'is-open' : ''}`} delay={index * 45} key={question}>
                <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                  <span>{question}</span>
                  <span aria-hidden="true">{isOpen ? '-' : '+'}</span>
                </button>
                <p>{answer}</p>
              </RevealBlock>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="content-section contact-section" id="contact">
      <div className="content-container">
        <div className="contact-panel">
          <RevealBlock className="contact-copy">
            <span className="card-number">08</span>
            <h2>Got an idea worth sharing?</h2>
            <p>
              Tell us what you are building, what is not working, and what you want to improve. We will help you shape
              the next smart sprint.
            </p>
            <a href="mailto:hello@spikxlabs.com">Get in Touch</a>
          </RevealBlock>

          <RevealBlock className="brief-fields" delay={160}>
            <h3>Project brief fields</h3>
            <div>
              {formFields.map((field) => (
                <span key={field}>{field}</span>
              ))}
            </div>
            <p>Thanks for reaching out. We will review your project and reply with next steps soon.</p>
          </RevealBlock>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const openEmail = () => {
    const subject = encodeURIComponent("Let's work together")
    const body = encodeURIComponent('Hi spikxlabs,\n\nI want to discuss a marketing sprint.\n\nBest,')
    window.location.href = `mailto:hello@spikxlabs.com?subject=${subject}&body=${body}`
  }

  return (
    <footer className="footer-section" id="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="footer-brand" href="#top" aria-label="spikxlabs home">
              <span className="logo-frame" aria-hidden="true">
                <img src={logoSrc} alt="" />
              </span>
              <span>spikxlabs</span>
            </a>
            <p>
              A focused marketing agency building conversion websites, campaign systems, and practical growth assets
              for ambitious teams.
            </p>
            <div className="availability">
              <span />
              Available for selected growth sprints
            </div>
          </div>

          <div className="footer-nav-groups">
            <div className="footer-group">
              <h3>Company</h3>
              <ul>
                {footerCompanyLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-group">
              <h3>Services</h3>
              <ul>
                {footerServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            <div className="footer-group footer-contact-card">
              <h3>Contact</h3>
              <a className="footer-contact-link" href="mailto:hello@spikxlabs.com">
                hello@spikxlabs.com
              </a>
              <p>Remote-first team helping founders turn sharper positioning into measurable demand.</p>
              <button type="button" onClick={openEmail}>
                Start a Sprint
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright 2026 spikxlabs. All rights reserved.</p>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@spikxlabs.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      window.location.href = 'mailto:hello@spikxlabs.com'
    }
  }

  return (
    <div className="site-shell">
      <FixedHero copied={copied} onCopy={copyEmail} />
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="scroll-content">
        <div className="hero-spacer" aria-hidden="true" />
        <SkillStack />
        <AboutSection />
        <ServiceDetails />
        <Projects />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}

export default App
