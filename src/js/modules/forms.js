import checkNumInputs from "./checkNumInputs";

const forms = (state) => { //сюда
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
    
    checkNumInputs('input[name="user_phone"]');
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item); // все данные 
            if(item.getAttribute("data-calc") === "end" ){/* если у формы которую ты пытаешься сейчас 
отправить есть определенный атрибут, то мы еще добавим определенных данных. Мы проверяем а точно ли это то модельное
окно которое нас интересует(помни что мы атрибут end добавили в индекс html, именна та форма которая находится
в конце)*/

                /*Если это действительно так то мы берем наш объект state, который есть внутри этой функции и мы
его разбираем на отдельные ключи и значения (как это было в консоли, т.е form и 1 к примеру, width и 500,
высота такая и какое-то значение и так далее) и каждые эти пары мы будем аппендить(добавлять) во внутрь формдейты.
ПОТОМУ ЧТО ПРЯМО СЕЙЧАС ФОРМ ДАТА СОДЕРЖИТ ТОЛЬКО ИМЯ ПОЛЬЗОВАТЕЛЯ И НОМЕР ТЕЛЕФОНА И НЕ ЗНАЕТ ЧТО ПОЛЬЗОВАТЕЛЬ ТАМ
НАТЫКАЛ*/
                for(let key in state){ /* так мы берем те данные из state что уже сформировались, мы их перебираем */
                    formData.append(key, state[key]);/* Так мы их отправляем. Во время добавляение данных через 
аппенд мы задаем методу два аргумента это сначало значение (key) и ключ(state[key]) */
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;