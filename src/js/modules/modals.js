const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector ){ /* Эта функция будет отвечать за привязку нашего модельного окна к опредлеенному триггеру. По этому в bindModal мы как аргументы передае определенные параметры.
        Trigger - будет селектор нашей кнопки по который мы будем кликатью
        Modal - какое модельное окно мы будем открывать
        Close - закрывать - крестик   
        
        function bindModal(trigger, modal, close ) - изначально было вот так 
        На основание новых СЕЛЕВТОРОВ я буду получать новые перменные */
        const trigger = document.querySelectorAll(triggerSelector),/*так мы сможем на несколько одинаковых 
        элементов повесить одни и те же функци с помощью All и теперь мы должны сделать фор ич для триггера  */
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);

              trigger.forEach(item => { /* помни что фор ич берет КАЖДЫЙ айтем и что-то с ним делаем как фор лет
                и помни что фор ич только к псевдомассиву all */
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }
        
                    modal.style.display = "block";
                    document.body.style.overflow = "hidden";
                    // document.body.classList.add('modal-open');
                });
            });

        /*trigger.addEventListener("click", (e) => { Триггер это кнопка на которую будем кликать 
            if(e.target){
                e.preventDefault();
            }/* важно что не все элементы на которые нам прийдется кликать являются кнопкой, так же
             есть одна ссылка. А мы помним что когда мы кликаем по ссылки у нас идет перезагрузка страницы,
              по этому нам прийдется отменить стандартное поведение браузера, добавив объект событие event.
            Теперь нужно сказать, что если ивен есть, то нужно отменять стандатрное поведение браузера

            modal.style.display = "block"; Дальше мы берем тот элемент модельного окна который нам передан  
            в функцию и укажем что у нас это будет блочный элемент 

            //document.body.style.overflow = "hidden"; закомментируем потому что можем использовать класс
            document.body.classList.add("modal-open")
            /*когда мы откроем модельное окно у нас при скроли мышки будет скролиться вся страница */
        
        /*Теперь перейдем к закрытию нашего модельного окна */
        close.addEventListener("click", () => {
           // modal.style.display = "none";закомментируем потому что можем использовать класс
            //document.body.style.overflow = "";//оверфлоу вернем в стандартное значение
            document.body.classList.add("modal-open");
        });
        /*теперь сделаем функционал что когда мы кликаем вне модельного окна - оно должно закрываться  */
        modal.addEventListener("click", (e) => {
            if(e.target === modal){
                modal.style.display = "none";
              //  document.body.style.overflow = "";закомментируем потому что можем использовать класс
              document.body.classList.add("modal-open");
            } /* когда я кликаю вне окна то мой e.targer - это все модельное окно которые мы вызввали, в верстке
            это popup_engineer */
        }); 
    } 

    function showModalByTime(selector, time){
        setTimeout(function(){/* setTimeout принимает в себя два аргумента : функция которая должны выоплнится и 
            время через сколько
            Всё что нужно сделать - это получить модельное окно и показать его */
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = "hidden";

        }, time);
    }

    /*const callEngineerBtn = document.querySelector(".popup_engineer_btn"); передае с хтмл, это будет нашим
    триггером 
    const modalEngineer = document.querySelector(".popup_engineer");/* само модельное окно 

    const modalEngineerClose = document.querySelector(".popup_engineer .popup_close"); /* это крестик закрытия. 
    Нам нужно четко  сказать что внутри этого модельно окна будет этот крестик ! Так как popup_close будет
     существовать еще в нескольки модельных окнах 

    bindModal(callEngineerBtn, modalEngineer, modalEngineerClose);Во внутрь будем передавать аргументы.
    Сохраним и подключаем модуль к main.js !*/
    bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
    bindModal(".phone_link", ".popup", ".popup .popup_close"); /* у номера телефона на сайты и  Спросите у нашего специалиста! одинаковый класс
    внимание на то что фон линк = это селектор
    И нам нужно вызывать модельно окно у которого класс popup 
    Второй popup - это крестик*/
    showModalByTime(".popup", 3000);//вызываем здесь
};
export default modals;