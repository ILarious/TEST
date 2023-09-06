function openMenu() {
    document.getElementsByClassName('menu')[0].classList.toggle('menu__active');
    document.getElementsByClassName("chevron__right")[0].classList.toggle('chevron__right__none');
    document.getElementsByClassName("x__close")[0].classList.toggle('x__close__active');
}

function selectTab(evt, tab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab__сontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab__links");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    if (tab == "tasksTab") {
        document.getElementById("tasksTab").style.display = "block";
        document.getElementById("employeesTab").style.display = "none";
    }
    else if (tab == "employeesTab") {
        document.getElementById("employeesTab").style.display = "block";
        document.getElementById("tasksTab").style.display = "none";
    }

    evt.currentTarget.className += " active";
}




document.getElementById("default__open").click();