const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector)/* сюда можем передать селектор не одного инпута
     а целой группы селекторов */
    
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
}; /*Т.е это всё сделалось лишь для того что бы пользователь мог вводить только число и что бы при необходимости
не писать постоянно новый код, а просто его импортировать в другие модули */
export default checkNumInputs;