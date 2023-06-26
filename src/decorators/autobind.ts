// ... autobind(target: any, methodName: string, descriptor: PropertyDescriptor)
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const origMethod = descriptor.value
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = origMethod.bind(this)
			return boundFn
		},
	};
	return adjDescriptor
}
