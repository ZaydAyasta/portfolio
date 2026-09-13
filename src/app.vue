<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ShuffleText from './shared/presentation/components/ShuffleText.vue'
import { usePortfolioMotion } from './shared/presentation/composables/usePortfolioMotion'

const portfolioRoot = ref(null)
const introDone = ref(false)
let introTimer

const supplyScreens = [
  { src: '/ec-dashboard.png', label: 'Kitchen dashboard', alt: 'SupplyWok kitchen dashboard' },
  { src: '/ec-inventory.png', label: 'Inventory control', alt: 'SupplyWok inventory control view' },
  { src: '/ec-orders.png', label: 'Purchase orders', alt: 'SupplyWok purchase orders view' },
  { src: '/ec-create-kitchen-tickets.png', label: 'Kitchen flow', alt: 'SupplyWok kitchen ticket form' },
  { src: '/ec-alerts.png', label: 'Operational alerts', alt: 'SupplyWok alerts view' },
]

const attendanceScreens = [
  { src: '/attendance-dashboard.jpg', label: 'Operations dashboard', alt: 'Attendance System dashboard' },
  { src: '/attendance-records.jpg', label: 'Attendance records', alt: 'Attendance System attendance records' },
  { src: '/attendance-reports.jpg', label: 'Reporting', alt: 'Attendance System reporting view' },
  { src: '/attendance-users.jpg', label: 'User administration', alt: 'Attendance System user administration' },
]

usePortfolioMotion(portfolioRoot, introDone)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    introDone.value = true
    return
  }

  introTimer = window.setTimeout(() => {
    introDone.value = true
  }, 3000)
})

onBeforeUnmount(() => {
  window.clearTimeout(introTimer)
})
</script>

<template>
  <div v-if="!introDone" class="intro-backdrop" aria-hidden="true"></div>

  <main ref="portfolioRoot" class="portfolio-shell" :class="{ 'intro-running': !introDone }">
    <header class="site-header" aria-label="Primary navigation">
      <ShuffleText class="brand" href="#top" text="Zayd Ayasta" label="Go to top" />
      <nav class="site-nav">
        <ShuffleText href="#capabilities" text="capabilities" />
        <ShuffleText href="#work" text="work" />
        <ShuffleText href="#contact" text="contact" />
      </nav>
      <p class="availability">available for small projects</p>
    </header>

    <section id="top" class="hero-scene scene" data-scene="hero" aria-labelledby="hero-title">
      <div class="hero-grid">
        <p class="hero-place">based in Lima<br />working worldwide</p>
        <div class="hero-caption" data-mobile-reveal>
          software engineering student<br />building practical systems
        </div>
        <div class="hero-meta-right">scroll slowly.<br />watch it assemble.</div>
        <h1 id="hero-title" class="hero-title">
          <span class="hero-title-line">backend</span>
          <span class="hero-title-line">full-stack</span>
          <span class="hero-title-line">developer.</span>
        </h1>
        <p class="hero-index">01 / portfolio 2026</p>
      </div>
    </section>

    <section id="capabilities" class="capability-scene scene" data-scene="capabilities" aria-labelledby="capability-title">
      <div class="capability-pin scene-pin">
        <p class="scene-kicker">capabilities / 02</p>
        <div class="capability-field" data-mobile-reveal>
          <span class="capability-word">REST APIs</span>
          <span class="capability-word">Vue 3</span>
          <span class="capability-word">DDD</span>
          <span class="capability-word">Spring Boot</span>
          <span class="capability-word">PostgreSQL</span>
          <span class="capability-word">JWT</span>
          <div class="capability-core">
            <p>from contracts</p>
            <h2 id="capability-title">to product<br />flows.</h2>
            <p>backend and full-stack systems</p>
          </div>
        </div>
        <p class="scene-note">Scroll drives the system. Nothing runs without a reason.</p>
      </div>
    </section>

    <section class="manifesto-scene scene" data-scene="manifesto" aria-labelledby="manifesto-title">
      <div class="manifesto-pin scene-pin">
        <div class="manifesto-heading" data-mobile-reveal>
          <p class="scene-kicker">how I build / 03</p>
          <h2 id="manifesto-title">
            <span class="manifesto-title-line">reason</span>
            <span class="manifesto-title-line">before</span>
            <span class="manifesto-title-line">motion.</span>
          </h2>
        </div>
        <div class="manifesto-stamp" aria-hidden="true">F5<br />DETAILS</div>
        <div class="manifesto-steps" data-mobile-reveal>
          <article class="manifesto-step">
            <span class="manifesto-rule"></span>
            <p>01 / model</p>
            <h3>Domain rules before endpoints.</h3>
          </article>
          <article class="manifesto-step">
            <span class="manifesto-rule"></span>
            <p>02 / connect</p>
            <h3>Interfaces that respect real workflows.</h3>
          </article>
          <article class="manifesto-step">
            <span class="manifesto-rule"></span>
            <p>03 / verify</p>
            <h3>Contracts, tests and useful documentation.</h3>
          </article>
        </div>
      </div>
    </section>

    <section id="work" class="work-section" aria-labelledby="work-title">
      <header class="work-intro" data-mobile-reveal>
        <p class="scene-kicker">selected work / 04</p>
        <h2 id="work-title">products that<br />hold up under use.</h2>
        <p>Three systems, each built around operational rules instead of decorative screens.</p>
      </header>

      <article class="project-scene project-supply" data-project="supply" data-mobile-reveal>
        <div class="project-marker">01 / SupplyWok</div>
        <div class="project-layout">
          <div class="supply-stack" aria-label="SupplyWok product screens">
            <figure v-for="(screen, index) in supplyScreens" :key="screen.src" class="supply-card" :class="`supply-card-${index + 1}`">
              <img :src="screen.src" :alt="screen.alt" :loading="index === 0 ? 'eager' : 'lazy'" decoding="async" />
              <figcaption>{{ screen.label }}</figcaption>
            </figure>
          </div>
          <div class="project-copy">
            <p class="project-stack">Vue 3 / ASP.NET Core</p>
            <h3>SupplyWok<br />Web Platform</h3>
            <p>Purchasing and supply flows for restaurant teams: dashboards, inventory, purchase orders, kitchen tickets, alerts, JWT-protected routes and Stripe subscriptions.</p>
            <ul class="project-tags" aria-label="SupplyWok highlights">
              <li>Purchasing flow</li>
              <li>REST APIs</li>
              <li>JWT + Stripe</li>
            </ul>
          </div>
        </div>
      </article>

      <article class="project-scene project-task" data-project="task" data-mobile-reveal>
        <div class="project-marker">02 / Task Manager</div>
        <div class="project-layout">
          <div class="task-board" aria-label="Task Manager workflow">
            <span class="task-track" aria-hidden="true"></span>
            <span class="task-node">project</span>
            <span class="task-node">stages</span>
            <span class="task-node">tasks</span>
            <span class="task-node">blockers</span>
            <span class="task-node">review</span>
            <span class="task-node">done</span>
            <span class="task-signal">Nakama internal product</span>
          </div>
          <div class="project-copy task-copy">
            <p class="project-stack">Vue 3 / ASP.NET Core / PostgreSQL</p>
            <h3>Task<br />Manager</h3>
            <p>Internal system for projects, stages and team tasks with priorities, due dates, dependencies, blockers, review, notifications and immutable activity history.</p>
            <ul class="project-tags" aria-label="Task Manager highlights">
              <li>Role-based access</li>
              <li>Audit trail</li>
              <li>Team workflows</li>
            </ul>
            <a class="project-link" href="https://github.com/ZaydAyasta/tasks-manager" target="_blank" rel="noreferrer">view source -></a>
          </div>
        </div>
      </article>

      <article class="project-scene project-attendance" data-project="attendance" data-mobile-reveal>
        <div class="project-marker">03 / Attendance System</div>
        <div class="project-layout">
          <div class="attendance-sheet" aria-label="Attendance System screens">
            <figure v-for="screen in attendanceScreens" :key="screen.src" class="attendance-card">
              <img :src="screen.src" :alt="screen.alt" loading="lazy" decoding="async" />
              <figcaption>{{ screen.label }}</figcaption>
            </figure>
          </div>
          <div class="project-copy">
            <p class="project-stack">Vue 3 / ASP.NET Core / PostgreSQL</p>
            <h3>Attendance<br />System</h3>
            <p>Employee attendance management through signed dynamic QR checkpoints, operational reporting, work calendars, roles and append-only administrative audit.</p>
            <ul class="project-tags" aria-label="Attendance System highlights">
              <li>Dynamic QR</li>
              <li>Operational reports</li>
              <li>Modular monolith</li>
            </ul>
            <a class="project-link" href="https://github.com/ZaydAyasta/attendance-system" target="_blank" rel="noreferrer">view source -></a>
          </div>
        </div>
      </article>
    </section>

    <section class="toolkit-scene scene" data-scene="toolkit" aria-labelledby="toolkit-title">
      <div class="toolkit-pin scene-pin">
        <p class="scene-kicker">backend toolkit / 05</p>
        <div class="toolkit-field" data-mobile-reveal>
          <span class="toolkit-ghost">apis</span>
          <span class="toolkit-ghost">data</span>
          <span class="toolkit-ghost">auth</span>
          <span class="toolkit-ghost">tests</span>
          <span class="toolkit-axis toolkit-axis-v" aria-hidden="true"></span>
          <span class="toolkit-axis toolkit-axis-h" aria-hidden="true"></span>
          <div class="toolkit-focus">
            <p>contracts</p>
            <p>persistence</p>
            <p>security</p>
            <p>verification</p>
          </div>
        </div>
        <div class="toolkit-copy" data-mobile-reveal>
          <h2 id="toolkit-title">Backend<br />Toolkit</h2>
          <p>JavaScript, TypeScript, C#, Java, SQL, ASP.NET Core, Spring Boot, Entity Framework Core, MySQL, PostgreSQL, OpenAPI and Postman.</p>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-scene scene" aria-labelledby="contact-title">
      <div class="contact-grid" data-mobile-reveal>
        <p class="scene-kicker">contact / 06</p>
        <h2 id="contact-title">open to<br />backend<br /><span>practice.</span></h2>
        <p class="contact-copy">Available for internships, backend practice and focused product work.</p>
        <div class="contact-actions">
          <ShuffleText href="mailto:zayd.ayasta.dos@gmail.com" text="mail" />
          <ShuffleText href="https://zaydayasta.dev/" text="web" target="_blank" rel="noreferrer" />
          <ShuffleText href="https://github.com/ZaydAyasta" text="github" target="_blank" rel="noreferrer" />
        </div>
      </div>
    </section>

    <footer class="site-footer" aria-label="Footer">
      <div class="footer-signature" aria-label="made with hate">
        <span>made with</span>
        <span class="footer-emotion" data-ghost="love">hate</span>
      </div>
      <p>Useful software is forged in constraints, contracts and annoying edge cases.</p>
      <span class="footer-detail">F5 = details.</span>
      <span class="footer-year" aria-label="Copyright 2026">&copy;26</span>
    </footer>
  </main>
</template>
