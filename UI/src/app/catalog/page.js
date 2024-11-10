'use client';

import ResourceTable from './ResourceTable';
import {
  Link,
  DataTableSkeleton,
  Pagination,
  Column,
  Grid,
  MultiSelect,
  TextInput,
  Dropdown,
} from '@carbon/react';
import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';

const octokitClient = new Octokit({});

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'createdAt', header: 'Created' },
  { key: 'updatedAt', header: 'Updated' },
  { key: 'issueCount', header: 'Open Issues' },
  { key: 'stars', header: 'Stars' },
  { key: 'languages', header: 'Languages' },
  { key: 'links', header: 'Links' },
];

const LinkList = ({ url, homepageUrl }) => (
  <ul style={{ display: 'flex' }}>
    <li>
      <Link href={url}>GitHub</Link>
    </li>
    {homepageUrl && (
      <li>
        <span>&nbsp;|&nbsp;</span>
        <Link href={homepageUrl}>Homepage</Link>
      </li>
    )}
  </ul>
);

const getRowItems = (rows) =>
  rows.map((row) => ({
    ...row,
    key: row.id,
    stars: row.stargazers_count,
    issueCount: row.open_issues_count,
    createdAt: new Date(row.created_at).toLocaleDateString(),
    updatedAt: new Date(row.updated_at).toLocaleDateString(),
    languages: row.language ? [row.language] : [],
    links: <LinkList url={row.html_url} homepageUrl={row.homepage} />,
  }));

function ProductsPage() {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const starsOptions = [
    { id: 'all', label: 'All Stars' },
    { id: 'highStars', label: 'High Stars (> 1000)' },
    { id: 'mediumStars', label: 'Medium Stars (500-1000)' },
  ];

  const issuesOptions = [
    { id: 'all', label: 'All Issues' },
    { id: 'lowIssues', label: 'Low Issues (< 50)' },
    { id: 'mediumIssues', label: 'Medium Issues (50-200)' },
  ];

  const languagesOptions = [
    { id: 'all', label: 'All Languages' },
    { id: 'JavaScript', label: 'JavaScript' },
    { id: 'Python', label: 'Python' },
    { id: 'Ruby', label: 'Ruby' },
  ];

  useEffect(() => {
    async function getProducts() {
      const res = await octokitClient.request('GET /orgs/{org}/repos', {
        org: 'carbon-design-system',
        per_page: 75,
        sort: 'updated',
        direction: 'desc',
      });

      if (res.status === 200) {
        const items = getRowItems(res.data);
        setRows(items);
        setFilteredRows(items);
      } else {
        setError('Error obtaining repository data');
      }
      setLoading(false);
    }

    getProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, selectedStars, selectedIssues, selectedLanguages, rows]);

  const applyFilters = () => {
    let updatedRows = [...rows];

    // Apply text filter (search by name)
    if (searchText) {
      updatedRows = updatedRows.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply stars filter
    if (selectedStars.length > 0) {
      updatedRows = updatedRows.filter((row) =>
        selectedStars.includes('highStars')
          ? row.stars > 1000
          : selectedStars.includes('mediumStars') &&
            row.stars >= 500 &&
            row.stars <= 1000
      );
    }

    // Apply issues filter
    if (selectedIssues.length > 0) {
      updatedRows = updatedRows.filter((row) =>
        selectedIssues.includes('lowIssues')
          ? row.issueCount < 50
          : selectedIssues.includes('mediumIssues') &&
            row.issueCount >= 50 &&
            row.issueCount <= 200
      );
    }

    // Apply languages filter
    if (selectedLanguages.length > 0) {
      updatedRows = updatedRows.filter((row) =>
        selectedLanguages.some((lang) => row.languages.includes(lang))
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
        {/* Add margin-top before filters and margin-bottom under header */}
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
              id="search-text"
              labelText="Search Repositories"
              placeholder="Enter repository name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Dropdown
              id="stars-filter-dropdown"
              titleText="Stars"
              label="Select star rating"
              items={starsOptions}
              itemToString={(item) => (item ? item.label : '')}
              onChange={({ selectedItem }) => setStarsFilter(selectedItem.id)}
            />
            <MultiSelect
              id="stars-filter-multiselect"
              titleText="Stars"
              label="Select Stars"
              items={starsOptions}
              itemToString={(item) => item.label}
              selectedItems={selectedStars}
              onChange={({ selectedItems }) =>
                setSelectedStars(selectedItems.map((item) => item.id))
              }
            />
            <MultiSelect
              id="issues-filter-multiselect"
              titleText="Issues"
              label="Select Issues"
              items={issuesOptions}
              itemToString={(item) => item.label}
              selectedItems={selectedIssues}
              onChange={({ selectedItems }) =>
                setSelectedIssues(selectedItems.map((item) => item.id))
              }
            />
            <MultiSelect
              id="languages-filter-multiselect"
              titleText="Languages"
              label="Select Languages"
              items={languagesOptions}
              itemToString={(item) => item.label}
              selectedItems={selectedLanguages}
              onChange={({ selectedItems }) =>
                setSelectedLanguages(selectedItems.map((item) => item.id))
              }
            />
          </div>
        </div>
        <ResourceTable
          headers={headers}
          rows={filteredRows.slice(
            firstRowIndex,
            firstRowIndex + currentPageSize
          )}
        />
        <Pagination
          totalItems={filteredRows.length}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
      </Column>
    </Grid>
  );
}

export default ProductsPage;
