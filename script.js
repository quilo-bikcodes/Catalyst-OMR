const qNosRight = document.querySelector('.q-nos-right');

for (let i = 1; i <= 100; i++) {
    const button = document.createElement('a');
    button.href = '#';
    button.className = 'q-nos-right';
    button.textContent = i;
    qNosRight.appendChild(button);
}