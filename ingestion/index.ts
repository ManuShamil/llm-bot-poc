import { createClient } from "redis";
import { RedisVectorStore } from "langchain/vectorstores/redis";

import { NotionLoader } from "langchain/document_loaders/fs/notion";

import { remark } from "remark";
import stripMD from "strip-markdown";
import { Document } from "langchain/document";

import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

if ( !process.env.REFRESH_DB ) {
    console.log(`REFRESH_DB is not set. Skipping ingestion.`)
    process.exit(0)
}
  
const loader = new NotionLoader("../docs")
const docs = await loader.load()

const transformContent = async (doc: Document) => {
    const plainText = await remark().use(stripMD).process(doc.pageContent);
    return {
        ...doc,
        pageContent: String(plainText.value)
    }
}

//! convert markdown to plain text
const plainTextDocs = [];
for (const doc of docs) {
    const transformedDoc = await transformContent(doc);
    plainTextDocs.push(transformedDoc);
}


//! split plain text into chunks
const textSplitter = new CharacterTextSplitter( { chunkSize: 1000, chunkOverlap: 0 } )
const docChunks = await textSplitter.splitDocuments(plainTextDocs);

const redisClient = createClient({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379'
})
await redisClient.connect()

//! drop index before ingestion to avoid duplicates
const droppedIndex = await new RedisVectorStore( new OpenAIEmbeddings(), { 
    redisClient,
    indexName: process.env.REDIS_DB_INDEX || `knowledgeBase`
}).dropIndex(true)

console.log(`Dropped Index: ${droppedIndex}`)
//process.exit(0)

//! rebuild a redis vector store with the above documents
await RedisVectorStore.fromDocuments(
    docChunks,
    new OpenAIEmbeddings(),
    {
        redisClient,
        indexName: process.env.REDIS_DB_INDEX || `knowledgeBase`
    }
)

await redisClient.quit()

console.log(`Documents Ingestion Completed.`)