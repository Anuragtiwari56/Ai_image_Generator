import 'dotenv/config';
import { createError } from '../error.js';

export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;  // Get the prompt from the request body
        const page = 1;  // You can set the page to whichever you want
        const perPage = 1;  // Number of images to retrieve, you can adjust this as needed
        // Construct the Unsplash API URL with the prompt and API key
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(prompt)}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=${perPage}`;

        // Fetch the image data from Unsplash API
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Extract the first image from the results
            const image = data.results[0];
            // return res.status(200).json({
            //     image: image.urls.regular,  // Return the regular image URL

            // });
            // console.log(image)

            // If no images found, send a 404 response
            if (!image) {
                return res.status(404).json({
                    message: 'No images found for the provided prompt',
                });
            }

            // Respond with the image URL
            return res.status(200).json({
                photo: image.urls.full,  // Full-sized image URL
                description: image.description || image.alt_description,  // Image description
                photographer: image.user.name,  // Photographer's name
                profile_link: image.user.links.html  // Photographer's profile link
            });
        } else {
            throw new Error(data.errors ? data.errors.join(', ') : 'Error fetching images from Unsplash');
        }
    } catch (error) {
        // Error handling
        next(createError(error.status || 500, error.message));
    }
};
