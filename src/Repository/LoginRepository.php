<?php

namespace App\Repository;

use App\Entity\DaneUzytkownikaEntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class LoginRepository extends ServiceEntityRepository
{
    public function  __construct(ManagerRegistry $managerRegistry)
    {
        parent::__construct($managerRegistry, DaneUzytkownikaEntity::class);
    }

    public function pobierzLoginHaslo ( $login,$haslo ){

        $rezultat = $this->findOneBy(array( 'nazwaUzytkownika'=> $login,'haslo'=>$haslo ));

        if ($rezultat) {
            return true;
        } else {
            return false;
        }
    }


}