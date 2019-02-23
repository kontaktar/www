---
message: |
  - {red COMPONENT FUNCTION}
to: src/Components/<%= dir || name %>/<%= name %>.js
---

import React from 'react'

const <%= name %> = () => {
  return (
    <div>
      <h2><%= name %> component</h2>
    </div>
  )
}

export default <%= name %>