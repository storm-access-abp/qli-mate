import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";

//Tente com 127.0.0.1:27017 ou localhost:27017
const client = new MongoClient("mongodb://127.0.0.1:27017/qli-mate-teste");
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  user:{
    changeEmail:{
      enabled: true
    }
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 5
  },
  socialProviders: {
    google: { 
        clientId: process.env.GOOGLE_CLIENT_ID as string, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
},
  plugins: [
    admin(),
    nextCookies()
  ],
});