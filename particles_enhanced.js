// MobiCryp Enhanced Particles Animation

class ParticlesAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    // Configuration
    this.particleCount = 100;
    this.particleColor = 'rgba(0, 209, 255, 0.6)';
    this.lineColor = 'rgba(0, 209, 255, 0.2)';
    this.lineDistance = 150;
    this.particleRadius = 1.5;
    this.moveSpeed = 0.5;
    this.linkLineWidth = 0.5;
    this.interactionRadius = 200;
    this.mouseX = null;
    this.mouseY = null;
    
    // Particles array
    this.particles = [];
    
    // Set up the canvas size
    this.resizeCanvas();
    
    // Initialize event listeners
    window.addEventListener('resize', () => this.resizeCanvas());
    this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.container.addEventListener('mouseleave', () => this.handleMouseLeave());
    
    // Initialize particles
    this.initParticles();
    
    // Start animation
    this.animate();
  }
  
  resizeCanvas() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }
  
  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: this.particleRadius * (0.8 + Math.random() * 0.5),
        vx: (Math.random() - 0.5) * this.moveSpeed,
        vy: (Math.random() - 0.5) * this.moveSpeed,
        opacity: 0.4 + Math.random() * 0.6
      });
    }
  }
  
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }
  
  handleMouseLeave() {
    this.mouseX = null;
    this.mouseY = null;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.updateParticles();
    this.drawParticles();
    
    // Draw connections
    this.connectParticles();
    
    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }
  
  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Move towards mouse if mouse is present
      if (this.mouseX !== null && this.mouseY !== null) {
        const dx = this.mouseX - p.x;
        const dy = this.mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.interactionRadius) {
          const force = (this.interactionRadius - dist) / this.interactionRadius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.02;
          p.vy += Math.sin(angle) * force * 0.02;
        }
      }
      
      // Apply velocity
      p.x += p.vx;
      p.y += p.vy;
      
      // Dampen velocity to prevent excessive speed
      p.vx *= 0.98;
      p.vy *= 0.98;
      
      // Bounce off edges
      if (p.x > this.canvas.width) {
        p.x = this.canvas.width;
        p.vx = -p.vx;
      } else if (p.x < 0) {
        p.x = 0;
        p.vx = -p.vx;
      }
      
      if (p.y > this.canvas.height) {
        p.y = this.canvas.height;
        p.vy = -p.vy;
      } else if (p.y < 0) {
        p.y = 0;
        p.vy = -p.vy;
      }
    }
  }
  
  drawParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.particleColor.replace('0.6', p.opacity.toFixed(2));
      this.ctx.fill();
    }
  }
  
  connectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.lineDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / this.lineDistance);
          
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = this.lineColor.replace('0.2', (opacity * 0.2).toFixed(2));
          this.ctx.lineWidth = this.linkLineWidth;
          this.ctx.stroke();
        }
      }
    }
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  // Create particle animations for each slide
  new ParticlesAnimation('particles-container');
});