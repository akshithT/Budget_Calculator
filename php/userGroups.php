<?php
// this would allow cross origin requests from your react development server
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin');

include "./dbconfig.php";
$request_method = $_SERVER['REQUEST_METHOD'];
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the userID parameter from the URL
    $userID = $_GET['userID'];
  
    // Create a prepared statement to retrieve the groups for a given user
    $cmd = 'SELECT g.id, g.groupName, g.groupType, g.groupBudget FROM MyGroup g INNER JOIN User_Group ug ON g.id = ug.groupId WHERE ug.userId = ?';
    $stmt = $conn->prepare($cmd);
    $stmt->bind_param("i", $userID);
  
    // Execute the query and fetch the results
    if ($stmt->execute()) {
      $result = $stmt->get_result();
      $groups = array();
      while ($row = $result->fetch_assoc()) {
        $groups[] = $row;
      }
      echo json_encode($groups);
    } else {
      $error = "Unable to retrieve user groups";
      echo json_encode(["error" => $error]);
    }
  }