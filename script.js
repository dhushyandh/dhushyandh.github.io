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
const certificateModal = document.getElementById('certificateModal');
const certificateModalClose = document.getElementById('certificateModalClose');
const certificateModalPreview = document.getElementById('certificateModalPreview');
const certificateModalTitle = document.getElementById('certificateModalTitle');
const certificateModalMeta = document.getElementById('certificateModalMeta');
const certificateModalDesc = document.getElementById('certificateModalDesc');
const certificateModalView = document.getElementById('certificateModalView');
const certificateModalDownload = document.getElementById('certificateModalDownload');

// Safe icon initializer — guards against lucide not being loaded.
function safeCreateIcons() {
    if (window.lucide && typeof lucide.createIcons === 'function') {
        try {
            lucide.createIcons();
        } catch (err) {
            console.warn('lucide.createIcons() failed:', err);
        }
    }
}

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

        safeCreateIcons();
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


const savedTheme = localStorage.theme;

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}


function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    safeCreateIcons();
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

            safeCreateIcons();
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
    safeCreateIcons();
}

function closeProjectModal() {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    projectModal.setAttribute('aria-hidden', 'true');
}

function openCertificateModal(data) {
    const certificateFileUrl = data.file ? new URL(encodeURI(data.file), window.location.href).href : '';

    if (certificateModalTitle) certificateModalTitle.textContent = data.title || '';
    if (certificateModalMeta) certificateModalMeta.textContent = `${data.issuer || ''}${data.year ? ` • ${data.year}` : ''}`;
    if (certificateModalDesc) certificateModalDesc.textContent = data.description || '';

    if (certificateModalPreview) {
        certificateModalPreview.innerHTML = '';
        const isPdfPreview = typeof data.preview === 'string' && data.preview.toLowerCase().includes('.pdf');

        if (data.preview && isPdfPreview) {
            certificateModalPreview.style.backgroundImage = 'none';
            certificateModalPreview.classList.remove('flex', 'items-center', 'justify-center', 'text-white', 'font-semibold', 'text-lg');
            const pdf = document.createElement('object');
            pdf.setAttribute('data', `${data.preview}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`);
            pdf.setAttribute('type', 'application/pdf');
            pdf.className = 'w-full h-full rounded-lg bg-white dark:bg-gray-900';
            certificateModalPreview.appendChild(pdf);
        } else if (data.preview) {
            certificateModalPreview.style.backgroundImage = `url(${data.preview})`;
            certificateModalPreview.textContent = '';
            certificateModalPreview.classList.remove('flex', 'items-center', 'justify-center', 'text-white', 'font-semibold', 'text-lg');
        } else {
            certificateModalPreview.style.backgroundImage = 'linear-gradient(135deg, #5b21b6, #9333ea)';
            certificateModalPreview.textContent = 'Certificate Preview';
            certificateModalPreview.classList.add('flex', 'items-center', 'justify-center', 'text-white', 'font-semibold', 'text-lg');
        }
    }

    if (certificateModalView) {
        if (certificateFileUrl) {
            certificateModalView.href = certificateFileUrl;
            certificateModalView.classList.remove('opacity-50', 'pointer-events-none');
            certificateModalView.removeAttribute('aria-disabled');
        } else {
            certificateModalView.href = '#';
            certificateModalView.classList.add('opacity-50', 'pointer-events-none');
            certificateModalView.setAttribute('aria-disabled', 'true');
        }
    }

    if (certificateModalDownload) {
        if (certificateFileUrl) {
            certificateModalDownload.href = certificateFileUrl;
            certificateModalDownload.classList.remove('opacity-50', 'pointer-events-none');
            certificateModalDownload.removeAttribute('aria-disabled');
        } else {
            certificateModalDownload.href = '#';
            certificateModalDownload.classList.add('opacity-50', 'pointer-events-none');
            certificateModalDownload.setAttribute('aria-disabled', 'true');
        }
    }

    certificateModal?.classList.remove('hidden');
    certificateModal?.classList.add('flex');
    certificateModal?.setAttribute('aria-hidden', 'false');
    certificateModalClose?.focus();
}

function closeCertificateModal() {
    certificateModal?.classList.add('hidden');
    certificateModal?.classList.remove('flex');
    certificateModal?.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.project-card').forEach(card => {

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

        if (!data.image) {
            const bg = window.getComputedStyle(card).backgroundImage;
            if (bg && bg !== 'none') {
                const url = bg.replace(/^url\((?:\"|')?/, '').replace(/(?:\"|')?\)$/, '');
                data.image = url;
            }
        }

        openProjectModal(data);
    });
});

document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', () => {
        const data = {
            title: card.dataset.title,
            issuer: card.dataset.issuer,
            year: card.dataset.year,
            description: card.dataset.description,
            preview: card.dataset.preview,
            file: card.dataset.file
        };
        openCertificateModal(data);
    });
});

projectModalClose?.addEventListener('click', closeProjectModal);
projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
});
certificateModalClose?.addEventListener('click', closeCertificateModal);
certificateModal?.addEventListener('click', (e) => {
    if (e.target === certificateModal) closeCertificateModal();
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
        closeProjectModal();
    }
    if (e.key === 'Escape' && certificateModal && !certificateModal.classList.contains('hidden')) {
        closeCertificateModal();
    }
});

if (window.lucide && typeof lucide.createIcons === 'function') {
    try {
        lucide.createIcons();
    } catch (err) {
        console.warn('lucide.createIcons() failed:', err);
    }
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.lucide && typeof lucide.createIcons === 'function') {
            try {
                lucide.createIcons();
            } catch (err) {
                console.warn('lucide.createIcons() failed on DOMContentLoaded:', err);
            }
        }
    });
}
// Final safety: try once more after full load
window.addEventListener('load', () => {
    safeCreateIcons();
});

// Fallback renderer: if lucide failed to load, replace <i data-lucide> with simple text/icon
window.addEventListener('load', () => {
    if (window.__lucideFailed) {
        const map = {
            github: 'GH',
            instagram: 'IG',
            linkedin: 'IN',
            'arrow-up': '↑',
            'arrow-up-right': '↗'
        };
        document.querySelectorAll('i[data-lucide]').forEach(i => {
            const name = i.getAttribute('data-lucide');
            const txt = map[name] || name || '';
            const span = document.createElement('span');
            span.className = 'inline-block';
            span.textContent = txt;
            i.replaceWith(span);
        });
        console.warn('Lucide failed to load — applied simple text fallbacks for icons.');
    }
});

// Chat widget logic: sends user message to Flask backend at /chat
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');
const chatFloatingClose = document.getElementById('chat-floating-close');
const chatHeaderClose = document.getElementById('chat-close');
const chatClear = document.getElementById('chat-clear');

function appendMessage(text, from = 'bot') {
    if (!chatBox) return;
    const wrap = document.createElement('div');
    wrap.className = from === 'user' ? 'flex justify-end' : 'flex justify-start';

    const bubble = document.createElement('div');
    if (from === 'user') {
        bubble.className = 'inline-block px-3 py-2 rounded-full text-sm text-white' ;
        bubble.style.background = 'linear-gradient(90deg,#b820e6,#7b20e6)';
        bubble.textContent = text;
    } else {
        bubble.className = 'inline-block max-w-full bg-white rounded-xl p-3 shadow-sm text-sm text-gray-800';
        // allow multiline and preserve newlines
        bubble.innerHTML = text.replace(/\n/g, '<br>');
    }

    wrap.appendChild(bubble);
    chatBox.appendChild(wrap);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(optMessage) {
    const msg = (optMessage || chatInput?.value || '').trim();
    if (!msg) return;
    appendMessage(msg, 'user');
    if (!optMessage && chatInput) chatInput.value = '';

        try {
            const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === 'https://dhushyandh.me'
                ? 'http://localhost:5000/chat'
                : `${window.location.origin}/chat`;
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            });
            if (!res.ok) {
                throw new Error(`Chat API returned ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            const resp = data.response;
            if (!resp) {
                appendMessage('No response from server', 'bot');
            } else if (typeof resp === 'string') {
                appendMessage(resp, 'bot');
            } else if (typeof resp === 'object') {
                appendMessage(resp.text || '', 'bot');
                if (Array.isArray(resp.options) && resp.options.length) {
                    renderOptions(resp.options);
                }
            } else {
                appendMessage(String(resp), 'bot');
            }
    } catch (err) {
        appendMessage('Error: could not reach chat server', 'bot');
        console.error('Chat error', err);
    }
}

// Render radio-style options inside the chat as a bot message
function renderOptions(options) {
    if (!chatBox || !options || !options.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'text-left';

    const container = document.createElement('div');
    container.className = 'inline-block px-3 py-2 rounded-lg bg-gray-100 text-black';

    const form = document.createElement('form');
    form.className = 'flex flex-col gap-2';

    options.forEach((opt, idx) => {
        const id = `chat-opt-${Date.now()}-${idx}`;
        const label = document.createElement('label');
        label.className = 'flex items-center gap-2 text-sm cursor-pointer';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'chatOptions';
        input.value = opt;
        input.id = id;
        input.className = 'mr-2';
        input.addEventListener('change', () => {
            // send selected option text
            sendMessage(opt);
            // remove options UI after selection
            wrap.remove();
        });

        const span = document.createElement('span');
        span.textContent = opt;

        label.appendChild(input);
        label.appendChild(span);
        form.appendChild(label);
    });

    container.appendChild(form);
    wrap.appendChild(container);
    chatBox.appendChild(wrap);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {
    if (!chatBox) return;
    chatBox.innerHTML = '';
    if (chatInput) {
        chatInput.value = '';
        chatInput.focus();
    }
}

if (chatSend) chatSend.addEventListener('click', () => sendMessage());
if (chatInput) chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
if (chatClear) chatClear.addEventListener('click', clearChat);

// Open widget using toggle button
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWidget?.classList.remove('hidden');
        chatToggle.classList.add('hidden');
        // send greeting to populate options
        sendMessage('hi');
    });
}

// Close widget handlers
if (chatFloatingClose) {
    chatFloatingClose.addEventListener('click', () => {
        chatWidget?.classList.add('hidden');
        chatToggle?.classList.remove('hidden');
    });
}

if (chatHeaderClose) {
    chatHeaderClose.addEventListener('click', () => {
        chatWidget?.classList.add('hidden');
        chatToggle?.classList.remove('hidden');
    });
}
