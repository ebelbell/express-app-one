// Creating the simple data structures we'll work with.
// How we choose to store and organize this data is very important!
// Different options and techniques for storing data and
// creating relationships between different data sets will be
// explored during lessons on database integrations and techniques.

// The "book" data will be simple information about
// the application's user base.
const books = [
    {
      id: 1,
      title: 'The Tale of Desperaux',
      genre: 'Adventure',
      content: 'similique esse doloribus nihil accusamus\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\nperspiciatis cum ut laudantium\nomnis aut molestiae vel vero'
    },
    {
      id: 2,
      title: 'Room',
      genre: 'Non-fiction',
      content: 'eum sed dolores ipsam sint possimus debitis occaecati\ndebitis qui qui et\nut placeat enim earum aut odit facilis\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur'
    },
    {
      id: 3,
      title: 'The invention of Hugo Cabret',
      genre: 'Non-fiction',
      content: 'eum sed dolores ipsam sint possimus debitis occaecati\ndebitis qui qui et\nut placeat enim earum aut odit facilis\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur'
    },
  ];
  
  module.exports = books;