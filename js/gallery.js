document.addEventListener('DOMContentLoaded', function() {
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
            });
            
            setTimeout(() => {
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                

                setTimeout(() => {
                    galleryItems.forEach(item => {
                        if (item.style.display === 'block') {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }
                    });
                }, 50);
            }, 300);
        });
    });
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.gallery-item img'));
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            

            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 10);
        });
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigate(-1);
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigate(1);
    });
    
    function updateLightboxImage() {
        const imgSrc = images[currentImageIndex].getAttribute('src');
        const imgAlt = images[currentImageIndex].getAttribute('alt');
        
        lightboxImg.style.transform = 'scale(0.8)';
        lightboxImg.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImg.setAttribute('src', imgSrc);
            lightboxImg.setAttribute('alt', imgAlt);
            
            lightboxImg.style.transform = 'scale(1)';
            lightboxImg.style.opacity = '1';
        }, 300);
    }
    
    function navigate(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        updateLightboxImage();
    }
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            }
        }
    });
    
    function resizeMasonryItem(item) {
        const grid = document.querySelector('.gallery-grid');
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const contentHeight = item.querySelector('img').getBoundingClientRect().height;
        const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = 'span ' + rowSpan;
    }
    
    function resizeAllMasonryItems() {
        galleryItems.forEach(item => {
            resizeMasonryItem(item);
        });
    }
    
    window.addEventListener('load', resizeAllMasonryItems);
    window.addEventListener('resize', resizeAllMasonryItems);
});