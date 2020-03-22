import moment from 'jalali-moment';
import izitoast from 'izitoast'
export function persianNumberCurrency(string) {
    // console.log('str', string);
    return parseFloat(string).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};


export function escapeNumbers(number) {
    let val = number.replace(/\D/g, '');
    console.log(val);
    return val;
};


export function percenageOfTwoDate(date1, date2, present) {
    var start = moment(date1),
        end = moment(date2),
        today = moment(present);
    return (Math.round(((today - start) / (end - start)) * 100));
};


export function logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('_ac');
    localStorage.removeItem('name');
    localStorage.removeItem('phone');
    localStorage.removeItem('crl');
    window.location.replace('/');
};

export function soon() {
    izitoast.show({
        title: 'به زودی',
        message: 'در حال توسعه این بخش هستیم لطفا شکیبا باشید'
    });
}


export function toast_info(msg) {
    izitoast.info({
        title: 'توجه',
        message: msg
    });
}

export function toast_error(msg) {
    izitoast.error({
        title: 'خطا',
        message: msg
    });
}

export function toast_success() {
    izitoast.success({
        title: 'موفق',
        message: "&#10004;"
    });
}


export function currencyWithString(num) {
    let format = num;
    let noFormat = num.replace(/\D/g, '');
    let lng = noFormat.length;
    let txt = '';
    // if(noFormat)
    if (0 < lng && lng <= 3) {
        txt = 'تومان';
    } else if (3 < lng && lng <= 6) {
        txt = 'هزار تومان';
    } else if (6 < lng && lng <= 9) {
        txt = 'میلیون تومان';
    } else if (9 < lng && lng <= 12) {
        txt = 'میلیارد تومان';
    } else {
        txt = '';
    }

    return parseFloat(format) + " " + txt;
}

export function checkObjLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}