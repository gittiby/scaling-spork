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

export const findAuthor = (name: string) => authors.find((author) => author.name === name);