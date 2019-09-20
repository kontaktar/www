---
inject: true
to: src/layouts/index.js
append: true
message: |
  - {yellow INJECTED}: LAYOUTS EXPORT
---
export { default as <%= name %> } from "./<%= name %>";