<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;


class DaneKontrahentowRepository
{

    private $conn;
    private $logger;

    public function  __construct(EntityManagerInterface $conn, LoggerInterface $logger)
    {
        $this->conn = $conn->getConnection();
        $this->logger = $logger;
    }

    public function daneKontrahentowRepo() {

        $sql = "  select K.IdKlienta, K.Nazwa, K.NIP, SP.Opis,SP.IdPodmiot from klienci K
                left join slownikPodmiot SP 
                ON K.Podmiot = SP.IdPodmiot";

        return $this->conn->fetchAllAssociative($sql);
    }

    public function danePodstawoweKontrahentaRepo($danePodstawoweKontrahentaArr) {

        $nazwa = $danePodstawoweKontrahentaArr['nazwa'];
        $nip = $danePodstawoweKontrahentaArr['nip'];
        $podmiot = $danePodstawoweKontrahentaArr['podmiot'];

        $sql = "insert into [klienci](Nazwa,NIP,Podmiot) values ('$nazwa','$nip','$podmiot')";

        $this->conn->fetchAllAssociative($sql);

        return $this->daneKontrahentowRepo();;
    }

    public function edytujDanePodstawoweKontrahentaRepo($danePodstawoweEdycjaArr) {

        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 1');

        $idKlienta = $danePodstawoweEdycjaArr['idKlienta'];
        $nazwa = $danePodstawoweEdycjaArr['nazwa'];
        $nip = $danePodstawoweEdycjaArr['nip'];
        $podmiot = $danePodstawoweEdycjaArr['podmiot'];


        $this->logger->info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 2');

        $sql = "UPDATE klienci
                SET Nazwa = '$nazwa',NIP ='$nip',Podmiot=$podmiot
                WHERE IdKlienta=$idKlienta";

        $this->conn->fetchAllAssociative($sql);

        return $this->daneKontrahentowRepo();
    }

    public function slownikPodmiotRepo() {

        $sql = "select * from slownikPodmiot";

        return $this->conn->fetchAllAssociative($sql);
    }

}
