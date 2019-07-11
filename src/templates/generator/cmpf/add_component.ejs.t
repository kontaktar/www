---
message: |
  - {red COMPONENT FUNCTION}
to: src/components/<%= dir || name %>/<%= name %>.js
---

import React from 'react'
import styles from './index.scss'

const <%= name %> = () => {
  return (
    <div className={styles.<%= name %>}>
      <h2><%= name %> component</h2>
    </div>
  )
}

export default <%= name %>