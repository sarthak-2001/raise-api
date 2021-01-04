const express = require("express");

const app = express();

let port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded());

app.post('/name',(req,res)=>{
	let conversationData = req.body.conversationData;
	conversationData.previousIntent = conversationData.queryResult.intent.displayName;
	responseObject = [
		{
			Status: "Success",
			StatusCode: 200,
			Message: "Response fetched successfully",
			Data: [
				{
					conditions: [
						{
							conditionType: "noAuth",
							conditionValue: [],
						},
					],
					replaceMentValues: [
					],
				},
			],
		},
	];
	return ({conversationData, responseObject});
})

app.post("/issue", (req, res) => {
	console.log(req.body);
	let conversationData = req.body.conversationData;
	conversationData.previousIntent = conversationData.queryResult.intent.displayName;
	console.log("temp");
	let intentName = conversationData.queryResult.intent.displayName;
	intentName = intentName.toLowerCase();
	let entityName = conversationData.queryResult.parameters.fields[intentName].listValue.values[0].stringValue;
	console.log(entityName);
	// conversationData.previousIntent = intentName;
	if (conversationData.freeText !== "" && conversationData.freeText !== undefined) {
		let userMsg = conversationData.freeText;
		let category = conversationData.category;
		let subcat = conversationData.subcat;
		conversationData.freeText = conversationData.category = conversationData.subcat = "";
		let issueSession = 0;
		if (conversationData.issue) issueSession = conversationData.issue;

		issueSession = issueSession + 1;
		conversationData.issue = issueSession;
		responseObject = [
			{
				Status: "Success",
				StatusCode: 200,
				Message: "Response fetched successfully",
				Data: [
					{
						conditions: [
							{
								conditionType: "confirmation",
								conditionValue: [1, 2, 3],
							},
						],
						replaceMentValues: [
							{
								replaceKey: "$subcategory",
								position: "message",

								replaceIn: "message",
								replaceValue: subcat, //
							},
							{
								replaceKey: "$category",
								position: "message",

								replaceIn: "message",
								replaceValue: category, //
							},
							{
								replaceKey: "$usermsg",
								position: "message",

								replaceIn: "message",
								replaceValue: userMsg, //
							},
							{
								replaceKey: "$num",
								position: "message",

								replaceIn: "message",
								replaceValue: issueSession, //
							},
						],
					},
				],
			},
		];
	} else
		responseObject = [
			{
				Status: "Success",
				StatusCode: 200,
				Message: "Response fetched successfully",
				Data: [
					{
						conditions: [
							{
								conditionType: "issue",
								conditionValue: [],
							},
						],
						replaceMentValues: [],
					},
				],
			},
		];
	console.log("trigger");
	res.send({ responseObject, conversationData });
});

app.post("/catissue", (req, res) => {
	console.log("herereererere");
	let conversationData = req.body.conversationData;
	let intentName = conversationData.queryResult.intent.displayName;
	conversationData.previousIntent = intentName;
	console.log(conversationData);
	let category = conversationData.queryResult.parameters.fields[intentName].listValue.values[0].stringValue;
	conversationData.category = category;
	let pqrSubcat;
	if (category === "cleaning") {
		pqrSubcat = [
			{
				text: "tap",
				value: "tap",
			},
			{ text: "kitchen", value: "kitchen" },
		];
	} else {
		pqrSubcat = [
			{
				text: "geyser",
				value: "geyser",
			},
			{ text: "fan", value: "fan" },
		];
	}
	responseObject = [
		{
			Status: "Success",
			StatusCode: 200,
			Message: "Response fetched successfully",
			Data: [
				{
					conditions: [
						{
							conditionType: "catissue",
							conditionValue: [1, 2, 3],
						},
					],
					replaceMentValues: [
						{
							position: "QuickReply",
							replaceValue: pqrSubcat,
						},
						{
							replaceKey: "$category",
							replaceIn: "message",
							replaceValue: category,
						},
					],
				},
			],
		},
	];
	console.log("trigger 1");
	res.send({ responseObject, conversationData });
});

app.post("/subcatissue", (req, res) => {
	let conversationData = req.body.conversationData;
	let intentName = conversationData.queryResult.intent.displayName;
	intentName = intentName.toLowerCase();
	conversationData.previousIntent = intentName;
	let category = conversationData.category;
	let subcat = conversationData.queryResult.parameters.fields[intentName].listValue.values[0].stringValue;
	conversationData.subcat = subcat;
	// let issueSession = 0;
	// if (conversationData.issue) issueSession = conversationData.issue;

	// issueSession = issueSession+1;
	// conversationData.category = "";
	// conversationData.issue = issueSession;

	// conversationData.isFreeText = true;
	conversationData.intentFromAPI = "issue";
	responseObject = [
		{
			Status: "Success",
			StatusCode: 200,
			Message: "Response fetched successfully",
			Data: [
				{
					conditions: [
						{
							conditionType: "subcatissue",
							conditionValue: [1, 2, 3],
						},
					],
					replaceMentValues: [
						{
							replaceKey: "$subcategory",
							position: "message",

							replaceIn: "message",
							replaceValue: subcat, //
						},
						// {
						//     replaceKey: "$category",
						//     position: "message",

						//     replaceIn: "message",
						//     replaceValue: category, //
						// },
						// {
						//     replaceKey: "$num",
						//     position: "message",

						//     replaceIn: "message",
						//     replaceValue: issueSession, //
						// },
					],
				},
			],
		},
	];
	console.log("trigger");
	res.send({ responseObject, conversationData });
});

app.post("/yes", (req, res) => {
	let conversationData = req.body.conversationData;
	let previousIntent = conversationData.previousIntent;
	let responseObject = [];
	if (previousIntent === "issue") {
		responseObject = [
			{
				Status: "Success",
				StatusCode: 200,
				Message: "Response fetched successfully",
				Data: [
					{
						conditions: [
							{
								conditionType: "yes1",
								conditionValue: [],
							},
						],
						replaceMentValues: [],
					},
				],
			},
		];
	} else if (previousIntent === "category") {
		responseObject = [
			{
				Status: "Success",
				StatusCode: 200,
				Message: "Response fetched successfully",
				Data: [
					{
						conditions: [
							{
								conditionType: "yes",
								conditionValue: [],
							},
						],
						replaceMentValues: [],
					},
				],
			},
		];
	} else if (previousIntent === "subcategory") {
		responseObject = [
			{
				Status: "Success",
				StatusCode: 200,
				Message: "Response fetched successfully",
				Data: [
					{
						conditions: [
							{
								conditionType: "yes",
								conditionValue: [],
							},
						],
						replaceMentValues: [],
					},
				],
			},
		];
	}

	res.send({ responseObject, conversationData });
});

app.listen(port, () => {
	console.log(`at ${port}`);
});
// subcategory
