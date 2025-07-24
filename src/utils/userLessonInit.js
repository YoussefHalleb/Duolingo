import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, rtdb } from "../config/firebase";

const initializeUserLessons = (user) => {
  if (user) {
    const globalLessonsRef = ref(rtdb, 'lessons');
    console.log("Attempting to fetch global lessons for user:", user.uid);
    get(globalLessonsRef)
      .then((snapshot) => {
        const globalLessons = snapshot.val() || {};
        console.log("Global lessons data:", globalLessons);
        if (Object.keys(globalLessons).length === 0) {
          console.error("No lessons found in 'lessons' reference. Please ensure data exists.");
          return;
        }
        const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
        const userTerminatedLessonsRef = ref(rtdb, `users/${user.uid}/terminatedLessons`);
        get(userLessonsRef)
          .then((userSnapshot) => {
            if (!userSnapshot.exists()) {
              console.log("No user lessons found, initializing for user:", user.uid);
              set(userLessonsRef, globalLessons)
                .then(() => {
                  console.log("Lessons successfully set:", globalLessons);
                  const initialTerminatedLessons = Object.keys(globalLessons).reduce((acc, lessonId) => {
                    acc[lessonId] = { progress: 0, startedAt: null, lastUpdated: null };
                    return acc;
                  }, {});
                  console.log("Initializing terminatedLessons:", initialTerminatedLessons);
                  set(userTerminatedLessonsRef, initialTerminatedLessons)
                    .then(() => {
                      set(ref(rtdb, `users/${user.uid}`), {
                        username: user.displayName || user.email.split('@')[0]
                      }, { merge: true })
                        .then(() => console.log(`Username, lessons, and terminatedLessons initialized for user ${user.uid}`))
                        .catch((error) => console.error('Error initializing username:', error.message));
                    })
                    .catch((error) => console.error('Error initializing terminatedLessons:', error.message));
                })
                .catch((error) => console.error('Error initializing lessons:', error.message));
            } else {
              console.log("Lessons already exist for user:", user.uid);
            }
          })
          .catch((error) => console.error('Error checking user lessons:', error.message));
      })
      .catch((error) => console.error('Error fetching global lessons:', error.message));
  }
};

export const setupUserLessonInit = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userLessonsRef = ref(rtdb, `users/${user.uid}/lessons`);
      console.log("Checking lesson initialization for user:", user.uid);
      get(userLessonsRef)
        .then((snapshot) => {
          if (!snapshot.exists()) {
            console.log("No lessons found, initializing for user:", user.uid);
            initializeUserLessons(user);
          } else {
            console.log("Lessons already initialized for user:", user.uid);
          }
        })
        .catch((error) => console.error('Error checking lesson initialization:', error.message));
    }
  });
};

export default initializeUserLessons;