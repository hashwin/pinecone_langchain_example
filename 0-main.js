import { Pinecone } from "@pinecone-database/pinecone";
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import * as dotenv from 'dotenv';
import { createPineconeIndex } from './1-createPineconeIndex.js';
import { updatePinecone } from './2-updatePineconeIndex.js';
import { queryPineconeVectorStoreAndQueryLLM } from './3-queryPineconeAndQueryGPT.js'

dotenv.config();

const loader = new DirectoryLoader('./documents', {
  '.txt': (path) => new TextLoader(path),
  '.pdf': (path) => new PDFLoader(path)
});

const docs = await loader.load();

const question = "Which file has my pan card?";
const indexName = 'test-pinecone-index';
const vectorDimension = 1536;

const client = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT
});

(async () => {
  // await createPineconeIndex(client, indexName, vectorDimension);

  // await updatePinecone(client, indexName, docs);

  await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);
})();
