// Required by Webpack - do not touch
require.context('../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require("../stylesheets/main.scss")

//TODO - Your ES6 JavaScript code (if any) goes here

  document.addEventListener('DOMContentLoaded', function () {

  /*
     MOBILE MENU / OVERLAY
*/
  const openButtons = document.querySelectorAll('[id^="menuOpen"]');
  const closeButtons = document.querySelectorAll('[id^="menuClose"], .overlay-close');
  const overlays = document.querySelectorAll('.overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const o = document.querySelector('.overlay');
      if (o) {
        o.classList.add('open');
        o.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      overlays.forEach(o => o.classList.remove('open'));
      overlays.forEach(o => o.setAttribute('aria-hidden', 'true'));
      openButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
      document.body.style.overflow = '';
    });
  });

  overlays.forEach(o => {
    o.addEventListener('click', (e) => {
      if (e.target === o) {
        o.classList.remove('open');
        o.setAttribute('aria-hidden', 'true');
        openButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
        document.body.style.overflow = '';
      }
    });
  });


  /*
     NEWSLETTER VALIDATION
 */
  const newsletter = document.querySelector('.newsletter-form');

  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      const email = newsletter.querySelector('input[name="email"]');
      if (!email || !/^\S+@\S+\.\S+$/.test(email.value)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        email.focus();
      }
    });
  }


  /*
     SIGNUP FORM 
     
  */
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {

    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let username = document.getElementById('username').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let confirmPassword = document.getElementById('confirmPassword').value;
      let message = document.getElementById('message');
      let passwordError = document.getElementById('passwordError');
      let confirmPasswordError = document.getElementById('confirmPasswordError');

      let passwordValid = validatePassword(password);
      if (!passwordValid) {
        passwordError.textContent = 'Password does not meet the requirements.';
        return;
      } else {
        passwordError.textContent = '';
      }

      if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match!';
        return;
      } else {
        confirmPasswordError.textContent = '';
      }

      message.style.color = 'maroon';
      message.textContent = 'Signup successful!';
    });


    /* PASSWORD HINT + STRENGTH BAR */
    const passwordField = document.getElementById('password');
    const passwordHint = document.getElementById('passwordHint');
    const passwordStrength = document.getElementById('passwordStrength');

    if (passwordField && passwordHint) {
      passwordField.addEventListener('focus', () => {
        passwordHint.style.display = 'block';
      });

      passwordField.addEventListener('blur', () => {
        passwordHint.style.display = 'none';
      });
    }

    if (passwordField && passwordStrength) {
      passwordField.addEventListener('input', function () {
        let password = this.value;
        let strength = getPasswordStrength(password);

        passwordStrength.innerHTML = '';

        if (strength) {
          let strengthBar = document.createElement('div');
          strengthBar.className = strength;
          passwordStrength.appendChild(strengthBar);
        }
      });
    }

    /* VALIDATION FUNCTIONS */
    function validatePassword(password) {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    }

    function getPasswordStrength(password) {
      if (password.length < 8) return 'weak';
      if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) return 'strong';
      return 'medium';
    }
  } 
  
  // END signupForm

});