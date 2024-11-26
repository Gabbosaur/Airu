import React from 'react';

let elasticIPDiscount = 0;
let blockStorageDiscount = 0;

function getUniqueProductsWithQuantity(
  selectedProducts,
  optionalResources,
  tier
) {
  const uniqueProducts = [];

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

  console.debug('uniqueProducts', uniqueProducts);
  return uniqueProducts;
}

function formatToTwoDecimals(number) {
  if (typeof number !== 'number') {
    throw new Error('Input must be a number');
  }
  return parseFloat(number.toFixed(2));
}

const SelectedProductsPanel = ({
  selectedProducts,
  optionalResources,
  budget,
  duration,
  updateSelectedProducts,
  handleAddButtonClick,
  tier = 'None',
}) => {
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
                      totalCostWithDuration > budget ? '#e0e0e0' : '#0f62fe',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor:
                      totalCostWithDuration > budget
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  disabled={totalCostWithDuration > budget || budget === 0}
                  onClick={() => handleAddButtonClick(row.id)}
                >
                  Deploy solution
                </button>
              </div>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default SelectedProductsPanel;
