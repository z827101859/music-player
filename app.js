const Koa = require('koa');
const Send = require('koa-send');

const app = new Koa();
const rootPath = __dirname;
console.log(rootPath);

function wait(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(true);
        },time);
    });
}

app.use(async (ctx, next) => {
    console.log(ctx.path);
    const reqPath = ctx.path.replace('/', '');
    // await wait(2000);
    await Send(ctx, reqPath, {
        root: rootPath
    })
});

app.listen(9100).addListener('listening', () => {
    console.log(`server is started on port: http://localhost:9100/index.html`)
})
