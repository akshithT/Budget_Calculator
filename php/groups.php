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

    $cmd = "INSERT INTO MyGroup (groupName, groupType, groupBudget) 
        VALUES (?, ?, ?)";
       $stmt = $conn->prepare($cmd);
       $stmt->bind_param("sss", $json['grpName'], $json['grpType'],$json['grpBudget']);
       if ($stmt->execute()) {
            //get the last inserted id
      $groupId = $conn->insert_id;
    //   echo $groupId;
    //   echo "New group inserted succesfully";
            // Loop through the grpUser array and extract the id values
        foreach ($json['grpUser'] as $user) {
            $id = $user['id'];
            // echo "User ID: $id<br>";
            $sql = "INSERT INTO User_Group (userId, groupId) VALUES ('$id', '$groupId')";
            if (mysqli_query($conn, $sql)) {
                
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
        }  
        $group_query = "SELECT * FROM MyGroup" ;
        $group_result = $conn->query($group_query);
        $groups = array();
        while ($row = $group_result->fetch_assoc()) {
            $groups[] = $row;
        }
        echo json_encode($groups);
         
        
       }
       else {
        $error = "Unable to add group";
        echo json_encode(["error" => $error]);
      }
}