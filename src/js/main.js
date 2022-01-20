import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    let modalState = {};
    /* Это состояние нашего модельного окна, сюда буду приходить все данные от пользователя и теперь нужно
    создать новый модуль который будет работать с этим состоянием */

    changeModalState(modalState);
    modals();
    tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState); /* Что бы отправляемая форма знала о тех данных которые пользователь ввел на странице
    нам необходимо передать modalState
    И так же само заходим в forms и туда тоже передаем какой-то states с которым сможем работать внутри
    Наш state который мы передали в формы работает только в самом конце при отправка формы 
    array(7) {
  ["user_name"]=>
  string(15) "Ruslan Postoiuk"
  ["user_phone"]=>
  string(11) "48576381569"
  ["type"]=>
  string(6) "french" тут или пластиковое, древесиное , т.е люьбой селект
  ["form"]=>
  string(1) "2"
  ["width"]=>
  string(3) "200"
  ["height"]=>
  string(3) "600"
  ["profile"]=>
  string(16) "Холодное"*/
});