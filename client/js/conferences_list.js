let is_sort_by_date = true

$("document").ready(homePageIsReady);

    function homePageIsReady() {
    
        // get and show all artists
        get_conferences();
    
        // add artist click listener --> open the form
        $(".add_conf").click(function(e) {
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
    
            // open the modal
            span.onclick = function() {
                modal.style.display = "none";
            }
            modal.style.display = "block";
    
           
    
            // client-side form validation of the inputes
            // formValidation();/**/ 
            // process the form
            $("#conference_form").submit(function(event) {
                // if (!$("#conference_form").valid()) return;
                // get the variables from the form fileds
                var details = getFormVariables();
                console.log("details1");
                console.log(details);
                addConference(details);
            });
        });
    //--------------------------------------------------------
    // select button ---> show the list of conference in selected order
    //--------------------------------------------------------
    $(".select").change((e)=> {
        
        console.log(e.target.value);
       
        if (e.target.value ==="name"){
            console.log("uhuih");
            is_sort_by_date = false;
        }else{
            is_sort_by_date = true;
        }
        document.getElementById("conference_form").reset(); //reset the form
            get_conferences(); 
      });;
    }
    
    //--------------------------------------------------------
    // client-side validation of the form fields
    //--------------------------------------------------------
    function formValidation() {
        $("form[name='conference_form']").validate({
            rules: {
                id_field: {
                    required: true,
                    digits: true
                },
                date: {
                    required: true,
                    digits: true,
                    maxlength: 10,
                    minlength: 10
                },
                name:{
                    required: true
                },
                img_url:{
                    required: true
                },
                director:{
                    required: true
                },
                isSeries:{
                    required: true
                },
                series_number:
                {
                    digits: true
                }
            },
            // Specify validation error messages
            messages: {
                field_id: "Please enter only digits",
                date:"Please enter only digits"
            }
        });
    }
    
    //--------------------------------------------------------
    // get all the fileds values (artist details)
    //--------------------------------------------------------
    function getFormVariables() {
        return [$("#id_field").val(),
            $("#name").val(),
            $("#img_url").val(),
            $("#director").val(),
            $("#date").val(),
            $("#isSeries").val(),
            $("#series_number").val()
        ]
    }

    function getFormVariables_add_lecture(e) {
        if(($("#lecturer_website"+ e.target.id).val()) !=null)
        {
            return [$("#in"+ e.target.id).val(),
            $("#photo_of_a_lecturer"+ e.target.id).val(),
            $("#lecturer_website"+ e.target.id).val()
        ]
        }
        else{
            return [$("#in"+ e.target.id).val(),
            $("#photo_of_a_lecturer"+ e.target.id).val()
        ]
        }
      
    }
    
    //--------------------------------------------------------
    // send the artist detailes to the related function in the server-side
    //--------------------------------------------------------
    
    function addConference(artistDetails) {
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/conferences', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "id": artistDetails[0],
                "name": artistDetails[1],
                "logo_picture": artistDetails[2],
                "director": artistDetails[3],
                "date": artistDetails[4],
                "isSeries":artistDetails[5],
                "series_number": artistDetails[6]
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                 location.href = "/list";
                document.getElementById("conference_form").reset(); //reset the form
                get_conferences(); //TODO uncomment
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        event.preventDefault();
    }
   
    //--------------------------------------------------------
    // send GET request to get the artists list (sorted)
    //--------------------------------------------------------
    function get_conferences() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3001/conferences',
            success: function(data) {
                show_conferences(data);
            },
            error: function(data) {
                alert(data);
            }
        });
    }
    
    //--------------------------------------------------------
    // send DELETE request to delete an conference
    //--------------------------------------------------------
    function delConference(e) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3001/conferences/' + e.target.id,
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                
                get_conferences();
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
    
    //--------------------------------------------------------
    // send POST request to add lecture to an conference
    //--------------------------------------------------------
    function add_lecture(lectureDetails,e) {
        console.log("add_lecture");
if(lectureDetails[2]!=null)
{
    
}
        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: 'conferences/lecture/' + e.target.id, // the url where we want to POST
            contentType: 'application/json',
                data: JSON.stringify({
                "name": lectureDetails[0],
                "picture": lectureDetails[1],
                 "site": lectureDetails[2]
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                console.log(lectureDetails[0]); 
                document.getElementById("conference_form").reset(); //reset the form
                get_conferences(); //TODO uncomment
            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(lectureDetails[0]);  
                console.log("error")
                alert(errorThrown);
            }
        });
    }
    
    //--------------------------------------------------------
    // send DELETE request to delete lecture of an conference
    //--------------------------------------------------------
    function delLecture(e) {
        var lectureName = e.target.name
        console.log(e.target.name);
        var artist_id = song_id.substr(0, song_id.indexOf("d"));
        var song_id = song_id.substr(song_id.indexOf("l") + 1, song_id.length);
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3001/songs/' + artist_id,
            dataType: 'text',
            data: song_id,
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                console.log(data);
                get_artists();
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
    
    //-------------------------------------------------------
// get lectures
    //-------------------------------------------------
    function getLectures(e){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3001/conferences',
            success: function(data) {
                console.log(data);
                showLectures(e,data);
            },
            error: function(data) {
                alert(data);
            }
        });
    }
               function showLectures(e,data){
                console.log(data);
                // if this is the confernces field --> need another table
                for (val in data) {
                    if(val===e.target.id){
                    // add table, and generic buttons for each artist
                    var mylist = $("<table></table>");
                    mylist.append("<br>");
                    mylist.append($("<tr></tr>"));
                    for (i in data[val]) {
                        mylist.append($("<tr></tr>"));

                            mylist.append($("<tr></tr>"));
                    
                // if this is the confernces field --> need another table
                 if (typeof(data[val][i])==='object' && data[val][i] !== null) {
                    var lectures = $("<table></table>");
                    for (j in data[val][i]) {
                        lectures.append($("<tr></tr>"));
                        lectures.append($("<td></td>").text(data[val][i][j].name));
                        lectures.append($("<tr></tr>"));
                        lectures.append($("<td></td>"));
                        lectures.append('<img src="' + (data[val][i][j].picture + '">'));
                        lectures.append($("<tr></tr>"));
                        if(data[val][i][j].site)
                        {
                            lectures.append($("<td></td>").text(data[val][i][j].site));
                          
                        }
                        lectures.append($("<td></td>"));
                        var button = $('<input class="deletebtn" id="' + data[val].id + "del" + j + '" type="button" value="delete">');
                        lectures.append(button);
                    }
                    lectures.appendTo(mylist);
                    continue;
                }
                // else --> append the field and value
               
            }
            // add space between artists
            mylist.append($("<tr></tr>"));
            mylist.append("<br>");
            mylist.appendTo($("#div"+e.target.id));
        }
    }
    }
    //--------------------------------------------------------
    // the front-end side --> show the list, add buttons & listeners
    //--------------------------------------------------------
    function show_conferences(data) {
        $("table").remove(); // remove the previous elements
        console.log(is_sort_by_date)
        if(is_sort_by_date){
            data = sort_by_date(data);
        }
        else{
            data = sort_by_name(data);
        }
        for (val in data) {
            // add table, and generic buttons for each artist
            var mylist = $("<table></table>");
            mylist.append("<br>");
            mylist.append($("<tr></tr>"));
            var button1 = $('<input class="delart" id="' + data[val].id + '" type="button" value="delete conference">');
            mylist.append(button1);
            var button3 = $('<input class="viewLecture" id="' + data[val].id + '" type="button" value="view lecture">');
            mylist.append(button3);
            var button2 = $('<input class="addLecture" id="' + data[val].id + '" type="button" value="add lecture">');
            mylist.append(button2); 
            var input = $('<input class="in" id="in' + data[val].id + '" type="input" placeholder="lecture name...">');
            mylist.append(input);
            mylist.append($("<tr></tr>"));
            var input2 = $('<input class="in" id="photo_of_a_lecturer' + data[val].id + '" type="input" placeholder="Photo of a lecturer...">');
            mylist.append(input2);
            mylist.append($("<tr></tr>"));
            var input3 = $('<input class="in" id="lecturer_website' + data[val].id + '" type="input" placeholder="lecturer website...">');
            mylist.append(input3);
            var button4 = $('<input class="submit_add_lecture" id="' + data[val].id + '" type="button" value="submit">');
            mylist.append(button4);
            mylist.append($("<tr></tr>"));
            var div = $('<div class="div" id="div' + data[val].id + '" type="button" value="lecture list:">');
            mylist.append(div);
             for (i in data[val]) {

                mylist.append($("<tr></tr>"));
                    if(i=="isSeries")
                    {
                        if(data[val][i]==="true")
                        {
                            mylist.append($("<th></th>").text("series"));
                            Object.keys(data[val]).map((key, index) => {
                                if(key==="series_number")
                            mylist.append($("<td></td>").text(data[val][key]));
                        }).join(' ')
                        break;
                        }
                    }
                else{
                    mylist.append($("<th></th>").text(i));
                }
              
    
                if (data[val][i] == data[val].logo_picture) {
                    mylist.append('<img src="' + data[val][i] + '">');
                    continue;
                }
                if(i=="isSeries")
                    {
                       break;
                    }
                    else{
                        mylist.append($("<td></td>").text(data[val][i]));/**/
                    }
               
            }
            // add space between artists
            mylist.append($("<tr></tr>"));
            mylist.append("<br>");
            mylist.append("<div id = 'lecturesList'></div>");
            mylist.appendTo($("#conferences_list"));
            $("#in"+data[val].id).hide();
            $("#photo_of_a_lecturer"+data[val].id).hide();
            $("#lecturer_website"+data[val].id).hide();
            $(".submit_add_lecture").hide();
        }
    
        // add event listeners
        $(".delart").click(function(e) {
            delConference(e);
        });
        $(".submit_add_lecture").click(function(e) {
            console.log("submit_add_lecture");
            $("#in"+e.target.id).hide();
            $("#photo_of_a_lecturer"+e.target.id).hide();
            $("#lecturer_website"+e.target.id).hide();
            $(".submit_add_lecture").hide();
            if ($("#in" + e.target.id).val() == '')
            {
                console.log("return");
                return;
            } 
            var details1 = getFormVariables_add_lecture(e);
            console.log("details1");
            console.log(details1);
            add_lecture(details1,e);
            // modal.style.display = "none";
        });

        $(".addLecture").click(function(e) {
            console.log("hide");
            $("#in"+e.target.id).show();
            $("#photo_of_a_lecturer"+e.target.id).show();
            $("#lecturer_website"+e.target.id).show();
            $(".submit_add_lecture").show();
            console.log("addLecture click");
        });
        $(".viewLecture").click(function(e) {
            getLectures(e);
        });
        $(".deletebtn").click(function(e) {
            console.log("deletebtn");
            delLecture(e);
        });
    }
    function sort_by_date(data){
        const sortedDataByDate = Object.values(data).sort((a, b) => {
            return  new Date(b.date).getTime() - new Date(a.date).getTime()
        });
        console.log(sortedDataByDate);
        return sortedDataByDate;
    }
     function sort_by_name(data){
        const sortedDataByName = Object.values(data).sort((a, b) => {
            return ('' + a.name).localeCompare(b.name)
                     })

        console.log(sortedDataByName);
        return sortedDataByName;
     }
    


