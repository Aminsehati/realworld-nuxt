import { injectable } from "inversify";
import { QueryArticle } from "~/types/queryArticle";
import { $axios } from "~/utils/api";
import { IArticleService } from "./IArticleService";
import qs from 'querystring'
@injectable()
export class ArticleService implements IArticleService {
    async getArticle(slug: string): Promise<any> {
        try {
            const res = await $axios.$get(`/site_api_url/articles/${slug}`);
            return Promise.resolve(res.article);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getArticles(input: QueryArticle): Promise<any> {
        try {
            const query = qs.stringify({
                ...input
            })
            const encode_url = encodeURI(`/site_api_url/articles/?${query}`);
            const res = await $axios.$get(`/site_api_url/articles/?${query}`);
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async favoriteArticle(slug: string) {
        try {
            const res = await $axios.$post(`/site_api_url/articles/${slug}/favorite`);
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async unFavoriteArticle(slug: string) {
        try {
            const res = await $axios.$delete(`/site_api_url/articles/${slug}/favorite`);
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error)
        }
    }

}