'use client';

import ResourceTable from './ResourceTable';
import {
  DataTableSkeleton,
  Column,
  Grid,
  MultiSelect,
  TextInput,
  NumberInput,
  Checkbox,
} from '@carbon/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectedProductsPanel from './SelectedProductsPanel';
import WidgetCCAT from './Widget_CCAT';

const API_BASE_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL + '/api/v1/aruba'
  : 'http://localhost:8000/api/v1/aruba';

const headers = [
  { key: 'flavorName', header: 'Name' },
  { key: 'flavorOsPlatform', header: 'OS' },
  { key: 'flavorCpu', header: 'CPU' },
  { key: 'flavorRam', header: 'RAM (GB)' },
  { key: 'flavorDisk', header: 'Disk (GB)' },
  { key: 'resourceName', header: 'Resource' },
  { key: 'resourceCategory', header: 'Category' },
  { key: 'hourlyUnitPrice', header: 'Hourly Price' },
];

const getRowItems = (rows) =>
  rows.map((row) => {
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
      flavorName: row.flavor?.name || row.resourceName, // Use empty string if flavor is null or undefined
      flavorDescription: row.flavor?.description || '', // Use empty string if flavor is null or undefined
      flavorOsPlatform: row.flavor?.osPlatform || '', // Use empty string if flavor is null or undefined
      template:
        row.flavor?.osPlatform === 'windows'
          ? '65f42d72d82fd1d45ce03b0a'
          : '66045544b146b450ddb90975',
      flavorCpu: row.flavor?.cpu || '', // Use empty string if flavor is null or undefined
      flavorRam: row.flavor?.ram || '', // Use empty string if flavor is null or undefined
      flavorDisk: row.flavor?.disk || '', // Use empty string if flavor is null or undefined
      flavorId: row.flavor?.id || '', // Use empty string if flavor is null or undefined
      flavorCode: row.flavor?.code || '', // Use empty string if flavor is null or undefined
      tiers: row.tiers,
      unitPrice1Month: row.reservations[0].price,
      unitPrice1Year: row.reservations[1].price,
      unitPrice3Years: row.reservations[2].price,
      tiers1MinimumUnits: row.tiers[0].minimumUnits,
      tiers1PercentDiscount: row.tiers[0].percentDiscount,
      tiers2MinimumUnits: row.tiers[1].minimumUnits,
      tiers2PercentDiscount: row.tiers[1].percentDiscount,
      tiers3MinimumUnits: row.tiers[2].minimumUnits,
      tiers3PercentDiscount: row.tiers[2].percentDiscount,
      elasticIP: false,
      highlyAvailable: false,
      blockStorage: 0,
    };
  });

function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [optionalResources, setOptionalResources] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedOs, setSelectedOs] = useState([]);
  const [selectedCpu, setSelectedCpu] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedDisk, setSelectedDisk] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Stato per i prodotti selezionati
  const [budget, setBudget] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durationType, setDurationType] = useState(0);
  const [selectedPanels, setSelectedPanels] = useState([]); // Stato per i pannelli selezionati

  const osOptions = [
    { id: 'linux', label: 'Linux' },
    { id: 'windows', label: 'Windows' },
  ];

  const durationTypeOptions = ['day/s', 'month/s', 'year/s'];

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
    { id: 'storage', label: 'Disk' },
    { id: 'computing', label: 'Computing' },
    { id: 'container', label: 'Container' },
    { id: 'networking', label: 'Networking' },
  ];

  const panelOptions = [
    { id: 'Base', label: 'Base' },
    { id: 'Partner', label: 'Partner' },
    { id: 'Premium', label: 'Premium' },
  ];

  useEffect(() => {
    async function getProducts() {
      let config = {
        method: 'get',
        url: `${API_BASE_URL}/catalog_products`,
      };

      axios
        .request(config)
        .then((response) => {
          const items = getRowItems(response.data);
          const coreItems = items.filter(
            (item) => item.productName !== 'masterHA'
          );
          const specialItems = items.filter((item) => item.flavorCpu === '');
          setRows(coreItems);
          setOptionalResources(specialItems);
          setFilteredRows(coreItems);
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

  function generateUniqueId() {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  const handleAddProduct = (
    productID,
    elasticIP,
    ha,
    blockStorage,
    quantity
  ) => {
    const foundProduct = rows.find((row) => row.id === productID); // Find the matching product in rows
    let productToAdd = { ...foundProduct };
    // console.debug('productToAdd', productToAdd);
    // console.debug('productID', productID);

    productToAdd.elasticIP = elasticIP;
    productToAdd.highlyAvailable = ha;
    productToAdd.quantity = quantity;
    productToAdd.blockStorage = blockStorage;
    productToAdd.selectionId = generateUniqueId();
    // console.debug('productToAdd After', productToAdd);

    if (productToAdd) {
      setSelectedProducts((prev) => [...prev, productToAdd]);
    }
  };

  const handlePanelSelection = (id, isChecked) => {
    if (isChecked) {
      setSelectedPanels((prev) => [...prev, id]);
    } else {
      setSelectedPanels((prev) => prev.filter((panelId) => panelId !== id));
    }
  };

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
        <Column lg={12} md={8} sm={4} className="product-page__r1">
          <div style={{ marginBottom: '1rem' }}>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              <div
                style={{
                  width: '200px',
                  height: '48px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                }}
              ></div>

              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '150px',
                    height: '48px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                  }}
                ></div>
              ))}
            </div>

            <DataTableSkeleton
              columnCount={headers.length + 1} // Includes action buttons
              rowCount={5} // Simulate a few rows
              headers={headers}
            />
          </div>
        </Column>
      </Grid>
    );
  }

  if (error) {
    return `Error! ${error}`;
  }

  return (
    <div>
      <Grid className="product-page">
        <Column lg={16} md={8} sm={4} className="product-page__r1">
          <div style={{ marginBottom: '1rem' }}>
            <Grid
              style={{ gap: '1rem', marginBottom: '1rem', marginTop: '1rem' }}
            >
              <Column lg={2} md={4} sm={2}>
                <TextInput
                  labelText="Search"
                  placeholder="Search by Name"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Column>
              <Column lg={2} md={4} sm={2}>
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
              </Column>
              <Column lg={2} md={4} sm={2}>
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
              </Column>
              <Column lg={2} md={4} sm={2}>
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
              </Column>
              <Column lg={2} md={4} sm={2}>
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
              </Column>
              <Column lg={2} md={4} sm={2}>
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
              </Column>
              <Column lg={2} md={4} sm={2}>
                <NumberInput
                  id="budget-input" // Ensure a unique ID is set for accessibility
                  label="Budget(Euro)"
                  labelText="Enter your budget"
                  placeholder="Enter your budget"
                  onChange={(e) => setBudget(e.target.value)}
                  hideSteppers
                />
              </Column>
              <Column lg={2} md={4} sm={2}>
                <NumberInput
                  id="duration-input" // Ensure a unique ID is set for accessibility
                  label="Duration(Months)"
                  labelText="Enter your duration"
                  placeholder="Enter your duration"
                  step={0.01} // Allow increments of 0.1 for floating-point input
                  onChange={(e) => setDuration(e.target.value)}
                  hideSteppers
                />
              </Column>
              {/* <Column lg={1} md={2} sm={1}>
          <Select
            id="durationType-select" // Ensure a unique ID is set for accessibility
            labelText="day/mon/year"
            onChange={(e) => setDurationType(e.target.value)}
            style={{ width: '100%' }}
          >
            {durationTypeOptions.map((item) => (
              <SelectItem key={item} value={item}>
                prova
              </SelectItem>
            ))}
          </Select>
          </Column> */}
            </Grid>
          </div>
        </Column>

        {/* Main Content Section */}
        <Column lg={16} md={8} sm={4}>
          <Grid style={{ gap: '1rem' }}>
            {/* Table Section */}
            <Column lg={12} md={8} sm={4}>
              <ResourceTable
                rows={filteredRows}
                headers={headers}
                onAdd={handleAddProduct}
              />
            </Column>

            {/* Selected Products Section */}
            <Column lg={4} md={8} sm={4}>
              <h4>Select other Tier to Compare:</h4>
              <br />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {panelOptions.map((option) => (
                  <Checkbox
                    id={option.id}
                    labelText={option.label}
                    onChange={(e) =>
                      handlePanelSelection(option.id, e.target.checked)
                    }
                  />
                ))}
              </div>
              <br />
              <SelectedProductsPanel
                selectedProducts={selectedProducts}
                optionalResources={optionalResources}
                budget={budget}
                duration={duration}
                updateSelectedProducts={setSelectedProducts}
              />
              <br />
              {selectedPanels.map((panelId) => (
                <div>
                  <SelectedProductsPanel
                    selectedProducts={selectedProducts}
                    optionalResources={optionalResources}
                    budget={budget}
                    duration={duration}
                    updateSelectedProducts={setSelectedProducts}
                    tier={panelId}
                  />
                  <br />
                </div>
              ))}
            </Column>
          </Grid>
        </Column>
      </Grid>
      <WidgetCCAT
        baseUrl="localhost"
        port="1865"
        initialPhrase="Hey there! Airu here, an agent AI-powered assistant. How can I help you?"
        sorryPhrase="oops... Airu encountered a technical issue."
        chatUnderneathMessage="LLM can make mistakes. Check important info."
      />
    </div>
  );
}

export default ProductsPage;
