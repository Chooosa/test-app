import React, { Component } from 'react';

import {
   BootstrapTable, TableHeaderColumn, SizePerPageDropDown, InsertModalFooter, ButtonGroup
} from 'react-bootstrap-table';

import './style.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'


const renderShowsTotal = (start, to, total) => {
   return (
      <p className="showTotal" >There are {total} items total</p>
   );
}

const onInsertRow = () => {
   alert('Task added successfully');
}

const onDeleteRow = () => {
   alert('Task deleted successfully');
}

const cellEditProp = {
   mode: 'click',
   blurToSave: true
};

const dateFormatter = (cell) => {
   let dateObj = cell;
   if (typeof cell !== 'object') {
      dateObj = new Date(cell);
   }
   return `${('0' + dateObj.getUTCDate()).slice(-2)}.${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}.${dateObj.getUTCFullYear()}`;
}

class Table extends Component {
   constructor(props) {
      super(props);
   }

   renderSizePerPageDropDown = props => {
      return (
         <div className='btn-group'>
            {
               [5, 10, 30].map((n, idx) => {
                  const isActive = (n === props.currSizePerPage) ? 'active' : null;
                  return (
                     <button key={idx} type='button' className={`btn btn-info ${isActive}`} onClick={() => props.changeSizePerPage(n)}>{n}</button>
                  );
               })
            }
         </div>
      );
   }

   createCustomModalFooter = () => {
      return (
         <InsertModalFooter
            closeBtnClass='insert-close-btn'
            saveBtnClass='insert-save-btn' />
      );
   }

   createCustomModalHeader(onClose) {
      return (
         <div className='modal-header'>
            <h4>Add new task</h4>
            <button className='modal-header__close' onClick={onClose}>×</button>
         </div>
      );
   }

   render() {
      const { data } = this.props;

      const selectRowProp = {
         mode: 'checkbox',
         columnWidth: '40px'
      }

      const options = {
         sizePerPage: 5,
         pageStartIndex: 1,
         paginationSize: 3,
         prePage: 'Prev',
         nextPage: 'Next',
         firstPage: 'First',
         lastPage: 'Last',
         paginationShowsTotal: renderShowsTotal,
         afterInsertRow: onInsertRow,
         afterDeleteRow: onDeleteRow,
         sizePerPageDropDown: this.renderSizePerPageDropDown,
         insertModalFooter: this.createCustomModalFooter,
         insertModalHeader: this.createCustomModalHeader,
         btnGroup: this.createCustomButtonGroup
      }

      return (
         <div>
            <BootstrapTable data={data}
               pagination={true}
               options={options}
               insertRow={true}
               deleteRow={true}
               search={true}
               exportCSV={true}
               csvFileName='task-list'
               selectRow={selectRowProp}
               cellEdit={cellEditProp}>
               <TableHeaderColumn isKey
                  dataField='id'
                  width="60px"
                  dataAlign='center'>
                  ID
               </TableHeaderColumn>
               <TableHeaderColumn dataField='name'
                  dataAlign='left'
                  headerAlign='left'
                  editable={{ type: 'textarea' }}>
                  Task name
               </TableHeaderColumn>
               <TableHeaderColumn dataField='date'
                  width="25%"
                  dataAlign='center'
                  dataFormat={dateFormatter}
                  editable={{ type: 'date' }}
                  filter={{ type: 'DateFilter' }}>
                  Date
               </TableHeaderColumn>
            </BootstrapTable>
         </div >
      );
   }
}

export default Table;