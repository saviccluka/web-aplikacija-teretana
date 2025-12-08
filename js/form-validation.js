document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
          
            resetErrors();
            
            
            let isValid = true;
            

            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                showError(name, 'Molimo unesite vaše ime i prezime');
                isValid = false;
            }
            
            
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                showError(email, 'Molimo unesite vaš email');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Molimo unesite validnu email adresu');
                isValid = false;
            }
            

            const message = document.getElementById('message');
            if (message.value.trim() === '') {
                showError(message, 'Molimo unesite vašu poruku');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Poruka mora sadržati najmanje 10 karaktera');
                isValid = false;
            }
            
            
            if (isValid) {
                alert('Hvala vam na poruci! Kontaktiraćemo vas u najkraćem mogućem roku.');
                contactForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        input.classList.add('error');
    }
    
    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());


        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    }
});