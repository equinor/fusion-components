import { throttle as fn, ThrottleSettings } from 'lodash';

export function throttle(wait?: number, options?: ThrottleSettings) {
    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const map = new WeakMap();
        const originalMethod = descriptor.value;
        descriptor.value = function (...params) {
            if (!map.has(this)) {
                map.set(this, fn(originalMethod, wait, options).bind(this));
            }
            map.get(this)(...params);
        };
        return descriptor;
    };
}
