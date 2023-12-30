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

      const namesRow = data[namesIndex].slice(1);
      const pricesRow = data[pricesIndex].slice(1);
      const articleRow = data[articleIndex].slice(1);
      const sizesRow = data.slice(sizesIndex + 1);

      const items = namesRow.map((name, index) => {
        const modelSizes = sizesRow
          .map((row) => (row[index + 1] === '+' ? row[0] : ''))
          .filter(Boolean);
        return {
          model: sheetTitle,
          name: name.trim(),
          price: Number(pricesRow[index].trim()),
          article: articleRow[index].trim(),
          sizes: modelSizes,
        };
      });

      return items;
    })
    .flat();
}
