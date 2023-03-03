import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props

    const buttonsOut = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      const clazz = isActive ? 'selected' : null
      return (
        <li key={name}>
          <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      )
    })

    return <ul className="filters">{buttonsOut}</ul>
  }
}

TaskFilter.defaultProps = {
  filter: 'all',
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
}
