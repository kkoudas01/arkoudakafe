
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
    el.style.transform = 'scale(1.3)';
}

function removeEffect(el) {
    el.style.transform = 'scale(1)';
}
