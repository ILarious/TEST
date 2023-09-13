.. highlight:: javascript

======================
Документация frontend/js/menu.js
======================

Этот документ содержит обзор и документацию к файлу `menu.js`_.

.. _`menu.js`: https://github.com/ILarious/TEST/blob/main/frontend/js/menu.js


Функция openMenu
================

.. code:: javascript

    function openMenu() {
        // Получаем элемент с классом 'menu' и добавляем/удаляем класс 'menu__active' для изменения отображения меню
        document.getElementsByClassName('menu')[0].classList.toggle('menu__active');

        // Получаем элементы с классами 'chevron__right' и 'x__close' и добавляем/удаляем классы для изменения вида иконок
        document.getElementsByClassName("chevron__right")[0].classList.toggle('chevron__right__none');
        document.getElementsByClassName("x__close")[0].classList.toggle('x__close__active');
    }

Описание
--------

- Функция `openMenu` предназначена для открытия и закрытия меню на веб-странице.
- Она выполняет следующие действия:
  1. Получает элемент с классом 'menu' и добавляет/удаляет класс 'menu__active' для изменения отображения меню.
  2. Получает элементы с классами 'chevron__right' и 'x__close' и добавляет/удаляет классы для изменения вида иконок.

Функция selectTab
=================

.. code:: javascript

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

Описание
--------

- Функция `selectTab` предназначена для выбора вкладки (таба) на веб-странице.
- Она принимает два аргумента: `evt` (событие) и `tab` (идентификатор вкладки).
- Функция выполняет следующие действия:
    #. Скрывает все элементы с классом 'tab__сontent'.
    #. Удаляет класс 'active' у всех элементов с классом 'tab__links'.
    #. Определяет, какую вкладку (таб) нужно отобразить, и отображает её, скрывая другую.
    #. Добавляет класс 'active' к выбранной ссылке (вкладке), чтобы указать текущий выбор.

Примечания
----------

- Функция `selectTab` часто используется для управления множеством вкладок (табов) на веб-странице.
- Для работы данной функции необходимо иметь соответствующую HTML-структуру с элементами вкладок и контентом для каждой вкладки.
- В данном коде также предполагается, что существуют CSS-классы `menu`, `menu__active`, `chevron__right`, `chevron__right__none`, `x__close`, `x__close__active`, `tab__сontent` и `tab__links` для стилизации элементов и изменения их внешнего вида.
