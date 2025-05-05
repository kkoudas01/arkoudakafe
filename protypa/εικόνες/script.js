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

const ringButtons = document.querySelectorAll('.ring-button');
const centralCircle = document.getElementById('main-label');
const dropdownsContainer = document.getElementById('dropdowns');
const backButton = document.querySelector('.back-button');

let currentlySelectedButton = null; // Παρακολουθεί το τρέχον επιλεγμένο κουμπί

// --- Βοηθητικές Συναρτήσεις ---

// Επαναφέρει ένα κουμπί στην αρχική του οπτική κατάσταση (στον δακτύλιο)
function resetButtonState(button) {
  if (button) {
      button.style.opacity = '1'; // Επανεμφάνιση
      button.style.pointerEvents = 'auto'; // Ενεργοποίηση ξανά
      // Δεν χρειάζεται να επαναφέρουμε το transform εδώ, η αρχική θέση ορίζεται από το CSS
  }
}

// Ορίζει ένα κουμπί ως επιλεγμένο (το "στέλνει" στο κέντρο)
function selectButton(button) {
  const subject = button.dataset.subject;

  // Ενημέρωση κεντρικού κύκλου
  centralCircle.innerText = subject;
  centralCircle.classList.add('can-reset'); // Προσθήκη κλάσης για cursor: pointer

  // "Κρύψιμο" του κουμπιού από τον δακτύλιο με animation
  button.style.opacity = '0';
  button.style.pointerEvents = 'none'; // Απενεργοποίηση κλικ όσο είναι "κρυμμένο"

  currentlySelectedButton = button; // Ορισμός ως τρέχον επιλεγμένο

  createDropdownMenu(subject); // Δημιουργία dropdowns
}

// Πλήρης επαναφορά στην αρχική κατάσταση (κανένα κουμπί επιλεγμένο)
function resetToDefaultState() {
  if (currentlySelectedButton) {
      resetButtonState(currentlySelectedButton); // Επαναφορά του κουμπιού οπτικά
      currentlySelectedButton = null; // Καθαρισμός επιλογής
  }
  centralCircle.innerText = 'Επίλεξε'; // Επαναφορά κειμένου
  centralCircle.classList.remove('can-reset'); // Αφαίρεση κλάσης cursor
  dropdownsContainer.innerHTML = ''; // Καθαρισμός dropdowns

  // Animation για τον κεντρικό κύκλο (προαιρετικό, όπως στο αρχικό back button)
  centralCircle.style.transform = 'scale(0.9)';
  setTimeout(() => {
      centralCircle.style.transform = '';
  }, 300);
}

// --- Event Listeners ---

// 1. Κλικ στα κουμπιά του δακτυλίου (Ροζ Κύκλοι)
ringButtons.forEach(button => {
  button.addEventListener('click', (e) => {
      e.stopPropagation();
      const clickedButton = e.target;

      // Αν πατηθεί το ήδη επιλεγμένο, μην κάνεις τίποτα
      if (clickedButton === currentlySelectedButton) {
          return;
      }

      // Αν υπήρχε άλλο κουμπί επιλεγμένο, επανέφερέ το πρώτα οπτικά
      if (currentlySelectedButton) {
          resetButtonState(currentlySelectedButton);
      }

      // Επίλεξε το νέο κουμπί
      selectButton(clickedButton);
  });
});

// 2. Κλικ στον κεντρικό κύκλο (Γκρι Κύκλος) - Απαίτηση 1
centralCircle.addEventListener('click', (e) => {
  e.stopPropagation();
  // Αν κάποιο κουμπί είναι επιλεγμένο, κάνε επαναφορά
  if (currentlySelectedButton) {
      resetToDefaultState();
  }
  // Αν δεν είναι κανένα επιλεγμένο, δεν κάνει τίποτα το κλικ στο κέντρο
});

// 3. Κλικ στο κουμπί "Επιστροφή"
backButton.addEventListener('click', (e) => {
  e.stopPropagation();
  resetToDefaultState(); // Χρησιμοποιούμε την ίδια λογική επαναφοράς
});

// 4. Κλικ οπουδήποτε αλλού (για κλείσιμο dropdowns - προαιρετικό, μπορεί να αφαιρεθεί αν η επαναφορά γίνεται μόνο με το κεντρικό κουμπί/back)
// document.addEventListener('click', (e) => {
//     // Αν το κλικ ΔΕΝ είναι σε κουμπί δακτυλίου, ούτε στο κέντρο, ούτε στα dropdowns, ούτε στο back button
//     if (!e.target.closest('.ring-button') &&
//         !e.target.closest('.central-circle') &&
//         !e.target.closest('.dropdowns-container') &&
//         !e.target.closest('.back-button'))
//     {
//         // Επιλέξτε αν θέλετε πλήρη επαναφορά ή μόνο κλείσιμο dropdowns
//         // resetToDefaultState(); // Για πλήρη επαναφορά
//         // dropdownsContainer.innerHTML = ''; // Για να κλείνουν μόνο τα dropdowns
//     }
// });

// 5. Απενεργοποίηση κλικ στο background του δακτυλίου (παραμένει)
document.querySelector('.ring').addEventListener('click', (e) => {
  e.stopPropagation();
});


// --- Συναρτήσεις για Dropdowns (Παραμένουν ίδιες με πριν) ---

function createDropdownMenu(subject) {
  dropdownsContainer.innerHTML = ''; // Καθαρίζει προηγούμενα dropdowns

  const container = document.createElement('div');
  container.className = 'dropdown-container';

  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';

  if (subjects[subject]) { // Έλεγχος αν υπάρχει το subject
      subjects[subject].forEach(topic => {
          const topicButton = document.createElement('button');
          topicButton.innerText = topic;
          topicButton.dataset.topic = topic;

          topicButton.addEventListener('click', (e) => {
              e.stopPropagation();
              document.querySelectorAll('.submenu').forEach(menu => menu.remove());
              createSubmenu(e.target, topic);
              // Μικρό animation στο κουμπί θέματος
              e.target.style.transform = 'translateX(5px)';
              setTimeout(() => { e.target.style.transform = ''; }, 200);
          });

          dropdown.appendChild(topicButton);
      });
  }

  container.appendChild(dropdown);
  dropdownsContainer.appendChild(container);

   // Animation εμφάνισης του dropdown container
  dropdownsContainer.style.opacity = '0';
  dropdownsContainer.style.transform = 'translateY(-10px)';
  setTimeout(() => {
      dropdownsContainer.style.opacity = '1';
      dropdownsContainer.style.transform = 'translateY(0)';
  }, 10); // Μικρή καθυστέρηση για να εφαρμοστεί η transition
}

function createSubmenu(parentButton, topic) {
  const submenu = document.createElement('div');
  submenu.className = 'submenu';

  if (links[topic]) { // Έλεγχος αν υπάρχει το topic
      links[topic].forEach(link => {
          const linkButton = document.createElement('button');
          linkButton.innerText = link.text;
          linkButton.addEventListener('click', (e) => {
              e.stopPropagation();
              window.location.href = link.url;
          });

          linkButton.addEventListener('mouseenter', () => { linkButton.style.transform = 'translateX(3px)'; });
          linkButton.addEventListener('mouseleave', () => { linkButton.style.transform = ''; });

          submenu.appendChild(linkButton);
      });
  }

  // Τοποθέτηση του submenu δίπλα στο parent button container
  parentButton.closest('.dropdown-container').appendChild(submenu);

  // Animation εμφάνισης του submenu
  submenu.style.opacity = '0';
  submenu.style.transform = 'translateX(-10px)';
  setTimeout(() => {
      submenu.style.opacity = '1';
      submenu.style.transform = 'translateX(0)';
  }, 10);
   // Ρύθμιση θέσης submenu (ίσως χρειαστεί προσαρμογή ανάλογα με τη δομή)
  const parentRect = parentButton.getBoundingClientRect();
  const containerRect = dropdownsContainer.getBoundingClientRect();
  submenu.style.position = 'absolute'; // Βεβαιωθείτε ότι είναι absolute
  submenu.style.left = `${parentRect.right - containerRect.left + 10}px`; // 10px δεξιά από το κουμπί
  submenu.style.top = `${parentRect.top - containerRect.top}px`; // Στο ίδιο ύψος με το κουμπί

}

// --- Αρχικοποίηση ---
// (Πλέον δεν χρειάζεται να αποθηκεύουμε αρχικά transforms καθώς το reset βασίζεται στο CSS)