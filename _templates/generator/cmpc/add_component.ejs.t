---
message: |
  - { red COMPONENT CLASS }
to: src/components/<%= name %>/index.js
---

import React from 'react'
import styles from './<%= name.toLowerCase() %>.scss'

class <%= name %> extends React.Component {

  render() {
    return (
      <div className={styles.<%= name.toLowerCase() %>}>
        <h2><%= name %> component</h2>
      </div>
    )
  }
}

export default <%= name %>