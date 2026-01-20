// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Set current date in footer
    const currentDateElement = document.getElementById('current-date');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = today.toLocaleDateString('en-US', options);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Print/Download functionality
    const printBtn = document.getElementById('print-btn');
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Add active class to nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add active class styling to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            background-color: #3498db !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);
    
    // Print optimization - add page breaks for printing
    const printStyle = document.createElement('style');
    printStyle.media = 'print';
    printStyle.textContent = `
        .resume-section {
            page-break-inside: avoid;
        }
        
        .resume-content {
            page-break-before: always;
        }
        
        .left-column, .right-column {
            page-break-inside: avoid;
        }
    `;
    document.head.appendChild(printStyle);
});