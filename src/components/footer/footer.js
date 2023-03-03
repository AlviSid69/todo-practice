import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../tasks-filter/tasks-filter'

import './footer.css'

function Footer(props) {
  const { count, filter, onFilterChange, clearComplited } = props

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearComplited}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  count: 0,
  filter: 'all',
}

Footer.propTypes = {
  count: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  clearComplited: PropTypes.func.isRequired,
}

export default Footer
