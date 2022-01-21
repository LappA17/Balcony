const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll(); //в неё я передам работу данной функции нашей

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });
    
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`; /* Таким образом мы добавили отступ при открытие модельного окна */
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`; /* А теперь убираем после закрытия мод окна */
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px` // сюда тоже передае закрытие  
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

    /* Нам нужно выечлить размер скрола но в каждом браузере он разный. Данная функция будет подсчитывать расстояие
    в пикселях  */
    function calcScroll(){
        let div = document.createElement("div");

        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";

        document.body.appendChild(div); /*помещаем блок на страницу, при чем нам абсолютно не важно где он 
будет находится */

        /*теперь нужно вычеслить размер прокрутки */
        let scrollWidth = div.offsetWidth - div.clientWidth; /*и мы берем наш блок и узнаем его полною ширину включая бордер 
и за это отвечает offsetWidth
clientWidth  - а эта часть включает в себя педдиги и самый главный контент который есть внутри и сюда не включается 
прокрутка ! Т.е если мы от полной ширины отними главный контент, мы получим прокрутку*/

        /*и рас уж мы уже этот элемент вычеслили, он нам больше не нужен */
        div.remove();

        return scrollWidth;

        /* и теперь осталось эту функцию использовать, там где я в bindModal я объявлял переменные, через запятую пишем новую */
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

export default modals;