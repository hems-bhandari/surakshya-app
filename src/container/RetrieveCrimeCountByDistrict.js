import { CosmosClient } from "@azure/cosmos";

async function RetrieveCrimeCountByDistrict(district) {
  try {
    const endpoint = "https://surakshya.documents.azure.com:443/";
    const databaseName = `surakshya`;
    const containerName = `newsarticles`;
    const authOrResourceToken = process.env.AUTH_OR_RESOURCE_TOKEN;

    // Authenticate to Azure Cosmos DB
    const cosmosClient = new CosmosClient({
      endpoint,
      key: authOrResourceToken,
    });

    const databaseResponse = await cosmosClient.databases.createIfNotExists({
      id: databaseName,
    });

    const containerDefinition = {
      id: containerName,
      partitionKey: { paths: ["/Province"], kind: "Hash" },
      indexingPolicy: { includedPaths: [{ path: "/*" }] },
    };

    const { container } =
      await databaseResponse.database.containers.createIfNotExists(
        containerDefinition
      );

    const querySpec = {
      query: `SELECT VALUE COUNT(1) FROM c WHERE c.District = @district`,
      parameters: [
        {
          name: "@district",
          value: district,
        },
      ],
    };

    const { resources: items } = await container.items.query(querySpec).fetchAll();

    return items;
  } catch (err) {
    console.log(err);
  }
}

export default RetrieveCrimeCountByDistrict;
