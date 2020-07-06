import 'babel-polyfill';

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

const mockDate = new Date(1466424490000);
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
