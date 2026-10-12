import {Queue} from "bullmq";
import { QUEUE_NAME } from "./queueName";
import { redis as redisConnection } from "../lib/redis";

export const bidQueue = new Queue(QUEUE_NAME.BID, { connection: redisConnection });
export const databaseQueue = new Queue(QUEUE_NAME.DATABASE, { connection: redisConnection });

