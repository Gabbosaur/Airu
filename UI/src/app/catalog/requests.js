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
      name: 'hackathon-test',
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
    url: 'http://localhost:8000/api/v1/aruba/projects',
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
    url: 'http://localhost:8000/api/v1/aruba/projects/' + projectId,
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
    url: `http://localhost:8000/api/v1/aruba/projects/${projectId}/providers/Aruba.Network/vpcs`,
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
    url: `http://localhost:8000/api/v1/aruba/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}`,
    headers: {
      Authorization: 'Bearer ',
    },
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get VPC');
  }
};

const createSubnet = async (projectId, vpcId) => {
  console.log('Creating subnet...');
  let data = JSON.stringify({
    metadata: {
      name: 'kaas-subnet-1',
      tags: ['tag-1', 'tag-2'],
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
    url: `http://localhost:8000/api/v1/aruba/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/subnets`,
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
  const url = `http://localhost:8000/api/v1/aruba/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}/subnets/${subnetId}`;
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
    return response.data; // Restituisce i dettagli della subnet
  } catch (error) {
    console.error('Failed to get subnet:', error.message);
    throw new Error('Unable to retrieve subnet details');
  }
};

const createKaas = async (projectId, vpcId, subnetId, product) => {
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
        address: '192.168.59.0/25',
        name: 'kaas-test-cidr',
      },
      securityGroup: {
        name: 'kaas-test-sg',
      },
      nodePools: [
        {
          name: 'hackathon-test',
          nodes: product.quantity,
          instance: product.resourceName,
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
    return response.data;
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
  product,
  elasticIpId,
  blockStorageId
) => {
  const data = JSON.stringify({
    metadata: {
      name: 'cloud-server-1-win',
      location: { value: 'ITBG-Bergamo' },
      tags: ['tag-1'],
    },
    properties: {
      dataCenter: 'ITBG-1',
      vpc: {
        uri: `/projects/${projectId}/providers/Aruba.Network/vpcs/${vpcId}`,
      },
      vpcPreset: false,
      flavorId: product.flavorId,
      template: {
        uri: `/providers/Aruba.Compute/templates/${product.template}`,
      },
      addElasticIp: product.elasticIP,
      elasticIp: {
        uri: `/projects/${projectId}/providers/Aruba.Network/elasticIps/${elasticIpId}`,
      },
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
      volumes: [
        {
          uri: `/projects/${projectId}/providers/Aruba.Storage/blockStorages/${blockStorageId}`,
        },
      ],
    },
  });

  const config = createConfig(
    'post',
    `${API_BASE_URL}/projects/${projectId}/providers/Aruba.Compute/cloudServers`,
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

const createElasticIp = async (projectId) => {
  console.log('Creating elastic IP...');

  let data = JSON.stringify({
    metadata: {
      name: 'elastic-ip-hackathon', // Nome significativo
      tags: ['hackathon-test'],
      location: {
        value: 'ITBG-Bergamo',
      },
    },
    properties: {
      billingPlan: {
        billingPeriod: 'Hour', // Periodo di fatturazione
      },
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:8000/api/v1/aruba/projects/${projectId}/providers/Aruba.Network/elasticIps`,
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
    return response.data.metadata.id; // Restituisce l'ID dell'Elastic IP
  } catch (error) {
    console.error('Failed to create Elastic IP:', error.message);
    throw new Error('Elastic IP creation failed');
  }
};

export const deploySolution = async (uniqueProducts) => {
  console.log('Deploying solution...');
  console.debug(uniqueProducts);
  if (uniqueProducts.length === 0) return;

  console.log('Deploying solution...');
  try {
    const projectId = await createProject();
    console.debug('Project ID:', projectId);

    //await sleep(5000); // Wait for the project to be created
    await getProject(projectId);

    // const vpcId = await createVpc(projectId);
    // console.debug('VPC ID:', vpcId);

    // await sleep(5000); // Wait for the VPC to be created
    // await getVpc(projectId, vpcId);

    // const subnetId = await createSubnet(projectId, vpcId);
    // console.debug('Subnet ID:', subnetId);

    // await sleep(5000); // Wait for the subnet to be created

    // uniqueProducts.forEach((product) => {
    //     if (product.resourceName === 'elasticIp') {
    //       createElasticIp(projectId);
    //     } else if (product.resourceName === 'blockStorage') {
    //       createBlockStorage(projectId);
    //     } else if (product.resourceName === 'cloudServer') {
    //       let elasticIpId = '';
    //       if (product.elasticIP) elasticIpId = createElasticIp(projectId);
    //       let blockStorageId = '';
    //       if (product.blockStorageId) blockStorageId = createElasticIp(projectId);
    //       createCloudServer(
    //         projectId,
    //         vpcId,
    //         subnetId,
    //         securityGroupId,
    //         product.flavorName,
    //         elasticIpId,
    //         blockStorageId
    //       );
    //     } else if (product.resourceName === 'kaas') {
    //       let blockStorageId = '';
    //       if (product.blockStorageId) blockStorageId = createElasticIp(projectId);
    //       createKaas(
    //         projectId,
    //         vpcId,
    //         subnetId,
    //         securityGroupId,
    //         product.flavorName,
    //         blockStorageId
    //       );
    //     }
    //   });
    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Error during deployment:', error.message);
  }
};
