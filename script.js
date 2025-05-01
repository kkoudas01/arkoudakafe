
let currentPage = '';

function showContent(type) {
    const content = document.getElementById('content');
    const contentInner = document.getElementById('contentInner');
    let imageSrc = '', title = '', description = '';

    if (type === 'cat') {
        imageSrc = 'origamiCat2.png';
        title = 'Α Γυμνασίου';
        description = 'Περιγραφή Α Γυμν.';
        currentPage = 'GymnasioA/index.html';
    } else if (type === 'bird') {
        imageSrc = 'origamiBird2.png';
        title = 'Β Γυμνασίου';
        description = 'Περιγραφή Β Γυμν.';
        currentPage = 'GymnasioB/index.html';
    } else if (type === 'boat') {
        imageSrc = 'origamiBoat2.png';
        title = 'Γ Γυμνασίου';
        description = 'Περιγραφή Γ Γυμν.';
        currentPage = 'GymnasioC/index.html';
    } else if (type === 'airplane') {
        imageSrc = 'origamiAirplane2.png';
        title = 'Α Λυκείου';
        description = 'Περιγραφή Α Λυκειου.';
        currentPage = 'LykeioA/index.html';
    } else if (type === 'rose') {
        imageSrc = 'origamiRose2.png';
        title = 'Β Λυκείου';
        description = 'Περιγραφή Β Λυκείου.';
        currentPage = 'LykeioB/index.html';
    } else if (type === 'butterfly') {
        imageSrc = 'origamibutterfly2.png';
        title = 'Γ Λυκείου';
        description = 'Περιγραφή Γ Λυκείου.';
        currentPage = 'LykeioC/index.html';
    }

    contentInner.innerHTML = `
        <img src="${imageSrc}" alt="${type}">
        <div class="neon-title">${title}</div>
        <div class="description">${description}</div>
    `;
    content.classList.remove('hidden');
}


function goBack() {
    document.getElementById('content').classList.add('hidden');
}

function toggleLogoContent() {
    const logoContent = document.getElementById('logoContent');
    logoContent.classList.toggle('hidden');
}

function hoverEffect(el) {
    // Βρίσκουμε όλα τα dock items
    const dockItems = document.querySelectorAll('.dock-item');
    const currentIndex = Array.from(dockItems).indexOf(el);
    
    dockItems.forEach((item, index) => {
        const distance = Math.abs(index - currentIndex);
        
        if (item === el) {
            // Το επιλεγμένο εικονίδιο - μεγαλύτερο zoom
            item.style.transform = 'scale(1.5) translateY(-20px)';
        } else if (distance === 1) {
            // Άμεσα γειτονικά εικονίδια - μικρότερο zoom
            item.style.transform = 'scale(1.2) translateY(-10px)';
        } else if (distance === 2) {
            // Εικονίδια δύο θέσεις μακριά - ακόμα μικρότερο zoom
            item.style.transform = 'scale(1.1) translateY(-5px)';
        }
    });
}

function removeEffect(el) {
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.style.transform = 'scale(1) translateY(0)';
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const sideTab = document.getElementById('sideTab');
    if (!sidebar.contains(e.target) && e.target !== sideTab) {
        sidebar.classList.remove('show');
    }
});

function goToMore() {
    if (currentPage) {
        window.location.href = currentPage;
    } else {
        alert('Δεν έχει επιλεγεί τάξη.');
    }
}
