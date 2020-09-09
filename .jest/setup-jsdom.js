import 'babel-polyfill';

class JestTestDate extends Date {
    constructor(...dateArgs) {
        const args = dateArgs.length > 0 ? dateArgs : ["2020-06-10T10:12:58.135Z"]
        super(...args); 
    }
}

global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
};

global.document.body.scrollTo = (scrollTop, scrollLeft) => {
    global.document.body.scrollTop = scrollTop || global.document.body.scrollTop;
    global.document.body.scrollLeft = scrollLeft || global.document.body.scrollLeft;
    global.document.body.dispatchEvent(new Event('scroll'));
};

 global.Date = JestTestDate;