/** @format */

import { initializeApp } from "firebase/app";
import {getFirestore } from "@firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyC8JOjgCBsdFtp2QbE1xuP2B9nGXFgmU4I",
	authDomain: "crud-cdd87.firebaseapp.com",
	projectId: "crud-cdd87",
	storageBucket: "crud-cdd87.appspot.com",
	messagingSenderId: "1000345877721",
	appId: "1:1000345877721:web:528ae813840ff2bddad2c8",
	measurementId: "G-C30T7QJ1JT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);