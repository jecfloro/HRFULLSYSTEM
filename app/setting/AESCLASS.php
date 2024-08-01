<?php

class secureToken
{
    private static $secretKey = '$2y$12$c7mgCRtmzfZ7IhX9ItelD.zPUnBkF3zpaBEcSPuQMCnQfl/uX4lXi';
    private static $secretIv = 'rmci.com.ph';
    private static $encryptMethod = "AES-256-CBC";
    public static function tokenencrypt($data)
    {
        $key = hash('sha256', self::$secretKey);
        $iv = substr(hash('sha256', self::$secretIv), 0, 16);
        $result = openssl_encrypt($data, self::$encryptMethod, $key, 0, $iv);
        return $result =  base64_encode($result);
    }
    public static function tokendecrypt($data)
    {
        $key = hash('sha256', self::$secretKey);
        $iv = substr(hash('sha256', self::$secretIv), 0, 16);
        $result = openssl_decrypt(base64_decode($data), self::$encryptMethod, $key, 0, $iv);
        return $result;
    }
}

?>