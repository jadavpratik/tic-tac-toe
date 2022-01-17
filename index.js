//Required Variable...
var player = 1;
var click = 0;

$('.child').click(function(){
	//check player click on box which is already clicked by player.
	const isText = $(this).text();
	if(isText==""){
		//How many click is done till...
		click++;
		//Whose turn is coming?
		if(player == 1){
			$(this).text('O');
			player = 2;
		}
		else{
			$(this).text('X');
			player = 1;
		}
		//Check is anyone is winner?
		isWinner().then(function(winner){
			if(winner.player!="" && winner.id!=""){
				$('#parent')[0].children[winner.id[0]-1].style = "background-color:black;color:white";
				$('#parent')[0].children[winner.id[1]-1].style = "background-color:black;color:white";
				$('#parent')[0].children[winner.id[2]-1].style = "background-color:black;color:white";
				setTimeout(function(){
					$('#parent').addClass('d-none');
					if(winner.player=='X'){
						$('.winner_player').text('X');
						$('.won').removeClass('d-none').addClass('d-flex');
					}
					else if(winner.player=='O'){
						$('.winner_player').text('O');
						$('.won').removeClass('d-none').addClass('d-flex');
					}		
				},500);
			}
			//is gameover?
			else if(click==9 && (winner.player!='X' && winner.player!='O')){
				$('#parent').addClass('d-none');
				$('.gameover').removeClass('d-none').addClass('d-flex');
			}		
		});
		//who is winner?
	}
	else{
		swal('Already Filled','','warning');
	}

});


async function isWinner(){	
	var id1 = $('#1').text();
	var id2 = $('#2').text();
	var id3 = $('#3').text();
	var id4 = $('#4').text();
	var id5 = $('#5').text();
	var id6 = $('#6').text();
	var id7 = $('#7').text();
	var id8 = $('#8').text();
	var id9 = $('#9').text();

	//Horizontal
	if( (id1 == id2 && id2 == id3) && (id1!="" && id2!="" && id3!="") )
		return {id:[1,2,3], player:id1};	
	else if( (id4 == id5 && id5 == id6) && (id4!="" && id5!="" && id6!="") )
		return {id:[4,5,6], player:id4};	
	else if( (id7 == id8 && id8 == id9) && (id7!="" && id8!="" && id9!="") )
		return {id:[7,8,9], player:id7};	
	//Vertical
	else if( (id1 == id4 && id4 == id7) && (id1!="" && id4!="" && id7!="") )
		return {id:[1,4,7], player:id1};	
	else if( (id2 == id5 && id5 == id8) && (id2!="" && id5!="" && id8!="") )
		return {id:[2,5,8], player:id2};	
	else if( (id3 == id6 && id6 == id9) && (id3!="" && id6!="" && id9!="") )
		return {id:[3,6,9], player:id3};	
	//Cross Side...
	else if( (id1 == id5 && id5 == id9) && (id1!="" && id5!="" && id9!="") )
		return {id:[1,5,9], player:id1};	
	else if( (id3 == id5 && id5 == id7) && (id3!="" && id5!="" && id7!="") )
		return {id:[3,5,7], player:id3};			
	else return {id:'', player:''};
}	

$('.restart_btn').click(function(){
	location.reload();
});
