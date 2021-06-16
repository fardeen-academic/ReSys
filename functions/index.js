const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp()
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('studentsearch');
exports.indexstudent = functions.firestore
	.document('student/{id}')
	.oncreate((snap.context)=>{
	const data = snap.data();

	return index.addObject({
	objectId,
	...data
	});

});
exports.unindexstudent = functions.firestore
.document('student/{id}')
.onDelete((snap, context)=>{
	const objectID = snap.id;
	return index.deleteObject(objectId);
});
