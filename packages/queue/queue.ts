import {Queue} from "bullmq";
import { QUEUE_NAME } from "./queueName";
import { redisConnection } from "../config/redis";

export const bidQueue = new Queue(QUEUE_NAME.BID, { connection: redisConnection });

