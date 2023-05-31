import type { NextApiRequest, NextApiResponse } from "next";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "../../server/api/root";
import { env } from "~/env.mjs";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send(
    renderTrpcPanel(appRouter, {
      url: env.PANEL_URL ? env.PANEL_URL : "http://localhost:3000/api/trpc",
      transformer: "superjson",
    })
  );
}
