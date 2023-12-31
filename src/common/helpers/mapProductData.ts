/**
 * The `mapProductData` function takes in product data and maps it to a standardized format, extracting
 * relevant fields such as name, price, article, and sizes.
 * @param productData - The `productData` parameter is an array of objects.
 * @returns an array of objects representing product items.
 */
export function mapProductData(productData) {
  const sizesFromSheet = new Set();
  const modelsFromSheet = new Set();
  const mappedProduct = productData
    .map((category) => {
      const sheetTitle = category.sheetTitle;
      const data = category.data;
      modelsFromSheet.add(sheetTitle);

      /**
       * The function `getFieldIndex` returns the index of a specified field name in a 2D array.
       * @param {string} fieldName - The `fieldName` parameter is a string that represents the name of the
       * field you are searching for in the `data` array.
       * @returns The function `getFieldIndex` returns the index of the row in the `data` array where the
       * given `fieldName` is found.
       */
      const getFieldIndex = (fieldName: string) => {
        return data.findIndex((row: Array<string>) =>
          row.map((str) => str.trim()).includes(fieldName.trim()),
        );
      };

      const namesIndex = getFieldIndex('Імя');
      const pricesIndex = getFieldIndex('Ціна');
      const articleIndex = getFieldIndex('Код товару');
      const sizesIndex = getFieldIndex('Розміри');

      if (
        namesIndex === -1 ||
        pricesIndex === -1 ||
        articleIndex === -1 ||
        sizesIndex === -1
      ) {
        console.error(
          `Required fields not found in data for category: ${sheetTitle}`,
        );
        return [];
      }

      /* The code block you provided is extracting specific rows from the `data` array and using them
      to create an array of objects representing product items. */
      const namesRow = data[namesIndex].slice(1);
      const pricesRow = data[pricesIndex].slice(1);
      const articleRow = data[articleIndex].slice(1);
      const sizesRow = data.slice(sizesIndex + 1);

      const items = namesRow.map((name, index) => {
        const modelSizes = sizesRow
          .map((row) => (row[index + 1] === '+' ? row[0] : ''))
          .filter(Boolean);
        modelSizes.forEach((size) => sizesFromSheet.add(size));
        return {
          model: sheetTitle,
          name: name.trim(),
          price: Number(pricesRow[index].trim()),
          article: articleRow[index].trim(),
          sizes: modelSizes,
        };
      });

      return [items];
    })
    .flat();
  return [mappedProduct.flat(), [...sizesFromSheet], [...modelsFromSheet]];
}
