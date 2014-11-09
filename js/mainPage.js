var people = [{name: 'Patrick', description: 'This is Patricks description', img: 'http://upload.wikimedia.org/wikipedia/en/7/7e/Patrick_Star.png'},
{name: 'Sam', description: 'This is Sam description', img: 'http://upload.wikimedia.org/wikipedia/en/7/7e/Patrick_Star.png'},
];


function setUpHtml(name) {

	// first, find the person by their name in the people data object

	for(var i=0; i<100; i++)
	$( "canvas" ).hide();
	$( "#main" ).show();
		$( "canvas" ).show();
	$( "#name" ).text(name);


}

function startOver() {
	$( "#main" ).hide();
	$( "canvas" ).show();
}



