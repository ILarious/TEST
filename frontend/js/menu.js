// Функция для открытия и закрытия меню
function openMenu() {
    // Получаем элемент с классом 'menu' и добавляем/удаляем класс 'menu__active' для изменения отображения меню
    document.getElementsByClassName('menu')[0].classList.toggle('menu__active');
    
    // Получаем элементы с классами 'chevron__right' и 'x__close' и добавляем/удаляем классы для изменения вида иконок
    document.getElementsByClassName("chevron__right")[0].classList.toggle('chevron__right__none');
    document.getElementsByClassName("x__close")[0].classList.toggle('x__close__active');
}

// Функция для выбора вкладки (таба)
function selectTab(evt, tab) {
    var i, tabcontent, tablinks;
    // Получаем элементы с классом 'tab__сontent' и скрываем их
    tabcontent = document.getElementsByClassName("tab__сontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Получаем элементы с классом 'tab__links' и удаляем класс 'active' у всех ссылок
    tablinks = document.getElementsByClassName("tab__links");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Определяем, какую вкладку (таб) нужно отобразить
    if (tab == "tasksTab") {
        // Отображаем вкладку с id "tasksTab"
        document.getElementById("tasksTab").style.display = "block";
        // Скрываем вкладку с id "employeesTab"
        document.getElementById("employeesTab").style.display = "none";
    }
    else if (tab == "employeesTab") {
        // Отображаем вкладку с id "employeesTab"
        document.getElementById("employeesTab").style.display = "block";
        // Скрываем вкладку с id "tasksTab"
        document.getElementById("tasksTab").style.display = "none";
    }

    // Добавляем класс 'active' к выбранной ссылке (вкладке)
    evt.currentTarget.className += " active";
}

// Вызываем функцию для открытия начально выбранной вкладки (таба)
document.getElementById("default__open").click();
