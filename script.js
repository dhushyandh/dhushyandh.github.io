const sideMenu = document.querySelector('#side-menu');
const navBar = document.querySelector('nav');
const navLinks = document.querySelector('nav ul');
const backToTopBtn = document.getElementById("backToTop");

function openMenu() {
    sideMenu.style.transform = 'translateX(-16rem)';
}

function closeMenu() {
    sideMenu.style.transform = 'translateX(16rem)';
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navBar.classList.add(
            'bg-white',
            'bg-opacity-50',
            'backdrop-blur-lg',
            'shadow-sm',
            'dark:bg-darkTheme/80',
            'dark:shadow-white/20'
        );
        navLinks?.classList.remove(
            'bg-white',
            'shadow-sm',
            'bg-opacity-50',
            'dark:border',
            'dark:border-white/50',
            'dark:bg-transparent'
        );
    } else {
        navBar.classList.remove(
            'bg-white',
            'bg-opacity-50',
            'backdrop-blur-lg',
            'shadow-sm',
            'dark:bg-darkTheme/80',
            'dark:shadow-white/20'
        );
        navLinks?.classList.add(
            'bg-white',
            'shadow-sm',
            'bg-opacity-50',
            'dark:border',
            'dark:border-white/50',
            'dark:bg-transparent'
        );
    }


    if (window.scrollY > 300) {
        backToTopBtn.classList.remove("hidden");
        backToTopBtn.classList.add("flex");


        lucide.createIcons();
    } else {
        backToTopBtn.classList.add("hidden");
        backToTopBtn.classList.remove("flex");
    }
});


backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});


const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.theme;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
}


function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    lucide.createIcons();
}
