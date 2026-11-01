(function () {
    'use strict';

    var header = document.getElementById('header');
    var burger = document.querySelector('.burger');
    var nav = document.getElementById('nav');
    var body = document.body;

    function setMenu(open) {
        if (!nav || !burger) {
            return;
        }

        nav.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        body.classList.toggle('menu-open', open);
    }

    if (burger && nav) {
        burger.addEventListener('click', function () {
            setMenu(!nav.classList.contains('is-open'));
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenu(false);
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) {
                setMenu(false);
                burger.focus();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1024 && nav.classList.contains('is-open')) {
                setMenu(false);
            }
        });
    }

    function onScroll() {
        if (!header) {
            return;
        }

        header.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var marquee = document.getElementById('marquee');
    var marqueeToggle = document.getElementById('marqueeToggle');

    if (marquee && marqueeToggle) {
        var icon = marqueeToggle.querySelector('.marquee__toggle-icon');
        var label = marqueeToggle.querySelector('.marquee__toggle-text');

        marqueeToggle.addEventListener('click', function () {
            var paused = marquee.classList.toggle('is-paused');

            marqueeToggle.setAttribute('aria-pressed', String(paused));

            if (icon) {
                icon.textContent = paused ? '▶' : '❚❚';
            }

            if (label) {
                label.textContent = paused ? 'Продолжить' : 'Пауза';
            }
        });
    }

    var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));
    var products = Array.prototype.slice.call(document.querySelectorAll('#productGrid .product'));

    filters.forEach(function (button) {
        button.addEventListener('click', function () {
            var value = button.getAttribute('data-filter');

            filters.forEach(function (other) {
                var active = other === button;
                other.classList.toggle('is-active', active);
                other.setAttribute('aria-pressed', String(active));
            });

            products.forEach(function (card) {
                var show = value === 'all' || card.getAttribute('data-cat') === value;
                card.hidden = !show;
            });
        });
    });

    var year = document.getElementById('year');

    if (year) {
        year.textContent = String(new Date().getFullYear());
    }
})();
