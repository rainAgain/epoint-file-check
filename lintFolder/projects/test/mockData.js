
Mock.mock('test/flowData', {
	"pid": 2,
	"data": {
		  "class": "go.GraphLinksModel",
		  "nodeDataArray": [ 
		{"id":"1", "category":"", "name":"百度", "icon":"1", "type":"1", "key":-1, "url":"./test/test.html", "loc":"0 121"},
		{"id":"3", "category":"", "name":"名字很长名字很长名", "icon":"3", "type":"", "key":-3, "url":"./test/test.html", "loc":"0 238.99999999999994"},
		{"id":"2", "category":"", "name":"谷歌", "icon":"2", "type":"", "key":-2, "url":"./test/test.html", "loc":"0 376", "info":{"name":"谷歌", "other":"其他信息"}},
		{"id":3, "category":"", "name":"Jose", "icon":"1", "url":"./test/test.html", "type":0, "key":123, "loc":"-432 61", "info":"{\"name\":\"Jose\",\"other\":\"1111\"}"},
		{"id":4, "category":"", "name":"Deborah", "icon":"3", "url":"./test/test.html", "type":0, "key":124, "loc":"-596.0000000000003 301", "info":"{\"name\":\"Deborah\",\"other\":\"1111\"}"}
	 ],
	  "linkDataArray": [ 
		{"from":-1, "to":-3, "points":[71,141,71,151,71,179.99999999999997,71,179.99999999999997,71,208.99999999999994,71,218.99999999999994]},
		{"from":-3, "to":-2, "points":[71,258.99999999999994,71,268.99999999999994,71,307.5,71,307.5,71,346,71,356]},
		{"from":123, "to":124,  "points":[-361,81,-361,91,-361,182,-606,182,-606,301,-596,301]}
	 ]
	}
});

Mock.mock('test/nodeList', {
	"list|25": [
		{ 
			id: "@increment()",
			category: '',	//分类，默认为空
			name: '@first()',	//
			"icon|1": ['1',"2","3","4"],
			url:'./test/test.html',	//跳转地址
			"type|1": [0]	//0 表示有右键菜单，1则无
		}
	]
});

Mock.mock('test/saveFlow', {
	code: 200
});



Mock.mock('test/templateData', {
	"data|5-20": [
		{
			templateguid: '@guid()',
			templatename: '@ctitle()'
		}
	]
});


Mock.mock('test/tempDetail', {
	"data": {
		"class": "go.GraphLinksModel",
		"nodeDataArray": [ 
			{"id":"1", "category":"", "name":"百度", "icon":"1", "type":"", "key":-1, "url":"./test/test.html", "loc":"0 121"},
			{"id":"3", "category":"", "name":"名字很长名字很长名", "icon":"3", "type":"", "key":-3, "url":"./test/test.html", "loc":"0 238.99999999999994"},
			{"id":"2", "category":"", "name":"谷歌", "icon":"2", "type":"", "key":-2, "url":"./test/test.html", "loc":"0 376", "info":{"name":"谷歌", "other":"其他信息"}},
			{"id":3, "category":"", "name":"Jose", "icon":"1", "url":"./test/test.html", "type":0, "key":123, "loc":"-432 61", "info":"{\"name\":\"Jose\",\"other\":\"1111\"}"},
			{"id":4, "category":"", "name":"Deborah", "icon":"3", "url":"./test/test.html", "type":0, "key":124, "loc":"-596.0000000000003 301", "info":"{\"name\":\"Deborah\",\"other\":\"1111\"}"}
		],
		"linkDataArray": [ 
			{"from":-1, "to":-3, "points":[71,141,71,151,71,179.99999999999997,71,179.99999999999997,71,208.99999999999994,71,218.99999999999994]},
			{"from":-3, "to":-2, "points":[71,258.99999999999994,71,268.99999999999994,71,307.5,71,307.5,71,346,71,356]},
			{"from":123, "to":124,  "points":[-361,81,-361,91,-361,182,-606,182,-606,301,-596,301]}
		]
	}
});

Mock.mock('test/saveTempData', {
	"data": {

	},
	"code": 200
});