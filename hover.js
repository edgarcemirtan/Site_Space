const objects = document.querySelectorAll('.object');

objects.forEach(obj => {
    const info = obj.querySelector('.info');
    let timeout;

    obj.addEventListener('mouseenter', () => {
        timeout = setTimeout(() => {
            info.style.opacity = "1";
            info.style.transform = "translate(-50%, -50%)";
        }, 300); // delay vizibil
    });

    obj.addEventListener('mouseleave', () => {
        clearTimeout(timeout);
        info.style.opacity = "0";
        info.style.transform = "translate(-50%, -40%)";
    });
});