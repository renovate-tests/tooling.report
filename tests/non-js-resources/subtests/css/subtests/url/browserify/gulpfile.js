/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { src, dest, series } = require('gulp');
const browserify = require('browserify');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const cleanCSS = require('gulp-clean-css');

function filePath() {
  return src('src/*.js', { read: false })
    .pipe(
      tap(function(file) {
        file.contents = browserify(file.path)
          .plugin('urify-emitter', { output: 'build', base: '.' })
          .bundle();
      }),
    )
    .pipe(buffer())
    .pipe(dest('build'));
}

function minify() {
  return src('build/*.css')
    .pipe(cleanCSS())
    .pipe(dest('build'));
}

exports.default = series(filePath, minify);
