if ('scrollTo' in Element.prototype === false) {
    Element.prototype.scrollTo = function (options?: number | ScrollToOptions, y?: number) {
        if (!options) {
            return;
        }

        const scrollToOptions: ScrollToOptions = {
            left:
                typeof options === 'number'
                    ? (options as number)
                    : (options as ScrollToOptions).left,
            top: y,
        };

        if (scrollToOptions.left) {
            this.scrollLeft = scrollToOptions.left;
        }

        if (scrollToOptions.top) {
            this.scrollTop = scrollToOptions.top;
        }
    };
}
