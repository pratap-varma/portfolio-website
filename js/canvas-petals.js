/**
 * Interactive HTML5 Canvas Engine: Drifting Sakura Petals & AI Neural Network Graph
 * Fuses the serene Kamui anime landscape with futuristic AI engineering nodes.
 */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  // Mouse tracking
  const mouse = {
    x: width / 2,
    y: height / 2,
    radius: 140,
    isActive: false,
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  // Sakura Petal Class
  class SakuraPetal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 1.5 - 0.2; // slight natural drift right
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.03;
      this.flip = Math.random();
      this.flipSpeed = Math.random() * 0.03 + 0.01;
      this.opacity = Math.random() * 0.5 + 0.35;
      
      // Petal tint variety (sunset pink to gentle mauve)
      const tints = [
        'rgba(255, 126, 149, ',
        'rgba(255, 168, 185, ',
        'rgba(255, 192, 203, ',
        'rgba(244, 114, 182, '
      ];
      this.tint = tints[Math.floor(Math.random() * tints.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.angle) * 0.6;
      this.angle += this.angularSpeed;
      this.flip += this.flipSpeed;

      // Mouse breeze effect
      if (mouse.isActive) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 2;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      // Reset when off bottom or sides
      if (this.y > height + 20 || this.x > width + 40 || this.x < -40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(1, Math.sin(this.flip));

      ctx.beginPath();
      // Draw organic curved petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, this.size / 2, this.size);
      ctx.bezierCurveTo(0, this.size / 2, -this.size / 2, 0, 0, 0);
      ctx.fillStyle = this.tint + this.opacity + ')';
      ctx.fill();
      ctx.restore();
    }
  }

  // AI Neural Node Class
  class NeuralNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2.2 + 1.2;
      this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(142, 45, 226, ';
      this.baseAlpha = Math.random() * 0.5 + 0.25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // React gently to mouse
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.5;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.baseAlpha + ')';
      ctx.fill();
    }
  }

  // Initialize particles tuned for 120Hz ProMotion framerate
  const isMobile = width < 768;
  const petalCount = isMobile ? 18 : 42;
  const nodeCount = isMobile ? 20 : 45;

  const petals = Array.from({ length: petalCount }, () => new SakuraPetal());
  const nodes = Array.from({ length: nodeCount }, () => new NeuralNode());

  function connectNodes() {
    const maxDist = isMobile ? 65 : 85;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse if active
      if (mouse.isActive) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 126, 149, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  // 120Hz Visibility Gate: Pauses canvas when scrolled out of hero to preserve 100% GPU
  let isCanvasActive = true;
  let animFrameId = null;

  const heroSection = document.getElementById('hero');
  if (window.IntersectionObserver && heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const wasActive = isCanvasActive;
        isCanvasActive = entry.isIntersecting;
        if (!wasActive && isCanvasActive) {
          animFrameId = requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.05 });
    heroObserver.observe(heroSection);
  }

  // Animation Loop (60Hz / 120Hz ProMotion Native Sync)
  function animate() {
    if (!isCanvasActive) return;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw neural network connections & nodes
    connectNodes();
    nodes.forEach((node) => {
      node.update();
      node.draw();
    });

    // 2. Draw falling sakura petals on top
    petals.forEach((petal) => {
      petal.update();
      petal.draw();
    });

    animFrameId = requestAnimationFrame(animate);
  }

  animFrameId = requestAnimationFrame(animate);
})();
