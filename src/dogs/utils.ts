// Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often, that it stalls the performance of the web page.
// It limits the rate at which a function gets invoked.
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}