import { db } from "@/config/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const saveUserToFirestore = (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.id);

    getDoc(userRef)
        .then((docSnap) => {
            if (!docSnap.exists()) {
                setDoc(userRef, {
                    uid: user.id,
                    name: user.fullName || user.username,
                    requests: 10,
                    email: user.primaryEmailAddress?.emailAddress,
                    joinedAt: new Date(),
                })
                    .catch((error) => {
                        console.error("Error storing user:", error);
                    });
            }
        })
        .catch((error) => {
            console.error("Error fetching user:", error);
        });
};
