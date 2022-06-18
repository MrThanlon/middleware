type _Middleware<C, R> = (next: () => Promise<R>, ctx: C) => Promise<R>;
export interface Middleware<C, R> extends _Middleware<C, R> {
    use: (middleware: _Middleware<C, R> | Middleware<C, R>) => void;
}

export function createMiddleware <C, R> (): Middleware<C, R> {
    const functionList: Array<_Middleware<C, R>|Middleware<C, R>> = [];
    const middleware: Middleware<C, R> = async (next: () => Promise<R>, ctx: C) => {
        let idx = -1;
        const wrapNext: () => Promise<R> = async () => {
            idx += 1;
            return idx < functionList.length ?
                await functionList[idx](wrapNext, ctx) : await next();
        }
        return await wrapNext();
    }
    middleware.use = function (middleware: Middleware<C, R> | _Middleware<C, R>) {
        functionList.push(middleware);
    }
    return middleware;
}
