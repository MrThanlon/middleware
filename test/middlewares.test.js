const { createMiddleware } = require('..');

test('ts', async () => {
    const middleware = createMiddleware();
    middleware.use(async (next, ctx) => {
        console.log(`invoke the first function, the ctx is ${ctx}`);
        const res = await next()
        console.log(`finish the first function, result is ${res}, add 1`);
        return res + 1;
    });
    middleware.use(async (next, ctx) => {
        console.log(`invoke the second function, the ctx is ${ctx}`);
        const res = await next();
        console.log(`finish the second function, result is ${res}, add 2`);
        return res + 2;
    });
    expect(await middleware(async () => 0, 0)).toBe(3);
});
