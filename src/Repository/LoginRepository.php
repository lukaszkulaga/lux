<?php

namespace App\Repository;

use App\Entity\DaneUzytkownikaEntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class LoginRepository extends ServiceEntityRepository
{
    private $session;

    public function  __construct(ManagerRegistry $managerRegistry,SessionInterface $session)
    {
        parent::__construct($managerRegistry, DaneUzytkownikaEntity::class);
        $this->session = $session;
    }

    public function pobierzLoginHaslo ( $login,$haslo ){

        $rezultat = $this->findOneBy(array( 'nazwaUzytkownika'=> $login,'haslo'=>$haslo ));

        if ($rezultat) {

            $rola = $rezultat->getRola();

            if ($rola == "uzytkownik"){

                session_start();
                $this->session->set('uzytkownik',$login);

                return true;
            }

        } else {
            return false;
        }
    }


}