document.addEventListener('DOMContentLoaded', function() {
  // Function to create navigation links dynamically
  function createNavigationLinks() {
    const navigationLinks = [
      { title: 'Home', iconClass: 'fa fa-home', link: 'index.html' },
      { title: 'About Me', iconClass: 'fa fa-user', link: 'about.html' }
      // Add more navigation links as needed
    ];

    const iconBar = document.getElementById('icon-bar');

    navigationLinks.forEach(link => {
      const linkElement = document.createElement('a');
      linkElement.href = link.link;
      linkElement.innerHTML = `<i class="${link.iconClass}"></i>`;
      if (isActiveLink(link.link)) {
        linkElement.classList.add('active');
      }
      iconBar.appendChild(linkElement);
    });
  }

  // Function to check if a link should be active based on the current page URL
  function isActiveLink(link) {
    return window.location.pathname === `/${link}`;
  }

  // Function to fetch and populate About section content
  function fetchAboutData() {
    fetch('about.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('about-title').textContent = data.title;

        const aboutSection = document.getElementById('about-section');
        data.content.forEach(paragraph => {
          const p = document.createElement('p');
          p.textContent = paragraph;
          aboutSection.appendChild(p);
        });

        const socialLinks = document.createElement('ul');
        socialLinks.className = 'social-links';
        data.socialLinks.forEach(link => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = link.link;
          a.target = '_blank';
          a.classList.add('social-icon', `${link.platform.toLowerCase()}-icon`); // Add 'social-icon' and platform-specific class
          a.innerHTML = `<i class="${link.iconClass}"></i>`; // Include iconClass for specific icon styling
          li.appendChild(a);
          socialLinks.appendChild(li);
        });
        aboutSection.appendChild(socialLinks);
      })
      .catch(error => console.error('Error fetching About section data:', error));
  }

  // Function to fetch and populate accordion content
  function fetchAccordionData() {
    fetch('questions.json')
      .then(response => response.json())
      .then(data => {
        const accordionContainer = document.getElementById('accordion-container');
        const paginationContainer = document.getElementById('pagination');
  
        const itemsPerPage = 10; // Number of items per page
        let currentPage = 1; // Track current page
  
        // Calculate total pages
        const totalPages = Math.ceil(data.length / itemsPerPage);
  
        // Function to display questions for a given page
        function displayQuestions(pageNumber) {
          accordionContainer.innerHTML = ''; // Clear previous questions
  
          const startIndex = (pageNumber - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const pageQuestions = data.slice(startIndex, endIndex);
  
          pageQuestions.forEach(item => {
            const button = document.createElement('button');
            button.classList.add('accordion');
            button.innerHTML = item.question.replace(/\n/g, '<br>');
  
            const panel = document.createElement('div');
            panel.classList.add('panel');
            panel.style.display = 'none'; // Hide panel by default
            panel.innerHTML = `<p>${item.answer.replace(/\n/g, '<br>')}</p>`;
  
            accordionContainer.appendChild(button);
            accordionContainer.appendChild(panel);
  
            button.addEventListener('click', function() {
              this.classList.toggle('active');
              if (panel.style.display === 'block') {
                panel.style.display = 'none';
              } else {
                panel.style.display = 'block';
              }
            });
          });
  
          // Update current page
          currentPage = pageNumber;
          updatePaginationState();
        }
  
        // Function to create pagination links
        function createPaginationLinks() {
          paginationContainer.innerHTML = ''; // Clear previous pagination links
  
          for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = i;
            link.addEventListener('click', function(event) {
              event.preventDefault();
              displayQuestions(i);
            });
  
            paginationContainer.appendChild(link);
  
            if (i < totalPages) {
              const separator = document.createTextNode(' ');
              paginationContainer.appendChild(separator);
            }
          }
  
          // Initially set active class on first page link
          updatePaginationState();
        }
  
        // Function to update active state in pagination links
        function updatePaginationState() {
          const links = paginationContainer.getElementsByTagName('a');
          for (let link of links) {
            const pageNumber = parseInt(link.textContent);
            if (pageNumber === currentPage) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          }
        }
  
        // Initial display of questions (first page)
        displayQuestions(1);
        // Create pagination links after fetching data
        createPaginationLinks();
      })
      .catch(error => console.error('Error fetching accordion data:', error));
  }
  
  
      


  // Function to handle sidebar collapse toggle
  function handleSidebarCollapse() {
    const toggleBtn = document.getElementById('toggle-btn');
    const iconBar = document.getElementById('icon-bar');
    const nav = document.querySelector('nav');

    toggleBtn.addEventListener('click', function() {
      nav.classList.toggle('collapsed');
      iconBar.classList.toggle('collapsed');
    });
  }

  // Call functions to initialize page elements
  createNavigationLinks();
  fetchAboutData();
  fetchAccordionData();
  handleSidebarCollapse();
});

// Fetch and display disclaimer information
document.addEventListener('DOMContentLoaded', () => {
  fetch('disclaimer.json')
    .then(response => response.json())
    .then(data => {
      const disclaimerContainer = document.getElementById('disclaimer-container');
      const disclaimer = data.disclaimer;

      // Create and populate disclaimer elements
      const title = document.createElement('h2');
      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-info-circle', 'disclaimer-icon');
      title.appendChild(icon);
      title.appendChild(document.createTextNode(disclaimer.title));
      disclaimerContainer.appendChild(title);

      const message = document.createElement('p');
      message.textContent = disclaimer.message;
      disclaimerContainer.appendChild(message);

      const pointsList = document.createElement('ul');
      disclaimer.points.forEach(point => {
        const listItem = document.createElement('li');
        listItem.textContent = point.text;

        if (point.subpoints && Array.isArray(point.subpoints)) {
          const subList = document.createElement('ul');
          point.subpoints.forEach(subPoint => {
            const subListItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = subPoint.link;
            link.textContent = subPoint.text;
            link.target = '_blank';
            subListItem.appendChild(link);
            subList.appendChild(subListItem);
          });
          listItem.appendChild(subList);
        }

        pointsList.appendChild(listItem);
      });
      disclaimerContainer.appendChild(pointsList);

      const footer = document.createElement('p');
      footer.textContent = disclaimer.footer;
      disclaimerContainer.appendChild(footer);
    })
    .catch(error => console.error('Error fetching disclaimer:', error));
});
