document.addEventListener('DOMContentLoaded', () => {
    const toc = document.getElementById('toc');
    const sections = document.querySelectorAll('section[id]');
    const sidebar = document.getElementById('toc-sidebar');


    function buildToc() {
        toc.innerHTML = '';
         sections.forEach(section => {
              const id = section.getAttribute('id');
                const h2 = section.querySelector('h2');
               if(h2){
                   const title = h2.textContent;
                    const li = document.createElement('li');
                   const a = document.createElement('a');
                 a.href = `#${id}`;
               a.textContent = title;
                 li.appendChild(a);
                  toc.appendChild(li);
            }
        });
      updateActiveLink();
    }

      function updateActiveLink() {
        let currentActive = null;
       sections.forEach(section => {
           const sectionTop = section.offsetTop;
           if (window.scrollY >= sectionTop - 100) {
               currentActive = section;
            }
        });

        const links = toc.querySelectorAll('a');
        links.forEach(link => {
            link.classList.remove('active');
            if (currentActive && link.getAttribute('href') === `#${currentActive.getAttribute('id')}`) {
                link.classList.add('active');
          }
         });
    }

     window.addEventListener('scroll', () => {
        updateActiveLink();
        });

   buildToc();
});