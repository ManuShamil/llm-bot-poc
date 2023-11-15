import { createClient } from "redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import express from "express"

const PORT = 8000

const redisClient = createClient({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379'
})
await redisClient.connect()

const vectorStore = new RedisVectorStore( 
    new OpenAIEmbeddings(), 
    { 
        redisClient, 
        indexName: process.env.REDIS_DB_INDEX || `knowledgeBase`
    }
)

const chain = RetrievalQAChain.fromLLM( 
    new OpenAI(), 
    vectorStore.asRetriever(), 
    {
        returnSourceDocuments: true
    }
)

express()
.use( async ( req, res ) => {
    const { query } = req.query
    console.log( query )
    const result = await chain.call( { query })

    res.json( { query, result } )
})
.listen( PORT, () => console.log(`BOT RUNNING ON PORT ${PORT }`))
