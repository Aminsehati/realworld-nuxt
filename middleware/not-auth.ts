import { Context, Middleware } from '@nuxt/types'

const noAuthMiddleware: Middleware = ({
    redirect,
    $auth
}: Context) => {
    if($auth.loggedIn){
        return redirect('/')
    }
}

export default noAuthMiddleware