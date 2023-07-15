export default {
	mounted(el: any, binding: any) {
		resizeTextarea(el, binding);
	},
	updated(el: any, binding: any) {
		resizeTextarea(el, binding);
	}
}
function resizeTextarea(el: any, binding: any) {
	if (el.tagName === "TEXTAREA") {
		const style = getComputedStyle(el, null);
		const verticalBorders = Math.round(parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth));
		const maxHeight = parseFloat(style.maxHeight) || 200;
		el.style.height = "auto";
		const newHeight = el.scrollHeight + verticalBorders;
		el.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
		el.style.height = Math.min(newHeight, maxHeight) + "px";
		el.focus();
	}
}