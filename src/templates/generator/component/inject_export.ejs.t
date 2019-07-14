---
inject: true
to: src/components/index.js
append: true
message: |
  - {yellow INJECTED}: COMPONENT EXPORT
---
export { default as <%= name %> } from "./<%= name %>";