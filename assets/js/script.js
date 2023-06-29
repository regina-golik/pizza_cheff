window.onload = function () {
    new WOW().init();
    lightbox.init();

    const menuButton = $('.menu__burger');
    const menuList = $('.menu__list');

    menuButton.on('click', function () {
        menuList.toggleClass('menu__list-opened');
    });

    const inputName = $('#name');
    const labelName = $('#labelName');
    let flagName = true;
    let name = ''

    inputName.on('input', function(){
        this.value = this.value.replace(/\./g, '');
        checkName()
    });

    inputName.on('blur', checkName);

    function checkName() {
        const reg = /[^a-zа-яё\s]/;
        if(reg.test(inputName.val())) {
            labelName.text('Введите только буквы');
            flagName = true;
        } else if(!inputName.val()) {
            labelName.text('Введите имя');
            flagName = true;
        } else {
            labelName.text('');
            flagName = false;
            name = inputName.val();
        }
    }

    const inputAddress = $('#address');
    const labelAddress = $('#labelAddress');
    let flagAddress  = true;
    let address = ''

    inputAddress.on('input', checkAddress);

    inputAddress.on('blur', checkAddress);

    function checkAddress() {
        if(!inputAddress.val()) {
            labelAddress.text('Введите адрес');
            flagAddress = true;
        } else {
            labelAddress.text('');
            flagAddress = false;
            address = inputAddress.val();
        }
    }

    const inputPhone = $('#phone');
    const labelPhone = $('#labelPhone');
    let flagPhone  = true;
    let phone = ''

    inputPhone.on('input', checkPhone);

    inputPhone.on('blur', checkPhone);

    function checkPhone() {
        const reg = /^[0-9-]/;
        if(!reg.test(inputPhone.val())) {
            labelPhone.text('Введите телефон');
            flagPhone = true;
        } else if(!inputPhone.val()) {
            labelPhone.text('Введите телефон');
            flagPhone = true;
        } else {
            labelPhone.text('');
            flagPhone = false;
            phone = inputPhone.val();
        }
    }

    const buttonOrder = $('#buttonOrder');
    const url = 'pizza-cheff/order'

    const wrapper = $('.wrapper');

    buttonOrder.on('click', async function () {
        checkName();
        checkAddress();
        checkPhone();
        if(!flagName && !flagAddress && !flagPhone) {
            const data = {
                name,
                address,
                phone
            }

            await $.ajax({
                type: "POST",
                url: url,
                data: data,
                success: function(data,status,xhr){
                    wrapper.addClass('wrapper-opened')
                },
                error: function(xhr, status, error){
                    wrapper.addClass('wrapper-opened')
                },
            });

        }
    })

    const popupCloseButton = $('.popup__close');
    const popup = $('.popup');

    function closePopup() {
        wrapper.removeClass('wrapper-opened');
    }

    popupCloseButton.on('click', closePopup)
    wrapper.on('click', closePopup)
    popup.on('click', function (e) {
        e.stopPropagation();
    })

    $("body").on('click', '[href*="#"]', function(e){
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top }, 300);
        e.preventDefault();
    });
}