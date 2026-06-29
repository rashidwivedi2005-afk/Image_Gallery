// All gallery items
var items = document.querySelectorAll('.gallery-item');
var currentIndex = 0;
var visibleItems = [];

// Build list of currently visible items
function buildVisibleList() {
  visibleItems = [];
  items.forEach(function(item, i) {
    if (!item.classList.contains('hidden')) {
      visibleItems.push(i);
    }
  });
}

// Filter by category
function filterGallery(category, btn) {
  document.querySelectorAll('.filters button').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  items.forEach(function(item) {
    if (category === 'all' || item.dataset.category === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });

  buildVisibleList();
}

// Open lightbox
function openLightbox(index) {
  buildVisibleList();
  var pos = visibleItems.indexOf(index);
  if (pos === -1) return;
  currentIndex = pos;
  showImage();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Show image in lightbox
function showImage() {
  var realIndex = visibleItems[currentIndex];
  var item = items[realIndex];
  document.getElementById('lightboxImg').src = item.querySelector('img').src;
  document.getElementById('lightboxImg').alt = item.dataset.title;
  document.getElementById('lightboxCaption').textContent = item.dataset.title;
}

// Navigate images
function changeImage(dir) {
  currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
  showImage();
}

// Close lightbox
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Keyboard support
document.addEventListener('keydown', function(e) {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowRight') changeImage(1);
  if (e.key === 'ArrowLeft')  changeImage(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// Click outside to close
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});

// Init
buildVisibleList();