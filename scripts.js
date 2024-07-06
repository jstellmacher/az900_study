document.addEventListener('DOMContentLoaded', function() {
    fetch('questions.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('accordion-container');
        data.forEach(item => {
          const button = document.createElement('button');
          button.classList.add('accordion');
          button.textContent = item.question;
  
          const panel = document.createElement('div');
          panel.classList.add('panel');
          panel.innerHTML = `<p>${item.answer}</p>`;
  
          container.appendChild(button);
          container.appendChild(panel);
  
          button.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
          });
        });
      });
  });
  