<script setup>
const services = [
  'UX/UI design',
  'Frontend development',
  'Interaction systems',
  'Product strategy',
  'Design research',
  'Motion details',
]

const projects = [
  {
    number: '01',
    title: 'SupplyWok',
    type: 'SaaS operations',
    year: '2026',
    summary: 'Inventory, purchasing, and kitchen flows for restaurant teams.',
    imagePosition: 'left center',
  },
  {
    number: '02',
    title: 'UrbanTrust',
    type: 'Civic platform',
    year: '2025',
    summary: 'A clear interface for reporting, tracking, and validating city issues.',
    imagePosition: 'center center',
  },
  {
    number: '03',
    title: 'SupportFlow AI',
    type: 'Web platform',
    year: '2026',
    summary: 'Registering, assigning and resolving technical incidents within a company.',
    imagePosition: 'right center',
  },
]
</script>

<template>
  <main class="portfolio-shell">
    <header class="site-header" aria-label="Primary navigation">
      <a class="brand" href="#top" aria-label="Go to top">Zayd Ayasta</a>
      <nav class="site-nav">
        <a href="#about">about</a>
        <a href="#work">work</a>
        <a href="#contact">contact</a>
      </nav>
      <p class="availability">available for small projects</p>
    </header>

    <section id="top" class="hero-section section-grid">
      <div class="hero-kicker">
        <span>based in Lima</span>
        <span>working worldwide</span>
      </div>

      <div class="hero-copy">
        <p class="intro-line">another person behind the screen</p>
        <h1>
          <span>UX/UI</span>
          <span>designer,</span>
          <span>frontend</span>
          <span>developer.</span>
        </h1>
      </div>

      <div class="hero-meta">
        <p>scroll, judge, rewrite.</p>
        <p>zaydayasta.dev</p>
      </div>
    </section>

    <section id="about" class="services-section section-grid" aria-labelledby="services-title">
      <p class="section-label">services</p>
      <h2 id="services-title">
        <span>doing</span>
        <span>design as</span>
        <span>something</span>
        <span>useful.</span>
      </h2>
      <div class="service-list" aria-label="Services">
        <span v-for="service in services" :key="service">{{ service }}</span>
      </div>
    </section>

    <section class="statement-section section-grid" aria-labelledby="statement-title">
      <div class="stamp">
        <span>f'26</span>
        <span>portfolio</span>
      </div>
      <div>
        <p class="section-label">how i work</p>
        <h2 id="statement-title">not magic. just decisions under pressure.</h2>
      </div>
      <p class="statement-copy">
        I take messy ideas, break them down, overthink the details that matter,
        remove the noise, and ship interfaces that people can actually use.
      </p>
    </section>

    <section id="work" class="work-section" aria-labelledby="work-title">
      <div class="work-heading section-grid">
        <p class="section-label">selected work</p>
        <h2 id="work-title">
          <span>a curated</span>
          <span>selection of</span>
          <span>projects that</span>
          <span>felt right.</span>
        </h2>
        <p>
          Replace these placeholders with your real case studies, screenshots,
          and outcomes. Keep the rhythm; change the substance.
        </p>
      </div>

      <div class="project-list">
        <article v-for="project in projects" :key="project.title" class="project-card">
          <div class="project-image-wrap">
            <img
              src="/project-previews.png"
              :alt="`${project.title} project preview placeholder`"
              :style="{ objectPosition: project.imagePosition }"
            />
          </div>
          <div class="project-info">
            <span>{{ project.number }}</span>
            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>
            <div>
              <span>{{ project.type }}</span>
              <span>{{ project.year }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="contact" class="contact-section section-grid" aria-labelledby="contact-title">
      <p class="section-label">drop me a message</p>
      <h2 id="contact-title">
        <span>let's build</span>
        <span>something</span>
        <span>that matters.</span>
      </h2>
      <div class="contact-actions">
        <a href="mailto:hello@zaydayasta.dev">mail</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">linkedin</a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">github</a>
      </div>
    </section>

    <footer class="site-footer">
      <p>made with stubborn attention.</p>
      <p>2026</p>
    </footer>
  </main>
</template>
