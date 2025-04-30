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
  
  // Κλείσιμο όλων των dropdowns όταν γίνεται κλικ έξω από αυτά
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ring-button') && !e.target.closest('.dropdowns')) {
      document.getElementById('dropdowns').innerHTML = '';
    }
  });
  
  // Επεξεργασία κλικ στα κύρια κουμπιά του δακτυλίου
  document.querySelectorAll('.ring-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const subject = button.dataset.subject;
      
      // Ενημέρωση του κεντρικού κύκλου
      document.getElementById('main-label').innerText = subject;
      
      // Δημιουργία dropdown menu
      createDropdownMenu(subject);
      
      // Εστίαση στο κουμπί που επιλέχθηκε
      button.style.transform = button.style.transform + ' scale(1.1)';
      setTimeout(() => {
        button.style.transform = button.style.transform.replace(' scale(1.1)', '');
      }, 300);
    });
  });
  
  // Δημιουργία dropdown menu
  function createDropdownMenu(subject) {
    const dropdowns = document.getElementById('dropdowns');
    dropdowns.innerHTML = '';
  
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
        e.target.style.transform = 'translateX(10px)';
        setTimeout(() => {
          e.target.style.transform = '';
        }, 300);
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
    submenu.style.opacity = '0';
    submenu.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      submenu.style.opacity = '1';
      submenu.style.transform = 'translateY(0)';
    }, 10);
  }
  
  // Λειτουργικότητα πλήκτρου επιστροφής
  document.querySelector('.back-button').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('main-label').innerText = 'Επίλεξε';
    document.getElementById('dropdowns').innerHTML = '';
    
    // Animation επιστροφής
    const centralCircle = document.querySelector('.central-circle');
    centralCircle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      centralCircle.style.transform = '';
    }, 300);
  });
  
  // Απενεργοποίηση κλικ στο ring background
  document.querySelector('.ring').addEventListener('click', (e) => {
    e.stopPropagation();
  });