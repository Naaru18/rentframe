
document.addEventListener('DOMContentLoaded', async () => {
  const footerContainer = document.getElementById('site-footer');
  if (!footerContainer) return;

  const scriptEl = document.currentScript || document.querySelector('script[src*="footer.js"]');
  const footerUrl = new URL('../components/footer.html', scriptEl.src).href;

  try {
    const response = await fetch(footerUrl);
    if (!response.ok) throw new Error(`Failed to load footer: ${response.status} at ${footerUrl}`);
    footerContainer.innerHTML = await response.text();
  } catch (err) {
    console.error('Error loading footer:', err);
    return;
  }

  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const topBtn = document.getElementById('footer3TopBtn');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('footer3-visible', window.scrollY > 400);
    });
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const form = document.getElementById('newsletterForm');
  const msg = document.getElementById('newsletterMsg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const email = emailInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#e07a7a';
        return;
      }

      msg.textContent = "Thanks — you're on the list!";
      msg.style.color = 'var(--primary-light)';
      form.reset();
    });
  }
});