import { nextTick, onBeforeUnmount, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function usePortfolioMotion(root, isReady) {
  let context
  let media

  function clearMotion() {
    media?.revert()
    context?.revert()
    media = undefined
    context = undefined
  }

  function setupMotion() {
    if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    context = gsap.context(() => {
      const select = gsap.utils.selector(root.value)
      media = gsap.matchMedia()

      media.add('(min-width: 861px)', () => {
        const hero = select('[data-scene="hero"]')[0]
        const capabilities = select('[data-scene="capabilities"]')[0]
        const manifesto = select('[data-scene="manifesto"]')[0]
        const toolkit = select('[data-scene="toolkit"]')[0]

        gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
          .to(select('.hero-title'), { scale: 0.84, yPercent: -26, transformOrigin: '50% 70%' }, 0)
          .to(select('.hero-title-line'), { xPercent: (index) => [-13, 10, -6][index] }, 0)
          .to(select('.hero-meta-right'), { yPercent: -90, opacity: 0 }, 0)
          .to(select('.hero-caption'), { yPercent: 70, opacity: 0 }, 0)

        gsap.timeline({
          scrollTrigger: {
            trigger: capabilities,
            start: 'top top',
            end: '+=130%',
            pin: select('.capability-pin')[0],
            scrub: 1,
          },
        })
          .from(select('.capability-word'), {
            xPercent: (index) => [-85, 75, -62, 80, -48, 60][index],
            yPercent: (index) => [95, -90, 76, -70, 80, -75][index],
            rotation: (index) => [-11, 8, -7, 10, -8, 7][index],
            opacity: 0,
            stagger: 0.08,
          }, 0)
          .to(select('.capability-word'), {
            xPercent: (index) => [-34, 27, -24, 30, -18, 20][index],
            yPercent: (index) => [-18, 13, -10, 16, -14, 11][index],
            rotation: 0,
            stagger: 0.04,
          }, 0.58)
          .from(select('.capability-core'), { scale: 0.72, opacity: 0 }, 0.32)
          .to(select('.capability-core'), { scale: 1.05 }, 0.7)

        gsap.timeline({
          scrollTrigger: {
            trigger: manifesto,
            start: 'top top',
            end: '+=115%',
            pin: select('.manifesto-pin')[0],
            scrub: 1,
          },
        })
          .from(select('.manifesto-title-line'), { xPercent: -42, opacity: 0, stagger: 0.1 }, 0)
          .from(select('.manifesto-rule'), { scaleX: 0, transformOrigin: 'left', stagger: 0.08 }, 0.25)
          .from(select('.manifesto-step'), { y: 72, opacity: 0, stagger: 0.12 }, 0.42)
          .to(select('.manifesto-stamp'), { rotation: 8, scale: 1.08 }, 0.55)

        select('.project-scene').forEach((scene) => {
          const kind = scene.dataset.project
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scene,
              start: 'top 75%',
              end: 'bottom 35%',
              scrub: 0.8,
            },
          })

          if (kind === 'supply') {
            timeline.from(select('.supply-card'), {
              xPercent: (index) => [18, -20, 25, -17, 14][index],
              yPercent: (index) => [35, 28, 48, 24, 42][index],
              rotation: (index) => [5, -4, 6, -5, 4][index],
              opacity: 0,
              stagger: 0.08,
            })
          }

          if (kind === 'task') {
            timeline
              .from(select('.task-track'), { scaleY: 0, transformOrigin: 'top' }, 0)
              .from(select('.task-node'), { y: 60, opacity: 0, stagger: 0.1 }, 0.12)
              .from(select('.task-copy'), { x: 56, opacity: 0 }, 0.2)
          }

          if (kind === 'attendance') {
            timeline.from(select('.attendance-card'), {
              yPercent: (index) => [24, -18, 20, -26][index],
              xPercent: (index) => [-12, 12, -8, 10][index],
              rotation: (index) => [-3, 2, -2, 3][index],
              opacity: 0,
              stagger: 0.08,
            })
          }
        })

        gsap.timeline({
          scrollTrigger: {
            trigger: toolkit,
            start: 'top top',
            end: '+=120%',
            pin: select('.toolkit-pin')[0],
            scrub: 1,
          },
        })
          .from(select('.toolkit-ghost'), {
            xPercent: (index) => [-65, 70, -58, 62][index],
            yPercent: (index) => [-38, 42, 48, -44][index],
            opacity: 0,
            stagger: 0.08,
          }, 0)
          .from(select('.toolkit-axis'), { scale: 0, transformOrigin: 'center', stagger: 0.1 }, 0.2)
          .from(select('.toolkit-focus'), { y: 48, opacity: 0, stagger: 0.09 }, 0.42)

        return () => undefined
      })

      media.add('(max-width: 860px)', () => {
        select('[data-mobile-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 36,
            opacity: 0,
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              end: 'top 54%',
              scrub: 0.7,
            },
          })
        })

        return () => undefined
      })
    }, root.value)

    ScrollTrigger.refresh()
  }

  watch(
    isReady,
    async (ready) => {
      clearMotion()
      if (!ready) return

      await nextTick()
      window.requestAnimationFrame(setupMotion)
    },
    { immediate: true },
  )

  onBeforeUnmount(clearMotion)
}
