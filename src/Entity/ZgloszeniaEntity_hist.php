<?php

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;

/**
 * Test
 *
 * @ORM\Table(name="zgloszenia_hist")
 * @ORM\Entity(repositoryClass="App\Repository\ZgloszeniaRepository")
 */
class ZgloszeniaEntity_hist
{

    /**
     * @var int
     *
     * @ORM\Column(name="IdZgloszeniaHist", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $idZgloszeniaHist;

    /**
     * @var int
     *
     * @ORM\Column(name="IdZgloszenia", type="integer")
     */
    private $idZgloszenia;



    /**
     * @var int
     *
     * @ORM\Column(name="IdKlienta", type="integer")
     */
    private $idKlienta;

    /**
     * @var int
     *
     * @ORM\Column(name="IdAdres", type="integer")
     */
    private $idAdres;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DataDodania", type="datetime", length=255)
     */
    private $dataDodania;

    /**
     * @var string
     *
     * @ORM\Column(name="PlanowanaRealizacjaOd", type="string", length=255)
     */
    private $planowanaRealizacjaOd;

    /**
     * @var string
     *
     * @ORM\Column(name="PlanowanaRealizacjaDo", type="string", length=255)
     */
    private $planowanaRealizacjaDo;

    /**
     * @var string
     *
     * @ORM\Column(name="GodzinaOd", type="string", length=255)
     */
    private $godzinaOd;

    /**
     * @var string
     *
     * @ORM\Column(name="GodzinaDo", type="string", length=255)
     */
    private $godzinaDo;

    /**
     * @var string
     *
     * @ORM\Column(name="DokladnaLokalizacja", type="string", length=255)
     */
    private $dokladnaLokalizacja;

    /**
     * @var int
     *
     * @ORM\Column(name="Kategoria", type="integer", length=255)
     */
    private $kategoria;

    /**
     * @var int
     *
     * @ORM\Column(name="Priorytet", type="integer", length=255)
     */
    private $priorytet;

    /**
     * @var int
     *
     * @ORM\Column(name="Status", type="integer", length=255)
     */
    private $status;

    /**
     * @var string
     *
     * @ORM\Column(name="Plik", type="string", length=255)
     */
    private $plik;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DataModyfikacji", type="datetime", length=255)
     */
    private $dataModyfikacji;

    /**
     * @var string
     *
     * @ORM\Column(name="[User]", type="string", length=255)
     */
    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="Opis", type="string", length=255)
     */
    private $opis;

    /**
     * @return int
     */
    public function getIdZgloszeniaHist(): int
    {
        return $this->idZgloszeniaHist;
    }

    /**
     * @param int $idZgloszeniaHist
     * @return ZgloszeniaEntity_hist
     */
    public function setIdZgloszeniaHist(int $idZgloszeniaHist): ZgloszeniaEntity_hist
    {
        $this->idZgloszeniaHist = $idZgloszeniaHist;
        return $this;
    }

    /**
     * @return int
     */
    public function getIdZgloszenia(): ?int
    {
        return $this->idZgloszenia;
    }

    /**
     * @param int $idZgloszenia
     * @return ZgloszeniaEntity_hist
     */
    public function setIdZgloszenia( ?int $idZgloszenia): ZgloszeniaEntity_hist
    {
        $this->idZgloszenia = $idZgloszenia;
        return $this;
    }



    /**
     * @return int
     */
    public function getIdKlienta(): ?int
    {
        return $this->idKlienta;
    }

    /**
     * @param ?int $idKlienta
     * @return ZgloszeniaEntity_hist
     */
    public function setIdKlienta( ?int $idKlienta ): ZgloszeniaEntity_hist
    {
        $this->idKlienta = $idKlienta;
        return $this;
    }

    /**
     * @return int
     */
    public function getIdAdres(): ?int
    {
        return $this->idAdres;
    }

    /**
     * @param ?int $idAdres
     * @return ZgloszeniaEntity_hist
     */
    public function setIdAdres( ?int $idAdres ): ZgloszeniaEntity_hist
    {
        $this->idAdres = $idAdres;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDataDodania(): \DateTime
    {
        return $this->dataDodania;
    }

    /**
     * @param \DateTime $dataDodania
     * @return ZgloszeniaEntity_hist
     */
    public function setDataDodania(\DateTime $dataDodania): ZgloszeniaEntity_hist
    {
        $this->dataDodania = $dataDodania;
        return $this;
    }

    /**
     * @return string
     */
    public function getPlanowanaRealizacjaOd(): string
    {
        return $this->planowanaRealizacjaOd;
    }

    /**
     * @param string $planowanaRealizacjaOd
     * @return ZgloszeniaEntity_hist
     */
    public function setPlanowanaRealizacjaOd(string $planowanaRealizacjaOd): ZgloszeniaEntity_hist
    {
        $this->planowanaRealizacjaOd = $planowanaRealizacjaOd;
        return $this;
    }

    /**
     * @return string
     */
    public function getPlanowanaRealizacjaDo(): string
    {
        return $this->planowanaRealizacjaDo;
    }

    /**
     * @param string $planowanaRealizacjaDo
     * @return ZgloszeniaEntity_hist
     */
    public function setPlanowanaRealizacjaDo(string $planowanaRealizacjaDo): ZgloszeniaEntity_hist
    {
        $this->planowanaRealizacjaDo = $planowanaRealizacjaDo;
        return $this;
    }

    /**
     * @return string
     */
    public function getGodzinaOd(): string
    {
        return $this->godzinaOd;
    }

    /**
     * @param string $godzinaOd
     * @return ZgloszeniaEntity_hist
     */
    public function setGodzinaOd(string $godzinaOd): ZgloszeniaEntity_hist
    {
        $this->godzinaOd = $godzinaOd;
        return $this;
    }

    /**
     * @return string
     */
    public function getGodzinaDo(): string
    {
        return $this->godzinaDo;
    }

    /**
     * @param string $godzinaDo
     * @return ZgloszeniaEntity_hist
     */
    public function setGodzinaDo(string $godzinaDo): ZgloszeniaEntity_hist
    {
        $this->godzinaDo = $godzinaDo;
        return $this;
    }

    /**
     * @return string
     */
    public function getDokladnaLokalizacja(): string
    {
        return $this->dokladnaLokalizacja;
    }

    /**
     * @param string $dokladnaLokalizacja
     * @return ZgloszeniaEntity_hist
     */
    public function setDokladnaLokalizacja(string $dokladnaLokalizacja): ZgloszeniaEntity_hist
    {
        $this->dokladnaLokalizacja = $dokladnaLokalizacja;
        return $this;
    }

    /**
     * @return int
     */
    public function getKategoria(): ?int
    {
        return $this->kategoria;
    }

    /**
     * @param ?int $kategoria
     * @return ZgloszeniaEntity_hist
     */
    public function setKategoria( ?int $kategoria ): ZgloszeniaEntity_hist
    {
        $this->kategoria = $kategoria;
        return $this;
    }

    /**
     * @return int
     */
    public function getPriorytet(): ?int
    {
        return $this->priorytet;
    }

    /**
     * @param ?int $priorytet
     * @return ZgloszeniaEntity_hist
     */
    public function setPriorytet( ?int $priorytet ): ZgloszeniaEntity_hist
    {
        $this->priorytet = $priorytet;
        return $this;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }

    /**
     * @param int $status
     * @return ZgloszeniaEntity_hist
     */
    public function setStatus(int $status): ZgloszeniaEntity_hist
    {
        $this->status = $status;
        return $this;
    }

    /**
     * @return string
     */
    public function getPlik(): string
    {
        return $this->plik;
    }

    /**
     * @param string $plik
     * @return ZgloszeniaEntity_hist
     */
    public function setPlik(string $plik): ZgloszeniaEntity_hist
    {
        $this->plik = $plik;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDataModyfikacji(): \DateTime
    {
        return $this->dataModyfikacji;
    }

    /**
     * @param \DateTime $dataModyfikacji
     * @return ZgloszeniaEntity_hist
     */
    public function setDataModyfikacji(\DateTime $dataModyfikacji): ZgloszeniaEntity_hist
    {
        $this->dataModyfikacji = $dataModyfikacji;
        return $this;
    }

    /**
     * @return string
     */
    public function getUser(): string
    {
        return $this->user;
    }

    /**
     * @param string $user
     * @return ZgloszeniaEntity_hist
     */
    public function setUser(string $user): ZgloszeniaEntity_hist
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return string
     */
    public function getOpis(): string
    {
        return $this->opis;
    }

    /**
     * @param string $opis
     * @return ZgloszeniaEntity_hist
     */
    public function setOpis(string $opis): ZgloszeniaEntity_hist
    {
        $this->opis = $opis;
        return $this;
    }




}