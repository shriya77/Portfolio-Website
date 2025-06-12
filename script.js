// Particle setup
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
const num = 100;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.vx = (Math.random()-0.5)*0.5;
    this.vy = (Math.random()-0.5)*0.5;
    this.size = Math.random()*4 + 1.5; // larger particle size
  }
  move(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x<0||this.x>canvas.width) this.vx*=-1;
    if(this.y<0||this.y>canvas.height) this.vy*=-1;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle = 'rgba(102,153,255,0.4)'; // example: soft blue particles
    ctx.fill();
  }
}
function initParticles(){
  particles = [];
  for(let i=0; i<num; i++) particles.push(new Particle());
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{ p.move(); p.draw(); });
  requestAnimationFrame(animate);
}
initParticles();
animate();

/* Optional: Highlight nav links based on scroll position */
window.addEventListener('scroll', () => {
  let sections = document.querySelectorAll('.section');
  let navLinks = document.querySelectorAll('.nav-links a');
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 60;
    let height = sec.offsetHeight;
    if(top >= offset && top < offset + height){
      let id = sec.getAttribute('id');
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
});

// Filter projects by type
const filterButtons = document.querySelectorAll('.project-filters button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Set active button styling
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      const type = card.getAttribute('data-type');
      if (filter === 'all' || filter === type) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

