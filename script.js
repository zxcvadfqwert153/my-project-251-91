// ============================================================
// 1. ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ (демо)
// ============================================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // отменяем реальную отправку

        // Здесь можно собрать данные:
        const formData = {
            name: this.querySelector('input[name="name"]').value,
            email: this.querySelector('input[name="email"]').value,
            message: this.querySelector('textarea[name="message"]').value,
        };
        console.log('Данные формы:', formData);

        // Показываем пользователю результат
        alert('Спасибо! Ваше сообщение отправлено (демо).');

        // Очищаем форму
        this.reset();
    });
}

// ============================================================
// 2. ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ ПРИ ПРОКРУТКЕ
// ============================================================
const sections = document.querySelectorAll('section');

// Настраиваем IntersectionObserver — он следит,
// когда секция попадает в видимую область экрана
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Секция появилась — показываем
                entry.target.classList.remove('section-hidden');
                entry.target.classList.add('section-visible');
                // Больше не следим за этой секцией
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 } // срабатывает, когда видно 10% секции
);

// Каждой секции сначала добавляем класс "скрыто"
sections.forEach((section) => {
    section.classList.add('section-hidden');
    observer.observe(section);
});

// ============================================================
// 3. (Необязательно) Плавная прокрутка с учётом фиксированной шапки
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();

        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    });
});