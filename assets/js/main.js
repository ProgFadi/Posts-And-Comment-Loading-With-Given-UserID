$(document).ready(function () {
	
	// first i wanna from you to know that the returned object will be as following : 
	/*
	{
  "userData": {
    "userID": "",
    "posts": [
      {
        "postID": "1",
        "title": "sss",
        "body": "ddddddd",
        "comments": [
          {
            "commentID": "1",
            "name": "ee",
            "email": "z@eee",
            "body": "qqqqq"
          },
          {
            "commentID": "2",
            "name": "",
            "email": "",
            "body": ""
          },
          {
            "commentID": "3",
            "name": "",
            "email": "",
            "body": ""
          }
        ]
      }
	  
	  ,
	  
	   {
        "postID": "",
        "title": "",
        "body": "",
        "comments": [
          {
            "commentID": "",
            "name": "",
            "email": "",
            "body": ""
          },
          {
            "commentID": "",
            "name": "",
            "email": "",
            "body": ""
          },
          {
            "commentID": "",
            "name": "",
            "email": "",
            "body": ""
          }
        ]
      }
    ]
  }
}
	
	*/
    //ready to start
    // variable to hold fetched data from posts api
    var postsObject;
    var commentsObject;


    const ERROR_1 = "There are no posts to be fetched!";

	// declare baseic structure of the final returned object data (userid with posts with their comments)
    var finalJson2 = {
  "userData": 
    {
		  "userId": ""
    ,
    
      "posts": [
       
     
      ]
		
	}
    
    
  
};
    //   start loading the all data and passing userid
    loadAllData(1);

   
    // function to load all data - posts and comments- from api
    function loadAllData(userID)
    {
		// first init json with userid as key
        finalJson2.userData.userid = userID;
        // console.log("userID is : " + finalJson2.userData.userid);
        // reset booleans each request
      
        // first load posts object
        $.get("https://jsonplaceholder.typicode.com/posts", function (data, status) {
            //check if the status is success then go to assign posts object to postsObject var and then start loading the comments
            if (status == "success")
            {

                postsObject = data;
                //now check if there are posts  then go to load comments
                if (postsObject.length > 0)
                {
					
					// load comment with $.get method
                    $.get("https://jsonplaceholder.typicode.com/comments", function (data2, status2) {

						// if there are comments response ok
                        if (status2 == "success")
                        {
							// update the comments object
                            commentsObject = data2;
							// check if the comments object data length more than zero
                            if (commentsObject.length > 0)
                            {
                                // make a final json object userid with his posts with their comments
								// filtering the json objects data with passed userID
                                makeUserPostsCommentsJson(userID);
                            }


                        }
                    });
                }

            } else {
              
                console.log(ERROR_1); // assume ERROR_1 is a const
            }

        });
    } // end function of loading data



    function makeUserPostsCommentsJson(userID)
    {

        console.log('there are posts data');
		// iterate through posts ojject
        $.each(postsObject, function (postIndex, postData) {
            if (postData.userId == userID)
            {
				// declare new json post object
				var postObj={};
				// update the properties of the object
				postObj.postID=postData.id;
				postObj.title=postData.title;
				postObj.body=postData.body;
				postObj.comments=[];
				// now push the object to the array as new post
				finalJson2.userData.posts.push(postObj);
				// iterate through the comments to join them with post object
				 $.each(commentsObject, function (commentIndex, commentData) {
					
					
                    if (postData.id==commentData.postId)
                    {
						// decalare comment object 
						 var commentObj={};
						
                        // update the comment object with fetched data from server
						commentObj.commentID=commentData.id;
						commentObj.name=commentData.name;
						commentObj.email=commentData.email;
						commentObj.body=commentData.body;
						
						// push the new comment object to the post object
						finalJson2.userData.posts[postIndex].comments.push(commentObj);
						console.log("post["+postIndex+"] have comment"+commentIndex);
                    }

                });
				console.log("comments of postID->"+postData.id+" are : "+finalJson2.userData.posts[postIndex].comments.length);
              
				
            }

        });
	
		console.log("size of posts is : "+JSON.stringify(finalJson2));
		

    }
});