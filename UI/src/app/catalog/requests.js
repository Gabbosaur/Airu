import { get } from 'axios';

const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000/api/v1/aruba';
const AUTH_TOKEN = 'Bearer ';

const createConfig = (method, url, data = null) => ({
  method,
  maxBodyLength: Infinity,
  url,
  headers: {
    accept: 'text/plain',
    'Content-Type': 'application/json',
    Authorization: AUTH_TOKEN,
  },
  data,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createProject = async () => {
  console.log('Creating project...');
  let data = JSON.stringify({
    metadata: {
      name: 'hackathon-test-prod',
      tags: ['hackathon-test'],
    },
    properties: {
      description: 'hackathon-test',
      default: false,
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/projects`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.metadata.id;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create project');
  }
};

const getProject = async (projectId) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/projects/${projectId}`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ',
    },
  };

  try {
    const response = await axios.request(config);
    console.debug(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get project');
  }
};

const createVpc = async (projectId) => {
  console.log('Creating VPC...');
  let data = JSON.stringify({
    metadata: {
      name: 'hackathon-test',
      tags: ['hackathon-test'],
      location: {
        value: 'ITBG-Bergamo',
      },
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Network/vpcs`,
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.metadata.id;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create VPC');
  }
};

const getVpc = async (projectId, vpcId) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}`,
    headers: {
      Authorization: 'Bearer ',
    },
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.status.state;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get VPC');
  }
};

const createSubnet = async (projectId, vpcId) => {
  console.log('Creating subnet...');
  let data = JSON.stringify({
    metadata: {
      name: 'hackathon-test',
      tags: ['hackathon-test'],
    },
    properties: {
      type: 'Advanced',
      default: true,
      network: {
        address: '192.168.1.0/25',
      },
      dhcp: {
        enabled: true,
      },
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/subnets`,
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.metadata.id;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create subnet');
  }
};

const getSubnet = async (projectId, vpcId, subnetId) => {
  const url = `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/subnets/${subnetId}`;
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Authorization: 'Bearer ', // Inserisci qui il token
    },
  };

  try {
    const response = await axios.request(config);
    console.log('Subnet details:', JSON.stringify(response.data, null, 2)); // Formattazione per una migliore leggibilità
    return response.data.status.state;
  } catch (error) {
    console.error('Failed to get subnet:', error.message);
    throw new Error('Unable to retrieve subnet details');
  }
};

const createKaas = async (projectId, vpcId, subnetId, product, i) => {
  const data = JSON.stringify({
    metadata: {
      name: 'hackathon-test',
      location: { value: 'ITBG-Bergamo' },
      tags: ['hackathon-test'],
    },
    properties: {
      preset: false,
      vpc: {
        uri: `/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}`,
      },
      kubernetesVersion: { value: '1.29.2' },
      subnet: {
        uri: `/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/subnets/${subnetId}`,
      },
      nodeCidr: {
        address: '192.168.59.' + i + '/24',
        name: 'cidr-hackathon-test-' + i,
      },
      securityGroup: {
        name: 'security-group-hackathon-test-' + i,
      },
      nodePools: [
        {
          name: 'node-pools-hackathon-test-' + i,
          nodes: 1,
          instance: product.flavorName,
          dataCenter: 'ITBG-1',
        },
      ],
      ha: product.highlyAvailable,
      billingPlan: { billingPeriod: 'Hour' },
    },
  });

  const config = createConfig(
    'post',
    `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Container/kaas`,
    data
  );

  try {
    const response = await axios.request(config);
    console.log('KaaS created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating KaaS:', error.message);
    throw error;
  }
};

const createSecurityGroup = async (projectId, vpcId) => {
  const data = JSON.stringify({
    metadata: {
      name: 'hackathon-test',
      tags: ['hackathon-test'],
      location: { value: 'ITBG-Bergamo' },
    },
    properties: { default: false },
  });

  const config = createConfig(
    'post',
    `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/securityGroups`,
    data
  );

  try {
    const response = await axios.request(config);
    console.log('Security group created:', response.data);
    return response.data.metadata.id;
  } catch (error) {
    console.error('Error creating security group:', error.message);
    throw error;
  }
};

const getSecurityGroup = async (projectId, vpcId, securityGroupId) => {
  const config = createConfig(
    'get',
    `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/securityGroups/${securityGroupId}`
  );

  try {
    const response = await axios.request(config);
    console.log('Security group details:', response.data);
    return response.data.status.state;
  } catch (error) {
    console.error('Error retrieving security group:', error.message);
    throw error;
  }
};

const createCloudServer = async (
  projectId,
  vpcId,
  subnetId,
  securityGroupId,
  elasticIpId,
  blockStorageId,
  product,
  i
) => {
  const volumes = [];
  if (blockStorageId !== '') {
    volumes.push({
      uri: `/projects/${projectId}/providers/Aruba.Storage/volumes/${blockStorageId}`,
    });
  }

  let elasticIp = {};
  if (product.elasticIP) {
    elasticIp = {
      uri: `/projects/${projectId}/providers/Aruba.Network/elasticIps/${elasticIpId}`,
    };
  }

  const data = JSON.stringify({
    metadata: {
      name: 'hackathon-test-' + i,
      location: { value: 'ITBG-Bergamo' },
      tags: ['hackathon-test'],
    },
    properties: {
      dataCenter: 'ITBG-1',
      vpc: {
        uri: `/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}`,
      },
      vpcPreset: false,
      flavorId: product.flavorCode,
      template: {
        uri: `/providers/Aruba.Compute/templates/${product.template}`,
      },
      addElasticIp: product.elasticIP,
      elasticIp: elasticIp,
      initialPassword: 'Aruba2024!',
      subnets: [
        {
          uri: `/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/subnets/${subnetId}`,
        },
      ],
      securityGroups: [
        {
          uri: `/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/securityGroups/${securityGroupId}`,
        },
      ],
      volumes: volumes,
    },
  });

  const config = createConfig(
    'post',
    `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Compute/cloudServers?api-version=1.1`,
    data
  );

  try {
    const response = await axios.request(config);
    console.log('Cloud server created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating cloud server:', error.message);
    throw error;
  }
};

const createElasticIp = async (projectId, i) => {
  console.log('Creating elastic IP...');

  let data = JSON.stringify({
    metadata: {
      name: 'elastic-ip-hackathon' + i,
      tags: ['hackathon-test'],
      location: {
        value: 'ITBG-Bergamo',
      },
    },
    properties: {
      billingPlan: {
        billingPeriod: 'Hour',
      },
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Network/elasticIps`,
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('Elastic IP created:', JSON.stringify(response.data));
    return response.data.metadata.id;
  } catch (error) {
    console.error('Failed to create Elastic IP:', error.message);
    throw new Error('Elastic IP creation failed');
  }
};

const getElasticIp = async (projectId, elasticIpId) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Network/elasticIps/${elasticIpId}`,
      headers: {
        Authorization: 'Bearer ', // Add your token here
      },
    };

    const response = await axios.request(config);
    console.log('Elastic IP:', JSON.stringify(response.data));
    return response.data.status.state;
  } catch (error) {
    console.error('Error fetching Elastic IP:', error);
    throw error; // Rethrow the error if needed
  }
};

const createBlockStorage = async (projectId, i, blockStorage) => {
  console.log('Creating block storage...');

  let data = JSON.stringify({
    metadata: {
      name: `block-storage-hackathon-test-${i}`,
      location: {
        value: 'ITBG-Bergamo',
      },
      tags: ['tag-1'],
    },
    properties: {
      sizeGb: blockStorage,
      billingPeriod: 'Hour',
      dataCenter: 'ITBG-1',
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Storage/blockStorages`,
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log('Block storage created:', JSON.stringify(response.data));
    return response.data.metadata.id;
  } catch (error) {
    console.error('Error creating block storage:', error.message);
    throw error;
  }
};

const getBlockStorage = async (projectId, blockStorageId) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Storage/blockStorages/${blockStorageId}`,
      headers: {
        Authorization: 'Bearer ', // Add your token here
      },
    };

    const response = await axios.request(config);
    console.log('Block Storage:', JSON.stringify(response.data));
    return response.data.status.state; // Return the data if needed
  } catch (error) {
    console.error('Error fetching Block Storage:', error);
    throw error; // Rethrow the error if needed
  }
};

export const deploySolution = async (uniqueProducts) => {
  console.log('Deploying solution...');
  console.debug(uniqueProducts);
  if (uniqueProducts.length === 0) return;

  try {
    //     const projectId = await createProject();
    //     console.debug('Project ID:', projectId);

    //     await sleep(5000); // Wait for the project to be created
    //     await getProject(projectId);

    //     const vpcId = await createVpc(projectId);
    //     console.debug('VPC ID:', vpcId);

    //     while(true) {
    //         await sleep(30000); // Wait for the VPC to be created
    //         const vpcState = await getVpc(projectId, vpcId);
    //         if( vpcState === 'Active')
    //             break;
    //         console.debug('VPC state: creating');
    //     }
    //     console.debug('VPC state: created');

    //     const subnetId = await createSubnet(projectId, vpcId);
    //     console.debug('Subnet ID:', subnetId);
    //     while(true) {
    //         await sleep(30000);
    //         const subentState = await getSubnet(projectId, vpcId, subnetId);
    //         if( subentState === 'Active')
    //             break;
    //         console.debug('Subnet state: creating');
    //     }
    //     console.debug('Subnet state: created');

    //     // const securityGroupId = await createSecurityGroup(projectId, vpcId);
    //     // console.debug('Security Group ID:', subnetId);
    //     // while(true) {
    //     //     await sleep(30000);
    //     //     const subentState = await getSecurityGroup(projectId, vpcId, securityGroupId);
    //     //     if( subentState === 'Active')
    //     //         break;
    //     //     console.debug('Security Group state: creating');
    //     // }
    //     // console.debug('Security Group state: created');

    //     // const projectId = "6747148ab5516a6b8f90fed0";
    //     // const vpcId = "6747148af37b2b43c3961e12";
    //     // const subnetId = "674714e5f37b2b43c3961e23";
    //     // const securityGroupId = "67471526f37b2b43c3961e34";
    //     // const securityGroupName = "hackathon-test";

    //     uniqueProducts.forEach(async (product) => {
    //         if (product.resourceName === 'elasticIp') {
    //             for (let i = 0; i < product.quantity; i++) {
    //                 createElasticIp(projectId, i);
    //             }
    //         } else if (product.resourceName === 'blockStorage') {
    //             for (let i = 0; i < product.quantity; i++) {
    //                 createBlockStorage(projectId, i, product.blockStorage);
    //             }
    //         } else if (product.resourceName === 'cloudServer') {

    //             for (let i = 0; i < product.quantity; i++) {
    //                 let elasticIpId = '';
    //           if (product.elasticIP) {
    //             elasticIpId = await createElasticIp(projectId, i);
    //             console.debug("Elastic IP ID:", elasticIpId);
    //             while(true) {
    //                 await sleep(30000);
    //                 const elasticIPState = await getElasticIp(projectId, elasticIpId);
    //                 if( elasticIPState === 'Active' || elasticIPState === 'NotUsed') {
    //                     console.debug('ElasticIP state: created');
    //                     break;
    //                 }
    //                 console.debug('ElasticIP state: creating');
    //                 }
    //             }
    //           let blockStorageId = '';
    //           if (product.blockStorage) {
    //             blockStorageId = await createBlockStorage(projectId, i, product.blockStorage);
    //             while(true) {
    //                 await sleep(30000);
    //                 const blockstorageState = await getBlockStorage(projectId, blockStorageId);
    //                 if( blockstorageState === 'Active' || blockstorageState === 'NotUsed') {
    //                     console.debug('Blockstorage state: created');
    //                     break;
    //                 }
    //                 console.debug('Blockstorage state: creating');
    //                 }
    //           }
    //           createCloudServer(
    //             projectId,
    //             vpcId,
    //             subnetId,
    //             securityGroupId,
    //             elasticIpId,
    //             blockStorageId,
    //             product,
    //             i
    //           );
    //         }
    //         } else if (product.resourceName === 'kaas') {
    //             for (let i = 0; i < product.quantity; i++) {
    //                 createKaas(
    //                     projectId,
    //                     vpcId,
    //                     subnetId,
    //                     product,
    //                     i
    //                   );
    //             }
    //         }
    //       });
    console.log('Deployment completed successfully!');
    return true;
  } catch (error) {
    console.error('Error during deployment:', error.message);
    return false;
  }
};
