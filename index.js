// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015-2016 Carsten Klein
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


'use strict';


var ccAngular = require('conventional-changelog-angular');


// dirty hack
function transformFactory(originalTransform)
{
    return function transform(originalCommit)
    {
        var originalType = originalCommit.type;
        var originalNotes = originalCommit.notes;
        // prevent originalCommit from modifying existing notes
        originalCommit.notes = [];
        // prevent originalCommit from skipping relevant commits
        originalCommit.type = 'fix';
        var commit = originalTransform(originalCommit);
        commit.type = originalType;
        commit.notes = originalNotes;

        if (commit.type === 'feat') {
          commit.type = 'Features';
        } else if (commit.type === 'fix') {
          commit.type = 'Bug Fixes';
        } else if (commit.type === 'perf') {
          commit.type = 'Performance Improvements';
        } else if (commit.type === 'revert') {
          commit.type = 'Reverts';
        } else if (commit.type === 'docs') {
          commit.type = 'Documentation';
        } else if (commit.type === 'style') {
          commit.type = 'Coding Style';
        } else if (commit.type === 'refactor') {
          commit.type = 'Code Refactoring';
        } else if (commit.type === 'test') {
          commit.type = 'Tests';
        } else if (commit.type === 'chore') {
          commit.type = 'Chores';
        }

        return commit;
    };
}


module.exports = ccAngular.then(
function (options)
{
    options.writerOpts.transform = transformFactory(
        options.writerOpts.transform
    );
    return options;
});

