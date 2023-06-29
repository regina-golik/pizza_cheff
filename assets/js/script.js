window.onload = function () {
    const menuButton = $('.menu__burger');
    const menuList = $('.menu__list');

    menuButton.on('click', function () {
        menuList.toggleClass('menu__list-opened')
    })

    new WOW().init();
}