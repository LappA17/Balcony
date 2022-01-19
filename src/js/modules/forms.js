const forms = () => {
    const form = document.querySelectorAll("form"), // получаем все формы которые есть у нас на странице 
          inputs = document.querySelectorAll("input"),/*будеи использовать для очистки инпута после того как мы 
          отправили что-то на сервер */
          phoneInputs = document.querySelectorAll('input[name="user_phone"]'); /*в самом конце урока нам нужно сделать 
          так что бы пользователь мог вводить только цифры 
          'input[name="user_phone"]' - мы говорим что у нас будет какой-то инпут с атрибутом name и его атрибут
          равен так-то*/

    phoneInputs.forEach(item =>{
        item.addEventListener("input", () => {/* мы будем проверять после того как пользователь ведет что-то
            в один из этих инпутов */
            item.value = item.value.replace(/\D/, "");/*здесь мы можем контролировать все что вводит пользователь, соотвественно мы можем удалить все что 
            будет нечислом 
            Метод replace будет получать какое-то регулярное выражение и если оно соотвествует тому что мы ищем
            то будет на что-то заменять
            Теперь невозможно вести не цифры в инпут ввода номера телефона*/
        });
    });    

    const message = { //информировать пользователя если все норм отправилось или ошибка или загрузка 
        loading: "Загрузка",
        success: "Спасибо, скоро с вами свяжутся",
        failure: "Что-то пошло не так..."
    };

    const postData = async (url, data) => {/* перед тем как что-то произойдет нужно пользователя проиформировать что будет какая-то 
        загрузка */
        document.querySelector(".status").textContent = message.loading;/*этот блок будет существовать только во время отправки и 
        потом удалится, что бы его поместить на страницу можно использовать innerHTML или textContent, здесь разницы нет так как 
        это наш обхект с текстом и мы точно занаем что там точно текст  */

        /* теперь нужно прописать запрос. И весь этот функционал мы помещаем в функцию postData лишь для того что бы нам вернулся 
        какой-то promise который мы сможем пото обработать, например перевести в данные json и по этому мы все помещаем в отдельную
        функцию потмоу что в будущем мб так что нам понадобится еще где-то использовать */
        let res = await fetch(url, { // res = result. Для fetch нам понадобятся юрл и данные/ здесь постзапросс по этому данные нужно конкретизировать
            method: "POST",
            body: data //заголовок для пост даты не нужна
        });   /* ПРОБЛЕМА - опперация fetch это асинронная операция и когда мы запустим функцию postData - то она выполнит первую
        команду и потом начнет выполнять запрос(она действительно отправил запрос по определенном url с определенными данными) и 
        дальше пойдет выполняться участок кода res где джава скрипт не ждет окончания нашего запроса по причиине что наш сервре
        куда отправляется наш запрос  может ответить нам не мгновенно и джава сркипт не будет ждать пока нам ответить сервер
        а просто пойдет дальше и по этому используем опператоры async await , как это работает ? 
        Когда мы запускаем async код то джава скрипт видит асинхроную опперацию и мы сначало выполняем эту опперацию 
        document.querySelector(".status") а уже потом натыкается на await fetch и теперь он знает что наш запрос ушел и джаваскрипту
        необходимо дождаться окончания этого запроса и только когда fetch полностью отработает мы получим результат*/

        return await res.text() /*от сервера прийдут текстовые данные по этому метод текст. И здесь тоже ошибка ведь return не будет
        дождидаться выполнение rex.text() по этому await */
    };

    const clearInputs = () =>{
        inputs.forEach(item =>{
            item.value = ""; //таким образом инпуты очистятся, мы берем его атрибут value и помещаем в пустую строку
        });
    }
    
    form.forEach(item =>{
        item.addEventListener("submit", (e) =>{/* по стандарту когда мы отправляем форму страничка перезагружается */
            e.preventDefault(); //теперь не будет перезагрузки
             
            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status"); /* в проекте есть класс который приукрасит наш блок */
            item.appendChild(statusMessage); /* item.appendChild - напоминаю что item - это каждая форма которую мы перебираем и очень важно - 
            appendchild - это помещение нашего блока в конец нашей формы*/

            /*теперь необходимо собрать все данные которые есть у нас в форме */
            const formData = new FormData(item);/* во внутрь помещаем ту форму из которой мы хотим вытащить все данные, то-есть объект
            FormData найдет все , соберет их в отдельные данные и мы помещаем их в переменную formData
            
            Данные на сервер будем отправлять с помощью fetch api по этому создаем еще одну фнукцию выше postData
            Когда функция postData готова возвращаемся в перебор и прописываем */
            postData("assets/server.php", formData) /*в url помещаем php сервер что бы в виде массивы возвращались данные которые
             вписал пользователь. formData - это данные которые возвращаются */

             /*так как у нас теперь промис мы можем прописать цепочку */
             .then(res => {/* в этот then попадает результат от сервера в текстовом формате. Мы говорим что нам возращается какой-то
                res - результат  */
                console.log(res);
                statusMessage.textContent = message.success; /* так как мы работаем внутри этого обработчика событий то мы можем 
                сразу просто прописаь статусМеседж */
             })
             .catch(() => statusMessage.textContent = message.failure)
             .finally(() => { /*во первых - очистим инпуты в форме. вторая часть - удалить statusMessage. По-этому после 
                postData создаем новую переменную clearInputs и задаем в нее стрелочную функцию и когда у нас функция готова
                мы ее ВЫЗЫВАЕМ В ФАЙНЕЛИ*/
                clearInputs();
                setTimeout(() => { //передаем два аргумента - функция которая будет выполнятся - statusMessage.remove() и время
                    statusMessage.remove();
                }, 7000);
             });  
        });
    }); /* После того как мы сделали все махинации с mamp и галпом я после ввода данных в консоли получил это
    array(2) {
  ["user_name"]=>
  string(15) "Ruslan Postoiuk"
  ["user_phone"]=>
  string(12) "+48576381569"
} */

};
export default forms;