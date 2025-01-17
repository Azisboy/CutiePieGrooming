<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // 服务器设置
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Gmail SMTP 服务器
        $mail->SMTPAuth = true;
        $mail->Username = 'cutiepiegrooming@gmail.com'; // 发送邮件的Gmail邮箱
        $mail->Password = 'your_app_password'; // Gmail应用专用密码
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        // 收件人
        $mail->setFrom('cutiepiegrooming@gmail.com', '宠物美容店');
        $mail->addAddress('cutiepiegrooming@gmail.com');
        $mail->addReplyTo($_POST['customer-email'], $_POST['customer-name']);

        // 邮件内容
        $mail->isHTML(true);
        $mail->Subject = '新的宠物美容预约';
        
        $emailContent = "
        <h2>收到新的预约请求</h2>
        <p><strong>客户姓名：</strong>{$_POST['customer-name']}</p>
        <p><strong>联系电话：</strong>{$_POST['customer-phone']}</p>
        <p><strong>电子邮箱：</strong>{$_POST['customer-email']}</p>
        <p><strong>宠物类型：</strong>{$_POST['pet-type']}</p>
        <p><strong>服务类型：</strong>{$_POST['service-type']}</p>
        <p><strong>预约时间：</strong>{$_POST['appointment-time']}</p>
        <p><strong>备注信息：</strong>{$_POST['message']}</p>
        ";

        $mail->Body = $emailContent;
        $mail->AltBody = strip_tags($emailContent);

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => '预约信息已成功发送！我们会尽快与您联系。']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => "发送失败，请稍后重试或直接联系我们。错误信息: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => '无效的请求方法']);
}
?> 