<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;


class DaneKontrahentowRepository
{

    private $conn;

    public function  __construct(EntityManagerInterface $conn)
    {
        $this->conn = $conn->getConnection();
    }

    public function daneKontrahentowRepo() {

        $sql = "  select K.Nazwa, K.NIP, SP.Opis from klienci K
                left join slownikPodmiot SP 
                ON K.Podmiot = SP.IdPodmiot";

        return $this->conn->fetchAllAssociative($sql);

    }
}
