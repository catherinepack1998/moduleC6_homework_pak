const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  alert(`Размер вашего экрана: ${window.innerWidth} ширина, ${window.innerHeight} высота`)
});
