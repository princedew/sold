import { Worker, type Job } from "bullmq";
import { redisConnection } from "../../../packages/config/redis";
import { QUEUE_NAME } from "../../../packages/queue/queueName";
import { JOB_NAME } from "../../../packages/queue/jobNames";
import { registry } from "./main";

export default function redisWorkerForRealtimeServices() {
  const worker = new Worker(
    QUEUE_NAME.BID,
    async (job: Job) => {
      if (job.name === JOB_NAME.UPDATE_BID_IN_UI) {
        for (const ws of registry.values()) {
          ws.send(JSON.stringify(job.data));
        }
      }
    },
    { connection: redisConnection },
  );
  worker.on("completed", (job) => {
    console.log(`Job ${job.id} Completed`);
  });
  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} error:`, err);
  });
}
