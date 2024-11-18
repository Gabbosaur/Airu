import React from 'react';

function getUniqueProductsWithQuantity(selectedProducts) {
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
      existingProduct.quantity += 1;
    } else {
      uniqueProducts.push({ ...product, quantity: 1 });
    }
  });

  return uniqueProducts;
}

function extractNumberFromString(str) {
  const match = str.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
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

  const uniqueProducts = getUniqueProductsWithQuantity(selectedProducts);

  const totalCost = uniqueProducts.reduce((sum, product) => {
    const productCost =
      (extractNumberFromString(product.hourlyUnitPrice) +
        product.blockStorage *
          extractNumberFromString(optionalResources[0].hourlyUnitPrice) +
        product.elasticIP *
          extractNumberFromString(optionalResources[1].hourlyUnitPrice) +
        product.highlyAvailable *
          extractNumberFromString(optionalResources[2].hourlyUnitPrice)) *
      product.quantity *
      24 *
      30;
    return sum + productCost;
  }, 0);

  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
      }}
    >
      <h4>Selected products</h4>

      {selectedProducts.length === 0 ? (
        <p>No products selected.</p>
      ) : (
        <ul>
          {uniqueProducts.map((product) => (
            <li key={product.selectionId}>
              {product.flavorName} {product.highlyAvailable && 'HA'}{' '}
              {product.elasticIP && 'EIP'}{' '}
              {product.blockStorage > 0 && 'BS' + product.blockStorage} x{' '}
              {product.quantity} ={' '}
              {formatToTwoDecimals(
                (extractNumberFromString(product.hourlyUnitPrice) +
                  product.blockStorage *
                    extractNumberFromString(
                      optionalResources[0].hourlyUnitPrice
                    ) +
                  product.elasticIP *
                    extractNumberFromString(
                      optionalResources[1].hourlyUnitPrice
                    ) +
                  product.highlyAvailable *
                    extractNumberFromString(
                      optionalResources[2].hourlyUnitPrice
                    )) *
                  product.quantity *
                  24 *
                  30
              )}{' '}
              {'€/month'}
              <button
                onClick={() => handleRemoveProduct(product)}
                style={{ marginLeft: '10px' }}
              >
                Remove
              </button>
            </li>
          ))}
          <br />
          <li>
            <strong>Total Monthly Cost:</strong>{' '}
            {formatToTwoDecimals(totalCost)} €/month
            <br />
            <strong>Total Cost: </strong>
            <span
              style={{ color: totalCost * duration < budget ? 'green' : 'red' }}
            >
              {formatToTwoDecimals(totalCost) * duration} €
            </span>
            {/* <br />
            <strong>Total budget:</strong> {budget} € */}
          </li>
        </ul>
      )}
    </div>
  );
};

export default SelectedProductsPanel;
