// Rotating tips in homepage card
const tips = [
    'Use meaningful HTML tags.',
    'Keep CSS DRY-avoid repetition.',
    'Make it responsive - test on mobile.',
    'Validate your HTML before submitting.',
    'Small, focused functions are easier to test.'
];

let tipIndex = 0;

const tipEl = document.getElementById('rotatingTip');
const thanks = document.getElementById('thanks');

function showTip() {
    if(!tipEl) return;

    tipEl.textContent = tips[tipIndex % tips.length];
    tipIndex++;
}

if(tipEl){
    showTip();

    setInterval(showTip, 5000);

    document.getElementById('tipBtn').addEventListener('click', ()=> {
        showTip();
        thanks.classList.remove('d-none');
        setTimeout(()=> thanks.classList.add('d-none'), 1200);
    });
}

// Year in homepage footer:

document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// Theme toggle with persistence (localStorage) + CSS variables

const root = document.documentElement;
const THEME_KEY = 'prefers-dark';

if(localStorage.getItem(THEME_KEY) == 'true'){
    root.classList.add('dark');
}

const toggleBtn = document.getElementById('themeToggle');

if(toggleBtn){
    toggleBtn.addEventListener('click', () => {
        root.classList.toggle('dark');
        localStorage.setItem(THEME_KEY, root.classList.contains('dark'));
    });
}

// JS form validation feedback:

const form = document.getElementById('contactForm');

if(form){
    form.addEventListener('submit', (e) =>{
        e.preventDefault();

        const name = form.name;
        const email = form.email;
        let valid = true;

        if(name.value.trim().length < 2){
            name.classList.add('is-invalid');
            valid = false;
        }
        else{
            name.classList.remove('is-invalid');
        }

        if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){
            email.classList.add('is-invalid');
            valid=false;
        }
        else{
            email.classList.remove('is-invalid');
        }

        const alert = document.getElementById('formAlert');

        if(valid){
            alert.textContent = 'Thanks! Your (demo) message was validated locally.';
            alert.classList.remove('d-none', 'alert-danger');
            alert.classList.add('alert-success');
            form.reset();
        }
        else{
            alert.textContent = 'Please fix the highlighted fields and try again.';
            alert.classList.remove('d-none', 'alert-success');
            alert.classList.add('alert-danger');
        }
    });
}
