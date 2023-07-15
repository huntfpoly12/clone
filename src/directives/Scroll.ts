export default {
	mounted(el: any, binding: any) {
		el.scrollTop = el.scrollHeight;
	},
	updated(el: any, binding: any) {
		el.scrollTop = el.scrollHeight;
	}
}
