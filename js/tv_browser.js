// API Docs at:
// http://www.tvmaze.com/api
// var url = 'somePage.html'; //A local page

function responseHandler (result){
// var responseHandler = function(){
//     console.log("show");
    // console.log("response text", this.responseText);
  
    var response = JSON.parse(result);//parses unreadable data into JSON format
    console.log(response );
  
    for (var i = 0; i < response.length; i++){//looping through all the results in the JSON array to search for matches
    var option = document.createElement("option");//linking it to html so it shows up 
        option.text = response[i].show.name;
        option.value = i;
        var select = document.getElementById("show-select");//"show-select" being the id of the drop down menu
        select.appendChild(option);//append option into the drop down list 1: Identify the element 2; Assign it to a var 3: then append childChild to display the info from the child nodes 
        // var showDetail = document.createElement('p');
        // showDetail.setAttribute("id","show-"+i);//setting it dynamically "show-" + i
        // showDetail.innerText = response[i].show.summary;// to show a brief summary of the first set of results
        // document.body.appendChild( showDetail );
    }
    var selectBox = document.getElementById("show-select");//add change listener , changes description to show that's driven by selection in the box
    selectBox.addEventListener("change", function() {
       document.getElementById("show-detail").innerHTML = response[selectBox.value].show.summary;
    });

}; 
  
  function showSearch (){
   
  var showSearch = document.getElementById("show-search").value;// on click function on HTML, gets value from text box and performs the XML request
    console.log( "USER INPUT:"  + showSearch)
   

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {// onreadystatechange keeps calling over and over again only when the if state ie the condition is true; need for the state to be done ie condition of if function = true
        if (request.readyState == XMLHttpRequest.DONE) {// we are checking for the request's current state, asynchornous calls
            responseHandler(request.responseText);//once the state is ready, we are calling the response handler function
        }
    }
 
    var url = "http://api.tvmaze.com/search/shows?q="+showSearch;
  
    request.open("GET", url);

    request.send();
  }