const subjects = {
    'Άλγεβρα': ['Εξισώσεις', 'Ανισώσεις'],
    'Γεωμετρία': ['Σχήματα', 'Γωνίες'],
    'Φυσική': ['Κινηματική', 'Δυναμική']
  };
  
  const links = {
    'Εξισώσεις': [
      { text: 'Γραμμικές Εξισώσεις', url: 'ex1.html' },
      { text: 'Δευτεροβάθμιες Εξισώσεις', url: 'ex2.html' }
    ],
    'Ανισώσεις': [
      { text: 'Γραμμικές Ανισώσεις', url: 'an1.html' }
    ],
    'Σχήματα': [
      { text: 'Τρίγωνα', url: 'sx1.html' },
      { text: 'Τετράπλευρα', url: 'sx2.html' }
    ],
    'Γωνίες': [
      { text: 'Είδη Γωνιών', url: 'gn1.html' },
      { text: 'Υπολογισμοί', url: 'gn2.html' }
    ],
    'Κινηματική': [
      { text: 'Ομαλή Κίνηση', url: 'kin1.html' },
      { text: 'Ευθύγραμμη Κίνηση', url: 'kin2.html' }
    ],
    'Δυναμική': [
      { text: 'Νόμοι του Νεύτωνα', url: 'dyn1.html' },
      { text: 'Δυνάμεις', url: 'dyn2.html' }
    ]
  };
  
  let currentSelection = null;
  
  // Κλείσιμο όλων των dropdowns όταν γίνεται κλικ έξω από αυτά
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ring-button') && !e.target.closest('.dropdowns') && !e.target.classList.contains('central-circle')) {
      closeAllMenus();
    }
  });
  
  // Λειτουργικότητα κεντρικού κύκλου
  document.querySelector('.central-circle').addEventListener('click', (e) => {
    e.stopPropagation();
    resetSelection();
  });
  
  // Επεξεργασία κλικ στα κύρια κουμπιά του δακτυλίου
  document.querySelectorAll('.ring-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const subject = button.dataset.subject;
      
      // Reset όλων των κουμπιών πρώτα
      resetButtonsPosition();
      
      // Αν η επιλογή είναι ίδια με την τρέχουσα, κάνε reset
      if (currentSelection === subject) {
        resetSelection();
        return;
      }
      
      // Ενημέρωση του κεντρικού κύκλου
      document.getElementById('main-label').innerText = subject;
      currentSelection = subject;
      
      // Δημιουργία dropdown menu
      createDropdownMenu(subject);
      
      // Εστίαση στο κουμπί που επιλέχθηκε
      animateButtonSelection(button);
    });
  });
  
  // Δημιουργία dropdown menu
  function createDropdownMenu(subject) {
    closeAllMenus();
    
    const dropdowns = document.getElementById('dropdowns');
    const container = document.createElement('div');
    container.className = 'dropdown-container';
  
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
  
    subjects[subject].forEach(topic => {
      const topicButton = document.createElement('button');
      topicButton.innerText = topic;
      topicButton.dataset.topic = topic;
  
      topicButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Κλείσιμο προηγούμενων submenus
        document.querySelectorAll('.submenu').forEach(menu => menu.remove());
        
        // Δημιουργία νέου submenu
        createSubmenu(e.target, topic);
        
        // Εμφάνιση animation
        animateButtonClick(e.target);
      });
  
      dropdown.appendChild(topicButton);
    });
  
    container.appendChild(dropdown);
    dropdowns.appendChild(container);
  }
  
  // Δημιουργία submenu
  function createSubmenu(parentButton, topic) {
    const submenu = document.createElement('div');
    submenu.className = 'submenu';
    
    links[topic].forEach(link => {
      const linkButton = document.createElement('button');
      linkButton.innerText = link.text;
      linkButton.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = link.url;
      });
      
      // Προσθήκη hover effect
      linkButton.addEventListener('mouseenter', () => {
        linkButton.style.transform = 'translateX(5px)';
      });
      linkButton.addEventListener('mouseleave', () => {
        linkButton.style.transform = '';
      });
      
      submenu.appendChild(linkButton);
    });
  
    parentButton.parentNode.insertBefore(submenu, parentButton.nextSibling);
    
    // Animation εμφάνισης
    animateMenuAppearance(submenu);
  }
  
  // Λειτουργικότητα πλήκτρου επιστροφής
  document.querySelector('.back-button').addEventListener('click', (e) => {
    e.stopPropagation();
    resetSelection();
  });
  
  // Απενεργοποίηση κλικ στο ring background
  document.querySelector('.ring').addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  /************************
   * ΒΟΗΘΗΤΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ *
   ***********************/
  
  function resetSelection() {
    document.getElementById('main-label').innerText = 'Επίλεξε';
    closeAllMenus();
    currentSelection = null;
    resetButtonsPosition();
    
    // Animation επιστροφής
    animateCentralCircle();
  }
  
  function closeAllMenus() {
    document.getElementById('dropdowns').innerHTML = '';
  }
  
  function resetButtonsPosition() {
    document.querySelectorAll('.ring-button').forEach((button, index) => {
      button.style.transform = getOriginalTransform(index);
      button.style.backgroundColor = 'rgba(255, 192, 203, 0.4)';
    });
  }
  
  function getOriginalTransform(index) {
    const positions = [
      'translate(160px, 0)',
      'rotate(120deg) translate(160px) rotate(-120deg)',
      'rotate(240deg) translate(160px) rotate(-240deg)'
    ];
    return positions[index];
  }
  
  function animateButtonSelection(button) {
    button.style.transform = button.style.transform + ' scale(1.1)';
    button.style.backgroundColor = 'rgba(255, 192, 203, 0.7)';
    setTimeout(() => {
      button.style.transform = button.style.transform.replace(' scale(1.1)', '');
      button.style.backgroundColor = 'rgba(255, 192, 203, 0.6)';
    }, 300);
  }
  
  function animateButtonClick(button) {
    button.style.transform = 'translateX(10px)';
    setTimeout(() => {
      button.style.transform = '';
    }, 300);
  }
  
  function animateMenuAppearance(menu) {
    menu.style.opacity = '0';
    menu.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      menu.style.opacity = '1';
      menu.style.transform = 'translateY(0)';
    }, 10);
  }
  
  function animateCentralCircle() {
    const centralCircle = document.querySelector('.central-circle');
    centralCircle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      centralCircle.style.transform = '';
    }, 300);
  }