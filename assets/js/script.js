window.onload = function () {
    new WOW().init();

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

    inputName.on('blur', function(){
        checkName()
    });

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

    inputAddress.on('input', function(){
        checkAddress()
    });

    inputAddress.on('blur', function(){
        checkAddress()
    });

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

    inputPhone.on('input', function(){
        checkPhone()
    });

    inputPhone.on('blur', function(){
        checkPhone()
    });

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

    buttonOrder.on('click', function () {
        checkName();
        checkAddress();
        checkPhone();
        if(!flagName && !flagAddress && !flagPhone) {
            const data = {
                name,
                address,
                phone
            }
            $.ajax({
                type: "POST",
                url: url,
                data: data,
            });
        }
    })
}