const nav = document.querySelector('#headerr nav')

const toggle = document.querySelectorAll('nav .toggle')

const mode = document.querySelectorAll('nav .mode')

const links = document.querySelectorAll('nav ul li a')

const header = document.querySelector('#headerr')

const sections = document.querySelectorAll('main section[id]')

const navHeight = header.offsetHeight

const backToTopButton = document.querySelector('.back-to-top')

function open() {
  if (nav.classList.contains('show') == false) {
    nav.classList.add('show')
  }
}

for (const element of toggle) {
  element.addEventListener('click', function open() {
    nav.classList.toggle('show')
  })
}

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

function changeHeader() {
  if (window.scrollY >= navHeight) {
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
}

/* SLIDER */

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  //retirei o mouse wheel pois estava atrapalhando o scroll da página.
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

// SCROLL REVEAL

const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .text, #home .image,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links,
  footer .brand, footer .social 
`,
  { interval: 100 }
)

// BACK TO TOP

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

// MENU ATIVO CONFORME A SESSÃO VISÍVEL NA PÁGINA

function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

window.addEventListener('scroll', function () {
  changeHeader()
  backToTop()
  activateMenuAtCurrentSection()
})

// DARK MODE

const html = document.querySelector('html')
const checkbox = document.querySelector('input[name=theme]')

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style)

const initialColors = {
  backgroundColor: getStyle(html, '--background-color'),
  textColor: getStyle(html, '--text-color'),
  color: getStyle(html, '--color')
}

const darkMode = {
  backgroundColor: '#333333',
  textColor: '#ffff'
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
  Object.keys(colors).map(key => 
      html.style.setProperty(transformKey(key), colors[key]) 
  )
}

checkbox.addEventListener("change", ({target}) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})
