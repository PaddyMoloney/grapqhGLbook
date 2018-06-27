var authors = [{
	id: 1,
	name: 'Author 1'
  },{
	id: 2,
	name: 'Author 2'
  }
];
var books = [{
	id: 3,
	title: 'Book 1',
	authors: [authors[0]]
  },{
	id: 4,
	title: 'Book 2',
	authors: [authors[0],authors[1]]
  }
];
var resolvers = {
	Query: {
		books: () => {
			return books;
		},
	},
};
module.exports = resolvers;
