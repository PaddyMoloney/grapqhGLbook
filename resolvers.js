var {PubSub} = require('graphql-subscriptions');
var pubsub = new PubSub();
var authors = [{
	id: 1,
	name: 'Author 1'
  },{
	id: 2,
	name: 'Author 2'
  }
];
var books = [{
	id: 1,
	title: 'Book 1',
	authors: [authors[0]]
  },{
	id: 2,
	title: 'Book 2',
	authors: [authors[0],authors[1]]
  }
];
var nextId = 5;
var resolvers = {
	Query: {
		books: () => {
			return books;
		},
		book: (root, args) => {
			var res = null;
			books.forEach(function(b){
				if (b.title === args.title) res=b;
			});
			return res;
		},
	},
	Mutation: {
		addBook: (root, args) => {
			var newBook = {id: nextId++, title: args.title };
			books.push(newBook);
			pubsub.publish('bookAddedTopic', { bookAdded: newBook});
			return newBook;
	    },
	},
	Subscription: {
		bookAdded: {
	 		subscribe: () => pubsub.asyncIterator('bookAddedTopic')
		}
	}
};
module.exports = resolvers; 
