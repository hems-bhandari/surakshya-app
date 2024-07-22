import { CosmosClient } from "@azure/cosmos";

async function RetrieveCrowdSource() {
  try {
    const endpoint = "https://surakshya.documents.azure.com:443/";
    const databaseName = `surakshya`;
    const containerName = `crowdsource`;
    const authOrResourceToken = process.env.AUTH_OR_RESOURCE_TOKEN;

    // Authenticate to Azure Cosmos DB
    const cosmosClient = new CosmosClient({
      endpoint,
      key: authOrResourceToken,
    });

    const databaseResponse = await cosmosClient.databases.createIfNotExists({
      id: databaseName,
    });

    const containerResponse =
      await databaseResponse.database.containers.createIfNotExists({
        id: containerName,
        partitionKey: { paths: ["/province"], kind: "Hash" },
        indexingPolicy: { includedPaths: [{ path: "/*" }] },
      });

    const container = containerResponse.container;

    // Query the database to retrieve data
    const querySpec = {
      query: "SELECT * FROM f WHERE f.province = @province",
    };

    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    // Return the retrieved data
    return items;
  } catch (err) {
    console.log("Error while retrieving data from the database", err);
    return [];
  }
}

export default RetrieveCrowdSource;
