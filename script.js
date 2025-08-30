// Slider + Lightbox interactions (vanilla JS)
const slides = document.getElementById('slides');
const dots = Array.from(document.querySelectorAll('.dot'));
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;
const intervalMs = 5000; // 5 seconds
let timer = null;

function goTo(i){
  index = (i + dots.length) % dots.length;
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d,di)=>{
    d.setAttribute('aria-current', di===index ? 'true':'false');
  });
}
function start(){}
function stop(){ if(timer){ clearInterval(timer); timer=null; } }

dots.forEach((d,di)=> d.addEventListener('click', ()=>{ stop(); goTo(di); start(); }));
prev.addEventListener('click', ()=>{ stop(); goTo(index-1); start(); });
next.addEventListener('click', ()=>{ stop(); goTo(index+1); start(); });

// Pause on hover/focus for accessibility
document.getElementById('slider').addEventListener('mouseenter', stop);
document.getElementById('slider').addEventListener('mouseleave', start);
document.getElementById('slider').addEventListener('focusin', stop);
document.getElementById('slider').addEventListener('focusout', start);

// start(); // Auto-slide disabled

// Touch swipe (simple)
let startX = null;
slides.addEventListener('touchstart', (e)=>{ startX = e.touches[0].clientX; stop(); }, {passive:true});
slides.addEventListener('touchmove', (e)=>{
  if(startX===null) return;
  const dx = e.touches[0].clientX - startX;
  // No drag translate (simple impl), only threshold to change slides
  if(Math.abs(dx) > 60){
    goTo(index + (dx<0 ? 1 : -1));
    startX = e.touches[0].clientX; // reset threshold
  }
}, {passive:true});
// slides.addEventListener('touchend', ()=>{ startX=null; start(); });

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('close');

document.getElementById('gallery').addEventListener('click', (e)=>{
  const img = e.target.closest('img');
  if(!img) return;
  lightboxImg.src = img.dataset.full || img.src;
  lightbox.classList.add('open');
});

function closeLightbox(){ lightbox.classList.remove('open'); lightboxImg.src=''; }
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Locale functionality is now handled by locale.js module

async function loadGallery() {
  const grid = document.getElementById('gallery');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!grid) return;

  try {
    const res = await fetch('./assets/assets.json');
    const { images } = await res.json();

    grid.innerHTML = '';
    let currentIndex = 0;
    const initialCount = 9; // show 3x3 first
    const loadMoreCount = 3; // load 3 each click

    function renderImages(count) {
      const slice = images.slice(currentIndex, currentIndex + count);
      slice.forEach(file => {
        const url = `./assets/gallery/${file}`;

        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = url;
        img.alt = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        img.loading = 'lazy';
        img.dataset.full = url;

        card.appendChild(img);
        grid.appendChild(card);
      });
      currentIndex += slice.length;
      // hide button if no more images
      if (currentIndex >= images.length) {
        loadMoreBtn.style.display = 'none';
      }
    }

    // initial render
    renderImages(initialCount);

    // click handler
    loadMoreBtn.addEventListener('click', () => {
      renderImages(loadMoreCount);
    });

  } catch (err) {
    console.error('Failed to load gallery:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadGallery);