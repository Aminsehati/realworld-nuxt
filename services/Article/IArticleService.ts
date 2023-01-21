import { QueryArticle } from "~/types/queryArticle"

export interface IArticleService {
    getArticles(query?: QueryArticle): Promise<any>
    getArticle(slug: string): Promise<any>
    favoriteArticle(slug: string): Promise<any>
    unFavoriteArticle(slug: string): Promise<any>
}