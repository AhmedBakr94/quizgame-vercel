import { db } from '/js/config.js';

export async function getUserData(uid) {
    const snapshot = await db.ref(`users/${uid}`).once('value');
    return snapshot.val();
}

export async function updateUserPoints(uid, points) {
    await db.ref(`users/${uid}/points`).transaction(current => (current || 0) + points);
}

export async function logActivity(activityType, data) {
    const logRef = db.ref('activities').push();
    await logRef.set({
        type: activityType,
        data: data,
        timestamp: new Date().toISOString()
    });
}
