const data = [
	{ id: 1, title: 'Iron Man', year: '2008' },
	{ id: 2, title: 'Thor', year: '2011' },
	{ id: 3, title: 'Captain America', year: '2011' },
	{ id: 4, title: 'The Avengers', year: '2012' },
	{ id: 5, title: 'Guardians of the Galaxy', year: '2014' },
];

export function getAll() {
	return Promise.resolve(data);
}



