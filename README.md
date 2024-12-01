### Note: First setup the [backend Laravel application](https://github.com/cmdumar/laravel-cms) before running this project.

## Steps to run the project

- Install node modules `npm install`
- Create `.env` file in project's root directory
- Copy contents of `.env.example` to `.env`
- Make sure to run `docker network create app_network` if not already while setting up the Laravel app
- Run the development server `docker-compose up --build` to start the project

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Routes

#### Public routes
- Homepage with created pages - `http://localhost:3000/`
- Media page - `http://localhost:3000/media/`
- Specific page - `http://localhost:3000/[id]/` (after creating a page)

#### Admin Routes
- Dashboard - `http://localhost:3000/dashboard`
- Login - `http://localhost:3000/auth/login`
- Signup - `http://localhost:3000/auth/register`
- Add pages - `http://localhost:3000/dashboard/pages`
- Add images - `http://localhost:3000/dashboard/media`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
