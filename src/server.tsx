import * as koa from 'koa';
import * as koaStatic from 'koa-static';
import * as webpack from 'webpack';
import WebpackConfig from '../webpack.config';
import { PORT } from './config';
import { Env, Log, Path } from './helper';
import { router, WebpackDev, WebpackHot } from './middlewares';

const app = new koa();

if (Env.isDev) {
    const compiler: any = webpack(WebpackConfig);
    app.use(WebpackDev(compiler, { publicPath: WebpackConfig[0].output.publicPath }));
    app.use(WebpackHot(compiler));
}

// static
app.use(koaStatic(Path.relative('build', 'public')));

app.use(router.routes());

app.listen(PORT, () => Log.log(`Server running at ${PORT} ports.`));
