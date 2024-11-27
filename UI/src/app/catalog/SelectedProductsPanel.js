import React, { useState } from 'react';
import { Modal } from '@carbon/react';

let elasticIPDiscount = 0;
let blockStorageDiscount = 0;
const uniqueProducts = [];

function getUniqueProductsWithQuantity(
  selectedProducts,
  optionalResources,
  tier
) {
  uniqueProducts.length = 0;

  selectedProducts.forEach((product) => {
    const existingProduct = uniqueProducts.find(
      (uniqueProduct) =>
        uniqueProduct.flavorName === product.flavorName &&
        uniqueProduct.highlyAvailable === product.highlyAvailable &&
        uniqueProduct.elasticIP === product.elasticIP &&
        uniqueProduct.blockStorage === product.blockStorage
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity; // Aggiungi la quantità del prodotto corrente
    } else {
      uniqueProducts.push({ ...product }); // Aggiungi il prodotto con la sua quantità originale
    }
  });

  const totalConnectedElasticIPs = selectedProducts.reduce((sum, product) => {
    return product.elasticIP ? sum + product.quantity : sum;
  }, 0);

  const elasticIPProduct = uniqueProducts.find(
    (uniqueProduct) => uniqueProduct.flavorName === 'elasticIp'
  );

  const totalIndividualElasticIPs = elasticIPProduct
    ? elasticIPProduct.quantity
    : 0;

  const totalConnectedBlockStorage = selectedProducts.reduce((sum, product) => {
    return product.blockStorage
      ? sum + product.quantity * product.blockStorage
      : sum;
  }, 0);

  const blockStorageProduct = uniqueProducts.find(
    (uniqueProduct) => uniqueProduct.flavorName === 'blockStorage'
  );
  const totalIndividualBlockStorage = blockStorageProduct
    ? blockStorageProduct.quantity * blockStorageProduct.blockStorage
    : 0;

  if (tier === 'Base') {
    if (
      totalConnectedBlockStorage + totalIndividualBlockStorage >=
      optionalResources[0].tiers1MinimumUnits
    ) {
      blockStorageDiscount = optionalResources[0].tiers1PercentDiscount;
    }
    if (
      totalConnectedElasticIPs + totalIndividualElasticIPs >=
      optionalResources[1].tiers1MinimumUnits
    ) {
      elasticIPDiscount = optionalResources[1].tiers1PercentDiscount;
    }
  } else if (tier === 'Partner') {
    if (
      totalConnectedBlockStorage + totalIndividualBlockStorage >=
      optionalResources[0].tiers2MinimumUnits
    ) {
      blockStorageDiscount = optionalResources[0].tiers2PercentDiscount;
    }
    if (
      totalConnectedElasticIPs + totalIndividualElasticIPs >=
      optionalResources[1].tiers2MinimumUnits
    ) {
      elasticIPDiscount = optionalResources[1].tiers2PercentDiscount;
    }
  } else if (tier === 'Premium') {
    if (
      totalConnectedBlockStorage + totalIndividualBlockStorage >=
      optionalResources[0].tiers3MinimumUnits
    ) {
      blockStorageDiscount = optionalResources[0].tiers3PercentDiscount;
    }
    if (
      totalConnectedElasticIPs + totalIndividualElasticIPs >=
      optionalResources[1].tiers3MinimumUnits
    ) {
      elasticIPDiscount = optionalResources[1].tiers3PercentDiscount;
    }
  }

  //console.debug('uniqueProducts', uniqueProducts);
  return uniqueProducts;
}

function formatToTwoDecimals(number) {
  if (typeof number !== 'number') {
    throw new Error('Input must be a number');
  }
  return parseFloat(number.toFixed(2));
}

const createProject = () => {
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
    url: 'localhost:8000/api/v1/aruba/projects',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data.metadata.id;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createElasticIp = (projectId) => {
  console.log('Creating elastic IP...');
  let data = JSON.stringify({
    metadata: {
      name: '',
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
    url:
      'localhost:8000/api/v1/aruba/projects/ ' +
      projectId +
      '/providers/Aruba.Network/elasticIps',
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data.metadata.id;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createVpc = (projectId) => {
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
    url:
      'localhost:8000/api/v1/aruba/projects/ ' +
      projectId +
      '/providers/Aruba.Network/vpcs',
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data.metadata.id;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createSubnet = (projectId, vpcId) => {
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
    url:
      'localhost:8000/api/v1/aruba/projects/' +
      projectId +
      '/providers/Aruba.Network/vpcs/ ' +
      vpcId +
      ' /subnets',
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data.metadata.id;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createKaas = (projectId, vpcId, subnetId, product, blockStorageId) => {
  let data = JSON.stringify({
    metadata: {
      name: 'hackathon-test',
      location: {
        value: 'ITBG-Bergamo',
      },
      tags: ['hackathon-test'],
    },
    properties: {
      preset: false,
      vpc: {
        uri:
          '/projects/' + projectId + '/providers/Aruba.Network/vpcs/' + vpcId,
      },
      kubernetesVersion: {
        value: '1.29.2',
      },
      subnet: {
        uri:
          '/projects/' +
          projectId +
          '/providers/Aruba.Network/vpcs/' +
          vpcId +
          '/subnets/' +
          subnetId,
      },
      nodeCidr: {
        address: '192.168.59.0/25', // TODO
        name: 'kaas-test-cidr',
      },
      securityGroup: {
        name: 'kaas-test-sg', // TODO
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
      billingPlan: {
        billingPeriod: 'Hour',
      },
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url:
      'localhost:8000/api/v1/aruba/projects/' +
      projectId +
      '/providers/Aruba.Container/kaas',
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const createSecurityGroup = (projectId, vpcId) => {
  let data = JSON.stringify({
    metadata: {
      name: 'hackathon-test',
      tags: ['hackahton-test'],
      location: {
        value: 'ITBG-Bergamo',
      },
    },
    properties: {
      default: false,
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url:
      'localhost:8000/api/v1/aruba/projects/' +
      projectId +
      '/providers/Aruba.Network/vpcs/' +
      vpcId +
      '/securityGroups',
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data.metadata.id;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createCloudServer = (
  projectId,
  vpcId,
  subnetId,
  securityGroupId,
  product,
  elasticIpId,
  blockStorageId
) => {
  let data = JSON.stringify({
    metadata: {
      name: 'cloud-server-1-win',
      location: {
        value: 'ITBG-Bergamo',
      },
      tags: ['tag-1'],
    },
    properties: {
      dataCenter: 'ITBG-1',
      vpc: {
        uri:
          '/projects/' + projectId + '/providers/Aruba.Network/vpcs/' + vpcId,
      },
      vpcPreset: false,
      flavorId: product.flavorId,
      template: {
        uri: '/providers/Aruba.Compute/templates/' + product.template,
      },
      addElasticIp: product.elasticIP,
      elasticIp: {
        uri:
          '/projects/' +
          projectId +
          '/providers/Aruba.Network/elasticIps/' +
          elasticIpId,
      },
      initialPassword: 'Aruba2024!',
      subnets: [
        {
          uri:
            '/projects/' +
            projectId +
            '/providers/Aruba.Network/vpcs/' +
            vpcId +
            '/subnets/' +
            subnetId,
        },
      ],
      securityGroups: [
        {
          uri:
            '/projects/' +
            projectId +
            '/providers/Aruba.Network/vpcs/' +
            vpcId +
            '/securityGroups/' +
            securityGroupId,
        },
      ],
      volumes: [
        {
          uri:
            '/projects/' +
            projectId +
            '/providers/Aruba.Storage/blockStorages/' +
            blockStorageId,
        },
      ],
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url:
      'localhost:8000/api/v1/aruba/projects/' +
      projectId +
      '/providers/Aruba.Compute/cloudServers',
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const deploySolution = () => {
  console.log('Deploying solution...');
  console.debug(uniqueProducts);
  if (uniqueProducts.length === 0) return;

  const projectId = createProject();
  const vpcId = createVpc(projectId);
  const subnetId = createSubnet(projectId, vpcId);
  const securityGroupId = createSecurityGroup(projectId, vpcId);
  // TODO polling previous objs
  uniqueProducts.forEach((product) => {
    if (product.resourceName === 'elasticIp') {
      createElasticIp(projectId);
    } else if (product.resourceName === 'blockStorage') {
      createBlockStorage(projectId);
    } else if (product.resourceName === 'cloudServer') {
      let elasticIpId = '';
      if (product.elasticIP) elasticIpId = createElasticIp(projectId);
      let blockStorageId = '';
      if (product.blockStorageId) blockStorageId = createElasticIp(projectId);
      createCloudServer(
        projectId,
        vpcId,
        subnetId,
        securityGroupId,
        product.flavorName,
        elasticIpId,
        blockStorageId
      );
    } else if (product.resourceName === 'kaas') {
      let blockStorageId = '';
      if (product.blockStorageId) blockStorageId = createElasticIp(projectId);
      createKaas(
        projectId,
        vpcId,
        subnetId,
        securityGroupId,
        product.flavorName,
        blockStorageId
      );
    }
  });
};

const SelectedProductsPanel = ({
  selectedProducts,
  optionalResources,
  budget,
  duration,
  updateSelectedProducts,
  tier = 'None',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeployClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDeploy = () => {
    setIsModalOpen(false);
    deploySolution();
  };

  const handleCancelDeploy = () => {
    setIsModalOpen(false);
  };
  const handleRemoveProduct = (product) => {
    const updatedProducts = [...selectedProducts];
    const index = updatedProducts.findIndex(
      (p) =>
        p.flavorName === product.flavorName &&
        p.highlyAvailable === product.highlyAvailable &&
        p.elasticIP === product.elasticIP &&
        p.blockStorage === product.blockStorage
    );

    if (index !== -1) {
      updatedProducts.splice(index, 1); // Remove one instance of the product
    }

    updateSelectedProducts(updatedProducts);
  };

  const uniqueProducts = getUniqueProductsWithQuantity(
    selectedProducts,
    optionalResources,
    tier
  );

  const calculateProductCost = (product) => {
    let productCost = 0;

    if (tier === 'None') {
      if (duration < 1) {
        productCost =
          (product.unitPrice +
            product.blockStorage * optionalResources[0].unitPrice +
            product.elasticIP * optionalResources[1].unitPrice +
            product.highlyAvailable * optionalResources[2].unitPrice) *
          product.quantity *
          24 *
          30;
      } else if (duration >= 1 && duration < 12) {
        productCost =
          (product.unitPrice1Month +
            product.blockStorage * optionalResources[0].unitPrice1Month +
            product.elasticIP * optionalResources[1].unitPrice1Month +
            product.highlyAvailable * optionalResources[2].unitPrice1Month) *
          product.quantity *
          24 *
          30;
      } else if (duration >= 12 && duration < 36) {
        productCost =
          (product.unitPrice1Year +
            product.blockStorage * optionalResources[0].unitPrice1Year +
            product.elasticIP * optionalResources[1].unitPrice1Year +
            product.highlyAvailable * optionalResources[2].unitPrice1Year) *
          product.quantity *
          24 *
          30;
      } else if (duration >= 36) {
        productCost =
          (product.unitPrice3Years +
            product.blockStorage * optionalResources[0].unitPrice3Years +
            product.elasticIP * optionalResources[1].unitPrice3Years +
            product.highlyAvailable * optionalResources[2].unitPrice3Years) *
          product.quantity *
          24 *
          30;
      }
    } else if (tier === 'Base') {
      if (duration < 1) {
        if (product.quantity >= product.tiers1MinimumUnits) {
          productCost =
            (product.unitPrice * (1 - product.tiers1PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice +
              product.blockStorage *
                optionalResources[0].unitPrice *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 1 && duration < 12) {
        if (product.quantity >= product.tiers1MinimumUnits) {
          productCost =
            (product.unitPrice1Month *
              (1 - product.tiers1PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice1Month *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Month *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Month) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice1Month +
              product.blockStorage *
                optionalResources[0].unitPrice1Month *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Month *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Month) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 12 && duration < 36) {
        if (product.quantity >= product.tiers1MinimumUnits) {
          productCost =
            (product.unitPrice1Year *
              (1 - product.tiers1PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice1Year *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Year *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Year) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice1Year +
              product.blockStorage *
                optionalResources[0].unitPrice1Year *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Year *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Year) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 36) {
        if (product.quantity >= product.tiers1MinimumUnits) {
          productCost =
            (product.unitPrice3Years *
              (1 - product.tiers1PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice3Years *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice3Years *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice3Years) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice3Years +
              product.blockStorage *
                optionalResources[0].unitPrice3Years *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice3Years *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice3Years) *
            product.quantity *
            24 *
            30;
        }
      }
    } else if (tier === 'Partner') {
      if (duration < 1) {
        if (product.quantity >= product.tiers2MinimumUnits) {
          productCost =
            (product.unitPrice * (1 - product.tiers2PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice +
              product.blockStorage *
                optionalResources[0].unitPrice *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 1 && duration < 12) {
        if (product.quantity >= product.tiers2MinimumUnits) {
          productCost =
            (product.unitPrice1Month *
              (1 - product.tiers2PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice1Month *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Month *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Month) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice1Month +
              product.blockStorage *
                optionalResources[0].unitPrice1Month *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Month *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Month) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 12 && duration < 36) {
        if (product.quantity >= product.tiers2MinimumUnits) {
          productCost =
            (product.unitPrice1Year *
              (1 - product.tiers2PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice1Year *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Year *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Year) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice1Year +
              product.blockStorage *
                optionalResources[0].unitPrice1Year *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Year *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Year) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 36) {
        if (product.quantity >= product.tiers2MinimumUnits) {
          productCost =
            (product.unitPrice3Years *
              (1 - product.tiers2PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice3Years *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice3Years *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice3Years) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice3Years +
              product.blockStorage *
                optionalResources[0].unitPrice3Years *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice3Years *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice3Years) *
            product.quantity *
            24 *
            30;
        }
      }
    } else if (tier === 'Premium') {
      if (duration < 1) {
        if (product.quantity >= product.tiers3MinimumUnits) {
          productCost =
            (product.unitPrice * (1 - product.tiers3PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice +
              product.blockStorage *
                optionalResources[0].unitPrice *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 1 && duration < 12) {
        if (product.quantity >= product.tiers3MinimumUnits) {
          productCost =
            (product.unitPrice1Month *
              (1 - product.tiers3PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice1Month *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Month *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Month) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice1Month +
              product.blockStorage *
                optionalResources[0].unitPrice1Month *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Month *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Month) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 12 && duration < 36) {
        if (product.quantity >= product.tiers3MinimumUnits) {
          productCost =
            (product.unitPrice1Year *
              (1 - product.tiers3PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice1Year *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Year *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Year) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice1Year +
              product.blockStorage *
                optionalResources[0].unitPrice1Year *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice1Year *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice1Year) *
            product.quantity *
            24 *
            30;
        }
      } else if (duration >= 36) {
        if (product.quantity >= product.tiers3MinimumUnits) {
          productCost =
            (product.unitPrice3Years *
              (1 - product.tiers3PercentDiscount / 100) +
              product.blockStorage *
                optionalResources[0].unitPrice3Years *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice3Years *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice3Years) *
            product.quantity *
            24 *
            30;
        } else {
          productCost =
            (product.unitPrice3Years +
              product.blockStorage *
                optionalResources[0].unitPrice3Years *
                (1 - blockStorageDiscount / 100) +
              product.elasticIP *
                optionalResources[1].unitPrice3Years *
                (1 - elasticIPDiscount / 100) +
              product.highlyAvailable * optionalResources[2].unitPrice3Years) *
            product.quantity *
            24 *
            30;
        }
      }
    }
    return formatToTwoDecimals(productCost);
  };

  const totalCost = uniqueProducts.reduce((sum, product) => {
    return sum + calculateProductCost(product);
  }, 0);

  const totalCostWithDuration = totalCost * duration;

  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
      }}
    >
      {tier === 'None' ? <h4>Selected products</h4> : <h4>Compare {tier}</h4>}

      {selectedProducts.length === 0 ? (
        <p>No products selected.</p>
      ) : (
        <ul>
          {uniqueProducts.map((product) => {
            const productCost = calculateProductCost(product);
            return (
              <li key={product.selectionId}>
                {product.flavorName} {product.highlyAvailable && 'HA'}{' '}
                {product.elasticIP && 'EIP'}{' '}
                {product.blockStorage > 0 && 'BS' + product.blockStorage} x{' '}
                {product.quantity} = {productCost}
                €/month
                {tier === 'None' && (
                  <button
                    onClick={() => handleRemoveProduct(product)}
                    style={{ marginLeft: '10px' }}
                  >
                    Remove
                  </button>
                )}
              </li>
            );
          })}
          <br />
          <li>
            <strong>Total Monthly Cost:</strong>{' '}
            {formatToTwoDecimals(totalCost)} €/month
            <br />
            <strong>Total Cost: </strong>
            <span
              style={{
                color: totalCostWithDuration <= budget ? 'green' : 'red',
              }}
            >
              {formatToTwoDecimals(totalCostWithDuration)} €
            </span>
            <br />
            {tier === 'None' && (
              <div>
                <br />
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor:
                      totalCostWithDuration > budget ||
                      budget === 0 ||
                      duration === 0
                        ? '#e0e0e0'
                        : '#0f62fe',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor:
                      totalCostWithDuration > budget ||
                      budget === 0 ||
                      duration === 0
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  disabled={
                    totalCostWithDuration > budget ||
                    budget === 0 ||
                    duration === 0
                  }
                  onClick={() => handleDeployClick()}
                >
                  Deploy solution
                </button>
                {isModalOpen && (
                  <Modal
                    open={isModalOpen}
                    modalHeading="Confirm Deployment"
                    modalLabel="Deployment Confirmation"
                    primaryButtonText="Deploy"
                    secondaryButtonText="Cancel"
                    onRequestClose={handleCancelDeploy}
                    onRequestSubmit={handleConfirmDeploy}
                  >
                    <p>
                      Are you sure you want to deploy the solution? This action
                      cannot be undone.
                    </p>
                  </Modal>
                )}
              </div>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default SelectedProductsPanel;
