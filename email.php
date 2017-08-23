<?php
if(!isset($_POST['connectMessage']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

//Validate first
if(empty($name)||empty($visitor_email)) 
{
    echo "Name and email are mandatory!";
    exit;
}

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}

$email_from = 'apw3928@rit.edu';
$email_subject = "Website: $subject";
$email_body = "You have received a new message from the user $name.\n".
    "Here is the message:\n $message".
    
$to = "apw3928@rit.edu";
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";

// Send email
if(mail($to,$email_subject,$email_body,$headers)) {
        $status = 'ok';
} else {
        $status = 'err';
}

// Output status
echo $status;die;

// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 