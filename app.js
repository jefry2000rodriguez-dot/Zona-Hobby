// Zona Hobby - Aplicación Principal
class ZonaHobby {
    constructor() {
        this.currentUser = null;
        this.posts = [];
        this.users = [];
        this.isAdmin = false;
        this.currentFilter = 'todos';
        this.postsPerPage = 12;
        this.currentPage = 0;
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.initEventListeners();
        this.renderFeed();
        this.initIcons();
        this.checkAuthState();
    }
    
    // Inicialización de event listeners
    initEventListeners() {
        // Navigation
        document.getElementById('mobileMenuToggle').addEventListener('click', () => this.toggleMobileMenu());
        
        // User menu
        document.getElementById('userAvatar').addEventListener('click', () => this.toggleUserDropdown());
        
        // Upload modal
        document.getElementById('btnUpload').addEventListener('click', () => this.openUploadModal());
        document.getElementById('closeUploadModal').addEventListener('click', () => this.closeUploadModal());
        document.getElementById('cancelUpload').addEventListener('click', () => this.closeUploadModal());
        document.getElementById('uploadForm').addEventListener('submit', (e) => this.handleUpload(e));
        document.getElementById('photoFile').addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Auth modal
        document.getElementById('loginBtn').addEventListener('click', () => this.openAuthModal('login'));
        document.getElementById('registerBtn').addEventListener('click', () => this.openAuthModal('register'));
        document.getElementById('closeAuthModal').addEventListener('click', () => this.closeAuthModal());
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('switchToRegister').addEventListener('click', () => this.switchAuthMode('register'));
        document.getElementById('switchToLogin').addEventListener('click', () => this.switchAuthMode('login'));
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        
        // Photo detail modal
        document.getElementById('closePhotoDetailModal').addEventListener('click', () => this.closePhotoDetailModal());
        document.getElementById('commentForm').addEventListener('submit', (e) => this.handleComment(e));
        document.getElementById('detailLikeBtn').addEventListener('click', () => this.toggleLike('detail'));
        document.getElementById('detailDeleteBtn').addEventListener('click', () => this.deleteCurrentPost());
        
        // Category filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category));
        });
        
        // Load more
        document.getElementById('loadMoreBtn').addEventListener('click', () => this.loadMorePosts());
        
        // Admin panel
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchAdminTab(e.target.dataset.tab));
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                this.closeUserDropdown();
            }
        });
        
        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });
    }
    
    // Inicializar iconos Lucide
    initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Cargar datos iniciales
    loadData() {
        // Datos de ejemplo para la demo
        this.posts = [
            {
                id: 1,
                title: "Navidad en familia",
                description: "Una tarde perfecta celebrando la navidad con toda la familia. Los niños estaban emocionados con los regalos y nosotros disfrutamos de una cena deliciosa.",
                category: "familia",
                tags: ["navidad", "familia", "regalos", "cena"],
                image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
                author: "Ana García",
                authorId: "ana",
                date: "2024-12-25",
                likes: 24,
                comments: [
                    {
                        id: 1,
                        author: "Carlos García",
                        authorId: "carlos",
                        text: "¡Qué foto más bonita! Se nota la felicidad en sus caras.",
                        date: "2024-12-25"
                    }
                ],
                likedBy: ["carlos", "maria"]
            },
            {
                id: 2,
                title: "Aventura en la playa",
                description: "Nuestro primer viaje a la playa fue increíble. El atardecer, las olas, y toda la familia disfrutando del mar. ¡Ya queremos volver!",
                category: "viajes",
                tags: ["playa", "vacaciones", "familia", "atardecer"],
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
                author: "María López",
                authorId: "maria",
                date: "2024-07-15",
                likes: 18,
                comments: [
                    {
                        id: 2,
                        author: "Ana García",
                        authorId: "ana",
                        text: "¡Qué lugar tan hermoso! Se ve que lo pasaron genial.",
                        date: "2024-07-15"
                    }
                ],
                likedBy: ["ana", "carlos"]
            },
            {
                id: 3,
                title: "Primera bicicleta",
                description: "¡Hoy es un día muy especial! Mi hijo menor aprendió a andar en bicicleta sin rueditas de apoyo. Estoy tan orgulloso de él.",
                category: "momentos",
                tags: ["bicicleta", "niños", "logro", "orgullo"],
                image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
                author: "Carlos Ruiz",
                authorId: "carlos",
                date: "2024-09-10",
                likes: 32,
                comments: [],
                likedBy: ["ana", "maria"]
            },
            {
                id: 4,
                title: "Pico de montañas",
                description: "Después de 4 horas de caminata, llegamos a la cima. El paisaje vale cada paso. ¡Qué experiencia tan inolvidable!",
                category: "viajes",
                tags: ["montaña", "senderismo", "paisaje", "aventura"],
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                author: "Pedro Martín",
                authorId: "pedro",
                date: "2024-08-20",
                likes: 15,
                comments: [],
                likedBy: []
            },
            {
                id: 5,
                title: "Cumpleaños de mamá",
                description: "Sorpresa de cumpleaños para mamá. Toda la familia se reunió para celebrate este día tan especial. Las lágrimas de felicidad valieron la pena.",
                category: "familia",
                tags: ["cumpleaños", "sorpresa", "familia", "emoción"],
                image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
                author: "Laura Fernández",
                authorId: "laura",
                date: "2024-11-05",
                likes: 28,
                comments: [
                    {
                        id: 3,
                        author: "Pedro Martín",
                        authorId: "pedro",
                        text: "¡Qué detalle tan hermoso! Seguro que fue un momento mágico.",
                        date: "2024-11-05"
                    }
                ],
                likedBy: ["carlos", "maria", "ana"]
            },
            {
                id: 6,
                title: "Lluvia de estrellas",
                description: "Una noche perfecta para ver la lluvia de estrellas. El cielo estaba despejado y pudimos ver decenas de meteoritos. ¡Qué espectáculo de la naturaleza!",
                category: "momentos",
                tags: ["estrellas", "noche", "naturaleza", "espectáculo"],
                image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop",
                author: "Ana García",
                authorId: "ana",
                date: "2024-10-12",
                likes: 21,
                comments: [],
                likedBy: ["maria", "pedro"]
            }
        ];
        
        this.users = [
            { id: "ana", name: "Ana García", email: "ana@ejemplo.com", isAdmin: false, isBanned: false },
            { id: "maria", name: "María López", email: "maria@ejemplo.com", isAdmin: false, isBanned: false },
            { id: "carlos", name: "Carlos Ruiz", email: "carlos@ejemplo.com", isAdmin: false, isBanned: false },
            { id: "pedro", name: "Pedro Martín", email: "pedro@ejemplo.com", isAdmin: false, isBanned: false },
            { id: "laura", name: "Laura Fernández", email: "laura@ejemplo.com", isAdmin: false, isBanned: false },
            { id: "jefry", name: "Jefry Rodríguez", email: "jefry2000rodriguez3@gmail.com", isAdmin: true, isBanned: false }
        ];
    }
    
    // Verificar estado de autenticación
    checkAuthState() {
        const savedUser = localStorage.getItem('zonaHobbyUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isAdmin = this.currentUser.isAdmin;
            this.updateUIForLoggedUser();
        }
    }
    
    // Actualizar UI para usuario logueado
    updateUIForLoggedUser() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userAvatar = document.getElementById('userAvatar');
        const adminLink = document.querySelector('.admin-only');
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        
        // Actualizar avatar del usuario
        if (userAvatar) {
            userAvatar.innerHTML = this.currentUser.name.charAt(0).toUpperCase();
        }
        
        // Mostrar enlace de admin si es admin
        if (this.isAdmin && adminLink) {
            adminLink.style.display = 'block';
        }
        
        // Mostrar panel de admin si está en esa sección
        if (window.location.hash === '#admin' && this.isAdmin) {
            this.showAdminPanel();
        }
    }
    
    // Toggle dropdown de usuario
    toggleUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        dropdown.classList.toggle('show');
    }
    
    closeUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        dropdown.classList.remove('show');
    }
    
    // Toggle menú móvil
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('show');
    }
    
    // Modal de subida
    openUploadModal() {
        if (!this.currentUser) {
            this.showNotification('Debes iniciar sesión para subir fotos', 'error');
            this.openAuthModal('login');
            return;
        }
        
        const modal = document.getElementById('uploadModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    closeUploadModal() {
        const modal = document.getElementById('uploadModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Limpiar formulario
        document.getElementById('uploadForm').reset();
        document.getElementById('fileDisplay').innerHTML = `
            <i data-lucide="upload"></i>
            <span>Haz clic para seleccionar una imagen</span>
        `;
        this.initIcons();
    }
    
    // Modal de autenticación
    openAuthModal(mode = 'login') {
        const modal = document.getElementById('authModal');
        modal.classList.add('show');
        this.switchAuthMode(mode);
        document.body.style.overflow = 'hidden';
    }
    
    closeAuthModal() {
        const modal = document.getElementById('authModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Limpiar formularios
        document.getElementById('loginForm').reset();
        document.getElementById('registerForm').reset();
    }
    
    switchAuthMode(mode) {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const modalTitle = document.getElementById('authModalTitle');
        
        if (mode === 'login') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            modalTitle.textContent = 'Iniciar Sesión';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            modalTitle.textContent = 'Crear Cuenta';
        }
    }
    
    // Modal de detalle de foto
    openPhotoDetailModal(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;
        
        // Llenar información de la foto
        document.getElementById('detailPhotoImage').src = post.image;
        document.getElementById('detailPhotoTitle').textContent = post.title;
        document.getElementById('detailPhotoDescription').textContent = post.description;
        document.getElementById('detailPhotoCategory').textContent = this.getCategoryLabel(post.category);
        document.getElementById('detailPhotoDate').textContent = this.formatDate(post.date);
        document.getElementById('detailPhotoAuthor').textContent = `Por ${post.author}`;
        document.getElementById('detailLikeCount').textContent = post.likes;
        
        // Actualizar estado del like
        const likeBtn = document.getElementById('detailLikeBtn');
        if (this.currentUser && post.likedBy.includes(this.currentUser.id)) {
            likeBtn.classList.add('liked');
        } else {
            likeBtn.classList.remove('liked');
        }
        
        // Mostrar/ocultar botón de eliminar para admin
        const deleteBtn = document.getElementById('detailDeleteBtn');
        if (this.isAdmin) {
            deleteBtn.style.display = 'flex';
            deleteBtn.dataset.postId = postId;
        } else {
            deleteBtn.style.display = 'none';
        }
        
        // Cargar comentarios
        this.loadComments(postId);
        
        // Mostrar modal
        const modal = document.getElementById('photoDetailModal');
        modal.classList.add('show');
        modal.dataset.currentPostId = postId;
        document.body.style.overflow = 'hidden';
        this.initIcons();
    }
    
    closePhotoDetailModal() {
        const modal = document.getElementById('photoDetailModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Obtener etiqueta de categoría
    getCategoryLabel(category) {
        const labels = {
            familia: 'Familia',
            viajes: 'Viajes',
            momentos: 'Momentos'
        };
        return labels[category] || category;
    }
    
    // Formatear fecha
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Cargar comentarios
    loadComments(postId) {
        const post = this.posts.find(p => p.id === postId);
        const commentsList = document.getElementById('commentsList');
        
        if (!post || !post.comments || post.comments.length === 0) {
            commentsList.innerHTML = '<p class="text-center text-neutral-500">No hay comentarios aún. ¡Sé el primero en comentar!</p>';
            return;
        }
        
        commentsList.innerHTML = post.comments.map(comment => `
            <div class="comment-item">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
            </div>
        `).join('');
    }
    
    // Cerrar todos los modales
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
    }
    
    // Manejar selección de archivo
    handleFileSelect(e) {
        const file = e.target.files[0];
        const display = document.getElementById('fileDisplay');
        
        if (file) {
            display.innerHTML = `
                <i data-lucide="image"></i>
                <span>${file.name}</span>
            `;
            this.initIcons();
        }
    }
    
    // Manejar subida de foto
    handleUpload(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('category');
        const tags = formData.get('tags');
        const file = formData.get('photo');
        
        if (!file || !title || !description || !category) {
            this.showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        // Crear nueva publicación
        const newPost = {
            id: this.posts.length + 1,
            title,
            description,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            image: URL.createObjectURL(file), // En una app real, esto sería subido al servidor
            author: this.currentUser.name,
            authorId: this.currentUser.id,
            date: new Date().toISOString().split('T')[0],
            likes: 0,
            comments: [],
            likedBy: []
        };
        
        // Agregar al inicio del array
        this.posts.unshift(newPost);
        
        // Cerrar modal y mostrar notificación
        this.closeUploadModal();
        this.showNotification('¡Foto publicada exitosamente!', 'success');
        this.renderFeed();
    }
    
    // Manejar login
    handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Simular autenticación (en una app real, esto sería una llamada al backend)
        const user = this.users.find(u => u.email === email);
        
        if (!user || user.isBanned) {
            this.showNotification('Credenciales inválidas o usuario bloqueado', 'error');
            return;
        }
        
        this.currentUser = user;
        this.isAdmin = user.isAdmin;
        
        // Guardar en localStorage
        localStorage.setItem('zonaHobbyUser', JSON.stringify(user));
        
        // Actualizar UI
        this.updateUIForLoggedUser();
        this.closeAuthModal();
        this.showNotification(`¡Bienvenido ${user.name}!`, 'success');
    }
    
    // Manejar registro
    handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password !== confirmPassword) {
            this.showNotification('Las contraseñas no coinciden', 'error');
            return;
        }
        
        // Verificar si el email ya existe
        if (this.users.find(u => u.email === email)) {
            this.showNotification('Este email ya está registrado', 'error');
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            id: email,
            name,
            email,
            isAdmin: false,
            isBanned: false
        };
        
        // Agregar a la lista de usuarios
        this.users.push(newUser);
        
        // Iniciar sesión automáticamente
        this.currentUser = newUser;
        this.isAdmin = false;
        
        // Guardar en localStorage
        localStorage.setItem('zonaHobbyUser', JSON.stringify(newUser));
        
        // Actualizar UI
        this.updateUIForLoggedUser();
        this.closeAuthModal();
        this.showNotification(`¡Cuenta creada exitosamente! Bienvenido ${name}`, 'success');
    }
    
    // Manejar logout
    handleLogout() {
        this.currentUser = null;
        this.isAdmin = false;
        localStorage.removeItem('zonaHobbyUser');
        
        // Actualizar UI
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userAvatar = document.getElementById('userAvatar');
        const adminLink = document.querySelector('.admin-only');
        
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
        
        if (userAvatar) {
            userAvatar.innerHTML = '<i data-lucide="user"></i>';
            this.initIcons();
        }
        
        // Ocultar panel de admin
        this.hideAdminPanel();
        this.closeUserDropdown();
        
        this.showNotification('Sesión cerrada exitosamente', 'success');
    }
    
    // Filtrar por categoría
    filterByCategory(category) {
        this.currentFilter = category;
        this.currentPage = 0;
        
        // Actualizar botones activos
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.renderFeed();
    }
    
    // Renderizar feed
    renderFeed() {
        const feedGrid = document.getElementById('feedGrid');
        const filteredPosts = this.getFilteredPosts();
        const postsToShow = filteredPosts.slice(0, (this.currentPage + 1) * this.postsPerPage);
        
        if (postsToShow.length === 0) {
            feedGrid.innerHTML = `
                <div class="text-center" style="grid-column: 1 / -1; padding: var(--space-xxl);">
                    <p style="font-size: 18px; color: var(--neutral-500);">
                        No se encontraron publicaciones para esta categoría.
                    </p>
                </div>
            `;
            return;
        }
        
        feedGrid.innerHTML = postsToShow.map(post => this.createPostCard(post)).join('');
        this.initIcons();
        
        // Actualizar botón "cargar más"
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (postsToShow.length >= filteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Obtener posts filtrados
    getFilteredPosts() {
        if (this.currentFilter === 'todos') {
            return this.posts;
        }
        return this.posts.filter(post => post.category === this.currentFilter);
    }
    
    // Crear tarjeta de post
    createPostCard(post) {
        const isLiked = this.currentUser && post.likedBy.includes(this.currentUser.id);
        
        return `
            <div class="post-card" onclick="zonaHobby.openPhotoDetailModal(${post.id})">
                <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
                <div class="post-content">
                    <div class="post-header">
                        <h3 class="post-title">${post.title}</h3>
                    </div>
                    <div class="post-meta">
                        <span class="post-category">${this.getCategoryLabel(post.category)}</span>
                        <span>•</span>
                        <span>${this.formatDate(post.date)}</span>
                    </div>
                    <p class="post-description">${post.description}</p>
                    <div class="post-actions">
                        <button class="post-like-btn ${isLiked ? 'liked' : ''}" 
                                onclick="event.stopPropagation(); zonaHobby.toggleLike('feed', ${post.id})">
                            <i data-lucide="heart"></i>
                            <span>${post.likes}</span>
                        </button>
                        <div class="post-comments">
                            <i data-lucide="message-circle"></i>
                            <span>${post.comments.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Toggle like
    toggleLike(context, postId) {
        if (!this.currentUser) {
            this.showNotification('Debes iniciar sesión para dar likes', 'error');
            this.openAuthModal('login');
            return;
        }
        
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;
        
        const userId = this.currentUser.id;
        const isLiked = post.likedBy.includes(userId);
        
        if (isLiked) {
            // Unlike
            post.likedBy = post.likedBy.filter(id => id !== userId);
            post.likes--;
        } else {
            // Like
            post.likedBy.push(userId);
            post.likes++;
        }
        
        // Actualizar UI
        if (context === 'detail') {
            document.getElementById('detailLikeCount').textContent = post.likes;
            const likeBtn = document.getElementById('detailLikeBtn');
            likeBtn.classList.toggle('liked', !isLiked);
        } else {
            this.renderFeed();
        }
        
        this.showNotification(isLiked ? 'Like eliminado' : '¡Te gusta esta foto!', 'success');
    }
    
    // Manejar comentario
    handleComment(e) {
        e.preventDefault();
        
        if (!this.currentUser) {
            this.showNotification('Debes iniciar sesión para comentar', 'error');
            return;
        }
        
        const commentInput = document.getElementById('commentInput');
        const commentText = commentInput.value.trim();
        
        if (!commentText) return;
        
        const modal = document.getElementById('photoDetailModal');
        const postId = parseInt(modal.dataset.currentPostId);
        const post = this.posts.find(p => p.id === postId);
        
        if (!post) return;
        
        // Crear nuevo comentario
        const newComment = {
            id: post.comments.length + 1,
            author: this.currentUser.name,
            authorId: this.currentUser.id,
            text: commentText,
            date: new Date().toISOString().split('T')[0]
        };
        
        post.comments.push(newComment);
        
        // Actualizar UI
        commentInput.value = '';
        this.loadComments(postId);
        this.renderFeed();
        
        this.showNotification('Comentario publicado', 'success');
    }
    
    // Eliminar post (solo admin)
    deleteCurrentPost() {
        if (!this.isAdmin) return;
        
        const modal = document.getElementById('photoDetailModal');
        const postId = parseInt(modal.dataset.currentPostId);
        
        if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
            this.posts = this.posts.filter(p => p.id !== postId);
            this.closePhotoDetailModal();
            this.renderFeed();
            this.showNotification('Publicación eliminada', 'success');
        }
    }
    
    // Cargar más posts
    loadMorePosts() {
        this.currentPage++;
        this.renderFeed();
    }
    
    // Mostrar panel de admin
    showAdminPanel() {
        if (!this.isAdmin) {
            this.showNotification('No tienes permisos de administrador', 'error');
            return;
        }
        
        document.querySelector('.main-content').style.display = 'none';
        document.getElementById('adminPanel').classList.add('show');
        
        // Actualizar navegación
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector('[href="#admin"]').classList.add('active');
        
        this.loadAdminData();
    }
    
    // Ocultar panel de admin
    hideAdminPanel() {
        document.querySelector('.main-content').style.display = 'block';
        document.getElementById('adminPanel').classList.remove('show');
        
        // Actualizar navegación
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector('[href="#inicio"]').classList.add('active');
    }
    
    // Cambiar tab de admin
    switchAdminTab(tab) {
        // Actualizar botones
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // Mostrar contenido
        document.querySelectorAll('.admin-content').forEach(content => content.style.display = 'none');
        document.getElementById(`${tab}Tab`).style.display = 'block';
        
        // Cargar datos según el tab
        if (tab === 'users') this.loadUsersList();
        if (tab === 'posts') this.loadPostsModeration();
        if (tab === 'stats') this.loadStats();
    }
    
    // Cargar datos de admin
    loadAdminData() {
        this.loadStats();
    }
    
    // Cargar lista de usuarios
    loadUsersList() {
        const usersList = document.getElementById('usersList');
        
        usersList.innerHTML = this.users.map(user => `
            <div class="user-item">
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email} ${user.isAdmin ? '(Admin)' : ''}</div>
                </div>
                <div class="user-actions">
                    ${user.isBanned ? 
                        `<button class="btn-ban" onclick="zonaHobby.unbanUser('${user.id}')">
                            <i data-lucide="user-check"></i>
                            Desbloquear
                        </button>` :
                        `<button class="btn-ban" onclick="zonaHobby.banUser('${user.id}')">
                            <i data-lucide="user-x"></i>
                            Bloquear
                        </button>`
                    }
                </div>
            </div>
        `).join('');
        
        this.initIcons();
    }
    
    // Cargar moderación de posts
    loadPostsModeration() {
        const postsList = document.getElementById('postsModerationList');
        
        postsList.innerHTML = this.posts.map(post => `
            <div class="post-item">
                <div class="post-info">
                    <div class="post-title">${post.title}</div>
                    <div class="post-meta">
                        Por ${post.author} • ${this.formatDate(post.date)} • ${post.likes} likes • ${post.comments.length} comentarios
                    </div>
                </div>
                <div class="post-actions-admin">
                    <button class="btn-delete" onclick="zonaHobby.adminDeletePost(${post.id})">
                        <i data-lucide="trash-2"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        `).join('');
        
        this.initIcons();
    }
    
    // Cargar estadísticas
    loadStats() {
        const totalUsers = this.users.length;
        const totalPosts = this.posts.length;
        const totalComments = this.posts.reduce((sum, post) => sum + post.comments.length, 0);
        const totalLikes = this.posts.reduce((sum, post) => sum + post.likes, 0);
        
        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('totalPosts').textContent = totalPosts;
        document.getElementById('totalComments').textContent = totalComments;
        document.getElementById('totalLikes').textContent = totalLikes;
    }
    
    // Ban/unban user
    banUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user && confirm(`¿Estás seguro de que quieres bloquear a ${user.name}?`)) {
            user.isBanned = true;
            this.loadUsersList();
            this.showNotification('Usuario bloqueado exitosamente', 'success');
        }
    }
    
    unbanUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user && confirm(`¿Estás seguro de que quieres desbloquear a ${user.name}?`)) {
            user.isBanned = false;
            this.loadUsersList();
            this.showNotification('Usuario desbloqueado exitosamente', 'success');
        }
    }
    
    // Admin delete post
    adminDeletePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post && confirm(`¿Estás seguro de que quieres eliminar la publicación "${post.title}"?`)) {
            this.posts = this.posts.filter(p => p.id !== postId);
            this.loadPostsModeration();
            this.renderFeed();
            this.showNotification('Publicación eliminada', 'success');
        }
    }
    
    // Mostrar notificación
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i data-lucide="${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Estilos de la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'error' ? 'var(--error)' : 
                       type === 'success' ? 'var(--success)' : 'var(--primary-500)',
            color: 'white',
            padding: 'var(--space-md) var(--space-lg)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '3000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease-out',
            maxWidth: '300px'
        });
        
        const content = notification.querySelector('.notification-content');
        Object.assign(content.style, {
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)'
        });
        
        // Agregar al DOM
        document.body.appendChild(notification);
        this.initIcons();
        
        // Mostrar notificación
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Obtener icono para notificación
    getNotificationIcon(type) {
        const icons = {
            error: 'alert-circle',
            success: 'check-circle',
            info: 'info'
        };
        return icons[type] || 'info';
    }
}

// Navegación
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicación
    window.zonaHobby = new ZonaHobby();
    
    // Manejar navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Remover clases activas
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            if (href === '#admin') {
                if (window.zonaHobby.isAdmin) {
                    window.zonaHobby.showAdminPanel();
                } else {
                    window.zonaHobby.showNotification('No tienes permisos de administrador', 'error');
                }
            } else {
                window.zonaHobby.hideAdminPanel();
            }
        });
    });
    
    // Manejar teclas de acceso rápido
    document.addEventListener('keydown', (e) => {
        // ESC para cerrar modales
        if (e.key === 'Escape') {
            window.zonaHobby.closeAllModals();
            window.zonaHobby.closeUserDropdown();
        }
    });
});

// Prevenir envío de formularios al presionar Enter en inputs de texto
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.type === 'text') {
        e.preventDefault();
    }
});