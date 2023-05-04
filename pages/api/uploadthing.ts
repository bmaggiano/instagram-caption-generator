/** pages/api/uploadthing.ts */
import { createNextPageApiHandler } from "uploadthing/server";
import { ourFileRouter } from "../../server/uploadthing";

 
const handler = createNextPageApiHandler({
  router: ourFileRouter,
});
 
export default handler;