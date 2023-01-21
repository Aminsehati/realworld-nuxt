import { IArticleService } from './../Article/IArticleService';
import 'reflect-metadata'
import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import { IAuthService } from '../Auth/IAuthService';
import { AuthService } from '../Auth/AuthService';
import { SYMBOLS } from './SYMBOLS'
import { ArticleService } from '../Article/ArticleService';
export const container = new Container();

// ! logics
container.bind<IAuthService>(SYMBOLS.IAuthService).to(AuthService).inTransientScope()
container.bind<IArticleService>(SYMBOLS.IArticleService).to(ArticleService).inTransientScope()


export const { lazyInject } = getDecorators(container)