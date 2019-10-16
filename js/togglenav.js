// Nav Bar Toggle

function classToggle() {
const navs = document.querySelectorAll('.nav-menu')

navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
}

document.querySelector('.Navbar__Link-toggle')
.addEventListener('click', classToggle);
