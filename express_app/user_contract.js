const abi2=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "username",
				"type": "string"
			},
			{
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"name": "vehicle",
				"type": "string"
			},
			{
				"name": "vehicleNo",
				"type": "string"
			},
			{
				"name": "category",
				"type": "string"
			},
			{
				"name": "password",
				"type": "string"
			},
			{
				"name": "key",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "username",
				"type": "string"
			}
		],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rider",
				"type": "string"
			}
		],
		"name": "getFinalBid",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "driver",
				"type": "string"
			},
			{
				"name": "rider",
				"type": "string"
			}
		],
		"name": "setFinalBid",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	}
];

const address2="0x295226f2DAE77a1c910F4Ad67C9F45BEECff25b4"; //user contract address
module.exports.abi2=abi2;
module.exports.address2=address2;

