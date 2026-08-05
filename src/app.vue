<script setup>
import { onMounted, ref } from 'vue'
import BuildWords from './shared/presentation/components/BuildWords.vue'
import ShuffleText from './shared/presentation/components/ShuffleText.vue'

const introDone = ref(false)

const services = [
  'REST APIs',
  'Backend development',
  'Full-stack modules',
  'JWT authentication',
  'DDD architecture',
  'Payment integrations',
]

const projects = [
  {
    number: '01',
    title: 'SupplyWok',
    type: 'Vue 3 + ASP.NET Core',
    year: '2026',
    summary: 'Led the purchasing and supply module, integrating frontend, REST APIs, business rules, JWT-protected routes, Stripe payments and CRUD flows for purchase orders.',
    imagePosition: 'left center',
  },
  {
    number: '02',
    title: 'SupplyWok Open Source',
    type: 'Angular + Spring Boot',
    year: '2026',
    summary: 'Built supply and purchasing services with Spring Boot, Spring Data JPA, PostgreSQL, domain rules, REST endpoints and Angular integration.',
    imagePosition: 'center center',
  },
  {
    number: '03',
    title: 'Backend Toolkit',
    type: 'APIs + data + security',
    year: '2026',
    summary: 'Hands-on stack focused on JavaScript, TypeScript, C#, Java, SQL, ASP.NET Core, Spring Boot, Entity Framework Core, MySQL, PostgreSQL, OpenAPI and testing with Postman.',
    imagePosition: 'right center',
  },
]

const skills = [
  'JavaScript',
  'TypeScript',
  'C#',
  'Java',
  'SQL',
  'Vue 3',
  'Angular',
  'Pinia',
  'PrimeVue',
  'ASP.NET Core',
  'Spring Boot',
  'Entity Framework Core',
  'Spring Data JPA',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'JWT',
  'Stripe',
  'Swagger/OpenAPI',
  'Postman',
  'GitHub',
  'Scrum',
]

onMounted(() => {
  window.setTimeout(() => {
    introDone.value = true
  }, 4700)
})
</script>

<template>
  <div v-if="!introDone" class="intro-backdrop" aria-hidden="true"></div>
  <main class="portfolio-shell" :class="{ 'intro-running': !introDone }">
    <header class="site-header" aria-label="Primary navigation">
      <ShuffleText class="brand" href="#top" text="Zayd Ayasta" label="Go to top" />
      <nav class="site-nav">
        <ShuffleText href="#about" text="about" />
        <ShuffleText href="#work" text="work" />
        <ShuffleText href="#contact" text="contact" />
      </nav>
      <p class="availability">available for small projects</p>
    </header>

    <section id="top" class="hero-section section-grid">
      <div class="hero-kicker">
        <span>based in Lima</span>
        <span>working worldwide</span>
      </div>

      <div class="hero-copy">
        <p class="intro-line">software engineering student building practical backend and full-stack systems</p>
        <h1>
          <span>backend</span>
          <span>full-stack</span>
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
        <span>building</span>
        <span>systems with</span>
        <span>clear domain</span>
        <span>logic.</span>
      </h2>
      <div class="service-list" aria-label="Services">
        <span v-for="service in services" :key="service">{{ service }}</span>
      </div>
      <div class="skills-list" aria-label="Technical skills">
        <span v-for="skill in skills" :key="skill">{{ skill }}</span>
      </div>
    </section>

    <section class="statement-section section-grid" aria-labelledby="statement-title">
      <div class="stamp">
        <span>F5</span>
        <span>portfolio</span>
      </div>
      <div>
        <p class="section-label">how i work</p>
        <h2 id="statement-title">not just screens. flows, contracts and rules.</h2>
      </div>
      <p class="statement-copy">
        <BuildWords
          :lines="[
            'I design and implement REST APIs, authentication, persistence and frontend integration,',
            'with attention to bounded contexts, business rules, documentation and practical delivery.',
          ]"
          :ready="introDone"
        />
      </p>
    </section>

    <section id="work" class="work-section" aria-labelledby="work-title">
      <div class="work-heading section-grid">
        <p class="section-label">selected work</p>
        <h2 id="work-title">
          <span>relevant</span>
          <span>software</span>
          <span>projects from</span>
          <span>my cv.</span>
        </h2>
        <p>
          <BuildWords
            :lines="[
              'University projects focused on purchasing, supply, inventory relationships,',
              'backend services, API contracts, state management and team delivery.',
            ]"
            :ready="introDone"
          />
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
            <p>
              <BuildWords :lines="[project.summary]" :ready="introDone" />
            </p>
            <div>
              <span>{{ project.type }}</span>
              <span>{{ project.year }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section
      id="contact"
      class="contact-section section-grid"
      data-ghost="drop me a message"
      aria-labelledby="contact-title"
    >
      <p class="section-label">drop me a message</p>
      <h2 id="contact-title">
        <span>open to</span>
        <span>backend</span>
        <span>practice.</span>
      </h2>
      <div class="contact-actions">
        <ShuffleText href="mailto:zayd.ayasta.dos@gmail.com" text="mail" />
        <ShuffleText href="https://zaydayasta.dev/" text="web" target="_blank" rel="noreferrer" />
        <ShuffleText href="https://github.com/ZaydAyasta" text="github" target="_blank" rel="noreferrer" />
      </div>
    </section>

    <footer class="site-footer" aria-label="Footer">
      <div class="footer-signature" aria-label="made with hate">
        <span>made with</span>
        <span class="footer-emotion" data-ghost="love">hate</span>
      </div>
      <p class="footer-note">
        because useful software is forged in constraints, contracts and annoying edge cases.
      </p>
      <p class="footer-detail">F5 is details.</p>
      <p class="footer-year" aria-label="Copyright 2026">&copy;26</p>
    </footer>
  </main>
</template>

