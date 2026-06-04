import './style.css'
// @ts-ignore
import { pem2jwk } from 'pem-jwk'

// DOM Elements
const useSelect = document.getElementById('use') as HTMLSelectElement;
const algSelect = document.getElementById('alg') as HTMLSelectElement;
const kidInput = document.getElementById('kid') as HTMLInputElement;
const pemInput = document.getElementById('pem') as HTMLTextAreaElement;
const convertBtn = document.getElementById('convert-btn') as HTMLButtonElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
const outputPre = document.getElementById('output') as HTMLPreElement;

// State
let currentJwk: string | null = null;

// Convert handler
convertBtn.addEventListener('click', () => {
  const pem = pemInput.value.trim();
  
  if (!pem) {
    showNotification('Please enter a PEM encoded key', 'error');
    return;
  }

  // Gather extras (parameters)
  const extras: Record<string, string> = {};
  if (useSelect.value) extras.use = useSelect.value;
  if (algSelect.value) extras.alg = algSelect.value;
  if (kidInput.value) extras.kid = kidInput.value.trim();

  try {
    const jwk = pem2jwk(pem, extras);
    currentJwk = JSON.stringify(jwk, null, 2);
    
    // Update UI
    outputPre.textContent = currentJwk;
    outputPre.classList.add('visible');
    copyBtn.style.display = 'inline-flex';
    
    // Add a slight pop animation
    outputPre.animate([
      { transform: 'scale(0.98)', opacity: 0.5 },
      { transform: 'scale(1)', opacity: 1 }
    ], { duration: 300, easing: 'ease-out' });

  } catch (error) {
    console.error(error);
    outputPre.textContent = '';
    outputPre.classList.remove('visible');
    copyBtn.style.display = 'none';
    currentJwk = null;
    showNotification('Invalid input. Make sure the PEM key is correctly formatted.', 'error');
  }
});

// Copy handler
copyBtn.addEventListener('click', () => {
  if (!currentJwk) return;
  
  navigator.clipboard.writeText(currentJwk)
    .then(() => {
      showNotification('Copied to clipboard!', 'success');
      
      // Button feedback
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied';
      copyBtn.style.background = 'rgba(16, 185, 129, 0.2)';
      copyBtn.style.borderColor = 'rgba(16, 185, 129, 0.5)';
      
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.style.background = '';
        copyBtn.style.borderColor = '';
      }, 2000);
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
      showNotification('Failed to copy', 'error');
    });
});

// Notification system
function showNotification(message: string, type: 'success' | 'error') {
  // Remove existing notification if any
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icon = type === 'success' 
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    
  notification.innerHTML = `${icon} <span>${message}</span>`;
  document.body.appendChild(notification);
  
  // Trigger animation
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
