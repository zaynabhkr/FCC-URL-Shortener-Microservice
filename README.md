# URL Shortener Microservice

# Features

## POST URL:
You can POST a URL to /api/shorturl and receive a JSON response containing the original_url and short_url properties.

## Redirect by Short URL:
When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.

## Invalid URL Handling:
If you submit an invalid URL that doesn't follow the valid http://www.example.com format, you will receive a JSON response with the following structure:
