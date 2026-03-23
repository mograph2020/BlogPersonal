// Configuración del footer
const footerConfig = {
    email: 'tu-email@example.com',
    instagram: 'https://instagram.com/mograph2020',
    flickr: 'https://www.flickr.com/people/132836767@N02/',
    youtube: 'https://www.youtube.com/@MographGabrielMaradey',
    location: 'Tu Ciudad, Tu País'
};

// Inicialización del documento
document.addEventListener('DOMContentLoaded', function() {
    initHamburger();
    initParallax();
    initFooter();
});

/**
 * HAMBURGER MENU
 */
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Cerrar menú al cambiar de página
        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !mobileNav.contains(event.target)) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    }
}

/**
 * PARALLAX EFFECT
 */
function initParallax() {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            parallaxBg.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }
}

/**
 * FOOTER CONFIGURATION
 * Edita los valores en la variable footerConfig al inicio del archivo
 */
function initFooter() {
    // Email
    const emailLink = document.getElementById('footer-email');
    if (emailLink) {
        emailLink.href = `mailto:${footerConfig.email}`;
        emailLink.textContent = footerConfig.email;
    }

    // Instagram
    const instagramLink = document.getElementById('footer-instagram');
    if (instagramLink) {
        instagramLink.href = footerConfig.instagram;
    }

    // Flickr
    const flickrLink = document.getElementById('footer-flickr');
    if (flickrLink) {
        flickrLink.href = footerConfig.flickr;
    }

    // Ubicación
    const locationText = document.getElementById('footer-location');
    if (locationText) {
        locationText.textContent = footerConfig.location;
    }
}

/**
 * CONFIGURACIÓN DE IMÁGENES PLACEHOLDER
 * Reemplaza estas URLs con tus propias imágenes
 */
const imageConfig = {
    placeholders: {
        // Parallax hero - Puedes cambiar esta URL
        parallaxHero: 'paralax/para.jpg',
        
        // Thumbnails de destinos principales
        argentinaThumbnail: 'https://images.unsplash.com/photo-1581974267369-3f2fe3b4dca5?w=400&h=300&fit=crop',
        chileThumbnail: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop',
        peruThumbnail: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop',
        
        // Thumbnails de regiones
        nordesteThumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        noroesteThumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        buenosAiresTombnail: 'https://images.unsplash.com/photo-1520763185298-1b434c919afe?w=400&h=300&fit=crop',
        mendozaThumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        patagoniaThumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        ushuaiaThumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    
    // Imagen por defecto cuando no se especifica una región
    defaultImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop'
};

// Aplicar imagen parallax si existe
window.addEventListener('load', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        parallaxBg.style.backgroundImage = `url('${imageConfig.placeholders.parallaxHero}')`;
    }

    // Aplicar imágenes a las tarjetas de destino
    const argentinaThumbnail = document.querySelector('[style*="argentina-thumb"]');
    if (argentinaThumbnail) {
        argentinaThumbnail.style.backgroundImage = `url('${imageConfig.placeholders.argentinaThumbnail}')`;
    }

    const chileThumbnail = document.querySelector('[style*="chile-thumb"]');
    if (chileThumbnail) {
        chileThumbnail.style.backgroundImage = `url('${imageConfig.placeholders.chileThumbnail}')`;
    }

    const peruThumbnail = document.querySelector('[style*="peru-thumb"]');
    if (peruThumbnail) {
        peruThumbnail.style.backgroundImage = `url('${imageConfig.placeholders.peruThumbnail}')`;
    }
});
