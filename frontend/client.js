import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import 'dotenv/config';

export const client = SanityClient({
    projectId:`${process.env.ProjectdId}`,
    dataset:'production',
    apiVersion:'2023-11-07',
    useCdn:true,
    token:`${process.env.Sanity_API_Key}`,
});

const builder = ImageUrlBuilder(client);
export const urlFor=(source)=> builder.image(source)