import { connect } from "mongoose";

const URL: string = "mongodb://localhost:27017/cronjob";

export const dbConfig = async () => {
  try {
    await connect(URL).then(() => {
      console.log("database connected successfully..!🚀");
    });
  } catch (error) {
    return error;
  }
};
