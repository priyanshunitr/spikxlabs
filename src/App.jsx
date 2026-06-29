import { useEffect, useMemo, useRef, useState } from 'react'
import Matter from 'matter-js'
import { ArrowUpRight, Copy, ExternalLink, Globe, Mail, Menu, X } from 'lucide-react'
import appDev from './assets/reference/reference-appdev.png'
import fullStack from './assets/reference/reference-fullstack.png'
import uiDesign from './assets/reference/reference-ui.png'
import codeProject from './assets/reference/reference-code.png'
import prepProject from './assets/reference/reference-prepai.png'
import renameProject from './assets/reference/reference-rename.png'

const logoSrc = '/logo.jpg'

const navItems = [
  { label: 'About', href: '#top' },
  { label: 'Project', href: '#project' },
  { label: 'Work', href: '#work' },
]

const socials = [
  { label: 'Email', href: 'mailto:hello@spikxlabs.com', icon: Mail },
  { label: 'Website', href: '#project', icon: Globe },
  { label: 'Book Call', href: '#contact', icon: ArrowUpRight },
]

const skills = [
  {
    title: 'WEB DESIGN',
    description: 'We design and ship conversion-focused websites with clear positioning, fast pages, and sharp visual systems.',
    image: appDev,
    tags: ['Landing pages', 'Webflow/React', 'UX copy', 'Speed optimization'],
  },
  {
    title: 'GROWTH SYSTEM',
    description: 'Scalable campaign systems built around paid acquisition, analytics, CRM flows, and repeatable testing.',
    image: fullStack,
    tags: ['Funnels', 'Analytics', 'CRM', 'Automation', 'AI workflows'],
  },
  {
    title: 'BRAND CREATIVE',
    description: 'Minimal brand direction, social campaigns, launch visuals, and content kits built for teams that move quickly.',
    image: uiDesign,
    tags: ['Brand strategy', 'Creative testing', 'Social assets', 'Launch kits'],
  },
]

const filters = ['Growth', 'Websites', 'Performance', 'Brand']

const projects = [
  {
    title: 'LaunchPad Sprint',
    year: '2026',
    description: 'High-converting launch page, campaign angle testing, and analytics setup for a SaaS product rollout.',
    client: 'B2B SaaS',
    type: 'Growth',
    tags: ['Growth', 'Websites'],
    image: codeProject,
  },
  {
    title: 'Creator Funnel',
    year: '2025',
    description: 'Creator-led landing funnel with paid social assets, lead magnet flow, and CRM follow-up sequence.',
    client: 'Education Brand',
    type: 'Performance',
    tags: ['Performance', 'Brand'],
    image: prepProject,
  },
  {
    title: 'Retention Studio',
    year: '2025',
    description: 'Lifecycle email system, offer hierarchy, and repeat-purchase campaign kit for an ecommerce team.',
    client: 'D2C Team',
    type: 'Brand',
    tags: ['Growth', 'Brand'],
    image: renameProject,
  },
]

const workItems = [
  {
    period: 'JANUARY, 2026 - CURRENT',
    title: 'spikxlabs (Marketing Agency)',
    duration: 'Active',
    description:
      'Building focused marketing systems for startups and local service brands: conversion websites, launch campaigns, paid-social testing, funnel copy, and retention journeys.',
  },
  {
    period: '2024 - 2025',
    title: 'Growth Partner Projects',
    duration: '20+ launches',
    description:
      'Partnered with founders on brand refreshes, landing pages, performance creative, and analytics cleanups. Every sprint ships with a clear offer, a measurable funnel, and content the team can keep using.',
  },
]

const footerWords = [
  'Strategy',
  'Funnels',
  'Landing Pages',
  'Creative',
  'Meta Ads',
  'SEO',
  'Email',
  'Analytics',
  'Brand',
  'Content',
  'Automation',
  'Retargeting',
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function drawRoundRect(ctx, x, y, width, height, radius) {
  if (ctx.roundRect) {
    ctx.roundRect(x, y, width, height, radius)
    return
  }

  const r = Math.min(radius, width / 2, height / 2)
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
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

function useFooterPhysics(canvasRef, containerRef, active) {
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!active || !canvas || !container) return undefined

    const colors = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#06b6d4', '#84cc16']
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animationFrame = 0
    let resetTimer = 0
    let engine = null
    let runner = null
    let bodies = []

    const disposeWorld = () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(resetTimer)
      if (runner) Matter.Runner.stop(runner)
      if (engine) Matter.Engine.clear(engine)
      engine = null
      runner = null
      bodies = []
    }

    const setupWorld = () => {
      disposeWorld()
      const rect = container.getBoundingClientRect()
      const width = Math.max(rect.width, 320)
      const height = Math.max(rect.height, 560)
      const ratio = window.devicePixelRatio || 1

      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

      engine = Matter.Engine.create()
      engine.world.gravity.y = 0.82
      runner = Matter.Runner.create()

      const walls = [
        Matter.Bodies.rectangle(width / 2, height + 18, width, 36, { isStatic: true }),
        Matter.Bodies.rectangle(-18, height / 2, 36, height, { isStatic: true }),
        Matter.Bodies.rectangle(width + 18, height / 2, 36, height, { isStatic: true }),
        Matter.Bodies.rectangle(width / 2, -18, width, 36, { isStatic: true }),
      ]

      bodies = footerWords.map((word, index) => {
        const chipWidth = Math.max(word.length * 12 + 36, 92)
        const x = 70 + Math.random() * Math.max(width - 140, 1)
        const y = 60 + Math.random() * 160
        const body = Matter.Bodies.rectangle(x, y, chipWidth, 42, {
          restitution: 0.62,
          friction: 0.45,
          frictionAir: 0.018,
          density: 0.001,
        })

        body.labelText = word
        body.labelColor = colors[index % colors.length]
        body.chipWidth = chipWidth
        return body
      })

      const mouse = Matter.Mouse.create(canvas)
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.18,
          render: { visible: false },
        },
      })

      Matter.Composite.add(engine.world, [...walls, ...bodies, mouseConstraint])
      Matter.Runner.run(runner, engine)

      const draw = () => {
        ctx.clearRect(0, 0, width, height)
        bodies.forEach((body) => {
          const chipWidth = body.chipWidth
          ctx.save()
          ctx.translate(body.position.x, body.position.y)
          ctx.rotate(body.angle)
          ctx.beginPath()
          drawRoundRect(ctx, -chipWidth / 2, -21, chipWidth, 42, 21)
          ctx.fillStyle = body.labelColor
          ctx.fill()
          ctx.fillStyle = '#ffffff'
          ctx.font = '700 16px Geist, Arial, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(body.labelText, 0, 1)
          ctx.restore()
        })
        animationFrame = window.requestAnimationFrame(draw)
      }

      draw()
    }

    const onResize = () => {
      window.clearTimeout(resetTimer)
      resetTimer = window.setTimeout(setupWorld, 180)
    }

    setupWorld()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      disposeWorld()
    }
  }, [active, canvasRef, containerRef])
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
                <h1>spikx</h1>
                <h1>labs</h1>
              </div>

              <div className="role-line">
                <span>Marketing agency, growth partner</span>
                <button className="copy-btn" type="button" onClick={onCopy} aria-label="Copy email address">
                  <Copy size={16} />
                </button>
                <span className={`copy-note ${copied ? 'is-visible' : ''}`}>Copied</span>
              </div>

              <div className="social-links" aria-label="Social links">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a href={href} key={label} aria-label={label}>
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-right">
              <div className="brand-mark-hero">
                <img src={logoSrc} alt="spikxlabs logo" />
              </div>
              <p>
                Hello, we build minimal brand systems, fast launch pages, and measurable growth campaigns for teams
                that want sharper marketing without extra noise. Let&apos;s create!
              </p>
            </div>
          </div>

          <div className="hero-section-row">
            <h2>
              <span>02</span>
              Skills<span className="period">.</span>
            </h2>
            <a className="resume-link" href="#contact">
              Start Sprint
            </a>
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
              id={index === 0 ? 'skill' : undefined}
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
              <span>03</span>
              Project<span className="period">.</span>
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
                <div className="project-meta">
                  <span>{project.client}</span>
                  <span>{project.type}</span>
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

function WorkExperience() {
  return (
    <section className="work-section" id="work">
      <div className="content-container">
        <div className="work-heading">
          <RevealBlock className="number-reveal">
            <span>04</span>
          </RevealBlock>
          <RevealBlock className="work-title" delay={180}>
            <h2>Work Experience</h2>
          </RevealBlock>
        </div>

        <div className="experience-list">
          {workItems.map((item, index) => (
            <RevealBlock as="article" className="experience-item" delay={index * 160} key={item.title}>
              <p className="period-label">{item.period}</p>
              <div className="experience-heading">
                <h3>{item.title}</h3>
                <div className="duration">
                  <span className="divider">|</span>
                  <span>{item.duration}</span>
                </div>
              </div>
              <p className="experience-copy">{item.description}</p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [footerRef, footerVisible] = useReveal({ threshold: 0.28, rootMargin: '0px 0px -8% 0px' })
  const canvasRef = useRef(null)
  useFooterPhysics(canvasRef, footerRef, footerVisible)

  const openEmail = () => {
    const subject = encodeURIComponent("Let's work together")
    const body = encodeURIComponent('Hi spikxlabs,\n\nI want to discuss a marketing sprint.\n\nBest,')
    window.location.href = `mailto:hello@spikxlabs.com?subject=${subject}&body=${body}`
  }

  return (
    <footer className={`footer-section ${footerVisible ? 'is-live' : ''}`} id="contact" ref={footerRef}>
      <div className="footer-cover" />
      <canvas className="footer-canvas" ref={canvasRef} aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-topline">
          <a className="footer-brand" href="#top">
            <span className="logo-frame" aria-hidden="true">
              <img src={logoSrc} alt="" />
            </span>
            <span>spikxlabs</span>
          </a>
          <div className="footer-links">
            <a href="mailto:hello@spikxlabs.com">Email</a>
            <a href="#project">Projects</a>
            <a href="#top">Top</a>
          </div>
        </div>

        <div className="footer-message">
          <h2>
            Got an idea <span>worth sharing?</span>
          </h2>
          <h3>
            Let&apos;s bring <strong>something extraordinary</strong> <span>to life!</span>
          </h3>
        </div>

        <div className="footer-cta">
          <button type="button" onClick={openEmail}>
            Get in Touch
          </button>
          <div className="availability">
            <span />
            Available For Work
          </div>
        </div>
      </div>

      <span className="footer-dot" aria-hidden="true" />
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
        <Projects />
        <WorkExperience />
        <Footer />
      </main>
    </div>
  )
}

export default App
