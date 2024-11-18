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
  const [elasticIP, setElasticIP] = useState(false);
  const [ha, setHA] = useState(false);
  const [blockStorage, setBlockStorage] = useState(0);

  const handleElasticIPCheckboxChange = (rowId) => {
    console.log(`ElasticIP checkbox clicked for row ID: ${rowId}`);
    setElasticIP(!elasticIP);
  };

  const handleHACheckboxChange = (rowId) => {
    console.log(`HA checkbox clicked for row ID: ${rowId}`);
    setHA(!ha);
  };

  const handleInputChange = (rowId, value) => {
    console.log(
      `Numeric input value changed for row ID: ${rowId}, Value: ${value}`
    );
    setBlockStorage(value);
  };

  const handleAddButtonClick = (rowId) => {
    console.log(`Add button clicked for row: ${rowId}`);
    onAdd(rowId, elasticIP, ha, blockStorage);
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
                          <span>Add elasticIP</span>
                          <input
                            type="checkbox"
                            checked={elasticIP}
                            onChange={() =>
                              handleElasticIPCheckboxChange(row.id)
                            }
                          />
                          <span>Add HA</span>
                          <input
                            type="checkbox"
                            checked={ha}
                            onChange={() => handleHACheckboxChange(row.id)}
                          />
                          <span>
                            Add persistent storage with the following size (GB)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="16000"
                            placeholder="0-16000"
                            value={blockStorage}
                            onChange={(e) =>
                              handleInputChange(row.id, e.target.value)
                            }
                          />
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
