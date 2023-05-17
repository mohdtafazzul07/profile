
(function() {
  "use strict";

  
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

 
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)


  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

 // Skills content
let skillsContent = document.querySelector('.skills-content');
if (skillsContent) {
  let progressBars = Array.from(document.querySelectorAll('.progress .progress-bar'));

  function updateProgressBarWidth() {
    progressBars.forEach((el) => {
      el.style.width = el.getAttribute('aria-valuenow') + '%';
    });
  }

  let skillsWaypoint = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateProgressBarWidth();
        }
      });
    },
    {
      threshold: 0.8 // 80% visibility threshold
    }
  );

  skillsWaypoint.observe(skillsContent);
}

// Testimonials slider
new Swiper('.testimonials-slider', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

// Portfolio filters
window.addEventListener('load', () => {
  let portfolioContainer = document.querySelector('.portfolio-container');
  if (portfolioContainer) {
    let portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
    let portfolioFilters = Array.from(document.querySelectorAll('#portfolio-flters li'));

    function filterPortfolioItems(filter) {
      portfolioItems.forEach((item) => {
        if (filter === 'all' || item.getAttribute('data-filter') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    portfolioFilters.forEach((filter) => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        portfolioFilters.forEach((el) => {
          el.classList.remove('filter-active');
        });
        filter.classList.add('filter-active');

        filterPortfolioItems(filter.getAttribute('data-filter'));
      });
    });

    filterPortfolioItems('all');
  }
});

// Portfolio lightbox
const portfolioLightbox = GLightbox({
  selector: '.portfolio-lightbox'
});


// Portfolio details lightbox
const portfolioDetailsLightbox = GLightbox({
  selector: '.portfolio-details-lightbox',
  width: '90%',
  height: '90vh'
});


 
  new Swiper('.portfolio-details-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  
  new PureCounter();

})()