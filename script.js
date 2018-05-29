//things to do:
//use .key to assign an instance to each player
//get chatbox working
//if .key under child_snapshot .ondisconnect, remove from chat and game.
//update results and choices



//firebase info

  firebase.initializeApp(config);


          let database=firebase.database();
          var connectionsRef = database.ref("/connections/info");
          let checker=false;
          let userCount;
          let player1ChoiceDiv=document.getElementById("player1ChoiceDiv");
          let player2ChoiceDiv=document.getElementById("player2ChoiceDiv");
    
$(".btn").on("click", function(){
    let nameValue=$("#nameInput").val().trim();
    let wins=0;
    let losses=0

    //turnmax=2
    let turnInitial=1
   
    var usersRef = database.ref().child("players");

    if(checker===true)
    {

        let player2key=usersRef.update({
            player2: {
              name: nameValue,
              wins: wins,
              losses:losses,
              
            },
          
          turn:turnInitial,
        });  
            $("#nameInput").val("");
    }
    else{

       usersRef.set({
          player1: {
            name: nameValue,
            wins: wins,
            losses:losses,
          }});
          $("#nameInput").val("");
checker=true;

}});


database.ref().on("value", function(snapshot) {

    let player1=snapshot.child("players").child("player1").child("name").val();
    $("#player1Name").html("").append(player1);

    let player2=snapshot.child("players").child("player2").child("name").val();
    $("#player2Name").html("").append(player2);

    let turn=snapshot.child("players").child("turn").val();
    if (turn===1)
    {
      player1ChoiceDiv.innerHTML="";
      for(let i=0; i<3;i++)
      {
        
        let rps=["Rock", "Paper", "Scissors"]
        let div=document.createElement("div");
        let button=document.createElement("button");
        button.textContent=rps[i];
        button.setAttribute("class", rps[i])
        div.appendChild(button);
        player1ChoiceDiv.appendChild(div);
      }
  
    }

    else if (turn===2)
    {
      for(let i=0; i<3;i++)
      {
        let rps=["Rock", "Paper", "Scissors"]
        let div=document.createElement("div");
        let button=document.createElement("button");
        button.textContent=rps[i];
        button.setAttribute("class", rps[i])
        div.appendChild(button);
        player2ChoiceDiv.appendChild(div);
      }
  
    }


    let player1Choice=snapshot.child("players").child("player1").child("choice").val();
    let player2Choice=snapshot.child("players").child("player2").child("choice").val();

      if(player1Choice==="Rock"&&player2Choice==="Scissors")
      {
        
      }
  });

  player1ChoiceDiv.addEventListener("click", function(event){
   
    //firebase update
    let choice=event.target.className;
    var usersRef = database.ref().child("players/player1")
    usersRef.update({
      choice:choice,
    });
    var usersTurn = database.ref().child("players")
    usersTurn.update({
      turn:2,
    })

    player1ChoiceDiv.innerHTML="";
  })

  player2ChoiceDiv.addEventListener("click", function(event){
   
    //firebase update
    let choice=event.target.className;
    var usersRef = database.ref().child("players/player2")
    usersRef.update({
      choice:choice,
    });
    var usersTurn = database.ref().child("players")
    usersTurn.update({
      turn:1,
    })
  })



