<?php
$response = array( 'success' => false );
    $formD = file_get_contents( 'php://input' );
    $data = json_decode( $formD );
    if ( $data->submit ) {
        $name = $data->name;
        $email = $data->email;
        $subject = $data->subject;
        $message = $data->message;

        if ( $name != '' && $email != '' && $subject != '' && $message != '' ) {
            $mailTo = 'apw3928@rit.edu';
            $body  = 'From: ' . $name . "\n";
            $body .= 'Email: ' . $email . "\n";
            $body .= "Message:\n" . $message . "\n\n";

            $success = mail( $mailTo, $subject, $body );

            if ( $success ) {
                $response[ 'success' ] = true;
            }
        }
    }

    echo json_encode( $response );
?>
