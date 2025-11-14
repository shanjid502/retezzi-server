// import mongoose from 'mongoose';
// import app from './app';
// import config from './app/config';

// async function main() {
//   try {
//     const connection = await mongoose.connect(config.database_url!);
//     if (connection) {
//       console.info('Database connection established');
//     } else {
//       console.error('DB connection failed');
//     }
//     // await seedAdmin();

//     app.listen(config.port, () => {
//       console.info(`app listening on port ${config.port}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();

import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function bootstrap() {
  try {
    // Ensure database URL exists
    if (!config.database_url) {
      throw new Error('❌ DATABASE_URL is missing in environment variables');
    }

    console.info('⏳ Connecting to MongoDB...');

    await mongoose.connect(config.database_url);
    console.info('✅ Database connection established successfully');

    // Start server
    app.listen(config.port, () => {
      console.info(`🚀 Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);

    // Exit with failure
    process.exit(1);
  }

  // Graceful shutdown for production
  process.on('SIGINT', async () => {
    console.info('\n🔻 Server shutting down...');

    await mongoose.connection.close();
    console.info('🔌 Database connection closed');

    process.exit(0);
  });
}

bootstrap();
