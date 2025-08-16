// Navegación móvil
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Cerrar menú al hacer click en un enlace
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScrollTop = 0

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScrollTop = scrollTop
})

// Active navigation link
const sections = document.querySelectorAll("section")
const navLinksArray = Array.from(navLinks)

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinksArray.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animación de barras de habilidades
const skillBars = document.querySelectorAll(".skill-progress")
const skillsSection = document.getElementById("skills")

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width + "%"
  })
}

// Intersection Observer para animaciones
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "skills") {
        setTimeout(animateSkillBars, 500)
      }

      // Agregar clase para animaciones fade-in
      const fadeElements = entry.target.querySelectorAll(".fade-in")
      fadeElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("visible")
        }, index * 100)
      })
    }
  })
}, observerOptions)

// Observar todas las secciones
sections.forEach((section) => {
  observer.observe(section)
})

// Agregar clase fade-in a elementos que deben animarse
document.addEventListener("DOMContentLoaded", () => {
  // Elementos que se animan al hacer scroll
  const animatedElements = [".project-card", ".skill-category", ".about-paragraph", ".skills-tags"]

  animatedElements.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("fade-in")
    })
  })
})

// Efecto parallax sutil para formas flotantes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".floating-shape")

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Typing effect para el título (opcional)
const heroTitle = document.querySelector(".hero-title")
if (heroTitle) {
  const titleText = heroTitle.textContent
  heroTitle.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < titleText.length) {
      heroTitle.textContent += titleText.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  // Iniciar el efecto después de un pequeño delay
  setTimeout(typeWriter, 1000)
}

// Efecto de partículas en el cursor (opcional)
document.addEventListener("mousemove", (e) => {
  // Crear partícula solo ocasionalmente para mejor rendimiento
  if (Math.random() > 0.8) {
    const cursor = document.createElement("div")
    cursor.className = "cursor-particle"
    cursor.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: var(--neon-purple);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      opacity: 0.8;
      box-shadow: 0 0 10px var(--neon-purple);
      animation: cursorFade 1s ease-out forwards;
    `

    document.body.appendChild(cursor)

    setTimeout(() => {
      cursor.remove()
    }, 1000)
  }
})

// Contador animado mejorado
const animateCounter = (element, target, duration = 2000) => {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    element.textContent = Math.floor(start)

    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    }
  }, 16)
}

// Aplicar contadores cuando sean visibles
document.querySelectorAll(".counter").forEach((counter) => {
  const target = Number.parseInt(counter.getAttribute("data-target"))

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(counter, target)
          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counterObserver.observe(counter)
})

// Preloader (opcional)
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

// Agregar animación CSS para partículas del cursor
const style = document.createElement("style")
style.textContent = `
  @keyframes cursorFade {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
  
  /* Efecto de brillo en hover para elementos interactivos */
  .btn:hover, .project-link:hover, .tech-item:hover {
    filter: brightness(1.1);
  }
  
  /* Animación de escritura mejorada */
  .typing-cursor::after {
    content: '|';
    color: var(--neon-purple);
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`
document.head.appendChild(style)

console.log("🚀 Portfolio elegante de Tobias Emanuel Bogarin - Team Leader cargado correctamente!")
