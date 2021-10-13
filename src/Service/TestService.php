<?php

namespace App\Service;

use App\Entity\Test;
use App\Repository\TestRepository;

class TestService
{
    private $testRepository;

    public function  __construct( TestRepository $testRepository ) {
     $this->testRepository = $testRepository;
    }

    public function testService( $imie ) {

        $test = new Test();
        $test->setImie( $imie );

        $this->testRepository->testRepo( $test );
    }
}