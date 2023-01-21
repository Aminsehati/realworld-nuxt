export class Author {
    username!: string
    bio!: string
    image!: string
    following!: string
}
export class Article {
    slug!: string
    title!: string
    description!: string
    body!: string
    tagList!: string[]
    createdAt!: string
    updatedAt!: string
    favorited!: boolean
    favoritesCount!: number
    author!: Author
}