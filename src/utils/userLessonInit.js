// src/utils/userLessonInit.js
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, rtdb } from "../config/firebase";
import { lessons } from "../data/lessonData.js";

const userLessonInit = async (user) => {
  console.log("userLessonInit called for user:", user?.uid);
  if (!user) {
    console.log("No user provided, exiting.");
    return;
  }

  const globalLessonsRef = ref(rtdb, 'lessons');
  const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
  const userRef = ref(rtdb, `users/${user.uid}`);

  const lessonObject = lessons.reduce((acc, lesson) => {
    acc[lesson.id] = lesson;
    return acc;
  }, {});
  console.log("Converted lessonObject:", Object.keys(lessonObject));

  if (!lessonObject || Object.keys(lessonObject).length === 0) {
    console.error("lessonObject is invalid or empty. Check lessonData.js.");
    return;
  }

  try {
    // Étape 1 : Initialiser les leçons globales
    console.log("Fetching global lessons...");
    const globalSnapshot = await get(globalLessonsRef);
    let globalLessons = globalSnapshot.val() || lessonObject;
    if (Object.keys(globalLessons).length === 0) {
      console.log("No global lessons found, initializing from lessonData...");
      await set(globalLessonsRef, lessonObject);
      console.log("Global lessons initialized. Verifying...");
      const verifySnapshot = await get(globalLessonsRef);
      console.log("Verified global lessons:", verifySnapshot.val());
    } else {
      console.log("Global lessons exist, using existing data.");
    }

    // Étape 2 : Initialiser les leçons de l'utilisateur avec statut initial
    console.log("Fetching user lessons...");
    const userSnapshot = await get(userLessonsRef);
    if (!userSnapshot.exists()) {
      console.log("No user lessons found, initializing...");
      const initialUserLessons = Object.keys(lessonObject).reduce((acc, lessonId) => {
        acc[lessonId] = { ...lessonObject[lessonId], status: 'Not Started' };
        return acc;
      }, {});
      await set(userLessonsRef, initialUserLessons);
      console.log("User lessons initialized for:", user.uid);
      const verifyUserSnapshot = await get(userLessonsRef);
      console.log("Verified user lessons:", verifyUserSnapshot.val());
    } else {
      console.log("User lessons exist, syncing if needed...");
      const existingLessons = userSnapshot.val();
      const updatedLessons = Object.keys(lessonObject).reduce((acc, lessonId) => {
        acc[lessonId] = { ...lessonObject[lessonId], status: existingLessons[lessonId]?.status || 'Not Started' };
        return acc;
      }, {});
      await set(userLessonsRef, updatedLessons);
      console.log("User lessons synced for:", user.uid);
    }

    // Étape 3 : Initialiser username
    const username = user.displayName || user.email.split('@')[0];
    console.log("Setting username:", username);
    const userDataSnapshot = await get(userRef);
    if (!userDataSnapshot.exists() || !userDataSnapshot.val().username) {
      console.log("Initializing username for user:", user.uid);
      await set(userRef, { username }, { merge: true });
      console.log("Username initialized for:", user.uid);
    } else {
      console.log("Username already exists for user:", user.uid);
    }
  } catch (error) {
    console.error("Error during user lesson initialization:", error.message, error.stack);
  }
};

export const setupUserLessonInit = () => {
  console.log("Setting up user lesson initialization...");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User authenticated:", user.uid);
      await userLessonInit(user);
    } else {
      console.log("No user authenticated.");
    }
  });
};

export default userLessonInit;