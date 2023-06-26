export function autobind(_, _2, descriptor) {
    const origMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = origMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
//# sourceMappingURL=autobind.js.map