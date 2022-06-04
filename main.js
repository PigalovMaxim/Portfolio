const wrapper = document.querySelector('.wrapper');
const lettersWrapper = document.querySelector('.letters');
let letters = [];
let canPressKey = false;
const cursor = document.getElementById('cursor');
const aura = document.getElementById('aura');
let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;
let canChangePage = true;
loader = () => {
    let progressBar = document.querySelector('.progress_bar');
    let progress = document.querySelector('.progress');
    const startPage = document.querySelector('.startPage');
    let i = 0;
    const interval = setInterval(() => {
        progressBar.style.width = i + '%';
        progress.innerHTML = i + '%';
        i++;
        if (i === 101) {
            clearInterval(interval);
            startPage.classList.add('hide');
            animateWordsAbout();
            canPressKey = true;
            return;
        }
    }, 40);
};
document.querySelectorAll('.mouseLink').forEach(link => {
    link.addEventListener('mouseover', () => {
        cursor.classList.add('activeCursor');
        aura.classList.add('activeCursor');
    });
    link.addEventListener('mouseout', () => {
        cursor.classList.remove('activeCursor');
        aura.classList.remove('activeCursor');
    });
});
window.addEventListener('mousemove', e => {
    getMouseCoords(e);
    cursor.classList.remove('hiddenCursor');
    aura.classList.remove('hiddenCursor');
});
window.addEventListener('mouseout', () => {
    cursor.classList.add('hiddenCursor');
    aura.classList.add('hiddenCursor');
});
window.addEventListener('keydown', (e) => {
    if (!canPressKey || e.key === 'Tab') return;
    const rand = Math.round(Math.random() * letters.length);
    letters[rand].classList.add('playAnim');
    letters[rand].style.color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    letters[rand].innerHTML = e.key;
    setTimeout(() => {
        letters[rand].classList.remove('playAnim');
    }, 1000);
});
document.getElementById('About').addEventListener('click', () => goToPage('About'));
document.getElementById('Skills').addEventListener('click', () => goToPage('Skills'));
document.getElementById('Works').addEventListener('click', () => goToPage('Works'));
document.getElementById('Contacts').addEventListener('click', () => goToPage('Contacts'));

function getMouseCoords(e) {
    mouseX = e.pageX - 3;
    mouseY = e.pageY - 3;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
}
gsap.to({}, 0.01, {
    repeat: -1,
    onRepeat: () => {
        posX += (mouseX - posX) / 3;
        posY += (mouseY - posY) / 3;
        gsap.set(aura, {
            css: {
                left: posX - 24,
                top: posY - 24
            }
        });
    }
});

function goToPage(page) {
    if (!canChangePage) return;
    canChangePage = false;
    setTimeout(() => canChangePage = true, 700);
    (page === 'About') ? wrapper.classList.add('goToAbout'): wrapper.classList.remove('goToAbout');
    (page === 'Skills') ? wrapper.classList.add('goToSkills'): wrapper.classList.remove('goToSkills');
    (page === 'Works') ? wrapper.classList.add('goToWorks'): wrapper.classList.remove('goToWorks');
    (page === 'Contacts') ? wrapper.classList.add('goToContacts'): wrapper.classList.remove('goToContacts');
    (page === 'About') ? document.getElementById('About').classList.add('active'): document.getElementById('About').classList.remove('active');
    (page === 'Skills') ? document.getElementById('Skills').classList.add('active'): document.getElementById('Skills').classList.remove('active');
    (page === 'Works') ? document.getElementById('Works').classList.add('active'): document.getElementById('Works').classList.remove('active');
    (page === 'Contacts') ? document.getElementById('Contacts').classList.add('active'): document.getElementById('Contacts').classList.remove('active');
    let text = '';
    if (page === 'About') text = 'Обо мне';
    else if (page === 'Skills') text = 'Мои навыки';
    else if (page === 'Works') text = 'Мои работы';
    else text = 'Контакты';
    printBGText(text);
}

function printBGText(text) {
    const title = document.querySelector('.page_title');
    title.innerHTML = '';
    let i = 0
    const interval = setInterval(() => {
        title.innerHTML += text[i];
        i++;
        if (i === text.length) {
            clearInterval(interval);
            return;
        }
    }, 50);
}

function separateFirstPageText() {
    const secondTextBlock = document.querySelector('.first .secondText');
    const secondText = document.querySelector('.first .secondText').innerHTML.replaceAll('<br>', '');
    const secondTextArr = secondText.split('');
    secondTextBlock.innerHTML = '';
    secondTextArr.forEach(letter => {
        const a = (letter === ' ') ? ' ' : `<span class='touchableLetter${Math.round(Math.random() * 2 + 1)}'>` + letter + `</span>`;
        secondTextBlock.innerHTML += a;
        if (letter === '.') secondTextBlock.innerHTML += '<br/><br/>';
        if (letter === ',') secondTextBlock.innerHTML += '<br/>';
    });
}

function generateLetters() {
    for (let i = 2; i < 99; i++) {
        const elem = '<label style="left: ' + i + '%" class="keyboardLetter">A</label>';
        lettersWrapper.innerHTML += elem;
    }
    letters = document.querySelectorAll('.keyboardLetter');
}

function animateWordsAbout() {
    gsap.fromTo(".firstText", {
        marginLeft: 100,
        opacity: 0
    }, {
        delay: 1,
        duration: 0.75,
        marginLeft: 0,
        opacity: 1
    });
    gsap.fromTo(".secondText", {
        marginLeft: 100,
        opacity: 0
    }, {
        delay: 1.3,
        duration: 0.75,
        marginLeft: 0,
        opacity: 1
    });
    gsap.fromTo(".thirdText", {
        marginLeft: 100,
        opacity: 0
    }, {
        delay: 1.6,
        duration: 0.75,
        marginLeft: 0,
        opacity: 0.13
    });
}
VANTA.WAVES({
    el: "#waveBG",
    mouseControls: false,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x20202,
    shininess: 11.00,
    waveHeight: 8.50,
    waveSpeed: 0.45,
    zoom: 0.65
})
separateFirstPageText();
generateLetters();
loader();