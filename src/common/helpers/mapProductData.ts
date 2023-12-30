export function mapProductData(productData) {
  return productData
    .map((category) => {
      const sheetTitle = category.sheetTitle;
      const data = category.data;

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
        namesIndex === null ||
        pricesIndex === null ||
        articleIndex === null ||
        sizesIndex === null
      ) {
        console.error(
          `Required fields not found in data for category: ${sheetTitle}`,
        );
        return [];
      }

      const namesRow = data[namesIndex].slice(1);
      const pricesRow = data[pricesIndex].slice(1);
      const codesRow = data[articleIndex].slice(1);
      const sizesRow = data.slice(sizesIndex + 1);

      const items = namesRow.map((name, index) => {
        const modelSizes = sizesRow
          .map((row) => (row[index + 1] === '+' ? row[0] : ''))
          .filter(Boolean);
        return {
          model: sheetTitle,
          name: name.trim(),
          price: pricesRow[index].trim(),
          code: codesRow[index].trim(),
          sizes: modelSizes,
        };
      });

      return items;
    })
    .flat();
}
