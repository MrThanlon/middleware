type _Middleware<C, R> = (next: () => Promise<R>, ctx: C) => Promise<R>;
export interface Middleware<C, R> extends _Middleware<C, R> {
    use: (middleware: (next: () => Promise<R>, ctx: C) => Promise<R>) => void;
}

export function createMiddleware <C, R> (): Middleware<C, R> {
    const functionList: Array<(next: () => Promise<R>, ctx: C) => Promise<R>> = [];
    const middleware: Middleware<C, R> = async (next: () => Promise<R>, ctx: C) => {
        let idx = -1;
        const wrapNext: () => Promise<R> = async () => {
            idx += 1;
            return idx < functionList.length ?
                await functionList[idx](wrapNext, ctx) : await next();
        }
        return await wrapNext();
    }
    middleware.use = function (middleware: (next: () => Promise<R>, ctx: C) => Promise<R>) {
        functionList.push(middleware);
    }
    return middleware;
}
