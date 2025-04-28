
function showContent(type) {
    const content = document.getElementById('content');
    const contentInner = document.getElementById('contentInner');
    let imageSrc = '', title = '', description = '';

    if (type === 'cat') {
        imageSrc = 'origamiCat2.png';
        title = 'Γατίσια Γοητεία';
        description = 'Ένα χαριτωμένο οριγκάμι γατάκι που σε κοιτά με περιέργεια.';
    } else if (type === 'bird') {
        imageSrc = 'origamiBird2.png';
        title = 'Πουλί Ελευθερίας';
        description = 'Ένα λεπτοδουλεμένο πουλί έτοιμο για απογείωση.';
    } else if (type === 'boat') {
        imageSrc = 'origamiBoat2.png';
        title = 'Χάρτινο Ταξίδι';
        description = 'Ένα μικρό πλοίο που κουβαλά ιστορίες από πέλαγα.';
    } else if (type === 'airplane') {
        imageSrc = 'origamiAirplane2.png';
        title = 'Γερανοί της Ελπίδας';
        description = 'Ο γερανός, σύμβολο ειρήνης και ελπίδας.';
    } else if (type === 'rose') {
        imageSrc = 'origamiRose2.png';
        title = 'Λουλούδι της Ζωής';
        description = 'Ένα λουλούδι που ανθίζει με την τέχνη του οριγκάμι.';
    } else if (type === 'butterfly') {
        imageSrc = 'origamibutterfly2.png';
        title = 'Καρδιά Αγάπης';
        description = 'Μια καρδιά που εκφράζει συναισθήματα και αγάπη.';
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
