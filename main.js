const wrapper = document.querySelector('.wrapper');
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
            return;
        }
    }, 40);
};
document.getElementById('About').addEventListener('click', () => goToPage('About'));
document.getElementById('Skills').addEventListener('click', () => goToPage('Skills'));
document.getElementById('Works').addEventListener('click', () => goToPage('Works'));
document.getElementById('Contacts').addEventListener('click', () => goToPage('Contacts'));

function goToPage(page) {
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
    }, 100);
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
separateFirstPageText();
loader();