setTimeout(function () {
  const slider = document.getElementById('cms-slider-1');

  console.log('landing script slider', slider);
  if (!slider) {
    return
  }

  const i = parseInt(slider.getAttribute('data-interval'), 10);
  let timer = setTimeout(next, i);

  slider.addEventListener('click', function (event) {
    console.log('slider click', event.target.tagName);
    if (event.target && event.target.tagName === 'A') {
      return;
    }

    if (event.clientX - slider.offsetLeft < slider.clientWidth * .2) {
      prev(event);
    } else {
      next(event);
    }
  });

  function next(event) {
    clearTimeout(timer);

    const current = slider.querySelector('.cms-slide.active');
    if (!current.nextElementSibling) {
      current.parentNode.insertBefore(current, current.parentNode.firstChild);
    }

    setTimeout(function () {
      current.classList.remove('active');
      current.nextElementSibling.classList.add('active');
    }, 1);

    timer = setTimeout(next, event && event.target ? i * 2 : i);
  }

  function prev(event) {
    clearTimeout(timer);

    const current = slider.querySelector('.cms-slide.active');
    if (!current.previousElementSibling) {
      current.parentNode.appendChild(current);
    }

    setTimeout(function () {
      current.classList.remove('active');
      current.previousElementSibling.classList.add('active');
    }, 1);

    timer = setTimeout(next, event && event.target ? i * 2 : i);
  }
}, 500);
