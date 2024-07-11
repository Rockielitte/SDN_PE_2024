import mongoose from 'mongoose';
import AppConfig from './AppConfig';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    await mongoose.connect(AppConfig.MONGO_DB_URI);
    console.log(chalk.blue('Successfully connected to DB'));
  } catch (error) {
    console.error(chalk.red('Could not connect to DB', error));
    process.exit(1);
  }
};
export default connectDB;
