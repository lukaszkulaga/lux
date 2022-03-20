<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

use App\Entity\ZgloszeniaEntity;
use App\Entity\ZgloszeniaEntity_hist;
use Doctrine\Persistence\ManagerRegistry;


use App\Entity\DaneUzytkownikaEntity;
use Symfony\Component\HttpFoundation\Session\SessionInterface;


class ZgloszeniaRepository extends ServiceEntityRepository
{

    private $conn;
    private $logger;
    private $session;

    public function  __construct(ManagerRegistry $managerRegistry,EntityManagerInterface $conn, LoggerInterface $logger,
                                 SessionInterface $session)
    {
        parent::__construct($managerRegistry, ZgloszeniaEntity::class);
        $this->conn = $conn->getConnection();
        $this->logger = $logger;
        $this->session = $session;
    }

    public function zgloszeniaRepo() {

        $this->logger->info('???????????????????????   serwis');

        $zgloszeniaSQL = "select distinct Z.IdZgloszenia,Z.IdKlienta, K.Nazwa,Z.IdAdres,cast(Z.DataDodania As Date) as DataDodania,
            Z.PlanowanaRealizacjaOd, Z.PlanowanaRealizacjaDo, Z.GodzinaOd, Z.GodzinaDo, Z.DokladnaLokalizacja, Z.Opis, 
            SK.Opis AS Kategoria, SK.IdKategoria, SP.Opis AS Priorytet,SP.IdPriorytet, SS.Opis AS Status, SS.IdStatus,
            [dbo].[wykonawca] (Z.IdZgloszenia) as Wykonawca,

			 PlanowanaRealizacja = 
			CASE
				WHEN (Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '' and Z.GodzinaOd != '' and Z.GodzinaDo != '' ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd = '' or Z.PlanowanaRealizacjaDo = '') and (Z.GodzinaOd != '' and Z.GodzinaDo != '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' and Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' or Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd,Z.GodzinaDo ) 
				ELSE  CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
			END,
			Adres = 
            CASE
                WHEN (Z.DokladnaLokalizacja != '') THEN CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '/', Z.DokladnaLokalizacja)            
                ELSE CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '', Z.DokladnaLokalizacja)
            END

              from zgloszenia Z
              left join klienci K
              on Z.IdKlienta = K.IdKlienta
              left join klienciAdres KA
              on Z.IdAdres = KA.IdAdres
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
              left join slownikKategoria SK
              on Z.Kategoria = SK.IdKategoria
              left join slownikPriorytet SP
              on Z.Priorytet = SP.IdPriorytet
              left join slownikStatus SS
              on Z.Status = SS.IdStatus where SS.Opis != 'Zrealizowano' and SS.Opis != 'Odrzucono'";
        $zloszeniaArr = $this->conn->fetchAllAssociative($zgloszeniaSQL);

        return $zloszeniaArr;
    }

    public function slownikKlienciRepo() {

        $this->logger->info('???????????????????????   serwis');

        $klienciSQL = "select IdKlienta,Nazwa from klienci";
        $klienciArr = $this->conn->fetchAllAssociative($klienciSQL);

        return $klienciArr;
    }

    public function slownikKategoriaRepo() {

        $this->logger->info('???????????????????????   serwis');

        $kategoriaSQL = "select IdKategoria,Opis from slownikKategoria";
        $kategoriaArr = $this->conn->fetchAllAssociative($kategoriaSQL);

        return $kategoriaArr;
    }

    public function slownikPriorytetRepo() {

        $this->logger->info('???????????????????????   serwis');

        $priorytetSQL = "select IdPriorytet,Opis from slownikPriorytet";
        $priorytetArr = $this->conn->fetchAllAssociative($priorytetSQL);

        return $priorytetArr;
    }

    public function slownikStatusRepo() {

        $this->logger->info('???????????????????????   serwis');

        $statusSQL = "select IdStatus,Opis from slownikStatus";
        $statusArr = $this->conn->fetchAllAssociative($statusSQL);

        return $statusArr;
    }

    public function slownikAdresRepo($adresSlownikArr) {

        $this->logger->info('???????????????????????   serwis');

        $idKlienta = $adresSlownikArr['idKlienta'];

        $adresSQL = "select KA.IdAdres,CONCAT( KA.Ulica, ' ',KA.NrBudynku) AS Adres from klienciAdres KA where IdKlienta = $idKlienta ";

        $adresArr = $this->conn->fetchAllAssociative($adresSQL);

        return $adresArr;
    }

    public function listaWykonawcowRepo() {

        $this->logger->info('???????????????????????   serwis');

        $listaWykonawcowSQL = "select DU.IdUzytkownika,CONCAT( DU.Imie, ' ',DU.Nazwisko) AS Wykonawca from daneUzytkownika DU where Rola = 2";
        $listaWykonawcowArr = $this->conn->fetchAllAssociative($listaWykonawcowSQL);

        return $listaWykonawcowArr;
    }

    public function zapiszZgloszenieRepo($zgloszenieArr) {

        $this->logger->info('???????????????????????   serwis');

        $idKlienta = $zgloszenieArr['idKlienta'];
        $idAdres = $zgloszenieArr['idAdres'];
        $kategoriaDodaj = $zgloszenieArr['kategoriaDodaj'];
        $nrLokaluDodaj = $zgloszenieArr['nrLokaluDodaj'];
        $terminOdDodaj = $zgloszenieArr['terminOdDodaj'];
        $terminDoDodaj = $zgloszenieArr['terminDoDodaj'];
        $godzinaOdDodaj = $zgloszenieArr['godzinaOdDodaj'];
        $godzinaDoDodaj = $zgloszenieArr['godzinaDoDodaj'];
        $opisDodaj = $zgloszenieArr['opisDodaj'];
        $priorytetDodaj = $zgloszenieArr['priorytetDodaj'];


        $zgloszenie = new ZgloszeniaEntity();

        if($idKlienta === '') {
            $zgloszenie->setIdKlienta(null);
        }else{
            $zgloszenie->setIdKlienta($idKlienta);
        }

        if($idAdres === ''){
            $zgloszenie->setIdAdres(null);
        } else {
            $zgloszenie->setIdAdres($idAdres);
        }

        if($kategoriaDodaj === ''){
            $zgloszenie->setKategoria(null);
        } else {
            $zgloszenie->setKategoria($kategoriaDodaj);
        }

        if($priorytetDodaj === ''){
            $zgloszenie->setPriorytet(null);
        } else {
            $zgloszenie->setPriorytet($priorytetDodaj);
        }

        $zgloszenie->setDokladnaLokalizacja($nrLokaluDodaj);
        $zgloszenie->setPlanowanaRealizacjaOd($terminOdDodaj);
        $zgloszenie->setPlanowanaRealizacjaDo($terminDoDodaj);
        $zgloszenie->setGodzinaOd($godzinaOdDodaj);
        $zgloszenie->setGodzinaDo($godzinaDoDodaj);
        $zgloszenie->setOpis($opisDodaj);
        $zgloszenie->setStatus(1);
        $zgloszenie->setDataDodania(new \DateTime());
        $zgloszenie->setDataModyfikacji(new \DateTime());
        $zgloszenie->setUser($this->session->get('nazwaUzytkownika'));

        $this->getEntityManager()->persist($zgloszenie);
        $this->getEntityManager()->flush();

        $idZgloszenia = $zgloszenie->getIdZgloszenia();


        $listaWykonawcowArr = $zgloszenieArr['listaWykonawcow'];

        if($listaWykonawcowArr !== ''){

            foreach($listaWykonawcowArr as $idUzytkownika){

                $sql = "insert into zgloszeniaWykonawca(IdUzytkownika,IdZgloszenia) values ($idUzytkownika,$idZgloszenia)";
                $this->conn->fetchAllAssociative($sql);
            }
        }

        $tabZapiszRepo = ['zgloszeniaRepo'=>$this->zgloszeniaRepo(),'idZgloszeniaRepo'=>$idZgloszenia];

      return  $tabZapiszRepo;
    }

    public function zapiszPlikRepo($sciezka,$IdZgloszenia) {

        $this->logger->info('???????????????????????   serwis');

        $sql = "insert into zgloszeniaZalaczniki (Sciezka,IdZgloszenia) values ('$sciezka',$IdZgloszenia) ";

        $this->conn->fetchAllAssociative($sql);

        return $sciezka;
    }

    public function listaZgloszenRepo($zgloszeniaArr) {

        $this->logger->info('???????????????????????   serwis');

        $idZgloszenia = $zgloszeniaArr['IdZgloszeniaTab'];

        $zgloszeniaSQL = "select distinct Z.IdZgloszenia,Z.IdKlienta, K.Nazwa,Z.IdAdres,cast(Z.DataDodania As Date) as DataDodania,
            Z.PlanowanaRealizacjaOd, Z.PlanowanaRealizacjaDo, Z.GodzinaOd, Z.GodzinaDo, Z.DokladnaLokalizacja, Z.Opis, 
            SK.Opis AS Kategoria, SK.IdKategoria, SP.Opis AS Priorytet,SP.IdPriorytet, SS.Opis AS Status, SS.IdStatus,
            [dbo].[wykonawca] (Z.IdZgloszenia) as Wykonawca,

			 PlanowanaRealizacja = 
			CASE
				WHEN (Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '' and Z.GodzinaOd != '' and Z.GodzinaDo != '' ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd = '' or Z.PlanowanaRealizacjaDo = '') and (Z.GodzinaOd != '' and Z.GodzinaDo != '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' and Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' or Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd,Z.GodzinaDo ) 
				ELSE  CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
			END,
			Adres = 
            CASE
                WHEN (Z.DokladnaLokalizacja != '') THEN CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '/', Z.DokladnaLokalizacja)            
                ELSE CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '', Z.DokladnaLokalizacja)
            END
  
              from zgloszenia Z
              left join klienci K
              on Z.IdKlienta = K.IdKlienta
              left join klienciAdres KA
              on Z.IdAdres = KA.IdAdres
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
              left join slownikKategoria SK
              on Z.Kategoria = SK.IdKategoria
              left join slownikPriorytet SP
              on Z.Priorytet = SP.IdPriorytet
              left join slownikStatus SS
              on Z.Status = SS.IdStatus where Z.IdZgloszenia = $idZgloszenia and SS.Opis != 'Zrealizowano' and SS.Opis != 'Odrzucono' ";
        $zloszeniaArr = $this->conn->fetchAllAssociative($zgloszeniaSQL);

        return $zloszeniaArr;
    }

    public function wykonawcaRepo($zgloszeniaArr) {

        $this->logger->info('???????????????????????   serwis');

        $idZgloszenia = $zgloszeniaArr['IdZgloszeniaTab'];

        $listaWykonawcowSQL = "select ZW.IdZgloszeniaWykonawca, ZW.IdUzytkownika,DU.Imie,DU.Nazwisko,CONCAT( DU.Imie, ' ',DU.Nazwisko) AS Wykonawca
              from zgloszenia Z
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
			  where Z.IdZgloszenia = $idZgloszenia";
        $listaWykonawcowArr = $this->conn->fetchAllAssociative($listaWykonawcowSQL);

        return $listaWykonawcowArr;
    }

    public function edytujZgloszenieRepo($zgloszenieArr) {

        $this->logger->info('???????????????????????   serwis');

        $idZgloszenia = $zgloszenieArr['idZgloszenia'];
        $idKlienta = $zgloszenieArr['idKlienta'];
        $idAdres = $zgloszenieArr['idAdres'];
        $kategoriaEdytuj = $zgloszenieArr['kategoriaEdytuj'];
        $nrLokaluEdytuj = $zgloszenieArr['nrLokaluEdytuj'];
        $terminOdEdytuj = $zgloszenieArr['terminOdEdytuj'];
        $terminDoEdytuj = $zgloszenieArr['terminDoEdytuj'];
        $godzinaOdEdytuj = $zgloszenieArr['godzinaOdEdytuj'];
        $godzinaDoEdytuj = $zgloszenieArr['godzinaDoEdytuj'];
        $statusEdytuj = $zgloszenieArr['statusEdytuj'];
        $opisEdytuj = $zgloszenieArr['opisEdytuj'];
        $priorytetEdytuj = $zgloszenieArr['priorytetEdytuj'];


        $zgloszenie = $this->findOneBy(array( 'idZgloszenia'=>$idZgloszenia ));


        $zgloszenie_hist = new ZgloszeniaEntity_hist();

        if($idZgloszenia === '') {
            $zgloszenie_hist->setIdZgloszenia(null);
        }else{
            $zgloszenie_hist->setIdZgloszenia($zgloszenie->getIdZgloszenia());
        }

        if($idKlienta === '') {
            $zgloszenie_hist->setIdKlienta(null);
        }else{
            $zgloszenie_hist->setIdKlienta($zgloszenie->getIdKlienta());
        }

        if($idAdres === ''){
            $zgloszenie_hist->setIdAdres(null);
        } else {
            $zgloszenie_hist->setIdAdres($zgloszenie->getIdAdres());
        }

        if($kategoriaEdytuj === ''){
            $zgloszenie_hist->setKategoria(null);
        } else {
            $zgloszenie_hist->setKategoria($zgloszenie->getKategoria());
        }

        if($priorytetEdytuj === ''){
            $zgloszenie_hist->setPriorytet(null);
        } else {
            $zgloszenie_hist->setPriorytet($zgloszenie->getPriorytet());
        }

        $zgloszenie_hist->setDokladnaLokalizacja($zgloszenie->getDokladnaLokalizacja());
        $zgloszenie_hist->setPlanowanaRealizacjaOd($zgloszenie->getPlanowanaRealizacjaOd());
        $zgloszenie_hist->setPlanowanaRealizacjaDo($zgloszenie->getPlanowanaRealizacjaDo());
        $zgloszenie_hist->setGodzinaOd($zgloszenie->getGodzinaOd());
        $zgloszenie_hist->setGodzinaDo($zgloszenie->getGodzinaDo());
        $zgloszenie_hist->setOpis($zgloszenie->getOpis());
        $zgloszenie_hist->setStatus($zgloszenie->getStatus());
        $zgloszenie_hist->setDataDodania(new \DateTime());
        $zgloszenie_hist->setDataModyfikacji(new \DateTime());
        $zgloszenie_hist->setUser($this->session->get('nazwaUzytkownika'));

        $this->getEntityManager()->persist($zgloszenie_hist);
        $this->getEntityManager()->flush();



        if($idKlienta === '') {
            $zgloszenie->setIdKlienta(null);
        }else{
            $zgloszenie->setIdKlienta($idKlienta);
        }

        if($idAdres === ''){
            $zgloszenie->setIdAdres(null);
        } else {
            $zgloszenie->setIdAdres($idAdres);
        }

        if($kategoriaEdytuj === ''){
            $zgloszenie->setKategoria(null);
        } else {
            $zgloszenie->setKategoria($kategoriaEdytuj);
        }

        if($priorytetEdytuj === ''){
            $zgloszenie->setPriorytet(null);
        } else {
            $zgloszenie->setPriorytet($priorytetEdytuj);
        }

        if($statusEdytuj === ''){
            $zgloszenie->setStatus(null);
        } else {
            $zgloszenie->setStatus($statusEdytuj);
        }

        $zgloszenie->setDokladnaLokalizacja($nrLokaluEdytuj);
        $zgloszenie->setPlanowanaRealizacjaOd($terminOdEdytuj);
        $zgloszenie->setPlanowanaRealizacjaDo($terminDoEdytuj);
        $zgloszenie->setGodzinaOd($godzinaOdEdytuj);
        $zgloszenie->setGodzinaDo($godzinaDoEdytuj);
        $zgloszenie->setOpis($opisEdytuj);
        $zgloszenie->setDataDodania(new \DateTime());
        $zgloszenie->setDataModyfikacji(new \DateTime());
        $zgloszenie->setUser($this->session->get('nazwaUzytkownika'));

        $this->getEntityManager()->persist($zgloszenie);
        $this->getEntityManager()->flush();

        $idZgloszenia = $zgloszenie->getIdZgloszenia();

        $sql1 = "delete from zgloszeniaWykonawca where IdZgloszenia = $idZgloszenia";
        $this->conn->fetchAllAssociative($sql1);

        $listaWykonawcowArr = $zgloszenieArr['listaWykonawcow'];

        if($listaWykonawcowArr !== ''){

            foreach($listaWykonawcowArr as $idUzytkownika){

//                $sql2 = "select IdUzytkownika from zgloszeniaWykonawca where IdUzytkownika = $idUzytkownika";
//                $czyWystepujeUzytkownik =  $this->conn->fetchAllAssociative($sql2);

//                // chodzi o to żeby nie dało sie dodac dwóch takich samych uzytkowników do jednego zgłoszenia
//                if(count($czyWystepujeUzytkownik) == 0){
                    $sql3 = "insert into zgloszeniaWykonawca(IdUzytkownika,IdZgloszenia) values ($idUzytkownika,$idZgloszenia)";
                    $this->conn->fetchAllAssociative($sql3);
//                }

            }
        }

        return $this->zgloszeniaRepo();
    }

    public function filtrujZgloszeniaRepo($zgloszenieArr) {

        $this->logger->info('???????????????????????   serwis');

        $nrZgloszeniaFiltr = $zgloszenieArr['nrZgloszeniaFiltr'];
        $dataDodaniaOdFiltr = $zgloszenieArr['dataDodaniaOdFiltr'];
        $dataDodaniaDoFiltr = $zgloszenieArr['dataDodaniaDoFiltr'];
        $planowanaRealizacjaFiltr = $zgloszenieArr['planowanaRealizacjaFiltr'];
        $adresFiltr = $zgloszenieArr['adresFiltr'];
        $klientFiltr = $zgloszenieArr['klientFiltr'];
        $wykonawcaFiltr = $zgloszenieArr['wykonawcaFiltr'];
        $kategoriaFiltr = $zgloszenieArr['kategoriaFiltr'];
        $priorytetFiltr = $zgloszenieArr['priorytetFiltr'];
        $statusFiltr = $zgloszenieArr['statusFiltr'];


        $zgloszeniaSQL = "select distinct Z.IdZgloszenia,Z.IdKlienta, K.Nazwa,Z.IdAdres,cast(Z.DataDodania As Date) as DataDodania,
            Z.PlanowanaRealizacjaOd, Z.PlanowanaRealizacjaDo, Z.GodzinaOd, Z.GodzinaDo, Z.DokladnaLokalizacja, Z.Opis, 
            SK.Opis AS Kategoria, SK.IdKategoria, SP.Opis AS Priorytet,SP.IdPriorytet, SS.Opis AS Status, SS.IdStatus,
            [dbo].[wykonawca] (Z.IdZgloszenia) as Wykonawca,DU.Imie,DU.Nazwisko,

			 PlanowanaRealizacja = 
			CASE
				WHEN (Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '' and Z.GodzinaOd != '' and Z.GodzinaDo != '' ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd = '' or Z.PlanowanaRealizacjaDo = '') and (Z.GodzinaOd != '' and Z.GodzinaDo != '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' and Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' or Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd,Z.GodzinaDo ) 
				ELSE  CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
			END,
			Adres = 
            CASE
                WHEN (Z.DokladnaLokalizacja != '') THEN CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '/', Z.DokladnaLokalizacja)            
                ELSE CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '', Z.DokladnaLokalizacja)
            END

              from zgloszenia Z
              left join klienci K
              on Z.IdKlienta = K.IdKlienta
              left join klienciAdres KA
              on Z.IdAdres = KA.IdAdres
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
              left join slownikKategoria SK
              on Z.Kategoria = SK.IdKategoria
              left join slownikPriorytet SP
              on Z.Priorytet = SP.IdPriorytet
              left join slownikStatus SS
              on Z.Status = SS.IdStatus where Z.IdZgloszenia is not null and SS.Opis != 'Zrealizowano' and SS.Opis != 'Odrzucono' ";

        if (!empty($nrZgloszeniaFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (Z.IdZgloszenia like '%$nrZgloszeniaFiltr%') ";
        }
        if (!empty($planowanaRealizacjaFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (Z.PlanowanaRealizacjaOd like '%$planowanaRealizacjaFiltr%'
            or Z.PlanowanaRealizacjaDo like '%$planowanaRealizacjaFiltr%') ";
        }
        if (!empty($adresFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (KA.Miejscowosc like '%$adresFiltr%' or KA.Ulica like '%$adresFiltr%'
            or KA.NrBudynku like '%$adresFiltr%' or Z.DokladnaLokalizacja like '%$adresFiltr%') ";
        }
        if (!empty($klientFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (K.Nazwa like '%$klientFiltr%') ";
        }
        if (!empty($wykonawcaFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (DU.Imie like '%$wykonawcaFiltr%' or DU.Nazwisko like '%$wykonawcaFiltr%') ";
        }
        if (!empty($kategoriaFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (SK.Opis like '%$kategoriaFiltr%') ";
        }
        if (!empty($priorytetFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (SP.Opis like '%$priorytetFiltr%') ";
        }
        if (!empty($statusFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (SS.Opis like '%$statusFiltr%') ";
        }
        if (!empty($dataDodaniaOdFiltr) && !empty($dataDodaniaDoFiltr) ){
            $zgloszeniaSQL = $zgloszeniaSQL." and (cast(Z.DataDodania As Date) >= '$dataDodaniaOdFiltr' and cast(Z.DataDodania As Date) <= '$dataDodaniaDoFiltr') ";
        }
        if (!empty($dataDodaniaOdFiltr) && empty($dataDodaniaDoFiltr) ){
            $zgloszeniaSQL = $zgloszeniaSQL." and (cast(Z.DataDodania As Date) >= '$dataDodaniaOdFiltr') ";
        }
        if (empty($dataDodaniaOdFiltr) && !empty($dataDodaniaDoFiltr) ){
            $zgloszeniaSQL = $zgloszeniaSQL." and (cast(Z.DataDodania As Date) <= '$dataDodaniaDoFiltr') ";
        }

        $zgloszeniaArr = $this->conn->fetchAllAssociative($zgloszeniaSQL);

        return $zgloszeniaArr;
    }

    public function zgloszenHistRepo() {

        $this->logger->info('???????????????????????   serwis');


        $zgloszeniaSQL = "select distinct Z.IdZgloszenia,Z.IdKlienta, K.Nazwa,Z.IdAdres,cast(Z.DataDodania As Date) as DataDodania,
            Z.PlanowanaRealizacjaOd, Z.PlanowanaRealizacjaDo, Z.GodzinaOd, Z.GodzinaDo, Z.DokladnaLokalizacja, Z.Opis, 
            SK.Opis AS Kategoria, SK.IdKategoria, SP.Opis AS Priorytet,SP.IdPriorytet, SS.Opis AS Status, SS.IdStatus as IdStatus,
            [dbo].[wykonawca] (Z.IdZgloszenia) as Wykonawca, Z.DataModyfikacji,
  
  			 PlanowanaRealizacja = 
			CASE
				WHEN (Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '' and Z.GodzinaOd != '' and Z.GodzinaDo != '' ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd = '' or Z.PlanowanaRealizacjaDo = '') and (Z.GodzinaOd != '' and Z.GodzinaDo != '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' and Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' or Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd,Z.GodzinaDo ) 
				ELSE  CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
			END,
			Adres = 
            CASE
                WHEN (Z.DokladnaLokalizacja != '') THEN CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '/', Z.DokladnaLokalizacja)            
                ELSE CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '', Z.DokladnaLokalizacja)
            END
  
              from zgloszenia Z
              left join klienci K
              on Z.IdKlienta = K.IdKlienta
              left join klienciAdres KA
              on Z.IdAdres = KA.IdAdres
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
              left join slownikKategoria SK
              on Z.Kategoria = SK.IdKategoria
              left join slownikPriorytet SP
              on Z.Priorytet = SP.IdPriorytet
              left join slownikStatus SS
              on Z.Status = SS.IdStatus where SS.Opis like 'Zrealizowano' or SS.Opis like 'Odrzucono'";
        $zgloszeniaHistoria = $this->conn->fetchAllAssociative($zgloszeniaSQL);

        return $zgloszeniaHistoria;

    }


    public function historiaZgloszenEdycjaRepo($zgloszeniaHistoriaArr) {

        $this->logger->info('???????????????????????   serwis');

        $idZgloszenia = $zgloszeniaHistoriaArr['idZgloszenia'];
        $valSelectStatus= $zgloszeniaHistoriaArr['valSelectStatus'];

        $zgloszenie = $this->findOneBy(array( 'idZgloszenia'=>$idZgloszenia ));

        if($valSelectStatus === ''){
            $zgloszenie->setStatus(null);
        } else {
            $zgloszenie->setStatus($valSelectStatus);
        }

        $this->getEntityManager()->persist($zgloszenie);
        $this->getEntityManager()->flush();

//        $zgloszeniaSQL = "select distinct Z.IdZgloszenia,Z.IdKlienta, K.Nazwa,Z.IdAdres,cast(Z.DataDodania As Date) as DataDodania,
//            Z.PlanowanaRealizacjaOd, Z.PlanowanaRealizacjaDo, Z.GodzinaOd, Z.GodzinaDo, Z.DokladnaLokalizacja, Z.Opis,
//            SK.Opis AS Kategoria, SK.IdKategoria, SP.Opis AS Priorytet,SP.IdPriorytet, SS.Opis AS Status, SS.IdStatus as IdStatus,
//            CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz.',Z.GodzinaOd, ' - ',Z.GodzinaDo ) AS PlanowanaRealizacja,
//			CONCAT (KA.Miejscowosc, ', ',KA.Ulica,  ', ', KA.NrBudynku, ', ', Z.DokladnaLokalizacja) AS Adres,
//            [dbo].[wykonawca] (Z.IdZgloszenia) as Wykonawca, Z.DataModyfikacji
//              from zgloszenia Z
//              left join klienci K
//              on Z.IdKlienta = K.IdKlienta
//              left join klienciAdres KA
//              on Z.IdAdres = KA.IdAdres
//              left join zgloszeniaWykonawca ZW
//              on Z.IdZgloszenia = ZW.IdZgloszenia
//              left join daneUzytkownika DU
//              on ZW.IdUzytkownika = DU.IdUzytkownika
//              left join slownikKategoria SK
//              on Z.Kategoria = SK.IdKategoria
//              left join slownikPriorytet SP
//              on Z.Priorytet = SP.IdPriorytet
//              left join slownikStatus SS
//              on Z.Status = SS.IdStatus where SS.Opis like 'Zrealizowano' or SS.Opis like 'Odrzucono'";
//        $zgloszeniaHistoria = $this->conn->fetchAllAssociative($zgloszeniaSQL);

        $zgloszeniaHistoriaTab = ['slownikStatus'=>$this->slownikStatusRepo(),'zgloszeniaHistoria'=>$this->zgloszenHistRepo()];

        return $zgloszeniaHistoriaTab;
    }

    public function historiaZgloszenRepo() {

        $this->logger->info('???????????????????????   serwis');

        $zgloszeniaHistoriaTab = ['slownikStatus'=>$this->slownikStatusRepo(),'zgloszeniaHistoria'=>$this->zgloszenHistRepo()];

        return $zgloszeniaHistoriaTab;
    }

    public function pokazZgloszeniaRepo() {

        $this->logger->info('???????????????????????   serwis');

        $zgloszeniaTab = $this->zgloszeniaRepo();

        return $zgloszeniaTab;
    }

    public function historiaZgloszenFiltrRepo($zgloszeniaFiltrHistoriaArr) {

        $this->logger->info('???????????????????????   serwis');

        $nrZgloszeniaFiltr = $zgloszeniaFiltrHistoriaArr['nrZgloszeniaFiltr'];
        $dataDodaniaOdFiltr = $zgloszeniaFiltrHistoriaArr['dataDodaniaOdFiltr'];
        $dataDodaniaDoFiltr = $zgloszeniaFiltrHistoriaArr['dataDodaniaDoFiltr'];
        $planowanaRealizacjaFiltr = $zgloszeniaFiltrHistoriaArr['planowanaRealizacjaFiltr'];
        $adresFiltr = $zgloszeniaFiltrHistoriaArr['adresFiltr'];
        $klientFiltr = $zgloszeniaFiltrHistoriaArr['klientFiltr'];
        $wykonawcaFiltr = $zgloszeniaFiltrHistoriaArr['wykonawcaFiltr'];
        $kategoriaFiltr = $zgloszeniaFiltrHistoriaArr['kategoriaFiltr'];
        $priorytetFiltr = $zgloszeniaFiltrHistoriaArr['priorytetFiltr'];
        $statusFiltr = $zgloszeniaFiltrHistoriaArr['statusFiltr'];

        $zgloszeniaSQL = "select distinct Z.IdZgloszenia,Z.IdKlienta, K.Nazwa,Z.IdAdres,cast(Z.DataDodania As Date) as DataDodania,
            Z.PlanowanaRealizacjaOd, Z.PlanowanaRealizacjaDo, Z.GodzinaOd, Z.GodzinaDo, Z.DokladnaLokalizacja, Z.Opis, 
            SK.Opis AS Kategoria, SK.IdKategoria, SP.Opis AS Priorytet,SP.IdPriorytet, SS.Opis AS Status, SS.IdStatus as IdStatus,
            [dbo].[wykonawca] (Z.IdZgloszenia) as Wykonawca, Z.DataModyfikacji,
  
  			 PlanowanaRealizacja = 
			CASE
				WHEN (Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '' and Z.GodzinaOd != '' and Z.GodzinaDo != '' ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd = '' or Z.PlanowanaRealizacjaDo = '') and (Z.GodzinaOd != '' and Z.GodzinaDo != '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd, ' - ',Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' and Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
				WHEN ((Z.PlanowanaRealizacjaOd != '' and Z.PlanowanaRealizacjaDo != '') and (Z.GodzinaOd = '' or Z.GodzinaDo = '') ) THEN CONCAT (Z.PlanowanaRealizacjaOd,' / ',Z.PlanowanaRealizacjaDo, ' godz. ',Z.GodzinaOd,Z.GodzinaDo ) 
				ELSE  CONCAT (Z.PlanowanaRealizacjaOd,Z.PlanowanaRealizacjaDo,Z.GodzinaOd,Z.GodzinaDo ) 
			END,
			Adres = 
            CASE
                WHEN (Z.DokladnaLokalizacja != '') THEN CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '/', Z.DokladnaLokalizacja)
             
                ELSE CONCAT (KA.Miejscowosc, ' ',KA.Ulica, ' ', KA.NrBudynku, '', Z.DokladnaLokalizacja)
            END
  
              from zgloszenia Z
              left join klienci K
              on Z.IdKlienta = K.IdKlienta
              left join klienciAdres KA
              on Z.IdAdres = KA.IdAdres
              left join zgloszeniaWykonawca ZW
              on Z.IdZgloszenia = ZW.IdZgloszenia
              left join daneUzytkownika DU
              on ZW.IdUzytkownika = DU.IdUzytkownika
              left join slownikKategoria SK
              on Z.Kategoria = SK.IdKategoria
              left join slownikPriorytet SP
              on Z.Priorytet = SP.IdPriorytet
              left join slownikStatus SS
              on Z.Status = SS.IdStatus where Z.IdZgloszenia is not null and ( SS.Opis like 'Zrealizowano' or SS.Opis like 'Odrzucono') ";

        if (!empty($nrZgloszeniaFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (Z.IdZgloszenia like '%$nrZgloszeniaFiltr%') ";
        }
        if (!empty($planowanaRealizacjaFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (Z.PlanowanaRealizacjaOd like '%$planowanaRealizacjaFiltr%'
            or Z.PlanowanaRealizacjaDo like '%$planowanaRealizacjaFiltr%') ";
        }
        if (!empty($adresFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (KA.Miejscowosc like '%$adresFiltr%' or KA.Ulica like '%$adresFiltr%'
            or KA.NrBudynku like '%$adresFiltr%' or Z.DokladnaLokalizacja like '%$adresFiltr%') ";
        }
        if (!empty($klientFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (K.Nazwa like '%$klientFiltr%') ";
        }
        if (!empty($wykonawcaFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (DU.Imie like '%$wykonawcaFiltr%' or DU.Nazwisko like '%$wykonawcaFiltr%') ";
        }
        if (!empty($kategoriaFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (SK.Opis like '%$kategoriaFiltr%') ";
        }
        if (!empty($priorytetFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (SP.Opis like '%$priorytetFiltr%') ";
        }
        if (!empty($statusFiltr)){
            $zgloszeniaSQL = $zgloszeniaSQL." and (SS.Opis like '%$statusFiltr%') ";
        }
        if (!empty($dataDodaniaOdFiltr) && !empty($dataDodaniaDoFiltr) ){
            $zgloszeniaSQL = $zgloszeniaSQL." and (cast(Z.DataDodania As Date) >= '$dataDodaniaOdFiltr' and cast(Z.DataDodania As Date) <= '$dataDodaniaDoFiltr') ";
        }
        if (!empty($dataDodaniaOdFiltr) && empty($dataDodaniaDoFiltr) ){
            $zgloszeniaSQL = $zgloszeniaSQL." and (cast(Z.DataDodania As Date) >= '$dataDodaniaOdFiltr') ";
        }
        if (empty($dataDodaniaOdFiltr) && !empty($dataDodaniaDoFiltr) ){
            $zgloszeniaSQL = $zgloszeniaSQL." and (cast(Z.DataDodania As Date) <= '$dataDodaniaDoFiltr') ";
        }

        $filtrHistoriaSQL = $this->conn->fetchAllAssociative($zgloszeniaSQL);

        $zgloszeniaFiltrHistoriaTab = ['slownikStatus'=>$this->slownikStatusRepo(),'filtrHistoriaSQL'=>$filtrHistoriaSQL];

        return $zgloszeniaFiltrHistoriaTab;
    }

    public function wyswietlKomentarzeRepo($wyswietlKomentarzeArr) {

        $idZgloszenia = $wyswietlKomentarzeArr['idZgloszenia'];


        $sql = "select IdZgloszenia,Komentarz,DataDodania,[User] from zgloszeniaKomentarze where IdZgloszenia = $idZgloszenia ORDER BY DataDodania DESC";
        $sql = $this->conn->fetchAllAssociative($sql);

        return $sql;
    }

    public function dodawanieKomentarzaRepo($dodawanieKomentarzaArr) {

     $idZgloszenia = $dodawanieKomentarzaArr['idZgloszenia'];
     $komentarz = $dodawanieKomentarzaArr['komentarz'];
     $imie= $dodawanieKomentarzaArr['imie'];
     $nazwisko = $dodawanieKomentarzaArr['nazwisko'];
     $user = $imie . ' ' . $nazwisko;

        $sql = "insert into zgloszeniaKomentarze (IdZgloszenia,Komentarz,DataDodania,[User]) values ($idZgloszenia,'$komentarz',GETDATE(),'$user')";
        $this->conn->fetchAllAssociative($sql);

        $sqlSelectArr = "select IdZgloszenia,Komentarz,DataDodania,[User] from zgloszeniaKomentarze where IdZgloszenia = $idZgloszenia ORDER BY DataDodania DESC";
        $sqlSelect = $this->conn->fetchAllAssociative($sqlSelectArr);

        return $sqlSelect;
    }

    public function wyswietlZmianyRepo($wyswietlZmianyArr) {

        $idZgloszenia = $wyswietlZmianyArr['idZgloszenia'];


        $sql = "select DataDodania, [User] from zgloszenia where IdZgloszenia = $idZgloszenia";
        $sql = $this->conn->fetchAllAssociative($sql);

        return $sql;
    }

}
