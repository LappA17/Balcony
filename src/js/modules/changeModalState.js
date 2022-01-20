import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'), 
          windowHeight = document.querySelectorAll('#height'), 
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    /* теперь мы натыкаемся на проблему - когда пользователь будет кликать в область ХОЛОДНОЕ он 
    натыкается на span всегда, даже не смотря на то что инпут с ним взаимодействует и изменяется  
    
    Мы будем взаимодействовать с 3 элементами на странице:
    1) span - либо холодное, либо теплое осветленее
    2) селект - там где выбираешь либо древесины, алюминий и тд
    3) инпут - куда мы вводили высоту и ширину*/
    function bindActionToElems (event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {/*во внутрь я передам строку которая точно будет знать какая сейчас 
нода(элемент на странице) */
                    case 'SPAN' :
                        state[prop] = i;/*если он пользователь кликает в СПАН то он кликает в картинку 
и мы просто записываем номер этого изображения */
                        break;
/* кейсы - это когда мы сравниваем с определенным значением, например если у нас case - будет SPAN то мы 
ставим : и будем выполнять определенную команду. Когда мы используем nodeName - то элемент приходит с большой
буквы по этому мы тоже SPAN с большой пишем*/
                    case "INPUT" : /* У нас на странице есть два инпута : там где мы просто что-то вводим и
тот где стоит глаочка когда мы выбираем осветление */
                        if (item.getAttribute('type') === 'checkbox') { //checkbox - инпут с галочкой
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
/*так как чекбокса только два. по этому я переменную i сравню с нулем если это так то мы выбрали первую часть 
? - тернарный опператор, как иф по факту работает
: - это как else */
                            elem.forEach((box, j) => {/*тепреь сделаем так что бы можно было только 1 выбрать чекбокс */
                                box.checked = false;/*каждый чекбокс с помощью метода checked устанавливаем в фолс */
                                if (i == j){/*но как только мы натыкаемся на тот чекбокс который тыкнул пользователь,
обрати внимание что клик пользователя (i) должен совпадать с номером чекбокса (j) */
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' : /* селект это там где деревяное освет или алюмини и тд */
                        state[prop] = item.value; /* если мы зайдем в верстку и расскроем select мы увидим 
что у option стоит определенный value (tree, aluminium и тд ) и именно этот value мы будем получать */
                        break;
                } 
                console.log(state);
            });
        }); 
    }
/*Теперь в консоль ввиде объекта приходит абсолютно все данные от того что выбрал пользователь */

                /* if(elem.length > 1){ 
                    state[prop] = i;
                } else { 
                    state[prop] = item.value; 
                }  */
            /* Теперь осталось реализовать скрипт по отправки всех данных которые накликал пользователь и
отправки этого на сервер в виде формДаты. 
Теперь нам осталось оживить последнее модельное окно "рассчитать стоимость"
1) добавляет дата атрибут data-calc="end" в popup_calc_end а именно в form */
        

    
    bindActionToElems("click", windowForm, "form");
    bindActionToElems("input", windowHeight, "height");
    bindActionToElems("input", windowWidth, "width");
    bindActionToElems('change', windowType, 'type');
    bindActionToElems("change", windowProfile, "profile");

};
export default changeModalState;