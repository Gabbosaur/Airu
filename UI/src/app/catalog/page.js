'use client';

import ResourceTable from './ResourceTable';
import {
  DataTableSkeleton,
  Pagination,
  Column,
  Grid,
  MultiSelect,
  TextInput,
} from '@carbon/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const headers = [
  { key: 'flavorName', header: 'Name' },
  { key: 'flavorOsPlatform', header: 'Os' },
  { key: 'flavorCpu', header: 'Cpu' },
  { key: 'flavorRam', header: 'Ram' },
  { key: 'flavorDisk', header: 'Disk' },
  { key: 'resourceName', header: 'Resource' },
  { key: 'resourceCategory', header: 'Category' },
  { key: 'hourlyUnitPrice', header: 'Hourly Price' },
];

const getRowItems = (rows) =>
  rows.map((row) => {
    console.debug(row); // Log the row data for debugging
    return {
      id: row._id,
      key: row._id,
      resourceName: row.resourceName,
      resourceCategory: row.resourceCategory,
      currencyCode: row.currencyCode,
      unitOfMeasure: row.unitOfMeasure,
      unitPrice: row.unitPrice,
      hourlyUnitPrice: row.unitPrice + ' ' + row.currencyCode,

      productName: row.productName,
      flavorName: row.flavor?.name || '', // Use empty string if flavor is null or undefined
      flavorDescription: row.flavor?.description || '', // Use empty string if flavor is null or undefined
      flavorOsPlatform: row.flavor?.osPlatform || '', // Use empty string if flavor is null or undefined
      flavorCpu: row.flavor?.cpu || '', // Use empty string if flavor is null or undefined
      flavorRam: row.flavor?.ram || '', // Use empty string if flavor is null or undefined
      flavorDisk: row.flavor?.disk || '', // Use empty string if flavor is null or undefined
      tiers: row.tiers,
    };
  });

function ProductsPage() {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedOs, setSelectedOs] = useState([]);
  const [selectedCpu, setSelectedCpu] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedDisk, setSelectedDisk] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const osOptions = [
    { id: 'linux', label: 'Linux' },
    { id: 'windows', label: 'Windows' },
  ];

  const cpuOptions = [
    { id: '2', label: '2' },
    { id: '4', label: '4' },
    { id: '8', label: '8' },
    { id: '16', label: '16' },
  ];

  const ramOptions = [
    { id: '2', label: '2GB' },
    { id: '4', label: '4GB' },
    { id: '8', label: '8GB' },
    { id: '16', label: '16GB' },
    { id: '32', label: '32GB' },
    { id: '64', label: '64GB' },
  ];

  const diskOptions = [
    { id: '20', label: '20GB' },
    { id: '40', label: '40GB' },
    { id: '80', label: '80GB' },
    { id: '120', label: '120GB' },
  ];

  const categoryOptions = [
    { id: 'disk	', label: 'Disk' },
    { id: 'computing', label: 'Computing' },
    { id: 'container', label: 'Container' },
    { id: 'networking', label: 'Networking' },
  ];

  useEffect(() => {
    async function getProducts() {
      let config = {
        method: 'get',
        url: 'http://localhost:8000/api/v1/aruba/catalog_products',
      };

      axios
        .request(config)
        .then((response) => {
          console.debug(response.data);
          const items = getRowItems(response.data);
          setRows(items);
          setFilteredRows(items);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });

      setLoading(false);
    }

    getProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    searchText,
    selectedCategory,
    selectedCpu,
    selectedDisk,
    selectedOs,
    selectedRam,
    rows,
  ]);

  const applyFilters = () => {
    let updatedRows = [...rows];

    // Apply text filter (search by flavor name or resource name)
    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();
      updatedRows = updatedRows.filter(
        (row) =>
          row.flavorName.toLowerCase().includes(lowerCaseSearchText) ||
          row.resourceName.toLowerCase().includes(lowerCaseSearchText)
      );
    }

    // Apply OS filter (only filter if something is selected)
    if (selectedOs.length > 0) {
      updatedRows = updatedRows.filter((row) =>
        selectedOs.some((os) => row.flavorOsPlatform === os)
      );
    }

    // Apply CPU filter (numeric and only if selected)
    if (selectedCpu.length > 0) {
      updatedRows = updatedRows.filter((row) =>
        selectedCpu.some((cpu) => parseInt(row.flavorCpu) === parseInt(cpu))
      );
    }

    // Apply RAM filter (only if something is selected)
    if (selectedRam.length > 0) {
      updatedRows = updatedRows.filter((row) =>
        selectedRam.some((ram) => row.flavorRam.toString() === ram)
      );
    }

    // Apply Disk filter (numeric and only if selected)
    if (selectedDisk.length > 0) {
      updatedRows = updatedRows.filter((row) =>
        selectedDisk.some((disk) => parseInt(row.flavorDisk) === parseInt(disk))
      );
    }

    // Apply Category filter (only filter if something is selected)
    if (selectedCategory.length > 0) {
      updatedRows = updatedRows.filter((row) =>
        selectedCategory.some((category) => row.resourceCategory === category)
      );
    }

    setFilteredRows(updatedRows);
  };

  if (loading) {
    return (
      <Grid className="product-page">
        <Column lg={16} md={8} sm={4} className="product-page__r1">
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={10}
            headers={headers}
          />
        </Column>
      </Grid>
    );
  }

  if (error) {
    return `Error! ${error}`;
  }

  return (
    <Grid className="product-page">
      <Column lg={16} md={8} sm={4} className="product-page__r1">
        <div style={{ marginBottom: '1rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          >
            <TextInput
              labelText="Search"
              placeholder="Search by Name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <MultiSelect
              id="os-filter-multiselect"
              titleText="OS"
              label="Select OS"
              items={osOptions}
              itemToString={(item) => item.label}
              onChange={({ selectedItems }) =>
                setSelectedOs(selectedItems.map((item) => item.id))
              }
            />
            <MultiSelect
              id="cpu-filter-multiselect"
              titleText="CPU"
              label="Select CPU"
              items={cpuOptions}
              itemToString={(item) => item.label}
              onChange={({ selectedItems }) =>
                setSelectedCpu(selectedItems.map((item) => item.id))
              }
            />
            <MultiSelect
              id="ram-filter-multiselect"
              titleText="RAM"
              label="Select RAM"
              items={ramOptions}
              itemToString={(item) => item.label}
              onChange={({ selectedItems }) =>
                setSelectedRam(selectedItems.map((item) => item.id))
              }
            />
            <MultiSelect
              id="disk-filter-multiselect"
              titleText="Disk"
              label="Select Disk"
              items={diskOptions}
              itemToString={(item) => item.label}
              onChange={({ selectedItems }) =>
                setSelectedDisk(selectedItems.map((item) => item.id))
              }
            />

            <MultiSelect
              id="category-filter-multiselect"
              titleText="Category"
              label="Select Category"
              items={categoryOptions}
              itemToString={(item) => item.label}
              onChange={({ selectedItems }) =>
                setSelectedCategory(selectedItems.map((item) => item.id))
              }
            />
          </div>
          <ResourceTable rows={filteredRows} headers={headers} />
        </div>
      </Column>
    </Grid>
  );
}

export default ProductsPage;
