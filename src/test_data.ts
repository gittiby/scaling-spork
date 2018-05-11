export class Author {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

export const authors: Author[] = [
  new Author('J.K. Rowling', 33),
  new Author('Michael Crichton', 3),
  new Author('GRRM', 330),
]
export class Book {
  title: string;
  author: string
  readCount: number;
  id: number;
  constructor(i: number, t: string, a: string, r: number) {
    this.id = i;
    this.title = t;
    this.author = a;
    this.readCount = r;
  }
}

export const books: Book[] = [
  new Book(0, 'Harry Potter and the Sorcerer\'s stone', authors[0].name, 0),
  new Book(1, 'Harry Potter and Prisoner of Azkaban', authors[0].name, 1),
  new Book(2, 'Jurassic Park', authors[1].name, 0),
  new Book(3, 'Game of Thrones', authors[2].name, 3)
]

export const findAuthor = (name: string) => authors.find((author) => author.name === name);
export const testDb = {};
