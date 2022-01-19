import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    modals();
    tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active'); /* glazing-slider - это общий блок
    glazing_block - это каждый отдельный таб типа "деревяное остелкение", "алюминивое остекление" и тд
    glazing_content это контент, а именно холодное, теплое , та фото и надписи что там есть 
    active - класс активности, точку не ставим потому что скрипт и так знает что это класс */

    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    /*теперь реализуем блок с табами где "внутренняя отделка" , "внешняя отделка" и тд
     .decoration_slider - общий блок
     no_click - спорное решение потому что там было два класса которое подходило, но ваня выбрал этот
                хотя там много классов 
     decoration_content  - это тот контент, вся инфа о табе . А это > div > div из-за того что у нас 
            внутри этого блока можем поставить строгое соотвествие в селекторе , так нам не нужно будет
            заморачиваться по поводу разных классов
    after_click - класс активности*/
    forms();
    /* Там Ваня рассказывает как протестить это всё с реальным сервером MAMP и там много важной инфы.
    В двух словах нам нужно что бы в папку тест попали чистовые файлы и скопировать путь до test и в 
    галпе указывает путь к тесту */
});