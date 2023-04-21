<?php
// this would allow cross origin requests from your react development server
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin');

include "./dbconfig.php";
$request_method = $_SERVER['REQUEST_METHOD'];
if($request_method == 'POST') {
    // Get the json from post body of the request
    $post = trim(file_get_contents("php://input"));
    $json = json_decode($post, true);
 
    // Insert expense into Expense table
    $cmd = "INSERT INTO Expense (expName, expAmt, expPaidBy, expGrp) 
            VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($cmd);
    $stmt->bind_param("sdsd", $json['expName'], $json['expAmt'], 
                      $json['expPaidBy'], $json['expGrp']['id']);
    if ($stmt->execute()) {
       // Get the last inserted expense id
       $expId = $conn->insert_id;
 
       // Loop through the usrSplitBtw array and insert into Expense_User table
       foreach ($json['usrSplitBtw'] as $user) {
          $userId = $user['id'];
          $cmd = "INSERT INTO Expense_User (expId, userId) VALUES (?, ?)";
          $stmt = $conn->prepare($cmd);
          $stmt->bind_param("dd", $expId, $userId);
          $stmt->execute();
       }
 
       // Insert final split into FinalSplit table
       $cmd = "INSERT INTO FinalSplit (finalPayTo, finalPayBy, finalAmt, expId) 
               VALUES (?, ?, ?, ?)";
       $stmt = $conn->prepare($cmd);
       $stmt->bind_param("sddd", $json['expPaidBy'], $json['expPaidBy'], 
                         $json['expAmt'], $expId);
       $stmt->execute();
 
       // Return success response
       echo json_encode(["message" => "Expense added successfully"]);
    }
    else {
       $error = "Unable to add expense";
       echo json_encode(["error" => $error]);
    }
 }
 