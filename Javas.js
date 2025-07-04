// Lightbox functions
        function openLightbox(imageSrc, title) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            const lightboxCaption = document.getElementById('lightbox-caption');
            
            lightboxImage.src = imageSrc;
            lightboxCaption.textContent = title;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }

        // Setup lightbox event listeners
        document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
        document.getElementById('lightbox').addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });

        // Portfolio Gallery
        const portfolioItems = [
            // Design projects (8)
            { id: 1, category: 'design', image: 'K2.jpg' },
            { id: 1, category: 'design', image: 'DNKJ.jpg' },
            { id: 1, category: 'design', image: 'Imprimer.jpg' },
            { id: 1, category: 'design', image: 'B.jpg' },
            { id: 1, category: 'design', image: 'Piquancy.jpg' },
            { id: 1, category: 'design', image: 'Chips.jpg' },
            { id: 1, category: 'design', image: 'Design.jpg' },
            { id: 1, category: 'design', image: 'Coffeee.jpg' },
            
            // Branding projects (8)
            { id: 1, category: 'design', image: 'Calendrier.jpg' },
            { id: 1, category: 'design', image: 'Bissap.jpg' },
            { id: 1, category: 'design', image: 'Coffee.jpg' },
            { id: 1, category: 'design', image: 'COTTURA.jpg' },
            { id: 1, category: 'design', image: 'Délice.jpg' },
            { id: 1, category: 'design', image: 'Dina Menu.jpg' },
            { id: 1, category: 'design', image: 'Flyers.jpg' },
            { id: 1, category: 'design', image: 'Horreur.jpg' },
            
            // Additional items to reach 32
            { id: 1, category: 'design', image: 'Kakemono.jpg' },
            { id: 1, category: 'design', image: 'LIVRE.jpg' },
            { id: 1, category: 'design', image: 'Boruto.jpg' },
            { id: 1, category: 'design', image: 'Logis.jpg' },
            { id: 1, category: 'design', image: 'Mock up.jpg' },
            { id: 1, category: 'design', image: 'MonFlyer.jpg' },
            { id: 1, category: 'design', image: 'Petit.jpg' },
            { id: 1, category: 'design', image: 'Poster.jpg' },
            
            { id: 1, category: 'design', image: 'PosterAvengers.jpg' },
            { id: 1, category: 'design', image: 'Réseaux.jpg' },
            { id: 1, category: 'design', image: 'Restaurant.jpg' },
            { id: 1, category: 'design', image: 'Cinéma.jpg' },
            { id: 1, category: 'design', image: 'Samossa.jpg' },
            { id: 1, category: 'design', image: 'TheHill.jpg' },
            { id: 1, category: 'design', image: 'Will.jpg' },
            { id: 1, category: 'design', image: 'BATEAU.jpg' },
            
            { id: 1, category: 'design', image: 'Menus.jpg' },
            { id: 1, category: 'design', image: 'Banners.jpg' },
            { id: 1, category: 'design', image: 'Menu.jpg' },
            { id: 1, category: 'design', image: 'Téléphone.png' },
            { id: 1, category: 'design', image: 'CoffeeHouse.png' },
            { id: 1, category: 'design', image: 'Logo2.png' },
            { id: 1, category: 'design', image: 'TransAqua.png' },
            { id: 1, category: 'design', image: 'Foret.png' },
            
            // More items...
            { id: 1, category: 'design', image: 'JULIANAFood.png' },
            { id: 1, category: 'design', image: 'squid Game.png' },
            { id: 1, category: 'design', image: 'Luna.png' },
            { id: 1, category: 'design', image: 'Marque.png' },
            { id: 1, category: 'design', image: 'Logo complet.png' },
            { id: 1, category: 'design', image: 'Mock up copie.jpg' },
            { id: 1, category: 'design', image: 'Soccer copie.jpg' },
            { id: 1, category: 'design', image: 'Basket-Ball.jpg' },
            
        ];

        // Pagination variables
        let currentPage = 1;
        const itemsPerPage = 8;
        let filteredItems = [...portfolioItems];
        let currentFilter = 'all';

        // DOM elements
        const galleryGrid = document.querySelector('.grid');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pageInfo = document.getElementById('page-info');
        const filterAll = document.getElementById('filter-all');
        const filterDesign = document.getElementById('filter-design');
        const filterDev = document.getElementById('filter-dev');
        const filterBranding = document.getElementById('filter-branding');

        // Initialize gallery
        function renderGallery() {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedItems = filteredItems.slice(startIndex, endIndex);
            
            galleryGrid.innerHTML = '';
            
            paginatedItems.forEach(item => {
                const card = document.createElement('div');
                card.className = 'portfolio-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300';
                card.innerHTML = `
                    <div class="relative pb-2/3 h-48 cursor-pointer" onclick="openLightbox('${item.image}', '${item.title}')">
                        <img class="absolute h-full w-full object-cover" src="${item.image}" alt="${item.title}">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <h3 class="text-white font-medium">${item.title}</h3>
                        </div>
                    </div>
                `;
                galleryGrid.appendChild(card);
            });
            
            // Update page info
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
            
            // Disable/enable buttons
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        }

        // Filter items
        function filterItems(category) {
            currentFilter = category;
            currentPage = 1;
            
            if (category === 'all') {
                filteredItems = [...portfolioItems];
            } else {
                filteredItems = portfolioItems.filter(item => item.category === category);
            }
            
            renderGallery();
            
            // Update active filter button
            filterAll.classList.remove('bg-blue-600', 'text-white');
            filterDesign.classList.remove('bg-blue-600', 'text-white');
            filterDev.classList.remove('bg-blue-600', 'text-white');
            filterBranding.classList.remove('bg-blue-600', 'text-white');
            
            filterAll.classList.add('bg-gray-100', 'text-gray-700');
            filterDesign.classList.add('bg-gray-100', 'text-gray-700');
            filterDev.classList.add('bg-gray-100', 'text-gray-700');
            filterBranding.classList.add('bg-gray-100', 'text-gray-700');
            
            if (category === 'all') {
                filterAll.classList.remove('bg-gray-100', 'text-gray-700');
                filterAll.classList.add('bg-blue-600', 'text-white');
            } else if (category === 'design') {
                filterDesign.classList.remove('bg-gray-100', 'text-gray-700');
                filterDesign.classList.add('bg-blue-600', 'text-white');
            } else if (category === 'dev') {
                filterDev.classList.remove('bg-gray-100', 'text-gray-700');
                filterDev.classList.add('bg-blue-600', 'text-white');
            } else if (category === 'branding') {
                filterBranding.classList.remove('bg-gray-100', 'text-gray-700');
                filterBranding.classList.add('bg-blue-600', 'text-white');
            }
        }

        // Event listeners
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery();
            }
        });

        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderGallery();
            }
        });

        filterAll.addEventListener('click', () => filterItems('all'));
        filterDesign.addEventListener('click', () => filterItems('design'));
        filterDev.addEventListener('click', () => filterItems('dev'));
        filterBranding.addEventListener('click', () => filterItems('branding'));

        // Initialize gallery
        filterItems('all');