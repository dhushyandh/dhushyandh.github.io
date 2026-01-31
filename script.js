const sideMenu = document.querySelector('#side-menu');
const navBar = document.querySelector('nav');
const navLinks = document.querySelector('nav ul');
const backToTopBtn = document.getElementById("backToTop");
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalRepo = document.getElementById('modalRepo');
const modalLive = document.getElementById('modalLive');
const modalTech = document.getElementById('modalTech');
const modalFeatures = document.getElementById('modalFeatures');

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


const showMoreBtn = document.getElementById('showMoreBtn');
const moreProjects = document.getElementById('moreProjects');
if (showMoreBtn && moreProjects) {
    showMoreBtn.addEventListener('click', () => {
        const expanded = showMoreBtn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
            moreProjects.classList.add('hidden');
            moreProjects.setAttribute('aria-hidden', 'true');
            showMoreBtn.setAttribute('aria-expanded', 'false');
            showMoreBtn.textContent = 'Show More';
        } else {
            moreProjects.classList.remove('hidden');
            moreProjects.setAttribute('aria-hidden', 'false');
            showMoreBtn.setAttribute('aria-expanded', 'true');
            showMoreBtn.textContent = 'Show Less';

            lucide.createIcons();
        }
    });
}

function openProjectModal(data) {
    modalTitle.textContent = data.title || '';
    modalDesc.textContent = data.description || '';
    if (data.image) modalImage.style.backgroundImage = `url(${data.image})`;
    else modalImage.style.backgroundImage = '';

    if (data.repo) {
        modalRepo.href = data.repo;
        modalRepo.classList.remove('opacity-50', 'pointer-events-none');
        modalRepo.removeAttribute('aria-disabled');
    } else {
        modalRepo.href = '#';
        modalRepo.classList.add('opacity-50', 'pointer-events-none');
        modalRepo.setAttribute('aria-disabled', 'true');
    }

    if (data.live) {
        modalLive.href = data.live;
        modalLive.classList.remove('opacity-50', 'pointer-events-none');
        modalLive.removeAttribute('aria-disabled');
    } else {
        modalLive.href = '#';
        modalLive.classList.add('opacity-50', 'pointer-events-none');
        modalLive.setAttribute('aria-disabled', 'true');
    }

    // Populate tech badges
    if (modalTech) {
        modalTech.innerHTML = '';
        if (data.tech) {
            data.tech.split(',').forEach(t => {
                const chip = document.createElement('span');
                chip.className = 'px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded';
                chip.textContent = t.trim();
                modalTech.appendChild(chip);
            });
        }
    }

    // Populate features list
    if (modalFeatures) {
        modalFeatures.innerHTML = '';
        if (data.features) {
            data.features.split(',').forEach(f => {
                const li = document.createElement('li');
                li.textContent = f.trim();
                modalFeatures.appendChild(li);
            });
        }
    }

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    projectModal.setAttribute('aria-hidden', 'false');
    projectModalClose.focus();
    lucide.createIcons();
}

function closeProjectModal() {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    projectModal.setAttribute('aria-hidden', 'true');
}

// Attach to project cards
document.querySelectorAll('.project-card').forEach(card => {
    // prevent inner link clicks from triggering the card handler
    card.querySelectorAll('a').forEach(a => a.addEventListener('click', e => e.stopPropagation()));

    card.addEventListener('click', () => {
        const data = {
            title: card.dataset.title,
            description: card.dataset.description,
            repo: card.dataset.repo,
            live: card.dataset.live,
            image: card.dataset.image,
            tech: card.dataset.tech,
            features: card.dataset.features
        };

        // fallback to computed background-image if data-image not set or is empty
        if (!data.image) {
            const bg = window.getComputedStyle(card).backgroundImage;
            if (bg && bg !== 'none') {
                // bg is like: url("https://...")
                const url = bg.replace(/^url\((?:\"|')?/, '').replace(/(?:\"|')?\)$/, '');
                data.image = url;
            }
        }

        openProjectModal(data);
    });
});

projectModalClose?.addEventListener('click', closeProjectModal);
projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
        closeProjectModal();
    }
});
