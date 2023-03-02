import React, { Component } from "react";
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';

import './task.css';

export default class Task extends Component {

  static defaultProps = {
    done: false,
    edit: false,
  };

  static propTypes = {
    task: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    onDeleted: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
    onEditSubmit: PropTypes.func.isRequired,
  };


  render() {
    const { task, id, done, edit, date, onDeleted, onEditItem, onToggleEdit, onEditSubmit } = this.props;

    return (
      <>
        <div className="view">

          <input
            className="toggle"
            type="checkbox"
            checked={done}
            readOnly
          />

          <label>
            <span className="description">{task}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: KG,
                addSuffix: true,
              })}`}
            </span>
          </label>

          <button name="edit" className="icon icon-edit" onClick={onToggleEdit} />
          <button
            name="remove"
            className="icon icon-destroy"
            onClick={onDeleted} />

        </div>
        {edit && (
          <form onSubmit={(ev) => onEditSubmit(ev, id)}>
            <input type="text" className="edit" value={task} onChange={(ev) => onEditItem(ev, id)} />
          </form>
        )}
      </>
    );
  };
};