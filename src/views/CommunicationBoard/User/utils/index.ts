const getRandomDate = () => {
	const start = new Date(2023, 0, 1)
	const end = new Date()
	return new Date(start.getTime() + Math.random()*(end.getTime() - start.getTime()))
}

export const getFakeData = () => {
	return Array.from({length: 20}, (v, k) => ({
		id: k,
		title: "title" + k,
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?",
		date: getRandomDate(),
		expressionType: getRandomExpressionType(),
	}))
}
// get random number 1 - 3
export const getRandomExpressionType = () => {
	return Math.floor(Math.random() * 4) + 1;
}
