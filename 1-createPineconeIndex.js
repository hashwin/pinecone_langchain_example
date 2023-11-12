export const createPineconeIndex = async (
  client,
  indexName,
  vectorDimension
) => {
// 1. Initiate index existence check
  console.log(`Checking "${indexName}"...`);
// 2. Get list of existing indexes
  const existingIndexes = await client.listIndexes();
// 3. If index doesn't exist, create it
  if (!existingIndexes.map((i) => i.name).includes(indexName)) {
// 4. Log index creation initiation
    console.log(`Creating "${indexName}"...`);
// 5. Create index
    const createClient = await client.createIndex({
      name: indexName,
      dimension: vectorDimension,
      metric: "cosine",
      waitUntilReady: true
    });
// 6. Log successful creation
    console.log(`Index ${indexName} created and ready`);
  } else {
// 8. Log if index already exists
    console.log(`"${indexName}" already exists.`);
  }
};
