'use strict';

const openBtn = document.getElementById('openDetails');
const closeBtn = document.getElementById('closeDetails');
const modal = document.getElementById('detailsModal');
const content = document.getElementById('detailsContent');

function openModal() {
  modal.classList.remove('opacity-0', 'pointer-events-none');
  content.classList.remove('translate-y-4', 'scale-95');
}

function closeModal() {
  modal.classList.add('opacity-0', 'pointer-events-none');
  content.classList.add('translate-y-4', 'scale-95');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
