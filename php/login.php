<?php
// this would allow cross origin requests from your react development server
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin');

include "./dbconfig.php";
$request_method = $_SERVER['REQUEST_METHOD'];
if($request_method == 'POST') {

  $data = json_decode(file_get_contents("php://input"));
  $email = $data->email;
  $password = $data->password;
    // get user data from mysql database
    // create a query to get users from user table
    $query = "SELECT * FROM User WHERE email = ? AND password = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result(); 
    if ($result->num_rows > 0) {
      //get the user details
      $user = $result->fetch_assoc();
      session_start();
      $_SESSION['userId'] = $user['userId'];
      echo json_encode($user);
      // Create a session for the logged in user.
     } else {
      $error = "Invalid email or password";
      echo json_encode(["error" => $error]);
     } 
    
}

if ($request_method == 'GET') {
  //  query to get all users from user table
  $query = "SELECT * FROM User";
  $result = $conn->query($query);
  $users = array();
  while ($row = $result->fetch_assoc()) {
    $users[] = $row;
  }
  echo json_encode($users);
}


