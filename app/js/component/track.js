/*
 * Copyright 2014 Alexandre Pretto Nunes
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
define(
  [
    'flight/lib/component',
    'component/templates/issue_template'
  ],
  function (defineComponent, withIssueTemplate) {
    return defineComponent(track, withIssueTemplate);

    function track() {
      this.defaultAttrs({
        issueItemSelector: '.issue'
      });

      this.isIssueOnThisTrack = function (issue) {
        return issue.labels[0].name === this.attr.trackType;
      };

      this.displayIssues = function (ev, data) {
        data.issues.forEach(function (issue) {
          if (this.isIssueOnThisTrack(issue)) {
            this.$node.append(this.renderIssue(issue));
            //$("#" + issue.id).tooltip(issue.body);
          }
        }.bind(this));
      };

      this.renderIssue = function (issue) {
        return this.render(issue);
      };

      this.after('initialize', function () {
        this.on(document, 'data:issues:refreshed', this.displayIssues);
      });
    }
  }
);
