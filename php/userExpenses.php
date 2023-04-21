<?php
// this would allow cross origin requests from your react development server
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin');

include "./dbconfig.php";
$request_method = $_SERVER['REQUEST_METHOD'];
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the userID parameter from the URL
    $userID = $_GET['userID'];
  
    // Create a prepared statement to retrieve the expenses for a given user
    $cmd = 'SELECT e.expId, e.expName, e.expAmt, e.expPaidBy, e.expGrp, fs.finalPayTo, fs.finalPayBy, fs.finalAmt FROM Expense e INNER JOIN Expense_User eu ON e.expId = eu.expId INNER JOIN FinalSplit fs ON e.expId = fs.expId WHERE eu.userId = ?';
    $stmt = $conn->prepare($cmd);
    $stmt->bind_param("i", $userID);
  
    // Execute the query and fetch the results
    if ($stmt->execute()) {
      $result = $stmt->get_result();
      $expenses = array();
      while ($row = $result->fetch_assoc()) {
        $expenses[] = $row;
      }
      echo json_encode($expenses);
    } else {
      $error = "Unable to retrieve user expenses";
      echo json_encode(["error" => $error]);
    }
  }
