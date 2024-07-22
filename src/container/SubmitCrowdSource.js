import { CosmosClient } from "@azure/cosmos";

async function SubmitCrowdSource(item) {
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

    const containerDefinition = {
      id: containerName,
      partitionKey: { paths: ["/province"], kind: "Hash" },
      indexingPolicy: { includedPaths: [{ path: "/*" }] },
    };

    const { container } =
      await databaseResponse.database.containers.createIfNotExists(
        containerDefinition
      );

    container.items
      .upsert(item)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Write to db failed", error.message);
      });
  } catch (err) {
    console.log(err);
  }
}

export default SubmitCrowdSource;
