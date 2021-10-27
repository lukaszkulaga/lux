<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Route as ROUTING;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class StronaUzytkownika extends AbstractController
{
    /**
     * @Route("/stronaUzytkownika", methods={"GET"})
     */
    public function stronaUzytkownikaGet() {




        return $this->render('stronaUzytkownika.html.twig', array() );

    }

    /**
     * @Route("/stronaUzytkownika", methods={"POST"})
     */
    public function stronaUzytkownikaPost() {




        return $this->redirect(parent::getParameter('baseUrl')."");

    }
}