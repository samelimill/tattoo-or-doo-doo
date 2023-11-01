const sequelize = require('../config/connection');
const key = process.env.IMGBB_API_KEY;

function convertDataURIToBinary(dataURI) {
	var BASE64_MARKER = ';base64,';
	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));

	for(i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
};

const postImage = async (e) => {
    const imgURI = convertDataURIToBinary(e.target);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

document.querySelector('imgInput').addEventListener('submit', console.log('e')),

module.exports = postImage();