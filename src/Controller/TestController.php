<?php

namespace App\Controller;

     
use App\Service\TestService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

//use Psr\Log\LoggerInterface;
//use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpFoundation\JsonResponse;
//use Symfony\Component\Validator\Constraints\Json;
//use Doctrine\DBAL\Driver\Connection;
//use Doctrine\ORM\EntityManagerInterface;
//use Doctrine\Persistence\ManagerRegistry;
//use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
//use Symfony\Component\Validator\Validator\ValidatorInterface;
//use Doctrine\ORM\Mapping as ORM;
//use Symfony\Component\Validator\Constraints as Assert;
//use Doctrine\ORM\EntityRepository;
//use LogicException;

use App\Entity\Test;

class TestController extends AbstractController
{

    private $testService;

    public function  __construct(TestService $testService) {

        $this->testService = $testService;
    }


    /**
     * @Route("/first/page", methods={"GET"})
     */
    public function myFirstPageEverGet() {

        $this->testService->testService('cyc');

        $dupa = "cyc111";

      return $this->render('test.html.twig', array('dupa'=>$dupa) );

    }


    /**
     * @Route("first/page", methods={"POST"})
     */
    public function myFirstPageEverPost( Request $request ):Response {

        $a = $request->request->get('ajaj');

        $this->testService->testService($a);

        return $this->render('test.html.twig', array() );

    }
}












?>