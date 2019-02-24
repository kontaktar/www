---
message: |
  - { red COMPONENT CLASS}
to: src/Components/<%= name %>/index.js
---

import React from 'react'
import styles from './index.scss'

class <%= name %> extends React.Component {

  render() {
    return (
      <div>
        <h2><%= name %> component</h2>
      </div>
    )
  }
}

export default <%= name %>