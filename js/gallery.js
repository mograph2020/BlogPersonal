/**
 * GALERÍA DE FOTOS CON MODAL Y NAVEGACIÓN
 * Este archivo maneja:
 * - Generación de la grilla de fotos
 * - Modal con zoom
 * - Navegación con flechas siguiente/anterior
 */

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

/**
 * Configuración de imágenes por región
 * Reemplaza las URLs con tus propias imágenes
 */
const regionImages = {
    nordeste: generateImageArray(25, 'nordeste'),
    noroeste: generateImageArray(25, 'noroeste'),
    buenosaires: generateImageArray(25, 'buenosaires'),
    mendoza: generateImageArray(25, 'mendoza'),
    patagonia: generateImageArray(25, 'patagonia'),
    ushuaia: generateImageArray(25, 'ushuaia'),
    chile: generateImageArray(25, 'chile'),
    peru: generateImageArray(25, 'peru'),
    uruguay: generateImageArray(25, 'uruguay')
};

/**
 * Genera un array de 25 imágenes con URLs de Unsplash
 * @param {number} count - Cantidad de imágenes
 * @param {string} region - Nombre de la región
 * @returns {Array} Array de URLs
 */
function generateImageArray(count, region) {
    const keywords = {
        nordeste: 'waterfall nature',
        noroeste: 'mountain landscape',
        buenosaires: 'urban city lights',
        mendoza: 'wine vineyard mountains',
        patagonia: 'glacier mountain',
        ushuaia: 'ocean sea landscape',
        chile: 'desert landscape',
        peru: 'andes mountain machu picchu',
        uruguay: 'beach coast landscape'
    };

    const keyword = keywords[region] || 'nature landscape';
    const images = [];

    for (let i = 1; i <= count; i++) {
        // Usando Unsplash API para obtener imágenes variadas
        images.push({
            thumb: `https://images.unsplash.com/photo-${1400000000000 + (i * 123456)}?w=200&h=200&fit=crop`,
            full: `https://images.unsplash.com/photo-${1400000000000 + (i * 123456)}?w=1000&h=1000&fit=crop`
        });
    }

    return images;
}

/**
 * Inicializa la galería
 */
function initGallery() {
    const photoGrid = document.getElementById('photoGrid');
    if (!photoGrid) return;

    // Obtener configuración de la galería
    const region = window.galleryConfig ? window.galleryConfig.region : 'chile';
    const images = regionImages[region] || regionImages.chile;

    // Generar HTML de la grilla
    images.forEach((image, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = image.thumb;
        img.alt = `Foto ${index + 1}`;
        
        photoItem.appendChild(img);
        photoItem.addEventListener('click', () => openModal(index, images));
        
        photoGrid.appendChild(photoItem);
    });

    // Inicializar modal
    initModal(images);
}

/**
 * Inicializa los controles del modal
 */
function initModal(images) {
    const modal = document.getElementById('imageModal');
    const modalClose = document.getElementById('modalClose');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (modalClose) {
        modalClose.addEventListener('click', () => closeModal());
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateModal(images);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateModal(images);
        });
    }

    // Cerrar modal al presionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Cerrar modal al hacer click en el fondo
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Navegación con teclas de flecha
    document.addEventListener('keydown', (e) => {
        const isModalActive = modal.classList.contains('active');
        if (isModalActive) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
}

let currentIndex = 0;

/**
 * Abre el modal con una imagen específica
 */
function openModal(index, images) {
    const modal = document.getElementById('imageModal');
    currentIndex = index;
    
    if (modal) {
        modal.classList.add('active');
        updateModal(images);
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
}

/**
 * Actualiza el contenido del modal
 */
function updateModal(images) {
    const modalImage = document.getElementById('modalImage');
    const modalCounter = document.getElementById('modalCounter');

    if (modalImage) {
        modalImage.src = images[currentIndex].full;
        modalImage.alt = `Foto ${currentIndex + 1}`;
    }

    if (modalCounter) {
        modalCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
}

/**
 * Cierra el modal
 */
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Permitir scroll nuevamente
    }
}

/**
 * ALTERNATIVA: Si prefieres usar tus propias imágenes
 * Reemplaza la función generateImageArray con esta:
 */
/*
function generateImageArray(count, region) {
    // Especifica tus propias URLs de imágenes
    const customImages = {
        nordeste: [
            { thumb: '/images/nordeste/1-thumb.jpg', full: '/images/nordeste/1-full.jpg' },
            { thumb: '/images/nordeste/2-thumb.jpg', full: '/images/nordeste/2-full.jpg' },
            // ... más imágenes
        ],
        // ... otras regiones
    };
    
    return customImages[region] || [];
}
*/
