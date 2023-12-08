import { createClient }  from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId:import.meta.env.VITE_REACT_APP_Project_ID,
    dataset:'production',
    apiVersion:'2023-11-07',
    useCdn:true,
    token:import.meta.env.VITE_REACT_APP_Sanity_API_KEY,
});

const builder = imageUrlBuilder(client);
export const urlFor=(source)=> builder.image(source)