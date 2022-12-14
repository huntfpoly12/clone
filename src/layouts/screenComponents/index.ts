import {defineAsyncComponent} from "vue";

const BF310 = defineAsyncComponent(() =>
	import("@/views/BF/BF3/BF310/index.vue")
);
const BF320 = defineAsyncComponent(() =>
	import("@/views/BF/BF3/BF320/index.vue")
);
const BF330 = defineAsyncComponent(() =>
	import("@/views/BF/BF3/BF330/index.vue")
);
const BF340 = defineAsyncComponent(() =>
	import("@/views/BF/BF3/BF340/index.vue")
);
const BF210 = defineAsyncComponent(() =>
	import("@/views/BF/BF2/BF210/index.vue")
);
const BF220 = defineAsyncComponent(() =>
	import("@/views/BF/BF2/BF220/index.vue")
);
const CM110 = defineAsyncComponent(() =>
	import("@/views/CM/CM1/CM110/index.vue")
);
const CM130 = defineAsyncComponent(() =>
	import("@/views/CM/CM1/CM130/index.vue")
);
const PA110 = defineAsyncComponent(() =>
	import("@/views/PA/PA1/PA110/index.vue")
);
const PA120 = defineAsyncComponent(() =>
	import("@/views/PA/PA1/PA120/index.vue")
);
const PA230 = defineAsyncComponent(() =>
	import("@/views/PA/PA2/PA230/index.vue")
);
const PA430 = defineAsyncComponent(() =>
	import("@/views/PA/PA4/PA430/index.vue")
);
const PA420 = defineAsyncComponent(() =>
	import("@/views/PA/PA4/PA420/index.vue")
);
const PA410 = defineAsyncComponent(() =>
	import("@/views/PA/PA4/PA410/index.vue")
);
const PA610 = defineAsyncComponent(() =>
	import("@/views/PA/PA6/PA610/index.vue")
);
const PA620 = defineAsyncComponent(() =>
	import("@/views/PA/PA6/PA620/index.vue")
);
const PA630 = defineAsyncComponent(() =>
	import("@/views/PA/PA6/PA630/index.vue")
);
const PA530 = defineAsyncComponent(() =>
	import("@/views/PA/PA5/PA530/index.vue")
);
const PA520 = defineAsyncComponent(() =>
	import("@/views/PA/PA5/PA520/index.vue")
);
const PA510 = defineAsyncComponent(() =>
	import("@/views/PA/PA5/PA510/index.vue")
);
const PA710 = defineAsyncComponent(() =>
	import("@/views/PA/PA7/PA710/index.vue")
);
const Test = defineAsyncComponent(() =>
	import("@/views/DefaultComponent.vue")
);
const Example = defineAsyncComponent(() =>
	import("@/views/base/Example.vue")
);
const PA730 = defineAsyncComponent(() =>
	import("@/views/PA/PA7/PA730/index.vue")
);
const PA220 = defineAsyncComponent(() =>
	import("@/views/PA/PA2/PA220/index.vue")
);
const PA720 = defineAsyncComponent(() =>
	import("@/views/PA/PA7/PA720/index.vue")
);

export {
    BF310,
    BF320,
    BF330,
    BF340,
    BF210,
    BF220,
    CM110,
    CM130,
    PA110,
    PA120,
    PA230,
    PA410,
    PA420,
    PA430,
    PA610,
    PA620,
    PA630,
    PA530,
    PA520,
    PA510,
    PA710,
    PA730,
    PA220,
    PA720,
    Test,
    Example
}