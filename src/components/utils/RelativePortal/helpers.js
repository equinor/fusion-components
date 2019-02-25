export const isInsideNode = (node, e) => {
    const rect = node.getBoundingClientRect();
    return (
        e.pageX >= rect.left &&
        e.pageX <= rect.right &&
        (e.pageY >= rect.top && e.pageY <= rect.bottom)
    );
};

export const findParentWithScroll = node => {
    const parents = (domNode, parent) => {
        if (domNode.parentNode === null) {
            return parent;
        }
        return parents(domNode.parentNode, parent.concat([domNode]));
    };

    const regex = /(auto|scroll)/;
    const style = (domNode, prop) =>
        getComputedStyle(domNode, null).getPropertyValue(prop);
    const overflow = domNode =>
        style(domNode, "overflow") + style(domNode, "overflow-y");
    const scroll = domNode => regex.test(overflow(domNode));

    const scrollParent = domNode => {
        const parent = parents(domNode.parentNode, []);
        for (let x = 0; x < parent.length; x += 1) {
            if (scroll(parent[x])) {
                return parent[x];
            }
        }
        return document.scrollingElement || document.documentElement;
    };
    return scrollParent(node);
};
