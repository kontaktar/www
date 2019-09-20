---
to: src/layouts/<%= name %>/<%= name %>.module.scss
message: |
 - {green CREATED}: STYLESHEET
---
@import "../../styles/config";

.<%= name.toLowerCase() %> {
  background-color: red;
}