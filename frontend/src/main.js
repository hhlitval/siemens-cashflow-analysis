'use strict';

const openBtn = document.getElementById('openDetails');
const closeBtn = document.getElementById('closeDetails');
const modal = document.getElementById('detailsModal');
const overlay = document.getElementById('detailsOverlay');

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
