<?php
// this would allow cross origin requests from your react development server
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin');

include "./dbconfig.php";
$request_method = $_SERVER['REQUEST_METHOD'];
if($request_method == 'POST') {
   //  Get the json from post body of the request
   $post = trim(file_get_contents("php://input"));
   $json = json_decode($post, true);
      //  Create Prepared Statement for adding a new User record in the database.
    
    $cmd = 'INSERT INTO User (username,email, password) VALUES (?, ?, ?)';
    $stmt = $conn->prepare($cmd);
    $stmt->bind_param("sss", $json['username'], $json['email'],$json['password']);
    if ($stmt->execute()) {
      //get the last inserted id
      $userId = $conn->insert_id;
      //get the user details based on id  
      $user_query = "SELECT * FROM User WHERE userId = $userId";
      $user_result = $conn->query($user_query);
      $user = $user_result->fetch_assoc();
      session_start();
      $_SESSION['userId'] = $user['userId'];
      echo  json_encode($user);
  } else {
    $error = "Unable to Register user";
    echo json_encode(["error" => $error]);
  }
  
}

