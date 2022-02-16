<?php

namespace App\Repository;

use App\Entity\DaneUzytkownikaEntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class LoginRepository extends ServiceEntityRepository
{
    private $session;
    private $logger;

    public function  __construct(ManagerRegistry $managerRegistry,SessionInterface $session, LoggerInterface $logger)
    {
        parent::__construct($managerRegistry, DaneUzytkownikaEntity::class);
        $this->session = $session;
        $this->logger = $logger;
    }

    public function pobierzLoginHaslo ( $login,$haslo ) {

        $rezultat = $this->findOneBy(array( 'nazwaUzytkownika'=> $login,'haslo'=>$haslo,'statusKonta'=>1 ));

        $this->logger->info('/////////////////////////////////////// przed rezult');

        if ( $rezultat ) {

            $rola = $rezultat->getRola();
            $id = $rezultat->getIdUzytkownika();

            if ( $rola == 2 ) {

                $this->logger->info('/////////////////////////////////////// rola uzytkownika');
                //session_start();
                $this->session->start();
                $this->session->set('uzytkownik',$id);
                $this->session->set('nazwaUzytkownika',$login);

                return $rezultat;
            }
            if ( $rola == 1 ) {

                $this->logger->info('++++++++++++++++++++++++++++++++++++++ rola admina');
                //session_start();
                $this->session->start();
                $this->session->set('admin',$id);
                $this->session->set('nazwaUzytkownika',$login);

                return $rezultat;
            }
        } else {
            return false;
        }
    }



}