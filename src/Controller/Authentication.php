<?php

namespace App\Controller;
use PHPUnit\Framework\TestCase;

class Authentication extends TestCase
{
    public function testAuthentication() {

        $testAuthentication = new UserAuthentication();
        $result = $testAuthentication->checkAuthentication('abc','1234');

        $this->assertEmpty(!$result);
    }
}








