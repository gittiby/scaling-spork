const { FuseBox, Sparky, WebIndexPlugin, SVGPlugin, CSSPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            target : "browser@esnext",
            homeDir: "./src/client",
            useTypescriptCompiler : true,
            cache: true,
            hash: false,
            sourceMaps: true,
            output: "dist/$name.js",
            plugins: [
                // CSSPlugin(),
                // SVGPlugin(),
                WebIndexPlugin({
                    template : "./src/client/index.html"
                }),
                // this.isProduction && QuantumPlugin({
                //     bakeApiIntoBundle: "app",
                //     uglify: true,
                //     css : true
                // })
            ]
        })
    }
    createBundle(fuse) {
        const app = fuse.bundle("app");
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions(">index.tsx");
        return app;
    }
});

task("clean", () => src("dist").clean("dist").exec() )

task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    fuse.dev({root: 'dist/', port: 4444});
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.dev({root: 'dist/', port: 4444}); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});