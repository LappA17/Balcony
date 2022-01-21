import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    let modalState = {};
    let deadline = '2022-02-01';

    changeModalState(modalState);
    modals();
    tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState); 
    timer('.container1', deadline); 
    images();
    /* Как сделать красивую анимацию переключения между табами (деревяное остекление, алюминивое и тд)
     Второе как сделать так что бы при вызове мод окна - наш сайт не прыгал, что бы скрол не дергался
     В css сделали следующее 
    .faded {
        animation-name: faded;
        animation-duration: 1.5s; длительность анимации
    }
    @keyframes faded {
        from {  начальная точка
            opacity: 0.1; это процент прозрачности
        }
        to { анимация будет заканчиваться когда прозрачность будет равна 1
            opacity: 1;
        }
        }  анимация где от прозрачного переходит к явному 
        
    Теперь находим класс glazing_content на страничке(это контет там где холодное, теплое какое-то фото и описание)
    Заходим на html, находим все 5 элементов с классом glazing_content и добавляем им класс faded 
    
    ТЕПЕРЬ ПРОИСХОДИТ АНИМАЦИЯ НА СЛАЙДЕРЕ*/

    /* Теперь когда мы исправили scroll нам отсалось запустить в терминале продакшн сборку нашего проекта
        gulp build-prod-js 
        
        17:17:23] Using gulpfile ~/Desktop/Work/Source/gulpfile.js
[17:17:23] Starting 'build-prod-js'...
Browserslist: caniuse-lite is outdated. Please run next command `npm update`
(node:98188) [DEP0097] DeprecationWarning: Using a domain property in MakeCallback is deprecated. Use the async_context variant of MakeCallback or the AsyncResource class instead. (Triggered by calling processImmediate on process.)
(Use `node --trace-deprecation ...` to show where the warning was created)
[17:17:26] Version: webpack 4.41.2
Built at: 21.01.2022 17:17:26
    Asset     Size  Chunks             Chunk Names
script.js  167 KiB       0  [emitted]  main
Entrypoint main = script.js
[17:17:26] Finished 'build-prod-js' after 3.11 s

    ОБРАТИ ВНИМАНИЕ ЧТО ПРОЕКТ ВЕСИТ ВЕСЬ 167 КБАЙТ 
    
    И ТЕПЕРЬ У НАС В script.js - полностью сжатый скрипт который отлично будет читаться нашим браузером*/
    
});