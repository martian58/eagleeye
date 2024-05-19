document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const overlay = document.getElementById('overlay');

    burger.addEventListener('click', function() {
        burger.classList.toggle('toggle');
        overlay.classList.toggle('show');
    });
});
