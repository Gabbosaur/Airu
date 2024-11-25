'use client';

import React, { useState } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableCell,
  TableExpandedRow,
} from '@carbon/react';

const ProductTable = ({ rows, headers, onAdd }) => {
  const [expandedRowId, setExpandedRowId] = useState(null); // Track expanded row ID
  const [rowOptions, setRowOptions] = useState({}); // Store options per row

  const handleCheckboxChange = (rowId, field) => {
    setRowOptions((prevOptions) => ({
      ...prevOptions,
      [rowId]: {
        ...prevOptions[rowId],
        [field]: !prevOptions[rowId]?.[field],
      },
    }));
  };

  const handleInputChange = (rowId, field, value) => {
    setRowOptions((prevOptions) => ({
      ...prevOptions,
      [rowId]: {
        ...prevOptions[rowId],
        [field]: value,
      },
    }));
  };

  const handleAddButtonClick = (rowId) => {
    const options = rowOptions[rowId] || {};
    console.log(`Add button clicked for row: ${rowId}`, options);
    onAdd(
      rowId,
      options.elasticIP || false,
      options.ha || false,
      options.blockStorage || 0,
      options.quantity || 1 // Default quantity to 1 if not set
    );
  };

  const handleRowExpandToggle = (rowId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId); // Toggle expand/collapse
  };

  return (
    <DataTable
      rows={rows}
      headers={headers}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
      }) => (
        <TableContainer
          title="Products catalog"
          description={`A collection of available products catalog: ${rows.length} resources found with the chosen filters.`}
        >
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })} key={header.key}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const rowProps = getRowProps({ row });
                const isExpanded = expandedRowId === row.id;
                const options = rowOptions[row.id] || {};

                return (
                  <React.Fragment key={row.id}>
                    <TableExpandRow
                      {...rowProps}
                      key={row.id}
                      isExpanded={isExpanded}
                      onExpand={() => handleRowExpandToggle(row.id)}
                    >
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableExpandRow>
                    {isExpanded && (
                      <TableExpandedRow colSpan={headers.length + 1}>
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          {row.cells[5].value === 'cloudServer' && (
                            <div>
                              <span>Add elasticIP</span>
                              <input
                                type="checkbox"
                                checked={options.elasticIP || false}
                                onChange={() =>
                                  handleCheckboxChange(row.id, 'elasticIP')
                                }
                              />
                            </div>
                          )}

                          {row.cells[5].value === 'kaas' && (
                            <div>
                              <span>Add HA</span>
                              <input
                                type="checkbox"
                                checked={options.ha || false}
                                onChange={() =>
                                  handleCheckboxChange(row.id, 'ha')
                                }
                              />
                            </div>
                          )}

                          {row.cells[5].value !== 'elasticIp' && (
                            <div>
                              <span>
                                Add persistent storage with the following size
                                (GB)
                              </span>
                              <input
                                type="number"
                                min="0"
                                max="16000"
                                placeholder="0-16000"
                                value={options.blockStorage || ''}
                                onChange={(e) =>
                                  handleInputChange(
                                    row.id,
                                    'blockStorage',
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          )}

                          {/* Add quantity input */}
                          <div>
                            <span>Quantity</span>
                            <input
                              type="number"
                              min="1"
                              value={options.quantity || 1}
                              onChange={(e) =>
                                handleInputChange(
                                  row.id,
                                  'quantity',
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                          </div>

                          <button
                            style={{
                              padding: '5px 10px',
                              backgroundColor: '#0f62fe',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                            }}
                            onClick={() => handleAddButtonClick(row.id)}
                          >
                            Add
                          </button>
                        </div>
                      </TableExpandedRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
};

export default ProductTable;
