const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll("[data-modal]"); /* Эта переменная нужна что бы получить все модельные окна со страницы
              что бы в последствие их закрыть */

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                
                /* Здесь и в close поставили и в modal.addEventlistener(подложка) */
                windows.forEach(item => {
                    item.style.display = "none";
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item =>{
                item.style.display = "none";
            }); /* ЗДЕСЬ */

            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item =>{
                    item.style.display = "none";
                });

                modal.style.display = "none";
                document.body.style.overflow = ""; 
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    /* Реализуем скрипт открытие модельного окна на калькулятора:
    popup_calc_btn - кнопка открытия мод окна
    popup_culc - само мод окно
    popup_culc_close - закрытие мод окна 
    Всё, теперь там где теплое, холодное рассчитать стоимость открывается мод окно*/
    // showModalByTime('.popup', 60000);
    /* Теперь будем работать с табами внутри калькулятора, ведь в начале там картинки не такие как нам нужны.
    Логика такая : как в прошлом задание с табами, у нас есть header в котором хранятся нужный нам контент
    и при выборе конкретного, отсальные фото остаются такими же маленькими, а то что выбрали увеличивалось
    и убирало класс display = "none" */

    /* нужно сделать так что бы closeClickOverlay работал в цепочке со всеми модельными окнами. Первое что нужно
    сделать - взять тот триггер который будет переводить на след модельное окно и соотвественно подвязать его под
    след модельное окно которое мы будем показывать. Находим кнопочку "Далее", у нее есть класс попам калк баттон.
    Помним что мы подставляем селекторы - значит нам нужна точка.
    ЭТО ВСЕ ПРОИСХОДИТ ТАМ ГДЕ КАЛЬКУЛЯТОР*/
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    /*1) - класс кнопки ДАЛЕЕ
      2) - модельное окно где мы будем выбирать профиль для нашего окна
      3) - у этого модельно окна есть класс с кнопкой закрытия  */

      /* Это модельное окно где калькулятор ВЫБЕРИТЕ ТИП ОСТЕКЛЕНИЕ И ЕГО ПРОФИЛЬ ХОЛОДНОЕ И ТЕПЛОЕ  */
      bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
      /*1) - кнопка далее 
        2) - то модельное окно которое мне необходимо открыть 
        3) - кнопка закрытия */
};

export default modals;