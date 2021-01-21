import del from 'del'
import path from 'path'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import through2 from 'through2'
import parseArgs from 'minimist'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sass from 'gulp-sass'
// import tildeImporter from 'node-sass-tilde-importer'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import tsify from 'tsify'
import buffer from 'vinyl-buffer'
import { name, author, version } from './package.json'

sass.compiler = require('sass')

const appDir = 'app'
const destDir = 'docs'

const paths = {
  styles: {
    src: `${appDir}/styles/docs.scss`,
    watch: [`${appDir}/styles/**/*.scss`, `src`],
    dest: `${destDir}/assets`,
    // options: {
    //   importer: tildeImporter,
    // },
  },
  scripts: {
    src: `${appDir}/scripts/index.ts`,
    srcDebug: [`${appDir}/scripts/debug.ts`, `${appDir}/scripts/index.ts`],
    srcVendors: [
      // 'node_modules/intersection-observer/intersection-observer.js',
    ],
    watch: `${appDir}/scripts/**/*.ts`,
    dest: `${destDir}/assets`,
  },
  sprite: {
    src: `${appDir}/assets/icons/*.svg`,
    dest: `${destDir}/assets`,
  },
  content: {
    server: [
      `${appDir}/android-chrome-192x192.png`,
      `${appDir}/android-chrome-512x512.png`,
      `${appDir}/apple-touch-icon.png`,
      `${appDir}/browserconfig.xml`,
      `${appDir}/favicon-16x16.png`,
      `${appDir}/favicon-32x32.png`,
      `${appDir}/favicon.ico`,
      `${appDir}/mstile-70x70.png`,
      `${appDir}/mstile-144x144.png`,
      `${appDir}/mstile-150x150.png`,
      `${appDir}/mstile-310x150.png`,
      `${appDir}/mstile-310x310.png`,
      `${appDir}/safari-pinned-tab.svg`,
      `${appDir}/site.webmanifest`,
    ],
    data: `${appDir}/assets/data/**/*`,
    fonts: `${appDir}/assets/fonts/*`,
    medias: `${appDir}/assets/medias/**/*.{jpg,png,gif,svg,mp4,webm}`,
  },
  views: {
    src: `${appDir}/views/**/!(_)*.pug`,
    srcPartials: `${appDir}/views/partials/**/*.pug`,
    watch: `${appDir}/views/**/*`,
    dest: destDir,
  },
}

const banner = `/*!
 * ${name}
 * @author: ${author}
 * @date: ${new Date().getFullYear()}
 * @copyright: All rights reserved, ${new Date().getFullYear()} ${author}
 * v${version}
 */
`

const plugins = gulpLoadPlugins()
const noop = () => through2.obj()
const env = parseArgs(process.argv.slice(2))

function errorHandler(err) {
  plugins.notify.onError('JS Error: <%= error.message %>')(err)
  this.emit('end')
}

export const clean = () => del([`${destDir}/*`])

export const copy = () =>
  gulp
    .src(
      [
        paths.content.data,
        // paths.content.fonts,
        paths.content.medias,
      ],
      { base: `${appDir}/assets` },
    )
    .pipe(plugins.svgo())
    // .pipe(env.production ? plugins.imagemin() : noop())
    .pipe(gulp.dest(`${destDir}/assets`))

export const copyServer = () =>
  gulp
    .src(paths.content.server, { base: `${appDir}` })
    .pipe(gulp.dest(`${destDir}`))

export const views = () =>
  gulp
    .src(paths.views.src)
    .pipe(
      plugins.pug({
        pretty: true,
      }),
    )
    // .pipe(plugins.inject(
    //   gulp.src([
    //     paths.views.srcPartials,
    //   ]), {
    //     removeTags: true,
    //     starttag: '<!-- inject:{{path}} -->',
    //     relative: true,
    //     transform: (filePath, file) =>
    //       file.contents.toString('utf8'),
    //   },
    // ))
    .pipe(
      plugins.inject(
        gulp.src(
          [
            'assets/*.css',
            'assets/vendors*.js',
            'assets/index*.js',
            'assets/*.js',
          ],
          { cwd: `${__dirname}/${destDir}/`, read: false },
        ),
        {
          removeTags: true,
          addRootSlash: env.production,
          addPrefix: env.production ? 'glsass-previous' : false,
        },
      ),
    )
    .pipe(
      env.production
        ? plugins.htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
          })
        : noop(),
    )
    .pipe(gulp.dest(paths.views.dest))

export const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(
      plugins.plumber({
        errorHandler: (error) => {
          plugins.notify.onError('CSS Error: <%= error.message %>')(error)
        },
      }),
    )
    .pipe(env.production ? noop() : plugins.sourcemaps.init())
    .pipe(plugins.sass(paths.styles.options))
    .pipe(env.production ? noop() : plugins.sourcemaps.write())
    .pipe(plugins.postcss([autoprefixer]))
    .pipe(
      env.production
        ? plugins.postcss([
            cssnano({
              reduceIdents: {
                keyframes: false,
              },
              discardUnused: {
                keyframes: false,
              },
            }),
          ])
        : noop(),
    )
    .pipe(
      env.production
        ? plugins.purgecss({
            content: ['app/**/*.pug', 'app/**/*.js'],
            // http://tailwindcss.com/docs/controlling-file-size/#setting-up-purgecss
            // Include any special characters you're using in this regular expression
            defaultExtractor: (content) =>
              content.match(/[\w-/:@]+(?<!:)/g) || [],
          })
        : noop(),
    )
    .pipe(env.production ? plugins.header(banner) : noop())
    .pipe(
      env.production
        ? plugins.hash({ template: '<%= hash %><%= ext %>' })
        : noop(),
    )
    .pipe(gulp.dest(paths.styles.dest))

export const scripts = () =>
  browserify({
    basedir: '.',
    debug: !env.production, //false,
    entries: [env.debug ? paths.scripts.srcDebug : paths.scripts.src],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['@babel/preset-env'],
      extensions: ['.ts'],
    })
    .bundle()
    .on('error', errorHandler)
    .pipe(
      plugins.plumber({
        errorHandler: (error) => {
          plugins.notify.onError('JS Error: <%= error.message %>')(error)
        },
      }),
    )
    .pipe(source('index.js', 'debug.js'))
    .pipe(buffer())
    .pipe(env.production ? noop() : plugins.sourcemaps.init())
    .pipe(env.production ? plugins.terser() : noop())
    .pipe(env.production ? noop() : plugins.sourcemaps.write())
    .pipe(env.production ? plugins.header(banner) : noop())
    .pipe(
      env.production
        ? plugins.hash({ template: 'index.<%= hash %><%= ext %>' })
        : noop(),
    )
    .pipe(gulp.dest(paths.scripts.dest))

export const sprite = () =>
  gulp
    .src(paths.sprite.src)
    .pipe(plugins.plumber())
    .pipe(
      plugins.svgmin((file) => {
        const prefix = path.basename(file.relative, path.extname(file.relative))
        return {
          plugins: [
            {
              cleanupIDs: {
                prefix: `${prefix}-`,
                minify: true,
              },
            },
          ],
        }
      }),
    )
    .pipe(plugins.svgstore({ inlineSvg: true }))
    .pipe(
      plugins.cheerio(($) => {
        $('svg').attr('viewBox', '0 0 200 200').prepend(
          `
<defs><style>.img:target{display:inline}.img{display:none}</style></defs>
`,
        )

        Array.prototype.forEach.call($('symbol'), (el) => {
          const $node = $(el)
          const symbol = $(el).clone()
          el.tagName = 'svg' // eslint-disable-line no-param-reassign
          $node
            .html(
              `${$(symbol).clone().append()}
<g id="bg-${$node.attr('id')}" class="img">${$node.html()}</g>`,
            )
            .removeAttr('id')
        })
      }),
    )
    .pipe(gulp.dest(paths.sprite.dest))

export const watch = () => {
  gulp.watch(paths.styles.watch, styles)
  gulp.watch(paths.scripts.watch, scripts)
  gulp.watch(paths.views.watch, views)
  // gulp.watch(paths.sprite.src, sprite)
  gulp.watch([paths.content.data, paths.content.medias], copy)
}

export const build = gulp.series(
  clean,
  copy,
  // sprite,
  copyServer,
  styles,
  scripts,
  views,
)

export const run = gulp.series(build, watch)

export default run
