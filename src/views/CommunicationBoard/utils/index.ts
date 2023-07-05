import { DataRow } from "@/views/CommunicationBoard/type";
import dayjs from "dayjs";

const getRandomDate = () => {
	const start = new Date(2023, 0, 1)
	const end = new Date()
	return new Date(start.getTime() + Math.random()*(end.getTime() - start.getTime()))
}

export const dataFake: DataRow[] = [
	{
		"id": 0,
		"title": "title0",
		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?",
		"date": new Date(),
		"expressionType": 1,
		active: true,
		mutual: 'mutual',
		address: 'address',
		classification: 'asdf -123',
		writer: '',
		dateOfCreation: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		replyDateAndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
	},
	{
		"id": 1,
		"title": "title1",
		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?",
		"date": new Date(),
		"expressionType": 2,
		active: true,
		mutual: 'mutual',
		address: 'address',
		classification: 'asdf -123',
		writer: '',
		dateOfCreation: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		replyDateAndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
	},
	{
		"id": 2,
		"title": "title2",
		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?",
		"date": new Date(),
		"expressionType": 3,
		active: true,
		mutual: 'mutual',
		address: 'address',
		classification: 'asdf -123',
		writer: '',
		dateOfCreation: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		replyDateAndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
	},
	{
		"id": 3,
		"title": "title3",
		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?",
		"date": new Date(),
		"expressionType": 3,
		active: true,
		mutual: 'mutual',
		address: 'address',
		classification: 'asdf -123',
		writer: '',
		dateOfCreation: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		replyDateAndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
	},
	{
		"id": 4,
		"title": "title4",
		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?",
		"date": new Date(),
		"expressionType": 2,
		active: true,
		mutual: 'mutual',
		address: 'address',
		classification: 'asdf -123',
		writer: '',
		dateOfCreation: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		replyDateAndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
	},
	{
		"id": 5,
		"title": "title5",
		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?",
		"date": new Date(),
		"expressionType": 1,
		active: true,
		mutual: 'mutual',
		address: 'address',
		classification: 'asdf -123',
		writer: '',
		dateOfCreation: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		replyDateAndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
	}
]
// get random number 1 - 3
export const getRandomExpressionType = () => {
	return Math.floor(Math.random()*3) + 1;
}
export const getFakeData = () => {
	return Array.from({ length: 20 }, (v, k) => ({
		id: k,
		title: "title" + k,
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?",
		date: getRandomDate(),
		expressionType: getRandomExpressionType(),
		active: true,
		mutual: 'mutual',
		address: 'address',
		classification: 'asdf -123',
		writer: '',
		dateOfCreation: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		replyDateAndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
	}))
}
